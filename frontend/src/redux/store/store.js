import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlices";

//Creating store
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

