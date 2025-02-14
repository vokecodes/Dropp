// @ts-nocheck
import { useState, useEffect, useRef, Fragment } from "react";
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
import { Divider, Modal } from "@mui/material";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import InfinityScroll from "../../components/InfinityScroll";
import { DashboardItemSkeletonLoader } from "../../components/DashboardItemSkeletonLoader";
import { Popover, Transition, RadioGroup } from "@headlessui/react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { formatRemoteAmountKobo, toTitleCase } from "../../utils/formatMethods";
import { IoSearchSharp } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

const statusOptions = ["pending", "kitchen", "completed"];

const ChefDineIn = () => {
  const dispatch = useAppDispatch();

  const { table } = useSelector(
    (state: any) => ({
      table: state.table.table,
      // restaurantOrders: state.orders.restaurantOrders,
    }),
    shallowEqual
  );

  const ref = useRef("");

  const [restaurantOrders, setRestaurantOrders] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [tableCount, setTableCount] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState("All orders");
  const [q, setQ] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getRestaurantOrders = async (currentPage = page, searchText = "") => {
    let searchTable = "";
    if (selectedTable !== "All orders") {
      searchTable = table.filter((item) => item?.table === selectedTable)[0]
        ._id;
    }

    SERVER.get(
      `${RESTAURANT_ORDER_URL}/all-restaurant?page=${currentPage}&table=${searchTable}&searchText=${searchText}`
    )
      .then(({ data }) => {
        if (currentPage === 1) {
          setRestaurantOrders(data.data);
        } else {
          setRestaurantOrders((prevColumns: any) => {
            const updatedColumns = [...prevColumns];
            let newArr = [];

            const existingIds = new Set(updatedColumns.map((item) => item.id));

            const newItems = data?.data.filter(
              (item) => !existingIds.has(item.id)
            );

            newArr = [...updatedColumns, ...newItems];

            return newArr;
          });
        }

        const totalCount = searchText
          ? Object.keys(data.orderCountByTable).reduce(
              (a, c) => (a += data.orderCountByTable[c]),
              0
            )
          : data.pagination.allOrdersCount;

        setTableCount({ ...data.orderCountByTable, totalCount: totalCount });
        setPage(currentPage + 1);

        setHasMore(
          data.pagination.totalPages > 0 &&
            data.pagination.currentPage < data.pagination.totalPages
        );
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getRestaurantOrders(1);
  }, [selectedTable]);

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    setQ(value);

    setLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      getRestaurantOrders(1, value || "");
    }, 1000);
  };

  const [openApprovalModal, setOpenApprovalModal] = useState(false);
  const closeApprovalModal = () => {
    setOpenApprovalModal(false);
  };
  const [approvalOrder, setApprovalOrder] = useState({});
  const [isSending, setIsSending] = useState(false);

  const handleApprovalOrder = () => {
    setIsSending(true);
    SERVER.patch(`${RESTAURANT_ORDER_URL}/status/${approvalOrder.id}`, {
      order: { ...approvalOrder },
    })
      .then(({ data }) => {
        getRestaurantOrders(1);
        closeApprovalModal();
        setApprovalOrder({});
      })
      .catch((error) => {})
      .finally(() => {
        setIsSending(false);
      });
  };

  const updateApprovalOrder = (item: string, menuId: string) => {
    setApprovalOrder((prevApprovalOrder: any) => {
      return {
        ...prevApprovalOrder,
        order: prevApprovalOrder?.order?.map((menu: any) => {
          if (menu.id === menuId) {
            if (item === "void" && menu.status !== "archived") {
              return { ...menu, status: "archived", prevStatus: menu.status };
            }

            const isArchived = menu.status === "archived";
            const shouldRestore =
              isArchived &&
              (menu?.prevStatus === "archived" || !menu?.prevStatus);
            const restoreStatus =
              isArchived && menu?.prevStatus ? menu?.prevStatus : menu.status;

            if (item === "pending") {
              return {
                ...menu,
                salesType: "pending",
                status: shouldRestore ? "pending" : restoreStatus,
              };
            }

            if (["sales", "gift"].includes(item)) {
              return {
                ...menu,
                salesType: item,
                status: shouldRestore ? "pending" : restoreStatus,
              };
            }
          }

          return menu;
        }),
      };
    });
  };

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

  const sortByUpdatedAt = (arr) => {
    return arr.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  };

  const [filteredOrders, setFilteredOrders] = useState([]);

  const sortedByDate = restaurantOrders && sortByUpdatedAt(filteredOrders);

  const statusFiltered =
    selectedStatus === "All"
      ? sortedByDate
      : sortedByDate.filter((item) => {
          return selectedStatus === "void"
            ? item?.status === "archived"
            : item?.status === selectedStatus;
        });

  useEffect(() => {
    const updateOrders = () => {
      const localOrders = restaurantOrders
        .filter((o) => !o.parentOrder)
        .map((item) => {
          // Helper function to transform orders
          const transformOrders = (orderArray, parent) =>
            orderArray.map((obj) => ({
              ...obj,
              parentPaid: (parent?.paid && !parent?.posPayment) ?? null,
              parentId: parent?.id ?? null,
              parentStatus: parent?.status ?? null,
            }));

          // Process parent orders
          let updatedOrder = transformOrders(item.order || [], item);

          // Process children orders only if not already included
          if (item?.children?.length) {
            const childrenOrders = item.children.flatMap((child) =>
              transformOrders(child.order || [], child)
            );

            // Combine parent and child orders without duplicating existing orders
            const orderSet = new Set(updatedOrder.map((o) => o.id)); // Use `id` as a unique key
            childrenOrders.forEach((childOrder) => {
              if (!orderSet.has(childOrder.id)) {
                updatedOrder.push(childOrder);
                orderSet.add(childOrder.id);
              }
            });
          }

          // Calculate unresolved count
          const unresolvedCount = updatedOrder.filter(
            (elem) =>
              elem.salesType !== "sales" &&
              elem.salesType !== "gift" &&
              elem.status !== "archived"
          ).length;

          // Determine approval status
          const getApprovalStatus = () => {
            if (updatedOrder.length === 0) return "Pending";
            if (unresolvedCount === 0) return "Confirmed";
            if (unresolvedCount > 0 && unresolvedCount < updatedOrder.length)
              return "Unresolved";
            return "Pending";
          };

          return {
            ...item,
            order: updatedOrder,
            approvalStatus: getApprovalStatus(),
          };
        });

      return localOrders;
    };

    const updatedOrders = updateOrders();
    // Assuming there's a state setter or function to save updated orders
    setFilteredOrders([...updatedOrders]);
  }, [table, restaurantOrders]);

  const dineInConvertToCSV = (data: any) => {
    const header = [
      "Ticket No.",
      "Date",
      "Time",
      "Name",
      "Email",
      "Phone No.",
      "Table",
      "Food",
      "Total Orders",
      "Waiter",
      "Amount",
      "Payment",
      "Status",
    ].join(",");

    const rows = data
      .filter((order: any) => order.createdAt)
      ?.map((order: any) => {
        const formattedDate = moment(order.createdAt).format("DD/MM/YYYY");
        const formattedTime = moment(order.createdAt).format("hh:mm A");

        const foodDetails = order.cartMenu
          ?.map(
            (menu: any) => `${menu.foodName} X ${menu.quantity}- ₦${menu.price}`
          )
          .join("; ");

        const totalMeal = order?.cartMenu?.reduce(
          (total: any, item: any) => total + item.quantity,
          0
        );

        return [
          `#${order.id.substring(order?.id?.length - 5)}`,
          formattedDate,
          formattedTime,
          order?.name || "-",
          order?.email || "-",
          order?.phoneNumber || "-",
          order?.table?.table || "-",
          foodDetails,
          totalMeal,
          order?.table?.employeeAssigned || "-",
          `₦${order?.totalAmount}`,
          order?.posPayment ? "POS" : "Online",
          order?.gift === true
            ? "gift"
            : order?.order[0].status === "archived"
            ? "void"
            : order?.order[0].status,
        ].join(",");
      });

    return [header, ...rows].join("\n");
  };

  const dineExportToCSV = async (data: any) => {
    // Set downloading state to true
    setIsDownloading(true);

    // Wait for the download operation to complete
    try {
      const searchText = ref.current.value || "";

      let searchTable = "";
      if (selectedTable !== "All orders") {
        searchTable = table.filter((item) => item?.table === selectedTable)[0]
          ._id;
      }

      // Start the API call and handle the response
      const { data: apiData } = await SERVER.get(
        `${RESTAURANT_ORDER_URL}/all-restaurant/download?table=${searchTable}&searchText=${searchText}`
      );

      // Convert data to CSV format
      const csv = await dineInConvertToCSV(apiData?.data);

      // Create and trigger the CSV file download
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "dine-in-orders.csv");
        link.style.visibility = "hidden";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error("CSV Export Error:", err);
    } finally {
      // Set downloading state to false after the operation completes
      setIsDownloading(false);
    }
  };

  const tableContainerRef = useRef<any>(null);

  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft -= 500;
    }
  };

  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft += 500;
    }
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
                      className="flex flex-row h-fit w-full px-2 pb-1 rounded my-1 gap-x-3 overflow-x-scroll reduce-scrollbar"
                      style={{ maxHeight: "250px" }}
                    >
                      <div
                        className={`flex flex-row justify-between items-center w-fit h-fit py-2 px-4 my-1 gap-x-1 rounded-full shrink-0 cursor-pointer ${
                          selectedTable === "All orders"
                            ? "primary_bg_color text-white"
                            : "bg_sec_gray_color text-gray-600"
                        }`}
                        onClick={() => {
                          setLoading(true);
                          setSelectedTable("All orders");
                        }}
                      >
                        <div className="flex flex-row justify-between items-center">
                          <div className="ml-1 flex flex-row justify-between items-center">
                            <p className="text-xs font-bold font_regular">
                              All orders
                            </p>
                            <div
                              className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center ${
                                selectedTable === "All orders"
                                  ? "bg-[#0E311B]"
                                  : "bg-white"
                              }`}
                            >
                              <p
                                className={`text-xs font_medium ${
                                  selectedTable === "All orders"
                                    ? "text-white"
                                    : "primary_txt_color"
                                }`}
                              >
                                {tableCount && tableCount.totalCount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {Object.keys(tableCount)
                        .filter(
                          (item) =>
                            item &&
                            item !== "All orders" &&
                            item !== "undefined" &&
                            !Number.isNaN(Number(item))
                        )
                        .map((cat: any, i: number) => (
                          <div
                            key={i}
                            className={`flex flex-row justify-between items-center w-fit h-fit py-2 px-4 my-1 gap-x-1 rounded-full shrink-0 cursor-pointer ${
                              selectedTable === cat
                                ? "primary_bg_color text-white"
                                : "bg_sec_gray_color text-gray-600"
                            }`}
                            onClick={() => {
                              setLoading(true);
                              setSelectedTable(cat);
                            }}
                          >
                            <div className="flex flex-row justify-between items-center">
                              <div className="ml-1 flex flex-row justify-between items-center">
                                <p className="text-xs font-bold font_regular">
                                  {`${cat}`}
                                </p>
                                <div
                                  className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center ${
                                    selectedTable === cat
                                      ? "bg-[#0E311B]"
                                      : "bg-white"
                                  }`}
                                >
                                  <p
                                    className={`text-xs font_medium ${
                                      selectedTable === cat
                                        ? "text-white"
                                        : "primary_txt_color"
                                    }`}
                                  >
                                    {tableCount && tableCount[cat]}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="w-full bg-white border border-[#E1E1E1] rounded-xl p-2 lg:p-6">
                  <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-center gap-y-3">
                    <div className="flex gap-3">
                      <div className="w-fit bg-white rounded-full pl-18 pr-20 flex items-center justify-between w-fit border border-neutral-200">
                        <div className="p-2">
                          <IoSearchSharp color="#D6D6D6" size={20} />
                        </div>
                        <div className="flex-1 ml-4">
                          <input
                            ref={ref}
                            placeholder="Search orders"
                            className="py-2 w-full rounded-full input_text text-md font_regular outline-none"
                            value={q}
                            onChange={handleSearchChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div
                        className="py-2 px-4 w-36 h-10 flex items-center justify-center gap-3 rounded-full cursor-pointer text-black bg-[#EDECEC]"
                        onClick={() => {
                          dineExportToCSV();
                        }}
                      >
                        {isDownloading ? (
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

                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-[#EDECEC]"
                        onClick={scrollLeft}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="#6D6D6D"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                          />
                        </svg>
                      </div>
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-[#EDECEC]"
                        onClick={scrollRight}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="#6D6D6D"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {dashboardLoading || loading ? (
                    <div className="my-4 grid grid-cols-2 gap-3">
                      {[...Array(4)]?.map((_, i) => (
                        <DashboardItemSkeletonLoader key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="w-full mt-4 flow-root overflow-hidden">
                      <InfinityScroll
                        data={restaurantOrders}
                        getMore={getRestaurantOrders}
                        hasMore={hasMore}
                      >
                        <div
                          ref={tableContainerRef}
                          className="-my-2 overflow-x-auto"
                        >
                          <div className="inline-block min-w-full py-2 align-middle">
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-300 h-auto min-h-48">
                                {/* Table headers */}
                                <thead>
                                  <tr>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left text-sm font_medium text-black font-normal sm:pl-0 min-w-[100px]"
                                    >
                                      Ticket No.
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[100px]"
                                    >
                                      Date
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[100px]"
                                    >
                                      Time
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[150px] max-w-[250px]"
                                    >
                                      Name
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[200px]"
                                    >
                                      Email
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[150px]"
                                    >
                                      Phone No.
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[100px]"
                                    >
                                      Table
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[150px]"
                                    >
                                      Approval
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[200px]"
                                    >
                                      Food
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[100px]"
                                    >
                                      Total Orders
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[150px]"
                                    >
                                      Amount
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[120px]"
                                    >
                                      Payment
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[120px]"
                                    >
                                      Platform
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[150px]"
                                    >
                                      <Popover className="relative">
                                        {({ open }) => (
                                          <>
                                            <Popover.Button
                                              className={`flex flex-row items-center space-between gap-x-1`}
                                            >
                                              <span className="text-nowrap">
                                                Status
                                              </span>
                                              {open ? (
                                                <BiSolidUpArrow />
                                              ) : (
                                                <BiSolidDownArrow />
                                              )}
                                            </Popover.Button>

                                            <Transition
                                              as={Fragment}
                                              enter="transition ease-out duration-200"
                                              enterFrom="opacity-0 translate-y-1"
                                              enterTo="opacity-100 translate-y-0"
                                              leave="transition ease-in duration-150"
                                              leaveFrom="opacity-100 translate-y-0"
                                              leaveTo="opacity-0 translate-y-1"
                                            >
                                              <Popover.Panel className="box-border absolute -left-10 z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black">
                                                <div className="w-full">
                                                  <RadioGroup
                                                    value={selectedStatus}
                                                    onChange={setSelectedStatus}
                                                  >
                                                    <div className="space-y-3">
                                                      <RadioGroup.Option
                                                        value={"All"}
                                                        className={
                                                          "flex items-center cursor-pointer mb-2"
                                                        }
                                                        onClick={() =>
                                                          setSelectedStatus(
                                                            "All"
                                                          )
                                                        }
                                                      >
                                                        {({
                                                          active,
                                                          checked,
                                                        }) => (
                                                          <>
                                                            <div
                                                              className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                                                checked
                                                                  ? "primary_bg_color"
                                                                  : "bg_gray_color"
                                                              }`}
                                                            />

                                                            <div className="text-sm">
                                                              <RadioGroup.Label
                                                                as="p"
                                                                className={`text-xs lg:text-sm secondary_gray_color text-black`}
                                                              >
                                                                All
                                                              </RadioGroup.Label>
                                                            </div>
                                                          </>
                                                        )}
                                                      </RadioGroup.Option>
                                                      {statusOptions?.map(
                                                        (item: any, i) => (
                                                          <RadioGroup.Option
                                                            key={item}
                                                            value={item}
                                                            className={
                                                              "flex items-center cursor-pointer mb-2"
                                                            }
                                                            onClick={() =>
                                                              setSelectedStatus(
                                                                item
                                                              )
                                                            }
                                                          >
                                                            {({
                                                              active,
                                                              checked,
                                                            }) => (
                                                              <>
                                                                <div
                                                                  className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                                                    checked
                                                                      ? "primary_bg_color"
                                                                      : "bg_gray_color"
                                                                  }`}
                                                                />

                                                                <div className="text-sm">
                                                                  <RadioGroup.Label
                                                                    as="p"
                                                                    className={`text-xs lg:text-sm secondary_gray_color text-black`}
                                                                  >
                                                                    {toTitleCase(
                                                                      item
                                                                    )}
                                                                  </RadioGroup.Label>
                                                                </div>
                                                              </>
                                                            )}
                                                          </RadioGroup.Option>
                                                        )
                                                      )}
                                                    </div>
                                                  </RadioGroup>
                                                </div>
                                              </Popover.Panel>
                                            </Transition>
                                          </>
                                        )}
                                      </Popover>
                                    </th>
                                  </tr>
                                </thead>
                                {/* Table body */}
                                <tbody className="divide-y divide-gray-200">
                                  {statusFiltered
                                    ?.filter((item) => !item.parentOrder)
                                    .map((transaction: any, i: number) => (
                                      <tr key={transaction.id + i}>
                                        <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                          #{transaction.id?.slice(-5)}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                          {moment(
                                            transaction?.createdAt
                                          ).format("DD/MM/YYYY")}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                          {moment(
                                            transaction?.createdAt
                                          ).format("hh:mm A")}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 w-auto min-w-[150px] max-w-[250px] text-wrap">
                                          {transaction?.name}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[200px] text-wrap">
                                          {transaction?.email}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[150px]">
                                          {transaction?.phoneNumber}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 text-left text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                          {transaction?.table?.table}
                                        </td>
                                        <td
                                          className="whitespace-nowrap py-4 pl-0 text-left text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[150px] cursor-pointer"
                                          onClick={() => {
                                            setApprovalOrder(transaction);
                                            setOpenApprovalModal(true);
                                          }}
                                        >
                                          <p
                                            className={`w-fit text-xs text-medium bg-[#ffffff] border border-solid px-3 py-1 text-center rounded-3xl flex flex-row items-center justify-center gap-x-1 ${
                                              transaction?.approvalStatus ===
                                              "Confirmed"
                                                ? "text-[#06C167] border-[#06C167]"
                                                : transaction?.approvalStatus ===
                                                  "Unresolved"
                                                ? "text-[#DB4E12] border-[#DB4E12]"
                                                : "text-[#000000] border-[#D8D8D8]"
                                            }`}
                                          >
                                            {transaction?.approvalStatus}{" "}
                                            <MdKeyboardArrowRight size={20} />
                                          </p>
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 w-auto min-w-[200px] max-w-[250px] text-wrap">
                                          {transaction?.order?.map(
                                            (menu: any, i) => (
                                              <div
                                                key={i}
                                                className={`flex items-center ${
                                                  menu?.status === "archived" &&
                                                  "opacity-25"
                                                }`}
                                              >
                                                {menu?.menu &&
                                                  menu?.menu.images.length >
                                                    0 && (
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                      <img
                                                        className="h-10 w-10 rounded-full object-cover"
                                                        src={
                                                          menu?.menu.images[0]
                                                        }
                                                        alt=""
                                                      />
                                                    </div>
                                                  )}
                                                <div className="ml-4">
                                                  <div className="font-medium text-wrap">
                                                    {menu?.menu?.foodName} X{" "}
                                                    {menu?.quantity}
                                                  </div>
                                                  <div className="">
                                                    ₦
                                                    {parseInt(
                                                      menu?.menu?.eventAmount
                                                        ? menu?.menu
                                                            ?.eventAmount
                                                        : menu?.menu?.discount
                                                        ? menu.menu?.price -
                                                          (menu.menu?.price /
                                                            100) *
                                                            menu.menu?.discount
                                                        : menu.menu?.price
                                                    ).toLocaleString()}
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                          {transaction?.order?.reduce(
                                            (total: any, item: any) =>
                                              total + item.quantity,
                                            0
                                          )}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[150px]">
                                          {
                                            formatRemoteAmountKobo(
                                              transaction?.order
                                                .filter(
                                                  (item) =>
                                                    item.status !== "archived"
                                                )
                                                .reduce(
                                                  (acc, curr) =>
                                                    curr.menu?.discount
                                                      ? acc +
                                                        curr.amount -
                                                        curr.amount *
                                                          (curr.menu?.discount /
                                                            100)
                                                      : acc + curr.amount,
                                                  0
                                                )
                                            ).naira
                                          }
                                          {
                                            formatRemoteAmountKobo(
                                              transaction?.order
                                                .filter(
                                                  (item) =>
                                                    item.status !== "archived"
                                                )
                                                .reduce(
                                                  (acc, curr) =>
                                                    curr.menu?.discount
                                                      ? acc +
                                                        curr.amount -
                                                        curr.amount *
                                                          (curr.menu?.discount /
                                                            100)
                                                      : acc + curr.amount,
                                                  0
                                                )
                                            ).kobo
                                          }
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[120px]">
                                          {transaction?.posPayment
                                            ? "POS"
                                            : "Online"}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[120px]">
                                          {transaction?.restaurant
                                            ? "Dine-in"
                                            : "Online"}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-0 font_medium lg:pl-3 min-w-[150px] h-full">
                                          {transaction?.status === "pending" ? (
                                            <p className="w-fit text-xs text-medium text-[#000000] border border-solid border-[#000000] bg-[#ffffff] px-3 py-1 text-center rounded-3xl">
                                              Pending
                                            </p>
                                          ) : transaction?.restaurant &&
                                            transaction?.status ===
                                              "completed" ? (
                                            <p className="w-fit text-xs text-medium text-[#ffffff] border border-solid border_credit_color primary_bg_color px-3 py-1 text-center rounded-3xl">
                                              Completed
                                            </p>
                                          ) : (
                                            <p className="w-fit text-xs text-medium text-[#000000] border border-solid border-[#000000] bg-[#ffffff] px-3 py-1 text-center rounded-3xl">
                                              Kitchen
                                            </p>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </InfinityScroll>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* APPROVAL */}
          <Modal
            // open={true}
            open={openApprovalModal}
            onClose={closeApprovalModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-y-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <div className="flex">
                <p className="flex-1 text-xl text-start font_bold black2">
                  Payment Approval
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeApprovalModal}
                />
              </div>

              <div className="flex flex-col justify-between items-stretch mt-3 w-full h-5/6 relative">
                <div className="w-full flex flex-col items-stretch justify-between gap-y-2">
                  {approvalOrder?.order?.map((menu: any, i) => (
                    <div
                      key={i}
                      className="w-full flex flex-row justify-between items-center"
                    >
                      <div className="w-2/3 flex flex-row items-center justify-start">
                        <div className="h-10 w-10 flex-shrink-0">
                          {menu?.menu && menu?.menu?.images?.length > 0 && (
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={menu?.menu.images[0]}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="font-bold text-wrap text-sm">
                            {menu?.menu?.foodName} X {menu?.quantity}
                          </div>
                          <div className="text-sm">
                            ₦
                            {parseInt(
                              menu?.menu?.eventAmount
                                ? menu?.menu?.eventAmount
                                : menu?.menu?.discount
                                ? menu?.menu?.price -
                                  (menu?.menu?.price / 100) *
                                    menu?.menu?.discount
                                : menu?.menu?.price
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="w-1/3 h-full flex flex-col items-end justify-center">
                        <Popover className="relative">
                          <Popover.Button
                            className={`w-fit text-xs text-medium border border-solid px-3 py-2 text-center rounded-xl flex flex-row items-center justify-center gap-x-1 
                            ${
                              menu?.salesType === "sales" &&
                              menu?.status !== "archived"
                                ? "text-[#ffffff] primary_bg_color"
                                : (menu?.salesType === "gift" ||
                                    approvalOrder.gift === true) &&
                                  menu?.status !== "archived"
                                ? "text-[#EAAC29] bg-[#FFFAED] border-[#EAAC29]"
                                : menu?.status === "archived"
                                ? "text-[#C10606] bg-[#FFF5F5] border-[#C10606]"
                                : "text-[#000000] bg-[#ffffff] border-[#D8D8D8]"
                            }
                            `}
                            disabled={
                              menu.parentPaid ||
                              (approvalOrder.approvalStatus === "Confirmed" &&
                                menu.parentStatus === "completed")
                            }
                          >
                            {menu?.salesType === "sales" &&
                            menu?.status !== "archived"
                              ? "Sales"
                              : (menu?.salesType === "gift" ||
                                  approvalOrder.gift === true) &&
                                menu?.status !== "archived"
                              ? "Gift"
                              : menu?.status === "archived" ||
                                approvalOrder.status === "archived"
                              ? "Void"
                              : "Pending"}{" "}
                            <IoIosArrowDown
                              size={10}
                              className={
                                (menu.parentPaid ||
                                  (approvalOrder.approvalStatus ===
                                    "Confirmed" &&
                                    menu.parentStatus === "completed")) &&
                                "hidden"
                              }
                            />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="box-border absolute -left-16 z-10 bg-white mb-2 w-24 lg:w-32 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black">
                              <div className="w-full">
                                <RadioGroup
                                // value={menu?.salesType}
                                // onChange={setSelectedStatus}
                                >
                                  <div className="space-y-3">
                                    {["pending", "sales", "gift", "void"]?.map(
                                      (item: any, i) => (
                                        <RadioGroup.Option
                                          key={i + 82}
                                          value={item}
                                          className={
                                            "flex items-center cursor-pointer mb-2"
                                          }
                                          onClick={() => {
                                            updateApprovalOrder(item, menu.id);
                                          }}
                                        >
                                          {({ active, checked }) => (
                                            <>
                                              <div
                                                className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                                  ((!menu?.salesType ||
                                                    menu?.salesType ===
                                                      "pending") &&
                                                    item === "pending" &&
                                                    menu?.status !==
                                                      "archived") ||
                                                  (menu?.salesType ===
                                                    "sales" &&
                                                    item === "sales" &&
                                                    menu?.status !==
                                                      "archived") ||
                                                  (menu?.salesType === "gift" &&
                                                    item === "gift" &&
                                                    menu?.status !==
                                                      "archived") ||
                                                  (menu?.status ===
                                                    "archived" &&
                                                    item === "void")
                                                    ? "primary_bg_color"
                                                    : "bg_gray_color"
                                                }`}
                                              />

                                              <div className="text-sm">
                                                <RadioGroup.Label
                                                  as="p"
                                                  className={`text-xs lg:text-sm secondary_gray_color text-black capitalize`}
                                                >
                                                  {toTitleCase(item)}
                                                </RadioGroup.Label>
                                              </div>
                                            </>
                                          )}
                                        </RadioGroup.Option>
                                      )
                                    )}
                                  </div>
                                </RadioGroup>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </Popover>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full">
                  <button
                    className="primary_bg_color text-white rounded-full w-full py-2 text-semibold flex flex-row justify-center"
                    onClick={() => {
                      handleApprovalOrder();
                    }}
                  >
                    {isSending ? (
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
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          {/* REFUND */}
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
