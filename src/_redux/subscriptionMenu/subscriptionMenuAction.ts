import {
  getChefSubscriptionMenu,
  addChefSubscriptionMenu,
  updateChefSubscriptionMenu,
  deleteChefSubscriptionMenu,
  getSubChefSubscriptionMenu,
  addSubChefSubscriptionMenu,
  updateSubChefSubscriptionMenu,
  deleteSubChefSubscriptionMenu,
} from "./subscriptionMenuCrud";
import {
  startCall,
  catchError,
  getAddUpdateSubscriptionMenu,
  hideStartCall,
  hideCatchError,
  showHideSubscriptionMenuUpdate,
} from "./subscriptionMenuSlice";

export const getSubscriptionMenus = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefSubscriptionMenu()
    .then(({ data }) => {
      dispatch(getAddUpdateSubscriptionMenu(data?.subscriptionMenu));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const addSubscriptionMenu =
  (data: any, closeMenuModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return addChefSubscriptionMenu(data)
      .then(({ data }) => {
        dispatch(getAddUpdateSubscriptionMenu(data?.subscriptionMenu));
        closeMenuModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const updateSubscriptionMenu =
  (data: any, menuId: string, closeBusinessModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateChefSubscriptionMenu(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateSubscriptionMenu(data?.subscriptionMenu));
        closeBusinessModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const showHideSubscriptionMenu =
  (data: any, menuId: string) => (dispatch: any) => {
    dispatch(hideStartCall());
    return updateChefSubscriptionMenu(data, menuId)
      .then(({ data }) => {
        dispatch(showHideSubscriptionMenuUpdate(data?.subscriptionMenu));
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(hideCatchError({ error: error?.message }));
      });
  };

export const deleteSubscriptionMenu = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteChefSubscriptionMenu(menuId)
    .then(({ data }) =>
      dispatch(getAddUpdateSubscriptionMenu(data?.subscriptionMenu))
    )
    .catch((err) => {
      const error = err?.response?.data;
      if(error?.menuId){
        dispatch(catchError({ error: [ error?.message, error?.menuId ]}));
      }else{
        dispatch(catchError({ error: error?.message }));
      }
    });
};

export const getSubChefSubscriptionMenus = () => (dispatch: any) => {
  dispatch(startCall());
  return getSubChefSubscriptionMenu()
    .then(({ data }) => {
      dispatch(getAddUpdateSubscriptionMenu(data?.subscriptionMenu));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const subChefAddSubscriptionMenu =
  (data: any, closeMenuModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return addSubChefSubscriptionMenu(data)
      .then(({ data }) => {
        dispatch(getAddUpdateSubscriptionMenu(data?.subscriptionMenu));
        closeMenuModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const subChefUpdateSubscriptionMenu =
  (data: any, menuId: string, closeBusinessModal: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateSubChefSubscriptionMenu(data, menuId)
      .then(({ data }) => {
        dispatch(getAddUpdateSubscriptionMenu(data?.subscriptionMenu));
        closeBusinessModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const subChefShowHideSubscriptionMenu =
  (data: any, menuId: string) => (dispatch: any) => {
    dispatch(hideStartCall());
    return updateSubChefSubscriptionMenu(data, menuId)
      .then(({ data }) => {
        dispatch(showHideSubscriptionMenuUpdate(data?.subscriptionMenu));
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(hideCatchError({ error: error?.message }));
      });
  };

export const subChefDeleteSubscriptionMenu =
  (menuId: string) => (dispatch: any) => {
    dispatch(startCall());
    return deleteSubChefSubscriptionMenu(menuId)
      .then(({ data }) =>
        dispatch(getAddUpdateSubscriptionMenu(data?.subscriptionMenu))
      )
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };
