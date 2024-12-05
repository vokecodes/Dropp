import {
  getRestaurantTable,
  addRestaurantTable,
  deleteRestaurantTable,
  updateRestaurantTable,
  getSubChefRestaurantTable,
  addSubChefRestaurantTable,
  updateSubChefRestaurantTable,
  deleteSubChefRestaurantTable,
  addRestaurantSuperWaiter,
  updateRestaurantSuperWaiter,
  deleteRestaurantSuperWaiter,
  addSubChefSuperWaiter,
  updateSubChefSuperWaiter,
  deleteSubChefSuperWaiter,
} from "./tableCrud";
import {
  startCall,
  catchError,
  getAddUpdateRestaurantTable,
  getAddUpdateSuperWaiter,
} from "./tableSlice";

export const getTables = () => (dispatch: any) => {
  dispatch(startCall());
  return getRestaurantTable()
    .then(({ data }) => {
      dispatch(getAddUpdateRestaurantTable(data?.data));
    })
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchError({ error: error?.message }));
    });
};

export const addTables =
  (data: any, closeOrdersModal: any, resetForm?: any) => (dispatch: any) => {
    dispatch(startCall());
    return addRestaurantTable(data)
      .then(({ data }) => {
        dispatch(getAddUpdateRestaurantTable(data?.restaurantTable));
        resetForm();
        closeOrdersModal();
        dispatch(getTables());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const updateTables =
  (data: any, menuId: string, closeOrdersModal: any, resetForm?: any) =>
  (dispatch: any) => {
    dispatch(startCall());
    return updateRestaurantTable(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateRestaurantTable(data?.restaurantTable));
        resetForm();
        closeOrdersModal();
        dispatch(getTables());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const deleteTables = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteRestaurantTable(menuId)
    .then(({ data }) => {
      dispatch(getAddUpdateRestaurantTable(data?.restaurantTable));
      dispatch(getTables());
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const addSuperWaiter =
  (data: any, closeSuperWaiterModal: any, resetForm?: any) =>
  (dispatch: any) => {
    dispatch(startCall());
    return addRestaurantSuperWaiter(data)
      .then(({ data }) => {
        dispatch(getAddUpdateSuperWaiter(data?.restaurantTable));
        resetForm();
        closeSuperWaiterModal();
        dispatch(getTables());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const updateSuperWaiter =
  (data: any, menuId: string, closeSuperWaiterModal: any, resetForm?: any) =>
  (dispatch: any) => {
    dispatch(startCall());
    return updateRestaurantSuperWaiter(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateRestaurantTable(data?.restaurantTable));
        resetForm();
        closeSuperWaiterModal();
        dispatch(getTables());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const deleteSuperWaiter = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteRestaurantSuperWaiter(menuId)
    .then(({ data }) => {
      dispatch(getAddUpdateRestaurantTable(data?.restaurantTable));
      dispatch(getTables());
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const subChefGetTables = () => (dispatch: any) => {
  dispatch(startCall());
  return getSubChefRestaurantTable()
    .then(({ data }) => {
      dispatch(getAddUpdateRestaurantTable(data?.data));
    })
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchError({ error: error?.message }));
    });
};

export const subChefAddTables =
  (data: any, closeOrdersModal: any, resetForm?: any) => (dispatch: any) => {
    dispatch(startCall());
    return addSubChefRestaurantTable(data)
      .then(({ data }) => {
        dispatch(getAddUpdateRestaurantTable(data?.restaurantTable));
        resetForm();
        closeOrdersModal();
        dispatch(subChefGetTables());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const subChefUpdateTables =
  (data: any, menuId: string, closeOrdersModal: any, resetForm?: any) =>
  (dispatch: any) => {
    dispatch(startCall());
    return updateSubChefRestaurantTable(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateRestaurantTable(data?.restaurantTable));
        resetForm();
        closeOrdersModal();
        dispatch(subChefGetTables());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const subChefDeleteTables = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteSubChefRestaurantTable(menuId)
    .then(({ data }) => {
      dispatch(getAddUpdateRestaurantTable(data?.restaurantTable));
      dispatch(subChefGetTables());
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const subChefAddSuperTables =
  (data: any, closeOrdersModal: any, resetForm?: any) => (dispatch: any) => {
    dispatch(startCall());
    return addSubChefSuperWaiter(data)
      .then(({ data }) => {
        dispatch(getAddUpdateRestaurantTable(data?.restaurantTable));
        resetForm();
        closeOrdersModal();
        dispatch(subChefGetTables());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const subChefUpdateSuperTables =
  (data: any, menuId: string, closeOrdersModal: any, resetForm?: any) =>
  (dispatch: any) => {
    dispatch(startCall());
    return updateSubChefSuperWaiter(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateRestaurantTable(data?.restaurantTable));
        resetForm();
        closeOrdersModal();
        dispatch(subChefGetTables());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const subChefDeleteSuperTables = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteSubChefSuperWaiter(menuId)
    .then(({ data }) => {
      dispatch(getAddUpdateRestaurantTable(data?.restaurantTable));
      dispatch(subChefGetTables());
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};
