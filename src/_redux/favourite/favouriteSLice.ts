import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chefLoading: false,
  chefError: null,
  mealLoading: false,
  mealError: null,
  chefs: null,
  meals: null,
};

export const favouriteSLice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    // start chef call
    startChefCall: (state) => {
      state.chefLoading = true;
      state.chefError = null;
    },
    // catch chef error
    catchChefError: (state, action) => {
      state.chefLoading = false;
      state.chefError = action.payload.error;
    },
    // start meal call
    startMealCall: (state) => {
      state.mealLoading = true;
      state.mealError = null;
    },
    // catch meal error
    catchMealError: (state, action) => {
      state.mealLoading = false;
      state.mealError = action.payload.error;
    },
    // favourite chefs
    favouriteChefs: (state, action) => {
      state.chefLoading = false;
      state.chefError = null;
      state.chefs = action.payload;
    },
    // favourite meals
    favouriteMeals: (state, action) => {
      state.mealLoading = false;
      state.mealError = null;
      state.meals = action.payload;
    },
    //logout favourite
    logoutFavourite: (state) => {
      state.chefLoading = false;
      state.chefError = null;
      state.mealLoading = false;
      state.mealError = null;
      state.chefs = null;
      state.meals = null;
    },
  },
});

export const {
  startChefCall,
  catchChefError,
  startMealCall,
  catchMealError,
  favouriteChefs,
  favouriteMeals,
  logoutFavourite,
} = favouriteSLice.actions;

export default favouriteSLice.reducer;
