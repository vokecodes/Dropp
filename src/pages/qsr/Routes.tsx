import { Routes, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import NotFound from "../../components/NotFound";
import IdleTimerLayout from "../../utils/idleTimerLayout";
import SuperAdminDashboard from "./superAdmin/SuperAdminDashboard";
import SuperAdminReport from "./superAdmin/SuperAdminReport";
import { QSR_ROUTES, CASHIER_ROUTES } from "../../routes/routes";
import SuperAdminCashiers from "./superAdmin/SuperAdminCashiers";
import SuperAdminSettings from "./superAdmin/SuperAdminSettings";
import SuperAdminOrderPage from "./superAdmin/SuperAdminOrderPage";
import SuperAdminMenuPage from "./superAdmin/SuperAdminMenuPage";
import CashierLogin from "./Auth/CashierLogin";

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
          <Route index element={(cashier && cashier?.isSubAdmin) ? <SuperAdminReport /> : (cashier && !cashier?.isSubAdmin) ? <SuperAdminOrderPage /> : <CashierLogin />} />

          {cashier && cashier?.isSubAdmin && (
            <>
              <Route path={CASHIER_ROUTES.cashierMenu} element={<SuperAdminMenuPage />} />
              <Route path={CASHIER_ROUTES.cashierCashier} element={<SuperAdminCashiers />} />
            </>
          )}
          
          {cashier && !cashier?.isSubAdmin && (
            <>
              <Route path={CASHIER_ROUTES.cashierMyOrders} element={<SuperAdminOrderPage />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </IdleTimerLayout>
  );
};

