import Auth from "../../components/Auth";
import TopNav from "../../components/TopNav";
import { AUTH_ROUTES } from "../../routes/routes";
import { LoginValues } from "../../utils/FormInitialValue";
import { USER_TYPE } from "../../utils/Globals";
import { LoginSchema } from "../../utils/ValidationSchema";
import { CHEF_LOGIN_URL } from "../../_redux/urls";

const ChefLogin = () => {
  return (
    <div>
      <TopNav page={USER_TYPE.CHEF} />
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
        navigateTo={AUTH_ROUTES.linkChefSignUp}
        goToForgotPasswordLink={AUTH_ROUTES.linkChefForgotPassword}
        url={CHEF_LOGIN_URL}
        actionPath="login"
      />
    </div>
  );
};

export default ChefLogin;
