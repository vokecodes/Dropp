import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import moment from "moment";
import * as Yup from "yup";
import Button from "./Button";
import OutlineButton from "./OutlineButton";
import Input from "./CustomInput";
import { AUTH_ROUTES, HOME_ROUTES } from "../routes/routes";
import { TABLE_OPTIONS } from "../utils/Globals";

const EventCart = ({
  eventName,
  cartMenu,
  handleCheckout,
  checkoutLoading,
  selectedDate,
  deliveryAddress,
  cartView,
  setCartView,
  deliveryView,
  setDeliveryView,
  reviewView,
  setReviewView,
  errorLogin,
  setErrorLogin,
  handleDelete,
  addMenuError,
}: any) => {
  const navigate = useNavigate();

  const { auth } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
    }),
    shallowEqual
  );

  let cartOrder = cartMenu?.map((c: any) => {
    return {
      menu: c._id,
      quantity: 1,
      amount: c.eventAmount || c.price,
    };
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      table: "",
      checkoutCode: eventName,
    },
    validationSchema: Yup.object().shape({
      table: Yup.string().required("Kindly select a table."),
      checkoutCode: Yup.string().required(
        "Kindly use the checkout code sent to your email."
      ),
    }),
    onSubmit: () => {
      if (values.checkoutCode === eventName) {
        setDeliveryView(false);
        setReviewView(true);
        return;
      }

      setErrorMessage("Incorrect checkout code");
    },
  });

  const chef = cartMenu.length > 0 && cartMenu[0].owner;

  return (
    <div className="w-full shadow">
      <div className="bg-white p-6">
        <h1 className="card_headerText text-3xl font_regular">Your bag</h1>
        <div className="flex flex-row justify-between">
          <p className="text-lg font_medium input_text">
            Delivery on {moment(selectedDate).format("ddd MMM D, YYYY")}
          </p>
          {/* <img src="/images/edit.svg" alt="edit" className="w-6" /> */}
        </div>
      </div>
      {chef && (
        <div className="grayBackground flex flex-row p-6">
          <div className="border-4 w-12 h-12 rounded-full flex justify-center items-center overflow-hidden">
            {chef?.image && (
              <img
                src={chef?.image}
                alt="chef"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
          </div>

          <p className="input_text text-1xl ml-3 mt-2 font_medium">
            {chef?.firstName} {chef?.lastName}
          </p>
        </div>
      )}

      <div className="bg-white overflow-scroll">
        {cartView && (
          <div className="p-6 lg:p-4 mt-5">
            {cartMenu &&
              cartMenu?.length > 0 &&
              cartMenu?.map((meal: any, index: number) => {
                return (
                  <div key={index} className="mb-5">
                    <div
                      className="flex flex-row justify-between mx-2 lg:mx-0"
                      key={index}
                    >
                      <div className="flex flex-row">
                        <img
                          src={meal.images[0]}
                          alt="meal"
                          className="w-24 h-24 rounded object-cover"
                        />
                        <div className="ml-2">
                          <p className="text-md input_text font-medium ">
                            {meal.foodName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div
                          className="cursor-pointer"
                          onClick={() => handleDelete(meal)}
                        >
                          <AiFillDelete className="w-5 h-5" color="#06c167" />
                        </div>
                      </div>
                    </div>
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

                <Button
                  title="Check out"
                  extraClasses="w-full mb-2"
                  onClick={() => {
                    if (!auth) {
                      setErrorLogin("Log in to continue to checkout.");
                      navigate(
                        HOME_ROUTES.linkEventRegister.replace(
                          ":eventName",
                          eventName
                        )
                      );
                      setErrorLogin("");
                      return;
                    }

                    setErrorLogin("");
                    setCartView(false);
                    setDeliveryView(true);
                  }}
                />
              </div>
            )}
          </div>
        )}

        {deliveryView && (
          <div className="p-6">
            <p className="text-xl font_medium">Delivery Details</p>

            <div className="mt-5">
              <Input
                placeholder="Table"
                name="table"
                type="dropdown"
                options={[{ label: "", value: "" }, ...TABLE_OPTIONS]}
                value={values["table"]}
                onChange={handleChange}
                error={errors["table"] && touched["table"] && errors["table"]}
              />
              <Input
                placeholder="Checkout Code"
                name="checkoutCode"
                value={values["checkoutCode"]}
                onChange={handleChange}
                error={
                  errors["checkoutCode"] &&
                  touched["checkoutCode"] &&
                  errors["checkoutCode"]
                }
              />
            </div>

            {errorMessage && (
              <p className="mt-2 text-sm text-center text-red-600">
                {errorMessage}
              </p>
            )}
            <div className="p-6">
              <Button
                title="Review and pay"
                extraClasses="w-full mt-6 mb-2"
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
        )}

        {reviewView && (
          <div className="mt-5">
            <div>
              <div className="p-6"></div>

              <div className="py-6 pl-6 pr-8 input_bg">
                {cartMenu?.length > 0 &&
                  cartMenu?.map((menu: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between mb-5"
                    >
                      <p className="text-lg text-black font_medium">
                        {menu.foodName}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="p-6">
                {errorLogin && (
                  <p className="text-sm text-center text-red-600">
                    {errorLogin}
                  </p>
                )}

                <Button
                  title={`Pay`}
                  loading={checkoutLoading}
                  extraClasses="w-full mt-6 mb-2"
                  onClick={() =>
                    handleCheckout({
                      order: cartOrder,
                      totalAmount: 0,
                      deliveryDate:
                        moment(selectedDate).format("ddd MMM D, YYYY"),
                      deliveryAddress,
                      ...values,
                      chef: chef?._id,
                      cartMenu,
                    })
                  }
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
  );
};

export default EventCart;
