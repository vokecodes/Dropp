import { shallowEqual, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ChefSignUp from "../pages/chef/SignUp";
import ChefLogin from "../pages/chef/Login";
import ChefForgotPassword from "../pages/chef/ForgotPassword";
import ChefResetPassword from "../pages/chef/ResetPassword";

// import ChefForgotPassword from "../chef/ForgotPassword";
import CustomerSignUp from "../pages/customer/SignUp";
import CustomerLogin from "../pages/customer/Login";
import CustomerForgotPassword from "../pages/customer/ForgotPassword";
import CustomerResetPassword from "../pages/customer/ResetPassword";

import CompanySignUp from "../pages/company/SignUp";
import CompanyLogin from "../pages/company/Login";
import CompanyForgotPassword from "../pages/company/CompanyForgotPassword";
import CompanyResetPassword from "../pages/company/ResetPassword";

import { AUTH_ROUTES } from "../routes/routes";
import SignUpPage from "../pages/dropp-main/auth/SignUp";
import LoginPage from "../pages/dropp-main/auth/Login";
import ForgotPasswordPage from "../pages/dropp-main/auth/ForgotPassword";
import ResetPasswordPage from "../pages/dropp-main/auth/ResetPassword";
import AdminLogin from "../pages/dashboard/Login";
import StorefrontSignUpPage from "../pages/storefront/auth/SignUp";
import StorefrontLoginPage from "../pages/storefront/auth/Login";
import StorefrontForgotPasswordPage from "../pages/storefront/auth/ForgotPassword";
import StorefrontResetPasswordPage from "../pages/storefront/auth/ResetPassword";

const AuthRoutes = () => {
  const { user } = useSelector(
    (state: any) => ({
      user: state.auth.user,
    }),
    shallowEqual
  );

  return (
    <Routes>
      <Route>
        {/* Dropp Routes */}
        <Route index element={<SignUpPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Customer Routes */}
        <Route path={AUTH_ROUTES.customerSignUp} element={<CustomerSignUp />} />
        <Route path={AUTH_ROUTES.customerLogin} element={<CustomerLogin />} />
        <Route
          path={AUTH_ROUTES.customerForgotPassword}
          element={<CustomerForgotPassword />}
        />
        <Route
          path={AUTH_ROUTES.customerResetPassword}
          element={<CustomerResetPassword />}
        />

        {/* Chef Routes */}
        <Route path={AUTH_ROUTES.chefSignUp} element={<ChefSignUp />} />
        <Route path={AUTH_ROUTES.chefLogin} element={<ChefLogin />} />
        <Route
          path={AUTH_ROUTES.chefForgotPassword}
          element={<ChefForgotPassword />}
        />
        <Route
          path={AUTH_ROUTES.chefResetPassword}
          element={<ChefResetPassword />}
        />
        <Route path={AUTH_ROUTES.chefSignUp} element={<ChefSignUp />} />
        <Route path={AUTH_ROUTES.chefLogin} element={<ChefLogin />} />
        <Route
          path={AUTH_ROUTES.chefForgotPassword}
          element={<ChefForgotPassword />}
        />

        {/* WAITER */}
        <Route path={AUTH_ROUTES.chefLogin} element={<ChefLogin />} />

        {/* COMPANY */}
        <Route path={AUTH_ROUTES.companySignUp} element={<CompanySignUp />} />
        <Route path={AUTH_ROUTES.companyLogin} element={<CompanyLogin />} />
        <Route
          path={AUTH_ROUTES.companyForgotPassword}
          element={<CompanyForgotPassword />}
        />
        <Route
          path={AUTH_ROUTES.companyResetPassword}
          element={<CompanyResetPassword />}
        />

        {/* STOREFRONT */}
        <Route
          path={AUTH_ROUTES.storefrontSignUp}
          element={<StorefrontSignUpPage />}
        />
        <Route
          path={AUTH_ROUTES.storefrontLogin}
          element={<StorefrontLoginPage />}
        />
        <Route
          path={AUTH_ROUTES.storefrontForgotPassword}
          element={<StorefrontForgotPasswordPage />}
        />
        <Route
          path={AUTH_ROUTES.storefrontResetPassword}
          element={<StorefrontResetPasswordPage />}
        />

        {/* ADMIN */}
        <Route path={AUTH_ROUTES.adminLogin} element={<AdminLogin />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
