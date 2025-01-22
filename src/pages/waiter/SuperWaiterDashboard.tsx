import { useState, useEffect, Fragment, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import OrderItem from "./OrderItem";
import { SERVER } from "../../config/axios";
import { RESTAURANT_ORDER_URL, RESTAURANT_TABLE_URL } from "../../_redux/urls";
import MenuOrderItem from "./MenuOrderItem";
import WaiterLogoutButton from "../../components/WaiterLogoutButton";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { getTables } from "../../_redux/table/tableAction";
import { useAppDispatch } from "../../redux/hooks";
import { ClickAwayListener } from "@mui/material";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import io from "socket.io-client";
import { SoundNotification } from "../../components/SoundNotification";
import { getABusinessByName } from "../../_redux/business/businessCrud";
import InfinityScroll from "../../components/InfinityScroll";

const socket = io(import.meta.env.VITE_BASE_URL, {
  withCredentials: true,
});

const SuperWaiterDashboard = () => {
  const { superWaiter } = useSelector(
    (state: any) => ({
      superWaiter: state.waiter.superWaiter,
    }),
    shallowEqual
  );

  console.log("superWaiter", superWaiter?.businessName);

  const [table, setTable] = useState([]);
  const [chef, setChef] = useState<any>(null);

  const getChef = async () => {
    try {
      const { data } = await getABusinessByName(superWaiter?.businessName);

      if (data) {
        setChef(data.data);
      }
    } catch (error) {}
  };

  const loading = useRef(false);
  const [hasMore, setHasMore] = useState<any>({});
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState<any>({});
  const [columnCount, setColumnCount] = useState<any>({});

  const getRestaurantOrders = async (currentPage = page, noSkip = true) => {
    if (loading.current) return;
    loading.current = true;

    try {
      const { data } = await SERVER.get(
        `${RESTAURANT_ORDER_URL}/waiter/${superWaiter?.restaurant}/${superWaiter?._id}?page=${currentPage}&waiterType=superWaiter`
      );

      const totalPages = data?.pagination?.totalPages || 1;

      if (currentPage === 1) {
        setColumns({ ...data?.data });
      } else {
        setColumns((prevColumns: any) => {
          const updatedColumns = { ...prevColumns };

          Object.keys(data?.data || {}).forEach((tableId) => {
            if (!updatedColumns[tableId]) {
              updatedColumns[tableId] = {};
            }

            // Loop through statuses for each table
            Object.keys(data?.data[tableId] || {}).forEach((status) => {
              if (!updatedColumns[tableId][status]) {
                updatedColumns[tableId][status] = [];
              }

              const existingIds = new Set(
                updatedColumns[tableId][status].map((item: any) => item.id)
              );

              // Filter new items to avoid duplicates
              const newItems = data?.data[tableId][status].filter(
                (item: any) => !existingIds.has(item.id)
              );

              updatedColumns[tableId][status] = [
                ...updatedColumns[tableId][status],
                ...newItems,
              ];
            });
          });

          return updatedColumns;
        });
      }

      setColumnCount((prev) => {
        const newCount = { ...prev };

        Object.keys(data?.columnCount || {}).forEach((tableId) => {
          if (!newCount[tableId]) {
            newCount[tableId] = {};
          }

          Object.keys(data?.columnCount[tableId] || {}).forEach((status) => {
            newCount[tableId][status] =
              data.columnCount[tableId][status]?.totalCount || 0;
          });
        });

        return newCount;
      });

      setHasMore((prev) => {
        const newHasMore = { ...prev };

        Object.keys(data?.columnCount || {}).forEach((tableId) => {
          if (!newHasMore[tableId]) {
            newHasMore[tableId] = {};
          }

          Object.keys(data?.columnCount[tableId] || {}).forEach((status) => {
            const totalCount =
              data.columnCount[tableId][status]?.totalCount || 0;
            const currentCount =
              (columns[tableId]?.[status]?.length || 0) +
              (data?.data[tableId]?.[status]?.length || 0);
            newHasMore[tableId][status] = currentCount < totalCount;
          });
        });

        return newHasMore;
      });

      if (noSkip) {
        setPage((prevPage) => {
          return prevPage < totalPages ? prevPage + 1 : prevPage;
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      loading.current = false;
    }
  };

  const [soundNotification, setSoundNotification] = useState(() => {
    return JSON.parse(localStorage.getItem("playSound")) || false;
  });
  const [playSound, setPlaySound] = useState(false);

  const receiveNotification = () => {
    setPlaySound(true);

    setTimeout(() => {
      setPlaySound(false);
    }, 3000);
  };

  // Listen for new orders from the server
  useEffect(() => {
    const handleNewOrder = () => {
      getRestaurantOrders(1);
      receiveNotification();
    };

    socket.on("newRestaurantOrder", handleNewOrder);
    socket.on("newReadyOrder", handleNewOrder);
    socket.on("updatedRestaurantOrder", handleNewOrder);
    socket.on("updatedOrder", () => {
      getRestaurantOrders(1);
    });

    return () => {
      socket.off("newRestaurantOrder", handleNewOrder);
      socket.off("newReadyOrder", handleNewOrder);
      socket.off("updatedRestaurantOrder", handleNewOrder);
      socket.off("updatedOrder", () => {
        getRestaurantOrders(1);
      });
    };
  }, []);

  const CATEGORIES = [
    { label: "New order", value: "pending" },
    { label: "Kitchen", value: "kitchen" },
    { label: "Cooking", value: "cooking" },
    { label: "Ready", value: "ready" },
    { label: "Completed", value: "completed" },
  ];

  const [tablesMap, setTablesMap] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const [selectedTable, setSelectedTable] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedReadyOrder, setSelectedReadyOrder] = useState();

  const [ordersModal, setOrdersModal] = useState(false);
  const openOrdersModal = (order) => {
    setSelectedOrder(order);
    setOrdersModal(true);
  };
  const closeOrdersModal = () => {
    setSelectedOrder("");
    setOrdersModal(false);
  };

  const [openTableLinks, setOpenTableLinks] = useState(false);

  const handleClickAway = () => setOpenTableLinks(false);

  useEffect(() => {
    getRestaurantOrders(1);
    getChef();
  }, []);

  const loadMore = () => {
    if (loading.current) return;
    getRestaurantOrders();
  };

  const sortByCreatedAt = (arr: { createdAt: string }[]) => {
    return arr.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  };

  const addDisplayIds = (orders: any[]) => {
    const suffixes: { [key: string]: number } = {}; // Track suffixes for each parent ID

    orders.forEach((order) => {
      const parentId = order.id?.toString(); // Use the order's unique ID
      if (!suffixes[parentId]) suffixes[parentId] = 0; // Initialize suffix counter

      order.order.forEach((item: any) => {
        const suffix = String.fromCharCode(97 + suffixes[parentId]); // Generate suffix (a, b, c, ...)
        item.displayId = `${parentId}-${suffix}`; // Add displayId with table and status
        suffixes[parentId] += 1; // Increment suffix counter
      });
    });

    return orders;
  };

  // State for filtered columns
  const [filteredColumns, setFilteredColumns] = useState<any>({});

  useEffect(() => {
    setFilteredColumns({});

    const localFiltered = Object.fromEntries(
      Object.entries(columns).map(([tableId, tableData]) => {
        const processedStatuses = Object.fromEntries(
          Object.entries(tableData as any).map(([status, orders]) => {
            if (!Array.isArray(orders)) return [status, []];

            const sortedArray = sortByCreatedAt(orders);
            const withDisplayIds = addDisplayIds(sortedArray);

            return [status, withDisplayIds];
          })
        );

        return [tableId, processedStatuses];
      })
    );

    setFilteredColumns({ ...localFiltered });
    !selectedTable && setSelectedTable(Object.keys(localFiltered)[0]);
  }, [columnCount, columns, selectedCategory, selectedTable]);

  return (
    <>
      <div className="lg:mx-5 px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <>
              <span className="sr-only">Dropp</span>
              <img
                className="h-5 lg:h-6 w-auto"
                src="/images/logo.svg"
                alt=""
              />
            </>
          </div>

          <div className="flex items-center justify-end">
            <SoundNotification
              playNotif={playSound && soundNotification}
              soundNotification={soundNotification}
              setSoundNotification={setSoundNotification}
              setPlaySound={setPlaySound}
            />

            <WaiterLogoutButton />
          </div>
        </div>
      </div>
      <div
        className="w-full h-screen px-3 lg:px-6 py-4"
        style={{ backgroundColor: "#F9F9F9" }}
      >
        <div className="px-2 flex justify-between items-center">
          <h3 className="font_bold text-2xl font-semibold">
            {superWaiter?.employeeAssigned}
          </h3>

          <div className="mt-2 lg:mt-0">
            <div
              className="inline-flex items-center justify-center primary_bg_color px-5 py-2 whitespace-nowrap shadow-sm cursor-pointer rounded-xl font_medium"
              onClick={() => {
                setOpenTableLinks(!openTableLinks);
              }}
            >
              <p
                className={`text-xs lg:text-sm font_medium text-lg text-white`}
              >
                Place Order
              </p>
              {openTableLinks ? (
                <TiArrowSortedUp color="#ffffff" size={20} />
              ) : (
                <TiArrowSortedDown color="#ffffff" size={20} />
              )}
            </div>
            {openTableLinks && (
              <ClickAwayListener onClickAway={() => handleClickAway()}>
                <div
                  className={`absolute z-10 bg-white mb-2 w-32 lg:w-36 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                >
                  {Object.keys(filteredColumns)?.map((item: any, i: number) => (
                    <Link
                      key={i}
                      to={`/restaurant/${superWaiter?.businessName}/${item}`}
                      target="_blank"
                    >
                      <div className="flex items-center cursor-pointer mb-2 hover:bg-neutral-200">
                        <p
                          className={`text-xs lg:text-sm secondary_gray_color text-black`}
                        >
                          {item}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>

        <div className="w-full h-fit py-1">
          {/* TABLES */}
          <div className="w-full h-fit py-1">
            {Object.keys(columnCount)?.length > 0 && (
              <div
                className="flex flex-row h-fit w-full px-2 pb-1 rounded my-1 gap-x-3 overflow-x-scroll reduce-scrollbar"
                style={{ maxHeight: "250px" }}
              >
                {Object.keys(columnCount).map((cat: any, i: number) => (
                  <div
                    key={i}
                    className={`flex flex-row justify-between items-center w-fit h-fit py-2 px-4 my-1 gap-x-1 rounded-full shrink-0 cursor-pointer ${
                      selectedTable === cat
                        ? "bg-[#888888] text-white"
                        : "bg_sec_gray_color text-gray-600"
                    }`}
                    onClick={() => setSelectedTable(cat)}
                  >
                    <div className="flex flex-row justify-between items-center">
                      <div className="ml-1 flex flex-row justify-between items-center">
                        <p className="text-xs font-bold font_regular">
                          {`${cat}`}
                        </p>
                        <div
                          className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center ${
                            selectedTable === cat ? "bg-[#383838]" : "bg-white"
                          }`}
                        >
                          <p
                            className={`text-xs font_medium ${
                              selectedTable === cat
                                ? "text-white"
                                : "primary_txt_color"
                            }`}
                          >
                            {selectedTable && columnCount[cat].pending}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CATEGORIES */}
          <div className="w-full h-fit py-1">
            {CATEGORIES.length > 0 && (
              <div
                className="flex flex-row h-fit w-full px-2 pb-1 rounded my-1 gap-x-3 overflow-x-scroll reduce-scrollbar"
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
                      <div className="ml-1 flex flex-row justify-between items-center">
                        <p className="text-xs font-bold font_regular">
                          {`${cat?.label}`}
                        </p>
                        <div
                          className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center ${
                            selectedCategory?.label === cat?.label
                              ? "bg-[#03391F]"
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
                            {selectedTable &&
                              columnCount[selectedTable][cat?.value]}
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
            <InfinityScroll
              data={
                (selectedTable &&
                  filteredColumns[selectedTable][selectedCategory.value]) ||
                []
              }
              getMore={loadMore}
              hasMore={
                selectedTable && hasMore[selectedTable][selectedCategory.value]
              }
            >
              <div className="flex flex-col mt-2">
                {filteredColumns ? (
                  filteredColumns[selectedTable] ? (
                    filteredColumns[selectedTable][selectedCategory?.value] &&
                    filteredColumns[selectedTable][selectedCategory?.value]
                      .length > 0 ? (
                      filteredColumns[selectedTable][
                        selectedCategory?.value
                      ]?.map((tableOrder: any, i: number) => {
                        if (
                          selectedCategory?.value !== "Kitchen" &&
                          ["pending", "completed"].includes(
                            selectedCategory?.value
                          )
                        ) {
                          return (
                            <OrderItem
                              key={i}
                              order={tableOrder}
                              page={page}
                              selectedOrder={selectedOrder}
                              ordersModal={ordersModal}
                              openOrdersModal={() =>
                                openOrdersModal(tableOrder)
                              }
                              closeOrdersModal={closeOrdersModal}
                              getTableOrders={getRestaurantOrders}
                              selectedCategory={selectedCategory?.value}
                              chef={chef}
                              table={
                                Object.keys(filteredColumns).filter(
                                  (item) => item === selectedTable
                                )[0]
                              }
                            />
                          );
                        } else {
                          return (
                            <MenuOrderItem
                              key={i}
                              orderStatus={selectedCategory?.value}
                              secondOrderStatus="sent"
                              thirdOrderStatus="declined"
                              order={tableOrder}
                              orderLength={tableOrder?.order?.length}
                              selectedOrder={selectedReadyOrder}
                              ordersModal={ordersModal}
                              selectedCategory={selectedCategory?.value}
                              openOrdersModal={() =>
                                openOrdersModal(tableOrder)
                              }
                              closeOrdersModal={() => closeOrdersModal()}
                              getTableOrders={getRestaurantOrders}
                              chef={chef}
                              table={
                                Object.keys(filteredColumns).filter(
                                  (item) => item === selectedTable
                                )[0]
                              }
                            />
                          );
                        }
                      })
                    ) : (
                      <div>No orders for the selected category.</div>
                    )
                  ) : (
                    <div>No table selected.</div>
                  )
                ) : (
                  <div>No tables available.</div>
                )}
              </div>
            </InfinityScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperWaiterDashboard;
