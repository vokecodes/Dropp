import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { connect, shallowEqual, useSelector } from "react-redux";
import Home from "../pages/dropp-main/Home";
import AuthRoutes from "./authRoutes";
import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  CASHIER_ROUTES,
  CHEF_ROUTES,
  COMPANY_ROUTES,
  CUSTOMER_ROUTES,
  HOME_ROUTES,
  QSR_ROUTES,
  QSR_SUBADMIN_ROUTES,
  SUB_CHEF_ROUTES,
  WAITER_ROUTES,
} from "./routes";
import NotFound from "../components/NotFound";
import {
  ADMIN_USER,
  CHEF_USER,
  COMPANY_USER,
  QSR_SUB_ADMIN_USER,
  QUICK_SERVICE_USER,
  SUB_CHEF_USER,
} from "../config/UserType";
import Explore from "../pages/customer/Explore";
import ChefShop from "../pages/chef/ChefShop";
import RestaurantShop from "../pages/chef/RestaurantShop";
import ChefLandingPage from "../pages/chef/ChefLanding";
import CompaniesLandingPage from "../pages/company/CompaniesLandingPage";
import PreviewChefShop from "../pages/chef/PreviewChefShop";
import PreviewRestaurantShop from "../pages/chef/PreviewRestaurantShop";
import Events from "../pages/events";
import FoodSafety from "../components/landing-page/FoodSafety";
import PrivacyPolicy from "../pages/dropp-main/PrivacyPolicy";
import TermsService from "../pages/dropp-main/TermsService";
import Subscription from "../pages/chef/Subscription";
import WaiterRoutes from "../pages/waiter/Routes";
import ChefRoutes from "../pages/chef/Routes";
import CompanyRoutes from "../pages/company/Routes";
import CustomerRoutes from "../pages/customer/Routes";
import SubChefRoutes from "../pages/sub-chef/Routes";
import CustomerEventSignUp from "../pages/events/SignUp";
import AdminRoutes from "../pages/dashboard/Routes";
import {
  QsrRoutes,
  CashierRoutes,
  QsrSubAdminRoutes,
} from "../pages/qsr/Routes";
import QsrShop from "../pages/qsr/QsrShop";

const AppRoutes = () => {
  const { user } = useSelector(
    (state: any) => ({
      user: state.auth.user,
    }),
    shallowEqual
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />

        <Route path={HOME_ROUTES.explore} element={<Explore />} />
        <Route path={HOME_ROUTES.exploreChef} element={<ChefShop />} />
        <Route
          path={HOME_ROUTES.exploreRestaurant}
          element={<RestaurantShop />}
        />
        <Route path={HOME_ROUTES.exploreQsr} element={<QsrShop />} />
        {/* <Route
          path={HOME_ROUTES.exploreRestaurantEdit}
          element={<RestaurantShop />}
        /> */}
        <Route
          path={HOME_ROUTES.chefLandingPage}
          element={<ChefLandingPage />}
        />
        <Route
          path={HOME_ROUTES.companies}
          element={<CompaniesLandingPage />}
        />
        <Route path={HOME_ROUTES.previewChef} element={<PreviewChefShop />} />
        <Route
          path={HOME_ROUTES.previewRestaurant}
          element={<PreviewRestaurantShop />}
        />
        <Route path={HOME_ROUTES.events} element={<Events />} />
        <Route path={HOME_ROUTES.foodSafety} element={<FoodSafety />} />
        <Route path={HOME_ROUTES.privacyPolicy} element={<PrivacyPolicy />} />
        <Route path={HOME_ROUTES.termsService} element={<TermsService />} />
        <Route path={HOME_ROUTES.subscription} element={<Subscription />} />

        <Route path={WAITER_ROUTES.waiter} element={<WaiterRoutes />} />

        <Route path={CASHIER_ROUTES.cashier} element={<CashierRoutes />} />

        {user?.user ? (
          <>
            {user?.user?.userType === CHEF_USER ? (
              <>
                {user?.user?.chefType === QUICK_SERVICE_USER ? (
                  <Route path={QSR_ROUTES.qsr} element={<QsrRoutes />} />
                ) : (
                  <Route path={CHEF_ROUTES.chef} element={<ChefRoutes />} />
                )}
              </>
            ) : user?.user?.userType === SUB_CHEF_USER ? (
              <Route
                path={SUB_CHEF_ROUTES.subChef}
                element={<SubChefRoutes />}
              />
            ) : user?.user?.userType === QSR_SUB_ADMIN_USER ? (
              <Route
                path={QSR_SUBADMIN_ROUTES.qsrSubAdmin}
                element={<QsrSubAdminRoutes />}
              />
            ) : user?.user?.userType === COMPANY_USER ? (
              <Route
                path={COMPANY_ROUTES.company}
                element={<CompanyRoutes />}
              />
            ) : user?.user?.userType === ADMIN_USER ? (
              <Route path={ADMIN_ROUTES.admin} element={<AdminRoutes />} />
            ) : (
              <>
                <Route
                  path={CUSTOMER_ROUTES.customer}
                  element={<CustomerRoutes />}
                />
              </>
            )}
          </>
        ) : (
          <>
            <Route
              path={HOME_ROUTES.eventRegister}
              element={<CustomerEventSignUp />}
            />
            <Route path={AUTH_ROUTES.auth} element={<AuthRoutes />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
