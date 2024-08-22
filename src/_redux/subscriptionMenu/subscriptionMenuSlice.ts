import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  hideLoading: false,
  error: null,
  subscriptionMenu: null,
};

export const subscriptionMenuSlice = createSlice({
  name: "subscriptionMenu",
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
    // add update menu
    getAddUpdateSubscriptionMenu: (state, action) => {
      state.loading = false;
      state.error = null;
      state.subscriptionMenu = action.payload;
    },
    // hide start call
    hideStartCall: (state) => {
      state.hideLoading = true;
      state.error = null;
    },
    // hide catch error
    hideCatchError: (state, action) => {
      state.hideLoading = false;
      state.error = action.payload.error;
    },
    // show hide menu
    showHideSubscriptionMenuUpdate: (state, action) => {
      state.hideLoading = false;
      state.error = null;
      state.subscriptionMenu = action.payload;
    },
    // delete user profile
    logoutSubscriptionMenu: (state) => {
      state.loading = false;
      state.hideLoading = false;
      state.error = null;
      state.subscriptionMenu = null;
    },
  },
});

export const {
  startCall,
  catchError,
  getAddUpdateSubscriptionMenu,
  hideStartCall,
  hideCatchError,
  showHideSubscriptionMenuUpdate,
  logoutSubscriptionMenu,
} = subscriptionMenuSlice.actions;

export default subscriptionMenuSlice.reducer;
