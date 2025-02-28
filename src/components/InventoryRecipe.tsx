import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEllipsisH } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Button from "./Button";
import Input from "./Input";
import { IoMdClose } from "react-icons/io";
import Table from "./Table";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";

const recipeColumns = ["Name", "Category", "Quantity", "Cost"];
const recipes = [
  {
    name: "Alfredo sauce",
    category: "Bar, Kitchen",
    quantity: "2KG",
    cost: "₦100000",
  },
];

const InventoryRecipe = () => {
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
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            <p className="flex-1 text-xl text-center font_bold black2">
              Add a Recipe
            </p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeRecipeModal}
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
                title="Add Recipe"
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

export default InventoryRecipe;
