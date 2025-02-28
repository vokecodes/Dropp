import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import PageTitle from "../../components/PageTitle";
import { AiOutlinePlus, AiOutlineSearch, AiOutlineDown } from "react-icons/ai";
import { BsFillTruckFrontFill } from "react-icons/bs";
import { FaEllipsisH } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Input from "../../components/CustomInput";
import { useFormik } from "formik";
import OutlineButton from "../../components/OutlineButton";
import Button from "../../components/Button";
import Table from "../../components/Table";
import InventorySupply from "../../components/InventorySupply";
import InventoryRecipe from "../../components/InventoryRecipe";
import InventoryMenu from "../../components/InventoryMenu";
import InventoryStocktake from "../../components/InventoryStocktake";
import InventoryInventory from "../../components/InventoryInventory";
import MiniTabMenu from "../../components/MiniTabMenu";

const INVENTORY_MENU = [
  "Supply",
  "Inventory",
  "Stocktake",
  "Recipe",
  "Menu Profitability",
];

const VendorOptions = [
  {
    title: "Quick import",
    description:
      "Import from existing platforms like Xero, QuickBooks, Excel, or Google Sheets.",
    icon: "/images/import.png",
    buttonLabel: "Import",
  },
  {
    title: "Add a new Supplier",
    description: "Get started by adding the vendor manually.",
    icon: <AiOutlinePlus className="text-white text-2xl" />,
    buttonLabel: "Create",
  },
  {
    title: "Import from invoice",
    description: "Adding a new supplier from your invoice.",
    icon: <AiOutlinePlus className="text-white text-2xl" />,
    buttonLabel: "Upload",
  },
];

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center">
    {/* Header Icon */}
    <BsFillTruckFrontFill className="text-primary text-5xl mb-4" />

    {/* Title */}
    <h2 className="text-2xl font-bold mb-6">Add a new Vendor</h2>

    {/* Options List */}
    <div className="w-full max-w-lg space-y-4">
      {VendorOptions.map((option, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md"
        >
          {/* Icon + Text */}
          <div className="flex items-center space-x-4">
            {/* Icon Handling */}
            {typeof option.icon === "string" ? (
              <img src={option.icon} alt="icon" className="w-16 h-16" />
            ) : (
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                {option.icon}
              </div>
            )}

            {/* Text */}
            <div>
              <h3 className="font_medium">{option.title}</h3>
              <p className="text-sm text-[#7F7F7F]">{option.description}</p>
            </div>
          </div>

          {/* Action Button */}
          <button className="bg-black text-white px-6 py-2 rounded-full text-sm whitespace-nowrap flex items-center justify-center">
            {option.buttonLabel}
          </button>
        </div>
      ))}
    </div>
  </div>
);

const ChefInventory = () => {
  const [selectedOrder, setSelectedOrder] = useState(INVENTORY_MENU[0]);

  return (
    <>
      <ChefDashboardLayout>
        <div className="w-full px-6 py-4">
          <PageTitle title="Inventory" />

          <div className="my-10 flex space-x-4">
            <MiniTabMenu
              ordersMenu={INVENTORY_MENU}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
            />
          </div>

          <div className="bg-white rounded-3xl p-10 ">
            {selectedOrder === INVENTORY_MENU[0] && <InventorySupply />}
            {selectedOrder === INVENTORY_MENU[1] && <InventoryInventory />}
            {selectedOrder === INVENTORY_MENU[2] && <InventoryStocktake />}
            {selectedOrder === INVENTORY_MENU[3] && <InventoryRecipe />}
            {selectedOrder === INVENTORY_MENU[4] && <InventoryMenu />}
          </div>
        </div>
      </ChefDashboardLayout>
    </>
  );
};

export default ChefInventory;
