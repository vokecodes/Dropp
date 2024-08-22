import React, { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Chat from "../../components/Chat";
import CustomerDashboardLayout from "../../components/CustomerDashboardLayout";
import { useAppDispatch } from "../../redux/hooks";
import { getCustomerOrders } from "../../_redux/order/orderAction";
import { getCustomerSubscription } from "../../_redux/subscription/subscriptionAction";

const CustomerMessage = () => {
  const dispatch = useAppDispatch();

  const { orders, subscription } = useSelector(
    (state: any) => ({
      orders: state.orders.orders,
      subscription: state.subscription.subscription,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getCustomerOrders);
    dispatch(getCustomerSubscription);
  }, []);

  return (
    <CustomerDashboardLayout>
      <Chat
        orders={orders}
        // subscriptionOrders={[subscription]}
      />
    </CustomerDashboardLayout>
  );
};

export default CustomerMessage;
