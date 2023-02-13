import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slice/postSlice";
import userReducer from '../slice/userslice';
import themeReducer from "../slice/themeSlice";
import searchReducer from "../slice/searchPostSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer,
        theme: themeReducer,
        postSearch: searchReducer
    }
})

export default store

