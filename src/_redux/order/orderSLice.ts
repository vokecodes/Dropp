import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  orders: null,
  subscriptionOrders: null,
  restaurantOrders: null,
};

export const orderSLice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // start call
    startCall: (state) => {
      state.loading = true;
      state.error = null;
    },
    // catch error
    catchError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    // orders
    getOrders: (state, action) => {
      state.loading = false;
      state.error = null;
      state.orders = action.payload;
    },

    getSubscriptionOrders: (state, action) => {
      state.loading = false;
      state.error = null;
      state.subscriptionOrders = action.payload;
    },
    getRestaurantOrders: (state, action) => {
      state.loading = false;
      state.error = null;
      state.restaurantOrders = action.payload;
    },
    // delete user order
    logoutOrders: (state) => {
      state.loading = false;
      state.error = null;
      state.orders = null;
      state.subscriptionOrders = null;
      state.restaurantOrders = null;
    },
  },
});

export const {
  startCall,
  catchError,
  getOrders,
  logoutOrders,
  getSubscriptionOrders,
  getRestaurantOrders,
} = orderSLice.actions;

export default orderSLice.reducer;
