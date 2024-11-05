import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  hideLoading: false,
  error: null,
  table: null,
  superWaiter: null,
};

export const tableSlice = createSlice({
  name: "table",
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
    getAddUpdateRestaurantTable: (state, action) => {
      state.loading = false;
      state.error = null;
      state.table = action.payload;
    },
    // add update menu
    getAddUpdateSuperWaiter: (state, action) => {
      state.loading = false;
      state.error = null;
      state.superWaiter = action.payload;
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
      state.table = action.payload;
    },
    // delete user profile
    logoutMenu: (state) => {
      state.loading = false;
      state.hideLoading = false;
      state.error = null;
      state.table = null;
    },
  },
});

export const {
  startCall,
  catchError,
  getAddUpdateRestaurantTable,
  getAddUpdateSuperWaiter,
  hideStartCall,
  hideCatchError,
  showHideDinningMenuUpdate,
  logoutMenu,
} = tableSlice.actions;

export default tableSlice.reducer;