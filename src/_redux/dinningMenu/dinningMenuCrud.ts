import { BASE_API_URL, QSR_CASHIER_URL, SUB_CHEF_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getChefDineInMenu = () => {
  return SERVER.get(`${BASE_API_URL}/dinning-menu`);
};

export const addChefDineInMenu = (data: any) => {
  return SERVER.post(`${BASE_API_URL}/dinning-menu`, { ...data });
};

export const updateChefDineInMenu = (data: any, menuId: string) => {
  return SERVER.patch(`${BASE_API_URL}/dinning-menu/${menuId}`, {
    ...data,
  });
};

export const deleteChefDineInMenu = (menuId: string) => {
  return SERVER.delete(`${BASE_API_URL}/dinning-menu/${menuId}`);
};



export const getQsrSubAdminDineInMenuCrud = () => {
  return SERVER.get(`${QSR_CASHIER_URL}/sub-admin/dinning-menu`);
};

export const addQsrSubAdminDineInMenuCrud = (data: any) => {
  return SERVER.post(`${QSR_CASHIER_URL}/sub-admin/dinning-menu`, { ...data });
};

export const updateQsrSubAdminDineInMenuCrud = (data: any, menuId: string) => {
  return SERVER.patch(`${QSR_CASHIER_URL}/sub-admin/dinning-menu/${menuId}`, {
    ...data,
  });
};

export const updateQsrCashierDineInMenuCrud = (data: any, menuId: string, chefId: string) => {
  return SERVER.patch(`${QSR_CASHIER_URL}/cashier/dinning-menu/${chefId}/${menuId}`, {
    ...data,
  });
};

export const deleteQsrSubAdminDineInMenuCrud = (menuId: string) => {
  return SERVER.delete(`${QSR_CASHIER_URL}/sub-admin/dinning-menu/${menuId}`);
};



export const getSubChefDineInMenu = () => {
  return SERVER.get(`${SUB_CHEF_URL}/dinning-menu`);
};

export const addSubChefDineInMenu = (data: any) => {
  return SERVER.post(`${SUB_CHEF_URL}/dinning-menu`, { ...data });
};

export const updateSubChefDineInMenu = (data: any, menuId: string) => {
  return SERVER.patch(`${SUB_CHEF_URL}/dinning-menu/${menuId}`, { ...data });
};

export const subChefDeleteChefDineInMenu = (menuId: string) => {
  return SERVER.delete(`${SUB_CHEF_URL}/dinning-menu/${menuId}`);
};

export const getSubChefDineInMenuCategories = () => {
  return SERVER.get(`${SUB_CHEF_URL}/dinning-menu-categories`);
};

export const updateSubChefDineInMenuCategories = (data: any) => {
  return SERVER.patch(`${SUB_CHEF_URL}/dinning-menu-categories`, { ...data });
};
