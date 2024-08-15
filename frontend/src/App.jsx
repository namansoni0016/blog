import { useState } from 'react';
import CreatePost from './components/Posts/CreatePost';
import PostList from './components/Posts/PostList';

function App() {
  return (
    <div>
      <CreatePost/>
      <PostList/>
    </div>
  )
}

export default App
