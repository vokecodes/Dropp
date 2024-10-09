// @ts-nocheck
import { useState, useEffect, Fragment } from "react";
import { useSelector, shallowEqual } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import OrderItem from "./OrderItem";
import { SERVER } from "../../config/axios";
import { RESTAURANT_ORDER_URL } from "../../_redux/urls";
import MenuOrderItem from "./MenuOrderItem";
import WaiterLogoutButton from "../../components/WaiterLogoutButton";
// import io from "socket.io-client";

// const socket = io(import.meta.env.VITE_BASE_API_URL, {
//   withCredentials: true,
// });

const WaiterDashboard = () => {
  const { waiter } = useSelector(
    (state: any) => ({
      waiter: state.waiter.waiter,
    }),
    shallowEqual
  );

  const [tableOrders, setTableOrders] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Flag to track if there are more items to load
  const [page, setPage] = useState(1); // Page number for pagination

  const getTableOrders = async (currentPage = 1) => {
    SERVER.get(
      `${RESTAURANT_ORDER_URL}/${waiter?.restaurant}/${waiter?.table}?page=${currentPage}`
    )
      .then(({ data }) => {
        if (currentPage === 1) {
          setTableOrders(data.data);
        } else {
          setTableOrders((prevTransactions: any) => [
            ...prevTransactions,
            ...data.data,
          ]);
        }
        setPage(currentPage + 1);
        setHasMore(
          data.pagination.totalPages > 0 &&
            data.pagination.currentPage !== data.pagination.totalPages
        );
      })
      .catch((err) => {});
  };

  // Listen for new orders from the server
  // useEffect(() => {
  //   socket.on("newRestaurantOrder", () => {
  //     getTableOrders(1);
  //   });

  //   return () => {
  //     socket.off("newRestaurantOrder");
  //   };
  // }, []);

  const CATEGORIES = [
    {
      label: "New order",
      value: "pending",
    },
    { label: "Kitchen", value: "pending" },
    { label: "Cooking", value: "cooking" },
    { label: "Ready", value: "ready" },
    { label: "Completed", value: "completed" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedReadyOrder, setSelectedReadyOrder] = useState();

  const [ordersModal, setOrdersModal] = useState(false);
  const openOrdersModal = (order) => {
    setSelectedOrder(order);
    setOrdersModal(true);
  };
  const closeOrdersModal = () => {
    setSelectedOrder();
    setOrdersModal(false);
  };

  useEffect(() => {
    getTableOrders(page);
  }, []);


  const [columnCount, setColumnCount] = useState({
    "New order": 0,
    "Kitchen": 0,
    "Cooking": 0,
    "Ready": 0,
    "Completed": 0,
  });
  
  useEffect(() => {
    setColumnCount({
      "New order": 0,
      "Kitchen": 0,
      "Cooking": 0,
      "Ready": 0,
      "Completed": 0,
    });
    
    tableOrders && tableOrders?.length > 0 && tableOrders?.map((item, i) => {

      if(item?.status === "pending"){

        setColumnCount(prevState => ({
          ...prevState,
          "New order": prevState["New order"] + 1
        }));

      }
      
      if(item?.status === "kitchen"){

        item?.order?.map((o: any) => {
          if(o?.status === "pending"){
            setColumnCount(prevState => ({
              ...prevState,
              "Kitchen": prevState["Kitchen"] + 1
            }));
          }

          if(o?.status === "ready" || o?.status === "sent"){
            setColumnCount(prevState => ({
              ...prevState,
              "Ready": prevState["Ready"] + 1
            }));
          }
        });

      } 
      
      if(item?.status === "kitchen"){
        item?.order?.map((o: any) => {
          if(o?.status === "cooking"){
            tableOrders.filter((order) => {
              if(order.order.some((orderItem) => orderItem.status === o.status)){
                setColumnCount(prevState => ({
                  ...prevState,
                  "Cooking": prevState["Cooking"] + 1
                }));
              }
            })
          }
        })
      }
      
      if(item?.status === "completed"){
          setColumnCount(prevState => ({
            ...prevState,
            "Completed": prevState["Completed"] + 1
        }));
      }

    });
  }, [tableOrders])
      
  
  return (
    <>
      <div className="lg:mx-5 px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <>
              <span className="sr-only">Homemade</span>
              <img className="h-6 w-auto" src="/images/logo.svg" alt="" />
            </>
          </div>

          <WaiterLogoutButton />
        </div>
      </div>
      <div
        className="w-full h-screen px-3 lg:px-6 py-4"
        style={{ backgroundColor: "#F9F9F9" }}
      >
        <div className="px-2">
          <h3 className="font_bold text-2xl font-semibold">{waiter?.table}</h3>
        </div>
        <div className="w-full h-fit py-1">
          {/* CATEGORIES */}
          <div className="w-full h-fit py-1">
            {CATEGORIES.length > 0 && (
              <div
                className="flex flex-row h-fit w-full px-2 pb-1 rounded my-1 gap-x-3 overflow-x-scroll"
                style={{ maxHeight: "250px" }}
              >
                {CATEGORIES.map((cat: any, i: number) => (
                  <div
                    key={i}
                    className={`flex flex-row justify-between bg-white items-center w-fit h-fit py-2 px-4 my-1 gap-x-1 rounded-full shrink-0 cursor-pointer ${
                      selectedCategory?.label === cat?.label
                        ? "primary_bg_color text-white"
                        : "bg_sec_gray_color text-gray-600"
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <div className="flex flex-row justify-between items-center">
                      {/* {cat.icons} */}
                      <div className="ml-1 flex flex-row justify-between items-center">
                        <p className="text-xs font-bold font_regular">
                          {`${cat?.label}`}
                        </p>
                        <div
                          className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center ${
                            selectedCategory?.label === cat?.label
                              ? "bg-black"
                              : "bg-white"
                          }`}
                        >
                          <p
                            className={`text-xs font_medium ${
                              selectedCategory?.label === cat?.label
                                ? "text-white"
                                : "primary_txt_color"
                            }`}
                          >
                            {columnCount[cat?.label]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl h-full w-full lg:p-5 mt-3 flex flex-col lg:flex-row justify-start items-center lg:items-start">
          <div className="w-full lg:w-8/12 h-full flex flex-col gap-x-5">
            <InfiniteScroll
              dataLength={tableOrders.length} // This is important to track the length of your data array
              next={() => {
                if (hasMore) {
                  getTableOrders(page);
                }
              }} // Function to call when reaching the end of the list
              hasMore={hasMore} // Flag to indicate if there are more items to load
              // loader={
              //   <p className="mt-5 text-center font_medium">Loading...</p>
              // } // Loader component while fetching more data
              endMessage={
                <p className="mt-5 text-center font_medium">
                  Yay, you've seen it all.
                </p>
              } // Message when all items have been loaded
            >

              {/* NEW ORDERS */}
              <div className="flex flex-col mt-2">
                {selectedCategory.label === "New order" && (
                  <>
                    {tableOrders &&
                      tableOrders?.length > 0 &&
                      tableOrders
                        .filter((t) => t.status === selectedCategory.value)
                        .map((tableOrder: any, i: number) => (
                          <OrderItem
                            key={i}
                            order={tableOrder}
                            selectedOrder={selectedOrder}
                            ordersModal={ordersModal}
                            openOrdersModal={() => openOrdersModal(tableOrder)}
                            closeOrdersModal={() => closeOrdersModal()}
                            getTableOrders={getTableOrders}
                            selectedCategory={selectedCategory?.value}
                          />
                        ))}
                  </>
                )}

                {selectedCategory.label === "Kitchen" &&
                  tableOrders &&
                  tableOrders?.length > 0 &&
                  tableOrders
                    ?.filter((t) => t.status === "kitchen")
                    ?.map((tableOrder: any, i: number) => {
                      const filteredOrder = tableOrder?.order?.filter(
                        (o: any) => o?.status === "pending"
                      );
                      return (
                        <>
                          {filteredOrder?.length > 0 && (
                            <MenuOrderItem
                              key={i}
                              order={tableOrder}
                              orderStatus="pending"
                              orderLength={filteredOrder.length}
                              selectedOrder={selectedOrder}
                              ordersModal={ordersModal}
                              openOrdersModal={() =>
                                openOrdersModal(tableOrder)
                              }
                              closeOrdersModal={() => closeOrdersModal()}
                              getTableOrders={getTableOrders}
                              selectedCategory={selectedCategory?.value}
                            />
                          )}
                        </>
                      );
                    })}

                {selectedCategory.label === "Cooking" &&
                  tableOrders &&
                  tableOrders?.length > 0 &&
                  tableOrders
                    ?.filter((t) => t.status === "kitchen")
                    ?.map((tableOrder: any, i: number) => {
                      const filteredOrder = tableOrder?.order?.filter(
                        (o: any) => o?.status === "cooking"
                      );

                      // Extract statuses from array2
                      const statusesToFilter = filteredOrder.map(
                        (item) => item.status
                      );

                      // Filter array1 based on statuses from array2
                      const filteredArray2 = tableOrders.filter((order) => {
                        return order.order.some((orderItem) =>
                          statusesToFilter.includes(orderItem.status)
                        );
                      });

                      return (
                        <Fragment key={i}>
                          {filteredArray2?.map((order: any, i) => (
                            <MenuOrderItem
                              key={i}
                              orderStatus="cooking"
                              order={order}
                              orderLength={filteredOrder.length}
                              selectedOrder={selectedOrder}
                              ordersModal={ordersModal}
                              selectedCategory={selectedCategory?.value}
                              openOrdersModal={() => openOrdersModal(order)}
                              closeOrdersModal={() => closeOrdersModal()}
                              getTableOrders={getTableOrders}
                            />
                          ))}
                        </Fragment>
                      );
                    })}

                {/* {selectedCategory.label === "Ready" &&
                tableOrders &&
                tableOrders.length > 0 &&
                tableOrders
                  .filter((t) => t.status === "kitchen")
                  .map((tableOrder: any, i: number) => {
                    const filteredOrder = tableOrder.order.filter(
                      (o: any) => o?.status === "ready" || o?.status === "sent"
                    );

                    return (
                      <Fragment key={i}>
                        {filteredOrder.map((order: any, j: number) => (
                          <MenuOrderItem
                            key={`${i}-${j}`}
                            orderStatus="ready"
                            secondOrderStatus="sent"
                            order={order}
                            orderLength={filteredOrder.length}
                            selectedOrder={selectedOrder}
                            ordersModal={ordersModal}
                            selectedCategory={selectedCategory?.value}
                            openOrdersModal={() => openOrdersModal(order)}
                            closeOrdersModal={() => closeOrdersModal()}
                            getTableOrders={getTableOrders}
                          />
                        ))}
                      </Fragment>
                    );
                  })} */}

                {selectedCategory.label === "Ready" &&
                  tableOrders &&
                  tableOrders?.length > 0 &&
                  tableOrders
                    ?.filter((t) => t.status === "kitchen")
                    ?.map((tableOrder: any, i: number) => {
                      const filteredOrder = tableOrder?.order?.filter(
                        (o: any) =>
                          o?.status === "ready" || o?.status === "sent"
                      );

                      // Extract statuses from array2
                      const statusesToFilter = filteredOrder.map(
                        (item) => item.status
                      );

                      // Filter array1 based on statuses from array2
                      const filteredArray2 = tableOrders.filter((order) => {
                        return order.order.some((orderItem) =>
                          statusesToFilter.includes(orderItem.status)
                        );
                      });

                      return (
                        <Fragment key={i}>
                          {filteredArray2?.map((order: any, i) => (
                            <MenuOrderItem
                              key={i}
                              orderStatus="ready"
                              secondOrderStatus="sent"
                              thirdOrderStatus="declined"
                              order={order}
                              orderLength={filteredOrder.length}
                              selectedOrder={selectedReadyOrder}
                              ordersModal={ordersModal}
                              selectedCategory={selectedCategory?.value}
                              openOrdersModal={() => openOrdersModal(order)}
                              closeOrdersModal={() => closeOrdersModal()}
                              getTableOrders={getTableOrders}
                            />
                          ))}
                        </Fragment>
                      );
                    })}

                {selectedCategory.label === "Completed" &&
                  tableOrders &&
                  tableOrders?.length > 0 &&
                  tableOrders
                    .filter((t) => t.status === "completed")
                    .map((tableOrder: any, i: number) => (
                      <OrderItem
                        key={i}
                        order={tableOrder}
                        selectedOrder={selectedOrder}
                        ordersModal={ordersModal}
                        openOrdersModal={() => openOrdersModal(tableOrder)}
                        closeOrdersModal={() => closeOrdersModal()}
                        getTableOrders={getTableOrders}
                        selectedCategory={selectedCategory?.value}
                      />
                    ))}

                {/* {selectedCategory.label === "Completed" &&
                tableOrders &&
                tableOrders?.length > 0 &&
                tableOrders
                  ?.filter((t) => t.status === "completed")
                  ?.map((tableOrder: any, i: number) => {
                    const filteredOrder = tableOrder?.order?.filter(
                      (o: any) => o?.status === "completed"
                    );

                    // Extract statuses from array2
                    const statusesToFilter = filteredOrder.map(
                      (item) => item.status
                    );

                    // Filter array1 based on statuses from array2
                    const filteredArray2 = tableOrders.filter((order) => {
                      return order.order.some((orderItem) =>
                        statusesToFilter.includes(orderItem.status)
                      );
                    });

                    return (
                      <Fragment key={i}>
                        {filteredArray2?.map((order: any, i) => (
                          <MenuOrderItem
                            key={i}
                            orderStatus="completed"
                            order={order}
                            orderLength={filteredOrder.length}
                            selectedOrder={selectedOrder}
                            ordersModal={ordersModal}
                            selectedCategory={selectedCategory?.value}
                            openOrdersModal={() => openOrdersModal(order)}
                            closeOrdersModal={() => closeOrdersModal()}
                            getTableOrders={getTableOrders}
                          />
                        ))}
                      </Fragment>
                    );
                  })} */}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaiterDashboard;
