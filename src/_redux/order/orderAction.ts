import {
  createAnOrder,
  getUserOrders,
  getChefUserOrders,
  updateChefUserOrders,
  completeChefUserOrder,
  getChefUserSubscriptionOrders,
  getRestaurantOrdersCrud,
  getSubChefRestaurantOrders,
  getStorefrontOrdersCrud,
} from "./orderCrud";
import {
  startCall,
  catchError,
  getOrders,
  getSubscriptionOrders,
  getRestaurantOrders,
} from "./orderSLice";

export const customerCreateOrder = (data: any) => (dispatch: any) => {
  dispatch(startCall());
  return createAnOrder(data);
};

export const getCustomerOrders = () => (dispatch: any) => {
  dispatch(startCall());
  return getUserOrders()
    .then(({ data }) => {
      dispatch(getOrders(data.data));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const updateCustomerOrders =
  (id: string, data: any, closeReviewModal?: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateChefUserOrders(id, data)
      .then(({ data }) => {
        dispatch(getCustomerOrders());
        // getCustomerOrders();
        closeReviewModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const getChefOrders = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefUserOrders()
    .then(({ data }) => dispatch(getOrders(data.data)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const getStorefrontOrders = () => (dispatch: any) => {
  dispatch(startCall());
  return getStorefrontOrdersCrud()
    .then(({ data }) => {
      dispatch(getOrders(data.data))
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const updateOrders =
  (id: string, data: any, closeReviewModal?: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateChefUserOrders(id, data)
      .then(({ data }) => {
        dispatch(getOrders(data.data));
        closeReviewModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const completeOrder = (id: string, data: any) => (dispatch: any) => {
  dispatch(startCall());
  return completeChefUserOrder(id, data)
    .then(({ data }) => {
      dispatch(getOrders(data.data));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const getChefSubscriptionOrders = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefUserSubscriptionOrders()
    .then(({ data }) => dispatch(getSubscriptionOrders(data.data)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const getRestaurantDineInOrders = () => (dispatch: any) => {
  dispatch(startCall());
  return getRestaurantOrdersCrud()
    .then(({ data }) => dispatch(getRestaurantOrders(data.data)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const getSubChefRestaurantDineInOrders = () => (dispatch: any) => {
  dispatch(startCall());
  return getSubChefRestaurantOrders()
    .then(({ data }) => dispatch(getRestaurantOrders(data.data)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};
