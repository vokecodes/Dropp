import { CUSTOMER_FAVOURITE_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getChefs = () => {
  return SERVER.get(`${CUSTOMER_FAVOURITE_URL}/chefs`);
};
export const favoriteChef = (chefId: string) => {
  return SERVER.post(`${CUSTOMER_FAVOURITE_URL}/chefs/${chefId}`, {});
};

export const unFavoriteChef = (chefId: string) => {
  return SERVER.delete(`${CUSTOMER_FAVOURITE_URL}/chefs/${chefId}`);
};

export const getMeals = () => {
  return SERVER.get(`${CUSTOMER_FAVOURITE_URL}/menus`);
};

export const favoriteMeal = (chefId: string) => {
  return SERVER.post(`${CUSTOMER_FAVOURITE_URL}/menus/${chefId}`, {});
};

export const unFavoriteMeal = (chefId: string) => {
  return SERVER.delete(`${CUSTOMER_FAVOURITE_URL}/menus/${chefId}`);
};
