import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Hotjar from "@hotjar/browser";
import moment from "moment";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import PageTitle from "../../../components/PageTitle";
import { useAppDispatch } from "../../../redux/hooks";
import {
  getChefRestaurantWalletAccount,
  getChefWalletAccount,
  getProfileChefAccount,
  getQsrDashboardAccount,
  getQsrSubAdminDashboardAccount,
  getRestaurantDashboardAccount,
} from "../../../_redux/user/userAction";
import { formatRemoteAmountKobo } from "../../../utils/formatMethods";
import {
  getQsrOrdersPage,
  getQsrSubAdminOrdersPage,
  getRestaurantOrdersPage,
} from "../../../_redux/user/userCrud";
import { getSections } from "../../../_redux/section/sectionAction";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { ClickAwayListener } from "@mui/material";
import InfinityScroll from "../../../components/InfinityScroll";
import { DashboardItemSkeletonLoader } from "../../../components/DashboardItemSkeletonLoader";
import QsrDashboardLayout from "../../../components/QsrDashboardLayout";
import { getCashier, getQsrSubAdminCashier } from "../../../_redux/cashier/cashierAction";

const PAYMENT_OPTIONS = ["All", "online", "pos"];

const ORDER_OPTIONS = ["Completed sales", "Declined sales", "Voided sales", "Gifted sales"];

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


const platformOptions = ["Online", "Dine-in"];
const paymentOptions = ["Online", "POS"];

