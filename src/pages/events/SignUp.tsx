import Auth from "../../components/Auth";
import TopNav from "../../components/TopNav";
import { AUTH_ROUTES, HOME_ROUTES } from "../../routes/routes";
import {
  CustomerSignUpValues,
  EventSignUpValues,
} from "../../utils/FormInitialValue";
import { USER_TYPE } from "../../utils/Globals";
import {
  CustomerSignUpSchema,
  EventSignUpSchema,
} from "../../utils/ValidationSchema";
import {
  CUSTOMER_EVENT_REGISTER_URL,
  CUSTOMER_REGISTER_URL,
} from "../../_redux/urls";
import { useParams } from "react-router-dom";

const CustomerEventSignUp = () => {
  const { eventName } = useParams();

  return (
    <div>
      <TopNav event page={USER_TYPE.CUSTOMER} />
      {/* <Auth
        event
        bannerImage="/images/event-auth.png"
        initialValues={EventSignUpValues}
        validationSchema={EventSignUpSchema}
        formInputs={[
          { type: "text", placeholder: "First Name", name: "firstName" },
          { type: "text", placeholder: "Last Name", name: "lastName" },
          { type: "email", placeholder: "Email", name: "email" },
          {
            type: "text",
            placeholder: "Referral Code (optional)",
            name: "referralCode",
          },
          {
            type: "password",
            placeholder: "Password",
            name: "password",
          },
          {
            type: "password",
            placeholder: "Confirm Password",
            name: "confirmPassword",
          },
        ]}
        pageTitle="Sign Up as an Event Customer"
        buttonTitle="Sign Up"
        navigateMainTitle="Registered"
        navigateTitle="Log In"
        navigateTo={AUTH_ROUTES.linkCustomerLogin}
        url={CUSTOMER_EVENT_REGISTER_URL}
        actionPath={HOME_ROUTES.linkEvents}
      /> */}
      <Auth
        bannerImage="/images/customer-auth.png"
        initialValues={CustomerSignUpValues}
        validationSchema={CustomerSignUpSchema}
        formInputs={[
          { type: "text", placeholder: "First Name", name: "firstName" },
          { type: "text", placeholder: "Last Name", name: "lastName" },
          { type: "email", placeholder: "Email", name: "email" },
          {
            type: "password",
            placeholder: "Password",
            name: "password",
          },
          {
            type: "password",
            placeholder: "Confirm Password",
            name: "confirmPassword",
          },
          {
            type: "text",
            placeholder: "Referral Code (optional)",
            name: "referralCode",
          },
        ]}
        pageTitle="Sign Up as a Customer"
        buttonTitle="Sign Up"
        navigateMainTitle="Registered"
        navigateTitle="Log In"
        navigateTo={AUTH_ROUTES.linkCustomerFromLogin.replace(
          ":navigateFrom?",
          eventName ? `${eventName}_events` : ""
        )}
        url={CUSTOMER_REGISTER_URL}
        actionPath={HOME_ROUTES.linkEvents.replace(
          ":eventName",
          eventName ? eventName : ""
        )}
      />
    </div>
  );
};

export default CustomerEventSignUp;
