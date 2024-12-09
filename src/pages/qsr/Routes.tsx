import { Routes, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import NotFound from "../../components/NotFound";
import IdleTimerLayout from "../../utils/idleTimerLayout";
import SuperAdminDashboard from "./superAdmin/SuperAdminDashboard";
import SuperAdminReport from "./superAdmin/SuperAdminReport";
import { CHEF_ROUTES, QSR_ROUTES } from "../../routes/routes";
import SuperAdminCashiers from "./superAdmin/SuperAdminCashiers";
import SuperAdminSettings from "./superAdmin/SuperAdminSettings";
import SuperAdminOrderPage from "./superAdmin/SuperAdminOrderPage";
import SuperAdminMenuPage from "./superAdmin/SuperAdminMenuPage";

const QsrRoutes = () => {
  const { auth, cashier } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
      cashier: state.cashier.cashier,
    }),
    shallowEqual
  );
  return (
    <IdleTimerLayout>
      <Routes>
        <Route>
          {cashier && cashier?.isSubAdmin ? (
            <>
            </>
          ) : cashier && !cashier?.isSubAdmin ? (
            <>
            </>
          ) : (
            <>
              <Route index element={<SuperAdminDashboard />} />
              <Route path={QSR_ROUTES.qsrOrders} element={<SuperAdminOrderPage />} />
              <Route path={QSR_ROUTES.qsrMenu} element={<SuperAdminMenuPage />} />
              <Route path={QSR_ROUTES.qsrSettings} element={<SuperAdminSettings />} />
              <Route path={QSR_ROUTES.qsrReports} element={<SuperAdminReport />} />
              <Route path={QSR_ROUTES.qsrCashier} element={<SuperAdminCashiers />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </IdleTimerLayout>
  );
};

export default QsrRoutes;
