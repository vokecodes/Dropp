import {
  EVENT_URL,
  ORDER_URL,
  RESTAURANT_ORDER_URL,
  SUBSCRIPTION_URL,
  SUB_CHEF_URL,
} from "../urls";
import { SERVER } from "../../config/axios";

export const createAnOrder = (data: any) => {
  return SERVER.post(`${ORDER_URL}`, { ...data });
};

export const createAnOrderWallet = (data: any) => {
  return SERVER.post(`${ORDER_URL}/wallet`, { ...data });
};

export const createEventOrder = (data: any) => {
  return SERVER.post(`${EVENT_URL}/order`, { ...data });
};

export const getUserOrders = () => {
  return SERVER.get(`${ORDER_URL}`);
};

export const getChefUserOrders = () => {
  return SERVER.get(`${ORDER_URL}/chef`);
};

export const updateChefUserOrders = (id: string, data: any) => {
  return SERVER.patch(`${ORDER_URL}/${id}`, { ...data });
};

export const completeChefUserOrder = (id: string, data: any) => {
  return SERVER.patch(`${ORDER_URL}/complete/${id}`, { ...data });
};

export const getChefUserSubscriptionOrders = () => {
  return SERVER.get(`${SUBSCRIPTION_URL}/chef`);
};

export const createARestaurantOrder = (data: any) => {
  return SERVER.post(`${RESTAURANT_ORDER_URL}`, { ...data });
};

export const editARestaurantOrder = (menuId: string, data: any) => {
  return SERVER.patch(`${RESTAURANT_ORDER_URL}/add/${menuId}`, { ...data });
};

export const getRestaurantOrdersCrud = () => {
  return SERVER.get(`${RESTAURANT_ORDER_URL}/all-restaurant`);
};

export const getSubChefRestaurantOrders = () => {
  return SERVER.get(`${SUB_CHEF_URL}/all-restaurant`);
};
