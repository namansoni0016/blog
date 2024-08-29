import axios from "axios";
import { BASE_URL } from "../utils/baseEndpoint";

export const registerAPI = async(userData) => {
    const response = await axios.post(`${BASE_URL}/users/register`, {
        username: userData?.username,
        password: userData?.password,
        email: userData?.email
    }, {
        withCredentials: true
    });
    return response.data;
}

export const loginAPI = async(userData) => {
    const response = await axios.post(`${BASE_URL}/users/login`, {
        username: userData?.username,
        password: userData?.password,
    }, {
        withCredentials: true
    });
    return response.data;
}

export const checkAuthStatusAPI = async() => {
    const response = await axios.get(`${BASE_URL}/users/checkAuthenticated`, {
        withCredentials: true
    });
    return response.data;
}