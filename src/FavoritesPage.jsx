import React from "react";
import { useContext } from "react";
import { useFavoriteStore } from "./Store/favoriteStore";
import { useAuthStore } from "./Store/authStore";
import PostsCard from "./Components/PostsCard";
import { PostsContext } from "./Context/PostsContext";
import Sidebar from "./Components/Sidebar";

const EMPTY_ARRAY = Object.freeze([]);

export default function FavoritesPage() {
  const { posts, users } = useContext(PostsContext);
  const { userEmail } = useAuthStore();

  const favoriteIds = useFavoriteStore(
    (state) => state.favoritesByUser[userEmail] ?? EMPTY_ARRAY
  );

  const favoritePosts = React.useMemo(() => {
    if (!favoriteIds.length) return EMPTY_ARRAY;
    return posts.filter((post) => favoriteIds.includes(post.id));
  }, [posts, favoriteIds]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 pb-4 bg-white py-6 px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-purple-700 ml-18">
              My Favorite
            </h2>
          </div>
        </div>
        <div className="p-4 bg-purple-50 min-h-[calc(110vh-120px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritePosts.length > 0 ? (
              favoritePosts.map((post) => {
                const user = users.find((u) => u.id === post.userId);
                return (
                  <PostsCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    user={user}
                    isInitiallyFavorited={true} // Always true in favorites page
                  />
                );
              })
            ) : (
              <div className="flex items-center justify-center h-full w-full absolute left-0 top-0">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <i className="far fa-star text-2xl text-gray-400"></i>
                  </div>
                  <h3 className="text-xl font-medium text-gray-600">
                    No favorites saved
                  </h3>
                  <p className="text-gray-400">
                    When you find posts you love, click the{" "}
                    <i className="far fa-star text-yellow-400"></i> to save them
                    here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
