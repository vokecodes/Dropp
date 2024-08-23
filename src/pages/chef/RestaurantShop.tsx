import React, { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import { Modal } from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { GiCook, GiHotMeal, GiKnifeFork, GiMeat } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Hotjar from "@hotjar/browser";
import Footer from "../../components/landing-page/Footer";
import TopNav from "../../components/landing-page/TopNav";
import { CiShare2 } from "react-icons/ci";
import { BiArrowBack } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import ChefShopMenuCard from "../../components/ChefShopMenuCard";
import ChefsReviews from "../../components/ChefsReviews";
import Cart from "../../components/Cart";
import { createARestaurantOrder } from "../../_redux/order/orderCrud";
import {
  getABusinessRestaurantByName,
  getABusinessRestaurantOrderByName,
} from "../../_redux/business/businessCrud";
import axios from "axios";
import {
  DELIVERY_COST,
  DINNING_MENU_CATEGORY_URL,
  TRANSACTION_URL,
} from "../../_redux/urls";
import { CUSTOMER_ROUTES, HOME_ROUTES } from "../../routes/routes";
import Preloader from "../../components/Preloader";
import { useAppDispatch } from "../../redux/hooks";
import ColoredSpinner from "../../components/ColoredSpinner";
import moment from "moment";
import { formatPrice } from "../../utils/formatMethods";
import NotFound from "../../components/NotFound";
import { addToCart, clearCart } from "../../_redux/cart/cartAction";
import CartFloat from "../../components/CartFloat";
import TrackGoogleAnalyticsEvent from "../../components/TrackGoogleAnalyticsEvent";
import { MdEmojiFoodBeverage, MdHomeFilled } from "react-icons/md";
import Button from "../../components/Button";
import { SERVER } from "../../config/axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import RestaurantCart from "../../components/RestaurantCart";
import { IoSearchSharp } from "react-icons/io5";
import RestaurantMeal from "../../components/RestaurantMeal";

const RestaurantShop = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { user, auth, cart } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
      user: state.user.user,
      cart: state.cart.cart,
    }),
    shallowEqual
  );

  const { businessName, table } = useParams();

  const [chef, setChef] = useState<any>(null);

  const [chefRecommendedMenu, setChefRecommendedMenu] = useState<any>(null);

  const [selectedCategory, setSelectedCategory] = useState<any>("All");

  const [searchText, setSearchText] = useState<any>("");

  const getChef = async () => {
    setIsLoading(true);
    try {
      const businessRestaurant = await getABusinessRestaurantByName(
        businessName
      );
      const restaurantOrder = await getABusinessRestaurantOrderByName(
        businessName
      );

      if (businessRestaurant.data) {
        setChef(businessRestaurant.data.data);
      }

      if (restaurantOrder.data) {
        setChefRecommendedMenu(restaurantOrder.data.data?.recommendedMenu);
      }
    } catch (error) {
      // Handle errors here
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: businessName,
    });
  }, []);

  useEffect(() => {
    getChef();
  }, []);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutLaterLoading, setCheckoutLaterLoading] = useState(false);

  const [cartMenu, setCartMenu] = useState<any>(cart);
  const [selectedDate, setSelectedDate] = useState("all");

  const [verifyPaymentModal, setVerifyPaymentModal] = useState(false);
  const openVerifyPaymentModal = () => setVerifyPaymentModal(true);
  const closeVerifyPaymentModal = () => setVerifyPaymentModal(false);

  const [errorLogin, setErrorLogin] = useState("");
  const [addMenuError, setAddMenuError] = useState("");

  const [cartModal, setCartModal] = useState(false);

  const [descriptionTextClass, setDescriptionTextClass] = useState(false);

  const [cartView, setCartView] = useState(true);
  const [deliveryView, setDeliveryView] = useState(false);
  const [reviewView, setReviewView] = useState(false);
  const [selectedMealQuantityReached, setSelectedMealQuantityReached] =
    useState<any>();
  const [showMinimumQuantityReached, setShowMinimumQuantityReached] =
    useState(false);

  const [placed, setPlaced] = useState(false);
  const openModal = () => setPlaced(true);
  const closeModal = () => setPlaced(false);

  const [businessModal, setBusinessModal] = useState(false);
  const openBusinessModal = () => setBusinessModal(true);
  const closeBusinessModal = () => setBusinessModal(false);

  const resetCartView = () => {
    setCartView(true);
    setDeliveryView(false);
    setReviewView(false);
  };

  const handleAddToBag = (menu: any) => {
    const localCart = [...cartMenu];

    if (localCart.includes(menu)) {
      const index = localCart.indexOf(menu);
      localCart.splice(index, 1);
      setCartMenu(localCart);
      // Dispatch to redux
      dispatch(addToCart(localCart));
    } else {
      // menu.quantity = menu.minimumQuantity;
      localCart.push({ ...menu, quantity: menu.minimumQuantity });
      setCartMenu(localCart);
      // Dispatch to redux
      dispatch(addToCart(localCart));
    }

    setAddMenuError("");

    resetCartView();

    TrackGoogleAnalyticsEvent(
      "CHEF_SHOP_ADD_MEAL_TO_BAG",
      `${chef?.business?.businessName} Add meal to bag`,
      window.location.pathname + window.location.search,
      {
        foodName: menu?.foodName,
        chef: chef?.business?.businessName,
      }
    );
    Hotjar.event("CHEF_SHOP_ADD_MEAL_TO_BAG");
  };

  // const handleAddToBag = (menu: any) => {
  //   const localCart = [...cartMenu];

  //   // Check if menu is in the cart
  //   const menuIndex = localCart.findIndex((item) => item.id === menu.id);

  //   if (menuIndex !== -1) {
  //     // If menu is in the cart, create a new object with the updated quantity
  //     const updatedMenu = {
  //       ...localCart[menuIndex],
  //       quantity: menu.minimumQuantity,
  //     };
  //     localCart.splice(menuIndex, 1, updatedMenu);
  //   } else {
  //     // If menu is not in the cart, add it with the initial quantity
  //     const newMenu = { ...menu, quantity: menu.minimumQuantity };
  //     localCart.push(newMenu);
  //   }

  //   setCartMenu(localCart);
  //   // Dispatch to redux
  //   dispatch(addToCart(localCart));

  //   setAddMenuError("");
  //   resetCartView();

  //   TrackGoogleAnalyticsEvent(
  //     "CHEF_SHOP_ADD_MEAL_TO_BAG",
  //     `${chef?.business?.businessName} Add meal to bag`,
  //     window.location.pathname + window.location.search,
  //     {
  //       foodName: menu?.foodName,
  //       chef: chef?.business?.businessName,
  //     }
  //   );
  //   Hotjar.event("CHEF_SHOP_ADD_MEAL_TO_BAG");
  // };

  const verifyTransaction = async (referenceId: any) => {
    try {
      const { data } = await axios.get(
        `${TRANSACTION_URL}/verify/${referenceId}`
      );
      const result = data?.data;

      if (result?.status) {
        closeVerifyPaymentModal();
        openModal();
      }
    } catch (error) {}
  };

  const handleCheckout = async (orderItem: any) => {
    setCheckoutLoading(true);

    const amount =
      orderItem.discountAmount > 0
        ? orderItem.discountAmount
        : orderItem.totalAmount;

    try {
      const { data } = await createARestaurantOrder({ ...orderItem, table });

      if (data.success) {
        let handler = window.PaystackPop.setup({
          key: import.meta.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Replace with your public key
          email: orderItem.email,
          amount: amount * 100,
          ref: data.data.orderId, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
          // label: "Optional string that replaces customer email"
          metadata: {
            transactionType: "RESTAURANT_ORDER",
          },
          onClose: function () {
            alert("Transaction was not completed, window closed.");
          },
          callback: function (response: any) {
            // let message = "Payment complete! Reference: " + response.reference;
            // alert(message);
            // TrackGoogleAnalyticsEvent(
            //   "RESTAURANT_ORDER",
            //   "Create a restaurant Order",
            //   window.location.pathname + window.location.search,
            //   { orderId: data.data.orderId, amount: amount, userId: user._id }
            // );
            // TrackGoogleAnalyticsEvent(
            //   "purchase",
            //   "Purchase",
            //   window.location.pathname + window.location.search,
            //   { orderId: data.data.orderId, amount: amount, userId: user._id }
            // );
            // Hotjar.event("RESTAURANT_ORDER");

            resetCartView();
            dispatch(clearCart());
            setCartMenu([]);
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

  const handlePayLaterCheckout = async (orderItem: any) => {
    console.log("orderItem", orderItem);

    setCheckoutLaterLoading(true);

    try {
      const { data } = await createARestaurantOrder({
        ...orderItem,
        table,
        posPayment: true,
      });

      if (data.success) {
        resetCartView();
        dispatch(clearCart());
        setCartMenu([]);
        openModal();
      }
    } catch (err) {
    } finally {
      setCheckoutLaterLoading(false);
    }
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
      // setShowMinimumQuantityReached(true);
      // setSelectedMealQuantityReached(meal);
      handleDelete(meal);
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

  const closeCartModal = () => setCartModal(false);

  let totalAmount = cartMenu
    ?.map(
      (c: any) =>
        (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
        c.quantity
    )
    .reduce((partialSum: any, a: any) => partialSum + a, 0);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {chef && chef?.business ? (
            <div className="h-full">
              {/* <TopNav
                showCart
                onClickCart={() => setCartModal(!cartModal)}
                cartTotalItems={cartMenu?.length}
              /> */}
              <div className="h-full">
                <div className="lg:flex flex-row h-full">
                  <div className="lg:w-9/12 h-full">
                    <div className="w-full flex flex-col items-start justify-between gap-y-0 lg:gap-y-8">
                      {/* BIO */}
                      <div className="w-full lg:pl-10">
                        <div className="flex flex-row items-center my-5 lg:my-0 mx-5">
                          <div className="">
                            <div
                              className={`border-4 w-20 lg:w-32 h-20 lg:h-32 rounded-full flex justify-center items-center  overflow-hidden ${
                                chef?.profile?.image
                                  ? "border-white"
                                  : "primary_border_color"
                              }`}
                            >
                              {chef?.profile?.image ? (
                                <img
                                  src={chef?.profile?.image}
                                  alt="chef"
                                  className="w-20 lg:w-32 h-20 lg:h-32 rounded-full object-cover"
                                />
                              ) : (
                                <GiCook
                                  color="#06c167"
                                  className="w-20 lg:w-32 h-20 lg:h-32 rounded-full p-4"
                                />
                              )}
                            </div>
                          </div>
                          <div className="flex-1 ml-4">
                            <div>
                              <div className="flex flex-row gap-x-2 items-center">
                                <h1 className="text-xl lg:text-3xl font_bold ">
                                  {chef?.business?.businessName}
                                </h1>
                                <div className="w-2 h-2 rounded-full bg-[#8E8E8E]" />
                                <p className="input_text font_regular">
                                  {table}
                                </p>
                              </div>

                              <div className="flex gap-x-1 items-center cursor-pointer">
                                <h3
                                  className="text-gray-400 text-sm font_bold"
                                  onClick={openBusinessModal}
                                >
                                  Learn more
                                </h3>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="#949494"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* SEARCH */}
                      <div className="w-full px-3 lg:px-16">
                        <div className="bg_sec_gray_color w-full lg:w-1/2 rounded-full px-3 flex items-center justify-between">
                          <div className="py-3">
                            <IoSearchSharp color="#D6D6D6" size={20} />
                          </div>
                          <div className="flex-1 ml-4">
                            <input
                              placeholder="E.g Jollof Rice"
                              className="bg_sec_gray_color py-3 w-full rounded-full input_text text-md font_regular outline-none"
                              onChange={(e: any) => {
                                if (e.target.value) {
                                  setSearchText(e.target.value);
                                } else {
                                  setSearchText(e.target.value);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CATEGORIES */}
                    <div className="sticky top-0 z-30 w-full px-2 lg:pl-16 pt-4 pb-2 bg-white">
                      <div className="flex flex-row flex-nowrap overflow-x-scroll pb-2">
                        <div
                          className={`px-5 py-3 flex shrink-0 items-center mr-3 rounded-full cursor-pointer ${
                            selectedCategory === "All"
                              ? "primary_bg_color"
                              : "bg_sec_gray_color"
                          }`}
                          onClick={() => setSelectedCategory("All")}
                        >
                          <GiKnifeFork
                            size={24}
                            color={
                              selectedCategory === "All" ? "#ffffff" : "#6d6d6d"
                            }
                          />
                          <p
                            className={`pl-2 text-md ${
                              selectedCategory === "All"
                                ? "text-white"
                                : "menu_category_text"
                            }`}
                          >
                            All
                          </p>
                        </div>
                        {chef?.menuCategories &&
                          chef?.menuCategories?.length > 0 &&
                          chef?.menuCategories
                            ?.filter((cats: any) =>
                              chef?.menu.find(
                                (m: any) => m.category === cats.value
                              )
                            )
                            .map((category: any, i: number) => (
                              <div
                                key={i}
                                className={`px-4 py-3 flex shrink-0 items-center justify-center text-center rounded-full mr-3 cursor-pointer ${
                                  selectedCategory === category?.value
                                    ? "primary_bg_color"
                                    : "bg_sec_gray_color"
                                } `}
                                onClick={() =>
                                  setSelectedCategory(category?.label)
                                }
                              >
                                <MdFastfood
                                  size={24}
                                  color={
                                    selectedCategory === category?.value
                                      ? "#ffffff"
                                      : "#6d6d6d"
                                  }
                                />
                                <p
                                  className={`pl-2 text-md ${
                                    selectedCategory === category?.value
                                      ? "text-white"
                                      : "menu_category_text"
                                  }`}
                                >
                                  {category?.label}
                                </p>
                              </div>
                            ))}
                      </div>
                    </div>

                    {/* MEALS */}
                    <div className="pb-20 px-2 lg:pl-10 lg:pr-0">
                      <div className="flex flex-col lg:gap-y-2">
                        {chef?.menuCategories &&
                        chef?.menuCategories?.length > 0 ? (
                          selectedCategory === "All" ? (
                            // chef?.menuCategories.map(
                            //   (category: any, i: number) => (
                            <div
                              // key={category?.value}
                              className="flex flex-col items-start justify-start gap-y-1"
                            >
                              <RestaurantMeal
                                // category={category}
                                selectedCategory={selectedCategory}
                                chef={chef}
                                handleAddToBag={handleAddToBag}
                                cartMenu={cartMenu}
                                searchText={searchText}
                                handleIncrement={handleIncrement}
                                handleDecrement={handleDecrement}
                                chefRecommendedMenu={chefRecommendedMenu}
                                showMinimumQuantityReached={
                                  showMinimumQuantityReached
                                }
                                addMenuError={addMenuError}
                                selectedMealQuantityReached={
                                  selectedMealQuantityReached
                                }
                              />
                            </div>
                          ) : (
                            //   )
                            // )
                            <div className="flex flex-col items-start justify-start gap-y-1">
                              {/* <div>
                              <h1 className="card_headerText text-2xl">
                                {selectedCategory}
                              </h1>
                            </div> */}
                              <RestaurantMeal
                                selectedCategory={selectedCategory}
                                chef={chef}
                                handleAddToBag={handleAddToBag}
                                cartMenu={cartMenu}
                                searchText={searchText}
                                handleIncrement={handleIncrement}
                                handleDecrement={handleDecrement}
                                chefRecommendedMenu={chefRecommendedMenu}
                                showMinimumQuantityReached={
                                  showMinimumQuantityReached
                                }
                                addMenuError={addMenuError}
                                selectedMealQuantityReached={
                                  selectedMealQuantityReached
                                }
                              />
                            </div>
                          )
                        ) : (
                          <div className="flex flex-col items-center">
                            <img
                              src="/img/no-employees.svg"
                              alt="empty"
                              className="mt-8 mb-3"
                            />
                            <h2 className="text-xl input_text mb-3">
                              No meals here.
                            </h2>
                          </div>
                        )}
                      </div>

                      {/* REVIEWS */}
                      <div className="my-10">
                        <ChefsReviews reviews={chef?.reviews} />
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block w-3/12 h-full fixed right-0 z-30">
                    <div className="">
                      <RestaurantCart
                        handleCheckout={(orderItem: any) =>
                          handleCheckout(orderItem)
                        }
                        handlePayLaterCheckout={(orderItem: any) =>
                          handlePayLaterCheckout(orderItem)
                        }
                        checkoutLoading={checkoutLoading}
                        checkoutLaterLoading={checkoutLaterLoading}
                        cartMenu={cartMenu}
                        chef={chef}
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
                        errorLogin={errorLogin}
                        setErrorLogin={setErrorLogin}
                        handleDelete={handleDelete}
                        selectedMealQuantityReached={
                          selectedMealQuantityReached
                        }
                        showMinimumQuantityReached={showMinimumQuantityReached}
                        addMenuError={addMenuError}
                        setAddMenuError={setAddMenuError}
                        openModal={openModal}
                        chefRecommendedMenu={chefRecommendedMenu}
                        handleAddToBag={handleAddToBag}
                        cartModal={cartModal}
                        setCartModal={setCartModal}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Footer noLove={true} />

              <CartFloat
                cartMenu={cartMenu}
                totalAmount={totalAmount}
                deliveryCost={0}
                cartModal={cartModal}
                setCartModal={setCartModal}
                restaurantcartMenu={true}
              />

              <Modal
                open={cartModal}
                onClose={closeCartModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                className="lg:hidden"
              >
                <div className="absolute z-10 h-full w-screen bg-neutral-100 lg:bg-white overflow-auto outline-none">
                  {/* <div className="flex pt-5 pr-5">
                    <div className="flex-1"></div>
                    <IoMdClose
                      size={24}
                      color="#8E8E8E"
                      className="cursor-pointer"
                      onClick={closeCartModal}
                    />
                  </div> */}
                  <RestaurantCart
                    handleCheckout={(orderItem: any) =>
                      handleCheckout(orderItem)
                    }
                    handlePayLaterCheckout={(orderItem: any) =>
                      handlePayLaterCheckout(orderItem)
                    }
                    checkoutLoading={checkoutLoading}
                    checkoutLaterLoading={checkoutLaterLoading}
                    cartMenu={cartMenu}
                    chef={chef}
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
                    errorLogin={errorLogin}
                    setErrorLogin={setErrorLogin}
                    handleDelete={handleDelete}
                    selectedMealQuantityReached={selectedMealQuantityReached}
                    showMinimumQuantityReached={showMinimumQuantityReached}
                    addMenuError={addMenuError}
                    setAddMenuError={setAddMenuError}
                    openModal={openModal}
                    chefRecommendedMenu={chefRecommendedMenu}
                    handleAddToBag={handleAddToBag}
                    cartModal={cartModal}
                    setCartModal={setCartModal}
                    totalAmount={totalAmount}
                  />
                </div>
              </Modal>

              {/* RESTAURANT DETAILS */}

              <Modal
                open={businessModal}
                onClose={closeBusinessModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                component={"div"}
              >
                <div className="absolute top-1/2 left-1/2 w-11/12 lg:w-1/3 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl my-10 pb-4 outline-none">
                  <div className="px-4 pt-4 flex justify-end cursor-pointer">
                    <span className="w-fit h-fit p-2 rounded-full border-2 border-neutral-300 hover:bg-neutral-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#D6D6D6"
                        className="w-6 h-6"
                        onClick={closeBusinessModal}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row p-3 lg:p-5 items-start">
                    <div className="flex items-center justify-center lg:block">
                      <div
                        className={`border-4 w-28 lg:w-40 h-28 lg:h-40 rounded-full flex justify-center items-center  overflow-hidden ${
                          chef?.profile?.image
                            ? "border-white"
                            : "primary_border_color"
                        }`}
                      >
                        {chef?.profile?.image ? (
                          <img
                            src={chef?.profile?.image}
                            alt="chef"
                            className="w-28 lg:w-40 h-28 lg:h-40 rounded-full object-cover object-center"
                          />
                        ) : (
                          <GiCook
                            color="#06c167"
                            className="w-28 lg:w-40 h-28 lg:h-40 rounded-full p-4"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 ml-4">
                      <div>
                        <div className="flex flex-row gap-x-2 items-center">
                          <h1 className="text-xl lg:text-3xl font_bold ">
                            {chef?.business?.businessName}
                          </h1>
                          <div className="w-2 h-2 rounded-full bg-[#8E8E8E]" />
                          <p className="input_text font_regular">{table}</p>
                        </div>

                        <p className="input_text font_regular">
                          By{" "}
                          <span className="capitalize">
                            {chef?.profile?.firstName}
                          </span>{" "}
                          <span className="capitalize">
                            {chef?.profile?.lastName}
                          </span>
                        </p>

                        {chef?.profile?.address && (
                          <p className="input_text text-base font_bold">
                            <span className="capitalize">
                              {chef?.profile?.address}
                            </span>
                          </p>
                        )}

                        <div className="lg:flex my-3">
                          <div
                            className={`w-60 flex p-2 items-center justify-center rounded-lg ${
                              chef?.profile?.virtualKitchenVisit
                                ? "bg_green"
                                : "sec_primary_bg_color"
                            }`}
                          >
                            <img
                              src={
                                chef?.profile?.virtualKitchenVisit
                                  ? "/images/food_safety_icon.svg"
                                  : "/images/food_safety_pending_icon.svg"
                              }
                              alt="safety batch"
                            />
                            <p
                              className={`ml-3 font-bold ${
                                chef?.profile?.virtualKitchenVisit
                                  ? "txt_green"
                                  : "txt_danger"
                              }`}
                            >
                              Food Safety{" "}
                              {chef?.profile?.virtualKitchenVisit
                                ? "Certified"
                                : "Pending"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p
                            className={`input_text font_regular text-sm text-wrap ${
                              descriptionTextClass ? "h-10 overflow-hidden" : ""
                            }`}
                          >
                            {chef?.business?.businessDescription}
                          </p>
                          <span
                            className="input_text font_regular text-sm underline font-bold cursor-pointer"
                            onClick={() =>
                              setDescriptionTextClass(!descriptionTextClass)
                            }
                          >
                            View {descriptionTextClass ? "less" : "more"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>

              <Modal
                open={verifyPaymentModal}
                onClose={closeVerifyPaymentModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <div className="absolute top-1/2 left-1/2 w-80 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
                  <h3 className="text-center font_bold text-2xl black2">
                    Verifying payment
                  </h3>

                  <div className="mt-3 flex justify-center" role="status">
                    <ColoredSpinner heightWidthClasses="h-10 w-10" />
                  </div>
                </div>
              </Modal>

              {/* ORDER PLACED MODAL */}
              <Modal
                open={placed}
                onClose={() => {
                  closeModal();
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
                  <div className="flex flex-col justify-between items-center p-0 h-full">
                    <div
                      className="h-fit my-3 w-100 w-full flex flex-col gap-y-10"
                      style={{ minHeight: "80%" }}
                    >
                      <div className="flex">
                        <p className="flex-1 text-xl text-center font_bold black2"></p>
                        <IoMdClose
                          size={24}
                          color="#8E8E8E"
                          className="cursor-pointer"
                          onClick={() => {
                            closeModal();
                          }}
                        />
                      </div>

                      <div
                        className="flex flex-col justify-center items-center h-full w-full mb-5"
                        style={{ minHeight: "80%" }}
                      >
                        <div className="flex flex-col justify-center items-center w-full">
                          <div className="my-6 w-20 lg:w-28 h-20 lg:h-28 border-8 primary_border_color rounded-full flex justify-center items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#06c167"
                              className="w-10 lg:w-14 h-10 lg:h-14"
                            >
                              <path
                                fillRule="evenodd"
                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="my-3 text-lg lg:text-xl text-center font_bold black2">
                            Your order has been received!
                          </p>
                          <p className="text-sm lg:text-lg text-neutral-600 lg:text-black font_medium text-center">
                            Check your email/WhatsApp to track order status.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="my-10 w-full">
                      <Button
                        title="Okay"
                        extraClasses="w-full p-3 rounded-full"
                        onClick={() => closeModal()}
                      />
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  );
};

export default RestaurantShop;
