import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreatePost from './components/Posts/CreatePost';
import PostList from './components/Posts/PostList';
import PublicNavbar from "./components/Navbar/PublicNavbar";
import HomePage from "./components/HomePage";
import UpdatePost from "./components/Posts/UpdatePost";

function App() {
  return (
    <BrowserRouter>
    <PublicNavbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/lists" element={<PostList/>}/>
        <Route path="/posts/:postId" element={<UpdatePost/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
