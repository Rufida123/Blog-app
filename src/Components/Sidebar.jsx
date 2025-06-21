// Components/Sidebar.js
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import { toast } from "react-toastify";

export default function Sidebar() {
  const sidebarRef = useRef(null);
  const { userEmail, isLoggedIn, login, logout } = useAuthStore();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      login(email);
      setEmail("");
      setShowLoginForm(false);
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const handleLogout = () => {
    logout();
    navigate("/");
    toast.info("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 text-gray-700 hover:text-purple-600 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-purple-700 mb-6">Menu</h2>

          {isLoggedIn ? (
            <div className="mb-4 p-2 bg-purple-50 rounded-md">
              <p className="text-sm text-purple-700">
                Logged in as: {userEmail}
              </p>
              <button
                onClick={handleLogout}
                className="w-full mt-2 !bg-[#AD46FF] !text-white text-sm py-2 rounded-md hover:!bg-[#9c3aeb] active:!bg-[#8a2fd9] transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginForm(true)}
              className="w-full !bg-[#AD46FF] !text-white text-sm py-2 rounded-md hover:!bg-[#9c3aeb] active:!bg-[#8a2fd9] transition-colors"
            >
              Login
            </button>
          )}

          {showLoginForm && (
            <div className="mb-4 p-3 bg-purple-50 rounded-md">
              <form onSubmit={handleLogin}>
                <label className="block text-sm text-gray-700 mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm mb-2"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 !bg-[#AD46FF] text-white py-1 px-3 rounded-md text-sm hover:!bg-[#9c3aeb] transition-colors"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLoginForm(false)}
                    className="flex-1 !bg-gray-200 text-gray-700 py-1 px-3 rounded-md text-sm hover:!bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <nav>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 p-2 text-gray-700 hover:bg-purple-50 rounded-md transition"
                >
                  <i className="fas fa-home text-purple-500"></i>
                  <span>Home</span>
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="/favorites"
                      className="flex items-center gap-2 p-2 text-gray-700 hover:bg-purple-50 rounded-md transition"
                    >
                      <i className="fas fa-heart text-purple-500"></i>
                      <span>Favorites</span>
                    </Link>
                  </li>
                  {isLoggedIn && (
                    <li>
                      <Link
                        to="/create"
                        className="flex items-center gap-2 p-2 text-gray-700 hover:bg-purple-50 rounded-md transition"
                      >
                        <i className="fas fa-plus-circle text-purple-500"></i>
                        <span>Create Post</span>
                      </Link>
                    </li>
                  )}
                  {isLoggedIn && (
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 p-2 text-gray-700 hover:bg-purple-50 rounded-md transition"
                      >
                        <i className="fas fa-user text-purple-500"></i>
                        <span>Profile</span>
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
