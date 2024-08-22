import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { GiCook } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import moment from "moment";
import Button from "./Button";
import OutlineButton from "./OutlineButton";
import Input from "./CustomInput";
import Dropdown from "./Dropdown";
import { DeliveryDetailsValues } from "../utils/FormInitialValue";
import { DeliveryDetailsSchema } from "../utils/ValidationSchema";
import { formatPrice, formatRemoteAmountKobo } from "../utils/formatMethods";
import AutoCompleteInput from "./AutoCompleteInput";
import { AUTH_ROUTES, CUSTOMER_ROUTES } from "../routes/routes";
import axios from "axios";
import { CHECKOUT_CODE_URL, DELIVERY_COST } from "../_redux/urls";
import { handlePhoneNumber } from "../utils/formatMethods";
import { getUserWalletAccount } from "../_redux/user/userAction";
import { useAppDispatch } from "../redux/hooks";

const deliveryFormInputs = [
  // { type: "text", placeholder: "City", name: "city", readOnly: true },
  // { type: "text", placeholder: "Delivery address", name: "deliveryAddress" },
  { type: "tel", placeholder: "Phone Number", name: "phoneNumber" },
  { type: "text", placeholder: "Delivery Note (Optional)", name: "note" },
];

const timeOptions = [
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "1:00 PM", label: "1:00 PM" },
  { value: "6:00 PM", label: "6:00 PM" },
];

