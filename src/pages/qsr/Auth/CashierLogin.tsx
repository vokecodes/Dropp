import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { shallowEqual, useSelector } from "react-redux";
import { CashierLoginValues, SuperWaiterLoginValues, WaiterLoginValues } from "../../../utils/FormInitialValue";
import { CashierLoginSchema, LoginSchema, SuperWaiterLoginSchema, WaiterLoginSchema } from "../../../utils/ValidationSchema";
import { CHEF_LOGIN_URL, QSR_CASHIER_URL, RESTAURANT_TABLE_URL } from "../../../_redux/urls";
import { useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../store";
import Input from "../../../components/CustomInput";
import Button from "../../../components/Button";
import { SERVER } from "../../../config/axios";
import { loginSuperWaiter, loginWaiter } from "../../../_redux/waiter/waiterSlice";
import { catchError, loginCashier } from "../../../_redux/cashier/cashierSlice";

const CashierLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState("");
  const [togglePassword, setTogglePassword] = useState("password");

  const formInputs = [
    { type: "text", placeholder: "Employee ID", name: "employeeID" },
    {
      type: "password",
      placeholder: "Password",
      name: "password",
    },
  ];

  const { error } = useSelector(
    (state: RootState) => ({
      error: state.cashier.error,
    }),
    shallowEqual
  );

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: CashierLoginValues,
    validationSchema: CashierLoginSchema,
    onSubmit: () => {
      SERVER.post(`${QSR_CASHIER_URL}/login`, { ...values })
          .then(({ data }) => {
            dispatch(loginCashier({ ...data?.data, userType: "cashier" }));
          })
          .catch((error) => {
            dispatch(catchError({ error: error?.message }));
          })
          .finally(() => {
            setSubmitting(false)
            navigate("/cashier")
          });

      // TrackGoogleAnalyticsEvent(
      //   "LOGIN",
      //   "Login to account",
      //   window.location.pathname + window.location.search,
      //   {}
      // );
      // Hotjar.event("LOGIN");
    },
  });

  return (
    <div className="h-screen">
      <div className="lg:flex h-full">
        <div className="relative w-full h-full lg:m-0 lg:p-0">
          <div
            className="h-full w-full bg-contain"
            style={{ backgroundImage: "url('/img/waiter-login-bg.png')" }}
          >
            &nbsp;
          </div>

          <div
            className="absolute top-0 bottom-0 left-0 right-0"
            style={{ backgroundColor: "#F2FFF1" }}
          >
            <div className="relative flex flex-col items-center justify-center gap-y-2 md:gap-y-5 h-full w-full">
              <div className="w-1/3 md:w-1/6 h-auto">
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  className="object-cover w-full h-auto"
                />
              </div>

              <div
                className="h-fit lg:mb-20 w-5/6 lg:w-2/5 rounded-2xl bg-white p-5 bg-cover md:bg-contain lg:bg-cover xl:bg-contain"
                style={{
                  backgroundImage: "url('/img/waiter-bg.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPositionX: "right",
                }}
              >
                <div className="text-start lg:text-center spacing-y-2">
                  <h2 className="text-2xl text-black font_bold">Staff login</h2>
                  <h5 className="font_regular text-xs font-semibold">
                    Enter your login details to continue
                  </h5>
                </div>

                <div className="mt-5 mb-5 w-full">
                  {formInputs?.map((input: any, i) => (
                    <Input
                      key={i}
                      type={
                        input?.type === "password"
                          ? togglePassword
                          : input?.type
                      }
                      password={input?.type === "password"}
                      placeholder={input?.placeholder}
                      name={input?.name}
                      value={values[input.name as keyof typeof values]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={input?.options}
                      selectPlaceholder={input?.selectPlaceholder}
                      error={
                        errors[input?.name as keyof typeof values] &&
                        touched[input?.name as keyof typeof values] &&
                        errors[input?.name as keyof typeof values]
                      }
                      onClickPassword={() => {
                        const localValue = togglePassword;
                        if (localValue === "password") {
                          setTogglePassword("text");
                        } else {
                          setTogglePassword("password");
                        }
                      }}
                    />
                  ))}

                  {errorMessage && (
                    <p className="text-sm text-center text-red-600 my-2">
                      {errorMessage}
                    </p>
                  )}
                  <Button
                    loading={isSubmitting}
                    title="Login"
                    extraClasses="w-full"
                    onClick={() => handleSubmit()}
                  />
                </div>
              </div>

              {/* <div
                className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-between px-3 py-4 h-fit bg-repeat"
                style={{ backgroundImage: "url('/img/waiter-footer-bg.png')" }}
              >
                <img src="/img/waiter-footer-logo.png" alt="" />

                <a href="https://tryhomemade.app/" target="_blank">
                  <button className="bg-white rounded-full px-3 py-1 text-center primary_txt_color text-xs font_medium">
                    Tryhomemade.app
                  </button>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierLogin;
