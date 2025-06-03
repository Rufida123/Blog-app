import { useNavigate } from "react-router-dom";
import { useFavoriteStore } from "../Store/favoriteStore";
import { useAuthStore } from "../Store/authStore";

export default function PostsCard({ id, title, body, user }) {
  const navigate = useNavigate();
  const userEmail = useAuthStore((state) => state.userEmail);
  const { isLoggedIn } = useAuthStore();
  const { toggleFavorite } = useFavoriteStore();
  const { favoritesByUser } = useFavoriteStore();

  // Derive the initial favorite state directly from the store
  const isFavorited = favoritesByUser[userEmail]?.includes(id) || false;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(userEmail, id);
  };

  const previewBody =
    body.split(" ").slice(0, 15).join(" ") +
    (body.split(" ").length > 15 ? "..." : "");

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition w-full mb-4">
      <div className="flex items-center relative gap-3 bg-purple-50 rounded-md px-3 py-2 mb-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
          {user.name.charAt(0)}
        </div>
        <div className="text-blue-700 font-medium text-xs">{user.name}</div>
        {isLoggedIn ? (
          <button
            onClick={handleFavoriteClick}
            className="absolute right-2 focus:outline-none"
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            <i
              className={`
                    ${isFavorited ? "fas" : "far"} 
                    fa-star 
                    ${isFavorited ? "text-yellow-400" : "text-gray-400"}
                    text-lg
                    hover:text-yellow-500
                    transition-colors
                `}
            />
          </button>
        ) : (
          <></>
        )}
      </div>
      <h2 className="text-base font-semibold mb-2 text-gray-900 line-clamp-2">
        {title}
      </h2>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{previewBody}</p>

      <div className="flex justify-end">
        <button
          className="text-purple-600 text-xs font-medium flex items-center"
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
