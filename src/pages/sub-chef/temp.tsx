// @ts-nocheck
import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PageTitle from "../../components/PageTitle";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import Button from "../../components/Button";
import { useAppDispatch } from "../../redux/hooks";
import EmptyState from "../../components/EmptyState";
import { Link } from "react-router-dom";
import { SUB_CHEF_ROUTES } from "../../routes/routes";
import {
  getRestaurantDineInOrders,
  getSubChefRestaurantDineInOrders,
} from "../../_redux/order/orderAction";
import moment from "moment";
import RestaurantOrderItem from "../../components/RestaurantOrderItem";
import { SUB_CHEF_URL } from "../../_redux/urls";
import { SERVER } from "../../config/axios";

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
    dispatch(getSubChefRestaurantDineInOrders());
    dispatch(subChefGetTables());
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
          Delivery date & time
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
                <div className="w-full flex flex-row justify-start items-center">
                  <Link to={SUB_CHEF_ROUTES.linkSubChefTableManagement}>
                    <Button
                      title="Manage Table"
                      extraClasses="w-fit p-3 rounded-full"
                    />
                  </Link>
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
                        <div>
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
                                `${SUB_CHEF_URL}/restaurant/paid/${order?.id}`
                              )
                                .then(({ data }) => {
                                  dispatch(getSubChefRestaurantDineInOrders());
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
        </>
      </ChefDashboardLayout>
    </>
  );
};

export default ChefDineIn;
