import { store } from "../../store";
import {
  ALL_CHEFS_URL,
  CHEF_URL,
  USER_URL,
  COMPANY_URL,
  SUB_CHEF_URL,
  RESTAURANT_ORDER_URL,
  ADMIN_DROPP_DASHBOARD_URL,
  ADMIN_ALL_RESTAURANTS,
} from "../urls";
import { SERVER } from "../../config/axios";

// CUESTOMER
export const updateUserProfile = (url: string, data: any) => {
  const { auth: user }: any = store.getState();
  return SERVER.patch(`${url}/${user?.user?.user?._id}`, { ...data });
};

export const getUserProfile = () => {
  const { auth: user }: any = store.getState();
  return SERVER.get(`${USER_URL}/${user?.user?.user?._id}`);
};

export const getUserWallet = () => {
  return SERVER.get(`${USER_URL}/wallet`);
};

export const getUserWalletTransaction = () => {
  return SERVER.get(`${USER_URL}/wallet/transaction`);
};

export const changeUserPassword = (data: any) => {
  const { auth: user }: any = store.getState();

  return SERVER.patch(`${USER_URL}/change-password/${user?.user?.user?._id}`, {
    ...data,
  });
};

// COMPANY
export const getCompanyProfile = () => {
  const { auth: user }: any = store.getState();
  return SERVER.get(`${COMPANY_URL}/${user?.user?.user?._id}`);
};

export const updateCompanyProfile = (url: string, data: any) => {
  const { auth: user }: any = store.getState();
  return SERVER.patch(`${url}/${user?.user?.user?._id}`, { ...data });
};

export const getCompanyWallet = () => {
  return SERVER.get(`${COMPANY_URL}/wallet`);
};

export const getCompanyWalletTransaction = () => {
  return SERVER.get(`${COMPANY_URL}/wallet/transaction`);
};

export const changeCompanyPassword = (data: any) => {
  const { auth: user }: any = store.getState();

  return SERVER.patch(
    `${COMPANY_URL}/change-password/${user?.user?.user?._id}`,
    {
      ...data,
    }
  );
};

// CHEF

export const updateChefProfile = (url: string, data: any) => {
  const { auth: user }: any = store.getState();
  return SERVER.patch(`${url}/${user?.user?.user?._id}`, { ...data });
};

export const getChefProfile = () => {
  const { auth: user }: any = store.getState();
  return SERVER.get(`${CHEF_URL}/${user?.user?.user?._id}`);
};

export const getChefWallet = () => {
  return SERVER.get(`${CHEF_URL}/wallet`);
};

export const getChefWalletTransaction = () => {
  return SERVER.get(`${CHEF_URL}/wallet/transaction`);
};

export const chefWalletWithdraw = (data: any) => {
  return SERVER.post(`${CHEF_URL}/wallet/withdraw`, { ...data });
};

export const getChefRestaurantWallet = () => {
  return SERVER.get(`${CHEF_URL}/restaurant-wallet`);
};

export const getChefRestaurantWalletTransaction = () => {
  return SERVER.get(`${CHEF_URL}/restaurant-wallet/transaction`);
};

export const chefRestaurantWalletWithdraw = (data: any) => {
  return SERVER.post(`${CHEF_URL}/restaurant-wallet/withdraw`, { ...data });
};

export const changeChefPassword = (data: any) => {
  const { auth: user }: any = store.getState();

  return SERVER.patch(`${CHEF_URL}/change-password/${user?.user?.user?._id}`, {
    ...data,
  });
};

export const getAllChefs = (page?: number, lastProcessedChefId?: string) => {
  let byPage = page ?? 1;
  let byPageProcessedChefId = lastProcessedChefId ?? "";

  return SERVER.get(`${ALL_CHEFS_URL}/${byPage}/${byPageProcessedChefId}`);
};

export const registerASubChef = (data: any) => {
  return SERVER.post(`${CHEF_URL}/sub-chef/register`, { ...data });
};

export const getChefSubChefs = () => {
  return SERVER.get(`${CHEF_URL}/sub-chef`);
};

export const deleteASubChef = (subChefId: string) => {
  return SERVER.delete(`${CHEF_URL}/sub-chef/${subChefId}`);
};

export const getSubChefProfile = () => {
  return SERVER.get(`${SUB_CHEF_URL}`);
};

export const updateSubChefProfile = (data: any) => {
  return SERVER.patch(SUB_CHEF_URL, { ...data });
};

export const changeSubChefPassword = (data: any) => {
  return SERVER.patch(`${SUB_CHEF_URL}/change-password`, {
    ...data,
  });
};

export const getRestaurantDashboardCrud = (
  fromDate = "",
  toDate = "",
  payment = "",
  section = "",
  table = "",
  breakdownOption = ""
) => {
  return SERVER.get(
    `${RESTAURANT_ORDER_URL}/dashboard?fromDate=${fromDate}&toDate=${toDate}&payment=${payment}&section=${section}&table=${table}&breakdownOption=${breakdownOption}`
  );
};

export const getRestaurantSubChefDashboardCrud = (
  fromDate = "",
  toDate = "",
  payment = "",
  section = "",
  table = ""
) => {
  return SERVER.get(
    `${SUB_CHEF_URL}/dashboard?fromDate=${fromDate}&toDate=${toDate}&payment=${payment}&section=${section}&table=${table}`
  );
};

export const getOrdersPage = (page = 1, fromDate = "", toDate = "") => {
  return SERVER.get(
    `${RESTAURANT_ORDER_URL}/orders?page=${page}&fromDate=${fromDate}&toDate=${toDate}`
  );
};

export const getSubChefOrdersPage = (page = 1, fromDate = "", toDate = "") => {
  return SERVER.get(
    `${SUB_CHEF_URL}/orders?page=${page}&fromDate=${fromDate}&toDate=${toDate}`
  );
};

export const getRestaurantOrdersPage = (
  page = 1,
  fromDate = "",
  toDate = "",
  payment = "",
  section = "",
  table = "",
  breakdownOption = ""
) => {
  return SERVER.get(
    `${RESTAURANT_ORDER_URL}/restaurant-orders?page=${page}&fromDate=${fromDate}&toDate=${toDate}&payment=${payment}&section=${section}&table=${table}&breakdownOption=${breakdownOption}`
  );
};

export const getSubChefRestaurantOrdersPage = (
  page = 1,
  fromDate = "",
  toDate = "",
  payment = "",
  section = "",
  table = ""
) => {
  return SERVER.get(`${SUB_CHEF_URL}/restaurant-orders?page=${page}&fromDate=${fromDate}&toDate=${toDate}&payment=${payment}&section=${section}&table=${table}`);
};

export const getAdminDashboardCrud = (
  fromDate = "",
  toDate = "",
  payment = "",
  section = "",
  table = ""
) => {
  return SERVER.get(
    `${ADMIN_DROPP_DASHBOARD_URL}/all?fromDate=${fromDate}&toDate=${toDate}`
  );
};

export const getAdminDashboardSingleCrud = (
  fromDate = "",
  toDate = "",
  restaurant = ""
) => {
  console.log('crud= ', restaurant)
  return SERVER.get(
    `${ADMIN_DROPP_DASHBOARD_URL}/${restaurant}?fromDate=${fromDate}&toDate=${toDate}&restaurantId=${restaurant}`
  );
};

export const getAdminRestaurantsCrud = () => {
  return SERVER.get(`${ADMIN_ALL_RESTAURANTS}`);
};

export const getAdminChartCrud = () => {
  return SERVER.get(`${ADMIN_DROPP_DASHBOARD_URL}/chart`);
};

