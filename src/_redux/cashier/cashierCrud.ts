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