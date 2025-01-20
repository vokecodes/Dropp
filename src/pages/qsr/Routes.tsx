import { Routes, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import NotFound from "../../components/NotFound";
import IdleTimerLayout from "../../utils/idleTimerLayout";
import SuperAdminDashboard from "./superAdmin/SuperAdminDashboard";
import SuperAdminReport from "./superAdmin/SuperAdminReport";
import { QSR_ROUTES, CASHIER_ROUTES, QSR_SUBADMIN_ROUTES } from "../../routes/routes";
import SuperAdminCashiers from "./superAdmin/SuperAdminCashiers";
import SuperAdminSettings from "./superAdmin/SuperAdminSettings";
import SuperAdminOrderPage from "./cashier/CashierOrderPage";
import SuperAdminMenuPage from "./superAdmin/SuperAdminMenuPage";
import CashierLogin from "./cashier/CashierLogin";
import SubAdminReport from "./subAdmin/SubAdminReport";
import SubAdminCashiers from "./subAdmin/SubAdminCashiers";
import SubAdminMenuPage from "./subAdmin/SubAdminMenuPage";
import QsrSubAdminSettings from "./subAdmin/SubAdminSettings";
import CashierOrderPage from "./cashier/CashierOrderPage";
import CashierMyOrders from "./cashier/CashierMyOrders";

export const QsrRoutes = () => {
  const { auth } = useSelector(
    (state: any) => ({
      auth: state.auth.user
    }),
    shallowEqual
  );
  return (
    <IdleTimerLayout>
      <Routes>
        <Route>
          <Route index element={<SuperAdminDashboard />} />
          <Route path={QSR_ROUTES.qsrOrders} element={<SuperAdminOrderPage />} />
          <Route path={QSR_ROUTES.qsrMenu} element={<SuperAdminMenuPage />} />
          <Route path={QSR_ROUTES.qsrSettings} element={<SuperAdminSettings />} />
          <Route path={QSR_ROUTES.qsrReports} element={<SuperAdminReport />} />
          <Route path={QSR_ROUTES.qsrCashier} element={<SuperAdminCashiers />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </IdleTimerLayout>
  );
};

export const QsrSubAdminRoutes = () => {
  const { cashier } = useSelector(
    (state: any) => ({
      cashier: state.cashier.cashier,
    }),
    shallowEqual
  );
  return (
    <IdleTimerLayout>
      <Routes>
        <Route>
          <Route index element={<SubAdminReport />} />
          <Route path={QSR_SUBADMIN_ROUTES.qsrSubAdminMenu} element={<SubAdminMenuPage />} />
          <Route path={QSR_SUBADMIN_ROUTES.qsrSubAdminCashier} element={<SubAdminCashiers />} />
          <Route path={QSR_SUBADMIN_ROUTES.qsrSubAdminSettings} element={<QsrSubAdminSettings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </IdleTimerLayout>
  );
};

export const CashierRoutes = () => {
  const { cashier } = useSelector(
    (state: any) => ({
      cashier: state.cashier.cashier,
    }),
    shallowEqual
  );
  return (
    <IdleTimerLayout>
      <Routes>
        <Route>
          <Route index element={cashier ? <CashierOrderPage /> : <CashierLogin />} />

          <Route path={CASHIER_ROUTES.cashierOrders} element={<CashierMyOrders />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </IdleTimerLayout>
  );
};

