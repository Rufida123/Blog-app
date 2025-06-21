import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostsContext } from "./Context/PostsContext";
import { useAuthStore } from "./Store/authStore";
import Sidebar from "./Components/Sidebar";
import { toast } from "react-toastify";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost, categories, users } = useContext(PostsContext);
  const { userEmail } = useAuthStore();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState(""); // Added missing state
  const [accept, setAccept] = useState(false);

  useEffect(() => {
    const post = posts.find((p) => p.id === Number(id));
    if (post) {
      // Verify the user owns this post
      if (post.creatorEmail !== userEmail) {
        toast.error("You can only edit your own posts");
        navigate("/");
        return;
      }

      setTitle(post.title);
      setBody(post.body);
      setCategory(post.category);
      setUserId(post.userId); // Set the userId from post
    }
  }, [id, posts, userEmail, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAccept(true);

    if (title && body && category && userId) {
      updatePost(
        Number(id),
        {
          title,
          body,
          category,
          userId: Number(userId), // Ensure userId is a number
        },
        userEmail
      );

      toast.success("Post updated successfully!");
      navigate("/");
    } else {
      toast.error("Please fill all required fields");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 pb-4 bg-white py-6 px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-purple-700 ml-18">
              Edit Post
            </h2>
          </div>
        </div>

        <div className="p-8 bg-purple-50 min-h-[calc(110vh-120px)]">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                {accept && title.length === 0 && (
                  <p className="mt-1 text-sm text-red-600">Title is required</p>
                )}
              </div>

              {/* Body Field */}
              <div>
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                {accept && body.length === 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    Content is required
                  </p>
                )}
              </div>

              {/* Category Dropdown */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {accept && !category && (
                  <p className="mt-1 text-sm text-red-600">
                    Please select a category
                  </p>
                )}
              </div>

              {/* Author Field */}
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Author
                </label>
                <select
                  id="author"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select an author</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                {accept && !userId && (
                  <p className="mt-1 text-sm text-red-600">
                    Please select an author
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="w-full !bg-gray-200 text-gray-700 text-sm py-2 rounded-md hover:!bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full !bg-[#AD46FF] text-white text-sm py-2 rounded-md hover:!bg-[#9c3aeb] active:!bg-[#8a2fd9] transition-colors"
                >
                  Update Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
