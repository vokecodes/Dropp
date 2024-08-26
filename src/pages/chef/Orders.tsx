import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import OrderItem from "../../components/OrderItem";
import PageTitle from "../../components/PageTitle";
import TabMenu from "../../components/TabMenu";
import { SeOrderItemProps } from "../../utils/Interfaces";
import {
  getChefOrders,
  getChefSubscriptionOrders,
} from "../../_redux/order/orderAction";
import moment from "moment";
import SubscriptionOrderItem from "../../components/SubscriptionOrderItem";
import EmptyState from "../../components/EmptyState";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";

const ordersMenu = ["New Orders", "Completed Orders", "Subscription"];
const completedOrders: any = [];

const renderTableHeader = () => (
  <div className="flex justify-between lg:justify-start border-b pb-4 px-8">
    <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color">
      Food Name
    </p>
    <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color">
      Amount
    </p>
    <p className="`g:w-1/3 text-sm lg:text-base font_regular gray_color">
      Delivery Date & Time
    </p>
  </div>
);

const ChefOrders = () => {
  const dispatch = useAppDispatch();

  const { orders, auth, subscriptionOrders } = useSelector(
    (state: any) => ({
      orders: state.orders.orders,
      subscriptionOrders: state.orders.subscriptionOrders,
      auth: state.auth.user,
    }),
    shallowEqual
  );

  const [selectedOrder, setSelectedOrder] = useState("New Orders");

  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState<any>("");

  useEffect(() => {
    dispatch(getChefOrders());
    dispatch(getChefSubscriptionOrders());
  }, []);

  return (
    <>
      <ChefDashboardLayout>
        <div className="w-full px-6 py-4">
          <PageTitle title="My Orders" />
          <div className="my-10">
            <TabMenu
              containerExtraClasses="lg:w-2/3"
              ordersMenu={ordersMenu}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              textExtraClasses="w-1/2 text-base"
            />
          </div>
          <div className="lg:w-4/5 bg-white rounded-3xl py-8">
            {selectedOrder === ordersMenu[0] && (
              <>
                {renderTableHeader()}
                {orders &&
                orders?.filter((o: any) => o.status === "processed")?.length >
                  0 ? (
                  orders
                    ?.filter((o: any) => o.status === "processed")
                    ?.map((order: any, i: number) => (
                      <div>
                        <OrderItem
                          key={i}
                          id={order?.id}
                          orders={order.cartMenu}
                          date={moment(order?.deliveryDate).format(
                            "MMM DD YYYY"
                          )}
                          time={order?.deliveryTime}
                          showCustomer={selectedCustomerOrders === order?.id}
                          customerImage={order?.customer?.image}
                          customerName={`${order?.customer?.firstName} ${order?.customer?.lastName}`}
                          address={order?.deliveryAddress}
                          note={order?.note}
                          checkoutCode={order?.checkoutCode}
                          completed={order?.status}
                          onClickIconOpen={() =>
                            setSelectedCustomerOrders(order.id)
                          }
                          onClickIconClose={() => setSelectedCustomerOrders("")}
                          event={order?.event}
                        />
                      </div>
                    ))
                ) : (
                  <EmptyState title="No new order." />
                )}
              </>
            )}

            {selectedOrder === ordersMenu[1] && (
              <>
                {renderTableHeader()}

                {orders &&
                orders?.filter((o: any) => o.status === "completed")?.length >
                  0 ? (
                  orders
                    ?.filter((o: any) => o.status === "completed")
                    ?.map((order: any, i: number) => (
                      <div>
                        <OrderItem
                          key={i}
                          id={order?.id}
                          orders={order.cartMenu}
                          date={moment(order?.deliveryDate).format(
                            "MMM DD YYYY"
                          )}
                          time={order?.deliveryTime}
                          showCustomer={selectedCustomerOrders === order?.id}
                          customerImage={order?.customer?.image}
                          customerName={`${order?.customer?.firstName} ${order?.customer?.lastName}`}
                          address={order?.deliveryAddress}
                          note={order?.note}
                          completed={order?.status}
                          review={order?.review}
                          rating={order?.rating}
                          checkoutCode={order?.checkoutCode}
                          onClickIconOpen={() =>
                            setSelectedCustomerOrders(order.id)
                          }
                          onClickIconClose={() => setSelectedCustomerOrders("")}
                          event={order?.event}
                        />
                      </div>
                    ))
                ) : (
                  <EmptyState title="No order completed." />
                )}
              </>
            )}

            {selectedOrder === ordersMenu[2] && (
              <>
                {subscriptionOrders && subscriptionOrders?.length > 0 ? (
                  <div>
                    <div className="flex justify-between lg:justify-start border-b pb-4 px-8">
                      <p className="lg:w-[268px] text-sm lg:text-base font_regular gray_color">
                        Name & Address
                      </p>
                      <p className="lg:w-[226px] hidden lg:block text-sm lg:text-base font_regular gray_color">
                        Details
                      </p>
                      <p className="lg:w-[420px] text-sm lg:text-base font_regular gray_color">
                        Total subscription cost
                      </p>
                    </div>
                    {subscriptionOrders?.map((order: any, i: number) => (
                      <SubscriptionOrderItem
                        key={i}
                        theOrder={order}
                        id={order?._id}
                        orders={order.cartMenu}
                        date={moment(order?.deliveryDate).format("MMM DD YYYY")}
                        time={order?.deliveryTime}
                        showCustomer={selectedCustomerOrders === order?._id}
                        customerImage={order?.customer?.image}
                        customerName={`${order?.customer?.firstName} ${order?.customer?.lastName}`}
                        address={order.deliveryAddress}
                        meals={order.meals}
                        weeks={order.weeks}
                        startDate={order.startDate}
                        totalAmount={order?.totalAmount}
                        note={order?.note}
                        completed={order?.status}
                        filteredMenuDetails={order.filteredMenuDetails}
                        review={order?.review}
                        rating={order?.rating}
                        onClickIconOpen={() =>
                          setSelectedCustomerOrders(order._id)
                        }
                        onClickIconClose={() => setSelectedCustomerOrders("")}
                        event={order?.event}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState title="No subscription order." />
                )}
              </>
            )}
          </div>
        </div>
      </ChefDashboardLayout>
    </>
  );
};

export default ChefOrders;
