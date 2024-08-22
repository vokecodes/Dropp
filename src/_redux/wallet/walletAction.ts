import { getUserWallet } from "./walletCrud";
import { startCall, catchError, getWallet } from "./walletSLice";

export const getCustomerWallet = () => (dispatch: any) => {
  dispatch(startCall());
  return getUserWallet()
    .then(({ data }) => dispatch(getWallet(data.data)))
    .catch((err) => {
      const error = err?.response?.data;
      console.log('err=w=', error.message)
      dispatch(catchError({ error: error.message }));
    });
};




export const getWalletCompany = () => (dispatch: any) => {
  dispatch(startCall());
  return getUserWallet()
    .then(({ data }) => dispatch(getWallet(data.data)))
    .catch((err) => {
      const error = err?.response?.data;
      console.log('err=w=', error.message)
      dispatch(catchError({ error: error.message }));
    });
};


// export const exportTransactionsCompany = (data: any) => (dispatch: any) => {
//   dispatch(startCall());
//   return companyExportTransactions(data)
//     .then(({ data }) => dispatch(getWallet(data.data)))
//     .catch((err) => {
//       const error = err?.response?.data;
//       console.log('err=w=', error.message)
//       dispatch(catchError({ error: error.message }));
//     });
// };
