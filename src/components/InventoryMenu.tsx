import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEllipsisH } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Button from "./Button";
import Input from "./Input";
import { IoMdClose } from "react-icons/io";
import Table from "./Table";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";

const recipeColumns = [
  "#",
  "Menu Item Name",
  "QTY SOLD",
  "TOTAL SALES",
  "MENU ITEM COST",
  "RECIPE COST",
  "RECIPE COST %",
  "PROFIT",
  "PROFIT MARGIN",
];
const recipes = [
  {
    name: "#7558339",
    category: "Jollof Rice",
    quantity: "1",
    totalSales: "₦100000",
    cost: "₦100000",
    recipeCost: "₦100000",
    recipeCostPercent: "10%",
    profit: "₦100000",
    profitMargin: "10%",
  },
];

const InventoryMenu = () => {
  const [recipeModal, setRecipeModal] = useState(false);
  const openRecipeModal = () => setRecipeModal(true);
  const closeRecipeModal = () => setRecipeModal(false);
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
      {/* Search & Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <div className="">
            <label className="text-sm font_medium text-black">From Date</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="h-10 bg-[#F8F8F8] block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
              placeholder="Start Date:"
              //   onChange={(e: any) => setStartDate(e.target.value)}
              //   max={endDate ? endDate : undefined}
            />
          </div>

          <div className="">
            <label className="text-sm font_medium text-black">To Date</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="h-10 bg-[#F8F8F8] block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
              placeholder="End Date:"
              //   max={todaysDate}
              //   min={startDate ? startDate : undefined}
              //   onChange={(e: any) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="py-2 px-4 w-36 h-10 flex items-center justify-center gap-3 rounded-lg cursor-pointer text-black bg-[#EDECEC]">
            <p className="font_medium">Download</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="#6D6D6D"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-4/5 my-10 flex flex-col lg:flex-row flex-wrap items-center gap-3">
        <div className="w-full lg:w-1/5"></div>
      </div>

      <Table columns={recipeColumns} data={recipes} />
    </div>
  );
};

export default InventoryMenu;
