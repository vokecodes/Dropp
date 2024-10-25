import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { shallowEqual, useSelector } from "react-redux";
import Auth from "../../components/Auth";
import TopNav from "../../components/TopNav";
import { AUTH_ROUTES } from "../../routes/routes";
import { SuperWaiterLoginValues, WaiterLoginValues } from "../../utils/FormInitialValue";
import { USER_TYPE } from "../../utils/Globals";
import { LoginSchema, SuperWaiterLoginSchema, WaiterLoginSchema } from "../../utils/ValidationSchema";
import { CHEF_LOGIN_URL, RESTAURANT_TABLE_URL } from "../../_redux/urls";
import { useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../store";
import TrackGoogleAnalyticsEvent from "../../components/TrackGoogleAnalyticsEvent";
import Input from "../../components/CustomInput";
import Button from "../../components/Button";
import { SERVER } from "../../config/axios";
import { loginSuperWaiter, loginWaiter } from "../../_redux/waiter/waiterSlice";

const WaiterLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState("");
  const [togglePassword, setTogglePassword] = useState("password");

  const [superWaiter, setSuperWaiter] = useState(false);

  const formInputs = [
    { type: "text", placeholder: "Employee ID", name: "employeeID" },
    { type: "text", placeholder: "Table", name: "table" },
    {
      type: "password",
      placeholder: "Password",
      name: "password",
    },
  ];
  
  const superWaiterFormInputs = [
    { type: "text", placeholder: "Employee ID", name: "employeeID" },
    {
      type: "password",
      placeholder: "Password",
      name: "password",
    },
  ];

  const { error } = useSelector(
    (state: RootState) => ({
      error: state.auth.error,
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
    initialValues: superWaiter ? SuperWaiterLoginValues : WaiterLoginValues,
    validationSchema: superWaiter ? SuperWaiterLoginSchema : WaiterLoginSchema,
    onSubmit: () => {
      if(superWaiter){
        SERVER.post(`${RESTAURANT_TABLE_URL}/super-login`, { ...values })
          .then(({ data }) => {
            dispatch(loginSuperWaiter({ ...data?.data, userType: "superWaiter" }));
          })
          .catch((error) => {})
          .finally(() => {
            setSubmitting(false)
            navigate("/waiter/super-waiter")
          });
      }else{
        SERVER.post(`${RESTAURANT_TABLE_URL}/login`, { ...values })
          .then(({ data }) => {
            dispatch(loginWaiter({ ...data?.data, userType: "waiter" }));
          })
          .catch((error) => {})
          .finally(() => setSubmitting(false));
      }

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
            style={{ backgroundColor: "rgb(255 235 237 / 88%)" }}
          >
            <div className="relative flex flex-col items-center justify-center gap-y-2 md:gap-y-5 h-full w-full">
              <div className="w-1/3 md:w-1/6 h-auto">
                <img
                  src="/img/pappies.png"
                  alt="logo"
                  className="object-cover w-full h-auto"
                />
              </div>

              <p className="card_headerText font_bold text-2xl md:text-4xl w-3/5 font-extrabold text-center">
                Welcome to Papiee's&nbsp;Meatro
              </p>

              <div
                className="h-fit mb-20 w-5/6 lg:w-2/5 rounded-2xl bg-white p-5 bg-cover md:bg-contain lg:bg-cover xl:bg-contain"
                style={{
                  backgroundImage: "url('/img/waiter-bg.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPositionX: "right",
                }}
              >
                <div className="text-start spacing-y-2">
                  <h2 className="text-2xl text-black font_bold">Staff login</h2>
                  <h5 className="font_regular text-xs font-semibold">
                    Enter your login details to continue
                  </h5>
                </div>

                <div className="w-full my-3">
                  <div className="w-fit h-fit flex flex-row items-center rounded-full bg-[#EDECEC] font_medium lg:space-x-3 text-nowrap">
                    <span className={`inline-block px-2 lg:px-3 py-2 rounded-full cursor-pointer ${superWaiter ? '' : 'primary_bg_color text-white'}`} onClick={() => setSuperWaiter(false)}>Regular waiter</span>

                    <span className={`inline-block px-2 lg:px-3 py-2 rounded-full cursor-pointer ${superWaiter ? 'primary_bg_color text-white' : ''}`} onClick={() => setSuperWaiter(true)}>Super waiter</span>
                  </div>
                </div>

                <div className="mt-5 mb-5 w-full">
                  {superWaiter ? (
                    <>
                      {superWaiterFormInputs?.map((input: any, i) => (
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
                    </>
                  ) : (
                    <>
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
                    </>
                  )}

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

              <div
                className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-between px-3 py-4 h-fit bg-repeat"
                style={{ backgroundImage: "url('/img/waiter-footer-bg.png')" }}
              >
                <img src="/img/waiter-footer-logo.png" alt="" />

                <a href="https://tryhomemade.app/" target="_blank">
                  <button className="bg-white rounded-full px-3 py-1 text-center primary_txt_color text-xs font_medium">
                    Tryhomemade.app
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterLogin;
