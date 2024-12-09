import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Hotjar from "@hotjar/browser";
import moment from "moment";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import PageTitle from "../../components/PageTitle";
import { useAppDispatch } from "../../redux/hooks";
import { getRestaurantSubChefDashboardAccount } from "../../_redux/user/userAction";
import { formatRemoteAmountKobo } from "../../utils/formatMethods";
import {
  getSubChefOrdersPage,
  getSubChefRestaurantOrdersPage,
} from "../../_redux/user/userCrud";
import { subChefGetTables } from "../../_redux/table/tableAction";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { ClickAwayListener } from "@mui/material";
import { getSubChefRestaurantSections } from "../../_redux/section/sectionCrud";
import InfinityScroll from "../../components/InfinityScroll";

const PAYMENT_OPTIONS = ["All", "Online", "POS"];

const BannerSkeletonLoader = () => (
  <div className="p-6">
    <div className="flex gap-3 align-items-center">
      <Skeleton width={100} height={20} />
      <Skeleton circle width={30} height={30} />
    </div>
    <Skeleton width={150} height={40} style={{ marginTop: "10px" }} />
    <Skeleton width={150} height={20} style={{ marginTop: "10px" }} />
  </div>
);

const DashboardItemSkeletonLoader = () => (
  <div className="bg-[#F8F8F8] border border-[#E1E1E1] rounded-xl p-4">
    <div className="flex gap-2 align-items-center">
      <Skeleton width={100} height={20} />
      <Skeleton circle width={30} height={30} />
    </div>
    <Skeleton width={150} height={40} style={{ marginTop: "10px" }} />
    <Skeleton width={100} height={20} style={{ marginTop: "10px" }} />
  </div>
);

const platformOptions = ["Online", "Dine-in"];
const paymentOptions = ["POS", "Online"];
const typeOptions = ["Sales", "Gift"];
const statusOptions = ["Completed", "Kitchen", "Declined", "Void"];

