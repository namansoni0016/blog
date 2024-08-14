import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/posts/create";
//Creating a function that must return a promise
export const createPostAPI = async(postData) => {
    console.log(postData);
    const response = await axios.post(BASE_URL, {
        title: postData.title,
        description: postData.description,
    });
    return response.data; 
}