import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Footer from "../../components/landing-page/Footer";
import TopNav from "../../components/landing-page/TopNav";
import { createEventOrder } from "../../_redux/order/orderCrud";
import { CUSTOMER_ROUTES } from "../../routes/routes";
import Preloader from "../../components/Preloader";
import EventCart from "../../components/EventCart";
import EventChefShopMenuCard from "../../components/EventChefShopMenuCard";
import { addToCart } from "../../_redux/cart/cartAction";
import { clearCart } from "../../_redux/cart/cartAction";
import { useAppDispatch } from "../../redux/hooks";
import { SERVER } from "../../config/axios";
import { EVENT_URL } from "../../_redux/urls";
import { GiCook } from "react-icons/gi";

const Events = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { eventName } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const { cart } = useSelector(
    (state: any) => ({
      cart: state.cart.cart,
    }),
    shallowEqual
  );

  const [eventMenu, setEventMenu] = useState<any>([]);

  const getMenu = async () => {
    setIsLoading(true);
    try {
      const { data } = await SERVER.get(`${EVENT_URL}/${eventName}`);

      if (data.success) {
        setEventMenu(data.data);
      }
    } catch (error: any) {
      alert(JSON.stringify(error?.response?.data));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [cartMenu, setCartMenu] = useState<any>(cart);
  const selectedDate = "Saturday December 9, 2023";
  const deliveryAddress =
    "NECA House Events Centre, Alausa, Hakeem Balogun Street, Lagos.";

  const [errorLogin, setErrorLogin] = useState("");
  const [addMenuError, setAddMenuError] = useState("");

  const [cartModal, setCartModal] = useState(false);

  const [cartView, setCartView] = useState(true);
  const [deliveryView, setDeliveryView] = useState(false);
  const [reviewView, setReviewView] = useState(false);

  const resetCartView = () => {
    setCartView(true);
    setDeliveryView(false);
    setReviewView(false);
  };

  const handleAddToBag = (menu: any) => {
    let localCart = [...cartMenu];

    if (localCart.includes(menu)) {
      const index = localCart.indexOf(menu);
      localCart.splice(index, 1);
      setCartMenu(localCart);
      // Dispatch to redux
      dispatch(addToCart(localCart));
    } else {
      localCart.push(menu);
      setCartMenu(localCart);
      // Dispatch to redux
      dispatch(addToCart(localCart));
    }

    setAddMenuError("");
    resetCartView();
  };

  const handleCheckout = async (orderItem: any) => {
    setErrorLogin("");
    setCheckoutLoading(true);
    try {
      await createEventOrder(orderItem);
      navigate(CUSTOMER_ROUTES.linkCustomerOrders);
      dispatch(clearCart());
    } catch (err: any) {
      setErrorLogin(err.response.data.message || err.response.data.error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleDelete = (meal: any) => {
    const localMenu = [...cartMenu];
    let index = localMenu.indexOf(meal);
    localMenu.splice(index, 1);
    setCartMenu(localMenu);
    dispatch(addToCart(localMenu));
  };

  const closeCartModal = () => setCartModal(false);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="">
          <TopNav
            event
            showCart
            onClickCart={() => setCartModal(!cartModal)}
            cartTotalItems={cartMenu?.length}
          />
          <div>
            <div className="lg:flex flex-row">
              <div className="lg:w-9/12">
                <div className="bg-white lg:pl-10 pb-9 ">
                  <div className="mx-3 lg:mx-0">
                    <img
                      src={"/images/ABAFFAIRS.jpg"}
                      alt="chefBanner"
                      className="rounded-3xl lg:rounded-xl h-96 w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-row mt-5 mx-5">
                    <div className="w-1/5">
                      <div
                        className={`border-4 w-20 lg:w-40 h-20 lg:h-40 rounded-full flex justify-center items-center  overflow-hidden border-white`}
                      >
                        <img
                          src="/images/ABAFFAIRS2.jpeg"
                          alt="event_logo"
                          className="w-20 lg:w-40 h-20 lg:h-40 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-4/5 ml-4">
                      <div>
                        <h1 className="text-xl lg:text-3xl font_bold">
                          AB AFFAIRS 23'
                        </h1>

                        <div className="mt-2">
                          <p className="input_text font_regular text-sm text-wrap ext-ellipsis">
                            We are really excited to share our special day with
                            you. We hope it brings lots of love and joy to your
                            lives. Choose your meal for free. See you at
                            #AB-AFFAIRS 23'
                          </p>
                        </div>

                        <div className="flex flex-row flex-wrap">
                          <div className="mt-3 tertiary_bg_color w-52 py-2 rounded-full mr-2">
                            <p className="tertiary_text_color text-sm text-center font_bold">
                              {selectedDate}
                            </p>
                          </div>
                          <div className="mt-3 tertiary_bg_color w-36 py-2 rounded-full mr-2">
                            <p className="tertiary_text_color text-sm text-center font_bold">
                              7:30 AM to 6:00 PM
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 tertiary_bg_color w-64 py-2 rounded-full mr-2">
                          <p className="tertiary_text_color text-sm text-center font_bold">
                            {deliveryAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grayBackground pb-20 pt-5 px-5 lg:pl-10 lg:pr-0">
                  <h1 className="card_headerText text-2xl">
                    Which meal would you prefer?
                  </h1>
                  <div className="">
                    {eventMenu &&
                      eventMenu.length > 0 &&
                      eventMenu.map((event: any, i: number) => (
                        // <div key={i} className="w-full lg:w-[30%] lg:mr-5">
                        <div className="w-full mt-5 overflow-hidden" key={i}>
                          <div className="flex items-center">
                            <div>
                              {event?.profile?.image ? (
                                <img
                                  src={event?.profile?.image}
                                  alt="chef"
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                <GiCook
                                  color="#06c167"
                                  className="w-12 h-12 rounded-full"
                                />
                              )}
                            </div>
                            <div>
                              <h1 className="ml-2 text-2xl font_medium secondary_text_color">
                                {event?.profile?.firstName}{" "}
                                {event?.profile?.lastName}
                              </h1>
                            </div>
                          </div>
                          <div className="w-full pl-1 flex basis-0 whitespace-nowrap overflow-x-auto">
                            {event?.menu?.length > 0 &&
                              event?.menu?.map((menu: any, i: number) => (
                                <div
                                  key={i}
                                  className="w-80 grow-0 shrink-0 basis-72 lg:basis-72 mr-2 mb-5"
                                >
                                  <EventChefShopMenuCard
                                    chefName={""}
                                    menu={menu}
                                    onClickAddToBag={() => handleAddToBag(menu)}
                                    inCart={cartMenu?.find(
                                      (m: any) => m.foodName === menu.foodName
                                    )}
                                    cartMenu={cartMenu}
                                    handleDelete={handleDelete}
                                    addMenuError={addMenuError}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="hidden lg:block w-3/12 h-full fixed right-0 z-30">
                <div className="h-5/6 overflow-auto">
                  <EventCart
                    handleCheckout={(orderItem: any) =>
                      handleCheckout(orderItem)
                    }
                    eventName={eventName}
                    checkoutLoading={checkoutLoading}
                    cartMenu={cartMenu}
                    selectedDate={selectedDate}
                    deliveryAddress={deliveryAddress}
                    cartView={cartView}
                    setCartView={setCartView}
                    deliveryView={deliveryView}
                    setDeliveryView={setDeliveryView}
                    reviewView={reviewView}
                    setReviewView={setReviewView}
                    errorLogin={errorLogin}
                    setErrorLogin={setErrorLogin}
                    handleDelete={handleDelete}
                    addMenuError={addMenuError}
                  />
                </div>
              </div>
            </div>
          </div>

          <Footer />

          {cartMenu?.length > 0 && (
            <div className="lg:hidden" onClick={() => setCartModal(!cartModal)}>
              <div
                className="fixed bottom-10 z-50"
                style={{ width: "22rem", left: "2.3rem" }}
              >
                <div className="primary_bg_color rounded-2xl p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-2 bottom_cart_length_bg w-10 h-10 flex items-center justify-center rounded-xl">
                      <p className="text-white text-center text-lg font_medium">
                        {cartMenu?.length}
                      </p>
                    </div>
                    <p className="text-white text-lg font_medium">Your Bag</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Modal
            open={cartModal}
            onClose={closeCartModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div
              className="absolute z-10 h-full bg-white overflow-auto"
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
              <EventCart
                handleCheckout={(orderItem: any) => handleCheckout(orderItem)}
                eventName={eventName}
                checkoutLoading={checkoutLoading}
                cartMenu={cartMenu}
                selectedDate={selectedDate}
                deliveryAddress={deliveryAddress}
                cartView={cartView}
                setCartView={setCartView}
                deliveryView={deliveryView}
                setDeliveryView={setDeliveryView}
                reviewView={reviewView}
                setReviewView={setReviewView}
                errorLogin={errorLogin}
                setErrorLogin={setErrorLogin}
                handleDelete={handleDelete}
                addMenuError={addMenuError}
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Events;
