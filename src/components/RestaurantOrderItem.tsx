// @ts-nocheck

import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { OrderItemProps } from "../utils/Interfaces";
import OutlineButton from "./OutlineButton";
import { CHEF_ROUTES } from "../routes/routes";
import { completeOrder } from "../_redux/order/orderAction";
import ColoredSpinner from "./ColoredSpinner";
import { useAppDispatch } from "../redux/hooks";
import { formatPrice } from "../utils/formatMethods";
import { SERVER } from "../config/axios";
import Spinner from "./Spinner";
import { Popover } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { Divider } from "@mui/material";

const RestaurantOrderItem = ({
  id,
  orders,
  cartMenu,
  date,
  time,
  showCustomer,
  customerImage,
  customerName,
  customerEmail,
  address,
  note,
  completed,
  onClickIconOpen,
  onClickIconClose,
  review,
  rating,
  event,
  paid,
  gift,
  checkoutCode,
  restaurantOrder,
  paymentLoading,
  markAsPaid,
  markAsGift,
}: OrderItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedOrder, setSelectedOrder] = useState<any>();

  return (
    <div className="my-7">
      {restaurantOrder ? (
        <>
          <div className="w-full hidden lg:block">
            <div className="w-full flex justify-between lg:justify-start border-b pb-4 px-8 lg:gap-x-5">
              <div className="w-1/6">
                <p className="text-base font-bold font_regular text-black">
                  #{id?.substring(id?.length - 5)}
                </p>
              </div>
              <div className="w-2/4">
                {cartMenu?.length > 0 &&
                  cartMenu?.map((order: any, i: number) => (
                    <div key={i} className="h-11 flex items-center mb-5">
                      <img
                        src={order?.images[0]}
                        alt="food"
                        className="w-11 h-11 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-base font-bold font_regular text-black">
                          {order?.foodName}
                        </p>
                        <p className="text-sm font_regular capitalize sec_gray_color">
                          {order?.quantity} - {orders[i]?.status}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="w-1/4 flex flex-col items-start justify-start gap-y-3">
                <p className="text-base font-bold font_regular text-black">
                  {date}
                </p>
                <p className="text-sm font_regular sec_gray_color">{time}</p>
                {/* {checkoutCode && (
                  <p className="text-md font_bold text-black">
                    Checkout Code: {checkoutCode}
                  </p>
                )} */}
              </div>

              <div className="w-1/4">
                {cartMenu?.length > 0 &&
                  cartMenu?.map((order: any, i: any) => {
                    const price =
                      (order?.discount
                        ? order?.price - (order?.price / 100) * order?.discount
                        : order?.price) * order?.quantity;

                    // const priceAfterTax = (price / 100) * 85;

                    return (
                      <p key={i} className="h-11 mb-5 text-xl font_bold text-black">
                        ₦{formatPrice(price)}
                      </p>
                    );
                  })}
              </div>

              <div className="w-1/4 flex flex-row items-start justify-between">
                <div className="flex justify-center">
                  <OutlineButton
                    title={`${completed}`}
                    extraClasses="rounded-lg px-4 py-2 text-xs h-10 cursor-default"
                    disabled={true}
                  />
                </div>

                {showCustomer ? (
                  <div
                    className="cursor-pointer p-3 rounded-full bg-gray-100 hover:bg-gray-300"
                    onClick={onClickIconClose}
                  >
                    <FaChevronUp color="#000" />
                  </div>
                ) : (
                  <div
                    className="cursor-pointer p-3 rounded-full bg-gray-100 hover:bg-gray-300"
                    onClick={onClickIconOpen}
                  >
                    <FaChevronDown color="#000" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:hidden pb-4 shadow-lg rounded-xl">
            {showCustomer ? (
              <div
                className="flex flex-row items-center justify-end w-full h-fit mb-2 py-2 bg-gray-100 px-4 rounded-t-xl"
                onClick={onClickIconClose}
              >
                <div className="cursor-pointer">
                  <FaChevronUp color="#000" />
                </div>
              </div>
            ) : (
              <div
                className="flex flex-row items-center justify-end w-full h-fit mb-2 py-2 bg-gray-100 px-4 rounded-t-xl"
                onClick={onClickIconOpen}
              >
                <div className="cursor-pointer">
                  <FaChevronDown color="#000" />
                </div>
              </div>
            )}

            <div className="flex flex-col items-start justify-start px-4">
              <div className="w-full h-fit flex flex-col items-start justify-start">
                {cartMenu?.length > 0 &&
                  cartMenu?.map((order: any, i: number) => {
                    const price =
                      (order?.discount
                        ? order?.price - (order?.price / 100) * order?.discount
                        : order?.price) * order?.quantity;

                    // const priceAfterTax = (price / 100) * 85;

                    return (
                      <Fragment key={i}>
                        <p className="text-base font-bold font_regular text-black">
                          #{id?.substring(id?.length - 5)}
                        </p>
                        <div className="flex mb-3">
                          <img
                            src={order?.images[0]}
                            alt="food"
                            className="w-11 h-11 rounded-full"
                          />
                          <div className="flex-1 ml-2">
                            <p className="text-md font-bold font_regular text-black">
                              {order?.foodName}
                            </p>
                            <p className="text-sm font_regular capitalize sec_gray_color">
                              {order?.quantity} - {orders[i]?.status}
                            </p>
                          </div>

                          <p className="ml-2 text-lg font-extrabold font_bold text-black">
                            ₦{formatPrice(price)}
                          </p>
                        </div>
                      </Fragment>
                    );
                  })}
              </div>
            </div>

            <div className="flex justify-between px-4">
              <div>
                <div className="flex flex-col items-start justify-start gap-y-1 mt-2">
                  <p className="mr-3 text-base font-bold font_regular text-black">
                    {date}
                  </p>
                  <p className="text-sm font_regular sec_gray_color">{time}</p>
                </div>
                {checkoutCode && (
                  <p className="text-md font_bold text-black">
                    Checkout Code: {checkoutCode}
                  </p>
                )}
              </div>

              <div>
                <OutlineButton
                  title={`${completed}`}
                  extraClasses="rounded-lg px-2 py-1 text-xs h-10 cursor-default"
                  disabled={true}
                />
              </div>
            </div>
          </div>

          {showCustomer && (
            <>
              <div className="w-full hidden lg:block mb-3">
                <div className="w-full flex flex-row items-center justify-start dashboard_bg px-8 py-4 rounded-b-xl">
                  <div className="w-1/3 flex flex-col items-start justify-center">
                    <p className="text-base text-start font-bold font_regular text-black">
                      Customer's Name
                    </p>
                    <p className="text-base text-start font-semibold font_regular sec_gray_color">
                      {customerName || "-"}
                    </p>
                  </div>

                  <div className="w-1/3 flex flex-col items-start justify-center">
                    <p className="text-base text-start font-bold font_regular text-black">
                      Email
                    </p>
                    <p className="text-base text-start font-semibold font_regular sec_gray_color">
                      {customerEmail || "-"}
                    </p>
                  </div>

                  <div
                    className={`${
                      paid || gift
                        ? "w-20 px-2 py-2 rounded-xl bg_credit_color"
                        : "w-44 px-2 py-2 rounded-xl border-2 border_credit_color cursor-pointer"
                    }`}
                  >
                    {paymentLoading ? (
                      <svg
                        className="animate-spin ml-14 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-5"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#06c167"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-80"
                          fill="#06c167"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : (
                      <>
                        {paid ? (
                          <p
                            className={`${
                              paid
                                ? "text-base font_bold text-white text-center"
                                : "text-base font_bold credit_color text-center"
                            }`}
                          >
                            Paid
                          </p>
                        ) : gift ? (
                          <p
                            className={`${
                              gift
                                ? "text-base font_bold text-white text-center"
                                : "text-base font_bold credit_color text-center"
                            }`}
                          >
                            Gift
                          </p>
                        ) : (
                          <Popover className="relative">
                            <Popover.Button
                              className={
                                "credit_color font-semibold flex flex-row items-center justify-between gap-x-2 text-nowrap"
                              }
                            >
                              Pending Payment <IoIosArrowDown />
                            </Popover.Button>

                            <Popover.Panel className="absolute top-10 -left-2 z-10 bg-neutral-200 w-44 h-auto p-1 rounded-xl">
                              <div className="flex flex-col items-start justify-start gap-y-2 w-full">
                                <p
                                  className="w-full p-2 rounded-lg hover:bg-neutral-400"
                                  onClick={() => {
                                    if (!paid) {
                                      markAsPaid();
                                    }
                                  }}
                                >
                                  {" "}
                                  Paid{" "}
                                </p>

                                <Divider variant="middle" flexItem />

                                <p
                                  className="w-full p-2 rounded-lg hover:bg-neutral-400"
                                  onClick={() => {
                                    if (!gift) {
                                      markAsGift();
                                    }
                                  }}
                                >
                                  Gift item
                                </p>
                              </div>

                              <img src="/solutions.jpg" alt="" />
                            </Popover.Panel>
                          </Popover>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:hidden mt-1 w-full">
                <div className="flex flex-col justify-start items-start gap-y-2 dashboard_bg px-8 py-4 rounded-xl w-full">
                  <div className="w-full flex flex-col items-start justify-center">
                    <p className="text-base text-start font-bold font_regular text-black">
                      Customer's Name
                    </p>
                    <p className="text-base text-start font-semibold font_regular sec_gray_color">
                      {customerName}
                    </p>
                  </div>

                  <div className="w-full flex flex-col items-start justify-center">
                    <p className="text-base text-start font-bold font_regular text-black">
                      Email
                    </p>
                    <p className="text-base text-start font-semibold font_regular sec_gray_color">
                      {customerEmail}
                    </p>
                  </div>

                  <div
                    className={`${
                      paid || gift
                        ? "w-20 px-2 py-2 rounded-xl bg_credit_color"
                        : "w-44 px-2 py-2 rounded-xl border-2 border_credit_color cursor-pointer"
                    }`}
                  >
                    <p
                      className={`${
                        paid || gift
                          ? "text-base font_bold text-white text-center"
                          : "text-base font_bold credit_color text-center"
                      }`}
                    >
                      {paymentLoading ? (
                        <svg
                          className="animate-spin ml-14 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-5"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#06c167"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-80"
                            fill="#06c167"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : (
                        <>
                          {paid ? (
                            <p
                              className={`${
                                paid
                                  ? "text-base font_bold text-white text-center"
                                  : "text-base font_bold credit_color text-center"
                              }`}
                            >
                              Paid
                            </p>
                          ) : gift ? (
                            <p
                              className={`${
                                gift
                                  ? "text-base font_bold text-white text-center"
                                  : "text-base font_bold credit_color text-center"
                              }`}
                            >
                              Gift
                            </p>
                          ) : (
                            <Popover className="relative">
                              <Popover.Button
                                className={
                                  "credit_color font-semibold flex flex-row items-center justify-between gap-x-2 text-nowrap"
                                }
                              >
                                Pending Payment <IoIosArrowDown />
                              </Popover.Button>

                              <Popover.Panel className="absolute top-10 -left-2 z-10 bg-neutral-200 w-44 h-auto p-1 rounded-xl">
                                <div className="flex flex-col items-start justify-start gap-y-2 w-full">
                                  <p
                                    className="w-full p-2 rounded-lg hover:bg-neutral-400"
                                    onClick={() => {
                                      if (!paid) {
                                        markAsPaid();
                                      }
                                    }}
                                  >
                                    {" "}
                                    Paid{" "}
                                  </p>

                                  <Divider variant="middle" flexItem />

                                  <p
                                    className="w-full p-2 rounded-lg hover:bg-neutral-400"
                                    onClick={() => {
                                      if (!gift) {
                                        markAsGift();
                                      }
                                    }}
                                  >
                                    Gift item
                                  </p>
                                </div>

                                <img src="/solutions.jpg" alt="" />
                              </Popover.Panel>
                            </Popover>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="hidden lg:block">
            <div className="flex px-8 pb-4">
              <div className="w-1/3">
                {cartMenu?.length > 0 &&
                  cartMenu?.map((order: any, i: any) => (
                    <div key={i} className="h-11 flex items-center mb-5">
                      <img
                        src={order?.images[0]}
                        alt="food"
                        className="w-11 h-11 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-base font-bold font_regular text-black">
                          {order?.foodName}
                        </p>
                        <p className="text-sm font_regular sec_gray_color">
                          {order?.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="w-1/3">
                {cartMenu?.length > 0 &&
                  cartMenu?.map((order: any, i: any) => {
                    const price =
                      (order?.discount
                        ? order?.price - (order?.price / 100) * order?.discount
                        : order?.price) * order?.quantity;

                    // const priceAfterTax = (price / 100) * 85;

                    return (
                      <p key={i} className="h-11 mb-5 text-xl font_bold text-black">
                        ₦{formatPrice(price)}
                      </p>
                    );
                  })}
              </div>

              <div className="w-1/3 flex flex-col lg:flex-row">
                <div>
                  <p className="text-base font-bold font_regular text-black">
                    {date}
                  </p>
                  <p className="text-sm font_regular sec_gray_color">{time}</p>
                  {checkoutCode && (
                    <p className="text-md font_bold text-black">
                      Checkout Code: {checkoutCode}
                    </p>
                  )}
                </div>

                <div className="flex-1 flex justify-center">
                  {/* <OutlineButton
                      title="Chat"
                      extraClasses="rounded-lg px-4 py-2 text-xs h-10"
                      onClick={() => navigate(CHEF_ROUTES.linkChefChat)}
                    /> */}
                </div>

                <div className="cursor-pointer">
                  {showCustomer ? (
                    <FaChevronUp color="#000" onClick={onClickIconClose} />
                  ) : (
                    <FaChevronDown color="#000" onClick={onClickIconOpen} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden px-8 pb-4">
            <div className="flex">
              <div className="flex-1">
                {cartMenu?.length > 0 &&
                  cartMenu?.map((order: any, i: any) => {
                    const price =
                      (order?.discount
                        ? order?.price - (order?.price / 100) * order?.discount
                        : order?.price) * order?.quantity;

                    // const priceAfterTax = (price / 100) * 85;

                    return (
                      <div key={i} className="flex mb-3">
                        <img
                          src={order?.images[0]}
                          alt="food"
                          className="w-11 h-11 rounded-full"
                        />
                        <div className="flex-1 ml-2">
                          <p className="text-md font-bold font_regular text-black">
                            {order?.foodName}
                          </p>
                          <p className="text-sm font_regular sec_gray_color">
                            {order?.quantity}
                          </p>
                        </div>
                        <p className="text-lg font-extrabold font_bold text-black mr-5">
                          ₦{formatPrice(price)}
                        </p>
                      </div>
                    );
                  })}
              </div>
              <div className="flex">
                <div className="cursor-pointer">
                  {showCustomer ? (
                    <FaChevronUp color="#000" onClick={onClickIconClose} />
                  ) : (
                    <FaChevronDown color="#000" onClick={onClickIconOpen} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="flex items-center mt-2">
                  <p className="mr-3 text-base font-bold font_regular text-black">
                    {date}
                  </p>
                  <p className="text-sm font_regular sec_gray_color">{time}</p>
                </div>
                {checkoutCode && (
                  <p className="text-md font_bold text-black">
                    Checkout Code: {checkoutCode}
                  </p>
                )}
              </div>

              <div>
                <OutlineButton
                  title="Chat"
                  extraClasses="rounded-lg px-4 py-2 text-xs"
                  onClick={() => navigate(CHEF_ROUTES.linkChefChat)}
                />
              </div>
            </div>
          </div>
          {showCustomer && (
            <>
              <div className="hidden lg:block">
                <div className="flex dashboard_bg px-8 py-4">
                  <div className="w-1/3 flex">
                    {customerImage ? (
                      <img
                        src={customerImage}
                        alt="customer"
                        className="w-11 h-11 rounded-full"
                      />
                    ) : (
                      <CiUser size={28} color="#06c167" />
                    )}
                    <div className="ml-3">
                      <p className="text-lg font-bold font_regular text-black">
                        {customerName}
                      </p>
                    </div>
                  </div>
                  <div className="w-2/3">
                    <div className="flex">
                      <div className="w-1/2">
                        <p className="text-lg font-bold font_regular text-black">
                          Address:
                        </p>
                        <p className="text-sm font_regular sec_gray_color">
                          {address}
                        </p>
                      </div>
                      {review && (
                        <div className="">
                          <p className="text-lg font-bold font_regular text-black">
                            Review:
                          </p>
                          <p className="text-sm font_regular sec_gray_color">
                            {review}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex">
                      {note && (
                        <div className="w-1/2">
                          <p className="text-lg font-bold font_regular text-black">
                            Note:
                          </p>
                          <p className="text-sm font_regular sec_gray_color">
                            {note}
                          </p>
                        </div>
                      )}

                      {rating && (
                        <div className="">
                          <p className="text-lg font-bold font_regular text-black">
                            Rating:
                          </p>
                          {/* <p className="text-sm font_regular sec_gray_color">
                          {rating}
                        </p> */}
                          <div className="flex justify-center items-center">
                            {[...Array(rating)]?.map((_, i: any) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#06c167"
                                className="w-4 h-4 cursor-pointer"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* <div className="flex items-center w-1/3 ml-2">
                    {completed !== "completed" && (
                      <div>
                        <label className="custom_checkbox">
                          {selectedOrder === id ? (
                            <ColoredSpinner />
                          ) : (
                            "Completed Order"
                          )}
                          <input
                            type="checkbox"
                            value={completed}
                            onChange={async (e) => {
                              setSelectedOrder(id);
                              if (e.target.checked) {
                                const data = { status: "completed" };
                                await dispatch(completeOrder(id, data));
                                setSelectedOrder("");
                              }
                              // else {
                              //   const data = { status: "processed" };
                              //   await dispatch(completeOrder(id, data));
                              //   setSelectedOrder("");
                              // }
                            }}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    )}
                  </div> */}
                </div>
              </div>

              <div className="lg:hidden">
                <div className="dashboard_bg px-8 py-4">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      {customerImage ? (
                        <img
                          src={customerImage}
                          alt="customer"
                          className="w-11 h-11 rounded-full"
                        />
                      ) : (
                        <CiUser size={28} color="#06c167" />
                      )}
                      <div className="ml-3">
                        <p className="text-lg font-bold font_regular text-black">
                          {customerName}
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex items-center mt-2">
                      {completed !== "completed" && (
                        <div>
                          <label className="custom_checkbox">
                            {selectedOrder === id ? (
                              <ColoredSpinner />
                            ) : (
                              "Completed Order"
                            )}
                            <input
                              type="checkbox"
                              value={completed}
                              onChange={async (e) => {
                                setSelectedOrder(id);
                                if (e.target.checked) {
                                  const data = { status: "completed" };
                                  await dispatch(completeOrder(id, data));
                                  setSelectedOrder("");
                                }
                                // else {
                                //   const data = { status: "processed" };
                                //   await dispatch(completeOrder(id, data));
                                //   setSelectedOrder("");
                                // }
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      )}
                    </div> */}
                  </div>
                  <div className="mt-2 flex items-center">
                    <p className="text-lg font-bold font_regular text-black">
                      Address:
                    </p>
                    <p className="ml-2 text-sm font_regular sec_gray_color">
                      {address}
                    </p>
                  </div>
                  {review && (
                    <div className="mt-2 flex items-center">
                      <p className="text-lg font-bold font_regular text-black">
                        Review:
                      </p>
                      <p className="ml-2 text-sm font_regular sec_gray_color">
                        {review}
                      </p>
                    </div>
                  )}
                  {note && (
                    <div className="mt-2 flex items-center">
                      <p className="text-lg font-bold font_regular text-black">
                        Note:
                      </p>
                      <p className="ml-2 text-sm font_regular sec_gray_color">
                        {note}
                      </p>
                    </div>
                  )}

                  {rating && (
                    <div className="mt-2 flex items-center">
                      <p className="text-lg font-bold font_regular text-black">
                        Rating:
                      </p>
                      {/* <p className="ml-2 text-sm font_regular sec_gray_color">
                        {rating}
                      </p> */}
                      <div className="flex justify-center items-center">
                        {[...Array(rating)]?.map((_, i: any) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#06c167"
                            className="w-4 h-4 cursor-pointer"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RestaurantOrderItem;
