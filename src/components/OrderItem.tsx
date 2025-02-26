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
import { formatPrice, toTitleCase, uuidGen } from "../utils/formatMethods";
import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { SERVER } from "../config/axios";
import { STOREFRONT_ORDER_URL } from "../_redux/urls";
import Spinner from "./Spinner";

const STATUS_OPTIONS = ["pending", "delivered", "cancelled", "voided"];

const OrderItem = ({
  id,
  orders,
  date,
  time,
  showCustomer,
  customerImage,
  customerName,
  customerEmail,
  customerNumber,
  address,
  note,
  completed,
  onClickIconOpen,
  onClickIconClose,
  review,
  rating,
  event,
  checkoutCode,
  restaurantOrder,
  order,
  getStorefrontOrders,
  noTax,
}: OrderItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [orderStatus, setOrderStatus] = useState(order?.status);

  console.log("first= ", orders);

  const [isSending, setIsSending] = useState(false);

  const handleApprovalOrder = (status, orderObj) => {
    setIsSending(true);
    if (orderObj?.id) {
      SERVER.patch(`${STOREFRONT_ORDER_URL}/status/${orderObj.id}`, {
        order: { ...orderObj, status: status },
      })
        .then(({ data }) => {
          dispatch(getStorefrontOrders());
        })
        .catch((error) => {
          console.log("err= ", error);
        });
    }
    setIsSending(false);
  };

  return (
    <div className="my-7">
      {restaurantOrder ? (
        <>
          <div className="w-full hidden lg:block">
            <div className="w-full flex justify-between lg:justify-start border-b pb-4 px-8 lg:gap-x-5">
              <div className="w-1/4">
                {orders?.length > 0 &&
                  orders?.map((order: any) => (
                    <div className="h-11 flex items-center mb-5">
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
                {event ? (
                  <>
                    {orders?.length > 0 &&
                      orders?.map((order: any) => {
                        return (
                          <p className="h-11 mb-5 text-xl font_bold text-black">
                            ₦{formatPrice(order.eventAmount)}
                          </p>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {orders?.length > 0 &&
                      orders?.map((order: any) => {
                        const price =
                          (order?.discount
                            ? order?.price -
                              (order?.price / 100) * order?.discount
                            : order?.price) * order?.quantity;

                        const priceAfterTax = (price / 100) * 85;

                        return (
                          <p className="h-11 mb-5 text-xl font_bold text-black">
                            ₦{formatPrice(noTax ? price : priceAfterTax)}
                          </p>
                        );
                      })}
                  </>
                )}
              </div>

              <div className="w-1/4 flex flex-row items-start justify-between">
                <div className="flex justify-center">
                  {completed !== "completed" && (
                    <OutlineButton
                      title={`${completed}`}
                      extraClasses="rounded-lg px-4 py-2 text-xs h-10 cursor-default"
                      disabled={true}
                    />
                  )}
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
                {orders?.length > 0 &&
                  orders?.map((order: any) => {
                    const price =
                      (order?.discount
                        ? order?.price - (order?.price / 100) * order?.discount
                        : order?.price) * order?.quantity;

                    const priceAfterTax = (price / 100) * 85;

                    return (
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
                          <p className="text-sm font_regular sec_gray_color">
                            {order?.quantity}
                          </p>
                        </div>

                        {event ? (
                          <p className="h-11 mb-5 text-xl font_bold text-black">
                            ₦{formatPrice(order.eventAmount)}
                          </p>
                        ) : (
                          <p className="text-lg font-extrabold font_bold text-black">
                            ₦{formatPrice(noTax ? price : priceAfterTax)}
                          </p>
                        )}
                      </div>
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
                      {customerName}
                    </p>
                  </div>

                  <div className="w-1/3 flex flex-col items-start justify-center">
                    <p className="text-base text-start font-bold font_regular text-black">
                      Email
                    </p>
                    <p className="text-base text-start font-semibold font_regular sec_gray_color">
                      {customerEmail}
                    </p>
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
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="block">
            <div className="flex px-8 pb-4">
              <div className="w-1/3">
                {orders?.length > 0 &&
                  orders?.map((order: any) => (
                    <div
                      key={order._id}
                      className="h-11 flex items-center mb-5"
                    >
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

              <div className="w-1/3 flex flex-row">
                <div>
                  {event ? (
                    <>
                      {orders?.length > 0 &&
                        orders?.map((order: any) => {
                          return (
                            <p className="h-11 mb-5 text-xl font_bold text-black">
                              ₦{formatPrice(order.eventAmount)}
                            </p>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {orders?.length > 0 &&
                        orders?.map((order: any) => {
                          const price =
                            (order?.discount
                              ? order?.price -
                                (order?.price / 100) * order?.discount
                              : order?.price) * order?.quantity;

                          const priceAfterTax = (price / 100) * 85;

                          return (
                            <p
                              key={order._id}
                              className="h-11 mb-5 text-xl font_bold text-black"
                            >
                              ₦{formatPrice(noTax ? price : priceAfterTax)}
                            </p>
                          );
                        })}
                    </>
                  )}
                </div>

                <div className="flex-1 flex justify-center">
                  <Popover className="relative">
                    <Popover.Button
                      className={`w-fit text-xs text-medium border border-solid px-3 py-2 text-center rounded-xl flex flex-row items-center justify-center gap-x-1 
                      ${
                        orderStatus === STATUS_OPTIONS[0]
                          ? "text-[#ffffff] bg-[#000000] border-[#D8D8D8]"
                          : orderStatus === STATUS_OPTIONS[1]
                          ? "text-[#06C167] bg-[#ECFFEB] border border-[#06C167]"
                          : orderStatus === STATUS_OPTIONS[2]
                          ? "text-[#C10606] bg-[#FFF5F5] border-[#C10606]"
                          : "text-[#EAAC29] bg-[#FFFAED] border-[#EAAC29]"
                      }
                      `}
                      disabled={
                        isSending || orderStatus !== STATUS_OPTIONS[0]
                          ? true
                          : false
                      }
                    >
                      {isSending ? (
                        <Spinner />
                      ) : (
                        <>
                          {orderStatus === STATUS_OPTIONS[0]
                            ? "Confirm Order"
                            : toTitleCase(orderStatus)}
                          <IoIosArrowDown
                            size={10}
                            className={
                              orderStatus === STATUS_OPTIONS[1] && "hidden"
                            }
                          />
                        </>
                      )}
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="box-border absolute z-10 bg-white mb-2 w-24 lg:w-32 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black">
                        <div className="w-full">
                          <RadioGroup>
                            <div className="space-y-3">
                              {STATUS_OPTIONS?.map((item: any, i) => (
                                <RadioGroup.Option
                                  key={uuidGen()}
                                  value={item}
                                  className={
                                    "flex items-center cursor-pointer mb-2"
                                  }
                                  onClick={() => {
                                    setOrderStatus(item);
                                    handleApprovalOrder(item, order);
                                  }}
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <div
                                        className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                                          orderStatus === item
                                            ? "primary_bg_color"
                                            : "bg_gray_color"
                                        }`}
                                      />

                                      <div className="text-sm">
                                        <RadioGroup.Label
                                          as="p"
                                          className={`text-xs lg:text-sm secondary_gray_color text-black capitalize`}
                                        >
                                          {checked}
                                          {toTitleCase(item)}
                                        </RadioGroup.Label>
                                      </div>
                                    </>
                                  )}
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
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
          <div className="hidden px-8 pb-4">
            <div className="flex">
              <div className="flex-1">
                {orders?.length > 0 &&
                  orders?.map((order: any) => {
                    const price =
                      (order?.discount
                        ? order?.price - (order?.price / 100) * order?.discount
                        : order?.price) * order?.quantity;

                    const priceAfterTax = (price / 100) * 85;

                    return (
                      <div key={order._id} className="flex mb-3">
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

                        {event ? (
                          <p className="h-11 mb-5 text-xl font_bold text-black">
                            ₦{formatPrice(order.eventAmount)}
                          </p>
                        ) : (
                          <p className="text-lg font-extrabold font_bold text-black mr-5">
                            ₦{formatPrice(noTax ? price : priceAfterTax)}
                          </p>
                        )}
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
              <div className="block">
                <div className="flex dashboard_bg px-8 py-4">
                  <div className="w-1/3 flex">
                    <div className="w-full">
                      <p className="text-lg font-bold font_regular text-black">
                        Customer:
                      </p>
                      <p className="text-sm font_regular sec_gray_color">
                        {customerName}
                      </p>
                      <p className="text-sm font_regular sec_gray_color">
                        {customerNumber}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex">
                      <div className="w-full">
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
                                key={uuidGen()}
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

                  <div className="flex flex-col justify-start items-center gap-y-3 w-1/3 ml-2">
                    <div className="w-full">
                      <p className="text-lg font-bold font_regular text-black">
                        Note:
                      </p>
                      <p className="text-sm font_regular sec_gray_color">
                        {note}
                      </p>
                    </div>
                    {/* {completed !== "completed" && (
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
                    )} */}
                  </div>
                </div>
              </div>

              <div className="hidden">
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
                    <div className="flex items-center mt-2">
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
                    </div>
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
                            key={uuidGen()}
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

export default OrderItem;
