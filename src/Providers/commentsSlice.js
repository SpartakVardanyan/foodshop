import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coms: []
}

const commentsSlice = createSlice({
    name: 'CommentSlice',
    initialState,
    reducers: {
        getComments(state, action) {
            state.coms.push(...action.payload);
        }
    }
});

export const { getComments } = commentsSlice.actions;
export default commentsSlice.reducer;