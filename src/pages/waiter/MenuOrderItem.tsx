import { IoIosArrowDropdown, IoMdClose } from "react-icons/io";
import { dateFormatter, formatPrice } from "../../utils/formatMethods";
import Button from "../../components/Button";
import { Modal } from "@mui/material";
import { useState } from "react";
import { RESTAURANT_ORDER_URL } from "../../_redux/urls";
import { SERVER } from "../../config/axios";
import moment from "moment";

const MenuOrderItem = ({
  orderStatus,
  secondOrderStatus,
  thirdOrderStatus,
  order,
  orderLength,
  selectedOrder,
  ordersModal,
  openOrdersModal,
  closeOrdersModal,
  getTableOrders,
  selectedCategory
}: any) => {
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const completeOrder = async (selectedOrder: any) => {
    setLoading(true);
    SERVER.patch(`${RESTAURANT_ORDER_URL}/complete/${selectedOrder?.id}`)
      .then(({ data }) => {
        closeOrdersModal();
        getTableOrders();
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  const markAsPaid = async (selectedOrder: any) => {
    setPaymentLoading(true);
    SERVER.patch(`${RESTAURANT_ORDER_URL}/paid/${selectedOrder?.id}`)
      .then(({ data }) => {
        closeOrdersModal();
        getTableOrders();
      })
      .catch((err) => {})
      .finally(() => setPaymentLoading(false));
  };

  const PaymentStatus = ({ order }: any) => (
    <div
      className={`${
        order?.paid
          ? "w-20 px-2 py-2 rounded-xl bg_credit_color"
          : "w-40 px-2 py-2 rounded-xl border-2 border_credit_color cursor-pointer"
      }`}
    >
      <p
        className={`${
          order?.paid
            ? "text-base font_bold text-white text-center"
            : "text-base font_bold credit_color text-center"
        }`}
      >
        {order?.paid ? "Paid" : "Pending payment"}
      </p>
    </div>
  );

  // console.log('menu order=', selectedCategory, order)

  return (
    <>
      <div
        className="w-full lg:w-3/5 flex flex-col items-center justify-around gap-y-3 grow-0 shrink-0 mx-auto mb-5 cursor-pointer lg:shadow-lg bg-white p-3 lg:p-5 rounded-xl hover:bg-gray-100"
        // onClick={openOrdersModal}
      >
        <div className="w-full flex flex-row items-center justify-between">
          <div>
            <p className="font-semibold font_medium">
              {order.name} #{order?.id?.substring(order?.id?.length - 5)}
            </p>
            <p className="flex-1 text-sm text-start font_regular black2 font-semibold">
              {order?.email}
            </p>
            <p className="text-sm text-start font_regular black2 font-semibold">
              {dateFormatter.format(new Date(order?.updatedAt))}
            </p>
          </div>
          {/* <IoIosArrowDropdown size={22} color={"#000000"} /> */}
        </div>

        <div className="flex flex-col justify-start items-center w-full mt-3">
          {order?.order &&
            order?.order
              ?.filter(
                (o: any) =>
                  o?.status === orderStatus || o?.status === secondOrderStatus
              )
              ?.map((menuOrder: any, num: number) => (
                <div
                  className="flex flex-row justify-between items-start w-full mb-2"
                  key={num}
                >
                  <div className="">
                    <img
                      src={menuOrder?.menu?.images[0]}
                      alt="menu"
                      className="w-40 h-20 rounded-xl object-center object-cover mr-auto"
                    />
                  </div>
                  <div className="ml-2 w-full text-start">
                    <p className="text-md input_text capitalize font_medium">
                      {menuOrder?.menu?.foodName}
                    </p>
                    <p className="text-md input_text capitalize font_medium">
                      {menuOrder?.quantity} portion
                      {menuOrder?.quantity > 1 && "s"}
                    </p>
                  </div>
                  <div className="flex shrink-0">
                    <p className="text-1xl pt-1 font-bold">
                      ₦
                      {menuOrder?.menu?.discount
                        ? menuOrder?.amount -
                          (menuOrder?.amount / 100) * menuOrder?.menu.discount
                        : menuOrder?.amount}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        <hr className="w-4/5 h-1 mx-auto" />

        <div className="w-full flex flex-row items-center justify-between">
          <p className="whitespace-nowrap font-semibold font_medium text-gray-500">
            {orderLength} items
          </p>

          <div className="w-full flex flex-row items-center justify-end gap-x-3">
            <PaymentStatus order={order} />
            <p className="primary_txt_color font-semibold font_medium text-lg">
              N{formatPrice(order?.totalAmount)}
            </p>
          </div>
        </div>

        {order?.order?.filter(
          (o: any) =>
            o?.status === secondOrderStatus || o?.status === thirdOrderStatus
        )?.length === order?.order?.length && (
          <div className="my-2 w-full">
            <Button
              title="Mark as complete"
              extraClasses="w-full p-3 rounded-full"
              loading={loading}
              onClick={() => completeOrder(order)}
            />
          </div>
        )}
      </div>
      {/* ORDER PLACED */}
      {/* <Modal
        open={ordersModal}
        onClose={closeOrdersModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-4/5 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none">
          <div className="flex flex-col justify-between items-center p-0 h-full">
            <div
              className="h-fit my-3 w-100 w-full flex flex-col gap-y-5"
              style={{ minHeight: "80%" }}
            >
              <div className="flex flex-row items-start justify-between w-full py-1">
                <div className="flex flex-col items-start justify-center">
                  <p className="flex-1 text-xl text-start font_bold text-gray-500">
                    {selectedOrder?.name} #
                    {selectedOrder?.id?.substring(
                      selectedOrder?.id?.length - 5
                    )}
                  </p>
                  <p className="flex-1 text-sm text-start font_regular black2 font-semibold">
                    {selectedOrder?.email}
                  </p>
                  <p className="text-sm text-start font_regular black2 font-semibold">
                    {moment(
                      selectedOrder?.updatedAt || selectedOrder?.createdAt
                    ).format("DD MMM, YYYY hh:mm a")}
                  </p>
                </div>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeOrdersModal}
                />
              </div>

              <div
                className="flex flex-col justify-start items-center h-full w-full mb-5"
                style={{ minHeight: "80%" }}
              >
                <div className="flex flex-row items-center self-start gap-x-2 w-full text-lg lg:text-2xl">
                  <p className="font_bold">
                    N{formatPrice(selectedOrder?.totalAmount)}
                  </p>
                  <p className="font_medium">/ {orderLength} items</p>
                  <PaymentStatus order={selectedOrder} />
                </div>

                <div className="flex flex-col justify-start items-center w-full mt-3 h-auto overflow-scroll">
                  {selectedOrder?.order &&
                    selectedOrder?.order
                      ?.filter(
                        (o: any) =>
                          o?.status === orderStatus ||
                          o?.status === secondOrderStatus
                      )
                      ?.map((menuOrder: any, num: number) => (
                        <div
                          className="flex flex-row justify-between items-start w-full mb-2"
                          key={num}
                        >
                          <div className="">
                            <img
                              src={menuOrder?.menu?.images[0]}
                              alt="menu"
                              className="w-40 h-20 rounded-xl object-center object-cover mr-auto"
                            />
                          </div>
                          <div className="ml-2 w-full text-start">
                            <p className="text-md input_text capitalize font_medium">
                              {menuOrder?.menu?.foodName}
                            </p>
                            <p className="text-md input_text capitalize font_medium">
                              {menuOrder?.quantity} portion
                              {menuOrder?.quantity > 1 && "s"}
                            </p>
                          </div>
                          <div className="flex shrink-0">
                            <p className="text-1xl pt-1 font-bold">
                              ₦
                              {menuOrder?.menu?.discount
                                ? menuOrder?.amount -
                                  (menuOrder?.amount / 100) *
                                    menuOrder?.menu.discount
                                : menuOrder?.amount}
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
            {!selectedOrder?.paid && (
              <div className="mt-2 w-full">
                <Button
                  title="Paid"
                  extraClasses="w-full p-3 rounded-full"
                  loading={paymentLoading}
                  onClick={() => markAsPaid(order)}
                />
              </div>
            )}

            {selectedOrder?.order?.filter(
              (o: any) => o?.status === secondOrderStatus
            )?.length === selectedOrder?.order?.length && (
              <div className="my-2 w-full">
                <Button
                  title="Mark as complete"
                  extraClasses="w-full p-3 rounded-full"
                  loading={loading}
                  onClick={() => completeOrder(selectedOrder)}
                />
              </div>
            )}
          </div>
        </div>
      </Modal> */}
    </>
  );
};

export default MenuOrderItem;
