import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Images } from "../config/images";
import { AUTH_DATA } from "../reducers/type";

const Register = ({ showModal, setShowModal }) => {
  const [authType, setAuthType] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    email: Yup.string().email().required("Email is required."),
    phoneNumber: Yup.string()
      .min(11, "Phone number is not valid.")
      .required("Phone number is required."),
    password: Yup.string()
      .min(8, "Password must be minimum of 8 letters.")
      .required("Password is required."),
    shoppingWeek: Yup.array().required("Shopping week is required."),
    address: Yup.string().required("Address is required."),
    referralCode: Yup.string(),
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required."),
    password: Yup.string()
      .min(8, "Password must be minimum of 8 letters.")
      .required("Password is required."),
  });

  const options = [
    { value: "Week 1", label: "Week 1" },
    { value: "Week 2", label: "Week 2" },
    { value: "Week 3", label: "Week 3" },
    { value: "Week 4", label: "Week 4" },
  ];

  const registerUser = (values, formikBag) => {
    axios
      .post(
        `https://dropp-backend.herokuapp.com/api/v1/auth/shopper/register`,
        {
          ...values,
        }
      )
      .then(({ data }) => {
        dispatch({
          type: AUTH_DATA,
          payload: data,
        });
        sessionStorage.setItem("auth", JSON.stringify(data));
        navigate("/dashboard");
      })
      .catch((error) => {
        const { message } = error.response.data;
        if (message) alert(message);
      })
      .finally(() => formikBag.setSubmitting(false));
  };

  const loginUser = (values, formikBag) => {
    axios
      .post(`https://dropp-backend.herokuapp.com/api/v1/auth/login`, {
        ...values,
      })
      .then(({ data }) => {
        dispatch({
          type: AUTH_DATA,
          payload: data,
        });
        sessionStorage.setItem("auth", JSON.stringify(data));
        navigate("/dashboard");
      })
      .catch((error) => {
        const { message } = error.response.data;
        if (message) alert(message);
      })
      .finally(() => formikBag.setSubmitting(false));
  };

  return showModal ? (
    <>
      <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className={`relative w-4/5 lg:w-1/4 register_bg overflow-hidden mt-20 mb-6 mx-auto rounded-3xl shadow-lg ${
            authType ? "h-3/4" : "h-auto"
          }`}
        >
          <div>
            <div>
              <img
                src={Images.auth_banner}
                alt="register_banner"
                className="rounded-t-3xl"
              />
              <div className="absolute inset-10">
                <h1 className="text-2xl text-white font_bold">
                  {authType ? "Welcome to Dropp!" : "Welcome back!"}
                </h1>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer absolute top-5 right-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => setShowModal(false)}
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
              {authType ? (
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    shoppingWeek: "",
                    address: "",
                    referralCode: "",
                  }}
                  validationSchema={registerSchema}
                  onSubmit={(values, formikBag) => {
                    registerUser(values, formikBag);
                  }}
                >
                  {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                        >
                          First name
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          className="block w-full shadow-sm bg-transparent outline-none register_input font_regular"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="span"
                          className="text-sm text-red-500 font_regular"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                        >
                          Last name
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          className="block w-full shadow-sm bg-transparent outline-none register_input font_regular"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="span"
                          className="text-sm text-red-500 font_regular"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                        >
                          Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className="block w-full shadow-sm bg-transparent outline-none register_input font_regular"
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-sm text-red-500 font_regular"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                        >
                          Phone number
                        </label>
                        <Field
                          type="text"
                          name="phoneNumber"
                          maxLength="11"
                          className="block w-full shadow-sm bg-transparent outline-none register_input font_regular"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="span"
                          className="text-sm text-red-500 font_regular"
                        />
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
                            type={showRegisterPassword ? "text" : "password"}
                            name="password"
                            className="block w-full shadow-sm bg-transparent outline-none register_input font_regular"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 absolute right-10"
                            viewBox="0 0 20 20"
                            fill="#6C7072"
                            onClick={() =>
                              setShowRegisterPassword(!showRegisterPassword)
                            }
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="text-sm text-red-500 font_regular"
                        />
                      </div>
                      <div className="mb-7">
                        <label
                          htmlFor="shoppingWeek"
                          className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                        >
                          My shopping week
                        </label>
                        <Select
                          isMulti
                          classNamePrefix="custom_select"
                          onChange={(value) =>
                            props.setFieldValue(
                              "shoppingWeek",
                              value.map((v) => v.value)
                            )
                          }
                          options={options}
                        />
                        <ErrorMessage
                          name="shoppingWeek"
                          component="span"
                          className="text-sm text-red-500 font_regular"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                        >
                          Address
                        </label>
                        <Field
                          type="text"
                          name="address"
                          className="block w-full shadow-sm bg-transparent outline-none register_input font_regular"
                        />
                        <ErrorMessage
                          name="address"
                          component="span"
                          className="text-sm text-red-500 font_regular"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="referralCode"
                          className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                        >
                          Referral code (optional)
                        </label>
                        <Field
                          type="text"
                          name="referralCode"
                          className="block w-full shadow-sm bg-transparent outline-none register_input font_regular"
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-8 w-full flex justify-center py-3 border border-transparent rounded-xl shadow-sm text-lg text-center text-white font_bold bg_primary"
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
                          "Register now"
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={loginSchema}
                  onSubmit={(values, formikBag) => {
                    loginUser(values, formikBag);
                  }}
                >
                  {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                        >
                          Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className="block w-full shadow-sm bg-transparent outline-none register_input font_regular"
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-sm text-red-500 font_regular"
                        />
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
                            type={showLoginPassword ? "text" : "password"}
                            name="password"
                            className="block w-full shadow-sm bg-transparent outline-none register_input font_regular"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 absolute right-10"
                            viewBox="0 0 20 20"
                            fill="#6C7072"
                            onClick={() =>
                              setShowLoginPassword(!showLoginPassword)
                            }
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="text-sm text-red-500 font_regular"
                        />
                      </div>
                      <button
                        type="submit"
                        className="mt-8 w-full flex justify-center py-3 border border-transparent rounded-xl shadow-sm text-lg text-center text-white font_bold bg_primary"
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
                          "Login"
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              )}

              <div className="flex justify-center items-center mt-3 mb-5">
                <p
                  className="text-gray-500 cursor-pointer font_regular"
                  onClick={() => setAuthType(!authType)}
                >
                  {authType
                    ? "Already have an account?"
                    : "Don't have an account?"}
                  <span className="text-black font_bold">
                    {authType ? " Login" : " Register"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Register;
