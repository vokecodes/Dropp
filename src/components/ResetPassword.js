import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

const ResetPassword = ({ showResetModal, setShowResetModal, setShowModal }) => {
  const [authType, setAuthType] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isResendLoading, setIsResendLoading] = useState(false);

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required."),
  });

  const passwordSchema = Yup.object().shape({
    otp: Yup.string().required("OTP is required."),
    password: Yup.string()
      .min(8, "Password must be minimum of 8 letters.")
      .required("Password is required."),
  });

  const emailCheck = (email, formikBag) => {
    setErrorMessage();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/password/forgot`, {
        email,
      })
      .then(({ data }) => {
        const { success } = data;
        if (success) {
          setAuthType("OTP");
        }
      })
      .catch((error) => {
        const { success, message } = error?.response?.data;
        if (success) {
          setAuthType("OTP");
        } else {
          setErrorMessage(message);
        }
      })
      .finally(() => formikBag.setSubmitting(false));
  };

  const otpCheck = (values, formikBag) => {
    setErrorMessage();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/password/reset`, {
        ...values,
      })
      .then(({ data }) => {
        const { success, message } = data;
        if (success) {
          setSuccess(true);
        } else {
          setErrorMessage(message);
        }
      })
      .catch((error) => {
        const { success, message } = error?.response?.data;
        if (success) {
          setAuthType("OTP");
        } else {
          setErrorMessage(message);
        }
      })
      .finally(() => formikBag.setSubmitting(false));
  };

  const goToLogin = () => {
    setShowResetModal(false);
    setSuccess(false);
    setAuthType("");
    setErrorMessage();
    setShowModal(true);
  };

  const handleResendPassword = (e, email) => {
    e.preventDefault();
    setIsResendLoading(true);
    emailCheck(email);
    setTimeout(() => {
      setIsResendLoading(false);
    }, 2000);
  };

  return showResetModal ? (
    <>
      <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/5 lg:w-1/4 register_bg overflow-hidden mt-20 mb-6 mx-auto rounded-3xl shadow-lg h-auto">
          <div className="py-5">
            <h1 className="text-center text-2xl text-black font_bold">
              Reset password
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer absolute top-5 right-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => setShowResetModal(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="relative w-full h-4/5 overflow-scroll justify-center outline-none focus:outline-none">
            <div className="pt-5 px-8">
              {success ? (
                <div className="">
                  <div className="flex justify-center mb-10">
                    <div className="h-28 w-28 rounded-full bg_success flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="5"
                        stroke="#047C45"
                        className="w-12 h-12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-md text-center font_medium gray_title">
                    Password changed successfully
                  </p>
                  <button
                    type="submit"
                    className="mt-16 mb-10 w-full flex justify-center py-3 border border-transparent rounded-xl shadow-sm text-lg text-center text-white font_bold bg_primary"
                    onClick={() => goToLogin()}
                  >
                    Log in
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-lg text-center font_regular gray_title">
                    {authType === "OTP"
                      ? "Confirm the OTP sent to you mail"
                      : "Enter your email to reset your password"}
                  </p>
                  <Formik
                    initialValues={{
                      email: "",
                      otp: "",
                      password: "",
                    }}
                    validationSchema={
                      authType === "OTP"
                        ? passwordSchema
                        : emailValidationSchema
                    }
                    onSubmit={(values, formikBag) => {
                      if (authType === "OTP") {
                        otpCheck(values, formikBag);
                      } else emailCheck(values.email, formikBag);
                    }}
                  >
                    {(props) => (
                      <Form onSubmit={props.handleSubmit}>
                        {authType === "OTP" ? (
                          <div className="mt-10">
                            <div className="mb-3">
                              <label
                                htmlFor="otp"
                                className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                              >
                                OTP
                              </label>
                              <Field
                                type="text"
                                name="otp"
                                className="block w-full shadow-sm bg-transparent outline-none register_input font_regular text-danger-500"
                              />
                              {props.touched && (
                                <ErrorMessage
                                  name="otp"
                                  component="span"
                                  className="text-sm text-red-500 font_regular"
                                />
                              )}
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                              >
                                Password
                              </label>
                              <div className="flex">
                                <Field
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  className="block w-full shadow-sm bg-transparent outline-none register_input font_regular"
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 absolute right-10 cursor-pointer"
                                  viewBox="0 0 20 20"
                                  fill="#6C7072"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              {props.touched && (
                                <ErrorMessage
                                  name="password"
                                  component="span"
                                  className="text-sm text-red-500 font_regular"
                                />
                              )}
                              <div>
                                <button
                                  className="mt-5 bg_yellow h-8 w-24 rounded-full text-xs font_bold"
                                  onClick={async (e) =>
                                    handleResendPassword(e, props.values.email)
                                  }
                                >
                                  {isResendLoading ? (
                                    <svg
                                      className="animate-spin h-5 w-5 ml-8"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="#fff"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        fill="#fec62e"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                  ) : (
                                    "Resend OTP"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-10 mb-3">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                            >
                              Email
                            </label>
                            <Field
                              type="email"
                              name="email"
                              className="block w-full shadow-sm bg-transparent outline-none register_input font_regular text-danger-500"
                            />
                            {props.touched && (
                              <ErrorMessage
                                name="email"
                                component="span"
                                className="text-sm text-red-500 font_regular"
                              />
                            )}
                          </div>
                        )}
                        {errorMessage !== "" && (
                          <p className="text-center text-red-500 text-lg mt-10">
                            {errorMessage}
                          </p>
                        )}
                        <button
                          type="submit"
                          className="mt-40 w-full flex justify-center py-3 border border-transparent rounded-xl shadow-sm text-lg text-center text-white font_bold bg_primary"
                          disabled={props.isSubmitting}
                        >
                          {props.isSubmitting ? (
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#fff"
                                strokeWidth="4"
                              ></circle>
                              <path
                                fill="#06c16b"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            <>
                              {authType === "OTP"
                                ? "Reset Password"
                                : "Verify Email"}
                            </>
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                  <p
                    className="mt-7 mb-10 gray_title cursor-pointer text-center font_bold"
                    onClick={() => goToLogin()}
                  >
                    Back to Login
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default ResetPassword;
