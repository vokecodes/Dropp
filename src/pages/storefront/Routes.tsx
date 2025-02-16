import { Routes, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import ChefDashboard from "./Dashboard";
import ChefSettings from "./Settings";
import { CHEF_ROUTES } from "../../routes/routes";
import ChefOrders from "./Orders";
import ChefWallet from "./Wallet";
import ChefMessage from "./ChefMessage";
import NotFound from "../../components/NotFound";
import OnlineMenu from "./OnlineMenu";
import SalesReports from "./SalesReports";
import IdleTimerLayout from "../../utils/idleTimerLayout";

const StorefrontRoutes = () => {
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
          <Route path={CHEF_ROUTES.chefOrders} element={<ChefOrders />} />
          <Route path={CHEF_ROUTES.chefSettings} element={<ChefSettings />} />
          <Route path={CHEF_ROUTES.chefWallet} element={<ChefWallet />} />
          <Route path={CHEF_ROUTES.chefChat} element={<ChefMessage />} />
          <Route path={CHEF_ROUTES.chefMenu} element={<OnlineMenu />} />
          <Route path={CHEF_ROUTES.chefReports} element={<SalesReports />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </IdleTimerLayout>
  );
};

export default StorefrontRoutes;
