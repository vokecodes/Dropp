import React, { useEffect, useState } from "react";
import AdminDashboardLayout from "./AdminDashboardLayout";
import PageTitle from "../../components/PageTitle";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import {
  getAdminDashboardAccount,
  getAdminMonthlyChart,
  getChefRestaurantWalletAccount,
  getChefWalletAccount,
  getProfileChefAccount,
  getRestaurantDashboardAccount,
} from "../../_redux/user/userAction";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { Tooltip } from "react-tooltip";
import {
  formatRemoteAmountDollar,
  formatRemoteAmountKobo,
} from "../../utils/formatMethods";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { ClickAwayListener } from "@mui/material";
import axios from "axios";
import {
  ADMIN_ALL_CUSTOMERS,
  ADMIN_ALL_ORDERS,
  ADMIN_ALL_RESTAURANTS,
  ADMIN_DROPP_DASHBOARD_URL,
} from "../../_redux/urls";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SERVER } from "../../config/axios";

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

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { user, dashboardLoading, dashboard, chartData, section, table } =
    useSelector(
      (state: any) => ({
        user: state.user.user,
        dashboardLoading: state.user.dashboardLoading,
        dashboard: state.user.dashboard,
        chartData: state.user.chartData,
        section: state.section.section,
        table: state.table.table,
      }),
      shallowEqual
    );

  const safeDivide = (a: any, b: any) => {
    if (b === 0) {
      return 0;
    }
    return a / b;
  };

  const [restaurants, setRestaurants] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState("All");
  const [openRestaurantOptions, setOpenRestaurantOptions] = useState(false);

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const [dashboardData, setDashboardData] = useState({});

  const [currencyType, setCurrencyType] = useState("Naira");
  const [currentChartData, setCurrentChartData] = useState({});
  const [currentChartYears, setCurrentChartYears] = useState([]);
  const [currentChartYear, setCurrentChartYear] = useState("");
  const [openCurrentChartData, setOpenCurrentChartData] = useState(false);

  const [conversion, setConversion] = useState(0);

  const dashboardItems = [
    {
      title: "Commission Revenue",
      value:
        conversion != 0 && currencyType == "Dollars"
          ? formatRemoteAmountDollar(
              (dashboard?.totalNetSales * (2.5 / 100)) / conversion
            ).dollar +
            formatRemoteAmountDollar(
              (dashboard?.totalNetSales * (2.5 / 100)) / conversion
            ).cents
          : formatRemoteAmountKobo(dashboard?.totalNetSales * (2.5 / 100))
              .naira +
            formatRemoteAmountKobo(dashboard?.totalNetSales * (2.5 / 100)).kobo,
      toolTipId: "revenue",
      toolTipContent: "2.5% of GMV",
    },
    {
      title: "Subscription Revenue",
      value:
        conversion != 0 && currencyType == "Dollars"
          ? formatRemoteAmountDollar(0).dollar +
            formatRemoteAmountDollar(0).cents
          : formatRemoteAmountKobo(0).naira + formatRemoteAmountKobo(0).kobo,
      toolTipId: "revenue",
      toolTipContent: "2.5% of GMV",
    },
    {
      title: "MRR",
      value:
        conversion != 0 && currencyType == "Dollars"
          ? formatRemoteAmountDollar(
              (dashboard?.totalNetSales * (2.5 / 100)) / 12 / conversion
            ).dollar +
            formatRemoteAmountDollar(
              (dashboard?.totalNetSales * (2.5 / 100)) / 12 / conversion
            ).cents
          : formatRemoteAmountKobo(
              (dashboard?.totalNetSales * (2.5 / 100)) / 12
            ).naira +
            formatRemoteAmountKobo(
              (dashboard?.totalNetSales * (2.5 / 100)) / 12
            ).kobo,
      toolTipId: "mrr",
      toolTipContent: "Average revenue per month",
    },
    {
      title: "Restaurants",
      value: restaurants?.length,
      toolTipId: "restaurants",
      toolTipContent: "Total number of restaurants",
    },
    {
      title: "Orders",
      value: dashboard?.orders,
      toolTipId: "orders",
      toolTipContent: "Total number of orders",
    },
    {
      title: "Meals",
      value: dashboard?.meals,
      toolTipId: "orders",
      toolTipContent: "Total number of meals",
    },
    {
      title: "AOV",
      value:
        conversion != 0 && currencyType == "Dollars"
          ? formatRemoteAmountDollar(
              safeDivide(dashboard?.totalNetSales, dashboard?.orders) /
                conversion
            ).dollar +
            formatRemoteAmountDollar(
              safeDivide(dashboard?.totalNetSales, dashboard?.orders) /
                conversion
            ).cents
          : formatRemoteAmountKobo(
              safeDivide(dashboard?.totalNetSales, dashboard?.orders)
            ).naira +
            formatRemoteAmountKobo(
              safeDivide(dashboard?.totalNetSales, dashboard?.orders)
            ).kobo,
      toolTipId: "aov",
      toolTipContent: "Total order value/number of orders",
    },
    {
      title: "Customers",
      value: dashboard?.customers,
      toolTipId: "customers",
      toolTipContent: "Total number of customers",
    },
  ];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
    try {
      // Perform all requests concurrently
      const [
        restaurantsRes,
        ordersRes,
        customersRes,
        dashboardRes,
        exchangeRes,
      ] = await Promise.all([
        SERVER.get(ADMIN_ALL_RESTAURANTS),
        SERVER.get(ADMIN_ALL_ORDERS),
        SERVER.get(ADMIN_ALL_CUSTOMERS),
        SERVER.get(`${ADMIN_DROPP_DASHBOARD_URL}/all`),
        SERVER.get(
          "https://v6.exchangerate-api.com/v6/5ce22ab53db63681b9dd1eee/latest/USD"
        ),
      ]);

      // Handle restaurants data
      const numOfRestaurants = restaurantsRes.data.data;
      console.log("Restaurants= ", numOfRestaurants);
      setRestaurants(numOfRestaurants);

      // Handle orders data
      const totalOrders = ordersRes.data?.data.length;
      console.log("Orders= ", totalOrders);
      setTotalOrders(totalOrders);

      // Handle customers data
      const totalCustomers = customersRes.data?.data.length;
      console.log("Customers= ", totalCustomers);
      setTotalCustomers(totalCustomers);

      // Handle dashboard data
      const dashBoardData = dashboardRes.data.data;
      console.log("dashBoardData =", dashBoardData);
      setDashboardData(dashBoardData);

      // Handle exchange rate data
      const conversionRate = exchangeRes.data?.conversion_rates["NGN"];
      console.log("Currency (NGN)= ", conversionRate);
      setConversion(conversionRate);
    } catch (error) {
      // Generalized error handling
      const message = error?.response?.data?.message || "An error occurred";
      console.log(message);
      // alert(message);
    }
  };

  useEffect(() => {
    dispatch(getAdminDashboardAccount(startDate, endDate));

    dispatch(getAdminMonthlyChart());
    chartData && setCurrentChartData(chartData);
    chartData && setCurrentChartYears(Object.keys(chartData).reverse());
    chartData && setCurrentChartYear(Object.keys(chartData).reverse()[0]);

    // Call the function to fetch data
    fetchData();
  }, []);

  const handleClickAway = (flag: string) => {
    if (flag === "restaurant") {
      setOpenRestaurantOptions(false);
    } else if (flag === "chartData") {
      setOpenCurrentChartData(false);
    }
  };

  console.log("currentChartData= ", currentChartData);
  console.log("restaurants= ", restaurants);

  return (
    <AdminDashboardLayout>
      <div className="w-full px-6 py-4 bg-white" style={{}}>
        <PageTitle title={moment().format("MMMM Do, YYYY")} />
        <div className="w-full my-10 flex flex-col lg:flex-row items-center lg:items-end justify-start flex-wrap gap-3">
          {/* START DATE */}
          <div className="w-full lg:w-1/5">
            <label className="text-sm font_medium text-black">From Date</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="h-14 bg-[#F8F8F8] block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
              placeholder="Start Date:"
              onChange={(e: any) => setStartDate(e.target.value)}
            />
          </div>

          {/* TO DATE */}
          <div className="w-full lg:w-1/5">
            <label className="text-sm font_medium text-black">To Date</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="h-14 bg-[#F8F8F8] block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
              placeholder="End Date:"
              onChange={(e: any) => setEndDate(e.target.value)}
            />
          </div>

          {/* RESTAURANTS */}
          <div className="w-full lg:w-1/5">
            <label className="text-sm font_medium text-black">
              Restaurants
            </label>
            <div className="mt-2 lg:mt-0">
              <div
                className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                onClick={() => {
                  setOpenRestaurantOptions(!openRestaurantOptions);
                }}
              >
                <p className={`text-xs lg:text-sm filter_text font_medium`}>
                  {currentRestaurant}
                </p>
                {openRestaurantOptions ? (
                  <TiArrowSortedUp color="#8E8E8E" size={20} />
                ) : (
                  <TiArrowSortedDown color="#8E8E8E" size={20} />
                )}
              </div>
              {openRestaurantOptions && (
                <ClickAwayListener
                  onClickAway={() => handleClickAway("restaurant")}
                >
                  <div
                    className={`absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                  >
                    <div
                      className="flex items-center cursor-pointer mb-2"
                      onClick={() => {
                        setCurrentRestaurant("All");
                        setOpenRestaurantOptions(false);
                      }}
                    >
                      <div
                        className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                          currentRestaurant === "All"
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
                    {restaurants?.map((restaurant: any, i: number) => (
                      <div
                        className="flex items-center cursor-pointer mb-2"
                        key={i}
                        onClick={() => {
                          setCurrentRestaurant(
                            restaurant.business.businessName
                          );
                          setOpenRestaurantOptions(false);
                        }}
                      >
                        <div
                          className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                            currentRestaurant ===
                            restaurant.business.businessName
                              ? "primary_bg_color"
                              : "bg_gray_color"
                          }`}
                        />
                        <p
                          className={`text-xs lg:text-sm secondary_gray_color text-black`}
                        >
                          {restaurant.business.businessName}
                        </p>
                      </div>
                    ))}
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>

          {/* CURRENCY */}
          <div className="w-full lg:w-1/5">
            <div className="w-full h-14 bg-[#F8F8F8] grid grid-cols-2 mt-2 lg:mt-0 p-2 rounded-lg">
              <div
                className={`w-full h-full flex flex-row items-center justify-center cursor-pointer rounded-lg ${
                  currencyType === "Naira"
                    ? "bg_primary text-white"
                    : "text-black"
                }`}
                onClick={() => setCurrencyType("Naira")}
              >
                <p className="font_medium">Naira</p>
              </div>
              <div
                className={`w-full h-full flex flex-row items-center justify-center cursor-pointer rounded-lg ${
                  currencyType === "Dollars"
                    ? "bg_primary text-white"
                    : "text-black"
                }`}
                onClick={() => setCurrencyType("Dollars")}
              >
                <p className="font_medium">Dollars</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-44 my-4 bg-[#F8F8F8] rounded-xl flex justify-between">
          {dashboardLoading ? (
            <BannerSkeletonLoader />
          ) : (
            <div className="p-6">
              <div className="flex gap-3 align-items-center">
                <p className="text-base text-black font_medium">GMV</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#BABABA"
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
              {conversion != 0 && currencyType == "Dollars" ? (
                <p className="my-3 text-3xl text-[#000000] font_medium">
                  {
                    formatRemoteAmountDollar(
                      dashboard?.totalNetSales / conversion
                    ).dollar
                  }
                  {
                    formatRemoteAmountDollar(
                      dashboard?.totalNetSales / conversion
                    ).cents
                  }
                </p>
              ) : (
                <p className="my-3 text-3xl text-[#000000] font_medium">
                  {formatRemoteAmountKobo(dashboard?.totalNetSales).naira}
                  {formatRemoteAmountKobo(dashboard?.totalNetSales).kobo}
                </p>
              )}
              {conversion != 0 && currencyType == "Dollars" ? (
                <p className="text-base text-black font_medium">
                  {
                    formatRemoteAmountDollar(
                      dashboard?.todayTotalNetSales / conversion
                    ).dollar
                  }
                  {
                    formatRemoteAmountDollar(
                      dashboard?.todayTotalNetSales / conversion
                    ).cents
                  }{" "}
                  <span className="font_bold">today</span>
                </p>
              ) : (
                <p className="text-base text-black font_medium">
                  {formatRemoteAmountKobo(dashboard?.todayTotalNetSales).naira}
                  {
                    formatRemoteAmountKobo(dashboard?.todayTotalNetSales).kobo
                  }{" "}
                  <span className="font_bold">today</span>
                </p>
              )}
            </div>
          )}
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

        <div className="w-full h-fit min-h-64">
          <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-between px-3 my-5">
            <div className="w-full lg:w-fit flex flex-row items-center gap-x-3">
              <span className="p-2 bg-[#F4F4F4] rounded-lg">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9606 2.3335H7.27896C3.94229 2.3335 1.95312 4.32266 1.95312 7.65933V15.3318C1.95312 18.6777 3.94229 20.6668 7.27896 20.6668H14.9515C18.2881 20.6668 20.2773 18.6777 20.2773 15.341V7.65933C20.2865 4.32266 18.2973 2.3335 14.9606 2.3335ZM15.5931 11.0693C15.5931 11.4268 15.309 11.711 14.9515 11.711C14.594 11.711 14.3098 11.4268 14.3098 11.0693V10.9043L11.8165 13.3977C11.679 13.5352 11.4956 13.5993 11.3031 13.581C11.1106 13.5627 10.9365 13.4618 10.8356 13.2968L9.90063 11.9035L7.71896 14.0852C7.59063 14.2135 7.43479 14.2685 7.26979 14.2685C7.10479 14.2685 6.93979 14.2043 6.82062 14.0852C6.57312 13.8377 6.57312 13.4343 6.82062 13.1777L9.55229 10.446C9.68979 10.3085 9.87313 10.2443 10.0656 10.2627C10.2581 10.281 10.4323 10.3818 10.5331 10.5468L11.4681 11.9402L13.4023 10.006H13.2373C12.8798 10.006 12.5956 9.72183 12.5956 9.36433C12.5956 9.00683 12.8798 8.72266 13.2373 8.72266H14.9423C15.0248 8.72266 15.1073 8.741 15.1898 8.7685C15.3456 8.83266 15.474 8.961 15.5381 9.11683C15.5748 9.19933 15.584 9.28183 15.584 9.36433V11.0693H15.5931Z"
                    fill="black"
                  />
                </svg>
              </span>
              <p className="font_medium text-lg text-[#7E7E7E]">
                GMV vs Revenue
              </p>
            </div>

            <div className="w-full lg:w-1/5">
              <div className="mt-2 lg:mt-0">
                <div
                  className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                  onClick={() => {
                    setOpenCurrentChartData(!openCurrentChartData);
                  }}
                >
                  <p className={`text-xs lg:text-sm filter_text font_medium`}>
                    {currentChartYear}
                  </p>
                  {openCurrentChartData ? (
                    <TiArrowSortedUp color="#8E8E8E" size={20} />
                  ) : (
                    <TiArrowSortedDown color="#8E8E8E" size={20} />
                  )}
                </div>
                {openCurrentChartData && (
                  <ClickAwayListener
                    onClickAway={() => handleClickAway("chartData")}
                  >
                    <div
                      className={`absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                    >
                      {currentChartYears?.map((year: any, i: number) => (
                        <div
                          className="flex items-center cursor-pointer mb-2"
                          key={i}
                          onClick={() => {
                            setCurrentChartYear(year);
                            setOpenCurrentChartData(false);
                          }}
                        >
                          <div
                            className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                              currentChartYear === year
                                ? "primary_bg_color"
                                : "bg_gray_color"
                            }`}
                          />
                          <p
                            className={`text-xs lg:text-sm secondary_gray_color text-black`}
                          >
                            {year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <BarChart
                width={730}
                height={250}
                data={chartData ? chartData[currentChartYear] : {}}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={"month"} />
                <YAxis />
                <ChartTooltip />
                <Legend />
                <Bar dataKey={"totalNetSales"} fill="#06C167" />
                <Bar dataKey={"revenue"} fill="#FFCD29" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default DashboardPage;
