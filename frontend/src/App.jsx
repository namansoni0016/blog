import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreatePost from './components/Posts/CreatePost';
import PostList from './components/Posts/PostList';
import PublicNavbar from "./components/Navbar/PublicNavbar";
import HomePage from "./components/Home/HomePage";
import UpdatePost from "./components/Posts/UpdatePost";
import PostDetails from "./components/Posts/PostDetails";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import Profile from "./components/Users/Profile";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { checkAuthStatusAPI } from "./Services/usersAPI";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { isAuthenticated } from "./redux/slices/authSlices";

function App() {
  const { data } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI,
  });
  const dispatch = useDispatch();
    useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);
  // Get the login user from store
  const { userAuth } = useSelector((state) => state.auth);
  console.log(userAuth);
  return (
    <BrowserRouter>
    {userAuth ? <PrivateNavbar/> : <PublicNavbar/>};
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/posts" element={<PostList/>}/>
        {/* <Route path="/posts/:postId" element={<UpdatePost/>}/> */}
        <Route path="/posts/:postId" element={<PostDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
