import { CHEF_SUBSCRIPTION_MENU_URL, SUBSCRIPTION_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const createSubscription = (data: any) => {
  return SERVER.post(`${SUBSCRIPTION_URL}`, { ...data });
};

export const createSubscriptionWallet = (data: any) => {
  return SERVER.post(`${SUBSCRIPTION_URL}/wallet`, { ...data });
};

export const checkUserFirstSubscription = () => {
  return SERVER.get(`${SUBSCRIPTION_URL}/exist`);
};

export const getSubscription = () => {
  return SERVER.get(`${SUBSCRIPTION_URL}`);
};

export const updateSubscription = (id: string, data: any) => {
  return SERVER.patch(`${SUBSCRIPTION_URL}/${id}`, { ...data });
};

export const completeSubscription = (id: string, data: any) => {
  return SERVER.patch(`${SUBSCRIPTION_URL}/complete/${id}`, { ...data });
};

export const getChefsSubscriptionMenus = () => {
  return SERVER.get(`${CHEF_SUBSCRIPTION_MENU_URL}/all`);
};
