import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Hotjar from "@hotjar/browser";
import CustomerDashboardLayout from "../../components/CustomerDashboardLayout";
import CustomerOrderItem from "../../components/CustomerOrderItem";
import PageTitle from "../../components/PageTitle";
import TabMenu from "../../components/TabMenu";
import Button from "../../components/Button";
import { CUSTOMER_ORDERS_MENU } from "../../utils/Globals";
import { useAppDispatch } from "../../redux/hooks";
import { getProfileUserAccount } from "../../_redux/user/userAction";
import { getCustomerOrders } from "../../_redux/order/orderAction";
import { HOME_ROUTES } from "../../routes/routes";

const ordersMenu = [
  CUSTOMER_ORDERS_MENU.UPCOMING,
  CUSTOMER_ORDERS_MENU.PREVIOUS,
];

const CustomerOrders = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { orders, user } = useSelector(
    (state: any) => ({
      orders: state.orders.orders,
      user: state.user.user,
    }),
    shallowEqual
  );


  useEffect(() => {
    dispatch(getProfileUserAccount());
    dispatch(getCustomerOrders());
  }, []);

  useEffect(() => {
    Hotjar.identify(user?._id, {
      first_name: user?.firstName,
      last_name: user?.lastName,
    });
  }, [user]);

  const [selectedOrder, setSelectedOrder] = useState(
    CUSTOMER_ORDERS_MENU.UPCOMING
  );

  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState<any>("");

  const goToExplore = () => navigate(HOME_ROUTES.linkExplore);

  return (
    <CustomerDashboardLayout>
      <div className="w-full px-6 py-4">
        <PageTitle title="My Orders" />
        <div className="mt-10  w-full lg:w-5/6">
          <div className="my-5">
            <TabMenu
              containerExtraClasses="lg:w-2/3"
              ordersMenu={ordersMenu}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              textExtraClasses="w-1/2 text-base"
            />
          </div>
          <div className=" bg-white rounded-3xl py-8">
            <div className="flex justify-between lg:justify-start border-b pb-4 px-8">
              <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color">
                Food name
              </p>
              <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color">
                Amount
              </p>
              <p className="w-1/3 text-sm lg:text-base font_regular gray_color">
                Delivery date & time
              </p>
            </div>

            {selectedOrder === ordersMenu[0] && (
              <>
                {orders &&
                orders?.length > 0 &&
                orders?.filter(
                  (o: any) => o.status === "processed" && !o.review
                ).length > 0 ? (
                  orders
                    ?.filter((o: any) => o.status === "processed" && !o.review)
                    ?.map((order: any, i: number) => (
                      <CustomerOrderItem
                        key={i}
                        id={order?.id}
                        orders={order?.cartMenu || order?.orders}
                        discountAmount={order?.discountAmount}
                        date={moment(order?.deliveryDate).format("MMM DD YYYY")}
                        time={order?.deliveryTime}
                        showCustomer={selectedCustomerOrders === order?.id}
                        customerImage={order?.chef?.image}
                        customerName={`${order?.chef?.firstName} ${order?.chef?.lastName}`}
                        address={order?.deliveryAddress}
                        note={order?.note}
                        completed={order?.status === "completed"}
                        review={order?.review}
                        rating={order?.rating}
                        onClickIconOpen={() =>
                          setSelectedCustomerOrders(order.id)
                        }
                        onClickIconClose={() => setSelectedCustomerOrders("")}
                        event={order?.event}
                      />
                    ))
                ) : (
                  <div className="flex flex-col items-center">
                    <img src="/images/empty-order.svg" alt="empty" />
                    <h2 className="text-xl input_text mb-3">
                      You have no upcoming orders.
                    </h2>
                    <Button
                      title="Explore home chefs"
                      extraClasses="py-4"
                      onClick={goToExplore}
                    />
                  </div>
                )}
              </>
            )}

            {selectedOrder === ordersMenu[1] && (
              <>
                {orders &&
                orders?.length > 0 &&
                orders?.filter((o: any) => o.status === "completed").length >
                  0 ? (
                  orders
                    ?.filter((o: any) => o.status === "completed")
                    ?.map((order: any, i: number) => (
                      <CustomerOrderItem
                        key={i}
                        id={order?.id}
                        orders={order?.cartMenu}
                        discountAmount={order?.discountAmount}
                        date={moment(order?.deliveryDate).format("MMM DD YYYY")}
                        time={order?.deliveryTime}
                        showCustomer={selectedCustomerOrders === order?.id}
                        customerImage={order?.chef?.image}
                        customerName={`${order?.chef?.firstName} ${order?.chef?.lastName}`}
                        address={order?.deliveryAddress}
                        note={order?.note}
                        completed={order?.status === "completed"}
                        review={order?.review}
                        rating={order?.rating}
                        onClickIconOpen={() =>
                          setSelectedCustomerOrders(order.id)
                        }
                        onClickIconClose={() => setSelectedCustomerOrders("")}
                        event={order?.event}
                      />
                    ))
                ) : (
                  <div className="flex flex-col items-center">
                    <img src="/images/empty-order.svg" alt="empty" />
                    <h2 className="text-xl input_text mb-3">
                      You have no previous orders.
                    </h2>
                    <Button
                      title="Explore home chefs"
                      extraClasses="py-4"
                      onClick={goToExplore}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};

export default CustomerOrders;
