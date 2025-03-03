import { TabMenuProps } from "../utils/Interfaces";

const MiniTabMenu = ({
  ordersMenu,
  selectedOrder,
  setSelectedOrder,
}: TabMenuProps) => {
  return (
    <>
      {ordersMenu?.map((order: string) => (
        <button
          key={order}
          className={`px-6 py-2 rounded-full text-center font-medium transition-all ${
            order === selectedOrder
              ? "bg-primary text-white"
              : "bg-[#EDECEC] text-black"
          }`}
          onClick={() => setSelectedOrder(order)}
        >
          {order}
        </button>
      ))}
    </>
  );
};

export default MiniTabMenu;