const Cart = ({
  cartMenu,
  handleCheckout,
  checkoutLoading,
  chef,
  handleIncrement,
  handleDecrement,
  selectedDate,
  setSelectedDate,
  cartView,
  setCartView,
  deliveryView,
  setDeliveryView,
  reviewView,
  setReviewView,
  errorLogin,
  setErrorLogin,
  handleDelete,
  selectedMealQuantityReached,
  showMinimumQuantityReached,
  addMenuError,
  setAddMenuError,
  selectedPaymentOption,
  setSelectedPaymentOption,
  handleWalletCheckout,
  restaurantView,
  openModal,
  restaurantValues,
  restaurantErrors,
  restaurantChange,
  restaurantSubmit,
  navigateFrom,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, auth, wallet } = useSelector(
    (state: any) => ({
      user: state.user.user,
      auth: state.auth.user,
      wallet: state.user.wallet,
    }),
    shallowEqual
  );

  const [timeValue, setTimeValue] = useState("");
  const [checkoutCodeValue, setCheckoutCodeValue] = useState<any>();
  const [checkoutCodeError, setCheckoutCodeError] = useState<any>();
  const [codeIsChecking, setCodeIsChecking] = useState(false);

  const getDeliveryCost = (chef: any) => {
    let cost;
    if (chef) {
      if (
        chef?.business?.deliveryCost !== undefined &&
        chef?.business?.deliveryCost !== null
      ) {
        cost = chef?.business?.deliveryCost;
      } else {
        cost = DELIVERY_COST;
      }
    } else {
      cost = DELIVERY_COST;
    }
    return cost;
  };

  const deliveryCost = getDeliveryCost(chef);

  let discountAmount =
    checkoutCodeValue && checkoutCodeValue.type === "amount"
      ? cartMenu
          ?.map(
            (c: any) =>
              (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
              c.quantity
          )
          .reduce((partialSum: any, a: any) => partialSum + a, 0) +
        (checkoutCodeValue?.delivery ? 0 : deliveryCost) -
        checkoutCodeValue?.value
      : checkoutCodeValue && checkoutCodeValue.type === "percent"
      ? cartMenu
          ?.map(
            (c: any) =>
              (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
              c.quantity
          )
          .reduce((partialSum: any, a: any) => partialSum + a, 0) -
        (cartMenu
          ?.map(
            (c: any) =>
              (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
              c.quantity
          )
          .reduce((partialSum: any, a: any) => partialSum + a, 0) /
          100) *
          checkoutCodeValue?.value +
        (checkoutCodeValue?.delivery ? 0 : deliveryCost)
      : 0;

  let totalAmount =
    checkoutCodeValue && checkoutCodeValue.type === "amount"
      ? cartMenu
          ?.map(
            (c: any) =>
              (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
              c.quantity
          )
          .reduce((partialSum: any, a: any) => partialSum + a, 0) +
        (checkoutCodeValue?.delivery ? 0 : deliveryCost) -
        checkoutCodeValue?.value
      : checkoutCodeValue && checkoutCodeValue.type === "percent"
      ? cartMenu
          ?.map(
            (c: any) =>
              (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
              c.quantity
          )
          .reduce((partialSum: any, a: any) => partialSum + a, 0) -
        (cartMenu
          ?.map(
            (c: any) =>
              (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
              c.quantity
          )
          .reduce((partialSum: any, a: any) => partialSum + a, 0) /
          100) *
          checkoutCodeValue?.value +
        (checkoutCodeValue?.delivery ? 0 : deliveryCost)
      : cartMenu
          ?.map(
            (c: any) =>
              (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
              c.quantity
          )
          .reduce((partialSum: any, a: any) => partialSum + a, 0) +
        deliveryCost;

  let totalQuantity = cartMenu
    ?.map((c: any) => c.quantity)
    .reduce((partialSum: any, a: any) => partialSum + a, 0);

  let cartOrder = cartMenu?.map((c: any) => {
    return {
      menu: c._id,
      quantity: c.quantity,
      amount: c.price * c.quantity,
    };
  });

  const checkCheckoutCode = async (code: string) => {
    setCodeIsChecking(true);
    setCheckoutCodeValue("");
    setCheckoutCodeError("");

    try {
      const { data } = await axios.get(`${CHECKOUT_CODE_URL}/valid/${code}`);
      setCheckoutCodeValue(data?.data);
      if (data) {
        setDeliveryView(false);
        setReviewView(true);
      }
    } catch (error: any) {
      setCheckoutCodeError(
        error?.response?.data?.message || "Something went wrong."
      );
    } finally {
      setCodeIsChecking(false);
    }
  };

  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: DeliveryDetailsValues,
      validationSchema: DeliveryDetailsSchema,
      onSubmit: () => {
        setWalletError("");

        if (checkoutCodeError && values.checkoutCode) {
          setDeliveryView(false);
          setReviewView(true);
        } else if (values.checkoutCode) {
          checkCheckoutCode(values.checkoutCode);
        } else {
          setDeliveryView(false);
          setReviewView(true);
        }
      },
    });

  useEffect(() => {
    // if (user) {
    //   // setFieldValue("phoneNumber", user?.phoneNumber);
    //   // setFieldValue("deliveryAddress", user?.address);
    //   // setFieldValue("deliveryAddressLatitude", user?.addressLatitude);
    //   // setFieldValue("deliveryAddressLongitude", user?.addressLongitude);
    // }
    setFieldValue("city", "Lagos");
  }, []);
  // }, [setFieldValue, user, errors]);

  const monthDates = [...Array(28)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const menuDates = monthDates?.filter((d) =>
    cartMenu[0]?.deliveryDays?.includes(moment(d).format("dd").toUpperCase())
  );

  const [showPayment, setShowPayment] = useState(false);
  const [walletError, setWalletError] = useState<any>();

  const handleWalletPayment = () => {
    if (totalAmount > wallet?.balance) {
      setWalletError("Insufficient wallet balance.");
      return;
    } else {
      handleWalletCheckout({
        order: cartOrder,
        totalAmount,
        discountAmount,
        deliveryDate: moment(selectedDate).format("ddd MMM D, YYYY"),
        ...values,
        chef: chef?.profile?._id,
        cartMenu,
      });
    }
  };

  useEffect(() => {
    dispatch(getUserWalletAccount());
  }, []);

  return (
    <div className="w-full h-screen bg-white p-6 shadow">
      {showPayment ? (
        <>
          <h1 className="card_headerText text-3xl font_regular">Payment</h1>
          <div className="flex flex-row justify-between">
            <p className="text-lg font_medium input_text">
              Select a payment method
            </p>
          </div>
          <div
            className="grayBackground flex p-6 mb-4 cursor-pointer"
            onClick={() => setSelectedPaymentOption("wallet")}
          >
            <div className="flex-1">
              <div className="flex items-center">
                <FaWallet size={28} color="#06c167" />
                <p className="ml-2 text-md text-black font_regular">Balance</p>
              </div>
              <p className="my-5 text-4xl text-black font_bold">
                {formatRemoteAmountKobo(wallet?.balance).naira}
                <span className="text-xl font_regular">
                  {formatRemoteAmountKobo(wallet?.balance).kobo}
                </span>
              </p>
              <Button
                title="Fund my wallet"
                extraClasses=""
                onClick={() => navigate(CUSTOMER_ROUTES.linkCustomerWallet)}
              />
            </div>
            <div
              className={`mr-4 w-7 h-7 flex justify-center items-center cursor-pointer ${
                selectedPaymentOption === "wallet"
                  ? "border-2 primary_border_color rounded-full"
                  : ""
              }`}
              onClick={() => setSelectedPaymentOption("wallet")}
            >
              <div
                className={`w-5 h-5 rounded-full cursor-pointer ${
                  selectedPaymentOption === "wallet"
                    ? "primary_bg_color"
                    : "bg_check_inactive_payment"
                }`}
              />
            </div>
          </div>
          <div
            className="grayBackground flex p-6 cursor-pointer"
            onClick={() => setSelectedPaymentOption("other")}
          >
            <div className="h-7 w-7 rounded-full bg-black flex justify-center items-center">
              <FiMenu color="#ffffff" />
            </div>
            <div className="flex-1 ml-3">
              <p className="black3 text-md font_medium">
                Other payment options
              </p>
              <p className="input_text text-sm font_medium">
                Card, Transfer or USSD
              </p>
            </div>
            <div
              className={`mr-4 w-7 h-7 flex justify-center items-center self-center cursor-pointer ${
                selectedPaymentOption === "other"
                  ? "border-2 primary_border_color rounded-full"
                  : ""
              }`}
              onClick={() => setSelectedPaymentOption("other")}
            >
              <div
                className={`w-5 h-5 rounded-full cursor-pointer ${
                  selectedPaymentOption === "other"
                    ? "primary_bg_color"
                    : "bg_check_inactive_payment"
                }`}
              />
            </div>
          </div>

          {walletError && (
            <p className="my-4 text-sm text-center text-red-600">
              {walletError}
            </p>
          )}

          <div className="flex items-center justify-center my-20">
            <div>
              <Button
                title={`Proceed ₦${
                  discountAmount > 0
                    ? formatPrice(discountAmount)
                    : formatPrice(totalAmount)
                }`}
                extraClasses="w-full"
                disabled={!selectedPaymentOption}
                loading={checkoutLoading}
                onClick={() => {
                  if (selectedPaymentOption === "other") {
                    handleCheckout({
                      order: cartOrder,
                      totalAmount,
                      discountAmount,
                      deliveryDate:
                        moment(selectedDate).format("ddd MMM D, YYYY"),
                      ...values,
                      chef: chef?.profile?._id,
                      cartMenu,
                    });
                  } else {
                    handleWalletPayment();
                  }
                }}
              />

              <OutlineButton
                title="Back"
                extraClasses="w-full mt-3"
                onClick={() => {
                  setWalletError("");
                  setShowPayment(false);
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full overflow-x-hidden overflow-y-auto">
          <div className="">
            <h1 className="card_headerText text-3xl font_regular">Your bag</h1>
            <div className="flex flex-row justify-between">
              {!restaurantView && selectedDate !== "all" && (
                <p className="text-lg font_medium input_text">
                  Delivery on {moment(selectedDate).format("ddd MMM D, YYYY")}
                </p>
              )}
              {/* <img src="/images/edit.svg" alt="edit" className="w-6" /> */}
            </div>
          </div>
          {!restaurantView && (
            <div className="grayBackground flex flex-row p-6">
              <div className="border-4 w-12 h-12 rounded-full flex justify-center items-center overflow-hidden">
                {chef?.profile?.image ? (
                  <img
                    src={chef?.profile?.image}
                    alt="chef"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <GiCook
                    className="w-10 h-10 p-1 rounded-full"
                    color="#06c167"
                  />
                )}
              </div>

              <p className="input_text text-1xl ml-3 mt-2 font_medium">
                {chef?.profile?.firstName} {chef?.profile?.lastName}
              </p>
            </div>
          )}

          <div className="">
            {!restaurantView && !reviewView && (
              <h1 className="p-4 font-bold text-2xl">
                ₦{formatPrice(totalAmount - deliveryCost)}{" "}
                <span className="font-medium ">
                  {" "}
                  / {totalQuantity} {totalQuantity > 1 ? "Items" : "Item"}{" "}
                </span>
              </h1>
            )}

            {cartView && (
              <div className="p-4 mt-5">
                {cartMenu &&
                  cartMenu?.length > 0 &&
                  cartMenu?.map((meal: any, index: number) => {
                    return (
                      <div key={index} className="mb-5">
                        <div
                          className="flex flex-row justify-between"
                          key={index}
                        >
                          <div className="">
                            <img
                              src={meal.images[0]}
                              alt="meal"
                              className="w-4/5 h-full rounded object-center object-cover mr-auto"
                            />
                          </div>

                          <div className="flex flex-col items-center justify-around gap-y-2">
                            <div className="ml-2 w-full text-start">
                              <p className="text-md input_text capitalize font-medium ">
                                {meal.foodName}
                              </p>
                              <p className="text-1xl pt-1 font-bold ">
                                ₦
                                {meal?.discount
                                  ? (meal.price -
                                      (meal.price / 100) * meal.discount) *
                                    meal.quantity
                                  : meal.price * meal.quantity}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <div className="mr-3 flex flex-row w-28 justify-center items-center rounded-full solid_border h-10 p-3">
                                <p
                                  className="primary_txt_color font-bold cursor-pointer"
                                  onClick={() =>
                                    handleDecrement(meal, meal?.minimumQuantity)
                                  }
                                >
                                  -
                                </p>
                                <p className="mx-5 font-bold">
                                  {meal?.quantity}
                                </p>
                                <p
                                  className="primary_txt_color font-bold cursor-pointer"
                                  onClick={() => handleIncrement(meal)}
                                >
                                  +
                                </p>
                              </div>
                              <div
                                className="cursor-pointer"
                                onClick={() => handleDelete(meal)}
                              >
                                <AiFillDelete
                                  className="w-5 h-5"
                                  color="#06c167"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {showMinimumQuantityReached &&
                          selectedMealQuantityReached === meal && (
                            <p className="mt-2 text-sm text-center text-red-600">
                              Minimum quantity is {meal?.minimumQuantity}
                            </p>
                          )}
                      </div>
                    );
                  })}

                {cartMenu?.length > 0 && (
                  <div className="p-6">
                    {errorLogin && (
                      <p className="text-sm text-center text-red-600">
                        {errorLogin}
                      </p>
                    )}

                    {addMenuError && (
                      <p className="mt-2 text-sm text-center text-red-600">
                        {addMenuError}
                      </p>
                    )}

                    {!restaurantView && selectedDate === "all" && (
                      <div>
                        <Dropdown
                          label="Available Delivery Dates"
                          options={
                            menuDates?.length > 0
                              ? menuDates?.map((date: any) => {
                                  return {
                                    label:
                                      moment(date).format("ddd MMM D, YYYY"),
                                    value: date,
                                  };
                                })
                              : []
                          }
                          value={""}
                          onChange={(v: any) => {
                            setSelectedDate(v.value);
                            setErrorLogin("");
                            setAddMenuError("");
                          }}
                        />
                      </div>
                    )}

                    <Button
                      title="Check out"
                      extraClasses="w-full mb-2"
                      onClick={() => {
                        if (!auth) {
                          setErrorLogin("Log in to continue to checkout.");
                          navigate(
                            navigateFrom ||
                              AUTH_ROUTES.linkCustomerExploreCheckoutLogin
                          );
                          setErrorLogin("");
                          return;
                        }
                        if (!restaurantView && selectedDate === "all") {
                          setErrorLogin("Select a delivery date.");
                          return;
                        } else {
                          setErrorLogin("");
                          setCartView(false);
                          setDeliveryView(true);
                        }
                      }}
                    />

                    {/* <OutlineButton
                title="Keep buying"
                extraClasses="w-full mt-3 p-2"
              /> */}
                  </div>
                )}
              </div>
            )}

            {deliveryView && (
              <>
                {!restaurantView ? (
                  <div className="p-6">
                    <p className="text-xl font_medium">Delivery Details</p>
                    {/* <TabMenu
                  ordersMenu={["Delivery", "Pickup"]}
                  selectedOrder={selectedTab}
                  setSelectedOrder={setSelectedTab}
                  containerExtraClasses="lg:w-2/4"
                  textExtraClasses="w-1/2 text-base"
                /> */}

                    <div className="mt-5">
                      <Input
                        placeholder="City"
                        name="city"
                        value={values["city"]}
                        readOnly
                      />

                      <AutoCompleteInput
                        defaultValue={values["deliveryAddress"]}
                        onSelect={(place: any) => {
                          setFieldValue(
                            "deliveryAddress",
                            place.formatted_address
                          );
                          setFieldValue(
                            "deliveryAddressLatitude",
                            place.geometry?.location.lat()
                          );
                          setFieldValue(
                            "deliveryAddressLongitude",
                            place.geometry?.location.lng()
                          );
                        }}
                        error={errors["deliveryAddress"]}
                      />

                      {deliveryFormInputs?.map((input, i) => (
                        <Input
                          key={i}
                          type={input?.type}
                          placeholder={input?.placeholder}
                          name={input?.name}
                          onChange={handleChange}
                          value={values[input.name as keyof typeof values]}
                          onkeyup={handlePhoneNumber}
                          error={
                            errors[input?.name as keyof typeof values] &&
                            touched[input?.name as keyof typeof values] &&
                            errors[input?.name as keyof typeof values]
                          }
                        />
                      ))}

                      <Dropdown
                        label="Delivery Time"
                        options={timeOptions}
                        value={timeValue}
                        onChange={(v: any) => {
                          setTimeValue(v);
                          setFieldValue("deliveryTime", v.value);
                        }}
                        error={
                          errors["deliveryTime"] &&
                          touched["deliveryTime"] &&
                          errors["deliveryTime"]
                        }
                      />

                      <Input
                        type="text"
                        placeholder="Checkout code (Optional)"
                        name="checkoutCode"
                        onChange={(e: any) => {
                          // handleChange("checkoutCode")
                          setCheckoutCodeError("");
                          setFieldValue("checkoutCode", e.target.value);
                        }}
                        value={values.checkoutCode}
                        error={
                          errors.checkoutCode &&
                          touched.checkoutCode &&
                          errors.checkoutCode
                        }
                      />
                    </div>

                    {checkoutCodeError && (
                      <p className="mt-2 text-sm text-center text-red-600">
                        {checkoutCodeError}
                      </p>
                    )}

                    <div className="p-6">
                      <Button
                        title={
                          checkoutCodeError
                            ? "Continue with invalid code"
                            : "Review and pay"
                        }
                        extraClasses="w-full mt-6 mb-2"
                        loading={codeIsChecking}
                        onClick={() => handleSubmit()}
                      />

                      <OutlineButton
                        title="Back"
                        extraClasses="w-full mt-3 p-2"
                        onClick={() => {
                          setDeliveryView(false);
                          setCartView(true);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-4/5 h-fit mx-auto">
                      <div>
                        <h5 className="font_medium font-semibold">
                          Enter your details
                        </h5>
                        <p className="font_regular text-sm">
                          Enter your details to track the status of your food.
                        </p>
                      </div>
                      <div className="">
                        <Input
                          type="text"
                          placeholder="Name"
                          name="foodName"
                          onChange={restaurantChange}
                          value={restaurantValues.foodName}
                          error={
                            restaurantErrors.foodName &&
                            restaurantErrors.foodName
                          }
                        />

                        <Input
                          type="email"
                          placeholder="Email"
                          name="email"
                          onChange={restaurantChange}
                          value={restaurantValues.email}
                          error={
                            restaurantErrors.email && restaurantErrors.email
                          }
                        />

                        <div className="flex flex-col items-center justify-between gap-y-3 mt-10">
                          <Button
                            title="Pay now"
                            extraClasses="w-full p-3 rounded-full"
                            onClick={restaurantSubmit}
                          />
                          <OutlineButton
                            // loading={loading}
                            title="Pay Later"
                            extraClasses="w-full p-3 rounded-full px-8 py-2"
                            onClick={restaurantSubmit}
                          />

                          <Button
                            title="Back"
                            extraClasses="w-full p-3 rounded-full mt-3"
                            onClick={() => {
                              setDeliveryView(false);
                              setCartView(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {!restaurantView && reviewView && (
              <div className="mt-5">
                <div>
                  <div className="p-6">
                    <div className="mb-5">
                      <p className="text-lg text-black font_medium">
                        {user?.firstName
                          ? user?.firstName + " " + user?.lastName
                          : ""}
                      </p>
                      <p className="text-lg secondary_gray_color font_medium">
                        {values.phoneNumber}
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="text-lg text-black font_medium">
                        Delivery address{" "}
                      </p>
                      <p className="text-lg secondary_gray_color font_medium">
                        {values.deliveryAddress}
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="text-lg text-black font_medium">
                        Delivery day and time
                      </p>
                      <p className="text-lg secondary_gray_color font_medium">
                        {moment(selectedDate).format("ddd MMM D")}
                        {", "}
                        {values.deliveryTime}
                      </p>
                    </div>
                    {values.note && (
                      <div className="mb-5">
                        <p className="text-lg text-black font_medium">Note</p>
                        <p className="text-lg secondary_gray_color font_medium">
                          {values.note}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="py-6 pl-6 pr-8 input_bg">
                    {cartMenu?.length > 0 &&
                      cartMenu?.map((menu: any, index: any) => (
                        <div
                          key={index}
                          className="flex flex-row justify-between mb-5"
                        >
                          <p className="text-lg text-black font_medium">
                            {menu.foodName} X{menu.quantity}
                          </p>
                          <p className="text-lg text-black font_medium">
                            ₦
                            {formatPrice(
                              (menu?.discount
                                ? menu?.price -
                                  (menu?.price / 100) * menu?.discount
                                : menu?.price) * menu.quantity
                            )}
                          </p>
                        </div>
                      ))}
                    <div className="flex flex-row justify-between mb-5">
                      <p className="text-lg secondary_gray_color font_medium">
                        Delivery
                      </p>
                      <p
                        className={`text-lg secondary_gray_color font_medium ${
                          checkoutCodeValue?.delivery ? "line-through" : ""
                        }`}
                      >
                        ₦{formatPrice(deliveryCost)}
                      </p>
                    </div>
                    {checkoutCodeValue && (
                      <div className="flex flex-row justify-between mb-5">
                        <p className="text-lg secondary_gray_color font_medium">
                          Discount
                        </p>
                        <p className="text-lg secondary_gray_color font_medium">
                          {checkoutCodeValue.type === "amount"
                            ? `₦${checkoutCodeValue?.value}`
                            : `${checkoutCodeValue?.value}%`}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-row justify-between mb-5">
                      <p className="text-lg text-black font_medium">Total</p>
                      <p className="text-lg text-black font_bold">
                        ₦
                        {discountAmount > 0
                          ? formatPrice(discountAmount)
                          : formatPrice(totalAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <Button
                      title={`Pay ₦${
                        discountAmount > 0
                          ? formatPrice(discountAmount)
                          : formatPrice(totalAmount)
                      }`}
                      extraClasses="w-full mt-6 mb-2"
                      onClick={() => setShowPayment(true)}
                    />

                    <OutlineButton
                      title="Back"
                      extraClasses="w-full mt-3 p-2"
                      onClick={() => {
                        setReviewView(false);
                        setDeliveryView(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
