import { configureStore } from "@reduxjs/toolkit";
import mealsSlice from "./mealsSlice";
import usersSlice from "./usersSlice";

const store = configureStore({
    reducer: {
        users: usersSlice,
        cartItems: mealsSlice
    }
});

export default store;