import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  section: null,
};

export const sectionSlice = createSlice({
  name: "section",
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
    getAddRestaurantSection: (state, action) => {
      state.loading = false;
      state.error = null;
      state.section = action.payload;
    },
    // delete user profile
    logoutSection: (state) => {
      state.loading = false;
      state.error = null;
      state.section = null;
    },
  },
});

export const { startCall, catchError, getAddRestaurantSection, logoutSection } =
  sectionSlice.actions;

export default sectionSlice.reducer;
