import { IoIosArrowDropdown, IoMdClose } from "react-icons/io";
import { dateFormatter, formatPrice } from "../../utils/formatMethods";
import Button from "../../components/Button";
import { Modal } from "@mui/material";
import { useState } from "react";
import { RESTAURANT_ORDER_URL } from "../../_redux/urls";
import { SERVER } from "../../config/axios";
import moment from "moment";
import DownloadPDFButton from "../../components/Receipt";
import { FaReceipt } from "react-icons/fa6";

const OrderItem = ({
  order,
  selectedOrder,
  ordersModal,
  openOrdersModal,
  closeOrdersModal,
  getTableOrders,
  selectedCategory,
  waiter,
  chef
}: any) => {
  const [sendToKitchenLoading, setSendToKitchen] = useState(false);

  const sendToKitchen = async (selectedOrder: any) => {
    setSendToKitchen(true);
    SERVER.patch(`${RESTAURANT_ORDER_URL}/${selectedOrder?.id}`, {
      status: "kitchen",
    })
      .then(({ data }) => {
        closeOrdersModal();
        getTableOrders();
      })
      .catch((err) => {})
      .finally(() => setSendToKitchen(false));
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

  return (
    <>
      <div
        className="w-full lg:w-3/5 flex flex-col items-center justify-around gap-y-3 grow-0 shrink-0 mb-5 lg:shadow-lg bg-white p-3 lg:p-5 rounded-xl hover:bg-gray-100"
        // onClick={openOrdersModal}
      >
        <div className="flex flex-row justify-end items-center w-full mt-3">
          <DownloadPDFButton 
            chef={chef} 
            waiter={waiter}
            receiptValues={{
              customerName: order?.name,
              totalAmount: order?.totalAmount,
              cartMenu: order?.order ? order?.order : [],
              paidBy: order?.posPayment ? 'POS' : 'Online',
            }} 
            orderId={order?.id}
            date={order?.updatedAt ? order?.updatedAt : ''}
            waiterScreen={true}
          >
            <p className="flex flex-row items-center justify-center gap-x-2 rounded-full text-sm font-semibold text-center px-5 py-1 bg-green-100 cursor-pointer">View bill <FaReceipt /></p>
          </DownloadPDFButton>
        </div>

        <div className="w-full flex flex-row items-center justify-between">
          <div>
            <p className="font-semibold font_medium">
              {order?.name} #{order?.id?.substring(order?.id?.length - 5)}
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
            order?.order?.length > 0 &&
            order?.order
              ?.filter((o: any) => o?.status === selectedCategory)
              .map((menuOrder: any, num: number) => (
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
                      {Number(menuOrder?.quantity) > 1 && "s"}
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

        <div className="w-full flex flex-row items-center justify-between">
          {/* <p className="whitespace-nowrap font-semibold font_medium text-gray-500">
            {order?.order?.length} items
          </p> */}

          <div className="w-full flex flex-row items-center justify-end gap-x-3">
            <PaymentStatus order={order} />
            <p className="primary_txt_color font-semibold font_medium text-lg">
              N{formatPrice(order?.totalAmount)}
            </p>
          </div>
        </div>
        <hr className="w-4/5 h-1 mx-auto" />

        {order?.notes && (
          <>
            <div className='w-full font_medium text-sm px-2'>
                <p className="text-[#585858] text-lg font-medium font_medium">Note:</p>
                <p className='font_medium text-base'>{order?.notes}</p>
            </div>
            <hr className="w-4/5 h-1 mx-auto" />
          </>
        )}

        {order?.status === "pending" && (
          <div className="mt-2 w-full">
            <Button
              title="Send to kitchen"
              extraClasses="w-full p-3 rounded-full"
              loading={sendToKitchenLoading}
              onClick={() => sendToKitchen(order)}
            />
          </div>
        )}
      </div>
      
    </>
  );
};

export default OrderItem;
