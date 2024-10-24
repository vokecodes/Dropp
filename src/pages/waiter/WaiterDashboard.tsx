// @ts-nocheck
import { useState, useEffect, Fragment } from "react";
import { useSelector, shallowEqual } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import OrderItem from "./OrderItem";
import { SERVER } from "../../config/axios";
import { RESTAURANT_ORDER_URL } from "../../_redux/urls";
import MenuOrderItem from "./MenuOrderItem";
import WaiterLogoutButton from "../../components/WaiterLogoutButton";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BASE_API_URL, {
  withCredentials: true,
});

const WaiterDashboard = () => {
  const { waiter } = useSelector(
    (state: any) => ({
      waiter: state.waiter.waiter,
    }),
    shallowEqual
  );
  const navigate = useNavigate();

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
  useEffect(() => {
    socket.on("newRestaurantOrder", () => {
      getTableOrders(1);
      setPlaySound(true);
    });

    return () => {
      socket.off("newRestaurantOrder");
    };
  }, []);

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
    Kitchen: 0,
    Cooking: 0,
    Ready: 0,
    Completed: 0,
  });

  useEffect(() => {
    setColumnCount({
      "New order": 0,
      Kitchen: 0,
      Cooking: 0,
      Ready: 0,
      Completed: 0,
    });

    tableOrders &&
      tableOrders?.length > 0 &&
      tableOrders?.map((item, i) => {
        if (item?.status === "pending") {
          setColumnCount((prevState) => ({
            ...prevState,
            "New order": prevState["New order"] + 1,
          }));
        }

        if (item?.status === "kitchen") {
          item?.order?.map((o: any) => {
            if (o?.status === "pending") {
              setColumnCount((prevState) => ({
                ...prevState,
                Kitchen: prevState["Kitchen"] + 1,
              }));
            }

            if (o?.status === "ready" || o?.status === "sent") {
              setColumnCount((prevState) => ({
                ...prevState,
                Ready: prevState["Ready"] + 1,
              }));
            }
          });
        }

        if (item?.status === "kitchen") {
          item?.order?.map((o: any) => {
            if (o?.status === "cooking") {
              tableOrders.filter((order) => {
                if (
                  order.order.some((orderItem) => orderItem.status === o.status)
                ) {
                  setColumnCount((prevState) => ({
                    ...prevState,
                    Cooking: prevState["Cooking"] + 1,
                  }));
                }
              });
            }
          });
        }

        if (item?.status === "completed") {
          setColumnCount((prevState) => ({
            ...prevState,
            Completed: prevState["Completed"] + 1,
          }));
        }
      });
  }, [tableOrders]);

  const [soundNotification, setSoundNotification] = useState(false);
  const [playSound, setPlaySound] = useState(false);

  const SoundNotification = ({ playSound }) => {
    const soundUrl = "/sounds/digital-clock-digital-alarm-buzzer.wav";

    useEffect(() => {
      let audio;
      if (soundNotification && playSound) {
        audio = new Audio(soundUrl);

        // Play the sound
        audio.play().catch((error) => {
          console.error("Error playing sound:", error);
        });

        // Ensure the sound plays for at least 5 seconds
        const duration = 5000; // 5 seconds in milliseconds
        const timer = setTimeout(() => {
          audio.pause(); // Pause the sound after 5 seconds
          audio.currentTime = 0; // Reset the sound to the beginning
        }, duration);

        // Clean up the timer and audio object
        return () => {
          clearTimeout(timer);
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
        };
      }
    }, [playSound]);

    return null; // No visible UI element needed
  };

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

          <div className="flex items-center justify-end">
            <div
              className="flex items-center gap-1 bg-[#EDECEC] px-3 py-2 rounded-full text-xs font_medium cursor-pointer"
              onClick={() => {
                if (soundNotification) {
                  setSoundNotification(false);
                } else {
                  setSoundNotification(true);
                  setPlaySound(true);
                }
              }}
            >
              {soundNotification ? (
                <>
                  <p className="text-base font_bold text-[#6D6D6D]">On</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#06C167"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <p className="text-base font_bold text-[#6D6D6D]">Off</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#292D32"
                    className="size-6"
                  >
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.57 16.476c-.223.082-.448.161-.674.238L7.319 4.137A6.75 6.75 0 0 1 18.75 9v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206Z" />
                    <path
                      fillRule="evenodd"
                      d="M5.25 9c0-.184.007-.366.022-.546l10.384 10.384a3.751 3.751 0 0 1-7.396-1.119 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
              <SoundNotification playSound={setPlaySound} />
            </div>
            <WaiterLogoutButton />
          </div>
        </div>
      </div>
      <div
        className="w-full h-screen px-3 lg:px-6 py-4"
        style={{ backgroundColor: "#F9F9F9" }}
      >
        <div className="px-2 flex justify-between items-center">
          <h3 className="font_bold text-2xl font-semibold">{waiter?.table}</h3>
          <Link
            to={`/restaurant/${waiter?.businessName}/${waiter?.table}`}
            target="_blank"
            className="inline-flex items-center justify-center primary_bg_color px-5 py-2 whitespace-nowrap text-lg text-white shadow-sm cursor-pointer rounded-xl font_medium"
          >
            Place Order
          </Link>
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
