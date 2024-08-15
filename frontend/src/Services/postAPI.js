import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/posts";
//Creating a function that must return a promise
//Create Post API
export const createPostAPI = async(postData) => {
    const response = await axios.post(`${BASE_URL}/create`, {
        title: postData.title,
        description: postData.description,
    });
    return response.data; 
};

//Fetching Posts API
export const fetchAllPostsAPI = async() => {
    const posts = await axios.get(BASE_URL);
    return posts.data;
}