import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useCommentStore } from "./Store/CommentStore";
import { PostsContext } from "./Context/PostsContext";
import axios from "axios";
import CommentsSection from "./CommentsSection";

export default function PostDetail() {
  const { id } = useParams();
  const { posts, users } = useContext(PostsContext);
  const { localComments } = useCommentStore();

  const post = posts.find((p) => p.id === parseInt(id));
  const user = users.find((u) => u.id === post?.userId);

  const { data: apiComments = [], isLoading } = useQuery({
    queryKey: ["comments", post?.id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
        );
        return response.data.map((comment) => ({ ...comment, isLocal: false }));
      } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
      }
    },
    enabled: !!post?.id,
  });

  // Combined comments
  const allComments = [
    ...localComments.filter((c) => c?.postId === post?.id),
    ...apiComments,
  ].sort((a, b) => (a.isLocal ? -1 : 1));

  function SkeletonCard() {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-3 w-full rounded bg-gray-200"></div>
                <div className="h-3 w-5/6 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Loading text with animation */}
        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-2 text-purple-600">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="font-medium">Loading comments...</span>
          </div>
        </div>
      </div>
    );
  }

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
              <span className="font-medium text-gray-600">Username:</span> @
              {user.username}
            </p>
            <p className="text-xs text-gray-500">
              <span className="font-medium text-gray-600">Email:</span>{" "}
              {user.email}
            </p>
          </div>
        </div>

        {/* Post + Comments */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[600px] overflow-hidden">
          {/* Post Section */}
          <div className="w-full lg:flex-1 bg-[#fef9e7] p-4 sm:p-6 rounded-xl shadow-md h-auto lg:h-[550px] overflow-auto">
            <p className="text-gray-800 text-xl sm:text-3xl font-bold mb-4">
              {post.title}
            </p>
            <p className="text-base sm:text-xl text-gray-600 whitespace-pre-line">
              {post.body}
            </p>

            {/* Info Box */}
            <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h2 className="text-purple-700 font-semibold text-base mb-3">
                Author Information
              </h2>
              <div className="text-xs text-gray-700 space-y-4">
                {/* Contact Info */}
                <div className="space-y-1 border-b pb-3">
                  <h3 className="text-sm font-medium text-purple-600">
                    Contact
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-600">📞</span>{" "}
                    {user.phone}
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
                  <h3 className="text-sm font-medium text-purple-600">
                    Address
                  </h3>
                  <p>
                    {user.address.city} - {user.address.street}
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-purple-600">
                    Company
                  </h3>
                  <p className="text-gray-700">{user.company.name}</p>
                  <p className="text-gray-500 italic">
                    "{user.company.catchPhrase}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CommentsSection
            comments={allComments}
            isLoading={isLoading}
            postId={post.id}
            SkeletonCard={SkeletonCard}
          />
        </div>
      </div>
    </div>
  );
}
