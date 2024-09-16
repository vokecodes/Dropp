// @ts-nocheck
import React, { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import { Modal } from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { GiCook } from "react-icons/gi";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { IoMdClose } from "react-icons/io";
import Hotjar from "@hotjar/browser";
import Footer from "../../components/landing-page/Footer";
import TopNav from "../../components/landing-page/TopNav";
import { CiShare2 } from "react-icons/ci";
import { BiArrowBack } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ChefsDates from "../../components/landing-page/ChefsDates";
import ChefShopMenuCard from "../../components/ChefShopMenuCard";
import ChefsReviews from "../../components/ChefsReviews";
import Cart from "../../components/Cart";
import {
  createAnOrder,
  createAnOrderWallet,
} from "../../_redux/order/orderCrud";
import { getABusinessByName } from "../../_redux/business/businessCrud";
import axios from "axios";
import { DELIVERY_COST, TRANSACTION_URL } from "../../_redux/urls";
import { AUTH_ROUTES, CUSTOMER_ROUTES, HOME_ROUTES } from "../../routes/routes";
import Preloader from "../../components/Preloader";
import { useAppDispatch } from "../../redux/hooks";
import {
  favoriteAChef,
  getFavouriteChefs,
  unFavoriteAChef,
} from "../../_redux/favourite/favouriteAction";
import ColoredSpinner from "../../components/ColoredSpinner";
import moment from "moment";
import { formatPrice } from "../../utils/formatMethods";
import NotFound from "../../components/NotFound";
import { addToCart, clearCart } from "../../_redux/cart/cartAction";
import CartFloat from "../../components/CartFloat";
import TrackGoogleAnalyticsEvent from "../../components/TrackGoogleAnalyticsEvent";

const APP_URL = window.location.origin;

const ChefShop = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { user, auth, favouriteChefs, chefLoading, cart } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
      user: state.user.user,
      favouriteChefs: state.favourite.chefs,
      chefLoading: state.favourite.chefLoading,
      cart: state.cart.cart,
    }),
    shallowEqual
  );

  const [showShareButtons, setShowShareButtons] = useState(false);

  const { businessName } = useParams();

  const [chef, setChef] = useState<any>(null);

  const getChef = async () => {
    setIsLoading(true);
    try {
      const { data } = await getABusinessByName(businessName);

      if (data) {
        setChef(data.data);
      }
    } catch (error) {
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
    dispatch(getFavouriteChefs());
  }, []);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [cartMenu, setCartMenu] = useState<any>(cart);
  const [selectedDate, setSelectedDate] = useState("all");

  const [verifyPaymentModal, setVerifyPaymentModal] = useState(false);
  const openVerifyPaymentModal = () => setVerifyPaymentModal(true);
  const closeVerifyPaymentModal = () => setVerifyPaymentModal(false);

  const [errorLogin, setErrorLogin] = useState("");
  const [addMenuError, setAddMenuError] = useState("");

  const [cartModal, setCartModal] = useState(false);

  const shareMessage = `Hey, checkout Chef ${
    chef?.profile?.firstName
  } on ${APP_URL}/explore/${chef?.business?.businessName
    ?.trim()
    .split(" ")
    .join("-")}`;

  const [descriptionTextClass, setDescriptionTextClass] = useState(false);

  const renderShareButtons = () => (
    <div className="ml-2 flex flex-row">
      <FacebookShareButton url=" " quote={shareMessage} className="mr-2">
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton url=" " className="mr-2" title={shareMessage}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton url=" " title={shareMessage}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    </div>
  );

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

  const handleAddToBag = (menu: any) => {
    const localCart = [...cartMenu];

    if (localCart?.length > 0 && selectedDate === "all") {
      setAddMenuError("Please select a delivery date to continue.");
      return;
    }

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

  const verifyTransaction = async (referenceId: any) => {
    try {
      const { data } = await axios.get(
        `${TRANSACTION_URL}/verify/${referenceId}`
      );
      const result = data?.data;

      if (result?.status) {
        closeVerifyPaymentModal();
        dispatch(clearCart());
        setCartMenu([]);
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
          key: process.env.VITE_PAYSTACK_PUBLIC_KEY, // Replace with your public key
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
              { orderId: data.data.orderId, amount: amount, userId: user._id }
            );
            TrackGoogleAnalyticsEvent(
              "purchase",
              "Purchase",
              window.location.pathname + window.location.search,
              { orderId: data.data.orderId, amount: amount, userId: user._id }
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

  const chefIsUserFavourite =
    favouriteChefs &&
    chef &&
    favouriteChefs?.length > 0 &&
    favouriteChefs?.find((f: any) => f.business?._id === chef?.business?._id);

  const favouriteChef = () => {
    if (!user) {
      alert("You are not logged in.");
    } else {
      dispatch(favoriteAChef(chef?.profile?._id));
    }
  };

  const unFavouriteChef = () => {
    if (!user) {
      alert("You are not logged in.");
    } else {
      dispatch(unFavoriteAChef(chef?.profile?._id));
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

  const closeCartModal = () => setCartModal(false);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {chef && chef?.business ? (
            <div className="">
              <TopNav
                showCart
                onClickCart={() => setCartModal(!cartModal)}
                cartTotalItems={cartMenu?.length}
              />
              <div>
                <div className="lg:flex flex-row">
                  <div className="lg:w-9/12">
                    <div className="bg-white lg:pl-10 pb-9 ">
                      <div className="mx-3 lg:mx-0">
                        <div className="absolute mt-5 left-10 lg:left-14">
                          <div
                            className="flex bg-white rounded-full items-center justify-center px-6 py-2 cursor-pointer"
                            onClick={() => {
                              navigate(HOME_ROUTES.linkExplore);
                              dispatch(clearCart());
                              setCartMenu([]);
                            }}
                          >
                            <BiArrowBack fontSize={18} color="#8E8E8E" />
                            <h1 className="ml-2 font_regular input_text">
                              Explore
                            </h1>
                          </div>
                        </div>
                        <img
                          src={
                            chef?.business?.coverImage ||
                            "/images/chef-landing-page-hero.png"
                          }
                          alt="chefBanner"
                          className="rounded-3xl lg:rounded-xl h-96 w-full object-cover"
                        />
                        <div className="lg:hidden absolute right-10 -mt-14">
                          <div className="justify-end flex flex-row input_text">
                            <div
                              className="bg-white rounded-full flex items-center justify-center w-10 h-10 mr-5 cursor-pointer"
                              onClick={
                                chefIsUserFavourite
                                  ? () => unFavouriteChef()
                                  : () => favouriteChef()
                              }
                            >
                              {chefLoading ? (
                                <ColoredSpinner />
                              ) : (
                                <>
                                  {chefIsUserFavourite ? (
                                    <AiFillHeart
                                      fontSize={24}
                                      color="#06c167"
                                    />
                                  ) : (
                                    <AiOutlineHeart
                                      fontSize={24}
                                      color="#8E8E8E"
                                    />
                                  )}
                                </>
                              )}
                            </div>
                            <div
                              className="flex bg-white rounded-xl items-center justify-center px-2 cursor-pointer"
                              onClick={() =>
                                setShowShareButtons(!showShareButtons)
                              }
                            >
                              <CiShare2 fontSize={18} color="#8E8E8E" />
                              <h1 className="ml-2 font_regular input_text">
                                Share
                              </h1>
                              {showShareButtons && renderShareButtons()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row mt-5 mx-5">
                        <div className="">
                          <div
                            className={`border-4 w-20 lg:w-40 h-20 lg:h-40 rounded-full flex justify-center items-center  overflow-hidden ${
                              chef?.profile?.image
                                ? "border-white"
                                : "primary_border_color"
                            }`}
                          >
                            {chef?.profile?.image ? (
                              <img
                                src={chef?.profile?.image}
                                alt="chef"
                                className="w-20 lg:w-40 h-20 lg:h-40 rounded-full object-cover"
                              />
                            ) : (
                              <GiCook
                                color="#06c167"
                                className="w-20 lg:w-40 h-20 lg:h-40 rounded-full p-4"
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 ml-4">
                          <div>
                            <div className="flex flex-row items-center">
                              <h1 className="text-xl lg:text-3xl font_bold ">
                                {chef?.business?.businessName}
                              </h1>
                              <div className="flex-1 hidden lg:block">
                                <div className="justify-end flex flex-row input_text">
                                  <div
                                    className="rounded-full solid_border flex items-center justify-center w-10 h-10 mr-5 cursor-pointer"
                                    onClick={
                                      chefIsUserFavourite
                                        ? () => unFavouriteChef()
                                        : () => favouriteChef()
                                    }
                                  >
                                    {chefLoading ? (
                                      <ColoredSpinner />
                                    ) : (
                                      <>
                                        {chefIsUserFavourite ? (
                                          <AiFillHeart
                                            fontSize={30}
                                            color="#06c167"
                                          />
                                        ) : (
                                          <AiOutlineHeart fontSize={30} />
                                        )}
                                      </>
                                    )}
                                  </div>
                                  <div
                                    className="flex rounded-xl solid_border items-center justify-center px-2 cursor-pointer"
                                    onClick={() =>
                                      setShowShareButtons(!showShareButtons)
                                    }
                                  >
                                    <CiShare2 fontSize={18} />
                                    <h1 className="ml-2 font_regular">Share</h1>
                                    {showShareButtons && renderShareButtons()}
                                  </div>
                                </div>
                              </div>
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
                              <div className="lg:ml-5">
                                {chef?.rating && chef?.rating?.length > 0 && (
                                  <div className="flex flex-row items-center mt-2 lg:mt-0">
                                    {/* <SolidStar /> */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="#06c167"
                                      className="w-8 h-8"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    {chef?.rating &&
                                      chef?.rating?.length > 0 && (
                                        <h3 className="ml-2 input_text text-md font_bold">
                                          {(
                                            chef?.rating?.reduce(
                                              (partialSum: any, a: any) =>
                                                partialSum + a,
                                              0
                                            ) / chef?.rating?.length
                                          ).toFixed(1)}{" "}
                                          ({chef?.rating?.length} Rating
                                          {chef?.rating?.length > 1 && "s"})
                                        </h3>
                                      )}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mt-2">
                              <p
                                className={`input_text font_regular text-sm text-wrap ${
                                  descriptionTextClass
                                    ? ""
                                    : "h-10 overflow-hidden"
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

                            <div className="flex flex-row flex-wrap">
                              {chef?.business &&
                                chef?.business?.businessSpecialisation &&
                                chef?.business?.businessSpecialisation?.map(
                                  (s: any, i: any) => (
                                    <div
                                      key={i}
                                      className="mt-2 tertiary_bg_color w-28 py-2 rounded-xl mr-2"
                                    >
                                      <p className="tertiary_text_color text-center font_bold">
                                        {s}
                                      </p>
                                    </div>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChefsDates
                        menu={chef?.menu}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setCartMenu={setCartMenu}
                        setErrorLogin={setErrorLogin}
                      />
                    </div>
                    <div className="grayBackground pb-20 pt-5 px-5 lg:pl-10 lg:pr-0">
                      <h1 className="card_headerText text-2xl">
                        {selectedDate &&
                          selectedDate !== "all" &&
                          moment(selectedDate).format("dddd")}{" "}
                        Main Items
                      </h1>
                      <div className="flex flex-row flex-wrap">
                        <>
                          {chef?.menu &&
                            chef?.menu?.map((menu: any) => (
                              <div
                                key={menu._id}
                                className="w-full lg:w-[30%] lg:mr-5"
                              >
                                <ChefShopMenuCard
                                  chefName={chef?.business?.businessName}
                                  menu={menu}
                                  onClickAddToBag={() => handleAddToBag(menu)}
                                  inCart={cartMenu?.find(
                                    (m: any) => m.foodName === menu.foodName
                                  )}
                                  cartMenu={cartMenu}
                                  handleIncrement={handleIncrement}
                                  handleDecrement={handleDecrement}
                                  selectedMealQuantityReached={
                                    selectedMealQuantityReached
                                  }
                                  showMinimumQuantityReached={
                                    showMinimumQuantityReached
                                  }
                                  addMenuError={addMenuError}
                                />
                              </div>
                            ))}
                        </>
                        {/* {selectedDate === "all" ? (
                          <>
                            {chef?.menu &&
                              chef?.menu?.map((menu: any) => (
                                <div
                                  key={menu._id}
                                  className="w-full lg:w-[30%] lg:mr-5"
                                >
                                  <ChefShopMenuCard
                                    chefName={chef?.business?.businessName}
                                    menu={menu}
                                    onClickAddToBag={() => handleAddToBag(menu)}
                                    inCart={cartMenu?.find(
                                      (m: any) => m.foodName === menu.foodName
                                    )}
                                    cartMenu={cartMenu}
                                    handleIncrement={handleIncrement}
                                    handleDecrement={handleDecrement}
                                    selectedMealQuantityReached={
                                      selectedMealQuantityReached
                                    }
                                    showMinimumQuantityReached={
                                      showMinimumQuantityReached
                                    }
                                    addMenuError={addMenuError}
                                  />
                                </div>
                              ))}
                          </>
                        ) : (
                          <>
                            {chef?.menu &&
                              chef?.menu?.length > 0 &&
                              chef?.menu
                                ?.filter((m: any) => {
                                  return m.deliveryDays.includes(
                                    moment(selectedDate)
                                      .format("dd")
                                      .toUpperCase()
                                  );
                                })
                                .map((menu: any) => (
                                  <div
                                    key={menu._id}
                                    className="w-full lg:w-[30%] lg:mr-5"
                                  >
                                    <ChefShopMenuCard
                                      chefName={chef?.business?.businessName}
                                      menu={menu}
                                      onClickAddToBag={() =>
                                        handleAddToBag(menu)
                                      }
                                      inCart={cartMenu?.find(
                                        (m: any) => m.foodName === menu.foodName
                                      )}
                                      cartMenu={cartMenu}
                                      handleIncrement={handleIncrement}
                                      handleDecrement={handleDecrement}
                                      selectedMealQuantityReached={
                                        selectedMealQuantityReached
                                      }
                                      showMinimumQuantityReached={
                                        showMinimumQuantityReached
                                      }
                                      addMenuError={addMenuError}
                                    />
                                  </div>
                                ))}
                          </>
                        )} */}
                      </div>

                      {/* <div className="flex flex-col items-center">
                  <h2 className="text-xl input_text mb-3">
                    No food available this day of the week.
                  </h2>
                </div> */}

                      <div className="my-10">
                        <ChefsReviews reviews={chef?.reviews} />
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block w-3/12 h-full fixed right-0 z-30">
                    <div className="h-5/6 overflow-auto">
                      <Cart
                        handleCheckout={(orderItem: any) =>
                          handleCheckout(orderItem)
                        }
                        handleWalletCheckout={(orderItem: any) =>
                          handleWalletCheckout(orderItem)
                        }
                        checkoutLoading={checkoutLoading}
                        cartMenu={cartMenu}
                        chef={chef}
                        navigateFrom={`/auth/customer-login/explore/${businessName}`}
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
                        selectedMealQuantityReached={
                          selectedMealQuantityReached
                        }
                        showMinimumQuantityReached={showMinimumQuantityReached}
                        addMenuError={addMenuError}
                        setAddMenuError={setAddMenuError}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Footer />

              <CartFloat
                cartMenu={cartMenu}
                chef={chef}
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
                  className="absolute z-10 h-full bg-white overflow-auto outline-none"
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
                    handleCheckout={(orderItem: any) =>
                      handleCheckout(orderItem)
                    }
                    handleWalletCheckout={(orderItem: any) =>
                      handleWalletCheckout(orderItem)
                    }
                    checkoutLoading={checkoutLoading}
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
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  );
};

export default ChefShop;
