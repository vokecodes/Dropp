import { COMPANY_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const createEmployees = (data: any) => {
  return SERVER.post(`${COMPANY_URL}/employee`, { ...data });
};


export const getEmployeesCompany = () => {
  return SERVER.get(`${COMPANY_URL}/employee`);
};

export const fundEmployeesCompany = (payload: any) => {
  return SERVER.post(`${COMPANY_URL}/employee/fund`, payload);
};

export const freezeEmployeesCompany = (payload: any) => {
  return SERVER.patch(`${COMPANY_URL}/employee/freeze`, payload);
};

export const unfreezeEmployeesCompany = (payload: any) => {
  return SERVER.patch(`${COMPANY_URL}/employee/unfreeze`, payload);
};

export const removeEmployeesCompany = (payload: any) => {
  console.log('payload-remove= ', payload)
  return SERVER.delete(`${COMPANY_URL}/employee/remove/${payload}`);
};
