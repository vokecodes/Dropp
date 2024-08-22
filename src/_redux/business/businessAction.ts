import {
  getChefBusiness,
  addChefBusiness,
  updateChefBusiness,
  getSubChefBusiness,
  updateSubChefBusiness,
} from "./businessCrud";
import { startCall, catchError, getAddUpdateBusiness } from "./businessSlice";

export const getBusiness = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefBusiness()
    .then(({ data }) => {
      dispatch(getAddUpdateBusiness(data?.business));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const addBusiness =
  (data: any, closeBusinessModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return addChefBusiness(data)
      .then(({ data }) => {
        dispatch(getAddUpdateBusiness({ ...data?.business }));
        closeBusinessModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const updateBusiness =
  (data: any, closeBusinessModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateChefBusiness(data)
      .then(({ data }) => {
        dispatch(getAddUpdateBusiness({ ...data?.business }));
        closeBusinessModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const updateBusinessStatus = (value: any) => (dispatch: any) => {
  dispatch(startCall());
  return updateChefBusiness({ status: value })
    .then(({ data }) => {
      dispatch(getAddUpdateBusiness({ ...data?.business }));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const getSubBusiness = () => (dispatch: any) => {
  dispatch(startCall());
  return getSubChefBusiness()
    .then(({ data }) => {
      console.log("ejdkmwl", data);
      dispatch(getAddUpdateBusiness(data?.business));
    })
    .catch((err) => {
      const error = err?.response?.data;
      console.log("enwkmss", error);
      dispatch(catchError({ error: error?.message }));
    });
};

export const updateSubBusinessStatus = (value: any) => (dispatch: any) => {
  dispatch(startCall());
  return updateSubChefBusiness({ status: value })
    .then(({ data }) => {
      dispatch(getAddUpdateBusiness({ ...data?.business }));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};
