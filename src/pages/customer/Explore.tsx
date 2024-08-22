import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import ReactGA from "react-ga4";
import Hotjar from "@hotjar/browser";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { IoSearchSharp, IoChevronForwardOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "@mui/material";
import Footer from "../../components/landing-page/Footer";
import Meals from "../../components/landing-page/Meals";
import TopNav from "../../components/landing-page/TopNav";
import Preloader from "../../components/Preloader";
import { getAllChefs } from "../../_redux/user/userCrud";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { AUTH_ROUTES, CUSTOMER_ROUTES } from "../../routes/routes";
import { CHEFS_LOCATIONS, USER_TYPE } from "../../utils/Globals";
import CartFloat from "../../components/CartFloat";
import { DELIVERY_COST, TRANSACTION_URL } from "../../_redux/urls";
import Cart from "../../components/Cart";
import { createAnOrder, createAnOrderWallet } from "../../_redux/order/orderCrud";
import ColoredSpinner from "../../components/ColoredSpinner";
import TrackGoogleAnalyticsEvent from "../../components/TrackGoogleAnalyticsEvent";
import { getProfileUserAccount } from "../../_redux/user/userAction";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart, clearCart } from "../../_redux/cart/cartAction";

const REGIONS = ["South-West", "South-East", "South", "North", "Others"];

const VIEW_OPTIONS = ["Meals", "Chefs"];

const PRICE_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Below ₦2,000", value: "2000" },
  { label: "₦2,000 - ₦5,000", value: "2000-5000" },
  { label: "₦5,100 - ₦15,000", value: "5100-15000" },
  { label: "Above ₦15,000", value: "15000" },
];
const DELIVERY_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Same day", value: "6" },
  { label: "Next day", value: "24" },
  // { label: "Next day", value: "48" },
];
const LOCATION_OPTIONS = [{ label: "All", value: "all" }, ...CHEFS_LOCATIONS];

