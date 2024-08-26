import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  hideLoading: false,
  error: null,
  menu: null,
};

export const menuSLice = createSlice({
  name: "menu",
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
    getAddUpdateMenu: (state, action) => {
      state.loading = false;
      state.error = null;
      state.menu = action.payload;
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
    showHideMenuUpdate: (state, action) => {
      state.hideLoading = false;
      state.error = null;
      state.menu = action.payload;
    },
    // delete user profile
    logoutMenu: (state) => {
      state.loading = false;
      state.hideLoading = false;
      state.error = null;
      state.menu = null;
    },
  },
});

export const {
  startCall,
  catchError,
  getAddUpdateMenu,
  hideStartCall,
  hideCatchError,
  showHideMenuUpdate,
  logoutMenu,
} = menuSLice.actions;

export default menuSLice.reducer;
