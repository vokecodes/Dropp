import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  hideLoading: false,
  error: null,
  dinningMenu: null,
};

export const dinningMenuSlice = createSlice({
  name: "dinningMenu",
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
    getAddUpdateDinningMenu: (state, action) => {
      state.loading = false;
      state.error = null;
      state.dinningMenu = action.payload;
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
    showHideDinningMenuUpdate: (state, action) => {
      state.hideLoading = false;
      state.error = null;
      state.dinningMenu = action.payload;
    },
    // delete user profile
    logoutDiningMenu: (state) => {
      state.loading = false;
      state.hideLoading = false;
      state.error = null;
      state.dinningMenu = null;
    },
  },
});

export const {
  startCall,
  catchError,
  getAddUpdateDinningMenu,
  hideStartCall,
  hideCatchError,
  showHideDinningMenuUpdate,
  logoutDiningMenu,
} = dinningMenuSlice.actions;

export default dinningMenuSlice.reducer;
