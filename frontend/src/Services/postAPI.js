import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/posts";
//Creating a function that must return a promise
//Create Post API
export const createPostAPI = async(postData) => {
    const response = await axios.post(`${BASE_URL}/create`, postData, {
        withCredentials: true
    });
    return response.data; 
};

//Fetching Posts API
export const fetchAllPostsAPI = async(filters) => {
    const posts = await axios.get(BASE_URL, {
        params: filters,
    });
    return posts.data;
}

//Fetch a post
export const fetchPostAPI = async(postId) => {
    const post = await axios.get(`${BASE_URL}/${postId}`);
    return post.data
}

//Update Post API
export const updatePostAPI = async(postData) => {
    const response = await axios.put(`${BASE_URL}/${postData?.postId}`, {
        title: postData.title,
        description: postData.description,
    }, {
        withCredentials: true
    });
    return response.data; 
};

//Delete a post
export const deletePostAPI = async(postId) => {
    const post = await axios.delete(`${BASE_URL}/${postId}`, {
        withCredentials: true
    });
    return post.data
}

