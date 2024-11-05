import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  waiter: null,
  superWaiter: null,
};

export const waiterSLice = createSlice({
  name: "waiter",
  initialState,
  reducers: {
    // waiter login
    loginWaiter: (state, action) => {
      state.waiter = action.payload;
    },
    // waiter login
    loginSuperWaiter: (state, action) => {
      state.superWaiter = action.payload;
    },
    // waiter logout
    logoutWaiter: (state) => {
      state.waiter = null;
      state.superWaiter = null;
    },
  },
});

export const { loginWaiter, loginSuperWaiter, logoutWaiter } = waiterSLice.actions;

export default waiterSLice.reducer;
