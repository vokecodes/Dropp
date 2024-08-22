import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  transactions: null,
};

export const transactionSLice = createSlice({
  name: "transactions",
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
    // get user transactions
    getTransactions: (state, action) => {
      state.loading = false;
      state.error = null;
      state.transactions = action.payload;
    },
    // delete user transactions
    logoutTransactions: (state) => {
      state.loading = false;
      state.error = null;
      state.transactions = null;
    },
  },
});

export const { startCall, catchError, getTransactions, logoutTransactions } =
  transactionSLice.actions;

export default transactionSLice.reducer;