const Explore = () => {
  const { auth, user, cart, cartChef, person } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
      user: state.user.user,
      cart: state.cart.cart,
      cartChef: state.cart.cartChef,
      person: state.user.user,
    }),
    shallowEqual
  );

  const navigate = useNavigate();

  const [cartModal, setCartModal] = useState(false);

  const closeCartModal = () => setCartModal(false);

  const [cartMenu, setCartMenu] = useState<any>(cart);
  const [addMenuError, setAddMenuError] = useState("");

  const [chefLoading, setChefLoading] = useState(false);
  const [chefs, setChefs] = useState<any>([]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [chefPage, setChefPage] = useState(1);
  const [lastProcessedChefId, setLastProcessedChefId] = useState();
  const [nextPageExists, setNextPageExists] = useState(true);
  const [chefPageLoading, setChefPageLoading] = useState(false);

  const [selectedView, setSelectedView] = useState(VIEW_OPTIONS[0]);
  const [selectedPrice, setSelectedPrice] = useState<any>();
  const [selectedDelivery, setSelectedDelivery] = useState<any>();
  const [selectedLocation, setSelectedLocation] = useState<any>();

  // SELECTED FILTER
  const [selectedFilter, setSelectedFilter] = useState(false);

  const [selectedChef, setSelectedChef] = useState<any>(cartChef);

  const [errorLogin, setErrorLogin] = useState("");

  // START CLOSE VIEW MENU

  const [openSelectedView, setOpenSelectedView] = useState(false);
  const [openSelectedLocation, setOpenSelectedLocation] = useState(false);
  const [openSelectedPrice, setOpenSelectedPrice] = useState(false);
  const [openSelectedDelivery, setOpenSelectedDelivery] = useState(false);

  const viewRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: " window.location.search",
    });
  }, []);

  useEffect(() => {
    const closeOpenMenus = (e: MouseEvent) => {
      if (
        viewRef.current &&
        openSelectedView &&
        !viewRef.current.contains(e.target as Node)
      ) {
        setOpenSelectedView(false);
      }

      if (
        locationRef.current &&
        openSelectedLocation &&
        !locationRef.current.contains(e.target as Node)
      ) {
        setOpenSelectedLocation(false);
      }

      if (
        priceRef.current &&
        openSelectedPrice &&
        !priceRef.current.contains(e.target as Node)
      ) {
        setOpenSelectedPrice(false);
      }

      if (
        deliveryRef.current &&
        openSelectedDelivery &&
        !deliveryRef.current.contains(e.target as Node)
      ) {
        setOpenSelectedDelivery(false);
      }
    };

    document.addEventListener("mousedown", closeOpenMenus);

    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [
    viewRef,
    locationRef,
    deliveryRef,
    priceRef,
    openSelectedView,
    openSelectedLocation,
    openSelectedDelivery,
    openSelectedPrice,
  ]);

  // END CLOSE VIEW MENU

  const [selectedDate, setSelectedDate] = useState("all");

  const getChefs = useCallback(async () => {
    setChefLoading(true);
    try {
      const { data } = await getAllChefs();
      if (data.data.length > 0) {
        setChefs(data?.data);
        setLastProcessedChefId(data?.lastProcessedChefId);
      }
    } catch (error) {
      alert("Error getting chefs");
    } finally {
      setChefLoading(false);
    }
  }, []);

  const getChefByPage = async () => {
    const localPage = chefPage + 1;
    setChefPageLoading(true);
    try {
      const { data } = await getAllChefs(localPage, lastProcessedChefId);

      if (data.data.length > 0) {
        const localChef = [...chefs];
        const newArr = localChef.concat(data.data);
        setChefs(newArr);
        setChefPage(localPage);
        setLastProcessedChefId(data?.lastProcessedChefId);
        setNextPageExists(data.nextPageExists);
      }
    } catch (error) {
      alert("Error getting chefs");
    } finally {
      setChefPageLoading(false);
    }
  };

  const [searchText, setSearchText] = useState<any>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    getChefs();
    dispatch(getProfileUserAccount());
  }, [getChefs]);

  const [cartView, setCartView] = useState(true);
  const [deliveryView, setDeliveryView] = useState(false);
  const [reviewView, setReviewView] = useState(false);

  const [selectedMealQuantityReached, setSelectedMealQuantityReached] =
    useState<any>();
  const [showMinimumQuantityReached, setShowMinimumQuantityReached] =
    useState(false);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("wallet");

  const resetCartView = () => {
    setCartView(true);
    setDeliveryView(false);
    setReviewView(false);
  };

  const handleAddToBag = (menu: any, chef: any) => {
    let localCart = [...cartMenu];

    if (selectedChef?.profile?._id === chef?.profile?._id) {
      if (localCart.includes(menu)) {
        const index = localCart.indexOf(menu);
        localCart.splice(index, 1);
        setCartMenu(localCart);
        // Dispatch to redux
        dispatch(addToCart(localCart));
      } else {
        const menuWithQuantity = { ...menu, quantity: menu.minimumQuantity };
        localCart.push(menuWithQuantity);
        setCartMenu(localCart);
        // Dispatch to redux
        dispatch(addToCart(localCart));
      }
    } else {
      localCart = [];
      const menuWithQuantity = { ...menu, quantity: menu.minimumQuantity };
      localCart.push(menuWithQuantity);
      setCartMenu(localCart);
      // Dispatch to redux
      dispatch(addToCart(localCart));
    }

    setAddMenuError("");

    resetCartView();

    TrackGoogleAnalyticsEvent(
      "EXPLORE_ADD_MEAL_TO_BAG",
      `${chef?.business?.businessName} Add meal to bag`,
      window.location.pathname + window.location.search,
      {
        foodName: menu?.foodName,
        chef: chef?.business?.businessName,
      }
    );
    Hotjar.event("EXPLORE_ADD_MEAL_TO_BAG");
  };

  const handleIncrement = (meal: any) => {
    const localCartMenu = [...cartMenu];
    let menu = localCartMenu.find((m) => m === meal);

    // Create a new object for the updated menu item
    const updatedMenu = { ...menu, quantity: menu.quantity + 1 };

    // Replace the old menu with the updated one in the localCartMenu
    const updatedCartMenu = localCartMenu.map((m) =>
      m === menu ? updatedMenu : m
    );

    setCartMenu(updatedCartMenu);

    // Dispatch to Redux
    dispatch(addToCart(updatedCartMenu));

    resetCartView();

    setSelectedMealQuantityReached("");
    setShowMinimumQuantityReached(false);
  };

  const handleDecrement = (meal: any, minimumQuantity: any) => {
    const localMenu = [...cartMenu];
    let menu = localMenu.find((l) => l === meal);
    if (menu.quantity === minimumQuantity) {
      setShowMinimumQuantityReached(true);
      setSelectedMealQuantityReached(meal);
      return;
    } else {
      // Create a new object for the updated menu item
      const updatedMenu = { ...menu, quantity: menu.quantity - 1 };

      // Replace the old menu with the updated one in the localCartMenu
      const updatedCartMenu = localMenu.map((m) =>
        m === menu ? updatedMenu : m
      );

      setCartMenu(updatedCartMenu);

      // Dispatch to Redux
      dispatch(addToCart(updatedCartMenu));

      setSelectedMealQuantityReached("");
      setShowMinimumQuantityReached(false);
    }

    resetCartView();
  };

  const handleDelete = (meal: any) => {
    const localMenu = [...cartMenu];
    let index = localMenu.indexOf(meal);
    localMenu.splice(index, 1);
    setCartMenu(localMenu);
    // Dispatch to redux
    dispatch(addToCart(localMenu));
  };

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [verifyPaymentModal, setVerifyPaymentModal] = useState(false);
  const openVerifyPaymentModal = () => setVerifyPaymentModal(true);
  const closeVerifyPaymentModal = () => setVerifyPaymentModal(false);

  const verifyTransaction = async (referenceId: any) => {
    try {
      const { data } = await axios.get(
        `${TRANSACTION_URL}/verify/${referenceId}`
      );
      const result = data?.data;

      if (result?.status) {
        closeVerifyPaymentModal();
        dispatch(clearCart());
        if (result?.data?.status === "success") {
          navigate(CUSTOMER_ROUTES.linkCustomerOrders);
        }
      }
    } catch (error) {}
  };

  const handleCheckout = async (orderItem: any) => {
    setCheckoutLoading(true);
    const amount = orderItem.discountAmount || orderItem.totalAmount;
    try {
      const { data } = await createAnOrder(orderItem);

      if (data.success) {
        let handler = window.PaystackPop.setup({
          key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Replace with your public key
          email: user.email,
          amount: amount * 100,
          ref: data.data.orderId, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
          // label: "Optional string that replaces customer email"
          metadata: {
            transactionType: "MEAL_ORDER",
            userId: user._id,
          },
          onClose: function () {
            alert("Transaction was not completed, window closed.");
          },
          callback: function (response: any) {
            // let message = "Payment complete! Reference: " + response.reference;
            // alert(message);

            TrackGoogleAnalyticsEvent(
              "MEAL_ORDER",
              "Create an Order",
              window.location.pathname + window.location.search,
              {
                orderId: data.data.orderId,
                mealAmount: amount,
                userId: user._id,
              }
            );
            TrackGoogleAnalyticsEvent(
              "purchase",
              "Purchase",
              window.location.pathname + window.location.search,
              {
                orderId: data.data.orderId,
                mealAmount: amount,
                userId: user._id,
              }
            );
            Hotjar.event("MEAL_ORDER");
            openVerifyPaymentModal();
            verifyTransaction(data.data.orderId);
          },
        });

        handler.openIframe();
      }
    } catch (err) {
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleWalletCheckout = async (orderItem: any) => {
    setCheckoutLoading(true);

    try {
      const { data } = await createAnOrderWallet(orderItem);

      if (data.success) {
        navigate(CUSTOMER_ROUTES.linkCustomerOrders);
      }
    } catch (err: any) {
      console.log("jjshsissk", err, err?.response?.data);
    } finally {
      setCheckoutLoading(false);
    }
  };

  let totalAmount =
    cartMenu
      ?.map(
        (c: any) =>
          (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
          c.minimumQuantity
      )
      .reduce((partialSum: any, a: any) => partialSum + a, 0) + DELIVERY_COST;

  return (
    <>
      {chefLoading ? (
        <Preloader />
      ) : (
        <div>
          <TopNav
            showCart
            onClickCart={() => setCartModal(!cartModal)}
            cartTotalItems={cartMenu?.length}
          />

          <div>
            <div className="lg:flex flex-row">
              <div className="lg:w-9/12">
                <div className="px-4 lg:pl-14 lg:pr-0">
                  <div className="exploreBannerBackgroundImage h-64 flex items-center">
                    <div className="lg:flex flex-row items-center text-white pl-5 lg:pl-10">
                      <div className="mr-10">
                        <p className="text-3xl font_medium">Homemade</p>
                        <h1 className="text-3xl font_bold">tastes better.</h1>
                      </div>
                      {/* <div className="my-3 lg:my-0" /> */}
                      <div className="mt-2 lg:mt-0 border-t lg:border-t-0 lg:border-l border-white h-3 lg:h-24 w-48 lg:w-0" />

                      <div className="">
                        <div className="lg:ml-5">
                          <p className="w-2/3 font_light text-sm lg:text-base">
                            Missing the taste of home? Pre-order now!
                          </p>
                          <div className="mt-3 w-full bg-white rounded-full px-3 flex items-center justify-between">
                            <div className="py-3">
                              <IoSearchSharp color="#D6D6D6" size={20} />
                            </div>
                            <div className="flex-1 ml-4">
                              <input
                                placeholder="Search homechefs or meals"
                                className="py-3 w-full rounded-full input_text text-md font_regular outline-none"
                                onChange={(e: any) => {
                                  if (e.target.value) {
                                    // setSelectedRegion("all");
                                    setSearchText(e.target.value);

                                    TrackGoogleAnalyticsEvent(
                                      `SEARCH_FOOD_CHEF`,
                                      `Search Food/Chef  ${e?.target?.value}`,
                                      window.location.pathname +
                                        window.location.search,
                                      {}
                                    );
                                    Hotjar.event("SEARCH_FOOD_CHEF");
                                  } else {
                                    // setSelectedRegion("all");
                                    setSearchText(e.target.value);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <Dates
              menu={chefsMenu[0]}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            /> */}
                  {/**************** FILTERS ***************/}
                  <div className="mt-7 mb-9">
                    <div className="mb-10">
                      <p className="text-lg lg:text-2xl font_regular">
                        Filter by:
                      </p>
                      <div className="flex flex-row flex-wrap lg:mt-2 overflow-x-scroll">
                        {/**************** VIEW ***************/}
                        <div className="mt-2 lg:mt-0" ref={viewRef}>
                          <div
                            className={`w-24 lg:w-36 h-10 filter_gray border calendarBorder rounded-full cursor-pointer px-3 flex items-center justify-between`}
                            onClick={() =>
                              setOpenSelectedView(!openSelectedView)
                            }
                          >
                            <p
                              className={`text-xs lg:text-sm filter_text font_medium`}
                            >
                              {selectedView}
                            </p>
                            {openSelectedView ? (
                              <TiArrowSortedUp color="#8E8E8E" size={20} />
                            ) : (
                              <TiArrowSortedDown color="#8E8E8E" size={20} />
                            )}
                          </div>
                          {openSelectedView && (
                            <div
                              className={`absolute z-10 bg-white mb-2 w-24 lg:w-36 calendarBorder p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                            >
                              {VIEW_OPTIONS?.map((view: any, i: number) => (
                                <div
                                  className="flex items-center cursor-pointer mb-2"
                                  key={i}
                                  onClick={() => {
                                    setSelectedView(view);
                                    // handleOpenCloseView();

                                    TrackGoogleAnalyticsEvent(
                                      `FILTER_BY_VIEW`,
                                      `Filter By ${view}`,
                                      window.location.pathname +
                                        window.location.search,
                                      {}
                                    );
                                    Hotjar.event("FILTER_BY_VIEW");
                                  }}
                                >
                                  <div
                                    className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                      selectedView === view
                                        ? "primary_bg_color"
                                        : "bg_gray_color"
                                    }`}
                                  />
                                  <p
                                    className={`text-xs lg:text-sm secondary_gray_color text-black`}
                                  >
                                    {view}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/**************** LOCATION ***************/}
                        {/* <div className="mt-2 lg:mt-0 mx-2" ref={locationRef}>
                          <div
                            className={`w-36 lg:w-40 h-10 filter_gray border calendarBorder rounded-full cursor-pointer px-3 flex items-center justify-between`}
                            onClick={() =>
                              setOpenSelectedLocation(!openSelectedLocation)
                            }
                          >
                            <p
                              className={`text-xs lg:text-sm filter_text font_medium capitalize`}
                            >
                              {selectedLocation || "Location"}
                            </p>
                            {openSelectedLocation ? (
                              <TiArrowSortedUp color="#8E8E8E" size={20} />
                            ) : (
                              <TiArrowSortedDown color="#8E8E8E" size={20} />
                            )}
                          </div>
                          {openSelectedLocation && (
                            <div
                              className={`absolute z-10 bg-white mb-2 w-36 lg:w-40 h-40 overflow-hidden overflow-y-scroll calendarBorder p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                            >
                              {LOCATION_OPTIONS?.map(
                                (location: any, i: number) => (
                                  <div
                                    className="flex items-center cursor-pointer mb-2"
                                    key={i}
                                    onClick={() => {
                                      setSelectedLocation(location.value);
                                      setSelectedRegion(
                                        location.value === "all" ? "all" : ""
                                      );

                                      TrackGoogleAnalyticsEvent(
                                        "FILTER_BY_LOCATION",
                                        `Filter By Location - ${location.label}`,
                                        window.location.pathname +
                                          window.location.search,
                                        {}
                                      );
                                      Hotjar.event("FILTER_BY_LOCATION");
                                    }}
                                  >
                                    <div
                                      className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                        selectedLocation === location.value
                                          ? "primary_bg_color"
                                          : "bg_gray_color"
                                      }`}
                                    />
                                    <p
                                      className={`text-xs lg:text-sm secondary_gray_color text-black`}
                                    >
                                      {location.label}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div> */}

                        {/**************** DELIVERY ***************/}
                        <div className="mt-2 lg:mt-0 mx-2" ref={deliveryRef}>
                          <div
                            className={`w-36 lg:w-40 h-10 filter_gray border calendarBorder rounded-full cursor-pointer px-3 flex items-center justify-between`}
                            onClick={() =>
                              setOpenSelectedDelivery(!openSelectedDelivery)
                            }
                          >
                            <p
                              className={`text-xs lg:text-sm filter_text font_medium capitalize`}
                            >
                              {selectedDelivery?.label || "Delivery"}
                            </p>
                            {openSelectedDelivery ? (
                              <TiArrowSortedUp color="#8E8E8E" size={20} />
                            ) : (
                              <TiArrowSortedDown color="#8E8E8E" size={20} />
                            )}
                          </div>
                          {openSelectedDelivery && (
                            <div
                              className={`absolute z-10 bg-white mb-2 w-36 lg:w-40 calendarBorder p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                            >
                              {DELIVERY_OPTIONS?.map(
                                (delivery: any, i: number) => (
                                  <div
                                    className="flex items-center cursor-pointer mb-2"
                                    key={i}
                                    onClick={() => {
                                      setSelectedDelivery(delivery);

                                      TrackGoogleAnalyticsEvent(
                                        "FILTER_BY_DELIVERY",
                                        `Filter By Delivery - ${delivery.label}`,
                                        window.location.pathname +
                                          window.location.search,
                                        {}
                                      );
                                      Hotjar.event("FILTER_BY_DELIVERY");
                                    }}
                                  >
                                    <div
                                      className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                        selectedDelivery?.value ===
                                        delivery.value
                                          ? "primary_bg_color"
                                          : "bg_gray_color"
                                      }`}
                                    />
                                    <p
                                      className={`text-xs lg:text-sm secondary_gray_color text-black capitalize`}
                                    >
                                      {delivery.label}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>

                        {/**************** PRICE ***************/}
                        <div className="mt-2 lg:mt-0 lg:mx-2" ref={priceRef}>
                          <div
                            className={`w-40 lg:w-48 h-10 filter_gray border calendarBorder rounded-full cursor-pointer px-3 flex items-center justify-between`}
                            onClick={() =>
                              setOpenSelectedPrice(!openSelectedPrice)
                            }
                          >
                            <p
                              className={`text-xs lg:text-sm filter_text font_medium`}
                            >
                              {selectedPrice?.label || "Price"}
                            </p>
                            {openSelectedPrice ? (
                              <TiArrowSortedUp color="#8E8E8E" size={20} />
                            ) : (
                              <TiArrowSortedDown color="#8E8E8E" size={20} />
                            )}
                          </div>
                          {openSelectedPrice && (
                            <div
                              className={`absolute z-10 bg-white mb-2 w-40 lg:w-48 calendarBorder p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                            >
                              {PRICE_OPTIONS?.map((price: any, i: number) => (
                                <div
                                  className="flex items-center cursor-pointer mb-2"
                                  key={i}
                                  onClick={() => {
                                    setSelectedPrice(price);

                                    TrackGoogleAnalyticsEvent(
                                      "FILTER_BY_PRICE",
                                      `Filter By Price - ${price.label}`,
                                      window.location.pathname +
                                        window.location.search,
                                      {}
                                    );
                                    Hotjar.event("FILTER_BY_PRICE");
                                  }}
                                >
                                  <div
                                    className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                      selectedPrice?.value === price?.value
                                        ? "primary_bg_color"
                                        : "bg_gray_color"
                                    }`}
                                  />
                                  <p
                                    className={`text-xs lg:text-sm secondary_gray_color text-black`}
                                  >
                                    {price?.label}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* <div className="mt-2 lg:mt-0 lg:mx-2">
                          <div
                            className={`w-35 lg:w-35 h-10 border calendarBorder rounded-full cursor-pointer px-3 flex items-center justify-between ${ selectedFilter ? "primary_bg_color text-white" : "filter_gray text-black" }`}
                            onClick={() => {
                                    console.log('selectedFilter2= ', selectedFilter)
                                    setSelectedPrice(null);
                                    setSelectedDelivery(null);
                                    setSelectedLocation(null);
                                    setSelectedFilter(false)
                            }}
                          >
                            <p className={`text-xs lg:text-sm font_medium`}>
                              Clear Filters
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </div>

                    {/**************** FOOD REGIONS ***************/}
                    <div>
                      <p className="text-lg lg:text-2xl font_regular">
                        Pick your preferred region
                      </p>
                      <div className="flex flex-row flex-wrap mt-4 overflow-x-auto">
                        <div
                          className={`w-20 lg:w-28 h-10 border rounded-full cursor-pointer flex items-center justify-center ${
                            selectedRegion === "all"
                              ? "primary_bg_color text-white"
                              : "secondary_gray_color text-black"
                          }`}
                          onClick={() => setSelectedRegion("all")}
                        >
                          <p
                            className={`text-xs lg:text-sm ${
                              selectedRegion === "all"
                                ? "primary_bg_color text-white"
                                : "secondary_gray_color text-black"
                            }`}
                          >
                            All
                          </p>
                        </div>
                        {REGIONS.map((region: any, index: number) => (
                          <div
                            key={index}
                            className={`mb-2 w-20 lg:w-28 h-10 border rounded-full mx-1 cursor-pointer flex items-center justify-center ${
                              selectedRegion === region
                                ? "primary_bg_color text-white"
                                : "secondary_gray_color text-black"
                            }`}
                            onClick={() => {
                              setSelectedRegion(region);

                              TrackGoogleAnalyticsEvent(
                                "FILTER_BY_REGION",
                                `Filter By Region - ${region}`,
                                window.location.pathname +
                                  window.location.search,
                                {}
                              );
                              Hotjar.event("FILTER_BY_REGION");
                            }}
                          >
                            <p
                              className={`text-xs lg:text-sm ${
                                selectedRegion === region
                                  ? "primary_bg_color text-white"
                                  : "secondary_gray_color text-black"
                              }`}
                            >
                              {region}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Meals
                        title="Local Favorites"
                        chefs={chefs}
                        selectedView={selectedView}
                        selectedRegion={selectedRegion}
                        selectedLocation={selectedLocation}
                        selectedDelivery={selectedDelivery}
                        selectedPrice={selectedPrice}
                        searchText={searchText}
                        selectedDate={selectedDate}
                        handleAddToBag={handleAddToBag}
                        cartMenu={cartMenu}
                        handleIncrement={handleIncrement}
                        handleDecrement={handleDecrement}
                        selectedMealQuantityReached={
                          selectedMealQuantityReached
                        }
                        showMinimumQuantityReached={showMinimumQuantityReached}
                        addMenuError={addMenuError}
                        setSelectedChef={setSelectedChef}
                        selectedFilter={selectedFilter}
                      />
                    </div>

                    <Button
                      title="See more home chefs"
                      showIcon
                      extraClasses="my-10"
                      onClick={() => {
                        if (nextPageExists) {
                          getChefByPage();
                        }
                      }}
                      loading={chefPageLoading}
                    />
                  </div>

                  <div className="mt-10 mb-20">
                    <Link
                      to={
                        auth
                          ? CUSTOMER_ROUTES.linkCustomerSubscription
                          : AUTH_ROUTES.linkCustomerSignUp
                      }
                    >
                      <div
                        className="lg:hidden w-full bg-no-repeat bg-cover bg-center rounded-2xl"
                        style={{
                          height: 525,
                          backgroundImage: `url("/img/mobile-banner.png")`,
                        }}
                      />
                    </Link>

                    <Link
                      to={
                        auth
                          ? CUSTOMER_ROUTES.linkCustomerSubscription
                          : AUTH_ROUTES.linkCustomerSignUp
                      }
                    >
                      <div
                        className="hidden lg:block w-full h-full bg-no-repeat bg-cover rounded-2xl"
                        style={{
                          height: 258,
                          backgroundImage: `url("/img/desktop-banner.png")`,
                        }}
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block w-3/12 h-full fixed right-0 z-30">
                <div className="">
                  <Cart
                    handleCheckout={(orderItem: any) =>
                      handleCheckout(orderItem)
                    }
                    handleWalletCheckout={(orderItem: any) =>
                      handleWalletCheckout(orderItem)
                    }
                    checkoutLoading={checkoutLoading}
                    cartMenu={cartMenu}
                    chef={selectedChef}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    cartView={cartView}
                    setCartView={setCartView}
                    deliveryView={deliveryView}
                    setDeliveryView={setDeliveryView}
                    reviewView={reviewView}
                    setReviewView={setReviewView}
                    selectedPaymentOption={selectedPaymentOption}
                    setSelectedPaymentOption={setSelectedPaymentOption}
                    errorLogin={errorLogin}
                    setErrorLogin={setErrorLogin}
                    handleDelete={handleDelete}
                    selectedMealQuantityReached={selectedMealQuantityReached}
                    showMinimumQuantityReached={showMinimumQuantityReached}
                    addMenuError={addMenuError}
                    setAddMenuError={setAddMenuError}
                  />
                </div>
              </div>
            </div>
          </div>

          <Footer
            chefDashboard={person?.userType === USER_TYPE.CHEF ? true : false}
          />

          <CartFloat
            cartMenu={cartMenu}
            totalAmount={totalAmount}
            deliveryCost={DELIVERY_COST}
            cartModal={cartModal}
            setCartModal={setCartModal}
          />

          <Modal
            open={cartModal}
            onClose={closeCartModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            className="lg:hidden"
          >
            <div
              className="absolute z-10 h-full bg-white overflow-auto outline-none right-0"
              style={{ width: "25rem" }}
            >
              <div className="flex pt-5 pr-5">
                <div className="flex-1"></div>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeCartModal}
                />
              </div>
              <Cart
                handleCheckout={(orderItem: any) => handleCheckout(orderItem)}
                handleWalletCheckout={(orderItem: any) =>
                  handleWalletCheckout(orderItem)
                }
                checkoutLoading={checkoutLoading}
                cartMenu={cartMenu}
                chef={selectedChef}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                cartView={cartView}
                setCartView={setCartView}
                deliveryView={deliveryView}
                setDeliveryView={setDeliveryView}
                reviewView={reviewView}
                setReviewView={setReviewView}
                selectedPaymentOption={selectedPaymentOption}
                setSelectedPaymentOption={setSelectedPaymentOption}
                errorLogin={errorLogin}
                setErrorLogin={setErrorLogin}
                handleDelete={handleDelete}
                selectedMealQuantityReached={selectedMealQuantityReached}
                showMinimumQuantityReached={showMinimumQuantityReached}
                addMenuError={addMenuError}
                setAddMenuError={setAddMenuError}
              />
            </div>
          </Modal>

          <Modal
            open={verifyPaymentModal}
            onClose={closeVerifyPaymentModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-80 h-40 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <h3 className="text-center font_bold text-2xl black2">
                Verifying payment
              </h3>

              <div className="mt-3 flex justify-center" role="status">
                <ColoredSpinner heightWidthClasses="h-10 w-10" />
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Explore;
