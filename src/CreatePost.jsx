import { useState, useContext } from "react";
import Sidebar from "./Components/Sidebar";
import { PostsContext } from "./Context/PostsContext";
import { toast } from "react-toastify";
import { useAuthStore } from "./Store/authStore";

export default function CreatePost() {
  const { addNewPost, users } = useContext(PostsContext);
  const { userEmail } = useAuthStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");
  const [accept, setAccept] = useState(false);

  const categories = ["Technology", "Travel", "Food", "Lifestyle", "Business"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setAccept(true);
    if (title && body && category && userId) {
      const newPost = {
        title,
        body,
        category,
      };

      addNewPost(
        {
          ...newPost,
          userId: Number(userId), // Ensure userId is a number
        },
        userEmail
      );

      setTitle("");
      setBody("");
      setCategory("");
      setUserId("");
      setAccept(false);
      toast.success("Post created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 transition-all duration-300">
        {/* ... existing header code ... */}
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
                  placeholder="Enter post title..."
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
                  placeholder="Write your post content here..."
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

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full !bg-[#AD46FF] text-white text-sm py-2 rounded-md hover:!bg-[#9c3aeb] active:!bg-[#8a2fd9] transition-colors"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
