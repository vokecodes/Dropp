import {
  getUserTransactions,
  userWithdrawTransaction,
  getCompanyTransactions,
} from "./transactionCrud";
import { getCustomerWallet } from "../wallet/walletAction";
import { startCall, catchError, getTransactions } from "./transactionSLice";

export const getCustomerTransactions = () => (dispatch: any) => {
  dispatch(startCall());
  return getUserTransactions()
    .then(({ data }) => dispatch(getTransactions(data.data)))
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};



export const customerWithdrawTransactions =
  (data: any, setWithdrawSuccessful: any) => (dispatch: any) => {
    dispatch(startCall());
    return userWithdrawTransaction(data)
      .then(({ data }) => {
        setWithdrawSuccessful(true);
        dispatch(getCustomerTransactions());
        dispatch(getCustomerWallet());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };


export const getTransactionsCompany = () => (dispatch: any) => {
  dispatch(startCall());
  console.log('transactions1= ')
  return getCompanyTransactions()
    .then(({ data }) => {
      console.log('data-t= ', data)
      dispatch(getTransactions(data.data))
    })
    .catch((err) => {
      const error = err?.response?.data;
      console.log('err=t= ', error.message)
      dispatch(catchError({ error: error.message }));
    });
};