import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./Store/authStore";
import { useFavoriteStore } from "./Store/favoriteStore";
import { useCommentStore } from "./Store/CommentStore";
import { useMemo } from "react";
import Sidebar from "./Components/Sidebar";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuthStore();

  // Get the entire favoritesByUser object once
  const { favoritesByUser } = useFavoriteStore();

  // Then derive the favorites for the current user
  const favorites = favoritesByUser[userEmail] || [];

  const { getUserComments } = useCommentStore();
  const userComments = getUserComments(userEmail);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 transition-all duration-300">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-sm text-blue-500 uppercase font-medium">
                      Favorites
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {favorites.length}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <p className="text-sm text-green-500 uppercase font-medium">
                      Comments
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {userComments.length}
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
          </div>
        </div>
      </div>
    </div>
  );
}
