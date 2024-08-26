import { Routes, Route } from "react-router-dom";
import CompanyDashboard from "./Dashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import CompanySettings from "./Settings";
import { COMPANY_ROUTES } from "../../routes/routes";
// import CompanyOrders from "./Orders";
import CompanyWallet from "./Wallet";
// import CompanyMessage from "./CompanyMessage";
import NotFound from "../../components/NotFound";

const CompanyRoutes = () => (
  <Routes>
    <Route>
      <Route index element={<CompanyDashboard />} />
      <Route path={COMPANY_ROUTES.companyEmployees} element={<EmployeeDashboard />} />
      {/* <Route path={CHEF_ROUTES.chefOrders} element={<CompanyOrders />} /> */}
      <Route path={COMPANY_ROUTES.companySettings} element={<CompanySettings />} />
      <Route path={COMPANY_ROUTES.companyWallet} element={<CompanyWallet />} />
      {/* <Route path={CHEF_ROUTES.chefChat} element={<CompanyMessage />} /> */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default CompanyRoutes;
