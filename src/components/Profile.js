import React from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import Select from "react-select";

const Profile = ({ user, showProfileModal, setShowProfileModal }) => {
  const navigate = useNavigate();

  const profileSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    email: Yup.string().email().required("Email is required."),
    phoneNumber: Yup.string()
      .min(11, "Phone number is not valid.")
      .required("Phone number is required."),
    shoppingWeek: Yup.array().required("Shopping week is required."),
  });

  const userShoppingWeek =
    user?.shoppingWeek?.length > 0
      ? user.shoppingWeek?.map((week) => {
          return { label: week, value: week };
        })
      : [];

  const options = [
    { value: "Week 1", label: "Week 1" },
    { value: "Week 2", label: "Week 2" },
    { value: "Week 3", label: "Week 3" },
    { value: "Week 4", label: "Week 4" },
  ];

  const updateUser = (values, formikBag) => {
    const result = sessionStorage.getItem("auth");

    const { token } = JSON.parse(result);

    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/user/${user?._id}`,
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
        setShowProfileModal(false);
        navigate("/");
      })
      .catch((error) => {
        const { message } = error.response.data;
        if (message) alert(message);
      })
      .finally(() => formikBag.setSubmitting(false));
  };

  return showProfileModal ? (
    <>
      <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/5 lg:w-1/4 bg-white h-3/4 overflow-hidden mt-20 mb-6 mx-auto rounded-3xl shadow-lg ">
          <div className="mt-10 mb-5">
            <h1 className="text-2xl font_bold text-black text-center">
              Profile
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer absolute top-5 right-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => setShowProfileModal(false)}
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
              <Formik
                initialValues={user}
                validationSchema={profileSchema}
                onSubmit={(values, formikBag) => {
                  updateUser(values, formikBag);
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
                        className="block w-full shadow-sm bg-transparent outline-none register_input"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="span"
                        className="text-sm text-red-500"
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
                      <ErrorMessage
                        name="lastName"
                        component="span"
                        className="text-sm text-red-500"
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
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="text-sm text-red-500"
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
                        maxLength="11"
                        className="block w-full shadow-sm bg-transparent outline-none register_input "
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="span"
                        className="text-sm text-red-500"
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
                        defaultValue={userShoppingWeek}
                        // value={userShoppingWeek}
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
                        className="text-sm text-red-500"
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
                        "Save changes"
                      )}
                    </button>
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

export default Profile;
