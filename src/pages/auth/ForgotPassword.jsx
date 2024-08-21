import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");

  const forgotSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required."),
  });

  const userForgotPassword = (values, formikBag) => {
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/auth/restaurant/forgot-password`,
        {
          ...values,
        }
      )
      .then(({ data }) => {
        navigate("/auth/reset-password");
      })
      .catch((error) => {
        const { message } = error.response.data;
        if (message) setErrorMessage(message);
      })
      .finally(() => formikBag.setSubmitting(false));
  };

  return (
    <section className="w-screen h-screen flex flex-col items-center justify-between header_bg">
      <Navbar />

      <main className="w-full h-full flex flex-row items-center justify-center">
        <div className="bg-white rounded-3xl h-3/4 min-h-1/2 w-11/12 lg:w-1/3 mx-auto lg:flex flex-col items-center justify-start">
          <div className="h-full flex flex-col items-center justify-start relative py-5 px-3 lg:px-8">
            <p className="text-center font_bold text-xl mb-5">
              Forgot Password
            </p>
            <p className="text-center font_regular text-sm mb-5">
              Enter your email to you reset your password. If it is valid, we
              will send a verification and instructions by email.
            </p>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={forgotSchema}
              onSubmit={(values, formikBag) => {
                // console.log('values= ', values)
                userForgotPassword(values, formikBag);
              }}
            >
              {(props) => (
                <Form
                  onSubmit={props.handleSubmit}
                  className="h-full w-full flex flex-col justify-between gap-y-2"
                >
                  <div className="w-full">
                    {/* email */}
                    <div className="w-full mb-3">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="block w-full shadow-sm bg-neutral-100 outline-none font_regular text-black text-xs p-5 rounded-lg focus:bg-neutral-200"
                      />

                      <ErrorMessage
                        name="email"
                        component="span"
                        className="text-xs text-red-500 font_regular"
                      />
                    </div>

                    <div className="w-full">
                      <Link to={"/auth/login"}>
                        <p className="text-xs font_regular hover:underline font-semibold">
                          <span className="text-[#747372]">
                            Already registered?{" "}
                          </span>
                          <span className="text-[#4A443A]"></span>Log In
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="w-full">
                    {errorMessage && (
                      <div className="w-full py-2">
                        <p className="text-center text-xs text-red-400">
                          {errorMessage}
                        </p>
                      </div>
                    )}

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
                        "Continue"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ForgotPasswordPage;
