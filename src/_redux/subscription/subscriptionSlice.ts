import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getLoading: false,
  loading: false,
  error: null,
  subscription: null,
  chefsMenus: null,
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    //get loading
    startGetCall: (state) => {
      state.getLoading = true;
      state.error = null;
    },
    //stop get loading
    stopGetCall: (state) => {
      state.getLoading = false;
      state.error = null;
    },
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
    // ad get subscription
    addGetSubscription: (state, action) => {
      state.loading = false;
      state.error = null;
      state.subscription = action.payload;
    },
    // get subscription chefs and menu
    getSubscriptionChefsMenus: (state, action) => {
      state.loading = false;
      state.error = null;
      state.chefsMenus = action.payload;
    },
    // delete subscription
    logoutSubscription: (state) => {
      state.getLoading = false;
      state.loading = false;
      state.error = null;
      state.subscription = null;
      state.chefsMenus = null;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  startCall,
  catchError,
  addGetSubscription,
  getSubscriptionChefsMenus,
  logoutSubscription,
  stopLoading,
  startLoading,
  startGetCall,
  stopGetCall,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
