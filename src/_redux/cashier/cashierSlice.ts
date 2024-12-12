import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  hideLoading: false,
  error: null,
  cashier: null,
  cashiers: null,
};

export const cashierSLice = createSlice({
  name: "cashier",
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
    getAddUpdateCashier: (state, action) => {
      state.loading = false;
      state.error = null;
      state.cashiers = action.payload;
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
    // cashier login
    loginCashier: (state, action) => {
      state.cashier = action.payload;
    },
    // cashier logout
    logoutCashier: (state) => {
      state.cashier = null;
      state.cashiers = null;
    },
  },
});

export const { startCall, catchError, getAddUpdateCashier, hideStartCall, hideCatchError, loginCashier, logoutCashier } = cashierSLice.actions;

export default cashierSLice.reducer;