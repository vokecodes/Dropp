import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  wallet: null,
};

export const walletSLice = createSlice({
  name: "wallet",
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
    getWallet: (state, action) => {
      state.loading = false;
      state.error = null;
      state.wallet = action.payload;
    },
    // delete user transactions
    logoutWallet: (state) => {
      state.loading = false;
      state.error = null;
      state.wallet = null;
    },
  },
});

export const { startCall, catchError, getWallet, logoutWallet } =
  walletSLice.actions;

export default walletSLice.reducer;
