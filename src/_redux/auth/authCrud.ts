import { SERVER } from "../../config/axios";
import { REFERRAL_CODE_URL } from "../urls";

export const authAPI = (url: string, data: any) =>
  SERVER.post(url, { ...data });

export const verifyReferralCode = (code: string) =>
  SERVER.get(`${REFERRAL_CODE_URL}/valid/${code}`);
