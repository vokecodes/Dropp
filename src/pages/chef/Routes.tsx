import { Routes, Route } from "react-router-dom";
import ChefDashboard from "./Dashboard";
import ChefMenu from "./Menu";
import ChefSettings from "./Settings";
import { CHEF_ROUTES } from "../../routes/routes";
import ChefOrders from "./Orders";
import ChefWallet from "./Wallet";
import ChefMessage from "./ChefMessage";
import NotFound from "../../components/NotFound";
import OnlineMenu from "./menu/OnlineMenu";
import DineInMenu from "./menu/DineInMenu";
import DineIn from "./DineIn";
import Kitchen from "./Kitchen";
import ChefDineIn from "./ChefDineIn";
import TableManagement from "./TableManagement";
import KitchenMenu from "./KitchenMenu";
import SubChefs from "./SubChefs";
import SalesReports from "./SalesReports";
import SectionManagement from "./SectionManagement";

const ChefRoutes = () => (
  <Routes>
    <Route>
      <Route index element={<ChefDashboard />} />
      <Route path={CHEF_ROUTES.chefReports} element={<SalesReports />} />
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
      <Route path={CHEF_ROUTES.restaurantDineIn} element={<DineIn />} />
      <Route path={CHEF_ROUTES.kitchen} element={<Kitchen />} />
      <Route path={CHEF_ROUTES.kitchenMenu} element={<KitchenMenu />} />
      <Route path={CHEF_ROUTES.chefSettings} element={<ChefSettings />} />
      <Route path={CHEF_ROUTES.chefWallet} element={<ChefWallet />} />
      <Route path={CHEF_ROUTES.chefChat} element={<ChefMessage />} />
      <Route path={CHEF_ROUTES.subChefs} element={<SubChefs />} />
      <Route path={CHEF_ROUTES.chefMenuOnline} element={<OnlineMenu />} />
      <Route path={CHEF_ROUTES.chefMenuDineIn} element={<DineInMenu />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default ChefRoutes;