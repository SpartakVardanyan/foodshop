import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    loggedIn: false
};

const usersSlice = createSlice({
    name: "usersActions",
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users.push(...action.payload);
        },
        signupUser: (state, action) => {
            state.users.push(...action.payload);
        },
        logedIn: (state, action) => {
            state.loggedIn = action.payload;
        }
    }
});

export default usersSlice.reducer;
export const { getUsers, signupUser, logedIn } = usersSlice.actions;