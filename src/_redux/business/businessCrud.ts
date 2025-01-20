import { store } from "../../store";
import { CHEF_BUSINESS_URL, SUB_CHEF_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getChefBusiness = () => {
  const { auth: user }: any = store.getState();
  return SERVER.get(`${CHEF_BUSINESS_URL}/${user?.user?.user?._id}`);
};

export const addChefBusiness = (data: any) => {
  const { auth: user }: any = store.getState();
  return SERVER.post(`${CHEF_BUSINESS_URL}/${user?.user?.user?._id}`, {
    ...data,
  });
};

export const updateChefBusiness = (data: any) => {
  const { auth: user }: any = store.getState();
  return SERVER.patch(`${CHEF_BUSINESS_URL}/${user?.user?.user?._id}`, {
    ...data,
  });
};

export const getABusinessByName = (chefName: any) =>
  SERVER.get(`${CHEF_BUSINESS_URL}/name/${chefName}`);

export const getABusinessRestaurantByName = (chefName: any, hideMenus = true) =>
  SERVER.get(`${CHEF_BUSINESS_URL}/restaurant/${chefName}/${hideMenus}`);

export const getABusinessRestaurantOrderByName = (chefName: any) =>
  SERVER.get(`${CHEF_BUSINESS_URL}/restaurant-orders/${chefName}`);

export const getSubChefBusiness = () => {
  return SERVER.get(`${SUB_CHEF_URL}/business`);
};

export const updateSubChefBusiness = (data: any) => {
  return SERVER.patch(`${SUB_CHEF_URL}/business`, {
    ...data,
  });
};
