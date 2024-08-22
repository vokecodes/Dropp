import { TRANSACTION_URL, COMPANY_TRANSACTION_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getUserTransactions = () => {
  return SERVER.get(`${TRANSACTION_URL}/user`);
};


export const userWithdrawTransaction = (data: any) => {
  return SERVER.post(`${TRANSACTION_URL}/withdraw`, { ...data });
};

export const getCompanyTransactions = () => {
  return SERVER.get(`${COMPANY_TRANSACTION_URL}`);
};