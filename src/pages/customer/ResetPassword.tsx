import { Link, useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import TopNav from "../../components/TopNav";
import { AUTH_ROUTES } from "../../routes/routes";
import Button from "../../components/Button";
import Input from "../../components/CustomInput";
import { RESET_PASSWORD_URL } from "../../_redux/urls";
import { forgotResetPasswordUserAccount } from "../../_redux/auth/authAction";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";

const formInputs = [
  { type: "text", placeholder: "OTP", name: "otp" },
  {
    type: "password",
    placeholder: "Password",
    name: "password",
  },
];

const CustomerForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, loading } = useSelector(
    (state: any) => ({
      error: state.auth.error,
      loading: state.auth.loading,
    }),
    shallowEqual
  );

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { otp: "", password: "" },
    validationSchema: Yup.object().shape({
      otp: Yup.string().required("OTP is required."),
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: () => {
      dispatch(
        forgotResetPasswordUserAccount(
          RESET_PASSWORD_URL,
          values,
          AUTH_ROUTES.linkCustomerLogin,
          navigate
        )
      );
    },
  });

  const [togglePassword, setTogglePassword] = useState("password");

  return (
    <div>
      <TopNav />

      <div className="lg:mx-20 py-5">
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <img
              src="/images/customer-auth.png"
              alt="banner"
              className="w-full"
            />
          </div>
          <div className="lg:w-1/2 lg:ml-14 my-5">
            <div className="lg:w-3/4">
              <h2 className="text-2xl secondary_text_color font_medium">
                Reset Password
              </h2>

              <p className="my-2 text-md gray_color font_medium">
                Enter the OTP sent to your email address and new password.
              </p>
              <div className="my-5">
                {formInputs?.map((input, i) => (
                  <Input
                    key={i}
                    type={
                      input?.type === "password" ? togglePassword : input?.type
                    }
                    placeholder={input?.placeholder}
                    name={input?.name}
                    onChange={handleChange}
                    password={input?.type === "password"}
                    onClickPassword={() => {
                      const localValue = togglePassword;
                      if (localValue === "password") {
                        setTogglePassword("text");
                      } else {
                        setTogglePassword("password");
                      }
                    }}
                    error={
                      errors[input?.name as keyof typeof values] &&
                      touched[input?.name as keyof typeof values] &&
                      errors[input?.name as keyof typeof values]
                    }
                  />
                ))}

                {error && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {error}
                  </p>
                )}
                <Button
                  loading={loading}
                  title="Reset Password"
                  extraClasses="w-full"
                  onClick={() => handleSubmit()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForgotPassword;
