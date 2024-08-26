import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { CiUser } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { OrderItemProps } from "../utils/Interfaces";
import OutlineButton from "./OutlineButton";
import { CHEF_ROUTES } from "../routes/routes";
import { completeOrder } from "../_redux/order/orderAction";
import ColoredSpinner from "./ColoredSpinner";
import { useAppDispatch } from "../redux/hooks";
import { COMMON_DATE_FORMAT, formatPrice } from "../utils/formatMethods";
import Button from "./Button";
import moment from "moment";
import {
  completeCustomerSubscription,
  updateCustomerSubscription,
} from "../_redux/subscription/subscriptionAction";
import Spinner from "./Spinner";

const SubscriptionOrderItem = ({
  id,
  theOrder,
  orders,
  date,
  time,
  showCustomer,
  customerImage,
  customerName,
  address,
  meals,
  totalAmount,
  note,
  weeks,
  startDate,
  filteredMenuDetails,
  completed,
  onClickIconOpen,
  onClickIconClose,
  review,
  rating,
  event,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showOrderModal, setShowOrderModal] = useState(false);

  const openOrderModal = () => setShowOrderModal(true);
  const closeOrderModal = () => setShowOrderModal(false);

  const [selectedWeek, setSelectedWeek] = useState<any>();
  const [completeLoading, setCompleteLoading] = useState(false);

  const completeAWeekSubscription = (week: any, status: boolean) => {
    setCompleteLoading(true);
    const modifiedWeeks = weeks.map((w: any) => {
      if (w.name === week.name) {
        return { ...w, status: "delivered" };
      } else {
        return w;
      }
    });

    dispatch(
      completeCustomerSubscription(
        theOrder?._id,
        {
          weeks: modifiedWeeks,
        },
        setCompleteLoading,
        setSelectedWeek
      )
    );

    return modifiedWeeks;
  };

  return (
    <>
      <div className="hidden lg:block">
        <div className="flex px-8 py-4">
          <div className="w-[268px] flex">
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
              <p className="text-xs font_regular sec_gray_color">
                {address?.substring(0, 28)}...
              </p>
            </div>
          </div>
          <div className="w-[226px]">
            <div className="flex">
              <div className="w-1/2">
                <p className="text-lg font-bold font_regular text-black">
                  {meals} meal{meals > 1 ? "s" : ""}
                </p>
                <p className="text-sm font_regular sec_gray_color">Weekly</p>
              </div>
            </div>
          </div>

          <div className="w-[420px] flex items-center justify-between  ml-2">
            <p className="h-11 text-xl font_bold text-black">
              ₦{formatPrice(totalAmount)}
            </p>

            <OutlineButton
              title="View details"
              extraClasses="h-[31px] w-[104px] rounded-3xl -mt-4"
              onClick={openOrderModal}
            />
          </div>
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
                <p className="text-xs font_regular sec_gray_color">
                  {address?.substring(0, 28)}...
                </p>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center justify-between  ml-2">
                <OutlineButton
                  title="View details"
                  extraClasses="text-sm h-[32px] w-[98px] rounded-3xl -mt-4"
                  onClick={openOrderModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={showOrderModal}
        onClose={closeOrderModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-4/6 h-5/6 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl outline-none">
          <div className="flex p-7">
            <div className="flex-1 flex">
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
                <p className="text-xs font_regular sec_gray_color">{address}</p>
                <div className="flex mt-3">
                  <p className="mr-4 h-11 text-lg font_bold text-black">
                    ₦{formatPrice(totalAmount)}
                  </p>

                  {/* <Button
                    title="Chat"
                    extraClasses="rounded-lg px-2 py-2 text-xs h-6"
                    onClick={() => navigate(CHEF_ROUTES.linkChefChat)}
                  /> */}
                </div>
              </div>
            </div>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeOrderModal}
            />
          </div>
          <div className="p-7" style={{ backgroundColor: "#F9F9F9" }}>
            <div className="flex justify-between items-center">
              <p className="w-20 text-md font_bold text-black">Note:</p>
              <p className="flex-1 text-sm font_medium sec_gray_color">
                {note}
              </p>
              <p />
            </div>
            <div className="my-4 border_line" />
            <div className="flex justify-between items-center">
              <p className="w-20 text-md font_bold text-black">Date:</p>
              <p className="flex-1 text-sm font_medium sec_gray_color">
                {moment(startDate)
                  .add(1, "weeks")
                  .day(weeks[0]?.day)
                  .format(COMMON_DATE_FORMAT)}{" "}
                -{" "}
                {moment(startDate)
                  .add(4, "weeks")
                  .day(weeks[3]?.day)
                  .format(COMMON_DATE_FORMAT)}
              </p>
              <p />
            </div>
            <div className="my-4 border_line" />
            {weeks?.length > 0 &&
              weeks
                // ?.filter((w: any) => filteredMenuIds.includes(w.menu))
                ?.map((week: any, i: number) => {
                  const isChefWeek =
                    filteredMenuDetails?.length > 0 &&
                    filteredMenuDetails?.filter((m: any) =>
                      week.menu.includes(m._id)
                    );

                  return (
                    <div key={i}>
                      <div className="flex justify-between items-center">
                        <p className="w-20 text-md font_bold text-black">
                          {week?.name}:
                        </p>
                        <div className="flex-1 ">
                          <p className="text-md font_bold text-black">
                            {week?.day} -{" "}
                            {moment(startDate)
                              .add(i + 1, "weeks")
                              .day(week?.day)
                              .format(COMMON_DATE_FORMAT)}
                          </p>
                          {isChefWeek?.length > 0 ? (
                            filteredMenuDetails
                              ?.filter((m: any) => week.menu.includes(m._id))
                              ?.map((menu: any, i: number) => (
                                <p
                                  key={i}
                                  className="flex-1 text-sm font_medium sec_gray_color"
                                >
                                  {menu?.foodName}
                                </p>
                              ))
                          ) : (
                            <p
                              key={i}
                              className="flex-1 text-sm font_medium sec_gray_color"
                            >
                              -
                            </p>
                          )}
                        </div>
                        {isChefWeek?.length > 0 ? (
                          <>
                            {completeLoading &&
                            selectedWeek.name === week.name ? (
                              <ColoredSpinner />
                            ) : (
                              <div>
                                <label className="custom_checkbox">
                                  <input
                                    type="checkbox"
                                    checked={week?.status === "delivered"}
                                    className="custom_checkbox"
                                    onChange={(e) => {
                                      if (week?.status === "delivered") {
                                        return;
                                      }

                                      if (
                                        moment(startDate)
                                          .add(i + 1, "weeks")
                                          .day(week?.day)
                                          .toISOString() >
                                        moment().toISOString()
                                      ) {
                                        alert(
                                          "You can't complete a week in the future."
                                        );
                                        return;
                                      }

                                      if (e.target.checked) {
                                        setSelectedWeek(week);
                                        completeAWeekSubscription(
                                          week,
                                          e.target.checked
                                        );
                                      } else {
                                        console.log("unchecked");
                                      }
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            )}
                          </>
                        ) : null}
                      </div>
                      <div className="my-4 border_line" />
                    </div>
                  );
                })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SubscriptionOrderItem;
