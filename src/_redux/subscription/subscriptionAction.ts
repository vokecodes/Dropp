import { getChefSubscriptionOrders } from "../order/orderAction";
import {
  createSubscription,
  getSubscription,
  updateSubscription,
  getChefsSubscriptionMenus,
  completeSubscription,
} from "./subscriptionCrud";
import {
  startCall,
  catchError,
  addGetSubscription,
  stopLoading,
  getSubscriptionChefsMenus,
  startGetCall,
  stopGetCall,
} from "./subscriptionSlice";

export const getAllSubscriptionChefsAndMenus = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefsSubscriptionMenus()
    .then(({ data }) => dispatch(getSubscriptionChefsMenus(data.data)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    })
    .finally(() => dispatch(stopLoading()));
};

export const getCustomerSubscription = () => (dispatch: any) => {
  dispatch(startGetCall());
  return getSubscription()
    .then(({ data }) => dispatch(addGetSubscription(data.data)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    })
    .finally(() => dispatch(stopGetCall()));
};

export const customerCreateSubscription =
  (data: any, setStep?: any) => (dispatch: any) => {
    dispatch(startCall());
    return createSubscription(data)
      .then(({ data }) => {
        dispatch(getCustomerSubscription());
        setStep(0);
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      })
      .finally(() => dispatch(stopLoading()));
  };

export const updateCustomerSubscription =
  (
    id: string,
    data: any,
    closeCancelModal?: any,
    openEditSuccessModal?: any,
  ) =>
  (dispatch: any) => {
    dispatch(startCall());
    return updateSubscription(id, data)
      .then(({ data }) => {
        if (closeCancelModal) {
          closeCancelModal();
        }
        openEditSuccessModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      })
      .finally(() => dispatch(stopLoading()));
  };

export const completeCustomerSubscription =
  (id: string, data: any, setCompleteLoading?: any, setSelectedWeek?: any) =>
  (dispatch: any) => {
    dispatch(startCall());
    return completeSubscription(id, data)
      .then(({ data }) => {
        dispatch(getChefSubscriptionOrders());
        setCompleteLoading(false);
        setSelectedWeek(null);
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };
