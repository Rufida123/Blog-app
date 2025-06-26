import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCommentStore } from "./Store/CommentStore";
import { useAuthStore } from "./Store/authStore";
import { toast } from "react-toastify";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { useReportStore } from "./Store/reportStore";
export default function CommentsSection({
  comments,
  isLoading,
  postId,
  SkeletonCard,
}) {
  const { userEmail, isLoggedIn, isBlocked } = useAuthStore();
  const { addComment, addReply, editComment, deleteComment } =
    useCommentStore();
  const navigate = useNavigate();

  const [editingId, setEditingId] = useState(null);
  const [replyingId, setReplyingId] = useState(null);
  const [editedBody, setEditedBody] = useState("");
  const [newComment, setNewComment] = useState({ name: "", body: "" });

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!isLoggedIn) return;

    addComment(
      {
        ...newComment,
        postId,
      },
      userEmail
    );

    setNewComment({ name: "", body: "" });
    toast.success("Comment added successfully!");
  };

  return (
    <div className="w-full lg:w-auto bg-[#fef9e7] p-3 sm:p-4 rounded-2xl shadow-lg h-auto lg:h-[550px] flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Comments</h3>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {isLoading ? (
          SkeletonCard()
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No comments found.</p>
        ) : (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                depth={0}
                replyingId={replyingId}
                editingId={editingId}
                setReplyingId={setReplyingId}
                setEditingId={setEditingId}
                editedBody={editedBody}
                setEditedBody={setEditedBody}
                userEmail={userEmail}
                isLoggedIn={isLoggedIn}
                addReply={addReply}
                editComment={editComment}
                deleteComment={deleteComment}
                postId={postId}
                toast={toast}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Add Comment */}
      <form
        onSubmit={handleAddComment}
        className="mt-3 bg-white p-2 sm:p-3 rounded-lg shadow border border-gray-200 space-y-2"
      >
        <h4 className="text-sm font-semibold text-gray-800">
          {!isLoggedIn
            ? "Please login to comment"
            : isBlocked
              ? "You are blocked from commenting"
              : "Add a Comment"}
        </h4>

        {!isLoggedIn ? (
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full !bg-[#AD46FF] text-white text-sm py-2 rounded-md hover:!bg-[#9c3aeb] active:!bg-[#8a2fd9] transition-colors"
          >
            Login to Comment
          </button>
        ) : isBlocked ? (
          <div className="text-sm text-red-500 p-2 bg-red-50 rounded-md">
            Your account has been restricted from posting comments.
          </div>
        ) : (
          <>
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-purple-400 focus:outline-none"
              placeholder="Your name"
              value={newComment.name}
              onChange={(e) =>
                setNewComment({ ...newComment, name: e.target.value })
              }
              required
            />

            <textarea
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-purple-400 focus:outline-none resize-none"
              rows="2"
              placeholder="Write your comment..."
              value={newComment.body}
              onChange={(e) =>
                setNewComment({ ...newComment, body: e.target.value })
              }
              required
            />

            <button
              type="submit"
              className="w-full !bg-[#AD46FF] !text-white text-sm py-2 rounded-md hover:!bg-[#9c3aeb] active:!bg-[#8a2fd9] transition-colors"
            >
              Post Comment
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export function CommentItem({
  comment,
  depth = 0,
  replyingId,
  editingId,
  setReplyingId,
  setEditingId,
  editedBody,
  setEditedBody,
  userEmail,
  isLoggedIn,
  addReply,
  editComment,
  deleteComment,
  postId,
  toast,
}) {
  const isCurrentUserComment = isLoggedIn && comment.email === userEmail;
  const isLocalComment = comment.isLocal;
  const { likeComment, dislikeComment } = useCommentStore();
  const { addReport } = useReportStore();

  const [replyData, setReplyData] = useState({
    name: "",
    body: "",
    email: userEmail,
  });

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) return;

    addReply(
      comment.id,
      {
        ...replyData,
        postId,
      },
      userEmail
    );

    setReplyData({ name: "", body: "" });
    setReplyingId(null);
    toast.success("Reply added successfully!");
  };

  const handleLike = () => {
    console.log(
      "Like clicked - isLoggedIn:",
      isLoggedIn,
      "userEmail:",
      userEmail
    );
    if (!isLoggedIn) return;
    likeComment(comment.id, userEmail);
  };

  const handleDislike = () => {
    if (!isLoggedIn) return;
    dislikeComment(comment.id, userEmail);
  };

  const userLiked = comment.likes?.includes(userEmail) || false;
  const userDisliked = comment.dislikes?.includes(userEmail) || false;

  const handleReportComment = () => {
    const reason = prompt(
      "Please enter the reason for reporting this comment:"
    );
    if (reason) {
      addReport({
        type: "comment",
        targetId: comment.id,
        reporterEmail: userEmail,
        reportedUserEmail: comment.email,
        reason,
        content: comment.body,
      });
      toast.success("Comment reported. Admin will review it shortly.");
    }
  };

  return (
    <li
      className={`flex items-start gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm border ${
        isCurrentUserComment ? "border-purple-300" : "border-gray-200"
      } hover:shadow-md transition w-full max-w-full`}
      style={{ marginLeft: `${depth * 1.5}rem` }}
    >
      {isLoggedIn && !isCurrentUserComment && (
        <button
          onClick={handleReportComment}
          className="text-gray-400 hover:text-red-500 text-sm"
          title="Report comment"
        >
          <i className="fas fa-flag"></i>
        </button>
      )}
      {/* Avatar */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
        {comment.name?.charAt(0).toUpperCase() || "U"}
      </div>

      <div className="flex-1">
        {/* Name & Email */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-800">{comment.name}</p>
          <span className="text-xs text-gray-400">{comment.email}</span>
        </div>

        {/* Body or Edit */}
        {editingId === comment.id ? (
          <>
            <textarea
              className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-purple-400 focus:outline-none resize-none"
              rows={3}
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
            />
            <div className="mt-2 flex gap-3 text-sm">
              <button
                className="!text-purple-600 hover:underline"
                onClick={() => {
                  editComment(comment.id, editedBody.trim(), userEmail);
                  setEditingId(null);
                  toast.success("Comment updated successfully!");
                }}
              >
                Save
              </button>
              <button
                className="!text-gray-500 hover:underline"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
              {comment.body}
            </p>
            {isLocalComment && (
              <div className="flex items-center gap-4 mt-2 ">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 text-sm !border-none !bg-white hover:scale-110 transition-transform duration-200 ${userLiked ? "text-red-500" : "text-gray-500"}`}
                  disabled={!isLoggedIn}
                >
                  <span className="hover:scale-125 transition-transform duration-200">
                    {userLiked ? <FcLike /> : <FcLikePlaceholder />}
                  </span>
                  <span>{comment.likes?.length || 0}</span>
                </button>

                <button
                  onClick={handleDislike}
                  className={`flex items-center gap-1 text-sm !border-none !bg-white hover:scale-110 transition-transform duration-200 ${userDisliked ? "text-blue-500" : "text-gray-500"}`}
                  disabled={!isLoggedIn}
                >
                  <span className="hover:scale-125 transition-transform duration-200 ">
                    {userDisliked ? <BiSolidDislike /> : <BiDislike />}
                  </span>
                  <span>{comment.dislikes?.length || 0}</span>
                </button>
              </div>
            )}
            <div className="mt-2 flex gap-3 text-sm">
              {isCurrentUserComment && isLocalComment && (
                <>
                  <button
                    className="text-purple-600 hover:underline"
                    onClick={() => {
                      setEditedBody(comment.body);
                      setEditingId(comment.id);
                      setReplyingId(null);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => {
                      deleteComment(comment.id, userEmail);
                      toast.success("Comment deleted successfully!");
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
              {isLocalComment && isLoggedIn && (
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setReplyingId(
                      replyingId === comment.id ? null : comment.id
                    );
                    setEditingId(null);
                  }}
                >
                  {replyingId === comment.id ? "Cancel" : "Reply"}
                </button>
              )}
            </div>
          </>
        )}

        {/* Reply form */}
        {replyingId === comment.id && (
          <form
            onSubmit={handleReplySubmit}
            className="mt-3 bg-gray-50 p-2 rounded-lg"
          >
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-purple-400 focus:outline-none mb-2"
              placeholder="Your name"
              value={replyData.name}
              onChange={(e) =>
                setReplyData({ ...replyData, name: e.target.value })
              }
              required
            />
            <textarea
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-purple-400 focus:outline-none resize-none"
              rows="2"
              placeholder="Write your reply..."
              value={replyData.body}
              onChange={(e) =>
                setReplyData({ ...replyData, body: e.target.value })
              }
              required
            />
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="!bg-blue-500 text-white text-sm py-1 px-3 rounded-md hover:!bg-blue-600"
              >
                Post Reply
              </button>
              <button
                type="button"
                onClick={() => setReplyingId(null)}
                className="text-gray-500 text-sm py-1 px-3 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Nested Replies */}
        {comment.replies?.length > 0 && (
          <ul className="mt-3 space-y-3 border-l-2 border-gray-200 pl-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                depth={depth + 1}
                replyingId={replyingId}
                editingId={editingId}
                setReplyingId={setReplyingId}
                setEditingId={setEditingId}
                editedBody={editedBody}
                setEditedBody={setEditedBody}
                userEmail={userEmail}
                isLoggedIn={isLoggedIn}
                addReply={addReply}
                editComment={editComment}
                deleteComment={deleteComment}
                postId={postId}
                toast={toast}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
