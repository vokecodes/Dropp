import axios from "axios";
import { store } from "../store";
import { BASE_API_URL } from "../_redux/urls";

export const SERVER = axios.create({
  baseURL: BASE_API_URL,
  // timeout: 7000,
});

SERVER.interceptors.request.use(
  async (config: any) => {
    const { auth: user }: any = store.getState();
    const token = user?.user?.token;

    if (token) {
      config.headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...config.headers,
      };

      return config;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
