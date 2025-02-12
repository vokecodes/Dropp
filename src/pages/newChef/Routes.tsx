import { Routes, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import ChefDashboard from "./Dashboard";
import ChefMenu from "./Menu";
import ChefSettings from "./Settings";
import { CHEF_ROUTES } from "../../routes/routes";
import ChefOrders from "./Orders";
import ChefWallet from "./Wallet";
import ChefMessage from "./ChefMessage";
import NotFound from "../../components/NotFound";
import OnlineMenu from "./menu/OnlineMenu";
import ChefDineIn from "./ChefDineIn";
import TableManagement from "./TableManagement";
import KitchenMenu from "./KitchenMenu";
import SalesReports from "./SalesReports";
import SectionManagement from "./SectionManagement";
import IdleTimerLayout from "../../utils/idleTimerLayout";

const ChefRoutes = () => {
  const { auth } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
    }),
    shallowEqual
  );
  return (
    <IdleTimerLayout>
      <Routes>
        <Route>
          <Route index element={<ChefDashboard />} />
          <Route path={CHEF_ROUTES.chefMenu} element={<ChefMenu />} />
          <Route path={CHEF_ROUTES.chefOrders} element={<ChefOrders />} />
          <Route path={CHEF_ROUTES.chefDineIn} element={<ChefDineIn />} />
          <Route
            path={CHEF_ROUTES.chefTableManagement}
            element={<TableManagement />}
          />
          <Route
            path={CHEF_ROUTES.chefSectionManagement}
            element={<SectionManagement />}
          />
          <Route path={CHEF_ROUTES.chefSettings} element={<ChefSettings />} />
          <Route path={CHEF_ROUTES.chefWallet} element={<ChefWallet />} />
          <Route path={CHEF_ROUTES.chefChat} element={<ChefMessage />} />
          <Route path={CHEF_ROUTES.chefMenuOnline} element={<OnlineMenu />} />

          {auth?.user?.isRestaurant ? (
            <>
              <Route path={CHEF_ROUTES.chefReports} element={<SalesReports />} />
              <Route path={CHEF_ROUTES.kitchenMenu} element={<KitchenMenu />} />
            </>
          ) : (
            <Route path={CHEF_ROUTES.chefReports} element={<SalesReports />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </IdleTimerLayout>
  );
};

export default ChefRoutes;
