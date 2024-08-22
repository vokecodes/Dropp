import { useParams } from "react-router-dom";
import Auth from "../../components/Auth";
import TopNav from "../../components/TopNav";
import { AUTH_ROUTES } from "../../routes/routes";
import { LoginValues } from "../../utils/FormInitialValue";
import { USER_TYPE } from "../../utils/Globals";
import { LoginSchema } from "../../utils/ValidationSchema";
import { LOGIN_URL } from "../../_redux/urls";

const CustomerLogin = () => {
  const { navigateFrom, navigateFrom2 } = useParams();

  return (
    <div>
      <TopNav page={USER_TYPE.CUSTOMER} />
      <Auth
        bannerImage="/images/customer-auth.png"
        initialValues={LoginValues}
        validationSchema={LoginSchema}
        formInputs={[
          { type: "email", placeholder: "Email", name: "email" },
          {
            type: "password",
            placeholder: "Password",
            name: "password",
          },
        ]}
        pageTitle="Welcome Back!"
        buttonTitle="Log In"
        navigateMainTitle="Not Registered"
        navigateTitle="Sign Up"
        navigateTo={AUTH_ROUTES.linkCustomerSignUp}
        goToForgotPasswordLink={AUTH_ROUTES.linkCustomerForgotPassword}
        url={LOGIN_URL}
        actionPath="login"
        navigateFrom={
          navigateFrom2 ? `${navigateFrom}/${navigateFrom2}` : navigateFrom
        }
      />
    </div>
  );
};

export default CustomerLogin;
