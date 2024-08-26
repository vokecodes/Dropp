import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  cards: null,
};

export const cardSLice = createSlice({
  name: "cards",
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
    // get add delete cards
    getAddDeleteCard: (state, action) => {
      state.loading = false;
      state.error = null;
      state.cards = action.payload;
    },
    // delete cards
    logoutCard: (state) => {
      state.loading = false;
      state.error = null;
      state.cards = null;
    },
  },
});

export const { startCall, catchError, getAddDeleteCard, logoutCard } =
  cardSLice.actions;

export default cardSLice.reducer;
