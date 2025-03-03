import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEllipsisH } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Button from "./Button";
import Input from "./CustomInput";
import { IoMdClose } from "react-icons/io";
import Table from "./Table";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { ClickAwayListener } from "@mui/material";
import {
  dateFormatter,
  generateUUIDBasedOnStringLength,
  toTitleCase,
} from "../utils/formatMethods";
import { DashboardItemSkeletonLoader } from "./DashboardItemSkeletonLoader";
import moment from "moment";
import { Link } from "react-router-dom";
import { CHEF_ROUTES } from "../routes/routes";

const DEPARTMENT_OPTIONS = ["All", "bar", "lounge", "room", "kitchen"];

const ITEMS_OPTIONS = ["All"];

const STOCK_TAKERS = [
  {
    createdAt: "",
    itemsTaken: ["Rice 3 bag", "Yam 4 Tuber", "Cheese 3"],
    department: "Bar",
    stocktaker: "Tolu Abiodun",
  },
];

const InventoryStocktake = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [dateOption, setDateOption] = useState("");

  const [openDepartments, setOpenDepartments] = useState(false);
  const [departments, setDepartments] = useState(DEPARTMENT_OPTIONS[0]);

  const [openItems, setOpenItems] = useState(false);
  const [items, setItems] = useState(ITEMS_OPTIONS[0]);

  const [selectedStocktaker, setSelectedStocktaker] = useState(null);
  const [seeStocktakerModal, setSeeStocktakerModal] = useState(false);
  const openSeeStocktakerModal = (stocktaker: any) => {
    setSeeStocktakerModal(true);
    setSelectedStocktaker(stocktaker);
  };
  const closeSeeStocktakerModal = () => {
    setSeeStocktakerModal(false);
    setSelectedStocktaker(null);
  };

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

  const handleClickAway = (flag: string) => {
    if (flag === "departments") {
      setOpenDepartments(false);
    } else if (flag === "items") {
      setOpenItems(false);
    }
  };

  const todaysDate = new Date()
    .toLocaleString("en-GB", {
      timeZone: "Africa/Lagos",

      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  return (
    <div className="">
      <div className="w-full flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-y-3">
        <div className="grow flex flex-col lg:flex-row items-stretch lg:items-center justify-top lg:justify-left gap-y-3 gap-x-3">
          <div className="w-full lg:w-1/5">
            <label className="text-sm font_medium text-black">End Date</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="h-14 bg-[#F8F8F8] block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
              placeholder="End Date:"
              max={todaysDate}
              min={dateOption ? dateOption : undefined}
              onChange={(e: any) => setDateOption(e.target.value)}
            />
          </div>

          <div className="w-full lg:w-1/5">
            <label className="text-sm font_medium text-black">Department</label>
            <div className="mt-2 lg:mt-0">
              <div
                className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                onClick={() => {
                  setOpenDepartments(!openDepartments);
                }}
              >
                <p className={`text-xs lg:text-sm filter_text font_medium`}>
                  {toTitleCase(departments)}
                </p>
                {openDepartments ? (
                  <TiArrowSortedUp color="#8E8E8E" size={20} />
                ) : (
                  <TiArrowSortedDown color="#8E8E8E" size={20} />
                )}
              </div>
              {openDepartments && (
                <ClickAwayListener
                  onClickAway={() => handleClickAway("departments")}
                >
                  <div
                    className={`absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                  >
                    {DEPARTMENT_OPTIONS?.map((day: any, i: number) => (
                      <div
                        className="flex items-center cursor-pointer mb-2"
                        key={i}
                        onClick={() => {
                          setDepartments(day);
                          setOpenDepartments(false);
                        }}
                      >
                        <div
                          className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                            departments === day
                              ? "primary_bg_color"
                              : "bg_gray_color"
                          }`}
                        />
                        <p
                          className={`text-xs lg:text-sm secondary_gray_color text-black`}
                        >
                          {toTitleCase(day)}
                        </p>
                      </div>
                    ))}
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/5">
            <label className="text-sm font_medium text-black">Items</label>
            <div className="mt-2 lg:mt-0">
              <div
                className="h-14 bg-[#F8F8F8] block w-full flex justify-between rounded-md border-0 p-4 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer"
                onClick={() => {
                  setOpenItems(!openItems);
                }}
              >
                <p className={`text-xs lg:text-sm filter_text font_medium`}>
                  {toTitleCase(items)}
                </p>
                {openItems ? (
                  <TiArrowSortedUp color="#8E8E8E" size={20} />
                ) : (
                  <TiArrowSortedDown color="#8E8E8E" size={20} />
                )}
              </div>
              {openItems && (
                <ClickAwayListener onClickAway={() => handleClickAway("items")}>
                  <div
                    className={`absolute z-10 bg-white mb-2 w-24 lg:w-44 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                  >
                    {ITEMS_OPTIONS?.map((location: any, i: number) => (
                      <div
                        className="flex items-center cursor-pointer mb-2"
                        key={i}
                        onClick={() => {
                          setItems(location);
                          setOpenItems(false);
                        }}
                      >
                        <div
                          className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3 ${
                            items === location
                              ? "primary_bg_color"
                              : "bg_gray_color"
                          }`}
                        />
                        <p
                          className={`text-xs lg:text-sm secondary_gray_color text-black`}
                        >
                          {toTitleCase(location)}
                        </p>
                      </div>
                    ))}
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
        </div>

        <Link to={CHEF_ROUTES.linkChefStocktake}>
          <button className="bg-black text-white px-5 py-2 rounded-lg flex items-center space-x-2">
            Take Stock
          </button>
        </Link>
      </div>

      <div className="inline-block min-w-[300px] lg:min-w-full py-5 align-middle">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="my-4 grid grid-cols-2 gap-3">
              {[...Array(4)]?.map((_, i) => (
                <DashboardItemSkeletonLoader key={i} />
              ))}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-300 h-auto min-h-48">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font_medium text-black font-normal sm:pl-0"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                  >
                    Item taken
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal max-w-[400px]"
                  >
                    Taken by
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                  >
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {STOCK_TAKERS?.map((transaction: any, i: number) => (
                  <tr key={generateUUIDBasedOnStringLength("ttru")}>
                    <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3">
                      {dateFormatter.format(transaction?.createdAt)}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3">
                      {transaction?.itemsTaken?.join(", ")}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                      {transaction?.department}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 max-w-[400px] text-wrap">
                      {transaction?.stocktaker}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3">
                      <span
                        className="p-3 rounded-xl border border-[#BDBDBD] cursor-pointer"
                        onClick={() => {
                          openSeeStocktakerModal(transaction);
                        }}
                      >
                        View
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        open={seeStocktakerModal}
        onClose={closeSeeStocktakerModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 min-h-3/5 max-h-2/3 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none">
          <div className="flex flex-col justify-between items-center p-0 h-full">
            <div className="h-fit my-3 w-full flex flex-col">
              <div className="flex flex-row items-center">
                <p className="flex-1 text-center font_medium font-bold text-xl">
                  Details
                </p>
                <div className="">
                  <IoMdClose
                    size={24}
                    color="#8E8E8E"
                    className="cursor-pointer self-end"
                    onClick={closeSeeStocktakerModal}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col justify-start gap-y-6 h-full w-full mb-5">
                <div className="flex flex-row items-center justify-start gap-x-10 p-6 border border-[#] rounded-xl font-semibold text-sm">
                  <div className="grid grid-rows-3 gap-y-2 text-[#090909]">
                    <p className="">Taken by</p>
                    <p>Department</p>
                    <p>Date & Time</p>
                  </div>
                  <div className="grid grid-rows-3 gap-y-2">
                    <p>{selectedStocktaker?.stocktaker || "---"}</p>
                    <p>{selectedStocktaker?.department || "---"}</p>
                    <p>{selectedStocktaker?.createdAt || "---"}</p>
                  </div>
                </div>

                <div className="flex flex-col items-stretch divide-y divide-neutral-400">
                  <div className="flex flex-row items-center justify-left divide-x divide-neutral-400 bg-[#E0E0E0] rounded-t-xl">
                    <div className="w-1/3 p-3">
                      <p>Item</p>
                    </div>
                    <div className="w-2/3 p-3">
                      <p>QYT taken</p>
                    </div>
                  </div>

                  {selectedStocktaker?.itemsTaken?.map((item, i) => (
                    <div className="flex flex-row items-center justify-left divide-x divide-neutral-400">
                      <div className="w-1/3 p-3">
                        <p>Rice</p>
                      </div>
                      <div className="w-2/3 p-3">
                        <p>3 bags</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InventoryStocktake;
