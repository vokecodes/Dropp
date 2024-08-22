import Auth from "../../components/Auth";
import TopNav from "../../components/TopNav";
import { AUTH_ROUTES } from "../../routes/routes";
import { LoginValues } from "../../utils/FormInitialValue";
import { USER_TYPE } from "../../utils/Globals";
import { LoginSchema } from "../../utils/ValidationSchema";
import { COMPANY_LOGIN_URL } from "../../_redux/urls";

const CompanyLogin = () => {
  return (
    <div>
      <TopNav page={USER_TYPE.COMPANY} />
      <Auth
        bannerImage="/images/chef-auth.png"
        initialValues={LoginValues}
        validationSchema={LoginSchema}
        formInputs={[
          { type: "email", placeholder: "Email", name: "email" },
          {
            type: "password",
            placeholder: "Password",
            name: "password",
            // password: true,
          },
        ]}
        pageTitle="Welcome Back!"
        buttonTitle="Log In"
        navigateMainTitle="Not Registered"
        navigateTitle="Sign Up"
        navigateTo={AUTH_ROUTES.linkCompanySignUp}
        goToForgotPasswordLink={AUTH_ROUTES.linkCompanyForgotPassword}
        url={COMPANY_LOGIN_URL}
        actionPath="login"
      />
    </div>
  );
};

export default CompanyLogin;
