import { useNavigate } from "react-router-dom";
import { useFavoriteStore } from "../Store/favoriteStore";
import { useAuthStore } from "../Store/authStore";

export default function PostsCard({
  id,
  title,
  body,
  user,
  category,
  creatorEmail,
}) {
  const navigate = useNavigate();
  const userEmail = useAuthStore((state) => state.userEmail);
  const { isLoggedIn } = useAuthStore();
  const { toggleFavorite } = useFavoriteStore();
  const { favoritesByUser } = useFavoriteStore();
  const isCreator = creatorEmail === userEmail;

  // Derive the initial favorite state directly from the store
  const isFavorited = favoritesByUser[userEmail]?.includes(id) || false;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(userEmail, id);
  };

  const previewBody =
    body.split(" ").slice(0, 15).join(" ") +
    (body.split(" ").length > 15 ? "..." : "");
  console.log({
    creatorEmail,
    userEmail,
    isCreator,
    isLoggedIn,
  });
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition w-full mb-4 relative">
      {isCreator && isLoggedIn && (
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="absolute top-4 right-21 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 z-10"
          title="Edit post"
        >
          <i className="fas fa-edit"></i>
        </button>
      )}

      {/* User info section */}
      <div className="flex items-center relative gap-3 bg-purple-50 dark:bg-gray-700 rounded-md px-3 py-2 mb-3">
        <div className="w-8 h-8 bg-blue-100 dark:bg-gray-600 rounded-full flex items-center justify-center text-blue-700 dark:text-gray-200 font-bold text-sm">
          {user.name.charAt(0)}
        </div>
        <div className="text-blue-700 dark:text-gray-300 font-medium text-xs">
          {user.name}
        </div>
        {isLoggedIn && (
          <button
            onClick={handleFavoriteClick}
            className="absolute right-2 focus:outline-none"
          >
            <i
              className={`${isFavorited ? "fas" : "far"} fa-star ${
                isFavorited
                  ? "text-yellow-400 dark:text-yellow-300"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            />
          </button>
        )}
      </div>

      <h2 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
        {title}
      </h2>

      <h3 className="text-purple-600 dark:text-purple-400 text-lg font-medium flex items-center">
        <span className="text-base font-semibold mr-2 text-gray-900 dark:text-gray-300 line-clamp-2">
          Category:
        </span>
        {category}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
        {previewBody}
      </p>

      <div className="flex justify-end">
        <button
          className="text-purple-600 dark:text-purple-400 text-xs font-medium flex items-center hover:text-purple-800 dark:hover:text-purple-300"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/postdetail/${id}`);
          }}
        >
          Read more <i className="fas fa-chevron-right ml-1 text-xs"></i>
        </button>
      </div>
    </div>
  );
}
