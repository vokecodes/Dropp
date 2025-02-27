import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEllipsisH } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Button from "./Button";
import Input from "./Input";
import { IoMdClose } from "react-icons/io";
import Table from "./Table";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";

const supplierColumns = ["Supplier ID", "Name/type", "Email", "Phone number"];
const suppliers = [
  {
    id: "2625533",
    name: { name: "Coca Cola PLC", type: "Beverages" },
    email: "coca@example.com",
    phone: "08136445274",
  },
];

const purchaseOrderColumns = [
  "Supplier",
  "Items",
  "Total Items",
  "Total Order",
  "Status",
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

const InventorySupply = () => {
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
    <div className="">
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

      {activeSupplyTab === "Supplier" && (
        <Table columns={supplierColumns} data={suppliers} />
      )}
      {activeSupplyTab === "Purchase Order" && (
        <Table columns={purchaseOrderColumns} data={purchaseOrders} />
      )}

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
                errors.phoneNumber && touched.phoneNumber && errors.phoneNumber
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
    </div>
  );
};

export default InventorySupply;
