import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "./Components/PostsContext";
import { useCommentStore } from './Components/useCommentStore';


export default function PostDetail() {
  const { id } = useParams();
  const { posts, users } = useContext(PostsContext);
const { comments, loading, fetchComments, addComment, editComment, deleteComment } = useCommentStore();

const [editingId, setEditingId] = useState(null);
const [editedBody, setEditedBody] = useState("");


  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: '',
  });

const handleAddComment = (e) => {
  e.preventDefault();

  addComment(newComment);

  setNewComment({ name: '', email: '', body: '' });
};


  const post = posts.find(p => p.id === parseInt(id));
  const user = users.find(u => u.id === post?.userId);

  useEffect(() => {
  if (post?.id) {
    fetchComments(post.id);
  }
}, [post?.id, fetchComments]);


  if (!user || !post) return <div className="p-6">Data not found</div>;


  return (
<div className="flex justify-center bg-[#f3f0fd] min-h-screen py-4 px-2 sm:px-4 sm:py-10">
  <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-6xl overflow-hidden">

    {/* Header */}
    <div className="flex items-center gap-4 bg-purple-100  px-4 py-3 rounded-md mb-6">
      <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-900 font-bold text-xl">
        {user.name.charAt(0)}
      </div>
      <div>
        <h2 className="text-purple-800 font-bold text-base">{user.name}</h2>
        <p className="text-xs text-gray-500">
          <span className="font-medium text-gray-600">Username:</span> @{user.username}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-medium text-gray-600">Email:</span> {user.email}
        </p>
      </div>
    </div>

    {/* Post + Comments */}
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[600px] overflow-hidden">
      
      {/* Post Section */}
      <div className="w-full lg:flex-1 bg-[#fef9e7] p-4 sm:p-6 rounded-xl shadow-md h-auto lg:h-[550px] overflow-auto">
      <p className="text-gray-800 text-xl sm:text-3xl font-bold mb-4">{post.title}</p>
      <p className="text-base sm:text-xl text-gray-600 whitespace-pre-line">{post.body}</p>

        {/* Info Box */}
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h2 className="text-purple-700 font-semibold text-base mb-3">Author Information</h2>
          <div className="text-xs text-gray-700 space-y-4">
            {/* Contact Info */}
            <div className="space-y-1 border-b pb-3">
              <h3 className="text-sm font-medium text-purple-600">Contact</h3>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-600">📞</span> {user.phone}
                <span className="font-semibold text-gray-600 ml-6">🌐</span>
                <a
                  href={`https://${user.website}`}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </div>
            </div>

            <div className="space-y-1 border-b pb-3">
              <h3 className="text-sm font-medium text-purple-600">Address</h3>
              <p>{user.address.city} - {user.address.street}</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-purple-600">Company</h3>
              <p className="text-gray-700">{user.company.name}</p>
              <p className="text-gray-500 italic">"{user.company.catchPhrase}"</p>
            </div>
          </div>
        </div>
      </div>


<div className="w-full lg:w-auto bg-[#fef9e7] p-3 sm:p-4 rounded-2xl shadow-lg h-auto lg:h-[550px] flex flex-col">
  <h3 className="text-xl font-bold text-gray-800 mb-2">Comments</h3>

  {/*Comments List */}
  <div className="flex-1 overflow-y-auto space-y-3 pr-1">
    {loading ? (
      <p className="text-gray-500">Loading comments...</p>
    ) : comments.length === 0 ? (
      <p className="text-gray-500">No comments found.</p>
    ) : (
      <ul className="space-y-3">
{comments.map((comment) => (
  <li
  key={comment.id}
  className="flex items-start gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition w-full max-w-full"
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
      {comment.name?.charAt(0).toUpperCase() || "U"}
    </div>

    <div className="flex-1">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-800">{comment.name}</p>
        <span className="text-xs text-gray-400">{comment.email}</span>
      </div>

      {editingId === comment.id ? (
        <textarea
          className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-purple-400 focus:outline-none resize-none"
          rows={3}
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
        />
      ) : (
        <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">{comment.body}</p>
      )}

      {comment.id > 100000 && (
        <div className="mt-2 flex gap-3 text-sm">
          {editingId === comment.id ? (
            <>
              <button
                className="text-purple-600 hover:underline"
                onClick={() => {
                  editComment(comment.id, editedBody);
                  setEditingId(null);
                }}
              >
                Save
              </button>
              <button
                className="text-gray-500 hover:underline"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="text-purple-600 hover:underline"
                onClick={() => {
                  setEditingId(comment.id);
                  setEditedBody(comment.body);
                }}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => deleteComment(comment.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  </li>
))}

</ul>

    )}
  </div>

  {/* Add Comment*/}
  <form
    onSubmit={handleAddComment}
    className="mt-3 bg-white p-2 sm:p-3 rounded-lg shadow border border-gray-200 space-y-2"
  >
      <h4 className="text-sm font-semibold text-gray-800">Add a Comment</h4>

    <div className="flex gap-2">
      <input
        type="text"
        className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-purple-400 focus:outline-none"
        placeholder="Name"
        value={newComment.name}
        onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
        required
      />
      <input
        type="email"
        className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-purple-400 focus:outline-none"
        placeholder="Email"
        value={newComment.email}
        onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
        required
      />
    </div>

    <textarea
      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-purple-400 focus:outline-none resize-none"
      rows="2"
      placeholder="Write your comment..."
      value={newComment.body}
      onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
      required
    />
<button
  type="submit"
  style={{ backgroundColor: '#c084fc' }}
  className="w-full text-white text-sm py-2 rounded-md hover:bg-purple-500 active:bg-purple-600 transition-colors"
>
  Post Comment
</button>
  </form>
</div>

</div>
  </div>
</div>

  );
}