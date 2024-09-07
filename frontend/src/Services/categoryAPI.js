import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/categories";

//Create category api
export const createCategoryAPI = async(postData) => {
    const response = await axios.post(`${BASE_URL}/create`, postData, {
        withCredentials: true,
    });
    return response.data;
};

//Fetch all categories
export const fetchAllCategoriesAPI = async() => {
    const categories = await axios.get(BASE_URL);
    return categories.data;
}