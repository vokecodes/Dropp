import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  payment: null,
};

export const paymentSLice = createSlice({
  name: "payment",
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
    // update user profile
    getAddDeletePayment: (state, action) => {
      state.loading = false;
      state.error = null;
      state.payment = action.payload;
    },
    // delete user profile
    logoutPayment: (state) => {
      state.loading = false;
      state.error = null;
      state.payment = null;
    },
  },
});

export const { startCall, catchError, getAddDeletePayment, logoutPayment } =
  paymentSLice.actions;

export default paymentSLice.reducer;
