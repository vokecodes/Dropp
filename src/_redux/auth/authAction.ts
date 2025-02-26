import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterUserData } from "../../utils/Interfaces";
import { authAPI } from "./authCrud";
import {
  startCall,
  catchError,
  registerLoginAccount,
  logoutAccount,
  forgotResetAccount,
} from "./authSlice";
import { logoutUserProfile } from "../user/userSlice";
import { logoutBusiness } from "../business/businessSlice";
import { logoutPayment } from "../payment/paymentSlice";
import { logoutMenu } from "../menu/menuSLice";
import { logoutFavourite } from "../favourite/favouriteSLice";
import { logoutOrders } from "../order/orderSLice";
import { logoutTransactions } from "../transaction/transactionSLice";
import { logoutWallet } from "../wallet/walletSLice";
import { AUTH_ROUTES, HOME_ROUTES, SUB_CHEF_ROUTES } from "../../routes/routes";
import { clearCart } from "../cart/cartAction";
import { logoutCard } from "../card/cardSLice";
import { logoutSubscriptionMenu } from "../subscriptionMenu/subscriptionMenuSlice";
import { logoutSubscription } from "../subscription/subscriptionSlice";
import { logoutWaiter } from "../waiter/waiterSlice";
import { QUICK_SERVICE_USER, SUB_CHEF_USER } from "../../config/UserType";
import { logoutDiningMenu } from "../dinningMenu/dinningMenuSlice";
import { logoutCashier } from "../cashier/cashierSlice";

export const registerLoginUserAccount =
  (
    url: any,
    data: any,
    actionPath: any,
    navigate: any,
    setSubmitting?: any,
    navigateFrom?: string,
    setErrorMessage?: any
  ) =>
  (dispatch: any) => {
    delete data.confirmPassword;
    dispatch(startCall());

    return authAPI(url, data)
      .then(({ data }: any) => {
        if (data.data) {
          if (actionPath === "login") {
            const user = data?.data?.user;

            if (user?.eventReferral && user?.eventReferral !== "undefined") {
              navigate(HOME_ROUTES.linkEvents);
            } else if (navigateFrom && user?.userType === "customer") {
              const ifEvents = navigateFrom.includes("events");
              if (ifEvents) {
                navigate(`/events/${navigateFrom.split("_")[0]}`);
              } else {
                navigate(`/${navigateFrom}`);
              }
            } else {
              if (user?.userType === SUB_CHEF_USER) {
                navigate("/sub-chef");
              } else if (user?.chefType === QUICK_SERVICE_USER) {
                navigate("/qsr");
              } else {
                navigate(`/${user?.userType}`);
              }
            }
            dispatch(registerLoginAccount({ ...data?.data }));
          } else {
            navigate(actionPath);
            dispatch(registerLoginAccount({ ...data?.data }));
          }
        }
      })
      .catch((err: any) => {
        const error = err?.response?.data;
        setErrorMessage(error?.message);
        dispatch(catchError({ error: error?.message }));
      })
      .finally(() => setSubmitting(false));
  };

export const forgotResetPasswordUserAccount =
  (url: any, data: any, actionPath: any, navigate: any) => (dispatch: any) => {
    dispatch(startCall());
    return authAPI(url, data)
      .then(({ data }: any) => {
        alert(data?.message);
        dispatch(forgotResetAccount());
        navigate(actionPath);
      })
      .catch((err: any) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const logOutUserAccount =
  (navigate: any, admin = false, cashier = false, chefType = "") =>
  (dispatch: any) => {
    dispatch(logoutAccount());
    dispatch(logoutUserProfile());
    dispatch(logoutBusiness());
    dispatch(logoutPayment());
    dispatch(logoutMenu());
    dispatch(logoutFavourite());
    dispatch(logoutOrders());
    dispatch(logoutTransactions());
    dispatch(logoutWallet());
    dispatch(clearCart());
    dispatch(logoutCard());
    dispatch(logoutSubscriptionMenu());
    dispatch(logoutSubscription());
    dispatch(logoutWaiter());
    dispatch(logoutDiningMenu());
    dispatch(logoutCashier());

    sessionStorage.removeItem("auth");

    if (admin) {
      navigate("/auth/admin-login");
    } else if (cashier) {
      navigate("/cashier");
    } else if (chefType === "storefront") {
      navigate(AUTH_ROUTES.linkStorefrontLogin);
    } else {
      navigate("/auth");
    }
  };
