import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../_redux/auth/authSlice";
import userReducer from "../_redux/user/userSlice";
import businessReducer from "../_redux/business/businessSlice";
import paymentReducer from "../_redux/payment/paymentSlice";
import menuReducer from "../_redux/menu/menuSLice";
import employeeReducer from "../_redux/employees/employeeSlice";
import favouriteReducer from "../_redux/favourite/favouriteSLice";
import orderReducer from "../_redux/order/orderSLice";
import transactionReducer from "../_redux/transaction/transactionSLice";
import walletReducer from "../_redux/wallet/walletSLice";
import cartReducer from "../_redux/cart/cartSLice";
import cardReducer from "../_redux/card/cardSLice";
import subscriptionReducer from "../_redux/subscription/subscriptionSlice";
import subscriptionMenuReducer from "../_redux/subscriptionMenu/subscriptionMenuSlice";
import dinningMenuReducer from "../_redux/dinningMenu/dinningMenuSlice";
import tableReducer from "../_redux/table/tableSlice";
import waiterReducer from "../_redux/waiter/waiterSlice";
import sectionReducer from "../_redux/section/sectionSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  business: businessReducer,
  payment: paymentReducer,
  menu: menuReducer,
  dinningMenu: dinningMenuReducer,
  table: tableReducer,
  favourite: favouriteReducer,
  orders: orderReducer,
  transactions: transactionReducer,
  wallet: walletReducer,
  cart: cartReducer,
  cards: cardReducer,
  subscription: subscriptionReducer,
  subscriptionMenu: subscriptionMenuReducer,
  employees: employeeReducer,
  waiter: waiterReducer,
  section: sectionReducer,
});

export default rootReducer;
