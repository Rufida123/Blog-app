import { Route, Routes } from "react-router-dom";
import Posts from "./Posts";
import { PostsProvider } from "./Context/PostsContext";
import PostDetail from "./PostsDetail";
import FavoritesPage from "./FavoritesPage";
import ProfilePage from "./ProfilePage";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./Components/NotFoundPage";

function App() {
  return (
    <PostsProvider>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/postdetail/:id" element={<PostDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </PostsProvider>
  );
}

export default App;
