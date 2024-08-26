import Auth from "../../components/Auth";
import TopNav from "../../components/TopNav";
import { AUTH_ROUTES, COMPANY_ROUTES } from "../../routes/routes";
import { CompanySignUpValues } from "../../utils/FormInitialValue";
import { USER_TYPE } from "../../utils/Globals";
import { CompanySignUpSchema } from "../../utils/ValidationSchema";
import { COMPANY_REGISTER_URL } from "../../_redux/urls";

const CompanySignUp = () => {
  return (
    <div>
      <TopNav page={USER_TYPE.COMPANY} />
      <Auth
        bannerImage="/images/customer-auth.png"
        initialValues={CompanySignUpValues}
        validationSchema={CompanySignUpSchema}
        formInputs={[
          { type: "text", placeholder: "Company name", name: "companyName" },
          { type: "email", placeholder: "Official Email", name: "email" },
          { type: "number", placeholder: "Number of employees", name: "numberOfEmployees" },
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
        pageTitle="Create a Company Profile"
        buttonTitle="Sign Up"
        navigateMainTitle="Registered"
        navigateTitle="Log In"
        navigateTo={AUTH_ROUTES.linkCompanyLogin}
        url={COMPANY_REGISTER_URL}
        actionPath={COMPANY_ROUTES.linkCompany}
      />
    </div>
  );
};

export default CompanySignUp;
