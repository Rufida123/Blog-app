import { Route, Routes } from "react-router-dom";
import Posts from './Posts';
import { PostsProvider } from './Components/PostsContext';
import PostDetail from './PostsDetail';

function App() {
  return (
    <PostsProvider>
    <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/postdetail/:id" element={<PostDetail />} />
      </Routes>
      </PostsProvider>
  )
}

export default App
