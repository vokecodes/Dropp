import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartChef: null,
};

export const cartSLice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart
    addItems: (state, action) => {
      state.cart = action.payload;
    },
    // select chef
    selectChef: (state, action) => {
      state.cartChef = action.payload;
    },
    // clear cart
    clearItems: (state) => {
      state.cart = [];
      state.cartChef = null;
    },
  },
});

export const { addItems, clearItems, selectChef } = cartSLice.actions;

export default cartSLice.reducer;
