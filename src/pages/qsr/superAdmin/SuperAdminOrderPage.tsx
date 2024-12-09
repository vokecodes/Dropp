// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import OutlineButton from "../../../components/OutlineButton";
import Button from "../../../components/Button";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "../../../redux/hooks";
import ColoredSpinner from "../../../components/ColoredSpinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { CHEF_ROUTES, QSR_ROUTES } from "../../../routes/routes";
import QsrDashboardLayout from "../../../components/QsrDashboardLayout";
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { getABusinessRestaurantByName } from "../../../_redux/business/businessCrud";
import QsrShopMenuCard from "../../../components/QsrShopMenuCard";
import AlertDialog from "../../../components/AlertDialog";
import RestaurantCart from "../../../components/RestaurantCart";
import { addToCart, clearCart } from "../../../_redux/cart/cartAction";
import { BsFillHandbagFill } from "react-icons/bs";
import TrackGoogleAnalyticsEvent from "../../../components/TrackGoogleAnalyticsEvent";
import Hotjar from "@hotjar/browser";
import QsrCart from "../../../components/QsrCart";
import { createAQsrOrder } from "../../../_redux/order/orderCrud";


const SuperAdminOrderPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { error, loading, dinningMenu, business, businessLoading, user, cart } =
    useSelector(
      (state: any) => ({
        business: state.business.business,
        businessLoading: state.business.loading,
        dinningMenu: state.dinningMenu.dinningMenu,
        loading: state.dinningMenu.loading,
        error: state.dinningMenu.error,
        user: state.user.user,
        cart: state.cart.cart,
      }),
      shallowEqual
    );

  const [chef, setChef] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>("All");


  const getChef = async () => {
    setIsLoading(true);
    try {
      const businessRestaurant = await getABusinessRestaurantByName(
        business.businessName
      );
      
      if (businessRestaurant.data) {
        setChef(businessRestaurant.data.data);
      }
    } catch (error) {
      // Handle errors here
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getChef();
  }, []);

  const [openAlertModal, setOpenAlertModal] = React.useState(false);
  const handleClickOpen = () => {
    setOpenAlertModal(true);
  };
  const handleClose = () => {
    setOpenAlertModal(false);
  };

  const [addMenuError, setAddMenuError] = useState("");

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

  const [verifyPaymentModal, setVerifyPaymentModal] = useState(false);
  const openVerifyPaymentModal = () => setVerifyPaymentModal(true);
  const closeVerifyPaymentModal = () => setVerifyPaymentModal(false);

  const [cartModal, setCartModal] = useState(false);
  const closeCartModal = () => setCartModal(false);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutLaterLoading, setCheckoutLaterLoading] = useState(false);

  const [cartMenu, setCartMenu] = useState<any>(cart);
  const [selectedDate, setSelectedDate] = useState("all");

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

  const verifyTransaction = async (referenceId: any) => {
    try {
      const { data } = await axios.get(
        `${TRANSACTION_URL}/verify/${referenceId}`
      );
      const result = data?.data;
      
      if (result?.status) {
        closeVerifyPaymentModal();
        closeCartModal()
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
      const createOrEditOrder = async () => {
        return await createAQsrOrder({ ...orderItem, table: '42' });
      };
    
      const handlePayment = (orderId: string) => {
        const handler = window.PaystackPop.setup({
          key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
          email: orderItem.email,
          amount: amount * 100,
          ref: orderId, // Use the generated order ID as a reference
          metadata: {
            transactionType: "RESTAURANT_ORDER",
          },
          onClose: () => alert("Transaction was not completed, window closed."),
          callback: (response: any) => {
            resetCartView();
            dispatch(clearCart());
            setCartMenu([]);
            setOrderId(orderId);
            openVerifyPaymentModal();
            closeCartModal();
            verifyTransaction(orderId);
          },
        });
    
        handler.openIframe();
      };
    
      const { data } = await createOrEditOrder();
    
      if (data.success) {
        handlePayment(data.data.orderId);
      }
    } catch (err) {
      handleClickOpen();
      console.log('err= ', err)
    } finally {
      setCheckoutLoading(false);
      closeCartModal();
    }
        
  };

  const handlePayLaterCheckout = async (orderItem: any) => {
    setCheckoutLaterLoading(true);

    try {
      const createOrEditOrder = async () => {
        return await createAQsrOrder({
          ...orderItem,
          table: '42',
          posPayment: true,
        });
      };
    
      const handleSuccess = (orderId: string) => {
        resetCartView();
        dispatch(clearCart());
        setCartMenu([]);
        setOrderId(orderId);
        openModal();
      };
    
      const { data } = await createOrEditOrder();
    
      if (data.success) {
        handleSuccess(data.data.orderId);
      }
    } catch (err) {
      handleClickOpen();
      console.log('pos= ', err)
    } finally {
      setCheckoutLaterLoading(false);
      closeCartModal();
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

  let totalAmount = cartMenu
    ?.map(
      (c: any) =>
        (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
        c.quantity
    )
    .reduce((partialSum: any, a: any) => partialSum + a, 0);

  const [q, setQ] = useState("");

  const categoryFiltered = selectedCategory === "All" ? chef?.menu : chef?.menu.filter(item => item.category === selectedCategory)

  const searchFiltered =
    q === ""
      ? categoryFiltered
      : categoryFiltered.filter(
          (item: any) =>
            item?.category?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.foodName?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.description?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );



  return (
    <>
      <QsrDashboardLayout>
        <>
          <div className="relative w-full px-1 lg:px-6 py-4">
            <div className="lg:flex flex-row w-full justify-between">
                <h1 className="text-xl text-black font_medium mt-1.5 text-center lg:text-start w-full lg:w-fit">
                    Menu
                </h1>
                
                <div className={`w-full lg:w-fit flex flex-row justify-between gap-y-2 lg:gap-y-0 ${cartMenu && cartMenu?.length && 'pr-12'}`}>
                    <Link className="flex items-center" to={QSR_ROUTES.linkQsrMenu}>
                        <OutlineButton
                        title="Menu Board"
                        extraClasses="px-8 py-2 mr-3"
                        />
                    </Link>

                    <div className={`w-fit h-fit rounded-2xl  border border-[#06C167] p-3 cursor-pointer ${cartMenu && cartMenu?.length ? 'bg-[#EDFFF6] fixed top-[9.7rem] lg:top-[6.6rem] right-2 z-50' : 'bg-[#F3F3F3]'}`} onClick={() => setCartModal(true)}>
                        <span className="relative w-fit h-fit">
                            <BsFillHandbagFill size={30} className={`text-[#06C167]`} />
                            <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center rounded-full border border-white bg-[#06C167]">
                                <p className="text-[8px] text-white">{cartMenu?.length}</p>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-1 lg:px-5 mt-3">
              {chef?.menu && chef?.menu?.length > 0 ? (
                <>
                    <div className="inline-flex flex-col lg:flex-row w-full justify-between items-center gap-y-3">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2 lg:gap-y-0 lg:gap-x-10">
                            <h1 className="text-xl text-black font_medium mt-1.5 text-center lg:text-start w-full lg:w-fit">
                                Ordering board
                            </h1>

                            <div className="flex gap-3">
                                <div className="w-fit bg-white rounded-full pl-18 pr-5 flex items-center justify-between w-fit border border-neutral-200">
                                    <div className="p-2">
                                    <IoSearchSharp color="#D6D6D6" size={20} />
                                    </div>
                                    <div className="flex-1 ml-4">
                                    <input
                                        placeholder="Search orders"
                                        className="py-2 w-full lg:w-64 rounded-full input_text text-md font_regular outline-none"
                                        value={q}
                                        onChange={(e: any) => {
                                        setQ(e.target.value);
                                        }}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full lg:w-fit primary_bg_color text-white font-semibold text-lg py-2 px-10 rounded-lg flex flex-row items-center justify-center gap-x-5" onClick={() => setCartModal(true)}>
                            Proceed
                            <FaArrowRightLong size={25} />
                        </button>
                    </div>

                    {/* CATEGORIES */}
                    {chef?.menuCategories 
                    && chef?.menuCategories?.length > 0 
                    && (
                        <div className="sticky top-0 z-30 w-full px-2 pt-4 pb-2 bg-white my-2 border-y border-[#8E8E8E]/30">
                        <div className="reduce-scrollbar flex flex-row flex-nowrap overflow-x-auto pb-2">
                            <div
                            className={`px-5 py-1 flex shrink-0 items-center mr-3 rounded-full cursor-pointer ${
                                selectedCategory === "All"
                                ? "primary_bg_color"
                                : "bg-white border-2 border-[#8E8E8E]/30"
                            }`}
                            onClick={() => setSelectedCategory("All")}
                            >
                            <p
                                className={`text-base ${
                                selectedCategory === "All"
                                    ? "text-white"
                                    : "text-[#8E8E8E]"
                                }`}
                            >
                                All
                            </p>
                            </div>
                            {chef?.menuCategories
                                ?.filter((cats: any) =>
                                chef?.menu.find(
                                    (m: any) => m.category === cats.value
                                )
                                )
                                .map((category: any, i: number) => (
                                <div
                                    key={i}
                                    className={`px-5 py-1 flex shrink-0 items-center justify-center text-center rounded-full mr-3 cursor-pointer ${
                                    selectedCategory === category?.value
                                        ? "primary_bg_color"
                                        : "bg-white border-2 border-[#8E8E8E]/30"
                                    } `}
                                    onClick={() =>
                                    setSelectedCategory(category?.value)
                                    }
                                >
                                    <p
                                    className={`text-base ${
                                        selectedCategory === category?.value
                                        ? "text-white"
                                        : "text-[#8E8E8E]"
                                    }`}
                                    >
                                    {category?.label}
                                    </p>
                                </div>
                                ))}
                        </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-stretch gap-5 w-full flex-wrap mt-7">
                        {searchFiltered?.map((menu: any) => (
                        <React.Fragment key={menu?._id}>
                            <QsrShopMenuCard
                                menu={menu}
                                mode={"dineIn"}
                                onClickEdit={() => {
                                    setEditMenu(menu);
                                    openMenuModal();
                                    setValues(menu);
                                }}
                                onClickCopy={() => {
                                    setCopyMenu(menu);
                                    openCopyMenuModal();
                                    setValues(menu);
                                }}
                                inCart={cartMenu?.find((m: any) => m._id === menu._id)}
                                onClickAddToBag={() => handleAddToBag(menu)}
                                cartMenu={cartMenu}
                                handleIncrement={handleIncrement}
                                handleDecrement={handleDecrement}
                                selectedMealQuantityReached={selectedMealQuantityReached}
                                showMinimumQuantityReached={showMinimumQuantityReached}
                                addMenuError={addMenuError}
                            />
                        </React.Fragment>
                        ))}
                    </div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <h2 className="text-xl input_text mb-3">
                    No meals here.
                  </h2>
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2 lg:gap-y-0 lg:gap-x-3">
                    <Link className="flex items-center" to={QSR_ROUTES.linkQsrMenu}>
                        <OutlineButton
                        title="Menu Board"
                        extraClasses="px-8 py-2 mr-3"
                        />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      </QsrDashboardLayout>

        <Modal
            open={cartModal}
            onClose={closeCartModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div className="fixed right-0 z-10 h-full w-full lg:w-1/3 bg-neutral-100 lg:bg-white overflow-auto outline-none">
                {/* <div className="flex pt-5 pr-5">
                <div className="flex-1"></div>
                <IoMdClose
                    size={24}
                    color="#8E8E8E"
                    className="cursor-pointer"
                    onClick={closeCartModal}
                />
                </div> */}
                <QsrCart
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
                    handleDelete={handleDelete}
                    selectedMealQuantityReached={selectedMealQuantityReached}
                    showMinimumQuantityReached={showMinimumQuantityReached}
                    addMenuError={addMenuError}
                    setAddMenuError={setAddMenuError}
                    openModal={openModal}
                    handleAddToBag={handleAddToBag}
                    cartModal={cartModal}
                    setCartModal={setCartModal}
                    totalAmount={totalAmount}
                    closeCartModal={closeCartModal}
                />
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
                        className="h-fit my-3 w-100 w-full flex flex-col gap-y-10 min-h-60% lg:min-h-[80%]"
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
                        className="flex flex-col justify-center items-center h-full w-full mb-5 h-fit lg:min-h-[80%]"
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

                    <div className="my-3 lg:my-10 w-full">
                        <Button
                            title="Download receipt"
                            extraClasses="w-full p-3 rounded-full"
                            // onClick={() => closeModal()}
                        />
                    </div>
                </div>
            </div>
        </Modal>

        <AlertDialog message='An error has occured, ensure you have the correct Table number and an internet connection.' handleClose={handleClose} open={openAlertModal} />
    </>
  );
};

export default SuperAdminOrderPage;
