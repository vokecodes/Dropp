import { store } from "../../store";
import { QSR_CASHIER_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getQsrCashier = () => {
  return SERVER.get(`${QSR_CASHIER_URL}/admin`);
};

export const addQsrCashier = (data: any) => {
  return SERVER.post(`${QSR_CASHIER_URL}/admin`, { ...data });
};

export const updateQsrCashier = (data: any, tableId: string) => {
  return SERVER.patch(`${QSR_CASHIER_URL}/admin/${tableId}`, {
    ...data,
  });
};

export const deleteQsrCashier = (tableId: string) => {
  return SERVER.delete(`${QSR_CASHIER_URL}/admin/${tableId}`);
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

// TERMINAL
export const getQsrTerminals = () => {
  return SERVER.get(`${QSR_CASHIER_URL}/terminal`);
};

export const addQsrTerminal = (data: any) => {
  return SERVER.post(`${QSR_CASHIER_URL}/terminal`, { ...data });
};

export const updateQsrTerminal = (data: any, tableId: string) => {
  return SERVER.patch(`${QSR_CASHIER_URL}/terminal/${tableId}`, {
    ...data,
  });
};

export const deleteQsrTerminal = (tableId: string) => {
  return SERVER.delete(`${QSR_CASHIER_URL}/terminal/${tableId}`);
};
