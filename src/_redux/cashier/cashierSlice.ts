import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  hideLoading: false,
  error: null,
  cashier: null,
  cashiers: null,
  terminals: null,
  terminal: null,
  terminalError: null,
};

export const cashierSLice = createSlice({
  name: "cashier",
  initialState,
  reducers: {
    // start call
    startCall: (state) => {
      state.loading = true;
      state.error = null;
      state.terminalError = null;
    },
    // catch error
    catchError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    // add update menu
    getAddUpdateCashier: (state, action) => {
      state.loading = false;
      state.error = null;
      state.cashiers = action.payload;
    },
    // hide start call
    hideStartCall: (state) => {
      state.hideLoading = true;
      state.error = null;
      state.terminalError = null;
    },
    // hide catch error
    hideCatchError: (state, action) => {
      state.hideLoading = false;
      state.error = action.payload.error;
    },
    // cashier login
    loginCashier: (state, action) => {
      state.cashier = action.payload;
    },
    // catch terminal error
    catchTerminalError: (state, action) => {
      state.loading = false;
      state.terminalError = action.payload.error;
    },
    // add update terminal
    getAddUpdateTerminal: (state, action) => {
      state.loading = false;
      state.error = null;
      state.terminals = action.payload;
    },
    // terminal login
    loginTerminal: (state, action) => {
      state.terminal = action.payload;
    },
    // cashier logout
    logoutCashier: (state) => {
      state.cashier = null;
      state.cashiers = null;
      state.terminal = null;
      state.terminals = null;
    },
  },
});

export const {
  startCall,
  catchError,
  getAddUpdateCashier,
  hideStartCall,
  hideCatchError,
  loginCashier,
  logoutCashier,
  catchTerminalError,
  getAddUpdateTerminal,
  loginTerminal,
} = cashierSLice.actions;

export default cashierSLice.reducer;
