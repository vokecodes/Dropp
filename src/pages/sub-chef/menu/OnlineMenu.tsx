// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PageTitle from "../../../components/PageTitle";
import OutlineButton from "../../../components/OutlineButton";

import Button from "../../../components/Button";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import Input from "../../../components/CustomInput";
import { BiImages } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import {
  NewMenuValues,
  NewSubscriptionMenuValues,
} from "../../../utils/FormInitialValue";
import { useFormik } from "formik";
import Dropdown from "../../../components/Dropdown";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addMenu,
  clearError,
  getSubChefMenus,
  subChefAddMenu,
  subChefUpdateMenu,
  updateMenu,
} from "../../../_redux/menu/menuAction";
import MenuCard from "../../../components/MenuCard";
import ColoredSpinner from "../../../components/ColoredSpinner";
import TextArea from "../../../components/TextArea";
import { HandleMultipleImagesUpload } from "../../../utils/uploadMultipleImages";
import {
  addSubscriptionMenu,
  getSubChefSubscriptionMenus,
  subChefAddSubscriptionMenu,
  subChefUpdateSubscriptionMenu,
  updateSubscriptionMenu,
} from "../../../_redux/subscriptionMenu/subscriptionMenuAction";
import SubscriptionChefMenuCard from "../../../components/SubscriptionChefMenuCard";
import {
  NewMenuInputsSchema,
  NewSubscriptionMenuInputsSchema,
} from "../../../utils/ValidationSchema";
import ChefDashboardLayout from "../../../components/ChefDashboardLayout";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { CHEF_ROUTES, SUB_CHEF_ROUTES } from "../../../routes/routes";
import SubMenuCard from "../../../components/SubMenuCard";
import { formatBusinessNameLink } from "../../../utils/formatMethods";
import { updateSubBusinessStatus } from "../../../_redux/business/businessAction";

const menuTab = ["No", "Yes"];
const maxSubMeal = 3500;
const daysOptions = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

const closeDateOptions = [
  { value: "6", label: "6 hours before delivery" },
  { value: "24", label: "24 hours before delivery" },
  { value: "48", label: "48 hours before delivery" },
];

const discountOptions = [
  { value: "5", label: "5% Discount" },
  { value: "10", label: "10% Discount" },
  { value: "15", label: "15% Discount" },
  { value: "20", label: "20% Discount" },
];

