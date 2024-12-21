import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  user: null,
  wallet: null,
  walletTransaction: null,
  restaurantWallet: null,
  restaurantWalletTransaction: null,
  subChefs: null,
  subAdmins: null,
  dashboardLoading: false,
  dashboard: null,
  chartData: null,
};

export const userSLice = createSlice({
  name: "user",
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
    updateProfileAccount: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    // get user wallet
    getWallet: (state, action) => {
      state.loading = false;
      state.error = null;
      state.wallet = action.payload;
    },
    // get user wallet transaction
    getWalletTransaction: (state, action) => {
      state.loading = false;
      state.error = null;
      state.walletTransaction = action.payload;
    },
    // get chef restaurant wallet
    getRestaurantWallet: (state, action) => {
      state.loading = false;
      state.error = null;
      state.restaurantWallet = action.payload;
    },
    // get chef restaurant wallet transaction
    getRestaurantWalletTransaction: (state, action) => {
      state.loading = false;
      state.error = null;
      state.restaurantWalletTransaction = action.payload;
    },
    // get sub chefs
    getSubChefs: (state, action) => {
      state.loading = false;
      state.error = null;
      state.subChefs = action.payload;
    },
    getSubAdmins: (state, action) => {
      state.loading = false;
      state.error = null;
      state.subAdmins = action.payload;
    },
    // start dashboard call
    startDashboardCall: (state) => {
      state.dashboardLoading = true;
    },
    // catch dashboard error
    stopDashboardCall: (state) => {
      state.dashboardLoading = false;
    },
    // get sub chefs
    getRestaurantDashboard: (state, action) => {
      state.dashboardLoading = false;
      state.dashboard = action.payload;
    },
    // get admin dash
    getAdminDashboard: (state, action) => {
      state.dashboardLoading = false;
      state.dashboard = action.payload;
    },
    // get chart
    getMonthlyChart: (state, action) => {
      state.dashboardLoading = false;
      state.chartData = action.payload;
    },
    // delete user profile
    logoutUserProfile: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.wallet = null;
      state.walletTransaction = null;
      state.restaurantWallet = null;
      state.restaurantWalletTransaction = null;
      state.subChefs = null;
      state.dashboardLoading = false;
      state.dashboard = null;
      state.chartData = null;
    },
  },
});

export const {
  startCall,
  catchError,
  updateProfileAccount,
  logoutUserProfile,
  getWallet,
  getWalletTransaction,
  getRestaurantWallet,
  getRestaurantWalletTransaction,
  getSubChefs,
  getSubAdmins,
  getRestaurantDashboard,
  getAdminDashboard,
  getMonthlyChart,
  startDashboardCall,
  stopDashboardCall,
} = userSLice.actions;

export default userSLice.reducer;
