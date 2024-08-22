import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  business: null,
};

export const businessSLice = createSlice({
  name: "business",
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
    getAddUpdateBusiness: (state, action) => {
      state.loading = false;
      state.error = null;
      state.business = action.payload;
    },
    // delete user profile
    logoutBusiness: (state) => {
      state.loading = false;
      state.error = null;
      state.business = null;
    },
  },
});

export const { startCall, catchError, getAddUpdateBusiness, logoutBusiness } =
  businessSLice.actions;

export default businessSLice.reducer;
