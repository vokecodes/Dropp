import { store } from "../../store";
import { RESTAURANT_TABLE_URL, SUB_CHEF_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getRestaurantTable = () => {
  return SERVER.get(RESTAURANT_TABLE_URL);
};

export const addRestaurantTable = (data: any) => {
  return SERVER.post(RESTAURANT_TABLE_URL, { ...data });
};

export const updateRestaurantTable = (data: any, tableId: string) => {
  return SERVER.patch(`${RESTAURANT_TABLE_URL}/${tableId}`, {
    ...data,
  });
};

export const deleteRestaurantTable = (tableId: string) => {
  return SERVER.delete(`${RESTAURANT_TABLE_URL}/${tableId}`);
};

export const addRestaurantSuperWaiter = (data: any) => {
  return SERVER.post(`${RESTAURANT_TABLE_URL}/super`, { ...data });
};

export const updateRestaurantSuperWaiter = (data: any, tableId: string) => {
  return SERVER.patch(`${RESTAURANT_TABLE_URL}/super/${tableId}`, {
    ...data,
  });
};

export const deleteRestaurantSuperWaiter = (tableId: string) => {
  return SERVER.delete(`${RESTAURANT_TABLE_URL}/super/${tableId}`);
};

export const getSubChefRestaurantTable = () => {
  return SERVER.get(`${SUB_CHEF_URL}/restaurant-table`);
};

export const addSubChefRestaurantTable = (data: any) => {
  return SERVER.post(`${SUB_CHEF_URL}/restaurant-table`, { ...data });
};

export const updateSubChefRestaurantTable = (data: any, tableId: string) => {
  return SERVER.patch(`${SUB_CHEF_URL}/restaurant-table/${tableId}`, {
    ...data,
  });
};

export const deleteSubChefRestaurantTable = (tableId: string) => {
  return SERVER.delete(`${SUB_CHEF_URL}/restaurant-table/${tableId}`);
};

export const addSubChefSuperWaiter = (data: any) => {
  return SERVER.post(`${SUB_CHEF_URL}/super`, { ...data });
};

export const updateSubChefSuperWaiter = (data: any, tableId: string) => {
  return SERVER.patch(`${SUB_CHEF_URL}/super/${tableId}`, {
    ...data,
  });
};

export const deleteSubChefSuperWaiter = (tableId: string) => {
  return SERVER.delete(`${SUB_CHEF_URL}/super/${tableId}`);
};
