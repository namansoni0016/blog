import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/plans";

//Create plan api
export const createPlanAPI = async(plansData) => {
    const response = await axios.post(`${BASE_URL}/create`, plansData, {
        withCredentials: true,
    });
    return response.data;
};

//Fetch all plans
export const fetchAllPlansAPI = async() => {
    const plans = await axios.get(BASE_URL);
    return plans.data;
}

//Fetch a single plans
export const fetchPlanAPI = async(id) => {
    const plan = await axios.get(`${BASE_URL}/${id}`);
    return plan.data;
}