const SubAdminReport = () => {
  const dispatch = useAppDispatch();
  const { user, dashboardLoading, dashboard, section, cashiers } = useSelector(
    (state: any) => ({
      dashboardLoading: state.user.dashboardLoading,
      dashboard: state.user.dashboard,
      section: state.section.section,
      cashiers: state.cashier.cashiers,
    }),
    shallowEqual
  );

  useEffect(() => {
    // dispatch(getProfileChefAccount());
    // dispatch(getChefWalletAccount());
    // dispatch(getSections());
    dispatch(getQsrSubAdminCashier());
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
  
  const [breakdownOption, setBreakdownOptions] = useState(ORDER_OPTIONS[0]);
  const [openBreakdownOptions, setOpenBreakdownOptions] = useState(false);


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

  const [openCashierOptions, setOpenCashierOptions] = useState(false);
  const [filterCashier, setFilterCashier] = useState("");
  const [selectedFilterCashier, setSelectedFilterCashier] = useState({
    _id: "",
    employeeName: "All",
  });

  const [transactions, setTransactions] = useState<any>([]); // Assuming transactions is your data array
  const [hasMore, setHasMore] = useState(true); // Flag to track if there are more items to load
  const [page, setPage] = useState(1); // Page number for pagination

  // Function to fetch more data when scrolling
  const fetchRestaurantOrders = async () => {
    await getQsrSubAdminOrdersPage(
      page,
      startDate,
      endDate,
      paymentType,
      // filterSection,
      filterCashier
    ).then(({ data }) => {
      if (page === 1) {
        setTransactions(data.data);
      } else {
        setTransactions((prevTransactions: any) => [
          ...prevTransactions,
          ...data.data,
        ]);
      }

      if(Number(data.pagination.totalPages) > 1){
        setPage(page + 1);
        setHasMore(
          Number(data.pagination.totalPages) > 1 &&
          Number(data.pagination.currentPage) !== Number(data.pagination.totalPages)
        );
      }else{
        setHasMore(false)
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
  }, [endDate, paymentType, filterCashier]);

  useEffect(() => {
    if(page === 1){
      dispatch(
        getQsrSubAdminDashboardAccount(
          startDate,
          endDate,
          paymentType,
          // filterSection,
          filterCashier
        )
      );
      fetchRestaurantOrders();
    }
  }, [page, endDate, paymentType, filterCashier]);

  const [isDownloading, setIsDownloading] = useState(false);

  const dineInConvertToCSV = (data: any) => {
    const header = [
      "Ticket No.",
      "Date",
      "Time",
      "Name",
      "Email",
      "Phone No.",
      "Food",
      "Total Orders",
      "Cashier",
      "Amount",
      "Payment",
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
          foodDetails,
          totalMeal,
          order?.qsrCashier?.employeeName || "-",
          `₦${order?.totalAmount}`,
          order?.salesType,
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

  const [selectedCashierItem, setSelectedCashierItem] = useState("");
  const filteredTable = !selectedCashierItem
    ? ordersList
    : ordersList.filter((item: any, i: any) => {
        return item.qsrCashier?.employeeName == selectedCashierItem;
      });

  const [selectedPayment, setSelectedPayment] = useState("");
  const filteredPayment = !selectedPayment
    ? filteredTable
    : filteredTable?.filter((item: any, i: any) => {
        if (selectedPayment === "POS") {
          return item?.salesType == "pos";
        } else {
          return item?.salesType == "online";
        }
      });

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const filteredPlatform = !selectedPlatform
    ? filteredPayment
    : filteredPayment?.filter((item: any, i: any) => {
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
      setOpenCashierOptions(false);
    } else if (flag === "breakdownOption") {
      setOpenBreakdownOptions(false);
    }
  };

  const todaysDate = new Date().toLocaleString("en-GB", { 
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).split('/').reverse().join('-');

  return (
    <>
      <QsrDashboardLayout>
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
                Payment Type
              </label>
              <div className="mt-2 lg:mt-0">
                <div className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
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

            {/* <div className="w-full lg:w-1/5">
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
            </div> */}

            <div className="w-full lg:w-1/5">
              <label className="text-sm font_medium text-black">Cashier</label>
              <div
                className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                onClick={() => setOpenCashierOptions(!openCashierOptions)}
              >
                <p className={`text-xs lg:text-sm filter_text font_medium`}>
                  {selectedFilterCashier?.employeeName}
                </p>
                {openCashierOptions ? (
                  <TiArrowSortedUp color="#8E8E8E" size={20} />
                ) : (
                  <TiArrowSortedDown color="#8E8E8E" size={20} />
                )}
              </div>
              {openCashierOptions && (
                <ClickAwayListener onClickAway={() => handleClickAway("table")}>
                  <div
                    className={`absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                  >
                    <div
                      className="flex items-center cursor-pointer mb-2"
                      onClick={() => {
                        resetFilters();
                        setSelectedFilterCashier({ _id: "", employeeName: "All" });
                        setFilterCashier("");
                        setOpenSectionOptions(false);
                      }}
                    >
                      <div
                        className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                          selectedFilterCashier?._id === ""
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
                    {cashiers?.length > 0 &&
                      cashiers?.filter(item => item.employeeName).map((s: any, i: number) => (
                        <div
                          className="flex items-center cursor-pointer mb-2"
                          key={i}
                          onClick={() => {
                            resetFilters();
                            setSelectedFilterCashier(s);
                            setFilterCashier(s._id);
                            setOpenCashierOptions(false);
                          }}
                        >
                          <div
                            className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                              selectedFilterCashier?._id === s._id
                                ? "primary_bg_color"
                                : "bg_gray_color"
                            }`}
                          />
                          <p
                            className={`text-xs lg:text-sm secondary_gray_color text-black`}
                          >
                            {s.employeeName}
                          </p>
                        </div>
                      ))}
                  </div>
                </ClickAwayListener>
              )}
            </div>
            
            {/* <div className="w-full lg:w-1/5">
              <label className="text-sm font_medium text-black">Breakdown</label>
              <div
                className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                onClick={() => setOpenBreakdownOptions(!openBreakdownOptions)}
              >
                <p className={`text-xs lg:text-sm filter_text font_medium`}>
                  {breakdownOption}
                </p>
                {openBreakdownOptions ? (
                  <TiArrowSortedUp color="#8E8E8E" size={20} />
                ) : (
                  <TiArrowSortedDown color="#8E8E8E" size={20} />
                )}
              </div>
              {openBreakdownOptions && (
                <ClickAwayListener onClickAway={() => handleClickAway("breakdownOption")}>
                  <div
                    className={`absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                  >
                    {ORDER_OPTIONS?.length > 0 &&
                      ORDER_OPTIONS?.map((s: any, i: number) => (
                        <div
                          className="flex items-center cursor-pointer mb-2"
                          key={i}
                          onClick={() => {
                            resetFilters();
                            setBreakdownOptions(s);
                            setOpenBreakdownOptions(false);
                          }}
                        >
                          <div
                            className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                              breakdownOption === s
                                ? "primary_bg_color"
                                : "bg_gray_color"
                            }`}
                          />
                          <p
                            className={`text-xs lg:text-sm secondary_gray_color text-black`}
                          >
                            {s}
                          </p>
                        </div>
                      ))}
                  </div>
                </ClickAwayListener>
              )}
            </div> */}
          </div>
          <div className="my-4 bg-[#FDEEF0] rounded-xl flex flex-col lg:flex-row justify-start lg:justify-between items-center">
            {dashboardLoading ? (
              <BannerSkeletonLoader />
            ) : (
              <div className="p-6">
                <div className="flex gap-3 items-center">
                  <p className="text-base text-black font_medium">
                    Net Sales
                  </p>
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
                <div
                  className={`text-center font_medium py-2 w-36 h-10 rounded-full cursor-pointer ${
                    breakdownOption === "Completed sales"
                      ? "text-white primary_bg_color"
                      : "text-black bg-[#EDECEC]"
                  } `}
                  onClick={() => setBreakdownOptions(ORDER_OPTIONS[0])}
                >
                  <p>Sales</p>
                </div>
                
                {/* <div
                  className={`text-center font_medium py-2 w-28 h-10 rounded-full cursor-pointer ${
                    breakdownOption !== "Completed sales"
                      ? "text-white primary_bg_color"
                      : "text-black bg-[#EDECEC]"
                  } `}
                  onClick={() => setBreakdownOptions("")}
                >
                  <p>Others</p>
                </div> */}
              </div>

              <div className="flex gap-3">
                <div
                  className="py-2 px-4 w-36 h-10 flex items-center justify-center gap-3 rounded-full cursor-pointer text-black bg-[#EDECEC]"
                  onClick={() => { dineExportToCSV(transactions) }}
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
            
            <div className="w-full mt-4 flow-root overflow-hidden">
              <InfinityScroll
                data={transactions}
                getMore={fetchRestaurantOrders}
                hasMore={hasMore}
              >
                <div
                  ref={tableContainerRef}
                  className="-my-2 overflow-x-auto"
                >
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
                            {/* <th
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
                                            value={selectedCashierItem}
                                            onChange={setSelectedCashierItem}
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
                                              {cashiers?.filter(item => item.employeeName).map((item: any) => (
                                                <RadioGroup.Option
                                                  key={item._id}
                                                  value={item.employeeName}
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
                                                          {item.employeeName}
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
                            </th> */}
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[200px]"
                            >
                              Food
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[120px]"
                            >
                              Total Orders
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal min-w-[100px]"
                            >
                              Cashier
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
                            {/* <th
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
                            </th> */}
                          </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="divide-y divide-gray-200">
                          {filteredOrders?.map(
                            (transaction: any, i: number) => (
                              <tr key={transaction.id + i}>
                                <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                  #
                                  {transaction.id?.slice(-5)}
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
                                {/* <td className="whitespace-nowrap py-4 pl-0 text-left text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                  {transaction?.table?.table}
                                </td> */}
                                <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 w-auto min-w-[200px] max-w-[250px] text-wrap">
                                  {transaction?.order?.map((menu: any) => (
                                    <div
                                      key={menu?._id}
                                      className="flex items-center"
                                    >
                                      <div className="h-10 w-10 flex-shrink-0">
                                        <img
                                          className="h-10 w-10 rounded-full object-cover"
                                          src={menu?.menu.images[0]}
                                          alt=""
                                        />
                                      </div>
                                      <div className="ml-4">
                                        <div className="font-medium text-wrap">
                                          {menu?.menu.foodName} X {menu?.quantity}
                                        </div>
                                        <div className="">
                                          ₦
                                          {parseInt(
                                            menu?.menu.eventAmount
                                              ? menu?.menu.eventAmount
                                              : menu?.menu.discount
                                              ? menu.menu.price -
                                                (menu.menu.price / 100) *
                                                  menu.menu.discount
                                              : menu.menu.price
                                          ).toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[120px]">
                                  {transaction?.order?.reduce(
                                    (total: any, item: any) =>
                                      total + item.quantity,
                                    0
                                  )}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[100px]">
                                  {transaction?.qsrCashier?.employeeName ||
                                    "-"}
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
                                  {transaction?.salesType}
                                </td>
                                {/* <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 min-w-[120px]">
                                  {transaction?.restaurant
                                    ? "Dine-in"
                                    : "Online"}
                                </td> */}
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
      </QsrDashboardLayout>
    </>
  );
};

export default SubAdminReport;
