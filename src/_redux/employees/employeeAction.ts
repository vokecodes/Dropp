import { createEmployees, getEmployeesCompany } from "./employeeCrud";
import { startCall, catchError, getEmployees } from "./employeeSlice";

export const companyCreateEmployees =
  (payload: any, setInviteSuccessful: Function) => (dispatch: any) => {
    dispatch(startCall());
    console.log("add employees1= ", payload);
    return createEmployees(payload)
      .then(({ data }) => {
        // console.log("add employees2= ", data);
        setInviteSuccessful(true);

        dispatch(getEmployees(data?.companyEmployees));
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error.message }));
      });
  };

export const getCompanyEmployees = () => (dispatch: any) => {
  dispatch(startCall());
  console.log("employees1= ");
  return getEmployeesCompany()
    .then(({ data }) => {
      // console.log("employees2= ", data);
      dispatch(getEmployees(data.companyEmployees));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error.message }));
    });
};
