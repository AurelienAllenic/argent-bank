import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Slices";

export default configureStore({
    reducer: {
        user: userReducer
    }
})