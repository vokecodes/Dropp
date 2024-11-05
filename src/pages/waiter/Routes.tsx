import { Routes, Route } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import NotFound from "../../components/NotFound";
import WaiterDashboard from "./WaiterDashboard";
import WaiterLogin from "./WaiterLogin";
import { useState } from "react";
import SuperWaiterDashboard from "./SuperWaiterDashboard";

const WaiterRoutes = () => {
  const { waiter, superWaiter } = useSelector(
    (state: any) => ({
      waiter: state.waiter.waiter,
      superWaiter: state.waiter.superWaiter,
    }),
    shallowEqual
  );

  return (
    <Routes>
      <Route index element={waiter ? <WaiterDashboard /> : <WaiterLogin />} />
      <Route path="/super-waiter" element={superWaiter ? <SuperWaiterDashboard /> : <WaiterLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default WaiterRoutes;
