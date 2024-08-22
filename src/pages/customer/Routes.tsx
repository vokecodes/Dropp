import { Routes, Route } from "react-router-dom";
import CustomerOrders from "./Orders";
import CustomerSettings from "./Settings";
import { CUSTOMER_ROUTES } from "../../routes/routes";
import Favourite from "./Favourite";
import CustomerMessage from "./CustomerMessage";
import NotFound from "../../components/NotFound";
import CustomerSubscription from "./Subscription";
import CustomerWallet from "./Wallet";

const CustomerRoutes = () => (
  <Routes>
    <Route>
      <Route index element={<CustomerOrders />} />
      <Route
        path={CUSTOMER_ROUTES.customerOrders}
        element={<CustomerOrders />}
      />
      <Route
        path={CUSTOMER_ROUTES.customerWallet}
        element={<CustomerWallet />}
      />{" "}
      <Route
        path={CUSTOMER_ROUTES.customerSettings}
        element={<CustomerSettings />}
      />
      <Route
        path={CUSTOMER_ROUTES.customerFavourites}
        element={<Favourite />}
      />
    </Route>
    <Route path={CUSTOMER_ROUTES.customerChat} element={<CustomerMessage />} />
    <Route
      path={CUSTOMER_ROUTES.customerSubscription}
      element={<CustomerSubscription />}
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default CustomerRoutes;
