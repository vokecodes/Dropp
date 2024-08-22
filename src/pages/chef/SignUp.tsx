import Auth from "../../components/Auth";
import TopNav from "../../components/TopNav";
import { AUTH_ROUTES, CHEF_ROUTES } from "../../routes/routes";
import { SignUpValues } from "../../utils/FormInitialValue";
import { CHEFS_LOCATIONS, USER_TYPE } from "../../utils/Globals";
import { SignUpSchema } from "../../utils/ValidationSchema";
import { CHEF_REGISTER_URL } from "../../_redux/urls";

const ChefSignUp = () => {
  return (
    <div>
      <TopNav page={USER_TYPE.CHEF} />
      <Auth
        bannerImage="/images/chef-auth.png"
        initialValues={SignUpValues}
        validationSchema={SignUpSchema}
        formInputs={[
          { type: "text", placeholder: "First Name", name: "firstName" },
          { type: "text", placeholder: "Last Name", name: "lastName" },
          { type: "email", placeholder: "Email", name: "email" },
          { type: "tel", placeholder: "Phone Number", name: "phoneNumber" },
          {
            type: "dropdown",
            placeholder: "Location",
            name: "address",
            options: [{ label: "", value: "" }, ...CHEFS_LOCATIONS],
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
        pageTitle="Home Chef Sign Up"
        buttonTitle="Sign Up"
        navigateMainTitle="Registered"
        navigateTitle="Log In"
        navigateTo={AUTH_ROUTES.linkChefLogin}
        url={CHEF_REGISTER_URL}
        actionPath={CHEF_ROUTES.linkChef}
      />
    </div>
  );
};

export default ChefSignUp;
