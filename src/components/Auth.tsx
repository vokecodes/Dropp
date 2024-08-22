import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, shallowEqual } from "react-redux";
import Hotjar from "@hotjar/browser";
import Button from "./Button";
import Input from "./CustomInput";
import { AuthProps } from "../utils/Interfaces";
import { registerLoginUserAccount } from "../_redux/auth/authAction";
import { useAppDispatch } from "../redux/hooks";
import { RootState } from "../store";
import { handlePhoneNumber } from "../utils/formatMethods";
import TrackGoogleAnalyticsEvent from "./TrackGoogleAnalyticsEvent";
import { HOME_ROUTES } from "../routes/routes";
import { verifyReferralCode } from "../_redux/auth/authCrud";

const Auth = ({
  bannerImage,
  initialValues,
  validationSchema,
  formInputs,
  buttonTitle,
  navigateMainTitle,
  navigateTitle,
  navigateTo,
  pageTitle,
  forgotPassword,
  goToForgotPasswordLink,
  url,
  actionPath,
  event,
  navigateFrom,
  selectPlaceholder,
}: AuthProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState("");

  const { error } = useSelector(
    (state: RootState) => ({
      error: state.auth.error,
    }),
    shallowEqual
  );

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      dispatch(
        registerLoginUserAccount(
          url,
          values,
          actionPath,
          navigate,
          setSubmitting,
          navigateFrom,
          setErrorMessage
        )
      );
      if (buttonTitle === "Sign Up") {
        TrackGoogleAnalyticsEvent(
          "SIGN_UP",
          "Create an account",
          window.location.pathname + window.location.search,
          {}
        );
        Hotjar.event("SIGN_UP");
      } else {
        TrackGoogleAnalyticsEvent(
          "LOGIN",
          "Login to account",
          window.location.pathname + window.location.search,
          {}
        );
        Hotjar.event("LOGIN");
      }
    },
  });

  useEffect(() => {
    if (location?.search) {
      const searchParams = location?.search.split("=");
      setFieldValue("referralCode", searchParams[1]);
    }
  }, []);

  const [togglePassword, setTogglePassword] = useState("password");

  const [isReferralCodeLoading, setIsReferralCodeLoading] = useState(false);
  const [referralCodeError, setReferralCodeError] = useState<any>();

  // const handleVerifyCode = async (e: any) => {
  //   const code = e.target.value;

  //   setIsReferralCodeLoading(true);
  //   setReferralCodeError("");

  //   try {
  //     const { data } = await verifyReferralCode(code);
  //   } catch (error: any) {
  //     setReferralCodeError(error?.response?.data?.message);
  //   } finally {
  //     setIsReferralCodeLoading(false);
  //   }
  // };

  // Define a variable to store a reference to the timeout
  const inputRef = useRef(null);
  const latestCodeRef = useRef("");
  const typingTimeoutRef = useRef<any>(null);
  let typingTimeout: any;

  const handleVerifyCode = async (e: any) => {
    const code = e.target.value;

    // Update the latest code value
    latestCodeRef.current = code;

    // Clear the previous timeout if it exists
    if (typingTimeoutRef) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout to wait for a certain period of inactivity before making the API call
    typingTimeoutRef.current = setTimeout(async () => {
      // Check if the current code matches the latest input value
      if (code === latestCodeRef.current) {
        setIsReferralCodeLoading(true);
        setReferralCodeError("");
        try {
          const { data } = await verifyReferralCode(code);
        } catch (error: any) {
          // Handle the verification error here if necessary
          setReferralCodeError(error?.response?.data?.message);
        } finally {
          setIsReferralCodeLoading(false);
        }
      }
    }, 1000);
  };

  return (
    <div className="lg:mx-20 py-5">
      <div className="lg:flex">
        <div className="lg:w-1/2">
          <img src={bannerImage} alt="banner" className="w-full" />
        </div>
        <div className="lg:w-1/2 lg:ml-14 my-5 mx-5 lg:mx-0">
          <div className="lg:w-3/4">
            <h2 className="text-2xl secondary_text_color font_medium">
              {forgotPassword ? "Forgot Password" : pageTitle}
            </h2>

            {event && (
              <div className="my-2">
                <p className="text-lg secondary_text_color font_medium">
                  How it works
                </p>
                <div className="flex items-center my-1">
                  <div className="h-2 w-2 rounded-full secondary_bg_color" />
                  <p className="ml-2 text-xs font_medium gray_color">
                    Register/log In below with the event{" "}
                    <span className="font_bold">referral code</span>.
                  </p>
                </div>
                <div className="flex items-center my-1">
                  <div className="h-2 w-2 rounded-full secondary_bg_color" />
                  <p className="ml-2 text-xs font_medium gray_color">
                    A discount code will be sent to your email.
                  </p>
                </div>
                <div className="flex items-center my-1">
                  <div className="h-2 w-2 rounded-full secondary_bg_color" />
                  <p className="ml-2 text-xs font_medium gray_color">
                    Visit the event meal page & pick your preferred meal.
                  </p>
                </div>
                <div className="flex items-center my-1">
                  <div className="h-2 w-2 rounded-full secondary_bg_color" />
                  <p className="ml-2 text-xs font_medium gray_color">
                    Checkout with the discount code sent to your email.
                  </p>
                </div>
              </div>
            )}

            {forgotPassword ? (
              <p className="my-2 text-md gray_color font_medium">
                Enter your email to you reset your password. If it is valid, we
                will send a verification and instructions by email.
              </p>
            ) : (
              <>
                {/* <div className="my-5">
                  <GoogleButton extraClasses="w-full" />
                </div> */}
                {/* <div className="flex items-center">
                  <div className="w-2/5 h-0.5 bg_gray_color" />
                  <p className="w-3/5 text-center text-sm text-black font_bold">
                    Or continue with email
                  </p>
                  <div className="w-2/5 h-0.5 bg_gray_color" />
                </div> */}
              </>
            )}
            <div className="mt-10 mb-5">
              {formInputs?.map((input, i) => (
                <Input
                  key={i}
                  type={
                    input?.type === "password" ? togglePassword : input?.type
                  }
                  password={input?.type === "password"}
                  placeholder={input?.placeholder}
                  name={input?.name}
                  value={values[input.name as keyof typeof values]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={input.options}
                  selectPlaceholder={input.selectPlaceholder}
                  onkeyup={
                    input?.name === "referralCode"
                      ? handleVerifyCode
                      : handlePhoneNumber
                  }
                  ref={input?.name === "referralCode" ? inputRef : undefined}
                  error={
                    errors[input?.name as keyof typeof values] &&
                    touched[input?.name as keyof typeof values] &&
                    errors[input?.name as keyof typeof values]
                  }
                  onClickPassword={() => {
                    const localValue = togglePassword;
                    if (localValue === "password") {
                      setTogglePassword("text");
                    } else {
                      setTogglePassword("password");
                    }
                  }}
                  referralCodeError={referralCodeError}
                  isReferralCodeLoading={isReferralCodeLoading}
                />
              ))}

              {goToForgotPasswordLink && (
                <div className="-mt-3 mb-5 text-xs underline">
                  <Link to={goToForgotPasswordLink}>Forgot Password?</Link>
                </div>
              )}
              {errorMessage && (
                <p className="text-sm text-center text-red-600 my-2">
                  {errorMessage}
                </p>
              )}
              <Button
                loading={isSubmitting}
                title={buttonTitle}
                extraClasses="w-full"
                onClick={() => handleSubmit()}
              />
            </div>
            <p className="mt-5 mb-3 text-lg text-black font_bold">
              {navigateMainTitle}?{" "}
              <Link to={navigateTo}>
                {" "}
                <span className="underline">{navigateTitle}</span>
              </Link>
            </p>
            {!forgotPassword && (
              <>
                <p className="text-sm font_medium text-black">
                  By clicking Log in or Sign up you agree to
                </p>
                <p className="text-sm font_medium text-black">
                  Homemade's{" "}
                  <Link to={HOME_ROUTES.linkTermsService}>
                    <span className="underline primary_txt_color">
                      Terms of Service
                    </span>
                  </Link>{" "}
                  and{" "}
                  <Link to={HOME_ROUTES.linkPrivacyPolicy}>
                    <span className="underline primary_txt_color">
                      Privacy Policy
                    </span>
                  </Link>
                  .
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
