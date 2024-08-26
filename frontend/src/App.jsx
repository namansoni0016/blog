import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreatePost from './components/Posts/CreatePost';
import PostList from './components/Posts/PostList';
import PublicNavbar from "./components/Navbar/PublicNavbar";
import HomePage from "./components/Home/HomePage";
import UpdatePost from "./components/Posts/UpdatePost";
import PostDetails from "./components/Posts/PostDetails";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";

function App() {
  return (
    <BrowserRouter>
    <PublicNavbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/posts" element={<PostList/>}/>
        {/* <Route path="/posts/:postId" element={<UpdatePost/>}/> */}
        <Route path="/posts/:postId" element={<PostDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
