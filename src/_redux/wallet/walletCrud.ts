import { WALLET_URL, COMPANY_WALLET_URL, BASE_API_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getUserWallet = () => {
  return SERVER.get(`${WALLET_URL}`);
};

export const getCompanyWallet = () => {
  return SERVER.get(`${COMPANY_WALLET_URL}`);
};

export const companyExportTransactions = (data: any) => {
  return SERVER.get(`${COMPANY_WALLET_URL}/export/${data}`);
};

export const downloadCompanyExport = (data: any) => {
  return SERVER.get(`${BASE_API_URL}/download/${data}`);
};
