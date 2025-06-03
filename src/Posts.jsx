import { useContext, useEffect, useRef, useState } from "react";
import { PostsContext } from "./Context/PostsContext";
import PostsCard from "./Components/PostsCard";
import Sidebar from "./Components/Sidebar";

export default function Posts() {
  const { posts, users, loading } = useContext(PostsContext);
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setSearchResults(null);
    } else {
      const results = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  // Enter key triggers search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayedPosts = searchResults ?? posts;

  const showData =
    displayedPosts.length > 0 ? (
      displayedPosts.map((post) => {
        const user = users.find((u) => u.id === post.userId);
        return (
          <PostsCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            user={user}
          />
        );
      })
    ) : (
      <p>No posts found.</p>
    );

  function SkeletonCard() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full animate-pulse">
        <div className="flex items-center gap-3 bg-violet-100/40 rounded-md px-3 py-2 mb-4">
          <div className="w-10 h-10 bg-blue-200 rounded-full" />
          <div className="w-32 h-4 bg-blue-200 rounded" />
        </div>
        <div className="h-5 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 pb-4 bg-white py-6 px-8 shadow-sm"
          ref={searchRef}
        >
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-purple-700 ml-18">
              Available Posts
            </h2>
          </div>

          {/* Search */}
          <div className="relative inline-block w-full max-w-xs sm:w-auto">
            <input
              type="text"
              placeholder="Search posts..."
              className="pr-10 h-10 w-full pl-4 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              value={searchQuery}
              onBlur={() => {
                setTimeout(() => {
                  setSearchResults(null);
                }, 200);
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="p-4 bg-purple-50 min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : showData}
          </div>
        </div>
      </div>
    </div>
  );
}
