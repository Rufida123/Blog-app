import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./Store/authStore";
import { useFavoriteStore } from "./Store/favoriteStore";
import { useCommentStore } from "./Store/CommentStore";
import Sidebar from "./Components/Sidebar";
import { toast } from "react-toastify";
import { useContext } from "react";
import { PostsContext } from "./Context/PostsContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuthStore();
  const { getPostsByUser } = useContext(PostsContext);

  // Get the entire favoritesByUser object once
  const { favoritesByUser } = useFavoriteStore();

  // Then derive the favorites for the current user
  const favorites = favoritesByUser[userEmail] || [];

  const { getUserComments } = useCommentStore();
  const userComments = getUserComments(userEmail);
  const userPosts = getPostsByUser(userEmail);
  const postCount = userPosts.length;

  const categories = ["Technology", "Travel", "Food", "Lifestyle", "Business"];

  const getCategoryData = () => {
    const categoryCounts = {};

    // Initialize all categories with 0 count
    categories.forEach((category) => {
      categoryCounts[category] = 0;
    });

    // Count posts per category
    userPosts.forEach((post) => {
      if (post.category && categoryCounts.hasOwnProperty(post.category)) {
        categoryCounts[post.category]++;
      }
    });

    // Convert to array format for Recharts
    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
    }));
  };

  const categoryData = getCategoryData();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.info("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className="flex-1 transition-all duration-300 ">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 pb-4 bg-white py-6 px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-purple-700 ml-18">
              Your Profile
            </h2>
          </div>
        </div>

        {/* Main */}
        <div className="p-8 bg-purple-50 min-h-[calc(110vh-120px)]">
          <div className="max-w-4xl mx-auto">
            {/* Profile card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Profile header */}
              <div className="bg-purple-500 px-6 py-4 flex items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-purple-600 text-2xl"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Profile Information
                  </h1>
                  <p className="text-purple-100">{userEmail}</p>
                </div>
              </div>

              {/* Stats section */}
              <div className="p-6">
                <div className="flex justify-center gap-30 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 min-w-[300px]">
                    <p className="text-sm text-blue-500 uppercase font-medium">
                      Favorites
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {favorites.length}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100 min-w-[300px]">
                    <p className="text-sm text-green-500 uppercase font-medium">
                      Comments
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {userComments.length}
                    </p>
                  </div>
                </div>

                {/* Second row with Your Posts centered */}
                <div className="flex justify-center">
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 min-w-[400px]">
                    <p className="text-sm text-purple-500 uppercase font-medium">
                      Your Posts
                    </p>
                    <p className="text-3xl font-bold text-purple-600">
                      {postCount}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full mt-6 !bg-purple-500 text-white py-3 rounded-md hover:!bg-purple-700 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
            {/* Chart */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6 mt-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Your Posts by Category
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
