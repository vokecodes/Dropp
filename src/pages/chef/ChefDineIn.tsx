// @ts-nocheck
import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PageTitle from "../../components/PageTitle";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import Button from "../../components/Button";
import { useAppDispatch } from "../../redux/hooks";
import EmptyState from "../../components/EmptyState";
import { Link } from "react-router-dom";
import { CHEF_ROUTES } from "../../routes/routes";
import { getRestaurantDineInOrders } from "../../_redux/order/orderAction";
import moment from "moment";
import RestaurantOrderItem from "../../components/RestaurantOrderItem";
import { RESTAURANT_ORDER_URL } from "../../_redux/urls";
import { SERVER } from "../../config/axios";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";

const ChefDineIn = () => {
  const dispatch = useAppDispatch();

  const { table, restaurantOrders } = useSelector(
    (state: any) => ({
      table: state.table.table,
      restaurantOrders: state.orders.restaurantOrders,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getRestaurantDineInOrders());
  }, []);

  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState<any>("");

  const [category, setCategory] = useState("All");

  const [paymentLoading, setPaymentLoading] = useState(null);

  const renderTableHeader = () => (
    <div className="w-full h-fit">
      <div className="hidden w-full md:flex flex-row justify-between lg:justify-start items-start border-b pb-4 px-8 lg:gap-x-5">
        <p className="lg:w-1/6 text-start text-sm lg:text-base font_regular gray_color">
          #
        </p>
        <p className="lg:w-2/4 text-start text-sm lg:text-base font_regular gray_color">
          Order
        </p>
        <p className="lg:w-1/4 text-start text-sm lg:text-base font_regular gray_color">
          Delivery Date & Time
        </p>
        <p className="lg:w-1/4 text-start text-sm lg:text-base font_regular gray_color">
          Amount
        </p>
        <p className="lg:w-1/4 text-start text-sm lg:text-base font_regular gray_color">
          Status
        </p>
      </div>

      <div className="w-full block md:hidden">
        <p className="w-full text-center text-2xl font_bold gray_color">
          Orders
        </p>
      </div>
    </div>
  );

  const [refundModal, setRefundModal] = useState(false);
  const openRefundModal = () => {
    setRefundModal(true);
  };

  const closeRefundModal = () => {
    setRefundModal(false);
  };

  return (
    <>
      <ChefDashboardLayout>
        <>
          <div className="w-full px-6 py-4">
            <div className="lg:flex flex-row w-full justify-between">
              <PageTitle
                title="Dine-In Orders"
                extraClasses="text-center lg:text-start mb-3 lg:mb-0"
              />
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
              <div className="flex flex-col items-center justify-start gap-y-4">
                <div className="w-full flex flex-col lg:flex-row justify-between items-center">
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
                    <Link to={CHEF_ROUTES.linkChefSectionManagement}>
                      <Button
                        title="Manage Sections"
                        extraClasses="p-3 rounded-full"
                      />
                    </Link>
                    <Link to={CHEF_ROUTES.linkChefTableManagement}>
                      <Button
                        title="Manage Table"
                        extraClasses="p-3 rounded-full"
                      />
                    </Link>
                  </div>
                  <Button
                    title="Request Refund"
                    extraClasses="mt-2 lg:mt-0 p-3 rounded-full"
                    onClick={openRefundModal}
                  />
                </div>
                <div className="w-full h-fit py-1">
                  {table?.length > 0 && (
                    <div
                      className="flex flex-row items-center justify-start h-fit w-full px-2 pb-1 rounded my-1 gap-x-3 overflow-x-scroll"
                      style={{ maxHeight: "250px" }}
                    >
                      <div
                        className={`flex flex-row justify-between items-center w-fit h-fit py-2 px-3 my-1 gap-x-2 rounded-full shrink-0 cursor-pointer ${
                          category === "All"
                            ? "primary_bg_color"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        onClick={() => setCategory("All")}
                      >
                        <div className="flex flex-row justify-between items-center">
                          <div className="ml-1 flex flex-row justify-between items-center">
                            <p
                              className={`text-sm font-bold font_regular ${
                                category === "All" ? "text-white" : "text-black"
                              }`}
                            >
                              All
                            </p>
                          </div>
                        </div>
                        {/* <p className="flex flex-row items-center justify-center rounded-full px-2 py-1 bg-white">
                          <span className="primary_txt_color font_regular text-xs font-semibold">
                            0
                          </span>
                        </p> */}
                      </div>
                      {/* {table.map((cat: any, i: number) => (
                        <div
                          key={cat._id}
                          className={`flex flex-row justify-between items-center w-fit h-fit py-2 px-3 my-1 gap-x-2 rounded-full shrink-0 cursor-pointer ${
                            category === `${cat?.table}`
                              ? "primary_bg_color"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                          onClick={() => setCategory(`${cat?.table}`)}
                        >
                          <div className="flex flex-row justify-between items-center">
                            <div className="ml-1 flex flex-row justify-between items-center">
                              <p
                                className={`text-sm font-bold font_regular ${
                                  category === cat?.table
                                    ? "text-white"
                                    : "text-black"
                                }`}
                              >
                                {`${cat?.table}`}
                              </p>
                            </div>
                          </div>
                          <p className="flex flex-row items-center justify-center rounded-full px-2 py-1 bg-white">
                            <span className="primary_txt_color font_regular text-xs font-semibold">
                              {ordersTotal[cat?.table]
                                ? ordersTotal[cat?.table]
                                : 0}
                            </span>
                          </p>
                        </div>
                      ))} */}
                    </div>
                  )}
                </div>

                <div className="w-full h-full">
                  <div className="lg:w-full bg-white rounded-3xl py-8">
                    {renderTableHeader()}
                    {restaurantOrders && restaurantOrders?.length > 0 ? (
                      restaurantOrders?.map((order: any, i: number) => (
                        <div key={i}>
                          <RestaurantOrderItem
                            key={i}
                            id={order?.id}
                            cartMenu={order.cartMenu}
                            orders={order.order}
                            date={moment(order?.createdAt).format("ll")}
                            time={moment(order?.createdAt).format("LT")}
                            showCustomer={selectedCustomerOrders === order?.id}
                            customerName={`${order?.name}`}
                            customerEmail={`${order?.email}`}
                            checkoutCode={order?.checkoutCode}
                            completed={order?.status}
                            paid={order?.paid}
                            gift={order?.gift}
                            onClickIconOpen={() =>
                              setSelectedCustomerOrders(order.id)
                            }
                            onClickIconClose={() =>
                              setSelectedCustomerOrders("")
                            }
                            paymentLoading={paymentLoading === order?.id}
                            markAsPaid={() => {
                              setPaymentLoading(order?.id);
                              SERVER.patch(
                                `${RESTAURANT_ORDER_URL}/paid/${order?.id}`
                              )
                                .then(({ data }) => {
                                  dispatch(getRestaurantDineInOrders());
                                })
                                .finally(() => setPaymentLoading(null));
                            }}
                            markAsGift={() => {
                              setPaymentLoading(order?.id);
                              SERVER.patch(
                                `${RESTAURANT_ORDER_URL}/gift/${order?.id}`
                              )
                                .then(({ data }) => {
                                  dispatch(getRestaurantDineInOrders());
                                })
                                .finally(() => setPaymentLoading(null));
                            }}
                            event={order?.event}
                            restaurantOrder={true}
                          />
                        </div>
                      ))
                    ) : (
                      <EmptyState title="No new order." />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal
            open={refundModal}
            onClose={closeRefundModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <div className="flex">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Request for refund
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeRefundModal}
                />
              </div>

              <div className="mt-3 w-full h-5/6 relative">
                <iframe
                  className="mx-auto w-full"
                  src="https://docs.google.com/forms/d/e/1FAIpQLScEVw4hEZ3xPw6WO3TBRHJl52xJNlI5MEFhvBMQnZPk83_DZw/viewform?embedded=true"
                  width="640"
                  height="909"
                  frameborder="0"
                  marginheight="0"
                  marginwidth="0"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </Modal>
        </>
      </ChefDashboardLayout>
    </>
  );
};

export default ChefDineIn;
