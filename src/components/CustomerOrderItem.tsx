import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import TextArea from "./TextArea";
import { OrderItemProps } from "../utils/Interfaces";
import Button from "./Button";
import OutlineButton from "./OutlineButton";
import { ReviewValues } from "../utils/FormInitialValue";
import { ReviewSchema } from "../utils/ValidationSchema";
import { CUSTOMER_ROUTES } from "../routes/routes";
import { useAppDispatch } from "../redux/hooks";
import { updateCustomerOrders } from "../_redux/order/orderAction";
import { formatPrice } from "../utils/formatMethods";

const CustomerOrderItem = ({
  id,
  orders,
  date,
  time,
  showCustomer,
  customerImage,
  customerName,
  review,
  rating,
  completed,
  onClickIconOpen,
  onClickIconClose,
  event,
  discountAmount,
}: OrderItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { orderLoading } = useSelector(
    (state: any) => ({
      orderLoading: state.orders.loading,
    }),
    shallowEqual
  );

  console.log(customerImage, customerName)

  const [reviewModal, setReviewModal] = useState(false);
  const openReviewModal = () => setReviewModal(true);
  const closeReviewModal = () => setReviewModal(false);

  const [rateModal, setRateModal] = useState(false);
  const openRateModal = () => setRateModal(true);
  const closeRateModal = () => setRateModal(false);

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: ReviewValues,
    validationSchema: ReviewSchema,
    onSubmit: async () => {
      await dispatch(updateCustomerOrders(id, values, closeReviewModal));
    },
  });

  const [starRatings, setStarRatings] = useState<any>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [ratingValue, setRatingValue] = useState(0);

  const handleRatingSelect = (number: number) => {
    let local;

    switch (number) {
      case 0:
        local = [true, false, false, false, false];
        break;
      case 1:
        local = [true, true, false, false, false];
        break;
      case 2:
        local = [true, true, true, false, false];
        break;
      case 3:
        local = [true, true, true, true, false];
        break;
      case 4:
        local = [true, true, true, true, true];
        break;
      default:
        break;
    }
    setStarRatings(local);
    setRatingValue(number + 1);
  };

  return (
    <div className="my-7">
      <div className="hidden lg:block ">
        <div className="flex px-8 pb-4">
          <div className="w-1/3 items-center">
            {orders?.length > 0 &&
              orders?.map((order: any, i: number) => (
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
            {event ? (
              <p className="h-11 mb-5 text-lg font-extrabold font_bold text-black">
                ₦{event}
              </p>
            ) : (
              <>
                {orders?.length > 0 &&
                  orders?.map((order: any, i: number) => (
                    <p
                      key={i}
                      className="h-11 mb-5 text-xl font-extrabold font_bold text-black"
                    >
                      ₦
                      {formatPrice(
                        (order?.discount
                          ? order?.price -
                            (order?.price / 100) * order?.discount
                          : order?.price) * order.quantity
                      )}
                    </p>
                  ))}
              </>
            )}
          </div>
          <div className="w-1/3">
            <p className="text-base font-bold font_regular text-black">
              {date}
            </p>
            <p className="text-sm font_regular sec_gray_color">{time}</p>
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
      <div className="lg:hidden px-8 pb-4">
        <div className="flex">
          <div className="flex-1">
            {orders?.length > 0 &&
              orders?.map((order: any, i: number) => (
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
                    {event ? (
                      <p className="text-sm font-extrabold font_bold text-black mr-5">
                        ₦{event}
                      </p>
                    ) : (
                      <p className="text-lg font-extrabold font_bold text-black mr-5">
                        ₦
                        {formatPrice(
                          (order?.discount
                            ? order?.price -
                              (order?.price / 100) * order?.discount
                            : order?.price) * order.quantity
                        )}
                      </p>
                    )}
                    <p className="text-sm font_regular sec_gray_color">
                      {order?.quantity}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          {/* <div className="">
            {orders?.length > 0 &&
              orders?.map((order: any) => (
               
              ))}
          </div> */}

          <div className="mt-2  items-center">
            <p className="mr-3 text-base font-bold font_regular text-black">
              {date}
            </p>
            <p className="text-base font_regular sec_gray_color">{time}</p>
          </div>

          <div className="self-center cursor-pointer">
            {showCustomer ? (
              <FaChevronUp color="#000" onClick={onClickIconClose} />
            ) : (
              <FaChevronDown color="#000" onClick={onClickIconOpen} />
            )}
          </div>
        </div>
      </div>
      {showCustomer && (
        <>
          <div className="hidden lg:block">
            <div className="flex items-center dashboard_bg px-8 py-4">
              <div className="w-52 flex items-center">
                <img
                  src={customerImage}
                  alt="customer"
                  className="w-11 h-11 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-lg font-bold font_regular text-black">
                    {customerName}
                  </p>
                </div>
              </div>
              <div className="w-64">
                {!completed ? (
                  <OutlineButton
                    title="Chat with your homechef"
                    extraClasses="border-2 px-4 py-2 text-sm"
                    onClick={() => navigate(CUSTOMER_ROUTES.linkCustomerChat)}
                  />
                ) : (
                  <>
                    {review ? (
                      <div className="flex items-center">
                        <p className="text-base font-bold font_regular text-black">
                          Review:
                        </p>
                        <p className="ml-2 text-sm font-bold font_regular text-black">
                          {review}
                        </p>
                      </div>
                    ) : (
                      <OutlineButton
                        title="Write a review"
                        extraClasses="border-2 px-4 py-2 text-sm"
                        onClick={() => openReviewModal()}
                      />
                    )}
                  </>
                )}
              </div>
              {completed && (
                <>
                  {rating ? (
                    <div className="flex justify-center items-center">
                      <p className="text-base font-bold font_regular text-black">
                        Rating:
                      </p>

                      <div className="ml-2 flex items-center">
                        {[...Array(rating)]?.map((star: any, i: number) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#e85666"
                            className="w-5 h-5"
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
                  ) : (
                    <OutlineButton
                      title="Rate your homechef"
                      extraClasses="border-2 ter_gray_border_color input_text px-4 py-2 text-sm"
                      onClick={() => openRateModal()}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          <div className="lg:hidden">
            <div className="dashboard_bg px-8 py-4">
              <div className="flex items-center">
                <img
                  src={customerImage}
                  alt="customer"
                  className="w-11 h-11 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-lg font-bold font_regular text-black">
                    {customerName}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                {!completed ? (
                  <OutlineButton
                    title="Chat with your homechef"
                    extraClasses="border-2 px-4 py-2 text-sm"
                    onClick={() => navigate(CUSTOMER_ROUTES.linkCustomerChat)}
                  />
                ) : (
                  <>
                    {review ? (
                      <div className="flex items-center">
                        <p className="text-base font-bold font_regular text-black">
                          Review:
                        </p>
                        <p className="ml-2 text-sm font-bold font_regular text-black">
                          {review}
                        </p>
                      </div>
                    ) : (
                      <OutlineButton
                        title="Write a review"
                        extraClasses="border-2 px-4 py-2 text-sm"
                        onClick={() => openReviewModal()}
                      />
                    )}
                  </>
                )}
              </div>
              {completed && (
                <div className="mt-2">
                  {rating ? (
                    <div className="flex items-center">
                      <p className="text-base font-bold font_regular text-black">
                        Rating:
                      </p>

                      <div className="ml-2 flex items-center">
                        {[...Array(rating)]?.map((star: any, i: number) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#e85666"
                            className="w-5 h-5"
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
                  ) : (
                    <OutlineButton
                      title="Rate your homechef"
                      extraClasses="border-2 ter_gray_border_color input_text px-4 py-2 text-sm"
                      onClick={() => openRateModal()}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <Modal
        open={reviewModal}
        onClose={closeReviewModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-2/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            <p className="flex-1 text-xl text-center font_bold black2">
              Write a review
            </p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeReviewModal}
            />
          </div>
          <div className="my-10">
            <TextArea
              placeholder=""
              name={"review"}
              onChange={handleChange}
              extraClasses="h-32"
              error={errors.review}
            />

            <div>
              <Button
                title="Save"
                extraClasses="w-full p-3 rounded-full"
                loading={orderLoading}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={rateModal}
        onClose={closeRateModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-1/3 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            <p className="flex-1 text-xl text-center font_bold black2">
              Rate your homechef
            </p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeRateModal}
            />
          </div>
          <div className="my-5">
            <div className="flex justify-center items-center">
              {starRatings?.map((star: any, i: any) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={star ? "#e85666" : "#D6D6D6"}
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => handleRatingSelect(i)}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <div className="mt-5">
              <Button
                title="Save"
                extraClasses="w-full p-3 rounded-full"
                loading={orderLoading}
                onClick={async () => {
                  const data = { rating: ratingValue };
                  await dispatch(
                    updateCustomerOrders(id, data, closeRateModal)
                  );
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerOrderItem;
