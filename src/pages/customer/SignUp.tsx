import Auth from "../../components/Auth";
import TopNav from "../../components/TopNav";
import { AUTH_ROUTES, CUSTOMER_ROUTES } from "../../routes/routes";
import { CustomerSignUpValues } from "../../utils/FormInitialValue";
import { USER_TYPE } from "../../utils/Globals";
import { CustomerSignUpSchema } from "../../utils/ValidationSchema";
import { CUSTOMER_REGISTER_URL } from "../../_redux/urls";

const CustomerSignUp = () => {
  return (
    <div>
      <TopNav page={USER_TYPE.CUSTOMER} />
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
        navigateTo={AUTH_ROUTES.linkCustomerLogin}
        url={CUSTOMER_REGISTER_URL}
        actionPath={CUSTOMER_ROUTES.linkCustomer}
      />
    </div>
  );
};

export default CustomerSignUp;
