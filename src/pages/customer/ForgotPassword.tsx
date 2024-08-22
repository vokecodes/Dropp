import { Link, useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import TopNav from "../../components/TopNav";
import { AUTH_ROUTES } from "../../routes/routes";
import Button from "../../components/Button";
import Input from "../../components/CustomInput";
import { FORGOT_PASSWORD_URL } from "../../_redux/urls";
import { forgotResetPasswordUserAccount } from "../../_redux/auth/authAction";
import { useAppDispatch } from "../../redux/hooks";
import { ForgotPasswordSchema } from "../../utils/ValidationSchema";

const formInputs = [{ type: "email", placeholder: "Email", name: "email" }];

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
    initialValues: { email: "" },
    validationSchema: ForgotPasswordSchema,
    onSubmit: () => {
      dispatch(
        forgotResetPasswordUserAccount(
          FORGOT_PASSWORD_URL,
          values,
          AUTH_ROUTES.linkCustomerResetPassword,
          navigate
        )
      );
    },
  });

  return (
    <div>
      <TopNav />

      <div className="lg:mx-20 my-5 px-4 sm:px-6 pt-24">
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
                Forgot Password
              </h2>

              <p className="my-2 text-md gray_color font_medium">
                Enter your email to you reset your password. If it is valid, we
                will send a verification and instructions by email.
              </p>
              <div className="my-5">
                {formInputs?.map((input, i) => (
                  <Input
                    key={i}
                    type={input?.type}
                    placeholder={input?.placeholder}
                    name={input?.name}
                    onChange={handleChange}
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
                  title="Forgot Password"
                  extraClasses="w-full"
                  onClick={() => handleSubmit()}
                />
              </div>
              <p className="mt-5 mb-3 text-lg text-black font_bold">
                Registered?{" "}
                <Link to={AUTH_ROUTES.linkCustomerLogin}>
                  {" "}
                  <span className="underline">Log In</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForgotPassword;
