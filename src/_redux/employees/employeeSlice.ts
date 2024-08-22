import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  employees: null,
};

export const employeeSlice = createSlice({
  name: "employees",
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
    // employees
    getEmployees: (state, action) => {
      state.loading = false;
      state.error = null;
      state.employees = action.payload;
    },

    // logout company employees
    logoutEmployees: (state) => {
      state.loading = false;
      state.error = null;
      state.employees = null;
    },
  },
});

export const {
  startCall,
  catchError,
  getEmployees,
  logoutEmployees,
} = employeeSlice.actions;

export default employeeSlice.reducer;
