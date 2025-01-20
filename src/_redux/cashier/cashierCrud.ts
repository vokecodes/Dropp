import { store } from "../../store";
import { QSR_CASHIER_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getQsrCashier = () => {
  return SERVER.get(QSR_CASHIER_URL);
};

export const addQsrCashier = (data: any) => {
  return SERVER.post(QSR_CASHIER_URL, { ...data });
};

export const updateQsrCashier = (data: any, tableId: string) => {
  return SERVER.patch(`${QSR_CASHIER_URL}/${tableId}`, {
    ...data,
  });
};

export const deleteQsrCashier = (tableId: string) => {
  return SERVER.delete(`${QSR_CASHIER_URL}/${tableId}`);
};

export const getCashierQsrSubAdmin = () => {
  return SERVER.get(`${QSR_CASHIER_URL}/sub-admin/cashier`);
};

export const addCashierQsrSubAdmin = (data: any) => {
  return SERVER.post(`${QSR_CASHIER_URL}/sub-admin/cashier`, { ...data });
};

export const updateCashierQsrSubAdmin = (data: any, tableId: string) => {
  return SERVER.patch(`${QSR_CASHIER_URL}/sub-admin/${tableId}/cashier`, {
    ...data,
  });
};

export const deleteCashierQsrSubAdmin = (tableId: string) => {
  return SERVER.delete(`${QSR_CASHIER_URL}/sub-admin/${tableId}/cashier`);
};