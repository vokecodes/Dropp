import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { AUTH_DATA } from "../../../reducers/type";
import { BASE_API_URL } from "../../../_redux/urls";
import { registerLoginAccount } from "../../../_redux/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useSelector(
    (state: any) => ({
      user: state.auth.user,
    }),
    shallowEqual
  );

  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    email: Yup.string().email().required("Email is required."),
    password: Yup.string()
      .min(8, "Password must be minimum of 8 letters.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .required("Confirm password is required.")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    phoneNumber: Yup.string()
      .min(11, "Phone number is not valid.")
      .required("Phone number is required."),
    restaurantName: Yup.string().required("Restaurant name is required."),
    restaurantType: Yup.string().required("Restaurant type is required."),
    restaurantLocation: Yup.array(Yup.string()).required(
      "Restaurant location is required."
    ),
    restaurantLocationNum: Yup.string().required(
      "Number of restaurant locations is required."
    ),
    referral: Yup.string().optional(),
  });

  const restaurantTypes = [
    { value: "Dine-in", label: "Dine-in" },
    { value: "Private Chefs", label: "Private Chefs" },
    { value: "Bar & Lounge", label: "Bar & Lounge" },
    { value: "Cafe", label: "Cafe" },
    { value: "Food Truck", label: "Food Truck" },
    { value: "Fast Casual", label: "Fast Casual" },
    { value: "Others", label: "Others" },
  ];

  const [restaurantType, setRestaurantType] = useState<any>("");
  const chooseResType = (resType: any) => {
    setRestaurantType(resType);
  };

  const restaurantLocations = [
    { value: "Lagos", label: "Lagos" },
    { value: "Abuja", label: "Abuja" },
    { value: "Ibadan", label: "Ibadan" },
    { value: "Port Harcourt", label: "Port Harcourt" },
    { value: "Others", label: "Others" },
  ];

  const [restaurantLocation, setRestaurantLocation] = useState<any[]>([]);
  const chooseResLocation = (resLocation: any) => {
    let temp = [...restaurantLocation];

    if (restaurantLocation.includes(resLocation)) {
      temp = temp.filter((item) => item !== resLocation);
    } else {
      temp.push(resLocation);
    }

    setRestaurantLocation(temp);
    return temp;
  };

  const restaurantNums = [
    { value: "1", label: "1" },
    { value: "2 - 5", label: "2 - 5" },
    { value: "6 -10", label: "6 -10" },
    { value: "11 - 25", label: "11 - 25" },
    { value: "25 - 50", label: "25 - 50" },
    { value: "+ 50", label: "+ 50" },
  ];

  const [restaurantNum, setRestaurantNum] = useState("");
  const chooseResNum = (resNum: any) => {
    setRestaurantNum(resNum);
  };

  const options = [
    { value: "Referral", label: "Referral" },
    { value: "LinkedIn", label: "LinkedIn" },
    { value: "Instagram", label: "Instagram" },
    { value: "Twitter", label: "Twitter" },
    { value: "Google", label: "Google" },
    { value: "Others", label: "Others" },
  ];

  const registerUser = (values: any, formikBag: any) => {
    axios
      .post(`${BASE_API_URL}/auth/restaurant/register`, {
        ...values,
      })
      .then(({ data }) => {
        const { success } = data;
        if (success) setSuccess(true);
        // dispatch({
        //   type: AUTH_DATA,
        //   payload: data,
        // });
        // sessionStorage.setItem("auth", JSON.stringify(data));
        dispatch(registerLoginAccount({ ...data?.data }));
        navigate("/chef");
      })
      .catch((error) => {
        const { message } = error.response.data;
        if (message) setErrorMessage(message);
      })
      .finally(() => formikBag.setSubmitting(false));
  };

  return (
    <section className="w-full h-full header_bg lg:pb-20">
      <Navbar authPage />

      <main className="bg-white rounded-3xl w-11/12 lg:w-1/3 mx-auto pt-5 lg:flex flex-row items-center">
        <div className="relative pt-5 px-3 lg:px-8">
          <p className="text-center font_bold text-xl mb-5">Get Started</p>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              phoneNumber: "",
              restaurantName: "",
              restaurantType: "",
              restaurantLocation: [],
              restaurantLocationNum: "",
              referral: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, formikBag) => {
              console.log("values= ", values);
              registerUser(values, formikBag);
            }}
          >
            {(props) => (
              <Form
                onSubmit={props.handleSubmit}
                className="flex flex-col gap-y-2"
              >
                {/* names */}
                <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-x-3">
                  <div className="mb-3 w-full">
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      className="block w-full shadow-sm bg-neutral-100 outline-none font_regular text-black text-xs p-5 rounded-lg focus:bg-neutral-200"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="span"
                      className="text-xs text-red-500 font_regular"
                    />
                  </div>

                  <div className="mb-3 w-full">
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      className="block w-full shadow-sm bg-neutral-100 outline-none font_regular text-black text-xs p-5 rounded-lg focus:bg-neutral-200"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="span"
                      className="text-xs text-red-500 font_regular"
                    />
                  </div>
                </div>

                {/* email */}
                <div className="mb-3">
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

                {/* password */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <Field
                      type={showRegisterPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="block w-full shadow-sm bg-neutral-100 outline-none font_regular text-black text-xs p-5 rounded-lg focus:bg-neutral-200"
                    />
                    {showRegisterPassword ? (
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
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M2 2L22 22"
                            stroke="#6C7072"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                            stroke="#6C7072"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                            stroke="#6C7072"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </svg>
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="text-xs text-red-500 font_regular"
                  />
                </div>

                {/* confirm password */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <Field
                      type={showRegisterPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      className="block w-full shadow-sm bg-neutral-100 outline-none font_regular text-black text-xs p-5 rounded-lg focus:bg-neutral-200"
                    />
                    {showRegisterPassword ? (
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
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M2 2L22 22"
                            stroke="#6C7072"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                            stroke="#6C7072"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                            stroke="#6C7072"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </svg>
                    )}
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="span"
                    className="text-xs text-red-500 font_regular"
                  />
                </div>

                {/* phone */}
                <div className="mb-3">
                  <Field
                    type="text"
                    name="phoneNumber"
                    maxLength="11"
                    placeholder="Phone number"
                    className="block w-full shadow-sm bg-neutral-100 outline-none font_regular text-black text-xs p-5 rounded-lg focus:bg-neutral-200"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="span"
                    className="text-xs text-red-500 font_regular"
                  />
                </div>

                {/* Restaurant Name */}
                <div className="mb-3">
                  <Field
                    type="text"
                    name="restaurantName"
                    placeholder="Restaurant name"
                    className="block w-full shadow-sm bg-neutral-100 outline-none font_regular text-black text-xs p-5 rounded-lg focus:bg-neutral-200"
                  />
                  <ErrorMessage
                    name="restaurantName"
                    component="span"
                    className="text-xs text-red-500 font_regular"
                  />
                </div>

                {/* restaurant type */}
                <div className="mb-3">
                  <p className="font_regular mb-3">
                    Select your Restaurant type
                  </p>
                  <div className="w-full flex flex-row items-center justify-start gap-x-2 gap-y-3 my-3 flex-wrap">
                    {restaurantTypes.map((item, i) => (
                      <div
                        key={item.value}
                        className={`w-fit h-fit px-5 py-2 rounded-full border border-neutral cursor-pointer ${
                          restaurantType == item.value
                            ? "bg_primary text-white hover:bg-bg_primary"
                            : "hover:bg-neutral-100"
                        } `}
                        onClick={() => {
                          chooseResType(item.value);
                          props.setFieldValue("restaurantType", item.value);
                        }}
                      >
                        <p className="font_regular text-sm">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage
                    name="restaurantType"
                    component="span"
                    className="text-xs text-red-500 font_regular"
                  />
                </div>

                {/* restaurant location */}
                <div className="mb-3">
                  <p className="font_regular mb-3">Restaurant location</p>
                  <div className="w-full flex flex-row items-center justify-start gap-x-2 gap-y-3 my-3 flex-wrap">
                    {restaurantLocations.map((item, i) => (
                      <div
                        key={item.value}
                        className={`w-fit h-fit px-5 py-2 rounded-full border border-neutral cursor-pointer ${
                          restaurantLocation &&
                          restaurantLocation.includes(item.value)
                            ? "bg_primary text-white hover:bg-bg_primary"
                            : "hover:bg-neutral-100"
                        } `}
                        onClick={() => {
                          const locations = chooseResLocation(item.value);
                          props.setFieldValue("restaurantLocation", locations);
                        }}
                      >
                        <p className="font_regular text-sm">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage
                    name="restaurantLocation"
                    component="span"
                    className="text-xs text-red-500 font_regular"
                  />
                </div>

                {/* restaurant location num*/}
                <div className="mb-3">
                  <p className="font_regular mb-3">Number of locations</p>
                  <div className="w-full flex flex-row items-center justify-start gap-x-2 gap-y-3 my-3 flex-wrap">
                    {restaurantNums.map((item, i) => (
                      <div
                        key={item.value}
                        className={`w-fit h-fit px-5 py-2 rounded-full border border-neutral cursor-pointer ${
                          restaurantNum == item.value
                            ? "bg_primary text-white hover:bg-bg_primary"
                            : "hover:bg-neutral-100"
                        } `}
                        onClick={() => {
                          chooseResNum(item.value);
                          props.setFieldValue(
                            "restaurantLocationNum",
                            item.value
                          );
                        }}
                      >
                        <p className="font_regular text-sm">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage
                    name="restaurantLocationNum"
                    component="span"
                    className="text-xs text-red-500 font_regular"
                  />
                </div>

                {/* HEAR ABOUT US */}
                <div className="mb-7">
                  <Select
                    className="block w-full shadow-sm bg-neutral-100 outline-none font_regular text-black text-xs p-3 rounded-lg focus:bg-neutral-200"
                    classNamePrefix="custom_select"
                    onChange={(value) => {
                      // console.log('value select= ', value)
                      props.setFieldValue("referral", value?.value);
                    }}
                    placeholder="How did you hear about us?"
                    options={options}
                  />
                </div>

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
                    "Register now"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex justify-center items-center mt-3 mb-5">
            <Link to={"/auth/login"}>
              <p
                className="text-gray-500 cursor-pointer font_regular"
                // onClick={() => setAuthType(!authType)}
              >
                Already have an account?
                <span className="text-black font_bold">Log In</span>
              </p>
            </Link>
          </div>
          <p className="mt-2 mb-5 text-center text-gray-500 text-sm font_regular">
            By creating an account, I confirm that I have read and understood
            the Dropp{" "}
            <a
              href="https://opposite-pet-88e.notion.site/Terms-of-Service-750a370ccc434a16b2b80c3f277f4968"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Terms of Use
            </a>
          </p>
        </div>
      </main>
    </section>
  );
};

export default SignUpPage;