const SalesReports = () => {
  const dispatch = useAppDispatch();
  const { user, dashboardLoading, dashboard, table } = useSelector(
    (state: any) => ({
      user: state.user.user,
      dashboardLoading: state.user.dashboardLoading,
      dashboard: state.user.dashboard,
      table: state.table.table,
    }),
    shallowEqual
  );

  const [section, setSection] = useState([]);

  const fetchSections = async () => {
    await getSubChefRestaurantSections()
      .then(({ data }) => {
        setSection(data.data);
      })
      .catch((err) => {
        const error = err?.response?.data;
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(subChefGetTables());
    fetchSections();
  }, []);

  useEffect(() => {
    Hotjar.identify(user?._id, {
      first_name: user?.firstName,
      last_name: user?.lastName,
    });
  }, [user]);

  const [selectedTable, setSelectedTable] = useState("Dine-in sales");

  const safeDivide = (a: any, b: any) => {
    if (b === 0) {
      return 0;
    }
    return a / b;
  };

  const dashboardItems = [
    {
      title: "Tickets",
      value: dashboard?.tickets,
      toolTipId: "tickets",
      toolTipContent: "Total number of checkouts",
    },
    {
      title: "Orders",
      value: dashboard?.orders,
      toolTipId: "orders",
      toolTipContent: "Total number of meals placed/checkout",
    },
    {
      title: "Avg. Order Size",
      value:
        formatRemoteAmountKobo(
          safeDivide(dashboard?.totalNetSales, dashboard?.orders)
        ).naira +
        formatRemoteAmountKobo(
          safeDivide(dashboard?.totalNetSales, dashboard?.orders)
        ).kobo,
      toolTipId: "avg-orders-size",
      toolTipContent: "Net sales divided by total orders",
    },
    {
      title: "Avg. Order",
      value: Math.round(safeDivide(dashboard?.orders, dashboard?.tickets)),
      toolTipId: "avg-order",
      toolTipContent: "Total orders divided by total tickets",
    },
    {
      title: "Avg. Ticket Size",
      value:
        formatRemoteAmountKobo(
          safeDivide(dashboard?.totalNetSales, dashboard?.tickets)
        ).naira +
        formatRemoteAmountKobo(
          safeDivide(dashboard?.totalNetSales, dashboard?.tickets)
        ).kobo,
      toolTipId: "avg-tickets-size",
      toolTipContent: "Total net sales divided by the total tickets",
    },
    {
      title: "Unique Customers",
      value: dashboard?.customers,
      toolTipId: "unique-customers",
      toolTipContent: "Customer counts",
    },
  ];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [openPaymentOptions, setOpenPaymentOptions] = useState(false);
  const [paymentType, setPaymentType] = useState(PAYMENT_OPTIONS[0]);

  const [openSectionOptions, setOpenSectionOptions] = useState(false);
  const [filterSection, setFilterSection] = useState("");
  const [selectedFilterSection, setSelectedFilterSection] = useState({
    _id: "",
    name: "All",
  });

  const [openTableOptions, setOpenTableOptions] = useState(false);
  const [filterTable, setFilterTable] = useState("");
  const [selectedFilterTable, setSelectedFilterTable] = useState({
    _id: "",
    table: "All",
  });
  const [ordersTransactions, setOrdersTransactions] = useState<any>([]); // Assuming transactions is your data array
  const [ordersHasMore, setOrdersHasMore] = useState(true); // Flag to track if there are more items to load
  const [ordersPage, setOrdersPage] = useState(1); // Page number for pagination

  const [transactions, setTransactions] = useState<any>([]); // Assuming transactions is your data array
  const [hasMore, setHasMore] = useState(true); // Flag to track if there are more items to load
  const [page, setPage] = useState(1); // Page number for pagination

  // Function to fetch more data when scrolling
  const fetchRestaurantOrders = async () => {
    await getSubChefRestaurantOrdersPage(
      page,
      startDate,
      endDate,
      paymentType,
      filterSection,
      filterTable
    ).then(({ data }) => {
      if (page === 1) {
        setTransactions(data.data);
      } else {
        setTransactions((prevTransactions: any) => [
          ...prevTransactions,
          ...data.data,
        ]);
      }
      setPage(page + 1);
      setHasMore(
        data.pagination.totalPages > 0 &&
          data.pagination.currentPage !== data.pagination.totalPages
      );
    });
  };

  const fetchOrders = async () => {
    await getSubChefOrdersPage(ordersPage, startDate, endDate).then(
      ({ data }) => {
        if (page === 1) {
          setOrdersTransactions(data.data);
        } else {
          setOrdersTransactions((prevTransactions: any) => [
            ...prevTransactions,
            ...data.data,
          ]);
        }
        setOrdersPage(ordersPage + 1);
        setOrdersHasMore(
          data.pagination.currentPage !== data.pagination.totalPages
        );
      }
    );
  };

  // Reset page and data when filters change
  const resetFilters = () => {
    setPage(1);
    setHasMore(true);
    setOrdersPage(1);
    setOrdersHasMore(true);
  };

  useEffect(() => {
    dispatch(
      getRestaurantSubChefDashboardAccount(
        startDate,
        endDate,
        paymentType,
        filterSection,
        filterTable
      )
    );
    fetchRestaurantOrders();
    fetchOrders();
  }, [endDate, paymentType, filterSection, filterTable]);

  const [isDownloading, setIsDownloading] = useState(false);

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
      .filter((order: any) =>
        startDate
          ? moment(order.createdAt).isSameOrAfter(startDate, "day")
          : order.createdAt
      )
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
          order?.status,
        ].join(",");
      });

    return [header, ...rows].join("\n");
  };

  const dineExportToCSV = async (data: any) => {
    setIsDownloading(true);
    try {
      const csv = await dineInConvertToCSV(data);

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
      setIsDownloading(false);
    }
  };

  const orderConvertToCSV = (data: any, startDate: any) => {
    const header = [
      "Ticket No.",
      "Date",
      "Time",
      "Name",
      "Email",
      "Phone No.",
      "Food",
      "Total Orders",
      "Amount",
      "Status",
    ].join(",");

    const rows = data
      .filter((order: any) =>
        startDate
          ? moment(order.createdAt).isSameOrAfter(startDate, "day")
          : order.createdAt
      )
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
          order.name || "-",
          order.email || "-",
          order.phoneNumber || "-",
          foodDetails,
          totalMeal,
          `₦${order.totalAmount}`,
          order.status,
        ].join(",");
      });

    return [header, ...rows].join("\n");
  };

  const orderExportToCSV = async (data: any) => {
    setIsDownloading(true);

    try {
      const csv = await orderConvertToCSV(data, startDate);

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");

      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "online-orders.csv");
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

  const ordersListUnsorted = ordersTransactions.concat(transactions);

  const ordersList = ordersListUnsorted.sort((a: any, b: any) =>
    moment(b.createdAt).diff(moment(a.createdAt))
  );

  const [selectedTableItem, setSelectedTableItem] = useState("");
  const filteredTable = !selectedTableItem
    ? ordersList
    : ordersList.filter((item: any, i: any) => {
        return item.table?.table == selectedTableItem;
      });

  const [selectedPayment, setSelectedPayment] = useState("");
  const filteredPayment = !selectedPayment
    ? filteredTable
    : filteredTable?.filter((item: any, i: any) => {
        if (selectedPayment === "POS") {
          return item?.posPayment == true;
        } else {
          return !item?.posPayment;
        }
      });

  const [selectedStatus, setSelectedStatus] = useState("");
  const filteredStatus = !selectedStatus
    ? filteredPayment
    : filteredPayment?.filter((item: any, i: any) => {
        if (item?.restaurant) {
          if (selectedStatus === "Void") {
            return item?.order[0]?.status === "archived";
          } else if (selectedStatus === "Kitchen") {
            return !["completed", "declined", "archived"].includes(
              item?.order[0]?.status
            );
          } else {
            return item?.order[0]?.status === selectedStatus.toLowerCase();
          }
        } else {
          return item?.status === selectedStatus.toLowerCase();
        }
      });

  const [selectedType, setSelectedType] = useState("");
  const filteredType = !selectedType
    ? filteredStatus
    : filteredStatus?.filter((item: any, i: any) => {
        if (selectedType === "Gift") {
          return item?.gift == true;
        } else {
          return !item?.gift;
        }
      });

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const filteredPlatform = !selectedPlatform
    ? filteredType
    : filteredType?.filter((item: any, i: any) => {
        if (selectedPlatform === "Dine-in") {
          return item?.restaurant;
        } else {
          return !item?.restaurant;
        }
      });

  const filteredOrders = filteredPlatform;

  const handleClickAway = (flag: string) => {
    if (flag === "payment") {
      setOpenPaymentOptions(false);
    } else if (flag === "section") {
      setOpenSectionOptions(false);
    } else if (flag === "table") {
      setOpenTableOptions(false);
    }
  };

  return (
    <>
      <ChefDashboardLayout>
        <div className="w-full px-6 py-4 bg-white" style={{}}>
          <PageTitle title={moment().format("MMMM Do, YYYY")} />
          <div className="w-4/5 my-10 flex flex-wrap gap-3">
            <div className="w-1/5">
              <label className="text-sm font_medium text-black">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="h-14 bg-[#F8F8F8] block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                placeholder="Start Date:"
                onChange={(e: any) => setStartDate(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label className="text-sm font_medium text-black">End Date</label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="h-14 bg-[#F8F8F8] block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                placeholder="End Date:"
                onChange={(e: any) => setEndDate(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label className="text-sm font_medium text-black">
                Payment Type
              </label>
              <div className="mt-2 lg:mt-0">
                <div
                  className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                  onClick={() => {
                    setOpenPaymentOptions(!openPaymentOptions);
                  }}
                >
                  <p className={`text-xs lg:text-sm filter_text font_medium`}>
                    {paymentType}
                  </p>
                  {openPaymentOptions ? (
                    <TiArrowSortedUp color="#8E8E8E" size={20} />
                  ) : (
                    <TiArrowSortedDown color="#8E8E8E" size={20} />
                  )}
                </div>
                {openPaymentOptions && (
                  <ClickAwayListener
                    onClickAway={() => handleClickAway("payment")}
                  >
                    <div
                      className={`absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                    >
                      {PAYMENT_OPTIONS?.map((payment: any, i: number) => (
                        <div
                          className="flex items-center cursor-pointer mb-2"
                          key={i}
                          onClick={() => {
                            resetFilters();
                            setPaymentType(payment);
                            setOpenPaymentOptions(false);
                          }}
                        >
                          <div
                            className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                              paymentType === payment
                                ? "primary_bg_color"
                                : "bg_gray_color"
                            }`}
                          />
                          <p
                            className={`text-xs lg:text-sm secondary_gray_color text-black`}
                          >
                            {payment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            </div>
            <div className="w-1/5">
              <label className="text-sm font_medium text-black">Section</label>
              <div className="mt-2 lg:mt-0">
                <div
                  // className="w-24 lg:w-36 h-10 filter_gray border calendarBorder rounded-full cursor-pointer px-3 flex items-center justify-between"
                  className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                  onClick={() => {
                    setOpenSectionOptions(!openSectionOptions);
                  }}
                >
                  <p className={`text-xs lg:text-sm filter_text font_medium`}>
                    {selectedFilterSection?.name}
                  </p>
                  {openSectionOptions ? (
                    <TiArrowSortedUp color="#8E8E8E" size={20} />
                  ) : (
                    <TiArrowSortedDown color="#8E8E8E" size={20} />
                  )}
                </div>
                {openSectionOptions && (
                  <ClickAwayListener
                    onClickAway={() => handleClickAway("section")}
                  >
                    <div
                      className={`absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                    >
                      <div
                        className="flex items-center cursor-pointer mb-2"
                        onClick={() => {
                          resetFilters();
                          setSelectedFilterSection({ _id: "", name: "All" });
                          setFilterSection("");
                          setOpenSectionOptions(false);
                        }}
                      >
                        <div
                          className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                            selectedFilterSection?._id === ""
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
                      {section?.length > 0 &&
                        section?.map((s: any, i: number) => (
                          <div
                            className="flex items-center cursor-pointer mb-2"
                            key={i}
                            onClick={() => {
                              resetFilters();
                              setSelectedFilterSection(s);
                              setFilterSection(s._id);
                              setOpenSectionOptions(false);
                            }}
                          >
                            <div
                              className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                selectedFilterSection?._id === s._id
                                  ? "primary_bg_color"
                                  : "bg_gray_color"
                              }`}
                            />
                            <p
                              className={`text-xs lg:text-sm secondary_gray_color text-black`}
                            >
                              {s.name}
                            </p>
                          </div>
                        ))}
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            </div>
            <div className="w-1/5">
              <label className="text-sm font_medium text-black">Table</label>
              <div
                className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                onClick={() => setOpenTableOptions(!openTableOptions)}
              >
                <p className={`text-xs lg:text-sm filter_text font_medium`}>
                  {selectedFilterTable?.table}
                </p>
                {openTableOptions ? (
                  <TiArrowSortedUp color="#8E8E8E" size={20} />
                ) : (
                  <TiArrowSortedDown color="#8E8E8E" size={20} />
                )}
              </div>
              {openTableOptions && (
                <ClickAwayListener onClickAway={() => handleClickAway("table")}>
                  <div
                    className={`absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                  >
                    <div
                      className="flex items-center cursor-pointer mb-2"
                      onClick={() => {
                        resetFilters();
                        setSelectedFilterTable({ _id: "", table: "All" });
                        setFilterTable("");
                        setOpenSectionOptions(false);
                      }}
                    >
                      <div
                        className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                          selectedFilterTable?._id === ""
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
                      table?.map((s: any, i: number) => (
                        <div
                          className="flex items-center cursor-pointer mb-2"
                          key={i}
                          onClick={() => {
                            resetFilters();
                            setSelectedFilterTable(s);
                            setFilterTable(s._id);
                            setOpenTableOptions(false);
                          }}
                        >
                          <div
                            className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                              selectedFilterTable?._id === s._id
                                ? "primary_bg_color"
                                : "bg_gray_color"
                            }`}
                          />
                          <p
                            className={`text-xs lg:text-sm secondary_gray_color text-black`}
                          >
                            {s.table}
                          </p>
                        </div>
                      ))}
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
          <div className="my-4 bg-[#FDEEF0] rounded-xl flex justify-between">
            {dashboardLoading ? (
              <BannerSkeletonLoader />
            ) : (
              <div className="p-6">
                <div className="flex gap-3 align-items-center">
                  <p className="text-base text-black font_medium">Net Sales</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#F78F9B"
                    className="size-5"
                    data-tooltip-id="net-sales"
                    data-tooltip-content="Gross sales minus platform fees."
                    data-tooltip-place="right-end"
                    data-tooltip-class="bg-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Tooltip id="net-sales" />
                </div>
                <p className="my-3 text-3xl text-[#06c167] font_medium">
                  {formatRemoteAmountKobo(dashboard?.totalNetSales).naira}
                  {formatRemoteAmountKobo(dashboard?.totalNetSales).kobo}
                </p>
                <p className="text-base text-black font_medium">
                  {formatRemoteAmountKobo(dashboard?.todayTotalNetSales).naira}
                  {
                    formatRemoteAmountKobo(dashboard?.todayTotalNetSales).kobo
                  }{" "}
                  <span className="font_bold">today</span>
                </p>
              </div>
            )}
            <div>
              <img src="/images/net-sales.svg" alt="net-sales" />
            </div>
          </div>
          {dashboardLoading ? (
            <div className="my-4 grid grid-cols-2 gap-3">
              {[...Array(6)]?.map((_, i) => (
                <DashboardItemSkeletonLoader key={i} />
              ))}
            </div>
          ) : (
            <div className="my-4 grid grid-cols-2 gap-3">
              {dashboardItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#F8F8F8] border border-[#E1E1E1] rounded-xl p-4"
                >
                  <div className="flex gap-2 align-items-center">
                    <p className="text-base text-black font_medium">
                      {item.title}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#BABABA"
                      className="h-5 w-5"
                      data-tooltip-id={item.toolTipId}
                      data-tooltip-content={item.toolTipContent}
                      data-tooltip-place="right-end"
                      data-tooltip-type="light"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="my-2 text-3xl text-black font_medium">
                    {item.value}
                  </p>

                  <Tooltip id={item.toolTipId} />
                </div>
              ))}
            </div>
          )}
          <div className="bg-white border border-[#E1E1E1] rounded-xl p-6">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <div
                  className={`text-center font_medium py-2 w-36 h-10 rounded-full cursor-pointer ${
                    selectedTable === "Dine-in sales"
                      ? "text-white primary_bg_color"
                      : "text-black bg-[#EDECEC]"
                  } `}
                  onClick={() => setSelectedTable("Dine-in sales")}
                >
                  <p>Sales</p>
                </div>
                {/* <div
                  className={`text-center font_medium py-2 w-36 h-10 rounded-full cursor-pointer ${
                    selectedTable === "Online sales"
                      ? "text-white primary_bg_color"
                      : "text-black bg-[#EDECEC]"
                  } `}
                  onClick={() => setSelectedTable("Online sales")}
                >
                  <p>Online sales</p>
                </div> */}
                <div
                  className={`text-center font_medium py-2 w-28 h-10 rounded-full cursor-pointer ${
                    selectedTable === "Categories"
                      ? "text-white primary_bg_color"
                      : "text-black bg-[#EDECEC]"
                  } `}
                  onClick={() => setSelectedTable("Categories")}
                >
                  <p>Categories</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div
                  className="py-2 px-4 w-36 h-10 flex items-center justify-center gap-3 rounded-full cursor-pointer text-black bg-[#EDECEC]"
                  onClick={() => {
                    if (selectedTable === "Dine-in sales") {
                      dineExportToCSV(transactions);
                    } else if (selectedTable === "Online sales") {
                      orderExportToCSV(ordersTransactions);
                    }
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
            <div className="mt-4 flow-root overflow-hidden">
              {selectedTable === "Dine-in sales" && (
                <InfinityScroll
                  data={transactions}
                  getMore={fetchRestaurantOrders}
                  hasMore={hasMore}
                >
                  <div
                    ref={tableContainerRef}
                    className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"
                  >
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
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
                                <Popover className="relative">
                                  {({ open }) => (
                                    <>
                                      <Popover.Button
                                        className={`flex flex-row items-center space-between gap-x-2`}
                                      >
                                        <span className="text-nowrap">
                                          Table
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
                                        <Popover.Panel className="box-border absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black">
                                          <div className="w-full">
                                            <RadioGroup
                                              value={selectedTableItem}
                                              onChange={setSelectedTableItem}
                                            >
                                              <div className="space-y-3">
                                                <RadioGroup.Option
                                                  value={""}
                                                  className={
                                                    "flex items-center cursor-pointer mb-2"
                                                  }
                                                >
                                                  {({ active, checked }) => (
                                                    <>
                                                      <div
                                                        className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                                          checked
                                                            ? "primary_bg_color"
                                                            : "bg_gray_color"
                                                        }`}
                                                      />

                                                      <RadioGroup.Label
                                                        as="p"
                                                        className={`text-xs lg:text-sm secondary_gray_color text-black`}
                                                      >
                                                        All
                                                      </RadioGroup.Label>
                                                    </>
                                                  )}
                                                </RadioGroup.Option>
                                                {table?.map((item: any) => (
                                                  <RadioGroup.Option
                                                    key={item.table}
                                                    value={item.table}
                                                    className={
                                                      "flex items-center cursor-pointer mb-2"
                                                    }
                                                  >
                                                    {({ active, checked }) => (
                                                      <>
                                                        <div
                                                          className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                                            checked
                                                              ? "primary_bg_color"
                                                              : "bg_gray_color"
                                                          }`}
                                                        />

                                                        <div className="">
                                                          <RadioGroup.Label
                                                            as="p"
                                                            className={`text-xs lg:text-sm secondary_gray_color text-black`}
                                                          >
                                                            {item.table}
                                                          </RadioGroup.Label>
                                                        </div>
                                                      </>
                                                    )}
                                                  </RadioGroup.Option>
                                                ))}
                                              </div>
                                            </RadioGroup>
                                          </div>
                                        </Popover.Panel>
                                      </Transition>
                                    </>
                                  )}
                                </Popover>
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
                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[100px]"
                              >
                                Waiter
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[100px]"
                              >
                                <Popover className="relative">
                                  {({ open }) => (
                                    <>
                                      <Popover.Button
                                        className={`flex flex-row items-center space-between gap-x-1`}
                                      >
                                        <span className="text-nowrap">
                                          Type
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
                                        <Popover.Panel className="box-border absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black">
                                          <div className="w-full">
                                            <RadioGroup
                                              value={selectedType}
                                              onChange={setSelectedType}
                                            >
                                              <div className="space-y-3">
                                                <RadioGroup.Option
                                                  value={""}
                                                  className={
                                                    "flex items-center cursor-pointer mb-2"
                                                  }
                                                >
                                                  {({ active, checked }) => (
                                                    <>
                                                      <div
                                                        className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                                          checked
                                                            ? "primary_bg_color"
                                                            : "bg_gray_color"
                                                        }`}
                                                      />

                                                      <div className="">
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
                                                {typeOptions?.map(
                                                  (item: any) => (
                                                    <RadioGroup.Option
                                                      key={item}
                                                      value={item}
                                                      className={
                                                        "flex items-center cursor-pointer mb-2"
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
                                                              {item}
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
                                <Popover className="relative">
                                  {({ open }) => (
                                    <>
                                      <Popover.Button
                                        className={`flex flex-row items-center space-between gap-x-1`}
                                      >
                                        <span className="text-nowrap">
                                          Payment
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
                                        <Popover.Panel className="box-border absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black">
                                          <div className="w-full">
                                            <RadioGroup
                                              value={selectedPayment}
                                              onChange={setSelectedPayment}
                                            >
                                              <div className="space-y-3">
                                                <RadioGroup.Option
                                                  value={""}
                                                  className={
                                                    "flex items-center cursor-pointer mb-2"
                                                  }
                                                >
                                                  {({ active, checked }) => (
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
                                                {paymentOptions?.map(
                                                  (item: any) => (
                                                    <RadioGroup.Option
                                                      key={item}
                                                      value={item}
                                                      className={
                                                        "flex items-center cursor-pointer mb-2"
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
                                                              {item}
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
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[120px]"
                              >
                                <Popover className="relative">
                                  {({ open }) => (
                                    <>
                                      <Popover.Button
                                        className={`flex flex-row items-center space-between gap-x-1`}
                                      >
                                        <span className="text-nowrap">
                                          Platform
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
                                        <Popover.Panel className="box-border absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black">
                                          <div className="w-full">
                                            <RadioGroup
                                              value={selectedPlatform}
                                              onChange={setSelectedPlatform}
                                            >
                                              <div className="space-y-3">
                                                <RadioGroup.Option
                                                  value={""}
                                                  className={
                                                    "flex items-center cursor-pointer mb-2"
                                                  }
                                                >
                                                  {({ active, checked }) => (
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
                                                {platformOptions?.map(
                                                  (item: any) => (
                                                    <RadioGroup.Option
                                                      key={item}
                                                      value={item}
                                                      className={
                                                        "flex items-center cursor-pointer mb-2"
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
                                                              {item}
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
                                                  value={""}
                                                  className={
                                                    "flex items-center cursor-pointer mb-2"
                                                  }
                                                  onClick={() =>
                                                    setSelectedStatus("")
                                                  }
                                                >
                                                  {({ active, checked }) => (
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
                                                  (item: any) => (
                                                    <RadioGroup.Option
                                                      key={item}
                                                      value={item}
                                                      className={
                                                        "flex items-center cursor-pointer mb-2"
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
                                                              {item}
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
                            {filteredOrders?.map(
                              (transaction: any, i: number) => (
                                <tr key={transaction.id + i}>
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                    #
                                    {transaction.id.substring(
                                      transaction?.id?.length - 5
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                    {moment(transaction?.createdAt).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                    {moment(transaction?.createdAt).format(
                                      "hh:mm A"
                                    )}
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
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 w-auto min-w-[200px] max-w-[250px] text-wrap">
                                    {transaction?.cartMenu?.map((menu: any) => (
                                      <div
                                        key={menu?._id}
                                        className="flex items-center"
                                      >
                                        <div className="h-10 w-10 flex-shrink-0">
                                          <img
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={menu?.images[0]}
                                            alt=""
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <div className="font-medium text-wrap">
                                            {menu?.foodName} X {menu?.quantity}
                                          </div>
                                          <div className="">
                                            ₦
                                            {parseInt(
                                              menu?.eventAmount
                                                ? menu?.eventAmount
                                                : menu?.discount
                                                ? menu.price -
                                                  (menu.price / 100) *
                                                    menu.discount
                                                : menu.price
                                            ).toLocaleString()}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                    {transaction?.cartMenu?.reduce(
                                      (total: any, item: any) =>
                                        total + item.quantity,
                                      0
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                    {transaction?.table?.employeeAssigned ||
                                      "-"}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                    {transaction?.gift ? "Gift" : "Sales"}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[150px]">
                                    {
                                      formatRemoteAmountKobo(
                                        transaction?.totalAmount
                                      ).naira
                                    }
                                    {
                                      formatRemoteAmountKobo(
                                        transaction?.totalAmount
                                      ).kobo
                                    }
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[120px]">
                                    {transaction?.posPayment ? "POS" : "Online"}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[120px]">
                                    {transaction?.restaurant
                                      ? "Dine-in"
                                      : "Online"}
                                  </td>
                                  <td className="capitalize whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[150px]">
                                    {transaction?.restaurant &&
                                    transaction?.order[0].status === "archived"
                                      ? "void"
                                      : transaction?.restaurant &&
                                        ![
                                          "completed",
                                          "kitchen",
                                          "declined",
                                          "void",
                                        ].includes(
                                          transaction?.order[0]?.status
                                        )
                                      ? "kitchen"
                                      : transaction?.restaurant &&
                                        transaction?.order[0]?.status !==
                                          "archived"
                                      ? transaction?.order[0]?.status
                                      : transaction?.status}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </InfinityScroll>
              )}

              {selectedTable === "Online sales" && (
                <InfinityScroll
                  data={ordersTransactions}
                  getMore={fetchOrders}
                  hasMore={ordersHasMore}
                >
                  <div
                    ref={tableContainerRef}
                    className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"
                  >
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300">
                          {/* Table headers */}
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#7E7E7E] sm:pl-0 min-w-[100px]"
                              >
                                TICKET NO.
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E] min-w-[100px]"
                              >
                                DATE
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E] min-w-[100px]"
                              >
                                TIME
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E] min-w-[100px]"
                              >
                                NAME
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E] min-w-[200px]"
                              >
                                EMAIL
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E] min-w-[150px]"
                              >
                                PHONE NO.
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E] min-w-[200px]"
                              >
                                FOOD
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E] min-w-[150px]"
                              >
                                TOTAL ORDERS
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E] min-w-[150px]"
                              >
                                AMOUNT
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E] min-w-[100px]"
                              >
                                STATUS
                              </th>
                            </tr>
                          </thead>
                          {/* Table body */}
                          <tbody className="divide-y divide-gray-200">
                            {ordersTransactions?.map(
                              (transaction: any, i: number) => (
                                <tr key={transaction.id + i}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font_medium text-[#310E0E] sm:pl-0">
                                    #
                                    {transaction.id.substring(
                                      transaction?.id?.length - 5
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font_medium text-[#310E0E] sm:pl-0">
                                    {moment(transaction?.createdAt).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font_medium text-[#310E0E] sm:pl-0">
                                    {moment(transaction?.createdAt).format(
                                      "hh:mm A"
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font_medium text-[#310E0E] sm:pl-0">
                                    {transaction?.customer?.firstName}{" "}
                                    {transaction?.customer?.lastName}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font_medium text-[#310E0E] sm:pl-0">
                                    {transaction?.customer?.email}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font_medium text-[#310E0E] sm:pl-0">
                                    {transaction?.phoneNumber}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font_medium text-[#310E0E] sm:pl-0">
                                    {transaction?.cartMenu?.map((menu: any) => (
                                      <div
                                        key={menu?._id}
                                        className="flex items-center"
                                      >
                                        <div className="h-10 w-10 flex-shrink-0">
                                          <img
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={menu?.images[0]}
                                            alt=""
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <div className="font-medium">
                                            {menu?.foodName} X {menu?.quantity}
                                          </div>
                                          <div className="">
                                            ₦
                                            {parseInt(
                                              menu?.eventAmount
                                                ? menu?.eventAmount
                                                : menu?.discount
                                                ? menu.price -
                                                  (menu.price / 100) *
                                                    menu.discount
                                                : menu.price
                                            ).toLocaleString()}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font_medium text-[#310E0E] sm:pl-0">
                                    {transaction?.cartMenu?.reduce(
                                      (total: any, item: any) =>
                                        total + item.quantity,
                                      0
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font_medium text-[#310E0E] sm:pl-0">
                                    {
                                      formatRemoteAmountKobo(
                                        transaction?.totalAmount
                                      ).naira
                                    }
                                    {
                                      formatRemoteAmountKobo(
                                        transaction?.totalAmount
                                      ).kobo
                                    }
                                  </td>
                                  <td className="capitalize whitespace-nowrap py-4 pl-4 pr-3 text-sm font_medium text-[#310E0E] sm:pl-0">
                                    {transaction?.status}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </InfinityScroll>
              )}
              {/* {selectedTable === "Categories" && (
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#7E7E7E] sm:pl-0"
                                  >
                                    ITEM
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E]"
                                  >
                                    NUMBER
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E]"
                                  >
                                    PERCENTAGE
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-[#7E7E7E]"
                                  >
                                    AMOUNT
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {transactions.map((transaction, i) => (
                                  <tr key={transaction.email}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                      {transaction.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {transaction.title}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {transaction.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {transaction.role}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                      {transaction.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {transaction.title}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {transaction.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {transaction.role}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                      {transaction.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {transaction.title}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {transaction.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {transaction.role}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {transaction.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                      {transaction.role}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )} */}
            </div>
          </div>
        </div>
      </ChefDashboardLayout>
    </>
  );
};

export default SalesReports;
