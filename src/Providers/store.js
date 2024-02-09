import { configureStore } from "@reduxjs/toolkit";
import mealsSlice from "./mealsSlice";
import usersSlice from "./usersSlice";
import commentsSlice from "./commentsSlice";

const store = configureStore({
    reducer: {
        users: usersSlice,
        cartItems: mealsSlice,
        comments: commentsSlice
    }
});

export default store;