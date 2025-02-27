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

const suppliers = [
  {
    id: "2625533",
    name: "coca cola plc",
    type: "Beverages",
    email: "coca@example.com",
    phone: "08136445274",
  },
];

const purchaseOrders = [
  {
    supplier: "Coca Cola",
    items: "Eva Table water (40 Pieces) , Cocacola 50...",
    totalItems: "5 items",
    totalOrder: "10000",
    status: "Delivered",
  },
];

const purchaseOrdersSubOptions = [
  "All",
  "Pending",
  "Response",
  "Approved",
  "Delivered",
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
  const [activeSupplyTab, setActiveSupplyTab] = useState("Supplier");

  const [purchaseOrdersSubTab, setPurchaseOrdersSubTab] = useState("All");

  const [purchaseOrdersModal, setPurchaseOrdersModal] = useState(false);
  const openPurchaseOrdersModal = () => setPurchaseOrdersModal(true);
  const closePurchaseOrdersModal = () => setPurchaseOrdersModal(false);

  const [supplierModal, setSupplierModal] = useState(false);
  const openSupplierModal = () => setSupplierModal(true);
  const closeSupplierModal = () => setSupplierModal(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    setValues,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      category: "",
      account: "",
    },
    onSubmit: (values) => {
      console.log("values= ", values);
    },
  });

  return (
    <>
      <ChefDashboardLayout>
        <div className="w-full px-6 py-4">
          <PageTitle title="Inventory" />

          <div className="my-10 flex space-x-4">
            {INVENTORY_MENU?.map((order: string) => (
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
          </div>

          <div className="bg-white rounded-3xl p-10 ">
            {selectedOrder === INVENTORY_MENU[0] && (
              <div className="p-6 bg-gray-50 min-h-screen">
                {/* Tabs */}
                <div className="flex space-x-3">
                  <button
                    className={`px-5 py-2 rounded-full font-medium ${
                      activeSupplyTab === "Supplier"
                        ? "bg-primary text-white"
                        : "bg-[#EDECEC] text-black"
                    }`}
                    onClick={() => setActiveSupplyTab("Supplier")}
                  >
                    Supplier
                  </button>
                  <button
                    className={`px-5 py-2 rounded-full font-medium ${
                      activeSupplyTab === "Purchase Order"
                        ? "bg-primary text-white"
                        : "bg-[#EDECEC] text-black"
                    }`}
                    onClick={() => setActiveSupplyTab("Purchase Order")}
                  >
                    Purchase order
                  </button>
                </div>

                {/* Search & Actions */}
                <div className="flex justify-between items-center mt-6">
                  {/* Search Bar */}
                  <div className="w-full flex gap-2">
                    <div className="relative w-[300px]">
                      <AiOutlineSearch className="absolute left-4 top-3 text-gray-400 text-lg" />
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-12 pr-4 py-2 rounded-full bg-[#EDECEC] text-black focus:outline-none"
                      />
                    </div>
                    {activeSupplyTab === "Purchase Order" && (
                      <div className="flex space-x-3">
                        {purchaseOrdersSubOptions?.map((option) => (
                          <button
                            className={`px-5 py-2 rounded-full font-medium ${
                              purchaseOrdersSubTab === option
                                ? "bg-primary text-white"
                                : "bg-[#EDECEC] text-black"
                            }`}
                            onClick={() => setPurchaseOrdersSubTab("Supplier")}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {activeSupplyTab === "Supplier" && (
                    <div className="flex space-x-3">
                      <button className="border border-black text-black px-5 py-2 rounded-lg flex items-center space-x-2">
                        <span>Add item</span> <AiOutlineDown />
                      </button>
                      <button
                        className="bg-black text-white px-5 py-2 rounded-lg flex items-center space-x-2"
                        onClick={openSupplierModal}
                      >
                        <span>Add a supplier</span> <AiOutlineDown />
                      </button>
                    </div>
                  )}

                  {activeSupplyTab === "Purchase Order" && (
                    <div className="flex space-x-3">
                      <button
                        className="bg-black text-white px-6 py-2 rounded-lg flex items-center space-x-2"
                        onClick={openSupplierModal}
                      >
                        <span>Create an order</span> <AiOutlineDown />
                      </button>
                    </div>
                  )}
                </div>

                {/* Supplier Table */}
                {activeSupplyTab === "Supplier" && (
                  <div className="mt-6 bg-white rounded-xl shadow-md">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-6 text-[#7F7F7F] font_medium">
                            Supplier ID
                          </th>
                          <th className="py-3 px-6 text-[#7F7F7F] font_medium">
                            Name/type
                          </th>
                          <th className="py-3 px-6 text-[#7F7F7F] font_medium">
                            Email
                          </th>
                          <th className="py-3 px-6 text-[#7F7F7F] font_medium">
                            Phone number
                          </th>
                          <th className="py-3 px-6 text-[#7F7F7F] font_medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {suppliers.map((supplier) => (
                          <tr key={supplier.id} className="border-b">
                            <td className="py-4 px-6 text-black font_medium">
                              {supplier.id}
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-black font_medium block">
                                {supplier.name}
                              </span>
                              <span className="text-[#7F7F7F] text-sm">
                                {supplier.type}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-semibold text-[#7F7F7F]">
                              {supplier.email}
                            </td>
                            <td className="py-4 px-6 text-[#7F7F7F]">
                              {supplier.phone}
                            </td>
                            <td className="py-4 px-6 text-[#7F7F7F] text-xl">
                              <FaEllipsisH />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Purchase Order Table */}
                {activeSupplyTab === "Purchase Order" && (
                  <div className="mt-6 bg-white rounded-xl shadow-md">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-6 text-[#7F7F7F] font_medium">
                            Supplier
                          </th>
                          <th className="py-3 px-6 text-[#7F7F7F] font_medium">
                            Items
                          </th>
                          <th className="py-3 px-6 text-[#7F7F7F] font_medium">
                            Total Items
                          </th>
                          <th className="py-3 px-6 text-[#7F7F7F] font_medium">
                            Total Order
                          </th>
                          <th className="py-3 px-6 text-[#7F7F7F] font_medium">
                            Status
                          </th>
                          <th className="py-3 px-6 text-[#7F7F7F] font_medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseOrders.map((order) => (
                          <tr key={order.supplier} className="border-b">
                            <td className="py-4 px-6 text-black font_medium">
                              {order.supplier}
                            </td>
                            <td className="py-4 px-6 text-black font_medium">
                              {order.items}
                            </td>
                            <td className="py-4 px-6 font-semibold text-[#7F7F7F]">
                              {order.totalItems}
                            </td>
                            <td className="py-4 px-6 text-[#7F7F7F]">
                              {order.totalOrder}
                            </td>
                            <td className="py-4 px-6 text-[#7F7F7F]">
                              {order.status}
                            </td>
                            <td className="py-4 px-6 text-[#7F7F7F] text-xl">
                              <FaEllipsisH />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SUPPLIER MODAL */}
        <Modal
          open={supplierModal}
          onClose={closeSupplierModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
            <div className="flex">
              <p className="flex-1 text-xl text-center font_bold black2">
                Add a Supplier
              </p>
              <IoMdClose
                size={24}
                color="#8E8E8E"
                className="cursor-pointer"
                onClick={closeSupplierModal}
              />
            </div>

            <div>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                value={values.name}
                error={errors.name && touched.name && errors.name}
              />

              <Input
                type="text"
                placeholder={`Phone Number`}
                name="phoneNumber"
                onChange={handleChange}
                value={values.phoneNumber}
                error={
                  errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber
                }
              />

              <Input
                type="dropdown"
                placeholder="Category"
                name="category"
                onChange={handleChange}
                value={values.category}
                options={[]}
                error={errors.category && touched.category && errors.category}
              />

              <Input
                type="text"
                placeholder="Account Details"
                name="account"
                // extraClasses={'!mt-10 !lg:mt-0'}
                onChange={handleChange}
                value={values.account}
                error={errors.account && touched.account && errors.account}
              />

              {/* {error  && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {error}
                  </p>
                )} */}

              <div className="mt-10">
                <Button
                  loading={isLoading}
                  title="Add Supplier"
                  extraClasses="w-full p-3 rounded-full px-8 py-2"
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
      </ChefDashboardLayout>
    </>
  );
};

export default ChefInventory;
