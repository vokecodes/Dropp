import { Routes, Route } from "react-router-dom";
import ChefMenu from "./Menu";
import ChefSettings from "./Settings";
import { SUB_CHEF_ROUTES } from "../../routes/routes";
import NotFound from "../../components/NotFound";
import OnlineMenu from "./menu/OnlineMenu";
import DineInMenu from "./menu/DineInMenu";
import ChefDineIn from "./ChefDineIn";
import TableManagement from "./TableManagement";
import Kitchen from "./Kitchen";
import KitchenMenu from "./KitchenMenu";

const SubChefRoutes = () => (
  <Routes>
    <Route>
      <Route index element={<ChefMenu />} />
      <Route path={SUB_CHEF_ROUTES.subChefDineIn} element={<ChefDineIn />} />
      <Route
        path={SUB_CHEF_ROUTES.subChefTableManagement}
        element={<TableManagement />}
      />
      <Route
        path={SUB_CHEF_ROUTES.subChefSettings}
        element={<ChefSettings />}
      />
      <Route
        path={SUB_CHEF_ROUTES.subChefMenuOnline}
        element={<OnlineMenu />}
      />
      <Route
        path={SUB_CHEF_ROUTES.subChefMenuDineIn}
        element={<DineInMenu />}
      />
      <Route path={SUB_CHEF_ROUTES.kitchen} element={<Kitchen />} />
      <Route path={SUB_CHEF_ROUTES.kitchenMenu} element={<KitchenMenu />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default SubChefRoutes;
