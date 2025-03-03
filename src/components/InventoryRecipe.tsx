import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEllipsisH } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Button from "./Button";
import Input from "./CustomInput";
import { IoMdClose } from "react-icons/io";
import Table from "./Table";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import OutlineButton from "./OutlineButton";
import { formatRemoteAmountKobo } from "../utils/formatMethods";
import MiniTabMenu from "./MiniTabMenu";

const recipeColumns = ["Name", "Category", "Quantity", "Cost"];
const recipes = [
  {
    name: "Alfredo sauce",
    category: "Bar, Kitchen",
    quantity: "2KG",
    cost: "₦100000",
  },
];

const TABS = ["Recipe Items", "Procedure"];

const InventoryRecipe = () => {
  const [recipeModal, setRecipeModal] = useState(false);
  const openRecipeModal = () => setRecipeModal(true);
  const closeRecipeModal = () => setRecipeModal(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTab, setSelectedTab] = useState(TABS[0]);

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
      category: "",
      description: "",
      quantity: "",
    },
    onSubmit: (values) => {
      console.log("values= ", values);
    },
  });

  return (
    <div className="">
      {/* Search & Actions */}
      <div className="flex justify-between items-center">
        {/* Search Bar */}
        <div className="relative w-[300px]">
          <AiOutlineSearch className="absolute left-4 top-3 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-12 pr-4 py-2 rounded-full bg-[#EDECEC] text-black focus:outline-none"
          />
        </div>

        <div className="flex space-x-3">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg flex items-center space-x-2"
            onClick={openRecipeModal}
          >
            <span>Add recipe</span> <AiOutlineDown />
          </button>
        </div>
      </div>

      <Table columns={recipeColumns} data={recipes} />

      {/* RECIPE MODAL */}
      <Modal
        open={recipeModal}
        onClose={closeRecipeModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 -translate-y-1/2 -translate-x-1/2 bg-[#F8F8F8] rounded-3xl p-7 my-10 outline-none h-4/5 overflow-auto">
          <div className="flex">
            <p className="flex-1 text-xl font_bold black2">Recipe</p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeRecipeModal}
            />
          </div>

          <div className="mt-5 mb-8 w-1/2 mx-auto">
            <MiniTabMenu
              ordersMenu={TABS}
              selectedOrder={selectedTab}
              setSelectedOrder={setSelectedTab}
            />
          </div>

          {TABS[0] === selectedTab && (
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
                type="dropdown"
                placeholder="Category"
                name="category"
                onChange={handleChange}
                value={values.category}
                options={[]}
                error={errors.category && touched.category && errors.category}
              />

              <Input
                type="text-area"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                value={values.description}
                error={
                  errors.description &&
                  touched.description &&
                  errors.description
                }
              />

              <Input
                type="text"
                placeholder="Quantity"
                name="quantity"
                onChange={handleChange}
                value={values.quantity}
                error={errors.quantity && touched.quantity && errors.quantity}
              />

              <div className="border border-[#D3D3D3] my-4 " />
              <p className="flex-1 text-xl font_bold black2">Add Ingredients</p>
              <div className="bg-white rounded-3xl p-4 shadow-2xl mt-4 mb-8">
                <div>
                  <Input
                    type="text"
                    placeholder="Item"
                    name="item"
                    // onChange={handleChange}
                    // value={values.name}
                    // error={errors.name && touched.name && errors.name}
                  />
                  <Input
                    type="text"
                    placeholder="Net Quantity"
                    name="netQuantity"
                    // onChange={handleChange}
                    // value={values.name}
                    // error={errors.name && touched.name && errors.name}
                  />
                  <Input
                    type="text"
                    placeholder="Waste Quantity"
                    name="wasteQuantity"
                    // onChange={handleChange}
                    // value={values.name}
                    // error={errors.name && touched.name && errors.name}
                  />

                  <div className="flex justify-between items-center my-4">
                    <p className="text-md font_medium text-[#787878]">
                      Unit Cost:
                    </p>
                    <p className="text-md font_medium text-[#787878]">
                      {formatRemoteAmountKobo(2000).naira}
                      {formatRemoteAmountKobo(2000).kobo}
                    </p>
                  </div>
                  <div className="flex justify-between items-center my-4">
                    <p className="text-md font_medium text-[#787878]">
                      Gross Quantity:
                    </p>
                    <p className="text-md font_medium text-[#787878]">4</p>
                  </div>
                  <div className="flex justify-between items-center my-4">
                    <p className="text-md font_medium text-[#787878]">Total:</p>
                    <p className="text-md font_medium text-[#787878]">
                      {formatRemoteAmountKobo(10000).naira}
                      {formatRemoteAmountKobo(10000).kobo}
                    </p>
                  </div>

                  <OutlineButton
                    loading={isLoading}
                    title="Save & add another"
                    extraClasses="w-full p-3 rounded-full px-8 py-2"
                    onClick={() => {
                      handleSubmit();
                    }}
                  />
                </div>
              </div>

              {/* {error  && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {error}
                  </p>
                )} */}

              <div className="">
                <Button
                  loading={isLoading}
                  title="Add sub-recipe"
                  extraClasses="w-full p-3 rounded-full px-8 py-2"
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              </div>
            </div>
          )}

          {TABS[1] === selectedTab && (
            <div>
              <Input
                type="text"
                placeholder="Prep Time"
                name="name"
                // onChange={handleChange}
                // value={values.name}
                // error={errors.name && touched.name && errors.name}
              />

              <Input
                type="dropdown"
                placeholder="Cooking Time"
                name="category"
                // onChange={handleChange}
                // value={values.category}
                // options={[]}
                // error={errors.category && touched.category && errors.category}
              />

              <div className="flex justify-between items-center my-4">
                <p className="text-md font_medium text-[#787878]">
                  Time to completion:
                </p>
                <p className="text-md font_medium text-[#787878]">100 mins</p>
              </div>

              <Input
                type="text-area"
                placeholder="Cooking instructions"
                name="description"
                // onChange={handleChange}
                // value={values.description}
                // error={
                //   errors.description &&
                //   touched.description &&
                //   errors.description
                // }
              />

              <Input
                type="text-area"
                placeholder="About the Item"
                name="description"
                // onChange={handleChange}
                // value={values.description}
                // error={
                //   errors.description &&
                //   touched.description &&
                //   errors.description
                // }
              />

              {/* {error  && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {error}
                  </p>
                )} */}

              <div className="">
                <Button
                  loading={isLoading}
                  title="Save Procedure"
                  extraClasses="w-full p-3 rounded-full px-8 py-2"
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default InventoryRecipe;
