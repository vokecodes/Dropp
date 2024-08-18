import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const resetSchema = Yup.object().shape({
        otp: Yup.string()
        .min(5, "OTP must be minimum of 5 numbers.")
        .required("OTP is required."),
        password: Yup.string()
          .min(8, "Password must be minimum of 8 letters.")
          .required("Password is required."),
    });

    const userResetPassword = (values, formikBag) => {
        axios
        .post(`http://localhost:4000/api/v1/auth/dropp-user/reset-password`, {
        //   .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
            ...values,
          })
          .then(({ data }) => {
            navigate("/auth/login");
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
                <p className='text-center font_bold text-xl mb-5'>Reset Password</p>
                <p className='text-center font_regular text-sm mb-5'>Enter the OTP sent to your email address and new password.</p>
                <Formik
                    initialValues={{
                        otp: "",
                        password: "",
                    }}
                    validationSchema={resetSchema}
                    onSubmit={(values, formikBag) => {
                    // console.log('values= ', values)
                    userResetPassword(values, formikBag);
                    }}
                >
                    {(props) => (
                    <Form onSubmit={props.handleSubmit} className='h-full w-full flex flex-col justify-between gap-y-2'>

                        <div className="w-full">
                          {/* otp */}
                          <div className="w-full mb-3">
                            <Field
                                type="text"
                                name="otp"
                                placeholder="OTP code"
                                className="block w-full shadow-sm bg-neutral-100 outline-none font_regular text-black text-xs p-5 rounded-lg focus:bg-neutral-200"
                            />

                            <ErrorMessage
                                name="otp"
                                component="span"
                                className="text-xs text-red-500 font_regular"
                            />
                          </div>

                          {/* password */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between">
                                <Field
                                type={
                                    showRegisterPassword ? "text" : "password"
                                }
                                name="password"
                                placeholder="Password"
                                className="block w-full shadow-sm bg-neutral-100 outline-none font_regular text-black text-xs p-5 rounded-lg focus:bg-neutral-200"
                                />
                                {
                                  showRegisterPassword ? (
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 absolute right-10 cursor-pointer"
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
                                  ) : (
                                    <svg 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 absolute right-10 cursor-pointer"
                                    fill="none"
                                    onClick={() =>
                                        setShowRegisterPassword(!showRegisterPassword)
                                    }
                                    >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"> 
                                        <path d="M2 2L22 22" stroke="#6C7072" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                                        <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#6C7072" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                                        <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#6C7072" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                                    </g>
                                    </svg>
                                  )
                                }
                            </div>
                            <ErrorMessage
                                name="password"
                                component="span"
                                className="text-xs text-red-500 font_regular"
                            />
                          </div>
                          
                          <div className="w-full">
                              <Link to={'/auth/forgot-password'}>
                                  <p className="text-xs font_regular hover:underline font-semibold"><span className="text-[#747372]">Didn't get OTP? </span><span className="text-[#4A443A]"></span>Resend</p>
                              </Link>
                          </div>
                        </div>
                        
                        <div className="w-full">
                          {
                            errorMessage && (
                              <div className='w-full py-2'>
                                <p className='text-center text-xs text-red-400'>{ errorMessage }</p>
                              </div>
                            )
                          }

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
                              "Reset password"
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
  )
}

export default ResetPasswordPage