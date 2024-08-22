import {
  getChefs,
  favoriteChef,
  unFavoriteChef,
  getMeals,
  favoriteMeal,
  unFavoriteMeal,
} from "./favouriteCrud";
import {
  startChefCall,
  catchChefError,
  startMealCall,
  catchMealError,
  favouriteChefs,
  favouriteMeals,
} from "./favouriteSLice";

export const getFavouriteChefs = () => (dispatch: any) => {
  dispatch(startChefCall());
  return getChefs()
    .then(({ data }) => dispatch(favouriteChefs(data?.favouriteChefs)))
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchChefError({ error: error?.message }));
    });
};

export const favoriteAChef = (chefId: string) => (dispatch: any) => {
  dispatch(startChefCall());
  return favoriteChef(chefId)
    .then(({ data }) => {
      dispatch(favouriteChefs(data?.favouriteChefs));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchChefError({ error: error?.message }));
    });
};

export const unFavoriteAChef = (chefId: string) => (dispatch: any) => {
  dispatch(startChefCall());
  return unFavoriteChef(chefId)
    .then(({ data }) => {
      dispatch(favouriteChefs(data?.favouriteChefs));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchChefError({ error: error?.message }));
    });
};

export const getFavouriteMeals = () => (dispatch: any) => {
  dispatch(startMealCall());
  return getMeals()
    .then(({ data }) => dispatch(favouriteMeals(data?.favouriteMenus)))
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchMealError({ error: error?.message }));
    });
};

export const favoriteAMeal = (menuId: string) => (dispatch: any) => {
  dispatch(startMealCall());
  return favoriteMeal(menuId)
    .then(({ data }) => {
      dispatch(favouriteMeals(data?.favouriteMenus));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchMealError({ error: error?.message }));
    });
};

export const unFavoriteAMeal = (menuId: string) => (dispatch: any) => {
  dispatch(startMealCall());
  return unFavoriteMeal(menuId)
    .then(({ data }) => {
      dispatch(favouriteMeals(data?.favouriteMenus));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchMealError({ error: error?.message }));
    });
};
