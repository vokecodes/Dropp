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
import {
  getChefRestaurantWalletAccount,
  getChefWalletAccount,
  getProfileChefAccount,
  getRestaurantDashboardAccount,
  getStorefrontDashboardAccount,
} from "../../_redux/user/userAction";
import {
  dateFormatter,
  dateNoTimeFormatter,
  formatRemoteAmountKobo,
  generateUUIDBasedOnStringLength,
  toTitleCase,
  uuidGen,
} from "../../utils/formatMethods";
import {
  downloadRestaurantReport,
  getOrdersPage,
  getRestaurantOrdersPage,
  getStorefrontOrdersPage,
} from "../../_redux/user/userCrud";
import { getSections } from "../../_redux/section/sectionAction";
import { getTables } from "../../_redux/table/tableAction";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { ClickAwayListener } from "@mui/material";
import InfinityScroll from "../../components/InfinityScroll";
import { DashboardItemSkeletonLoader } from "../../components/DashboardItemSkeletonLoader";

const PAYMENT_OPTIONS = ["All", "Card", "Transfer", "USSD"];
const DELIVERY_STATUS = ["All", "Pending", "Completed"];
const DELIVERY_DAY = [
  "All",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

const SalesReports = () => {
  const dispatch = useAppDispatch();
  const { user, dashboardLoading, dashboard, section, table } = useSelector(
    (state: any) => ({
      user: state.user.user,
      dashboardLoading: state.user.dashboardLoading,
      dashboard: state.user.dashboard,
      section: state.section.section,
      table: state.table.table,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getProfileChefAccount());
    dispatch(getChefWalletAccount());
  }, []);

  useEffect(() => {
    Hotjar.identify(user?._id, {
      first_name: user?.firstName,
      last_name: user?.lastName,
    });
  }, [user]);

  const safeDivide = (a: any, b: any) => {
    if (b === 0) {
      return 0;
    }
    return a / b;
  };

  const dashboardItems = [
    {
      title: "Tickets",
      value: dashboard?.tickets || 0,
      toolTipId: "tickets",
      toolTipContent: "Total number of checkouts",
    },
    {
      title: "Orders",
      value: dashboard?.orders || 0,
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
          ).kobo || 0,
      toolTipId: "avg-orders-size",
      toolTipContent: "Net sales divided by total orders",
    },
    {
      title: "Avg. Order",
      value: Math.round(safeDivide(dashboard?.orders, dashboard?.tickets)) || 0,
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
          ).kobo || 0,
      toolTipId: "avg-tickets-size",
      toolTipContent: "Total net sales divided by the total tickets",
    },
    {
      title: "Unique Customers",
      value: dashboard?.customers || 0,
      toolTipId: "unique-customers",
      toolTipContent: "Customer counts",
    },
  ];

  const [deliveryStatus, setDeliveryStatus] = useState(DELIVERY_STATUS[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [openPaymentOptions, setOpenPaymentOptions] = useState(false);
  const [paymentType, setPaymentType] = useState(PAYMENT_OPTIONS[0]);

  const [openDayOptions, setOpenDayOptions] = useState(false);
  const [deliveryDay, setDeliveryDay] = useState(DELIVERY_DAY[0]);

  const [openLocationOptions, setOpenLocationOptions] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const [transactions, setTransactions] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Function to fetch more data when scrolling
  const fetchStorefrontOrders = async () => {
    await getStorefrontOrdersPage(
      page,
      startDate,
      endDate,
      paymentType,
      deliveryStatus
    ).then(({ data }) => {
      if (page === 1) {
        setTransactions(data.data);
      } else {
        setTransactions((prevTransactions: any) => [
          ...prevTransactions,
          ...data.data,
        ]);
      }

      if (Number(data.pagination.totalPages) > 1) {
        setPage(page + 1);
        setHasMore(
          Number(data.pagination.totalPages) > 1 &&
            Number(data.pagination.currentPage) !==
              Number(data.pagination.totalPages)
        );
      } else {
        setHasMore(false);
      }
    });
  };

  // Reset page and data when filters change
  const resetFilters = () => {
    setPage(1);
    setHasMore(true);
  };

  useEffect(() => {
    setPage(1);
  }, [endDate, paymentType]);

  useEffect(() => {
    if (page === 1) {
      dispatch(
        getStorefrontDashboardAccount(
          startDate,
          endDate,
          paymentType,
          deliveryStatus
        )
      );
      fetchStorefrontOrders();
    }
  }, [page, endDate, deliveryStatus]);

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

        const foodDetails = order.order
          ?.map(
            (menu: any) =>
              `${menu.menu.foodName} X ${menu.quantity}- ₦${menu.amount}`
          )
          .join("; ");

        const totalMeal = order?.order?.reduce(
          (total: any, item: any) => total + item.quantity,
          0
        );

        return [
          `#${order._id.substring(order?._id?.length - 5)}`,
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
            : order?.order[0]?.status === "archived"
            ? "void"
            : order?.order[0]?.status || "---",
        ].join(",");
      });

    return [header, ...rows].join("\n");
  };

  const dineExportToCSV = async () => {
    setIsDownloading(true);
    try {
      await downloadRestaurantReport(startDate, endDate, paymentType).then(
        ({ data }) => {
          const csv = dineInConvertToCSV(data?.data);

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
        }
      );
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

  const ordersList = transactions.sort((a: any, b: any) =>
    moment(b.createdAt).diff(moment(a.createdAt))
  );

  const [selectedPayment, setSelectedPayment] = useState("");
  const filteredPayment = !selectedPayment
    ? ordersList
    : ordersList?.filter((item: any, i: any) => {
        if (selectedPayment === "POS") {
          return item?.posPayment == true;
        } else {
          return !item?.posPayment;
        }
      });

  const filteredOrders = filteredPayment;

  const handleClickAway = (flag: string) => {
    if (flag === "payment") {
      setOpenPaymentOptions(false);
    }
  };

  const todaysDate = new Date()
    .toLocaleString("en-GB", {
      timeZone: "Africa/Lagos",

      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  return (
    <>
      <ChefDashboardLayout>
        <div className="w-full p-2 lg:px-6 py-4 bg-white" style={{}}>
          <PageTitle title={moment().format("MMMM Do, YYYY")} />
          <div className="w-full lg:w-4/5 my-10 flex flex-col lg:flex-row flex-wrap items-center gap-3">
            <div className="w-full lg:w-1/5">
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
                max={endDate ? endDate : undefined}
              />
            </div>

            <div className="w-full lg:w-1/5">
              <label className="text-sm font_medium text-black">End Date</label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="h-14 bg-[#F8F8F8] block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                placeholder="End Date:"
                max={todaysDate}
                min={startDate ? startDate : undefined}
                onChange={(e: any) => setEndDate(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-1/5">
              <label className="text-sm font_medium text-black">
                Delivery day
              </label>
              <div className="mt-2 lg:mt-0">
                <div
                  className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                  onClick={() => {
                    setOpenDayOptions(!openDayOptions);
                  }}
                >
                  <p className={`text-xs lg:text-sm filter_text font_medium`}>
                    {deliveryDay}
                  </p>
                  {openDayOptions ? (
                    <TiArrowSortedUp color="#8E8E8E" size={20} />
                  ) : (
                    <TiArrowSortedDown color="#8E8E8E" size={20} />
                  )}
                </div>
                {openDayOptions && (
                  <ClickAwayListener
                    onClickAway={() => handleClickAway("deliveryDay")}
                  >
                    <div
                      className={`absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                    >
                      {DELIVERY_DAY?.map((day: any, i: number) => (
                        <div
                          className="flex items-center cursor-pointer mb-2"
                          key={i}
                          onClick={() => {
                            resetFilters();
                            setDeliveryDay(day);
                            setOpenDayOptions(false);
                          }}
                        >
                          <div
                            className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                              deliveryDay === day
                                ? "primary_bg_color"
                                : "bg_gray_color"
                            }`}
                          />
                          <p
                            className={`text-xs lg:text-sm secondary_gray_color text-black`}
                          >
                            {day}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/5">
              <label className="text-sm font_medium text-black">Location</label>
              <div className="mt-2 lg:mt-0">
                <div
                  className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                  onClick={() => {
                    setOpenLocationOptions(!openLocationOptions);
                  }}
                >
                  <p className={`text-xs lg:text-sm filter_text font_medium`}>
                    {deliveryLocation}
                  </p>
                  {openLocationOptions ? (
                    <TiArrowSortedUp color="#8E8E8E" size={20} />
                  ) : (
                    <TiArrowSortedDown color="#8E8E8E" size={20} />
                  )}
                </div>
                {openLocationOptions && (
                  <ClickAwayListener
                    onClickAway={() => handleClickAway("payment")}
                  >
                    <div
                      className={`absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                    >
                      {[]?.map((location: any, i: number) => (
                        <div
                          className="flex items-center cursor-pointer mb-2"
                          key={i}
                          onClick={() => {
                            resetFilters();
                            setPaymentType(location);
                            setOpenLocationOptions(false);
                          }}
                        >
                          <div
                            className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                              deliveryLocation === location
                                ? "primary_bg_color"
                                : "bg_gray_color"
                            }`}
                          />
                          <p
                            className={`text-xs lg:text-sm secondary_gray_color text-black`}
                          >
                            {location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/5">
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
          </div>
          <div className="my-4 bg-[#FDEEF0] rounded-xl flex flex-col lg:flex-row justify-start lg:justify-between items-center">
            {dashboardLoading ? (
              <BannerSkeletonLoader />
            ) : (
              <div className="p-6">
                <div className="flex gap-3 items-center">
                  <p className="text-base text-black font_medium">Net Sales</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#F78F9B"
                    className="size-5"
                    data-tooltip-id="net-sales"
                    data-tooltip-content="Gross sales including platform fees."
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
            <div className="hidden lg:block">
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
                    <p className="text-sm lg:text-base text-black font_medium">
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
                  <p className="my-2 text-xl lg:text-3xl text-black font_medium">
                    {item.value}
                  </p>

                  <Tooltip id={item.toolTipId} />
                </div>
              ))}
            </div>
          )}
          <div className="w-full bg-white border border-[#E1E1E1] rounded-xl p-2 lg:p-6">
            <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-center gap-y-3">
              <div className="flex gap-3">
                {DELIVERY_STATUS.map((item) => (
                  <div
                    key={uuidGen()}
                    className={`text-center font_medium py-2 w-24 lg:w-36 h-10 rounded-full cursor-pointer ${
                      deliveryStatus === item
                        ? "text-white primary_bg_color"
                        : "text-black bg-[#EDECEC]"
                    } `}
                    onClick={() => setDeliveryStatus(item)}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {/* <div
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
                </div> */}

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

            <div className="w-full mt-4 flow-root overflow-hidden">
              <InfinityScroll
                data={transactions}
                getMore={fetchStorefrontOrders}
                hasMore={hasMore}
              >
                <div ref={tableContainerRef} className="-my-2 overflow-x-auto">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-x-auto">
                      {dashboardLoading ? (
                        <div className="my-4 grid grid-cols-2 gap-3">
                          {[...Array(4)]?.map((_, i) => (
                            <DashboardItemSkeletonLoader key={i} />
                          ))}
                        </div>
                      ) : (
                        <table className="min-w-full divide-y divide-gray-300 h-auto min-h-48">
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
                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[200px]"
                              >
                                Delivery Area & State
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[200px]"
                              >
                                Delivery Address
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[200px]"
                              >
                                Delivery Date
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[200px]"
                              >
                                Delivery Time
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[200px]"
                              >
                                Fulfillment Option
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
                                                {PAYMENT_OPTIONS?.map(
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
                          <tbody className="divide-y divide-gray-200">
                            {filteredOrders?.map(
                              (transaction: any, i: number) => (
                                <tr
                                  key={generateUUIDBasedOnStringLength("ttru")}
                                >
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                    #{transaction._id?.slice(-5)}
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
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 w-auto min-w-[200px] max-w-[250px] text-wrap">
                                    {transaction?.order?.map((menu: any) => (
                                      <div
                                        key={generateUUIDBasedOnStringLength(
                                          "fgtr"
                                        )}
                                        className="flex items-center"
                                      >
                                        {menu?.menu?.images.length > 0 && (
                                          <div className="h-10 w-10 flex-shrink-0">
                                            <img
                                              className="h-10 w-10 rounded-full object-cover"
                                              src={menu?.menu.images[0]}
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
                                    ))}
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
                                        transaction?.totalAmount
                                      ).naira
                                    }
                                    {
                                      formatRemoteAmountKobo(
                                        transaction?.totalAmount
                                      ).kobo
                                    }
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[200px]">
                                    {transaction?.deliveryState
                                      ? `${
                                          transaction?.deliveryArea
                                        }, ${toTitleCase(
                                          transaction?.deliveryState
                                        )}`
                                      : "-"}
                                  </td>
                                  <td className="py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[200px]">
                                    {transaction?.deliveryAddress || "-"}
                                  </td>
                                  <td className="py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[120px]">
                                    {dateNoTimeFormatter.format(
                                      new Date(transaction?.createdAt)
                                    )}
                                  </td>
                                  <td className="py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[120px]">
                                    {transaction?.deliveryTime}
                                  </td>
                                  <td className="py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[120px]">
                                    {transaction?.deliveryOption}
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[120px]">
                                    {transaction?.paymentType}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </InfinityScroll>
            </div>
          </div>
        </div>
      </ChefDashboardLayout>
    </>
  );
};

export default SalesReports;
