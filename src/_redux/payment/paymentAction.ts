import {
  getChefPayment,
  addChefPayment,
  deleteChefPayment,
} from "./paymentCrud";
import { startCall, catchError, getAddDeletePayment } from "./paymentSlice";

export const getPayment = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefPayment()
    .then(({ data }) => {
      dispatch(getAddDeletePayment(data?.payment));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const addPayment =
  (data: any, closePaymentModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return addChefPayment(data)
      .then(({ data }) => {
        dispatch(getAddDeletePayment(data?.payment));
        closePaymentModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const deletePayment =
  (paymentId: string, setSelectedPayment: any) => (dispatch: any) => {
    dispatch(startCall());
    return deleteChefPayment(paymentId)
      .then(({ data }) => {
        dispatch(getAddDeletePayment(data?.payment));
      })
      .catch((err) => {
        const error = err?.response?.data;

        dispatch(catchError({ error: error?.message }));
      })
      .finally(() => setSelectedPayment());
  };
