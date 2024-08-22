import { TabMenuProps } from "../utils/Interfaces";

const TabMenu = ({
  ordersMenu,
  selectedOrder,
  setSelectedOrder,
  containerExtraClasses,
  textExtraClasses,
}: TabMenuProps) => {
  return (
    <div
      className={`flex bg_sec_gray_color rounded-full cursor-pointer justify-between ${containerExtraClasses}`}
    >
      {ordersMenu?.map((order: string) => (
        <p
          key={order}
          className={`text-center font_regular py-4 ${textExtraClasses} ${
            order === selectedOrder
              ? "text-white primary_bg_color rounded-full w-1/2 px-2"
              : "text-black"
          } `}
          onClick={() => setSelectedOrder(order)}
        >
          {order}
        </p>
      ))}
    </div>
  );
};

export default TabMenu;
