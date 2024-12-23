// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { ClickAwayListener, Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "../../redux/hooks";
import { getTables } from "../../_redux/table/tableAction";
import { SERVER } from "../../config/axios";
import {
  DINNING_MENU_CATEGORY_URL,
  RESTAURANT_ORDER_URL,
} from "../../_redux/urls";
import Button from "../../components/Button";
import OutlineButton from "../../components/OutlineButton";
import KitchenButton from "../../components/KitchenButton";
import { Link, useNavigate } from "react-router-dom";
import { CHEF_ROUTES } from "../../routes/routes";
import LogoutButton from "../../components/LogoutButton";
import moment from "moment";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import invariant from "tiny-invariant";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import KitchenCard from "../../components/kitchenCard";
import KitchenBoard from "../../components/KitchenBoard";
import { SoundNotification } from "../../components/SoundNotification";
import io from "socket.io-client";
import InfinityScroll from "../../components/InfinityScroll";

const socket = io(import.meta.env.VITE_BASE_URL, {
  withCredentials: true,
});

const DECLINE_REASONS = [
  "Meal unavailable",
  "Customer unavailable",
  "Other reasons",
];

const Kitchen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { table, auth } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
      table: state.table.table,
    }),
    shallowEqual
  );

  const ref = useRef(null);

  const [restaurantOrders, setRestaurantOrders] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Flag to track if there are more items to load
  const [page, setPage] = useState(1); // Page number for pagination

  const getRestaurantOrders = async (currentPage = page) => {
    SERVER.get(`${RESTAURANT_ORDER_URL}/restaurant?page=${currentPage}`)
      .then(({ data }) => {
        if (currentPage === 1) {
          setRestaurantOrders(data.data);
        } else {
          setRestaurantOrders((prevTransactions: any) => [
            ...prevTransactions,
            ...data.data,
          ]);
        }

        if (Number(data.pagination.totalPages) > 1) {
          setPage(page + 1);
          setHasMore(
            Number(data.pagination.totalPages) > 1 &&
              Number(data.pagination.currentPage) <=
                Number(data.pagination.totalPages)
          );
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => {});
  };

  const [dinningMenuCategories, setDinningMenuCategories] = useState<any>([]);
  const getDinningMenuCategories = () => {
    SERVER.get(DINNING_MENU_CATEGORY_URL)
      .then(({ data }) => {
        if (
          data?.dinningMenuCategory?.categories &&
          data?.dinningMenuCategory?.categories?.length > 0
        ) {
          setDinningMenuCategories(data?.dinningMenuCategory?.categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(getTables());
    getDinningMenuCategories();
    getRestaurantOrders(page);
  }, []);

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
    socket.on("newKitchenOrder", (newOrder) => {
      // Call getRestaurantOrders to update the orders
      getRestaurantOrders();
      receiveNotification();
    });
    return () => {
      socket.off("newRestaurantOrder");
    };
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("kitchenTabActive");
    };

    localStorage.setItem("kitchenTabActive", "true");

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const [declineModal, setDeclineModal] = useState(false);
  const openDeclineModal = () => setDeclineModal(true);
  const closeDeclineModal = () => setDeclineModal(false);

  const [startCooking, setStartCooking] = useState();
  const [readyForPickup, setReadyForPickup] = useState();
  const [voided, setVoided] = useState();
  const [decline, setDecline] = useState();
  const [declineOrder, setDeclineOrder] = useState();
  const [declineOrderMenu, setDeclineOrderMenu] = useState();
  const [declineReason, setDeclineReason] = useState();
  const [declineLoading, setDeclineLoading] = useState(false);

  const updateOrders = (item: any, menuId: any) => {
    const elem = item?.data.order.find((m) => m.id === menuId);

    setRestaurantOrders((prevOrders: any) =>
      prevOrders.map((order: any) =>
        order._id === menuId ? { ...order, ...elem } : order
      )
    );
  };

  const handleStartCooking = async (orderId, menuId: any) => {
    setStartCooking(menuId);
    SERVER.patch(`${RESTAURANT_ORDER_URL}/${orderId}/${menuId}`, {
      status: "cooking",
    })
      .then(({ data }) => {
        updateOrders(data, menuId);
      })
      .catch((err) => {})
      .finally(() => setStartCooking());
  };

  const handleReadyForPickup = async (orderId, menuId: any) => {
    setReadyForPickup(menuId);
    SERVER.patch(`${RESTAURANT_ORDER_URL}/${orderId}/${menuId}`, {
      status: "ready",
    })
      .then(({ data }) => {
        updateOrders(data, menuId);
      })
      .catch((err) => {})
      .finally(() => setReadyForPickup());
  };

  const handleVoided = async (orderId, menuId: any) => {
    setVoided(menuId);
    SERVER.patch(`${RESTAURANT_ORDER_URL}/${orderId}/${menuId}`, {
      status: "archived",
    })
      .then(({ data }) => {
        updateOrders(data, menuId);
      })
      .catch((err) => {})
      .finally(() => setVoided());
  };

  const handleDecline = async (orderId, menuId, reason) => {
    setDeclineLoading(true);
    SERVER.patch(`${RESTAURANT_ORDER_URL}/${orderId}/${menuId}`, {
      status: "declined",
      reason,
    })
      .then(({ data }) => {
        setDeclineOrder();
        setDeclineOrderMenu();
        setDeclineReason();
        updateOrders(data, menuId);
        closeDeclineModal();
      })
      .catch((err) => {})
      .finally(() => setDeclineLoading(false));
  };

  const CalculateAverageTime = (objectList) => {
    if (!objectList.length) {
      return 0;
    }

    const timestamps = objectList.map((obj) => moment(obj.createdAt).valueOf());

    const totalTime = timestamps.reduce((acc, timestamp) => acc + timestamp, 0);

    const averageTime = totalTime / objectList.length;

    const averageTimeFormatted = moment.utc(averageTime).format("HH:mm:ss");

    return averageTimeFormatted;
  };

  const getAllKitchenOrders = async () => {
    let currentPage = 1;
    let allOrders = [];

    const fetchAllOrders = async (currentPage) => {
      try {
        const response = await SERVER.get(
          `${RESTAURANT_ORDER_URL}/restaurant?page=${currentPage}`
        );
        const fetchedOrders = response.data.data;

        allOrders = [...allOrders, ...fetchedOrders];

        if (
          response.data.pagination.totalPages > currentPage &&
          response.data.pagination.currentPage !==
            response.data.pagination.totalPages
        ) {
          currentPage++;
          await fetchAllOrders(currentPage);
        } else {
          setRestaurantOrders(allOrders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    await fetchAllOrders(currentPage);
    return allOrders;
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const kitchenConvertToCSV = async (data: any) => {
    const header = [
      "No of declined orders",
      "No. of Void orders",
      "No. of completed orders",
      "Avg time to complete orders",
    ].join(",");

    const allOrders = await getAllKitchenOrders();

    const declinedOrders =
      allOrders &&
      allOrders?.filter(
        (ro) => ro?.parentStatus === "kitchen" && ro?.status === "declined"
      ).length;

    const voidOrders =
      allOrders &&
      allOrders?.filter(
        (ro) => ro?.parentStatus === "kitchen" && ro?.status === "archived"
      ).length;

    const completedOrders =
      allOrders &&
      allOrders?.filter(
        (ro) => ro?.parentStatus === "completed" && ro?.status === "completed"
      ).length;

    const avgTime = "-";

    const rows = [declinedOrders, voidOrders, completedOrders, avgTime].join(
      ","
    );

    return [header, rows].join("\n");
  };

  const kitchenExportToCSV = async (data: any) => {
    setIsDownloading(true);
    try {
      const csv = await kitchenConvertToCSV(data);

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "kitchen-orders.csv");
        link.style.visibility = "hidden";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error("CSV Export Error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const [openTablesOptions, setOpenTablesOptions] = useState(false);
  const [openCategoriesOptions, setOpenCategoriesOptions] = useState(false);

  const sortByUpdatedAt = (arr) => {
    return arr.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  };

  const todaysDate = new Date().toJSON().slice(0, 10);

  const [selectedTable, setSelectedTable] = useState("");
  const filteredTable = !selectedTable
    ? restaurantOrders
    : restaurantOrders.filter((item: any, i: any) => {
        return item.table?.table == selectedTable?.table;
      });

  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredCategory = !selectedCategory
    ? filteredTable
    : filteredTable.filter((item: any, i: any) => {
        return item.menu?.category == selectedCategory?.value;
      });

  const [startDate, setStartDate] = useState("");
  const filteredStartDate = !startDate
    ? filteredCategory
    : filteredCategory.filter((item: any, i: any) => {
        const createdAt = new Date(item.createdAt);
        const date = new Date(startDate);
        return createdAt >= date;
      });

  const [endDate, setEndDate] = useState("");
  const filteredEndDate = !endDate
    ? filteredStartDate
    : filteredStartDate.filter((item: any, i: any) => {
        const createdAt = new Date(item.createdAt);
        const date = new Date(endDate);
        return createdAt <= date;
      });

  const filteredRestaurantOrders = sortByUpdatedAt(filteredEndDate);

  const [columnCount, setColumnCount] = useState({
    new_orders: 0,
    cooking: 0,
    pickup: 0,
    completed: 0,
    decline: 0,
    void: 0,
  });

  useEffect(() => {
    setColumnCount({
      new_orders: 0,
      cooking: 0,
      pickup: 0,
      completed: 0,
      decline: 0,
      void: 0,
    });

    const suffixes = {};

    filteredRestaurantOrders &&
      filteredRestaurantOrders?.length > 0 &&
      filteredRestaurantOrders?.map((order, i) => {
        if (order?.parentStatus === "kitchen" && order?.status === "pending") {
          setColumnCount((prevState) => ({
            ...prevState,
            new_orders: prevState.new_orders + 1,
          }));
        }

        if (order?.parentStatus === "kitchen" && order?.status === "cooking") {
          setColumnCount((prevState) => ({
            ...prevState,
            cooking: prevState.cooking + 1,
          }));
        }

        if (order?.parentStatus === "kitchen" && order?.status === "ready") {
          setColumnCount((prevState) => ({
            ...prevState,
            pickup: prevState.pickup + 1,
          }));
        }

        if (
          order?.parentStatus === "completed" &&
          order?.status === "completed"
        ) {
          setColumnCount((prevState) => ({
            ...prevState,
            completed: prevState.completed + 1,
          }));
        }

        if (order?.parentStatus === "kitchen" && order?.status === "declined") {
          setColumnCount((prevState) => ({
            ...prevState,
            decline: prevState.decline + 1,
          }));
        }

        if (order?.parentStatus === "kitchen" && order?.status === "archived") {
          setColumnCount((prevState) => ({
            ...prevState,
            void: prevState.void + 1,
          }));
        }

        if (!suffixes[order.parent]) {
          suffixes[order.parent] = 0;
        }

        const suffix = String.fromCharCode(97 + suffixes[order.parent]);
        order.displayId = `${order.parent}-${suffix}`;

        suffixes[order.parent] += 1;
      });
  }, [restaurantOrders, selectedTable, selectedCategory, endDate, startDate]);

  const handleClickAway = (flag: string) => {
    if (flag === "categories") {
      setOpenCategoriesOptions(false);
    } else if (flag === "table") {
      setOpenTablesOptions(false);
    }
  };

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          return;
        }

        const destinationLocation = destination.data.title;
        const sourceLocation = source.data.title;
        const order = source.data.order;

        if (destinationLocation === "Cooking") {
          handleStartCooking(order?.parent, order?._id);
        } else if (destinationLocation === "Ready for pickup") {
          handleReadyForPickup(order?.parent, order?._id);
        } else if (
          destinationLocation === "Decline" &&
          sourceLocation === "New orders"
        ) {
          setDeclineOrder(order?.parent);
          setDeclineOrderMenu(order?._id);
          openDeclineModal();
        } else if (destinationLocation === "Void") {
          handleVoided(order?.parent, order?._id);
        }
      },
    });
  }, [restaurantOrders]);

  return (
    <>
      <div className="lg:mx-5 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between py-6 md:justify-start gap-y-3 md:gap-y-0 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Homemade</span>
              <img
                className="h-5 lg:h-6 w-auto"
                src="/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          <div className="flex flex-row items-center justify-end gap-x-3 shrink-0">
            <SoundNotification
              playNotif={playSound && soundNotification}
              soundNotification={soundNotification}
              setSoundNotification={setSoundNotification}
              setPlaySound={setPlaySound}
            />

            <OutlineButton
              title="Menu"
              onClick={() => navigate(CHEF_ROUTES.linkKitchenMenu)}
            />

            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="lg:mx-5 lg:px-4 px-6 flex flex-col lg:flex-row items-center lg:items-end justify-start lg:justify-between gap-x-3 gap-y-3">
        <div className="w-full lg:w-fit flex flex-col lg:flex-row items-center lg:items-end justify-start lg:justify-end gap-x-3 gap-y-3">
          {/* START DATE */}
          <div className="w-4/5 lg:w-36">
            <label className="text-sm font_medium text-black">From Date</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="h-10 bg-[#F8F8F8] block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
              placeholder="Start Date:"
              value={startDate ? startDate : ""}
              onChange={(e: any) => setStartDate(e.target.value)}
              max={endDate ? endDate : todaysDate}
            />
          </div>

          {/* TO DATE */}
          <div className="w-4/5 lg:w-36">
            <label className="text-sm font_medium text-black">To Date</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="h-10 bg-[#F8F8F8] block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
              placeholder="End Date:"
              value={endDate ? endDate : ""}
              onChange={(e: any) => setEndDate(e.target.value)}
              max={todaysDate}
              min={startDate ? startDate : undefined}
            />
          </div>

          <div className="w-4/5 lg:w-36">
            <label className="text-sm font_medium text-black">Tables</label>
            <div className="mt-2 lg:mt-0">
              <div
                className="h-10 bg-[#F8F8F8] block w-full flex justify-between items-center rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                onClick={() => {
                  setOpenTablesOptions(!openTablesOptions);
                }}
              >
                <p className={`text-xs lg:text-sm filter_text font_medium`}>
                  {selectedTable ? selectedTable?.table : "All"}
                </p>
                {openTablesOptions ? (
                  <TiArrowSortedUp color="#8E8E8E" size={20} />
                ) : (
                  <TiArrowSortedDown color="#8E8E8E" size={20} />
                )}
              </div>
              {openTablesOptions && (
                <ClickAwayListener onClickAway={() => handleClickAway("table")}>
                  <div
                    className={`absolute z-10 bg-white mb-2 w-full lg:w-36 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                  >
                    <div
                      className="flex items-center cursor-pointer mb-2"
                      onClick={() => {
                        setSelectedTable("");
                        setOpenTablesOptions(false);
                      }}
                    >
                      <div
                        className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                          selectedTable === ""
                            ? "primary_bg_color"
                            : "bg_gray_color"
                        }`}
                      />
                      <p
                        className={`text-xs lg:text-sm secondary_gray_color text-black`}
                      >
                        All
                      </p>
                    </div>
                    {table?.length > 0 &&
                      table
                        ?.filter((item) => !!item?.table)
                        .map((s: any, i: number) => (
                          <div
                            className="flex items-center cursor-pointer mb-2"
                            key={i}
                            onClick={() => {
                              setSelectedTable(s);
                              setOpenTablesOptions(false);
                            }}
                          >
                            <div
                              className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                selectedTable?.table === s?.table
                                  ? "primary_bg_color"
                                  : "bg_gray_color"
                              }`}
                            />
                            <p
                              className={`text-xs lg:text-sm secondary_gray_color text-black`}
                            >
                              {s?.table}
                            </p>
                          </div>
                        ))}
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>

          <div className="w-4/5 lg:w-36">
            <label className="text-sm font_medium text-black">Categories</label>
            <div className="mt-2 lg:mt-0">
              <div
                className="h-10 bg-[#F8F8F8] block w-full flex justify-between items-center rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                onClick={() => {
                  setOpenCategoriesOptions(!openCategoriesOptions);
                }}
              >
                <p className={`text-xs lg:text-sm filter_text font_medium`}>
                  {selectedCategory ? selectedCategory?.value : "All"}
                </p>
                {openCategoriesOptions ? (
                  <TiArrowSortedUp color="#8E8E8E" size={20} />
                ) : (
                  <TiArrowSortedDown color="#8E8E8E" size={20} />
                )}
              </div>
              {openCategoriesOptions && (
                <ClickAwayListener
                  onClickAway={() => handleClickAway("categories")}
                >
                  <div
                    className={`absolute z-10 bg-white mb-2 w-full lg:w-36 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                  >
                    <div
                      className="flex items-center cursor-pointer mb-2"
                      onClick={() => {
                        setSelectedCategory("");
                        setOpenCategoriesOptions(false);
                      }}
                    >
                      <div
                        className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                          selectedCategory === ""
                            ? "primary_bg_color"
                            : "bg_gray_color"
                        }`}
                      />
                      <p
                        className={`text-xs lg:text-sm secondary_gray_color text-black`}
                      >
                        All
                      </p>
                    </div>
                    {dinningMenuCategories?.length > 0 &&
                      dinningMenuCategories?.map((s: any, i: number) => (
                        <div
                          className="flex items-center cursor-pointer mb-2"
                          key={i}
                          onClick={() => {
                            setSelectedCategory(s);
                            setOpenCategoriesOptions(false);
                          }}
                        >
                          <div
                            className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                              selectedCategory?.value === s?.value
                                ? "primary_bg_color"
                                : "bg_gray_color"
                            }`}
                          />
                          <p
                            className={`text-xs lg:text-sm secondary_gray_color text-black`}
                          >
                            {s?.value}
                          </p>
                        </div>
                      ))}
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>

          <div
            className={`py-2 px-4 w-4/5 lg:w-36 h-10 flex items-center justify-center gap-3 rounded-full cursor-pointer ${
              endDate || startDate || selectedTable || selectedCategory
                ? "text-white primary_bg_color"
                : "text-black bg-[#EDECEC]"
            }`}
            onClick={() => {
              setEndDate("");
              setStartDate("");
              setSelectedTable("");
              setSelectedCategory("");
            }}
          >
            <p className="font_medium">Reset</p>
          </div>
        </div>

        <div
          className="py-2 px-4 w-4/5 lg:w-36 h-10 flex items-center justify-center gap-3 rounded-full cursor-pointer text-black bg-[#EDECEC]"
          onClick={() => {
            kitchenExportToCSV(restaurantOrders);
          }}
        >
          {isDownloading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="#6D6D6D" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <>
              <p className="font_medium">Download</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="#6D6D6D"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </>
          )}
        </div>
      </div>

      <div className="w-fit md:w-full md:px-6 py-4">
        <InfinityScroll
          data={restaurantOrders}
          getMore={getRestaurantOrders}
          hasMore={hasMore}
        >
          <div
            ref={ref}
            className="kitchen-div bg-white rounded-2xl w-fit md:w-full p-0 md:p-5 mt-3 h-screen overflow-x-scroll"
          >
            {/* <div className="flex flex-col items-center justify-start gap-y-4"> */}
            {/* <div className="w-full h-full"> */}

            <div className="snap-x md:snap-none snap-mandatory flex flex-row w-screen overflow-x-scroll md:w-fit h-full px-5 md:px-0 gap-x-5 no-scroll-bar">
              {/* NEW ORDERS */}
              <KitchenBoard
                restaurantOrders={restaurantOrders}
                title="New orders"
                headerBg="primary_bg_color"
                bodyBg="bg_pink"
                columnCount={columnCount.new_orders}
                orders={
                  restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  filteredRestaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "kitchen" &&
                        ro?.status === "pending"
                    )
                    ?.map((order: any) => (
                      <KitchenCard
                        key={order?._id}
                        order={order}
                        restaurantOrders={restaurantOrders}
                        filteredRestaurantOrders={filteredRestaurantOrders}
                        title={"New orders"}
                        kitchenCardButtons={[
                          <KitchenButton
                            title="Start Cooking"
                            extraClasses="mt-2 text-red-600 bg-red-100 border-red-600"
                            loading={startCooking === order?._id}
                            onClick={() =>
                              handleStartCooking(order?.parent, order?._id)
                            }
                          />,
                          <KitchenButton
                            title="Decline"
                            extraClasses="mt-2 text-red-600 bg-red-100 border-red-600"
                            onClick={() => {
                              setDeclineOrder(order?.parent);
                              setDeclineOrderMenu(order?._id);
                              openDeclineModal();
                            }}
                          />,
                        ]}
                      />
                    ))
                }
              />

              {/* COOKING */}
              <KitchenBoard
                restaurantOrders={restaurantOrders}
                title="Cooking"
                headerBg="bg-zinc-500"
                bodyBg="bg-zinc-200"
                columnCount={columnCount.cooking}
                orders={
                  restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  filteredRestaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "kitchen" &&
                        ro?.status === "cooking"
                    )
                    ?.map((order: any) => (
                      <KitchenCard
                        key={order?._id}
                        order={order}
                        restaurantOrders={restaurantOrders}
                        filteredRestaurantOrders={filteredRestaurantOrders}
                        title={"Cooking"}
                        kitchenCardButtons={[
                          <KitchenButton
                            title="Ready For Pickup"
                            extraClasses="mt-2 bg_kitchen_ready border_kitchen_ready text_kitchen_ready"
                            loading={readyForPickup === order?._id}
                            onClick={() =>
                              handleReadyForPickup(order?.parent, order?._id)
                            }
                          />,
                          <KitchenButton
                            title="Void"
                            extraClasses="mt-2 bg_kitchen_ready border_kitchen_ready text_kitchen_ready"
                            loading={voided === order?._id}
                            onClick={() => {
                              handleVoided(order?.parent, order?._id);
                            }}
                          />,
                        ]}
                      />
                    ))
                }
              />

              {/* READY */}
              <KitchenBoard
                restaurantOrders={restaurantOrders}
                title="Ready for pickup"
                headerBg="bg-green-600"
                bodyBg="bg-green-100"
                columnCount={columnCount.pickup}
                orders={
                  restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  filteredRestaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "kitchen" && ro?.status === "ready"
                    )
                    ?.map((order: any) => (
                      <KitchenCard
                        key={order?._id}
                        order={order}
                        restaurantOrders={restaurantOrders}
                        filteredRestaurantOrders={filteredRestaurantOrders}
                        title={"Ready for pickup"}
                        kitchenCardButtons={[
                          <KitchenButton
                            title="Void"
                            extraClasses="mt-2 text-green-600 bg-green-100 border-green-600"
                            loading={voided === order?._id}
                            onClick={() => {
                              handleVoided(order?.parent, order?._id);
                            }}
                          />,
                        ]}
                      />
                    ))
                }
              />

              {/* COMPLETED */}
              <KitchenBoard
                restaurantOrders={restaurantOrders}
                title="Completed"
                headerBg="bg-green-900"
                bodyBg="bg-gray-100"
                columnCount={columnCount.completed}
                orders={
                  restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  filteredRestaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "completed" &&
                        ro?.status === "completed"
                    )
                    ?.map((order: any) => (
                      <KitchenCard
                        key={order?._id}
                        order={order}
                        restaurantOrders={restaurantOrders}
                        filteredRestaurantOrders={filteredRestaurantOrders}
                        title={"Completed"}
                      />
                    ))
                }
              />

              {/* DECLINE */}
              <KitchenBoard
                restaurantOrders={restaurantOrders}
                title="Decline"
                headerBg="bg-red-900"
                bodyBg="bg-red-100"
                columnCount={columnCount.decline}
                orders={
                  restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  filteredRestaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "kitchen" &&
                        ro?.status === "declined"
                    )
                    ?.map((order: any) => (
                      <KitchenCard
                        key={order?._id}
                        order={order}
                        restaurantOrders={restaurantOrders}
                        filteredRestaurantOrders={filteredRestaurantOrders}
                        title={"Decline"}
                      />
                    ))
                }
              />

              {/* VOIDED */}
              <KitchenBoard
                restaurantOrders={restaurantOrders}
                title="Void"
                headerBg="bg-black"
                bodyBg="bg-neutral-100"
                columnCount={columnCount.void}
                orders={
                  restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  filteredRestaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "kitchen" &&
                        ro?.status === "archived"
                    )
                    ?.map((order: any) => (
                      <KitchenCard
                        key={order?._id}
                        order={order}
                        restaurantOrders={restaurantOrders}
                        filteredRestaurantOrders={filteredRestaurantOrders}
                        title={"Void"}
                      />
                    ))
                }
              />
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </InfinityScroll>
      </div>

      <Modal
        open={declineModal}
        onClose={closeDeclineModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/5 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none">
          <div className="flex flex-col justify-between items-center p-0 h-full">
            <div
              className="h-fit my-3 w-100 w-full flex flex-col gap-y-5"
              style={{ minHeight: "80%" }}
            >
              <div className="flex flex-row items-start justify-between w-full py-1">
                <div className="flex flex-row items-start justify-center w-full">
                  <p className="flex-1 text-2xl text-center text-black font-medium font_medium">
                    Why
                  </p>
                </div>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeDeclineModal}
                />
              </div>

              <div
                className="flex flex-col justify-start items-center h-full w-full mb-5"
                style={{ minHeight: "80%" }}
              >
                <div className="flex flex-col items-center justify-between w-full mt-3 h-full overflow-y-auto">
                  <div className="flex flex-col items-start justify-start gap-y-2 w-full">
                    {DECLINE_REASONS?.map((reason, i) => (
                      <div
                        key={i}
                        className={`flex flex-row items-center justify-between w-full px-3 py-1 border border-neutral-100 rounded-md hover:bg-neutral-100 cursor-pointer ${
                          declineReason === reason ? "bg-neutral-100" : ""
                        }`}
                        onClick={() => setDeclineReason(reason)}
                      >
                        <p className="text-md capitalize font_medium text-black font-medium text-wrap">
                          {reason}
                        </p>

                        <div
                          className={`mr-4 w-7 h-7 mb-2 flex justify-center items-center self-center cursor-pointer ${
                            declineReason === reason
                              ? "border-2 primary_border_color rounded-full"
                              : ""
                          }`}
                          onClick={() => setDeclineReason(reason)}
                        >
                          <div
                            className={`w-5 h-5 rounded-full cursor-pointer ${
                              declineReason === reason
                                ? "primary_bg_color"
                                : "bg_check_inactive_payment"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    title="Decline"
                    extraClasses="mt-6 w-full bg-red-100 border-red-600"
                    loading={declineLoading}
                    onClick={() => {
                      if (!declineReason)
                        return alert("Please select a reason");

                      handleDecline(
                        declineOrder,
                        declineOrderMenu,
                        declineReason
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Kitchen;
