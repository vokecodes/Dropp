import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import Button from "./Button";
import OutlineButton from "./OutlineButton";
import Input from "./CustomInput";
import { QsrCheckoutValues, RestaurantCheckoutValues } from "../utils/FormInitialValue";
import { QsrCheckoutSchema, RestaurantCheckoutSchema } from "../utils/ValidationSchema";
import axios from "axios";
import { CHECKOUT_CODE_URL } from "../_redux/urls";
import {
  formatPrice,
  handlePhoneNumber,
  truncateText,
} from "../utils/formatMethods";
import { useAppDispatch } from "../redux/hooks";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import RestaurantShopMenuCard from "./RestaurantShopMenuCard";
import RestaurantShopCartMenuCard from "./RestaurantShopCartMenuCard";
import AlertDialog from "./AlertDialog";

const deliveryFormInputs = [
  { type: "text", placeholder: "Name", name: "name" },
  { type: "text", placeholder: "Phone Number", name: "phoneNumber" },
];

const QsrCart = ({
  cartMenu,
  handleCheckout,
  handlePayLaterCheckout,
  checkoutLoading,
  checkoutLaterLoading,
  chef,
  handleIncrement,
  handleDecrement,
  cartView,
  setCartView,
  deliveryView,
  setDeliveryView,
  setReviewView,
  selectedMealQuantityReached,
  showMinimumQuantityReached,
  addMenuError,
  cartModal,
  setCartModal,
  closeCartModal,
}: any) => {
  const { user, auth } = useSelector(
    (state: any) => ({
      user: state.user.user,
      auth: state.auth.user,
    }),
    shallowEqual
  );

  const [checkoutCodeValue, setCheckoutCodeValue] = useState<any>();
  const [checkoutCodeError, setCheckoutCodeError] = useState<any>();
  const [codeIsChecking, setCodeIsChecking] = useState(false);

  const [openAlertModal, setOpenAlertModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenAlertModal(true);
  };

  const handleClose = () => {
    setOpenAlertModal(false);
  };

  const [payNowModal, setPayNowModal] = useState(false);
  const openPayNowModal = () => setPayNowModal(true);
  const closePayNowModal = () => setPayNowModal(false);

  let discountAmount =
    checkoutCodeValue && checkoutCodeValue.type === "amount"
      ? cartMenu
          ?.map(
            (c: any) =>
              (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
              c.quantity
          )
          .reduce((partialSum: any, a: any) => partialSum + a, 0) -
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
          checkoutCodeValue?.value
      : 0;

  let totalAmount =
    checkoutCodeValue && checkoutCodeValue.type === "amount"
      ? cartMenu
          ?.map(
            (c: any) =>
              (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
              c.quantity
          )
          .reduce((partialSum: any, a: any) => partialSum + a, 0) -
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
          checkoutCodeValue?.value
      : cartMenu
          ?.map(
            (c: any) =>
              (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
              c.quantity
          )
          .reduce((partialSum: any, a: any) => partialSum + a, 0);

  let processingFee =
    Number(totalAmount) * 0.015 + (Number(totalAmount) > 2500 ? 100 : 0) > 2000
      ? 2000
      : Number(totalAmount) * 0.015 + (Number(totalAmount) > 2500 ? 100 : 0);

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

  const [errorMessage, setErrorMessage] = useState<string>();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
    isValid,
  } = useFormik({
    initialValues: QsrCheckoutValues,
    validationSchema: QsrCheckoutSchema,
    onSubmit: (values) => {
      // openPayNowModal();

      handleCheckout({
        order: cartOrder,
        totalAmount: totalAmount,
        discountAmount,
        ...values,
        quick_service: chef?.profile?._id,
        cartMenu,
      });
    },
  });

//   useEffect(() => {
//     if (cartMenu.length < 1) {
//       setCartModal(false);
//     }
//   }, [cartMenu]);

  return (
    <div className="box-border w-full h-full bg-neutral-100 lg:bg-white py-1 lg:py-6 lg:px-2 shadow scroller flex flex-col items-stretch justify-start">
      <div className="w-full flex justify-between items-center my-3 px-1">
        <h1 className="text-3xl font_regular font-semibold text-black">
          Your bag
        </h1>
        <div
          className="flex items-center justify-center w-10 h-10 cursor-pointer"
          onClick={closeCartModal}
        >
          <XMarkIcon className="h-6 w-6" />
        </div>
      </div>

      <div className="grow w-full flex flex-col justify-start items-stretch">
        <div className="w-full flex flex-row items-center justify-between py-3 bg-white px-2">
            <p className="text-xl font-semibold font_regular">
                {cartMenu?.length} Item{cartMenu?.length > 1 && "s"}
            </p>

            <p className="text-xl font-bold font_bold">
                ₦{formatPrice(totalAmount)}
            </p>
        </div>
        {cartView && (
          <div className="w-full grow flex flex-col items-stretch justify-start">
            {cartMenu.length > 0 ? (
                <>
                    <div className="w-full h-[30vh] lg:h-[35vh] mt-5 flex flex-col justify-start items-center gap-y-2 px-2 lg:px-1 overflow-y-auto">
                    {cartMenu &&
                        cartMenu?.length > 0 &&
                        cartMenu?.map((meal: any, index: number) => {
                        return (
                            <div key={index} className="w-full bg-white p-1">
                              <div
                                  className="h-16 w-full flex flex-row justify-between gap-x-2"
                                  key={index}
                              >
                                  <div className="w-1/5">
                                  <img
                                      src={meal.images[0]}
                                      alt="meal"
                                      className="h-full w-full rounded object-center object-cover"
                                  />
                                  </div>

                                  <div className="w-4/5 h-full flex flex-row items-center justify-between gap-x-2">
                                  {/* NAME & PRICE */}
                                  <div className="h-full w-1/2 text-start flex flex-col items-start justify-around">
                                      <p className="text-xs lg:text-sm input_text capitalize font-medium ">
                                      {truncateText(meal?.foodName, 25, 23)}
                                      </p>
                                      <p className="text-sm lg:text-base pt-1 font-bold">
                                      ₦
                                      {meal?.discount
                                          ? (meal.price -
                                              (meal.price / 100) * meal.discount) *
                                          meal.quantity
                                          : meal.price * meal.quantity}
                                      </p>
                                  </div>

                                  {/* BUTTON */}
                                  <div className="h-full w-1/2 flex items-center justify-end">
                                      <div className="mr-3 flex flex-row w-28 justify-between items-center gap-x-3 rounded-full solid_border h-10 p-3">
                                      <p
                                          className="primary_txt_color font-bold cursor-pointer"
                                          onClick={() =>
                                          handleDecrement(meal, meal?.minimumQuantity)
                                          }
                                      >
                                          -
                                      </p>
                                      <p className="font-bold">{meal?.quantity}</p>
                                      <p
                                          className="primary_txt_color font-bold cursor-pointer"
                                          onClick={() => handleIncrement(meal)}
                                      >
                                          +
                                      </p>
                                      </div>
                                  </div>
                                  </div>
                              </div>

                              {showMinimumQuantityReached && selectedMealQuantityReached === meal && (
                                <p className="mt-2 text-sm text-center text-red-600">
                                    Minimum quantity is {meal?.minimumQuantity}
                                </p>
                              )}
                            </div>
                        );
                        })}
                    </div>

                    <div className="grow flex flex-col justify-between w-full mx-auto px-2 lg:px-1 ">
                      <div>
                        <div>
                          <h5 className="font_medium font-semibold">Customer details</h5>
                          <p className="font_regular text-sm">
                            Enter the customer details below.
                          </p>
                        </div>

                        <div className="">
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
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-between gap-y-3">
                        <Button
                          title="Paid"
                          loading={checkoutLoading}
                          extraClasses="w-full p-3 rounded-full px-8 py-2"
                          onClick={() => {
                            handleSubmit();
                          }}
                        />
                      </div>
                    </div>

                    {/* <div className="w-full mt-5 flex flex-col justify-start items-center gap-y-2">
                    {cartMenu?.length > 0 && (
                        <>
                        <div className="py-6 w-full px-2">
                            {addMenuError && (
                            <p className="mt-2 text-sm text-center text-red-600">
                                {addMenuError}
                            </p>
                            )}

                            <Button
                            title="Checkout"
                            extraClasses="w-full mb-2"
                            onClick={() => {
                                setCartView(false);
                                setDeliveryView(true);
                            }}
                            />

                            <OutlineButton
                                title="Keep buying"
                                extraClasses="w-full p-3 px-8 py-2"
                                onClick={closeCartModal}
                            />
                        </div>
                        </>
                    )}
                    </div> */}
                </>
            ): (
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <p className="text-xl">Nothing to see here...</p>
                </div>
            )}
          </div>
        )}

        {/* {deliveryView && (
          <div className="w-full h-fit mx-auto px-2 lg:px-1">
            <div>
              <h5 className="font_medium font-semibold">Customer details</h5>
              <p className="font_regular text-sm">
                Enter the customer details below.
              </p>
            </div>
            <div className="">
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

              <div className="flex flex-col items-center justify-between gap-y-3 mt-10">
                <Button
                  title="Paid"
                  loading={checkoutLaterLoading}
                  extraClasses="w-full p-3 rounded-full px-8 py-2"
                  onClick={() => {
                    handlePayLaterCheckout({
                      order: cartOrder,
                      totalAmount,
                      discountAmount,
                      ...values,
                      quick_service: chef?.profile?._id,
                      cartMenu,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* <Modal
        open={payNowModal}
        onClose={closePayNowModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        component={"div"}
      >
        <div className="absolute top-1/2 left-1/2 w-11/12 lg:w-1/3 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl my-10 pb-4 outline-none">
          <div>
            <div
              className="p-4 flex justify-end cursor-pointer"
              onClick={closePayNowModal}
            >
              <XMarkIcon className="h-6 w-6" />
            </div>

            <div className="mx-6">
              <h1 className="text-xl text-center font_bold">Pay now</h1>
              <div className="my-10">
                <div className="flex justify-between items-center bg-[#F6F6F6] p-3 mb-3">
                  <p className="text-lg text-[#8E8E8E] font_medium">
                    Your order
                  </p>
                  <p className="text-lg text-[#8E8E8E] font_bold">
                    ₦{totalAmount}
                  </p>
                </div>
                <div className="flex justify-between items-center bg-[#F6F6F6] p-3 mb-3">
                  <p className="text-lg text-[#8E8E8E] font_medium">
                    Processing fee
                  </p>
                  <p className="text-lg text-[#8E8E8E] font_bold">
                    ₦{processingFee}
                  </p>
                </div>
                <div className="flex justify-between items-center bg-[#F6F6F6] p-3 mb-3">
                  <p className="text-lg text-[#8E8E8E] font_medium">Total</p>
                  <p className="text-lg text-black font_bold">
                    ₦{totalAmount + processingFee}
                  </p>
                </div>
              </div>
              <Button
                title="Proceed"
                extraClasses="w-full p-3 rounded-full mt-3"
                onClick={() => {
                  closePayNowModal();
                  
                  handleCheckout({
                    order: cartOrder,
                    totalAmount: totalAmount + processingFee,
                    discountAmount,
                    ...values,
                    quick_service: chef?.profile?._id,
                    cartMenu,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </Modal> */}

      <AlertDialog
        message="Your email and Whatsapp number are required for online payments"
        handleClose={handleClose}
        open={openAlertModal}
      />
    </div>
  );
};

export default QsrCart;
