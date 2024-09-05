import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Login'
import NotFound from '../../components/NotFound'
import DashboardPage from './Dashboard'
import { ADMIN_ROUTES, AUTH_ROUTES } from '../../routes/routes'
import AdminSettings from './AdminSettings'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={AUTH_ROUTES.adminLogin} element={<LoginPage />} />
      <Route index element={<DashboardPage />} />
      <Route path={ADMIN_ROUTES.adminSettings} element={<AdminSettings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AdminRoutes