const OnlineMenu = () => {
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    error,
    loading,
    menu,
    subscriptionMenu,
    subscriptionMenuLoading,
    subscriptionError,
    business,
    businessLoading,
  } = useSelector(
    (state: any) => ({
      menu: state.menu.menu,
      loading: state.menu.loading,
      error: state.menu.error,
      subscriptionMenu: state.subscriptionMenu.subscriptionMenu,
      subscriptionMenuLoading: state.subscriptionMenu.loading,
      subscriptionError: state.subscriptionMenu.error,
      business: state.business.business,
      businessLoading: state.business.loading,
    }),
    shallowEqual
  );

  const [editMenu, setEditMenu] = useState<any>();
  const [copyMenu, setCopyMenu] = useState<any>();

  const [selectedTabMenu, setSelectedTabMenu] = useState(menuTab[0]);

  const [showMealPriceError, setShowMealPriceError] = useState(false);

  const [menuModal, setMenuModal] = useState(false);
  const openMenuModal = () => setMenuModal(true);
  const closeMenuModal = () => {
    setEditMenu("");
    setMenuModal(false);
  };

  const [copyMenuModal, setCopyMenuModal] = useState(false);
  const openCopyMenuModal = () => setCopyMenuModal(true);
  const closeCopyMenuModal = () => {
    setCopyMenu("");
    setCopyMenuModal(false);
  };

  useEffect(() => {
    dispatch(getSubChefMenus());
    dispatch(getSubChefSubscriptionMenus());
  }, []);

  const businessFeePercent = business?.feePercent || 15;

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
    initialValues:
      selectedTabMenu === "No" ? NewMenuValues : NewSubscriptionMenuValues,
    validationSchema:
      selectedTabMenu === "No"
        ? NewMenuInputsSchema
        : NewSubscriptionMenuInputsSchema,
    onSubmit: async () => {
      delete values.deliveryDate;

      setShowMealPriceError(false);

      if (selectedTabMenu === menuTab[1]) {
        if (editMenu) {
          await dispatch(
            subChefUpdateSubscriptionMenu(values, editMenu?._id, closeMenuModal)
          );
        } else if (copyMenu) {
          const copiedValues = (({
            foodName,
            price,
            portion,
            description,
            ingredients,
            note,
            images,
          }) => ({
            foodName,
            price,
            portion,
            description,
            ingredients,
            note,
            images,
          }))(values);
          await dispatch(
            subChefAddSubscriptionMenu({ ...copiedValues }, closeCopyMenuModal)
          );
        } else {
          await dispatch(
            subChefAddSubscriptionMenu({ ...values }, closeMenuModal)
          );
        }
        setSelectedTabMenu(menuTab[0]);
        return;
      } else {
        if (editMenu) {
          await dispatch(
            subChefUpdateMenu(values, editMenu?._id, closeMenuModal)
          );
        } else if (copyMenu) {
          const copiedValues = (({
            foodName,
            price,
            portion,
            minimumQuantity,
            description,
            ingredients,
            deliveryDays,
            closeDate,
            note,
            images,
          }) => ({
            foodName,
            price,
            portion,
            minimumQuantity,
            description,
            ingredients,
            deliveryDays,
            closeDate,
            note,
            images,
          }))(values);
          await dispatch(subChefAddMenu(copiedValues, closeCopyMenuModal));
        } else {
          await dispatch(subChefAddMenu(values, closeMenuModal));
        }
      }
      setEditMenu("");
    },
  });

  const [deliveryDays, setDeliveryDays] = useState([]);

  const handleSelectDeliveryDay = (day: any) => {
    const localDays = [...deliveryDays];

    if (localDays?.includes(day)) {
      const index = localDays.indexOf(day);
      localDays.splice(index, 1);
      setDeliveryDays(localDays);
    } else {
      localDays.push(day);
      setDeliveryDays(localDays);
    }
    setFieldValue("deliveryDays", localDays);
  };

  const [closeDateValue, setCloseDateValue] = useState();

  const [discountValue, setDiscountValue] = useState();

  const uploadImage = async (files: any) => {
    await HandleMultipleImagesUpload(
      files,
      setIsLoading,
      values.images,
      setFieldValue,
      "images"
    );
  };

  const updateBusinessState = (status: string) => {
    dispatch(updateSubBusinessStatus(status));
  };

  return (
    <>
      <ChefDashboardLayout>
        <>
          <div className="w-full px-6 py-4">
            <div className="lg:flex flex-row w-full justify-between">
              <Link
                className="flex items-center"
                to={SUB_CHEF_ROUTES.linkSubChef}
              >
                <MdOutlineArrowBackIosNew size={20} className="mr-3" />
                <PageTitle title="Back" />
              </Link>
              {business && (
                <div className="">
                  <div className="flex flex-col lg:flex-row justify-between gap-y-2 lg:gap-y-0">
                    <OutlineButton
                      title="Preview Menu"
                      extraClasses="px-8 py-2 mr-3"
                      onClick={() =>
                        window.open(
                          `/preview/${formatBusinessNameLink(
                            business?.businessName
                          )}`,
                          "_blank"
                        )
                      }
                    />
                    <Button
                      loading={businessLoading}
                      title={
                        business?.status === "active"
                          ? "Unpublish Menu"
                          : "Publish Menu"
                      }
                      onClick={
                        business?.status === "active"
                          ? () => updateBusinessState("inactive")
                          : () => updateBusinessState("active")
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
              {menu && menu?.length > 0 ? (
                <>
                  <div className="inline-flex flex-row w-full justify-between">
                    <div className="inline-flex flex-row">
                      <h1 className="text-xl text-black font_medium mt-1.5">
                        Menu
                      </h1>
                      {/* <div className="inline-flex flex-row  rounded-full bg-gray-200 py-.5 px-1.5 ml-4 w-full">
                        <img
                          src="../images/search.svg"
                          alt="search"
                          width={15}
                        />
                        <Input
                          placeholder="Search Menu"
                          className="border-0 bg-transparent rounded-full py-2 px-4 focus:outline-none"
                        />
                      </div> */}
                    </div>

                    <div className="">
                      <OutlineButton
                        title="Add a new menu"
                        extraClasses="w-52 px-8 py-2"
                        onClick={() => {
                          setSelectedTabMenu(menuTab[0]);
                          setValues(NewMenuValues);
                          setDeliveryDays([]);
                          setCloseDateValue();
                          setDiscountValue();
                          openMenuModal();
                        }}
                      />
                    </div>
                  </div>

                  <div className="lg:inline-flex flex-row w-full  flex-wrap mt-7 ">
                    {subscriptionMenu?.map((menu: any) => (
                      <div key={menu?._id} className="lg:w-[31%] mt-7 lg:mr-5">
                        <SubscriptionChefMenuCard
                          menu={menu}
                          user="subChef"
                          onClickEdit={() => {
                            setSelectedTabMenu(menuTab[1]);
                            setEditMenu(menu);
                            openMenuModal();
                            setValues(menu);
                          }}
                        />
                      </div>
                    ))}

                    {menu?.map((menu: any) => (
                      <div key={menu?._id} className="lg:w-[31%] mt-7 lg:mr-5">
                        <SubMenuCard
                          menu={menu}
                          onClickEdit={() => {
                            setSelectedTabMenu(menuTab[0]);
                            setEditMenu(menu);
                            openMenuModal();
                            setValues(menu);
                            setDeliveryDays(menu?.deliveryDays);
                            setCloseDateValue({
                              label: `${menu.closeDate} hours before delivery`,
                              value: menu.closeDate,
                            });
                            if (parseFloat(menu.discount) > 0) {
                              setDiscountValue({
                                label: `${menu.discount}% Discount`,
                                value: menu.discount,
                              });
                            }
                          }}
                          onClickCopy={() => {
                            setSelectedTabMenu(menuTab[0]);
                            setCopyMenu(menu);
                            openCopyMenuModal();
                            setValues(menu);
                            setDeliveryDays(menu?.deliveryDays);
                            setCloseDateValue({
                              label: `${menu.closeDate} hours before delivery`,
                              value: menu.closeDate,
                            });
                            if (parseFloat(menu.discount) > 0) {
                              setDiscountValue({
                                label: `${menu.discount}% Discount`,
                                value: menu.discount,
                              });
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <h2 className="text-xl input_text mb-3">
                    You have not added a menu.
                  </h2>
                  <Button
                    title="Add a menu"
                    extraClasses="py-4"
                    onClick={openMenuModal}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ONLINE MENU */}
          <Modal
            open={menuModal}
            onClose={closeMenuModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <div className="flex">
                <p className="flex-1 text-xl text-center font_bold black2">
                  {editMenu ? "Edit menu" : "Add a new menu"}
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeMenuModal}
                />
              </div>

              <div>
                <p className="mt-5 text-lg text-center font_medium input_text">
                  Is this a subscription meal?
                </p>
              </div>

              <div className="flex bg_sec_gray_color rounded-full cursor-pointer justify-between mt-3 mb-5">
                {menuTab?.map((menu: string) => (
                  <p
                    key={menu}
                    className={`text-center font_regular py-4 w-1/2 text-base ${
                      menu === selectedTabMenu
                        ? "text-white primary_bg_color rounded-full"
                        : "text-black"
                    } `}
                    onClick={() => {
                      setSelectedTabMenu(menu);
                      resetForm();
                      dispatch(clearError());
                      if (menu === menuTab[1]) {
                        setFieldValue("subscription", true);
                        return;
                      }
                      setFieldValue("subscription", false);
                    }}
                  >
                    {menu}
                  </p>
                ))}
              </div>

              <div className="rounded-xl border gray_border_color flex flex-col items-center justify-center px-10 py-10 mt-3">
                <div className="flex flex-wrap">
                  {values.images &&
                    values.images?.map((image: string, i: number) => (
                      <div className="flex flex-col items-center mb-3">
                        <img
                          src={image}
                          alt="menuImage"
                          className="w-40 h-40 mr-2 mb-2 object-cover"
                        />
                        <div
                          className="mt-2 cursor-pointer"
                          onClick={() => {
                            const valuesImages = [...values.images];
                            if (valuesImages.includes(image)) {
                              const index = valuesImages.indexOf(image);
                              valuesImages.splice(index, 1);
                              setFieldValue("images", valuesImages);
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#06c167"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>

                {isLoading ? (
                  <ColoredSpinner />
                ) : (
                  <>
                    {!(values.images && values.images.length > 0) && (
                      <>
                        <BiImages size={50} color="#06c167" />
                        <p className="flex-1 text-xl text-center font_regular sec_black_color mt-1">
                          Add an image of the food
                        </p>
                      </>
                    )}
                    <div className="flex my-2 cursor-pointer">
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        name="image"
                        placeholder=""
                        onChange={(e: any) => uploadImage(e.target.files)}
                        className="hidden"
                        ref={imageInputRef}
                        multiple
                      />
                      <div
                        className="flex items-center"
                        onClick={() => imageInputRef.current?.click()}
                      >
                        <p className="text-lg primary_txt_color font_medium text-center">
                          Choose file
                        </p>
                        <FiChevronRight size={20} color="#06c167" />
                      </div>
                    </div>

                    {errors.images && touched.closeDate && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {errors.images}
                      </p>
                    )}
                  </>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Food Name"
                  name="foodName"
                  onChange={handleChange}
                  value={values.foodName}
                  error={errors.foodName && touched.foodName && errors.foodName}
                />

                <Input
                  type="number"
                  placeholder={`Price (Homemade charges ${
                    selectedTabMenu === menuTab[1] ? "10" : businessFeePercent
                  }% on every meal)`}
                  name="price"
                  onChange={(e: any) => {
                    if (selectedTabMenu === menuTab[1]) {
                      if (e.target.value > maxSubMeal) {
                        setShowMealPriceError(true);
                        return;
                      }
                      setFieldValue("price", e.target.value);
                      setShowMealPriceError(false);
                    } else {
                      setFieldValue("price", e.target.value);
                      setShowMealPriceError(false);
                    }
                  }}
                  value={values.price}
                  error={errors.price && touched.price && errors.price}
                />

                {showMealPriceError && (
                  <p className="text-sm text-center text-red-600 my-2">
                    Maximum meal price is ₦{maxSubMeal}
                  </p>
                )}

                {selectedTabMenu === "No" && (
                  <Dropdown
                    label="Discount (Optional)"
                    options={discountOptions}
                    value={discountValue}
                    onChange={(v: any) => {
                      setDiscountValue(v);
                    }}
                  />
                )}

                <div className="flex justify-between">
                  <div className="w-[48%]">
                    <Input
                      placeholder="What you earn"
                      value={
                        values.discount
                          ? Math.floor(
                              ((values.price -
                                (values.price / 100) * values.discount) /
                                100) *
                                (100 - businessFeePercent)
                            )
                          : selectedTabMenu === menuTab[1]
                          ? (values.price / 100) * 90
                          : (values.price / 100) * (100 - businessFeePercent)
                      }
                      readOnly
                    />
                  </div>
                  <div className="w-[48%]">
                    <Input
                      placeholder="What customer pays"
                      value={
                        values.discount
                          ? values.price -
                            (values.price / 100) * values.discount
                          : values.price
                      }
                      readOnly
                    />
                  </div>
                </div>

                <Input
                  type="text"
                  placeholder="Portion size: E.g plate, 10 liter bowl, 5 liter bowl"
                  name="portion"
                  onChange={handleChange}
                  value={values.portion}
                  error={errors.portion && touched.portion && errors.portion}
                />

                {selectedTabMenu === "No" && (
                  <Input
                    type="number"
                    placeholder="Minimum quantity per order"
                    name="minimumQuantity"
                    onChange={handleChange}
                    value={values.minimumQuantity}
                    error={
                      errors.minimumQuantity &&
                      touched.minimumQuantity &&
                      errors.minimumQuantity
                    }
                  />
                )}

                <TextArea
                  placeholder="Food description"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  error={
                    errors.description &&
                    touched.description &&
                    errors.description
                  }
                />

                <TextArea
                  type="text"
                  placeholder="Main ingredients"
                  name="ingredients"
                  onChange={handleChange}
                  value={values.ingredients}
                  error={
                    errors.ingredients &&
                    touched.ingredients &&
                    errors.ingredients
                  }
                />

                {selectedTabMenu === "No" && (
                  <div>
                    <Input
                      type="text"
                      placeholder="Set delivery day(s) "
                      readOnly
                    />

                    <div className="flex flex-row absolute -mt-16 ml-4">
                      {daysOptions?.map((day, i) => (
                        <div
                          className={`cursor-pointer mr-2 w-7 h-7 lg:w-9 lg:h-9 rounded-full flex justify-center items-center ${
                            deliveryDays?.includes(day)
                              ? "primary_bg_color text-white"
                              : "bg_sec_gray_color text-black"
                          }`}
                          onClick={() => handleSelectDeliveryDay(day)}
                        >
                          <p className="text-xs lg:text-base font_medium">
                            {day}
                          </p>
                        </div>
                      ))}
                    </div>
                    {errors.deliveryDays && touched.closeDate && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {errors.deliveryDays}
                      </p>
                    )}
                  </div>
                )}

                {selectedTabMenu === "No" && (
                  <Dropdown
                    label="When do you want to close this order?"
                    options={closeDateOptions}
                    value={closeDateValue}
                    onChange={(v: any) => {
                      // let items = v.map((i: any) => i.value);
                      setCloseDateValue(v);
                      setFieldValue("closeDate", v.value);
                    }}
                    error={
                      errors.closeDate && touched.closeDate && errors.closeDate
                    }
                  />
                )}

                {/* <select>
                  <option value={6}>6 hours before delivery</option>
                  <option value={24}>24 hours before delivery</option>
                  <option value={48}>48 hours before delivery</option>
                </select> */}

                <TextArea
                  placeholder="Other notes (Optional)"
                  name="note"
                  onChange={handleChange}
                  value={values.note}
                />

                {error && menu && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {error}
                  </p>
                )}

                {subscriptionError && subscriptionMenu && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {subscriptionError}
                  </p>
                )}

                <div className="mt-10">
                  <OutlineButton
                    loading={loading || subscriptionMenuLoading}
                    title="Save Menu"
                    extraClasses="w-full p-3 rounded-full px-8 py-2"
                    onClick={() => {
                      if (discountValue) {
                        setFieldValue("discount", discountValue.value);
                      } else {
                        setFieldValue("discount", "");
                      }
                      handleSubmit();
                    }}
                  />
                </div>
              </div>
            </div>
          </Modal>

          {/* COPY MENU */}
          <Modal
            open={copyMenuModal}
            onClose={closeCopyMenuModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <div className="flex">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Copy menu
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeCopyMenuModal}
                />
              </div>

              <div>
                <p className="mt-5 text-lg text-center font_medium input_text">
                  Is this a subscription meal?
                </p>
              </div>

              <div className="flex bg_sec_gray_color rounded-full cursor-pointer justify-between mt-3 mb-5">
                {menuTab?.map((menu: string) => (
                  <p
                    key={menu}
                    className={`text-center font_regular py-4 w-1/2 text-base ${
                      menu === selectedTabMenu
                        ? "text-white primary_bg_color rounded-full"
                        : "text-black"
                    } `}
                    onClick={() => {
                      setSelectedTabMenu(menu);
                      resetForm();
                      dispatch(clearError());
                      if (menu === menuTab[1]) {
                        setFieldValue("subscription", true);
                        return;
                      }
                      setFieldValue("subscription", false);
                    }}
                  >
                    {menu}
                  </p>
                ))}
              </div>

              <div className="rounded-xl border gray_border_color flex flex-col items-center justify-center px-10 py-10 mt-3">
                <div className="flex flex-wrap">
                  {values.images &&
                    values.images?.map((image: string, i: number) => (
                      <div className="flex flex-col items-center mb-3">
                        <img
                          src={image}
                          alt="menuImage"
                          className="w-40 h-40 mr-2 mb-2 object-cover"
                        />
                        <div
                          className="mt-2 cursor-pointer"
                          onClick={() => {
                            const valuesImages = [...values.images];
                            if (valuesImages.includes(image)) {
                              const index = valuesImages.indexOf(image);
                              valuesImages.splice(index, 1);
                              setFieldValue("images", valuesImages);
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#06c167"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>

                {isLoading ? (
                  <ColoredSpinner />
                ) : (
                  <>
                    {!(values.images && values.images.length > 0) && (
                      <>
                        <BiImages size={50} color="#06c167" />
                        <p className="flex-1 text-xl text-center font_regular sec_black_color mt-1">
                          Add an image of the food
                        </p>
                      </>
                    )}
                    <div className="flex my-2 cursor-pointer">
                      <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        name="image"
                        placeholder=""
                        onChange={(e: any) => uploadImage(e.target.files)}
                        className="hidden"
                        ref={imageInputRef}
                        multiple
                      />
                      <div
                        className="flex items-center"
                        onClick={() => imageInputRef.current?.click()}
                      >
                        <p className="text-lg primary_txt_color font_medium text-center">
                          Choose file
                        </p>
                        <FiChevronRight size={20} color="#06c167" />
                      </div>
                    </div>

                    {errors.images && touched.closeDate && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {errors.images}
                      </p>
                    )}
                  </>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Food Name"
                  name="foodName"
                  onChange={handleChange}
                  value={values.foodName}
                  error={errors.foodName && touched.foodName && errors.foodName}
                />

                <Input
                  type="number"
                  placeholder={`Price (Homemade charges ${
                    selectedTabMenu === menuTab[1] ? "10" : businessFeePercent
                  }% on every meal)`}
                  name="price"
                  onChange={(e: any) => {
                    if (selectedTabMenu === menuTab[1]) {
                      if (e.target.value > maxSubMeal) {
                        setShowMealPriceError(true);
                        return;
                      }
                      setFieldValue("price", e.target.value);
                      setShowMealPriceError(false);
                    } else {
                      setFieldValue("price", e.target.value);
                      setShowMealPriceError(false);
                    }
                  }}
                  value={values.price}
                  error={errors.price && touched.price && errors.price}
                />

                {showMealPriceError && (
                  <p className="text-sm text-center text-red-600 my-2">
                    Maximum meal price is ₦{maxSubMeal}
                  </p>
                )}

                {selectedTabMenu === "No" && (
                  <Dropdown
                    label="Discount (Optional)"
                    options={discountOptions}
                    value={discountValue}
                    onChange={(v: any) => {
                      setDiscountValue(v);
                    }}
                  />
                )}

                <div className="flex justify-between">
                  <div className="w-[48%]">
                    <Input
                      placeholder="What you earn"
                      value={
                        values.discount
                          ? Math.floor(
                              ((values.price -
                                (values.price / 100) * values.discount) /
                                100) *
                                (100 - businessFeePercent)
                            )
                          : selectedTabMenu === menuTab[1]
                          ? (values.price / 100) * 90
                          : (values.price / 100) * (100 - businessFeePercent)
                      }
                      readOnly
                    />
                  </div>
                  <div className="w-[48%]">
                    <Input
                      placeholder="What customer pays"
                      value={
                        values.discount
                          ? values.price -
                            (values.price / 100) * values.discount
                          : values.price
                      }
                      readOnly
                    />
                  </div>
                </div>

                <Input
                  type="text"
                  placeholder="Portion size: E.g plate, 10 liter bowl, 5 liter bowl"
                  name="portion"
                  onChange={handleChange}
                  value={values.portion}
                  error={errors.portion && touched.portion && errors.portion}
                />

                {selectedTabMenu === "No" && (
                  <Input
                    type="number"
                    placeholder="Minimum quantity per order"
                    name="minimumQuantity"
                    onChange={handleChange}
                    value={values.minimumQuantity}
                    error={
                      errors.minimumQuantity &&
                      touched.minimumQuantity &&
                      errors.minimumQuantity
                    }
                  />
                )}

                <TextArea
                  placeholder="Food description"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  error={
                    errors.description &&
                    touched.description &&
                    errors.description
                  }
                />

                <TextArea
                  type="text"
                  placeholder="Main ingredients"
                  name="ingredients"
                  onChange={handleChange}
                  value={values.ingredients}
                  error={
                    errors.ingredients &&
                    touched.ingredients &&
                    errors.ingredients
                  }
                />

                {selectedTabMenu === "No" && (
                  <div>
                    <Input
                      type="text"
                      placeholder="Set delivery day(s) "
                      readOnly
                    />

                    <div className="flex flex-row absolute -mt-16 ml-4">
                      {daysOptions?.map((day, i) => (
                        <div
                          className={`cursor-pointer mr-2 w-7 h-7 lg:w-9 lg:h-9 rounded-full flex justify-center items-center ${
                            deliveryDays?.includes(day)
                              ? "primary_bg_color text-white"
                              : "bg_sec_gray_color text-black"
                          }`}
                          onClick={() => handleSelectDeliveryDay(day)}
                        >
                          <p className="text-xs lg:text-base font_medium">
                            {day}
                          </p>
                        </div>
                      ))}
                    </div>
                    {errors.deliveryDays && touched.closeDate && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {errors.deliveryDays}
                      </p>
                    )}
                  </div>
                )}

                {selectedTabMenu === "No" && (
                  <Dropdown
                    label="When do you want to close this order?"
                    options={closeDateOptions}
                    value={closeDateValue}
                    onChange={(v: any) => {
                      // let items = v.map((i: any) => i.value);
                      setCloseDateValue(v);
                      setFieldValue("closeDate", v.value);
                    }}
                    error={
                      errors.closeDate && touched.closeDate && errors.closeDate
                    }
                  />
                )}

                {/* <select>
                  <option value={6}>6 hours before delivery</option>
                  <option value={24}>24 hours before delivery</option>
                  <option value={48}>48 hours before delivery</option>
                </select> */}

                <TextArea
                  placeholder="Other notes (Optional)"
                  name="note"
                  onChange={handleChange}
                  value={values.note}
                />

                {error && menu && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {error}
                  </p>
                )}

                {subscriptionError && subscriptionMenu && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {subscriptionError}
                  </p>
                )}

                <div className="mt-10">
                  <OutlineButton
                    loading={loading || subscriptionMenuLoading}
                    title="Save Menu"
                    extraClasses="w-full p-3 rounded-full px-8 py-2"
                    onClick={() => {
                      if (discountValue) {
                        setFieldValue("discount", discountValue.value);
                      } else {
                        setFieldValue("discount", "");
                      }
                      handleSubmit();
                    }}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </>
      </ChefDashboardLayout>
    </>
  );
};

export default OnlineMenu;
