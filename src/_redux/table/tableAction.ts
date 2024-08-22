import {
  getRestaurantTable,
  addRestaurantTable,
  deleteRestaurantTable,
  updateRestaurantTable,
  getSubChefRestaurantTable,
  addSubChefRestaurantTable,
  updateSubChefRestaurantTable,
  deleteSubChefRestaurantTable,
} from "./tableCrud";
import {
  startCall,
  catchError,
  getAddUpdateRestaurantTable,
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
