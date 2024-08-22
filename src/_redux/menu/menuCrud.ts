import { store } from "../../store";
import { CHEF_MENU_URL, SUB_CHEF_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getChefMenu = () => {
  const { auth: user }: any = store.getState();
  return SERVER.get(`${CHEF_MENU_URL}/${user?.user?.user?._id}`);
};

export const addChefMenu = (data: any) => {
  const { auth: user }: any = store.getState();
  return SERVER.post(`${CHEF_MENU_URL}/${user?.user?.user?._id}`, { ...data });
};

export const updateChefMenu = (data: any, menuId: string) => {
  const { auth: user }: any = store.getState();
  return SERVER.patch(`${CHEF_MENU_URL}/${user?.user?.user?._id}/${menuId}`, {
    ...data,
  });
};

export const deleteChefMenu = (menuId: string) => {
  const { auth: user }: any = store.getState();
  return SERVER.delete(`${CHEF_MENU_URL}/${user?.user?.user?._id}/${menuId}`);
};

export const getSubChefMenu = () => {
  return SERVER.get(`${SUB_CHEF_URL}/menu`);
};

export const subChefDeleteChefMenu = (menuId: string) => {
  return SERVER.delete(`${SUB_CHEF_URL}/menu/${menuId}`);
};

export const addSubChefMenu = (data: any) => {
  return SERVER.post(`${SUB_CHEF_URL}/menu`, { ...data });
};

export const updateSubChefMenu = (data: any, menuId: string) => {
  return SERVER.patch(`${SUB_CHEF_URL}/menu/${menuId}`, {
    ...data,
  });
};
