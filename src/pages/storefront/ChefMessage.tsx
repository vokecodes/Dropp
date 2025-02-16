import React, { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Chat from "../../components/Chat";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import { useAppDispatch } from "../../redux/hooks";
import {
  getChefOrders,
  getChefSubscriptionOrders,
} from "../../_redux/order/orderAction";

const ChefMessage = () => {
  const dispatch = useAppDispatch();

  const { orders, subscriptionOrders } = useSelector(
    (state: any) => ({
      orders: state.orders.orders,
      subscriptionOrders: state.orders.subscriptionOrders,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getChefOrders());
    dispatch(getChefSubscriptionOrders());
  }, []);

  return (
    <ChefDashboardLayout>
      <Chat
        orders={orders?.filter((o: any) => o.status !== "completed")}
        subscriptionOrders={subscriptionOrders}
      />
    </ChefDashboardLayout>
  );
};

export default ChefMessage;
