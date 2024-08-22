import { store } from "../../store";
import { CHEF_PAYMENT_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getChefPayment = () => {
  const { auth: user }: any = store.getState();
  return SERVER.get(`${CHEF_PAYMENT_URL}/${user?.user?.user?._id}`);
};

export const addChefPayment = (data: any) => {
  const { auth: user }: any = store.getState();
  return SERVER.post(`${CHEF_PAYMENT_URL}/${user?.user?.user?._id}`, {
    ...data,
  });
};

export const deleteChefPayment = (paymentId: string) => {
  const { auth: user }: any = store.getState();
  return SERVER.delete(
    `${CHEF_PAYMENT_URL}/${user?.user?.user?._id}/${paymentId}`
  );
};
