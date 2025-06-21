import { useContext, useEffect, useRef, useState } from "react";
import { PostsContext } from "./Context/PostsContext";
import PostsCard from "./Components/PostsCard";
import Sidebar from "./Components/Sidebar";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";

export default function Posts() {
  const { posts, users, isLoading, categories } = useContext(PostsContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const filterRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";
    }
    return "light";
  });

  const authors = [
    ...new Set(
      posts.map((post) => {
        const user = users.find((u) => u.id === post.userId);
        return user ? user.name : "Unknown";
      })
    ),
  ];

  const showData = posts.map((post) => {
    const user = users.find((u) => u.id === post.userId);
    return (
      <PostsCard
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
        user={user}
        category={post.category}
        creatorEmail={post.creatorEmail}
      />
    );
  });

  const searchData =
    searchResults && searchResults.length > 0 ? (
      searchResults.map((post) => {
        const user = users.find((u) => u.id === post.userId);
        return (
          <PostsCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            user={user}
            category={post.category}
            creatorEmail={post.creatorEmail}
          />
        );
      })
    ) : (
      <p>No posts found.</p>
    );

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleTitleSort = (order) => {
    let sortedPosts = [...posts];
    sortedPosts.sort((a, b) =>
      order === "a-z"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    setSearchResults(sortedPosts);
    setFilterOpen(false);
  };

  const handleAuthorFilter = (author) => {
    const filteredPosts = posts.filter((post) => {
      const user = users.find((u) => u.id === post.userId);
      return user?.name === author;
    });
    setSearchResults(filteredPosts);
    setFilterOpen(false);
  };

  const handleCategoryFilter = (category) => {
    const filteredPosts = posts.filter((post) => post.category === category);
    setSearchResults(filteredPosts);
    setFilterOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    const root = window.document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  };
  const handleClickOutside = (event) => {
    const searchInput = document.querySelector('input[type="text"]');
    const filterButton = filterRef.current;

    // Check if click is outside both elements
    if (
      searchInput &&
      !searchInput.contains(event.target) &&
      filterButton &&
      !filterButton.contains(event.target)
    ) {
      setFilterOpen(false);
      setSearchActive(false);
      setSearchResults(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function SkeletonCard() {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-md w-full animate-pulse">
        <div className="flex items-center gap-3 bg-violet-100/40 dark:bg-gray-700 rounded-md px-3 py-2 mb-4">
          <div className="w-10 h-10 bg-blue-200 dark:bg-gray-600 rounded-full" />
          <div className="w-32 h-4 bg-blue-200 dark:bg-gray-600 rounded" />
        </div>
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6 mt-2"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 dark:border-gray-700 pb-4 bg-white dark:bg-gray-800 py-6 px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 ml-18">
              Available Posts
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-yellow-500 hover:text-yellow-600"}`}
            >
              {theme === "dark" ? (
                <IoMdSunny size={20} />
              ) : (
                <FaMoon size={20} />
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Search */}
            <div className="relative inline-block w-full max-w-xs sm:w-auto">
              <input
                type="text"
                placeholder="Search posts..."
                className="pr-10 h-10 w-full pl-4 text-sm border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                value={searchQuery}
                onFocus={() => setSearchActive(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setSearchActive(false);
                    setSearchResults(null);
                  }, 200);
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Filter */}
            <div className="relative" ref={filterRef}>
              <button
                className="w-full !bg-[#AD46FF] text-white text-sm py-2 rounded-md hover:!bg-[#9c3aeb] active:!bg-[#8a2fd9] transition-colors"
                onClick={() => {
                  setFilterOpen(!filterOpen);
                  setSelectedFilter(null);
                }}
              >
                Filter
              </button>

              {filterOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {!selectedFilter ? (
                      <div>
                        <div
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setSelectedFilter("title")}
                        >
                          Sort by Title
                        </div>
                        <div
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setSelectedFilter("author")}
                        >
                          Filter by Author
                        </div>
                        <div
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setSelectedFilter("category")}
                        >
                          Filter by Category
                        </div>
                      </div>
                    ) : (
                      <div>
                        {selectedFilter === "title" && (
                          <div>
                            <div
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer pl-8"
                              onClick={() => handleTitleSort("a-z")}
                            >
                              A-Z Alphabetical
                            </div>
                            <div
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer pl-8"
                              onClick={() => handleTitleSort("z-a")}
                            >
                              Z-A Reverse
                            </div>
                          </div>
                        )}
                        {selectedFilter === "author" && (
                          <div>
                            {authors.map((author, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer pl-8"
                                onClick={() => handleAuthorFilter(author)}
                              >
                                {author}
                              </div>
                            ))}
                          </div>
                        )}
                        {selectedFilter === "category" && (
                          <div>
                            {categories.map((category, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer pl-8"
                                onClick={() => handleCategoryFilter(category)}
                              >
                                {category}
                              </div>
                            ))}
                          </div>
                        )}
                        <div
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-t border-gray-100"
                          onClick={() => setSelectedFilter(null)}
                        >
                          ← Back
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="p-4 bg-purple-50 dark:bg-gray-700 min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : searchResults !== null
                ? searchData
                : showData}
          </div>
        </div>
      </div>
    </div>
  );
}
