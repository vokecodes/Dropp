import { store } from "../../store";
import { CHEF_SUBSCRIPTION_MENU_URL, SUB_CHEF_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getChefSubscriptionMenu = () => {
  const { auth: user }: any = store.getState();
  return SERVER.get(`${CHEF_SUBSCRIPTION_MENU_URL}/${user?.user?.user?._id}`);
};

export const addChefSubscriptionMenu = (data: any) => {
  const { auth: user }: any = store.getState();
  return SERVER.post(`${CHEF_SUBSCRIPTION_MENU_URL}/${user?.user?.user?._id}`, {
    ...data,
  });
};

export const updateChefSubscriptionMenu = (data: any, menuId: string) => {
  const { auth: user }: any = store.getState();
  return SERVER.patch(
    `${CHEF_SUBSCRIPTION_MENU_URL}/${user?.user?.user?._id}/${menuId}`,
    { ...data }
  );
};

export const deleteChefSubscriptionMenu = (menuId: string) => {
  const { auth: user }: any = store.getState();
  return SERVER.delete(
    `${CHEF_SUBSCRIPTION_MENU_URL}/${user?.user?.user?._id}/${menuId}`
  );
};

export const getSubChefSubscriptionMenu = () => {
  return SERVER.get(`${SUB_CHEF_URL}/subscription-menu`);
};

export const addSubChefSubscriptionMenu = (data: any) => {
  return SERVER.post(`${SUB_CHEF_URL}/subscription-menu`, {
    ...data,
  });
};

export const updateSubChefSubscriptionMenu = (data: any, menuId: string) => {
  return SERVER.patch(`${SUB_CHEF_URL}/subscription-menu/${menuId}`, {
    ...data,
  });
};

export const deleteSubChefSubscriptionMenu = (menuId: string) => {
  return SERVER.delete(`${SUB_CHEF_URL}/subscription-menu/${menuId}`);
};
