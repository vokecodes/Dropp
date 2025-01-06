import { useEffect, useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { ClickAwayListener, Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "../../redux/hooks";
import { getTables, subChefGetTables } from "../../_redux/table/tableAction";
import { SERVER } from "../../config/axios";
import {
  DINNING_MENU_CATEGORY_URL,
  RESTAURANT_ORDER_URL,
  SUB_CHEF_URL,
} from "../../_redux/urls";
import Button from "../../components/Button";
import OutlineButton from "../../components/OutlineButton";
import KitchenButton from "../../components/KitchenButton";
import { Link, useNavigate } from "react-router-dom";
import { CHEF_ROUTES } from "../../routes/routes";
import LogoutButton from "../../components/LogoutButton";
import moment from "moment";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import KitchenCard from "../../components/kitchenCard";
import KitchenBoard from "../../components/KitchenBoard";
import { SoundNotification } from "../../components/SoundNotification";
import io from "socket.io-client";
import { getSubChefDineInMenuCategories } from "../../_redux/dinningMenu/dinningMenuCrud";

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

  const { table } = useSelector(
    (state: any) => ({
      table: state.table.table,
    }),
    shallowEqual
  );

  const ref = useRef(null);
  const [restaurantOrders, setRestaurantOrders] = useState([]);

  const [selectedTable, setSelectedTable] = useState<any>("");
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const loading = useRef(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [hasMore, setHasMore] = useState({
    pending: true,
    cooking: true,
    ready: true,
    completed: true,
    declined: true,
    archived: true,
  });
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState<any>({});
  const [columnCount, setColumnCount] = useState({
    pending: 0,
    cooking: 0,
    ready: 0,
    sent: 0,
    completed: 0,
    declined: 0,
    archived: 0,
    pickup: 0,
  });

  const sortByCreatedAt = (arr: { createdAt: string }[]) => {
    return arr.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  };

  const getRestaurantOrdersColumn = async (
    currentPage = page,
    noSkip = true
  ) => {
    if (loading.current) return;
    loading.current = true;

    try {
      const { data } = await SERVER.get(
        `${SUB_CHEF_URL}/order-column?page=${currentPage}&selectedTable=${
          selectedTable ? selectedTable?._id : ""
        }&selectedCategory=${selectedCategory}&startDate=${startDate}&endDate=${endDate}`
      );

      const totalPages = data?.pagination.totalPages || 1;

      if (currentPage === 1 && noSkip) {
        setColumns({ ...data?.data });
      } else {
        setColumns((prevColumns) => {
          const updatedColumns = { ...prevColumns };

          Object.keys(data?.data || {}).forEach((status) => {
            if (!updatedColumns[status]) {
              updatedColumns[status] = [];
            }

            const existingIds = new Set(
              updatedColumns[status].map((item) => item._id)
            );

            const newItems = data.data[status].filter(
              (item) => !existingIds.has(item._id)
            );

            updatedColumns[status] = sortByCreatedAt([
              ...updatedColumns[status],
              ...newItems,
            ]);
          });

          return updatedColumns;
        });
      }

      setColumnCount((prev) => {
        const newCount = { ...prev };
        Object.keys(data?.columnCount || {}).forEach((status) => {
          newCount[status] = data.columnCount[status]?.totalCount || 0;
        });
        return newCount;
      });

      setHasMore((prev) => {
        const newHasMore = { ...prev };

        Object.keys(data?.columnCount || {}).forEach((status) => {
          const totalCount = data.columnCount[status]?.totalCount || 0;
          const currentCount =
            (columns[status]?.length || 0) + (data.data[status]?.length || 0);
          newHasMore[status] = currentCount < totalCount;
        });

        return newHasMore;
      });

      if (noSkip) {
        setPage((prevPage) => {
          let newPage = 0;
          newPage = prevPage < totalPages ? prevPage + 1 : prevPage;
          return newPage;
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      if (noSkip) {
        setTimeout(() => {
          loading.current = false;
        }, 2000);
      } else {
        loading.current = false;
      }
      setFilterLoading(false);
    }
  };

  const [dinningMenuCategories, setDinningMenuCategories] = useState<any>([]);
  const getDinningMenuCategories = async () => {
    try {
      const { data } = await getSubChefDineInMenuCategories();

      if (
        data?.dinningMenuCategory?.categories &&
        data?.dinningMenuCategory?.categories?.length > 0
      ) {
        setDinningMenuCategories(data?.dinningMenuCategory?.categories);
      }
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setFilterLoading(true);
    dispatch(subChefGetTables());
    getDinningMenuCategories();
    getRestaurantOrdersColumn(1);
  }, [endDate, selectedCategory, selectedTable]);

  const loadMore = () => {
    if (loading.current) return;
    getRestaurantOrdersColumn();
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
    socket.on("newKitchenOrder", (newOrder) => {
      // Call getRestaurantOrders to update the orders
      getRestaurantOrdersColumn();
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

  const [currentOrder, setCurrentOrder] = useState(null);
  const [declineOrder, setDeclineOrder] = useState("");
  const [declineOrderMenu, setDeclineOrderMenu] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const [declineLoading, setDeclineLoading] = useState(false);

  const updateOrders = (item: any, menuId: any, status: string) => {
    const elem = item?.data.order.find((m) => m.id === menuId);

    setColumns((prevOrders: any) => {
      const newOrders = { ...prevOrders };

      // Safely filter out the item from the current status
      const prevArr = sortByCreatedAt(
        (newOrders[status] || [])
          .filter((order: any) => order._id !== menuId)
          .slice(0, 20)
      );

      // Add the item to the new status
      const newArr = sortByCreatedAt(
        [{ ...elem }, ...(newOrders[elem.status] || [])].slice(0, 20)
      );

      return {
        ...newOrders,
        [status]: [...prevArr],
        [elem.status]: [...newArr],
      };
    });
    getRestaurantOrdersColumn(page - 1, false);

    setColumnCount((prev) => {
      const newCount = { ...prev };

      newCount[status] = prev[status]--;
      newCount[elem.status] = prev[elem.status]++;

      return newCount;
    });
  };

  const handleStartCooking = async (
    orderId,
    menuId: any,
    menuStatus = "pending"
  ) => {
    setCurrentOrder(menuId);
    SERVER.patch(`${SUB_CHEF_URL}/${orderId}/${menuId}`, {
      status: "cooking",
    })
      .then(({ data }) => {
        updateOrders(data, menuId, menuStatus);
      })
      .catch((err) => {})
      .finally(() => setCurrentOrder(null));
  };

  const handleReadyForPickup = async (
    orderId,
    menuId: any,
    menuStatus = "cooking"
  ) => {
    setCurrentOrder(menuId);
    SERVER.patch(`${SUB_CHEF_URL}/${orderId}/${menuId}`, {
      status: "ready",
    })
      .then(({ data }) => {
        updateOrders(data, menuId, menuStatus);
      })
      .catch((err) => {})
      .finally(() => setCurrentOrder(""));
  };

  const handleSent = async (orderId, menuId: any, menuStatus = "ready") => {
    setCurrentOrder(menuId);
    SERVER.patch(`${SUB_CHEF_URL}/${orderId}/${menuId}`, {
      status: "sent",
    })
      .then(({ data }) => {
        updateOrders(data, menuId, menuStatus);
      })
      .catch((err) => {})
      .finally(() => setCurrentOrder(""));
  };

  const handleVoided = async (orderId, menuId: any, menuStatus = "sent") => {
    setCurrentOrder(menuId);
    SERVER.patch(`${SUB_CHEF_URL}/${orderId}/${menuId}`, {
      status: "archived",
    })
      .then(({ data }) => {
        updateOrders(data, menuId, menuStatus);
      })
      .catch((err) => {})
      .finally(() => setCurrentOrder(""));
  };

  const handleDecline = async (
    orderId,
    menuId,
    reason,
    menuStatus = "pending"
  ) => {
    setCurrentOrder(true);
    SERVER.patch(`${SUB_CHEF_URL}/${orderId}/${menuId}`, {
      status: "declined",
      reason,
    })
      .then(({ data }) => {
        setDeclineOrder("");
        setDeclineOrderMenu("");
        setDeclineReason("");
        updateOrders(data, menuId, menuStatus);
        closeDeclineModal();
      })
      .catch((err) => {})
      .finally(() => setCurrentOrder(false));
  };

  const getAllKitchenOrders = async () => {
    let currentPage = 1;
    let allOrders = [];

    const fetchAllOrders = async (currentPage) => {
      try {
        const response = await SERVER.get(
          `${SUB_CHEF_URL}/restaurant?page=${currentPage}`
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
        (ro) =>
          (ro?.parentStatus === "completed" || ro?.parentStatus === "sent") &&
          (ro?.status === "completed" || ro?.status === "sent")
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

  const addDisplayIds = (orders: any[]) => {
    const suffixes: { [key: string]: number } = {};

    orders.forEach((order) => {
      if (!suffixes[order.parent]) {
        suffixes[order.parent] = 0;
      }

      if (order?.parentStatus === "kitchen" && order?.status === "ready") {
        setColumnCount((prevState) => ({
          ...prevState,
          pickup: prevState.pickup + 1,
        }));
      }

      suffixes[order.parent] += 1;
    });

    return orders;
  };

  // Filter the object while retaining its structure
  const [filteredColumns, setFilteredColumns] = useState({});

  useEffect(() => {
    setFilteredColumns({});

    const localFiltered = Object.fromEntries(
      Object.entries(columns).map(([key, value]) => {
        // Sort by 'createdAt' before returning
        const sortedArray = sortByCreatedAt(value as any[]);

        // Add display IDs
        const withDisplayIds = addDisplayIds(sortedArray);

        // Return the key and the processed array
        return [key, withDisplayIds];
      })
    );

    setFilteredColumns({ ...localFiltered });
  }, [
    columnCount,
    columns,
    selectedTable,
    selectedCategory,
    endDate,
    startDate,
  ]);

  const [openTablesOptions, setOpenTablesOptions] = useState(false);
  const [openCategoriesOptions, setOpenCategoriesOptions] = useState(false);

  const handleClickAway = (flag: string) => {
    if (flag === "categories") {
      setOpenCategoriesOptions(false);
    } else if (flag === "table") {
      setOpenTablesOptions(false);
    }
  };

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }: any) {
        const destination = location.current.dropTargets[0];

        if (!destination) {
          return;
        }

        const destinationLocation = destination.data.title;
        const sourceLocation = source.data.title;
        const order = source.data.order;

        if (destinationLocation === "Cooking") {
          handleStartCooking(order?.parent, order?._id, order?.status);
        } else if (destinationLocation === "Ready for pickup") {
          handleReadyForPickup(order?.parent, order?._id, order?.status);
        } else if (destinationLocation === "Sent") {
          handleSent(order?.parent, order?._id, order?.status);
        } else if (
          destinationLocation === "Decline" &&
          sourceLocation === "New orders"
        ) {
          setDeclineOrder(order?.parent);
          setDeclineOrderMenu(order?._id);
          openDeclineModal();
        } else if (destinationLocation === "Void") {
          handleVoided(order?.parent, order?._id, order?.status);
        }
      },
    });
  }, [restaurantOrders]);

  const todaysDate = new Date().toJSON().slice(0, 10);

  return (
    <>
      <div className="lg:mx-5 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between py-6 md:justify-start gap-y-3 md:gap-y-0 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Dropp</span>
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
                                selectedTable?._id === s?._id
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
            {filterLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#6D6D6D"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <>
                <p className="font_medium">Reset</p>
              </>
            )}
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

      <div className="w-full h-svh lg:overflow-hidden p-4 bg-white">
        <div
          ref={ref}
          className="kitchen-div rounded-2xl w-full p-0 h-full overflow-x-scroll pb-3"
        >
          <div className="snap-x md:snap-none snap-mandatory flex flex-row w-fit h-full gap-x-5 no-scroll-bar">
            {/* NEW ORDERS */}
            <KitchenBoard
              restaurantOrders={filteredColumns["pending"] || []}
              title="New orders"
              headerBg="primary_bg_color"
              bodyBg="bg_pink"
              status="pending"
              getMore={loadMore}
              hasMore={hasMore?.pending}
              columnCount={columnCount.pending}
              orders={
                filteredColumns["pending"] &&
                filteredColumns["pending"]?.length > 0 &&
                filteredColumns["pending"]
                  ?.filter(
                    (ro) =>
                      ro?.parentStatus === "kitchen" && ro?.status === "pending"
                  )
                  ?.map((order: any) => (
                    <KitchenCard
                      key={order?._id}
                      order={order}
                      restaurantOrders={columns["pending"]}
                      filteredRestaurantOrders={filteredColumns["pending"]}
                      title={"New orders"}
                      kitchenCardButtons={[
                        <KitchenButton
                          title="Start Cooking"
                          extraClasses="mt-2 text-red-600 bg-red-100 border-red-600"
                          loading={currentOrder === order?._id}
                          onClick={() =>
                            handleStartCooking(order?.parent, order?._id)
                          }
                        />,
                        <KitchenButton
                          title="Decline"
                          extraClasses="mt-2 text-red-600 bg-red-100 border-red-600"
                          loading={currentOrder === order?._id}
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
              restaurantOrders={filteredColumns["cooking"] || []}
              title="Cooking"
              headerBg="bg-zinc-500"
              bodyBg="bg-zinc-200"
              status="cooking"
              getMore={loadMore}
              hasMore={hasMore?.cooking}
              columnCount={columnCount.cooking}
              orders={
                filteredColumns["cooking"] &&
                filteredColumns["cooking"]?.length > 0 &&
                filteredColumns["cooking"]
                  ?.filter(
                    (ro) =>
                      ro?.parentStatus === "kitchen" && ro?.status === "cooking"
                  )
                  ?.map((order: any, i) => (
                    <KitchenCard
                      key={i}
                      order={order}
                      restaurantOrders={columns["cooking"]}
                      filteredRestaurantOrders={filteredColumns["cooking"]}
                      title={"Cooking"}
                      kitchenCardButtons={[
                        <KitchenButton
                          title="Ready For Pickup"
                          extraClasses="mt-2 bg_kitchen_ready border_kitchen_ready text_kitchen_ready"
                          loading={currentOrder === order?._id}
                          onClick={() =>
                            handleReadyForPickup(order?.parent, order?._id)
                          }
                        />,
                        <KitchenButton
                          title="Void"
                          extraClasses="mt-2 bg_kitchen_ready border_kitchen_ready text_kitchen_ready"
                          loading={currentOrder === order?._id}
                          onClick={() => {
                            handleVoided(
                              order?.parent,
                              order?._id,
                              order?.status
                            );
                          }}
                        />,
                      ]}
                    />
                  ))
              }
            />

            {/* READY */}
            <KitchenBoard
              restaurantOrders={filteredColumns["ready"] || []}
              title="Ready for pickup"
              headerBg="bg-green-600"
              bodyBg="bg-green-100"
              status="ready"
              getMore={loadMore}
              hasMore={hasMore?.ready}
              columnCount={columnCount.ready}
              orders={
                filteredColumns["ready"] &&
                filteredColumns["ready"]?.length > 0 &&
                filteredColumns["ready"]
                  ?.filter(
                    (ro) =>
                      ro?.parentStatus === "kitchen" && ro?.status === "ready"
                  )
                  ?.map((order: any, i) => (
                    <KitchenCard
                      key={i}
                      order={order}
                      restaurantOrders={columns["ready"]}
                      filteredRestaurantOrders={filteredColumns["ready"]}
                      title={"Ready for pickup"}
                      kitchenCardButtons={[
                        <KitchenButton
                          title="Sent"
                          extraClasses="mt-2 text-green-600 bg-green-100 border-green-600"
                          loading={currentOrder === order?._id}
                          onClick={() => handleSent(order?.parent, order?._id)}
                        />,
                        <KitchenButton
                          title="Void"
                          extraClasses="mt-2 text-green-600 bg-green-100 border-green-600"
                          loading={currentOrder === order?._id}
                          onClick={() => {
                            handleVoided(
                              order?.parent,
                              order?._id,
                              order?.status
                            );
                          }}
                        />,
                      ]}
                    />
                  ))
              }
            />

            {/* COMPLETED */}
            <KitchenBoard
              restaurantOrders={
                filteredColumns["completed"] || filteredColumns["sent"]
                  ? [
                      ...filteredColumns["completed"],
                      ...filteredColumns["sent"],
                    ]
                  : []
              }
              title="Completed"
              headerBg="bg-green-900"
              bodyBg="bg-gray-100"
              status="completed"
              getMore={loadMore}
              hasMore={hasMore?.completed}
              columnCount={columnCount.completed + columnCount.sent}
              orders={
                filteredColumns["completed"] &&
                filteredColumns["completed"]?.length > 0 &&
                filteredColumns["completed"]
                  ?.filter(
                    (ro) =>
                      ro?.parentStatus === "completed" &&
                      ro?.status === "completed"
                  )
                  ?.map((order: any, i) => (
                    <KitchenCard
                      key={i}
                      order={order}
                      restaurantOrders={columns["completed"]}
                      filteredRestaurantOrders={filteredColumns["completed"]}
                      title={"Completed"}
                    />
                  ))
              }
            />

            {/* DECLINE */}
            <KitchenBoard
              restaurantOrders={filteredColumns["declined"] || []}
              title="Decline"
              headerBg="bg-red-900"
              bodyBg="bg-red-100"
              status="declined"
              getMore={loadMore}
              hasMore={hasMore?.declined}
              columnCount={columnCount.declined}
              orders={
                filteredColumns["declined"] &&
                filteredColumns["declined"]?.length > 0 &&
                filteredColumns["declined"]
                  ?.filter(
                    (ro) =>
                      ro?.parentStatus === "kitchen" &&
                      ro?.status === "declined"
                  )
                  ?.map((order: any, i) => (
                    <KitchenCard
                      key={i}
                      order={order}
                      restaurantOrders={columns["declined"]}
                      filteredRestaurantOrders={filteredColumns["declined"]}
                      title={"Decline"}
                    />
                  ))
              }
            />

            {/* VOIDED */}
            <KitchenBoard
              restaurantOrders={filteredColumns["archived"] || []}
              title="Void"
              headerBg="bg-black"
              bodyBg="bg-neutral-100"
              status="archived"
              getMore={loadMore}
              hasMore={hasMore?.archived}
              columnCount={columnCount.archived}
              orders={
                filteredColumns["archived"] &&
                filteredColumns["archived"]?.length > 0 &&
                filteredColumns["archived"]
                  ?.filter(
                    (ro) =>
                      ro?.parentStatus === "kitchen" &&
                      ro?.status === "archived"
                  )
                  ?.map((order: any, i) => (
                    <KitchenCard
                      key={i}
                      order={order}
                      restaurantOrders={columns["archived"]}
                      filteredRestaurantOrders={filteredColumns["archived"]}
                      title={"Void"}
                    />
                  ))
              }
            />
          </div>
        </div>
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
