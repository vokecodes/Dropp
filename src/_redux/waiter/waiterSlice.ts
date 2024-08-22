import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  waiter: null,
};

export const waiterSLice = createSlice({
  name: "waiter",
  initialState,
  reducers: {
    // waiter login
    loginWaiter: (state, action) => {
      state.waiter = action.payload;
    },
    // waiter logout
    logoutWaiter: (state) => {
      state.waiter = null;
    },
  },
});

export const { loginWaiter, logoutWaiter } = waiterSLice.actions;

export default waiterSLice.reducer;
