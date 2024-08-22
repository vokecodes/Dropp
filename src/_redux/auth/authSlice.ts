import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export const authSLice = createSlice({
  name: "auth",
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
    // register user
    registerLoginAccount: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    // register user
    forgotResetAccount: (state) => {
      state.loading = false;
      state.error = null;
    },
    // logout user
    logoutAccount: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
  },
});

export const {
  startCall,
  catchError,
  registerLoginAccount,
  forgotResetAccount,
  logoutAccount,
} = authSLice.actions;

export default authSLice.reducer;
