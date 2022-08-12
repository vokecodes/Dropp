import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Images } from "../config/images";
import { AUTH_DATA } from "../reducers/type";

const Register = ({ showModal, setShowModal }) => {
  const [authType, setAuthType] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    password: Yup.string().required(),
    shoppingWeek: Yup.array().required(),
    address: Yup.string().required(),
    referralCode: Yup.string(),
  });

  const options = [
    { value: "Week 1", label: "Week 1" },
    { value: "Week 2", label: "Week 2" },
    { value: "Week 3", label: "Week 3" },
    { value: "Week 4", label: "Week 4" },
  ];

  const registerUser = (values) => {
    alert(
      JSON.stringify(values),
      `https://dropp-backend.herokuapp.com/api/v1/auth/shopper/register`
    );

    // axios
    //   .post(
    //     `https://dropp-backend.herokuapp.com/api/v1/auth/shopper/register`,
    //     {
    //       ...values,
    //     }
    //   )
    //   .then(({ data }) => {
    //     dispatch({
    //       type: AUTH_DATA,
    //       payload: data,
    //     });
    //     sessionStorage.setItem("auth", JSON.stringify(data));
    //     navigate("/dashboard");
    //   })
    //   .catch((error) => {
    //     console.log("error", error, error.response);
    //   });
  };

  return showModal ? (
    <>
      <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/5 lg:w-1/4 h-5/6 register_bg overflow-scroll mt-20 mb-6 mx-auto rounded-3xl shadow-lg ">
          <div className="relative flex flex-col w-full outline-none focus:outline-none">
            <div className="min-h-full flex flex-col justify-center">
              <img
                src={Images.register_banner}
                alt="register_banner"
                className="rounded-t-3xl"
              />
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

              <div className="pt-5 px-8">
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
                  onSubmit={(values) => {
                    registerUser(values);
                  }}
                >
                  {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          First name
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          className="block w-full shadow-sm bg-transparent outline-none register_input "
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Last name
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          className="block w-full shadow-sm bg-transparent outline-none register_input "
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className="block w-full shadow-sm bg-transparent outline-none register_input "
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone number
                        </label>
                        <Field
                          type="text"
                          name="phoneNumber"
                          className="block w-full shadow-sm bg-transparent outline-none register_input "
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          className="block w-full shadow-sm bg-transparent outline-none register_input "
                        />
                      </div>
                      <div className="mb-7">
                        <label
                          htmlFor="shoppingWeek"
                          className="block text-sm font-medium text-gray-700 mb-1"
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
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Address
                        </label>
                        <Field
                          type="text"
                          name="address"
                          className="block w-full shadow-sm bg-transparent outline-none register_input "
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="referralCode"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Referral code (optional)
                        </label>
                        <Field
                          type="text"
                          name="referralCode"
                          className="block w-full shadow-sm bg-transparent outline-none register_input "
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

                <div className="flex justify-center items-center mt-3 mb-5">
                  <p
                    className="text-gray-500 cursor-pointer"
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
      </div>
    </>
  ) : null;
};

export default Register;
