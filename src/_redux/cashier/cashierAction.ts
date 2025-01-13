import { addCashierQsrSubAdmin, addQsrCashier, deleteCashierQsrSubAdmin, deleteQsrCashier, getCashierQsrSubAdmin, getQsrCashier, updateCashierQsrSubAdmin, updateQsrCashier } from "./cashierCrud";
import {
    startCall,
    catchError,
    getAddUpdateCashier,
    hideStartCall,
  } from "./cashierSlice";
  
  export const getCashier = () => (dispatch: any) => {
    dispatch(startCall());
    return getQsrCashier()
      .then(({ data }) => {
        dispatch(getAddUpdateCashier(data?.data));
      })
      .catch((err) => {
        const error = err?.response?.data;
  
        dispatch(catchError({ error: error?.message }));
      });
  };
  
  export const addCashier =
    (data: any, closeOrdersModal: any, resetForm?: any, openModal?: any) => (dispatch: any) => {
      dispatch(startCall());
      return addQsrCashier(data)
        .then(({ data }) => {
          dispatch(getAddUpdateCashier(data?.qsrCashier));
          resetForm();
          closeOrdersModal();
          dispatch(getCashier());
          openModal();
        })
        .catch((err) => {
          const error = err?.response?.data;
          dispatch(catchError({ error: error?.message }));
        });
    };
  
  export const updateCashier =
    (data: any, menuId: string, closeOrdersModal: any, resetForm?: any) =>
    (dispatch: any) => {
      dispatch(startCall());
      return updateQsrCashier(data, menuId)
        .then(({ data }) => {
          dispatch(getAddUpdateCashier(data?.qsrCashier));
          resetForm();
          closeOrdersModal();
          dispatch(getCashier());
        })
        .catch((err) => {
          const error = err?.response?.data;
          dispatch(catchError({ error: error?.message }));
        });
    };
  
  export const deleteCashier = (menuId: string) => (dispatch: any) => {
    dispatch(startCall());
    return deleteQsrCashier(menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateCashier(data?.qsrCashier));
        dispatch(getCashier());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };
  
  export const getQsrSubAdminCashier = () => (dispatch: any) => {
    dispatch(startCall());
    return getCashierQsrSubAdmin()
      .then(({ data }) => {
        dispatch(getAddUpdateCashier(data?.data));
      })
      .catch((err) => {
        const error = err?.response?.data;
  
        dispatch(catchError({ error: error?.message }));
      });
  };
  
  export const addQsrSubAdminCashier =
    (data: any, closeOrdersModal: any, resetForm?: any) => (dispatch: any) => {
      dispatch(startCall());
      return addCashierQsrSubAdmin(data)
        .then(({ data }) => {
          dispatch(getAddUpdateCashier(data?.qsrCashier));
          resetForm();
          closeOrdersModal();
          dispatch(getQsrSubAdminCashier());
        })
        .catch((err) => {
          const error = err?.response?.data;
          dispatch(catchError({ error: error?.message }));
        });
    };
  
  export const updateQsrSubAdminCashier =
    (data: any, menuId: string, closeOrdersModal: any, resetForm?: any) =>
    (dispatch: any) => {
      dispatch(startCall());
      return updateCashierQsrSubAdmin(data, menuId)
        .then(({ data }) => {
          dispatch(getAddUpdateCashier(data?.qsrCashier));
          resetForm();
          closeOrdersModal();
          dispatch(getQsrSubAdminCashier());
        })
        .catch((err) => {
          const error = err?.response?.data;
          dispatch(catchError({ error: error?.message }));
        });
    };
  
  export const deleteQsrSubAdminCashier = (menuId: string) => (dispatch: any) => {
    dispatch(startCall());
    return deleteCashierQsrSubAdmin(menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateCashier(data?.qsrCashier));
        dispatch(getQsrSubAdminCashier());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };
  
 