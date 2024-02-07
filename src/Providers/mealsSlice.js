import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0
};

const cartItemsSlice = createSlice({
    name: "cart-items",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const totalPrice = +(state.totalPrice + (action.payload.price * action.payload.amount)).toFixed(2);
            const existingItemIndex = state.items.findIndex(({id}) => id === action.payload.id);

            if(existingItemIndex === -1) {
                state.items.push(action.payload);
            } else {
                const existingItem = state.items[existingItemIndex];
                const updatedItem = {...existingItem, amount: existingItem.amount + action.payload.amount};
                
                state.items[existingItemIndex] = updatedItem;
            }

            state.totalPrice = totalPrice;
        },
        removeFromCart: (state, action) => {
            const existingItemIndex = state.items.findIndex(({id}) => id === action.payload.id);
            const existingItem = state.items[existingItemIndex];
            const totalPrice = +(state.totalPrice - existingItem.price).toFixed(2);

            if(existingItem.amount === 1) {
                state.items = state.items.filter(({id}) => id !== action.payload.id);
            } else {    
                const updatedItem = {...existingItem, amount: existingItem.amount - 1};
                state.items[existingItemIndex] = updatedItem;
            }

            state.totalPrice = totalPrice;
        }
    }
});

export const { addToCart, removeFromCart } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;