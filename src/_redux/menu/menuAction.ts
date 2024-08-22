import {
  getChefMenu,
  addChefMenu,
  updateChefMenu,
  deleteChefMenu,
  getSubChefMenu,
  subChefDeleteChefMenu,
  addSubChefMenu,
  updateSubChefMenu,
} from "./menuCrud";
import {
  startCall,
  catchError,
  getAddUpdateMenu,
  hideStartCall,
  hideCatchError,
  showHideMenuUpdate,
} from "./menuSLice";

export const getMenus = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefMenu()
    .then(({ data }) => {
      dispatch(getAddUpdateMenu(data?.menu));
    })
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchError({ error: error?.message }));
    });
};

export const addMenu = (data: any, closeMenuModal: any) => (dispatch: any) => {
  console.log('aktiv!!!= ', data)
  dispatch(startCall());
  return addChefMenu(data)
    .then(({ data }) => {
      dispatch(getAddUpdateMenu(data?.menu));
      closeMenuModal();
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const updateMenu =
  (data: any, menuId: string, closeBusinessModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateChefMenu(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateMenu(data?.menu));
        closeBusinessModal();
      })
      .catch((err) => {
        const error = err?.response?.data;

        dispatch(catchError({ error: error?.message }));
      });
  };

export const showHideMenu = (data: any, menuId: string) => (dispatch: any) => {
  dispatch(hideStartCall());
  return updateChefMenu(data, menuId)
    .then(({ data }) => {
      dispatch(showHideMenuUpdate(data?.menu));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(hideCatchError({ error: error?.message }));
    });
};

export const deleteMenu = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteChefMenu(menuId)
    .then(({ data }) => dispatch(getAddUpdateMenu(data?.menu)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const clearError = () => (dispatch: any) => {
  return dispatch(catchError({ error: "" }));
};

export const getSubChefMenus = () => (dispatch: any) => {
  dispatch(startCall());
  return getSubChefMenu()
    .then(({ data }) => {
      dispatch(getAddUpdateMenu(data?.menu));
    })
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchError({ error: error?.message }));
    });
};

export const subChefDeleteMenu = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return subChefDeleteChefMenu(menuId)
    .then(({ data }) => dispatch(getAddUpdateMenu(data?.menu)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const subChefAddMenu =
  (data: any, closeMenuModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return addSubChefMenu(data)
      .then(({ data }) => {
        dispatch(getAddUpdateMenu(data?.menu));
        closeMenuModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const subChefUpdateMenu =
  (data: any, menuId: string, closeBusinessModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateSubChefMenu(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateMenu(data?.menu));
        closeBusinessModal();
      })
      .catch((err) => {
        const error = err?.response?.data;

        dispatch(catchError({ error: error?.message }));
      });
  };

export const subChefShowHideMenu =
  (data: any, menuId: string) => (dispatch: any) => {
    dispatch(hideStartCall());
    return updateSubChefMenu(data, menuId)
      .then(({ data }) => {
        dispatch(showHideMenuUpdate(data?.menu));
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(hideCatchError({ error: error?.message }));
      });
  };
