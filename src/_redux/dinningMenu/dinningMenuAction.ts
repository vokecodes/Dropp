import {
  getChefDineInMenu,
  addChefDineInMenu,
  deleteChefDineInMenu,
  updateChefDineInMenu,
  getSubChefDineInMenu,
  addSubChefDineInMenu,
  updateSubChefDineInMenu,
  subChefDeleteChefDineInMenu,
  getQsrSubAdminDineInMenuCrud,
  addQsrSubAdminDineInMenuCrud,
  updateQsrSubAdminDineInMenuCrud,
  deleteQsrSubAdminDineInMenuCrud,
} from "./dinningMenuCrud";
import {
  startCall,
  catchError,
  getAddUpdateDinningMenu,
  hideStartCall,
  hideCatchError,
  showHideDinningMenuUpdate,
} from "./dinningMenuSlice";

export const getDineInMenus = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefDineInMenu()
    .then(({ data }) => {
      dispatch(getAddUpdateDinningMenu(data?.dinningMenu));
    })
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchError({ error: error?.message }));
    });
};

export const addDineInMenu =
  (data: any, closeMenuModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return addChefDineInMenu(data)
      .then(({ data }) => {
        dispatch(getAddUpdateDinningMenu(data?.dinningMenu));
        closeMenuModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const updateDineInMenu =
  (data: any, menuId: string, closeBusinessModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateChefDineInMenu(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateDinningMenu(data?.dinningMenu));
        closeBusinessModal();
      })
      .catch((err) => {
        const error = err?.response?.data;

        dispatch(catchError({ error: error?.message }));
      });
  };

export const showHideDineInMenu =
  (data: any, menuId: string) => (dispatch: any) => {
    dispatch(hideStartCall());
    return updateChefDineInMenu(data, menuId)
      .then(({ data }) => {
        dispatch(showHideDinningMenuUpdate(data?.dinningMenu));
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(hideCatchError({ error: error?.message }));
      });
  };

export const deleteDineInMenu = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteChefDineInMenu(menuId)
    .then(({ data }) => dispatch(getAddUpdateDinningMenu(data?.dinningMenu)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};



export const getQsrSubAdminDineInMenus = () => (dispatch: any) => {
  dispatch(startCall());
  return getQsrSubAdminDineInMenuCrud()
    .then(({ data }) => {
      dispatch(getAddUpdateDinningMenu(data?.dinningMenu));
    })
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchError({ error: error?.message }));
    });
};

export const addQsrSubAdminDineInMenu =
  (data: any, closeMenuModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return addQsrSubAdminDineInMenuCrud(data)
      .then(({ data }) => {
        dispatch(getAddUpdateDinningMenu(data?.dinningMenu));
        closeMenuModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const updateQsrSubAdminDineInMenu =
  (data: any, menuId: string, closeBusinessModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateQsrSubAdminDineInMenuCrud(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateDinningMenu(data?.dinningMenu));
        closeBusinessModal();
      })
      .catch((err) => {
        const error = err?.response?.data;

        dispatch(catchError({ error: error?.message }));
      });
  };

export const showHideQsrSubAdminDineInMenu =
  (data: any, menuId: string) => (dispatch: any) => {
    dispatch(hideStartCall());
    return updateQsrSubAdminDineInMenuCrud(data, menuId)
      .then(({ data }) => {
        dispatch(showHideDinningMenuUpdate(data?.dinningMenu));
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(hideCatchError({ error: error?.message }));
      });
  };

export const deleteQsrSubAdminDineInMenu = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteQsrSubAdminDineInMenuCrud(menuId)
    .then(({ data }) => dispatch(getAddUpdateDinningMenu(data?.dinningMenu)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};



export const getSubChefDineInMenus = () => (dispatch: any) => {
  dispatch(startCall());
  return getSubChefDineInMenu()
    .then(({ data }) => {
      dispatch(getAddUpdateDinningMenu(data?.dinningMenu));
    })
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchError({ error: error?.message }));
    });
};

export const subChefAddDineInMenu =
  (data: any, closeMenuModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return addSubChefDineInMenu(data)
      .then(({ data }) => {
        dispatch(getAddUpdateDinningMenu(data?.dinningMenu));
        closeMenuModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const subChefUpdateDineInMenu =
  (data: any, menuId: string, closeBusinessModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateSubChefDineInMenu(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateDinningMenu(data?.dinningMenu));
        closeBusinessModal();
      })
      .catch((err) => {
        const error = err?.response?.data;

        dispatch(catchError({ error: error?.message }));
      });
  };

export const subChefShowHideDineInMenu =
  (data: any, menuId: string) => (dispatch: any) => {
    dispatch(hideStartCall());
    return updateSubChefDineInMenu(data, menuId)
      .then(({ data }) => {
        dispatch(showHideDinningMenuUpdate(data?.dinningMenu));
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(hideCatchError({ error: error?.message }));
      });
  };

export const subChefDeleteDineInMenu = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return subChefDeleteChefDineInMenu(menuId)
    .then(({ data }) => dispatch(getAddUpdateDinningMenu(data?.dinningMenu)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};
