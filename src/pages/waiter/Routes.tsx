import { Routes, Route } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import NotFound from "../../components/NotFound";
import WaiterDashboard from "./WaiterDashboard";
import WaiterLogin from "./WaiterLogin";

const WaiterRoutes = () => {
  const { waiter } = useSelector(
    (state: any) => ({
      waiter: state.waiter.waiter,
    }),
    shallowEqual
  );

  return (
    <Routes>
      <Route index element={waiter ? <WaiterDashboard /> : <WaiterLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default WaiterRoutes;
