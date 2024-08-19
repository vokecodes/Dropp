import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

const ChangePassword = ({ showPasswordModal, setShowPasswordModal }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updateSuccessful, setUpdateSuccessful] = useState(false);

  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, "Password must be minimum of 8 letters.")
      .required("Password is required."),

    newPassword: Yup.string()
      .min(8, "Password must be minimum of 8 letters.")
      .required("Password is required."),
  });

  const updatePassword = (values, formikBag) => {
    const result = sessionStorage.getItem("auth");
    const { token, data } = JSON.parse(result);

    axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/auth/changePassword/${data?.user?._id}`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        setUpdateSuccessful(data?.success);
      })
      .catch((error) => {
        const { message } = error.response.data;
        if (message) alert(message);
      })
      .finally(() => formikBag.setSubmitting(false));
  };

  return showPasswordModal ? (
    <>
      <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/5 lg:w-1/4 bg-white h-3/5 overflow-hidden mt-20 mb-6 mx-auto rounded-3xl shadow-lg ">
          <div className="mt-10 mb-5">
            <h1 className="text-2xl font_bold text-black text-center">
              {updateSuccessful ? "Success" : "Change Password"}
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer absolute top-5 right-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => setShowPasswordModal(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="relative w-full justify-center outline-none focus:outline-none">
            <div className="pt-5 px-8">
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                }}
                validationSchema={passwordSchema}
                onSubmit={(values, formikBag) => {
                  updatePassword(values, formikBag);
                }}
              >
                {(props) => (
                  <Form onSubmit={props.handleSubmit}>
                    {updateSuccessful ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg_success w-28 h-28 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-14 w-14"
                            viewBox="0 0 20 20"
                            fill="#047C45"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="mt-8 text-base text-black text-center font_medium">
                          Password changed successfully.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="mb-3">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Your old password
                          </label>
                          <div className="flex">
                            <Field
                              type={showOldPassword ? "text" : "password"}
                              name="oldPassword"
                              className="block w-full shadow-sm bg-transparent outline-none register_input "
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 absolute right-10"
                              viewBox="0 0 20 20"
                              fill="#6C7072"
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
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
                            name="oldPassword"
                            component="span"
                            className="text-sm text-red-500"
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Your new password
                          </label>
                          <div className="flex">
                            <Field
                              type={showNewPassword ? "text" : "password"}
                              name="newPassword"
                              className="block w-full shadow-sm bg-transparent outline-none register_input "
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 absolute right-10"
                              viewBox="0 0 20 20"
                              fill="#6C7072"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
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
                            name="newPassword"
                            component="span"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </>
                    )}

                    {updateSuccessful ? (
                      <button
                        className="mt-56 lg:mt-32 w-full ml-3 flex justify-center py-3 border border-transparent rounded-xl shadow-sm text-lg text-center text-white font_bold bg_primary"
                        onClick={() => setShowPasswordModal(false)}
                      >
                        Close
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="mt-56 lg:mt-32 w-full ml-3 flex justify-center py-3 border border-transparent rounded-xl shadow-sm text-lg text-center text-white font_bold bg_primary"
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
                          "Save changes"
                        )}
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default ChangePassword;
