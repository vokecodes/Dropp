import {
  addCashierQsrSubAdmin,
  addQsrCashier,
  addQsrTerminal,
  addQsrTerminalQsrSubAdmin,
  deleteCashierQsrSubAdmin,
  deleteQsrCashier,
  deleteQsrTerminal,
  deleteQsrTerminalQsrSubAdmin,
  getCashierQsrSubAdmin,
  getQsrCashier,
  getQsrTerminals,
  getQsrTerminalsQsrSubAdmin,
  updateCashierQsrSubAdmin,
  updateQsrCashier,
  updateQsrTerminal,
  updateQsrTerminalQsrSubAdmin,
} from "./cashierCrud";
import {
  startCall,
  catchError,
  getAddUpdateCashier,
  hideStartCall,
  getAddUpdateTerminal,
  catchTerminalError,
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
  (data: any, closeOrdersModal: any, resetForm?: any, openModal?: any) =>
  (dispatch: any) => {
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

export const getTerminals = () => (dispatch: any) => {
  dispatch(startCall());
  return getQsrTerminals()
    .then(({ data }) => {
      dispatch(getAddUpdateTerminal(data?.data));
    })
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchTerminalError({ error: error?.message }));
    });
};

export const addTerminal =
  (data: any, closeOrdersModal: any, resetForm?: any, openModal?: any) =>
  (dispatch: any) => {
    dispatch(startCall());
    return addQsrTerminal(data)
      .then(({ data }) => {
        dispatch(getAddUpdateTerminal(data?.qsrCashier));
        resetForm();
        closeOrdersModal();
        dispatch(getTerminals());
        openModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchTerminalError({ error: error?.message }));
      });
  };

export const updateTerminal =
  (data: any, menuId: string, closeOrdersModal: any, resetForm?: any) =>
  (dispatch: any) => {
    dispatch(startCall());
    return updateQsrTerminal(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateTerminal(data?.qsrCashier));
        resetForm();
        closeOrdersModal();
        dispatch(getTerminals());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchTerminalError({ error: error?.message }));
      });
  };

export const deleteTerminal = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteQsrTerminal(menuId)
    .then(({ data }) => {
      dispatch(getAddUpdateTerminal(data?.qsrCashier));
      dispatch(getTerminals());
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchTerminalError({ error: error?.message }));
    });
};

export const getQsrSubAdminTerminals = () => (dispatch: any) => {
  dispatch(startCall());
  return getQsrTerminalsQsrSubAdmin()
    .then(({ data }) => {
      dispatch(getAddUpdateTerminal(data?.data));
    })
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchTerminalError({ error: error?.message }));
    });
};

export const addQsrSubAdminTerminal =
  (data: any, closeOrdersModal: any, resetForm?: any, openModal?: any) =>
  (dispatch: any) => {
    dispatch(startCall());
    return addQsrTerminalQsrSubAdmin(data)
      .then(({ data }) => {
        dispatch(getAddUpdateTerminal(data?.qsrCashier));
        resetForm();
        closeOrdersModal();
        dispatch(getQsrSubAdminTerminals());
        openModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchTerminalError({ error: error?.message }));
      });
  };

export const updateQsrSubAdminTerminal =
  (data: any, menuId: string, closeOrdersModal: any, resetForm?: any) =>
  (dispatch: any) => {
    dispatch(startCall());
    return updateQsrTerminalQsrSubAdmin(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateTerminal(data?.qsrCashier));
        resetForm();
        closeOrdersModal();
        dispatch(getQsrSubAdminTerminals());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchTerminalError({ error: error?.message }));
      });
  };

export const deleteQsrSubAdminTerminal = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteQsrTerminalQsrSubAdmin(menuId)
    .then(({ data }) => {
      dispatch(getAddUpdateTerminal(data?.qsrCashier));
      dispatch(getQsrSubAdminTerminals());
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchTerminalError({ error: error?.message }));
    });
};
