import {
  updateUserProfile,
  getUserProfile,
  changeUserPassword,
  getUserWallet,
  getUserWalletTransaction,
  updateCompanyProfile,
  getCompanyProfile,
  changeCompanyPassword,
  getCompanyWallet,
  getCompanyWalletTransaction,
  getChefProfile,
  getChefWallet,
  getChefWalletTransaction,
  updateChefProfile,
  changeChefPassword,
  getChefRestaurantWallet,
  getChefRestaurantWalletTransaction,
  getChefSubChefs,
  getSubChefProfile,
  updateSubChefProfile,
  changeSubChefPassword,
  getRestaurantDashboardCrud,
  getAdminDashboardCrud,
  getAdminChartCrud,
  getAdminDashboardSingleCrud,
  getRestaurantSubChefDashboardCrud,
} from "./userCrud";
import {
  startCall,
  catchError,
  updateProfileAccount,
  getWallet,
  getWalletTransaction,
  getRestaurantWallet,
  getRestaurantWalletTransaction,
  getSubChefs,
  getRestaurantDashboard,
  startDashboardCall,
  stopDashboardCall,
  getAdminDashboard,
  getMonthlyChart,
} from "./userSlice";

export const getProfileUserAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getUserProfile()
    .then(({ data }) => {
      dispatch(updateProfileAccount({ ...data?.user }));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const getUserWalletAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getUserWallet()
    .then(({ data }) => {
      dispatch(getWallet({ ...data?.data }));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const getUserWalletTransactionAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getUserWalletTransaction()
    .then(({ data }) => {
      dispatch(getWalletTransaction(data?.data));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const updateProfileUserAccount =
  (
    url: any,
    data: any,
    closeProfileModal?: any,
    handleWhatsAppNumberAlert?: any
  ) =>
  (dispatch: any) => {
    dispatch(startCall());
    return updateUserProfile(url, data)
      .then(({ data }) => {
        dispatch(updateProfileAccount({ ...data?.user }));
        if (closeProfileModal) closeProfileModal();
        if (handleWhatsAppNumberAlert)
          handleWhatsAppNumberAlert("Whatsapp number updated successfully");
      })
      .catch((err) => {
        const error = err?.response?.data;

        dispatch(catchError({ error: error?.message }));
        if (handleWhatsAppNumberAlert)
          handleWhatsAppNumberAlert(
            "Whatsapp number update failed, Try again!"
          );
      });
  };

export const changePasswordUserAccount =
  (data: any, closePasswordModal?: any) => (dispatch: any) => {
    dispatch(startCall());
    return changeUserPassword(data)
      .then(({ data }) => {
        closePasswordModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

// Chef Actions

export const getProfileChefAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefProfile()
    .then(({ data }) => {
      dispatch(updateProfileAccount({ ...data?.chef }));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const getProfileSubChefAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getSubChefProfile()
    .then(({ data }) => {
      dispatch(updateProfileAccount({ ...data?.chef }));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const updateProfileSubChefAccount =
  (data: any, closeProfileModal?: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateSubChefProfile(data)
      .then(({ data }) => {
        dispatch(updateProfileAccount({ ...data?.chef }));
        if (closeProfileModal) closeProfileModal();
      })
      .catch((err) => {
        const error = err?.response?.data;

        dispatch(catchError({ error: error?.message }));
      });
  };

export const getChefWalletAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefWallet()
    .then(({ data }) => {
      dispatch(getWallet({ ...data?.data }));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const getChefWalletTransactionAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefWalletTransaction()
    .then(({ data }) => {
      dispatch(getWalletTransaction(data?.data));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const getChefRestaurantWalletAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefRestaurantWallet()
    .then(({ data }) => {
      dispatch(getRestaurantWallet({ ...data?.data }));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const getChefRestaurantWalletTransactionAccount =
  () => (dispatch: any) => {
    dispatch(startCall());
    return getChefRestaurantWalletTransaction()
      .then(({ data }) => {
        dispatch(getRestaurantWalletTransaction(data?.data));
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const updateProfileChefAccount =
  (url: any, data: any, closeProfileModal?: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateChefProfile(url, data)
      .then(({ data }) => {
        dispatch(updateProfileAccount({ ...data?.chef }));
        if (closeProfileModal) closeProfileModal();
      })
      .catch((err) => {
        const error = err?.response?.data;

        dispatch(catchError({ error: error?.message }));
      });
  };

export const changePasswordChefAccount =
  (data: any, closePasswordModal?: any) => (dispatch: any) => {
    dispatch(startCall());
    return changeChefPassword(data)
      .then(({ data }) => {
        closePasswordModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const getChefSubChefsAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getChefSubChefs()
    .then(({ data }) => {
      dispatch(getSubChefs(data?.data));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const changePasswordSubChefAccount =
  (data: any, closePasswordModal?: any) => (dispatch: any) => {
    dispatch(startCall());
    return changeSubChefPassword(data)
      .then(({ data }) => {
        closePasswordModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

// Company Actions

export const getProfileCompanyAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getCompanyProfile()
    .then(({ data }) => {
      dispatch(updateProfileAccount({ ...data?.company }));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error.message }));
    });
};

export const getCompanyWalletAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getCompanyWallet()
    .then(({ data }) => {
      // console.log('company wallet= ', data)
      dispatch(getWallet({ ...data?.data }));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error.message }));
    });
};

export const getCompanyWalletTransactionAccount = () => (dispatch: any) => {
  dispatch(startCall());
  return getCompanyWalletTransaction()
    .then(({ data }) => {
      // console.log('company wallet transaction= ', data)
      dispatch(getWalletTransaction(data?.data));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error.message }));
    });
};

export const updateProfileCompanyAccount =
  (url: any, data: any, closeProfileModal?: any) => (dispatch: any) => {
    dispatch(startCall());
    return updateCompanyProfile(url, data)
      .then(({ data }) => {
        dispatch(updateProfileAccount({ ...data?.company }));
        if (closeProfileModal) closeProfileModal();
      })
      .catch((err) => {
        const error = err?.response?.data;

        dispatch(catchError({ error: error.message }));
      });
  };

export const changePasswordCompanyAccount =
  (data: any, closePasswordModal?: any) => (dispatch: any) => {
    dispatch(startCall());
    return changeCompanyPassword(data)
      .then(({ data }) => {
        closePasswordModal();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error.message }));
      });
  };

export const getRestaurantDashboardAccount =
  (fromDate = "", toDate = "", payment = "", section = "", table = "") =>
  (dispatch: any) => {
    dispatch(startDashboardCall());
    return getRestaurantDashboardCrud(fromDate, toDate, payment, section, table)
      .then(({ data }) => {
        dispatch(getRestaurantDashboard({ ...data?.data }));
      })
      .finally(() => dispatch(stopDashboardCall()));
  };

  export const getRestaurantSubChefDashboardAccount =
  (fromDate = "", toDate = "", payment = "", section = "", table = "") =>
  (dispatch: any) => {
    dispatch(startDashboardCall());
    return getRestaurantSubChefDashboardCrud(fromDate, toDate, payment, section, table)
      .then(({ data }) => {
        dispatch(getRestaurantDashboard({ ...data?.data }));
      })
      .finally(() => dispatch(stopDashboardCall()));
  };

  export const getAdminDashboardAccount =
  (fromDate = "", toDate = "", restaurant = "") =>
  (dispatch: any) => {
    dispatch(startDashboardCall());
    console.log('rdx= ', fromDate)
    return getAdminDashboardCrud(fromDate, toDate, restaurant)
      .then(({ data }) => {
        console.log('getAdminDashboard= ', data?.data )
        dispatch(getAdminDashboard({ ...data?.data }));
      })
      .finally(() => dispatch(stopDashboardCall()));
  };
  
  export const getAdminDashboardAccountSingle =
  (fromDate = "", toDate = "", restaurant = "") =>
  (dispatch: any) => {
    dispatch(startDashboardCall());
    return getAdminDashboardSingleCrud(fromDate, toDate, restaurant)
      .then(({ data }) => {
        console.log('getAdminDashboardAccountSingle= ', data?.data )
        dispatch(getAdminDashboard({ ...data?.data }));
      })
      .finally(() => dispatch(stopDashboardCall()));
  };
  
  export const getAdminMonthlyChart =
  () => (dispatch: any) => {
    dispatch(startDashboardCall());
    return getAdminChartCrud()
      .then(({ data }) => {
        console.log('datacu= ', data)
        dispatch(getMonthlyChart({ ...data?.data }));
      })
      .finally(() => dispatch(stopDashboardCall()));
  };
