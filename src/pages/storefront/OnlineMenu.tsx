// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PageTitle from "../../components/PageTitle";
import OutlineButton from "../../components/OutlineButton";
import Button from "../../components/Button";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import Input from "../../components/CustomInput";
import { BiImages, BiLinkAlt } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import {
  NewMenuValues,
  NewSubscriptionMenuValues,
} from "../../utils/FormInitialValue";
import { useFormik } from "formik";
import Dropdown from "../../components/Dropdown";
import { useAppDispatch } from "../../redux/hooks";
import {
  addMenu,
  clearError,
  getMenus,
  updateMenu,
} from "../../_redux/menu/menuAction";
import MenuCard from "../../components/MenuCard";
import ColoredSpinner from "../../components/ColoredSpinner";
import { formatBusinessNameLink } from "../../utils/formatMethods";
import { updateBusinessStatus } from "../../_redux/business/businessAction";
import TextArea from "../../components/TextArea";
import { HandleMultipleImagesUpload } from "../../utils/uploadMultipleImages";
import {
  addSubscriptionMenu,
  getSubscriptionMenus,
  updateSubscriptionMenu,
} from "../../_redux/subscriptionMenu/subscriptionMenuAction";
import SubscriptionChefMenuCard from "../../components/SubscriptionChefMenuCard";
import {
  NewMenuInputsSchema,
  NewSubscriptionMenuInputsSchema,
} from "../../utils/ValidationSchema";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { CHEF_ROUTES } from "../../routes/routes";
import { IoSearchSharp } from "react-icons/io5";
import { Alert, Autocomplete, Chip, InputAdornment, Snackbar, TextField } from "@mui/material";
import { SERVER } from "../../config/axios";
import { MENU_CATEGORY_URL, MENU_DELIVERY_URL, MENU_TAG_URL } from "../../_redux/urls";
import { AiFillCloseCircle } from "react-icons/ai";
import MenuDelivery from "../../components/MenuDelivery";
import AlertDialog from "../../components/AlertDialog";
import { CheckIcon } from "@heroicons/react/24/outline";


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
    business,
    businessLoading,
    user,
    subscriptionMenu,
    subscriptionMenuLoading,
    subscriptionError,
  } = useSelector(
    (state: any) => ({
      business: state.business.business,
      businessLoading: state.business.loading,
      menu: state.menu.menu,
      loading: state.menu.loading,
      error: state.menu.error,
      subscriptionMenu: state.subscriptionMenu.subscriptionMenu,
      subscriptionMenuLoading: state.subscriptionMenu.loading,
      subscriptionError: state.subscriptionMenu.error,
      user: state.user.user,
    }),
    shallowEqual
  );

  const [alertPresent, setAlertPresent] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };


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
            updateSubscriptionMenu(values, editMenu?._id, closeMenuModal)
          );
        } else if (copyMenu) {
          const copiedValues = (({
            foodName,
            category,
            price,
            portion,
            description,
            ingredients,
            note,
            images,
          }) => ({
            foodName,
            category,
            price,
            portion,
            description,
            ingredients,
            note,
            images,
          }))(values);
          await dispatch(
            addSubscriptionMenu(
              { ...copiedValues, businessId: business?._id },
              closeCopyMenuModal
            )
          );
        } else {
          await dispatch(
            addSubscriptionMenu(
              { ...values, businessId: business?._id },
              closeMenuModal
            )
          );
        }
        setSelectedTabMenu(menuTab[0]);
        return;
      } else {
        if (editMenu) {
          await dispatch(updateMenu(values, editMenu?._id, closeMenuModal));
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
          await dispatch(addMenu(copiedValues, closeCopyMenuModal));
        } else {
          await dispatch(addMenu(values, closeMenuModal));
        }
      }
      setEditMenu("");
      setCopyMenu("");
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

  const [publishError, setPublishError] = useState("");

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
    dispatch(updateBusinessStatus(status));
    setPublishError();
  };

  const [tagsModal, setTagsModal] = useState(false);
  const openTagsModal = () => setTagsModal(true);
  const closeTagsModal = () => {
    setTagsModal(false);
  };

  const [catModal, setCatModal] = useState(false);
  const openCatModal = () => setCatModal(true);
  const closeCatModal = () => {
    setCatModal(false);
  };

  const [deliveryModal, setDeliveryModal] = useState(false);
  const openDeliveryModal = () => setDeliveryModal(true);
  const closeDeliveryModal = () => {
    setDeliveryModal(false);
  };

  const [cat, setCat] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [dinningMenuCategories, setDinningMenuCategories] = useState<any>([]);

  const handleClickCategory = (e: any) => {
    let localMenuCategories = [...dinningMenuCategories];
    if (cat) {
      localMenuCategories.push({ value: cat, label: cat });
      setDinningMenuCategories(localMenuCategories);
      setCat("");
    }
    console.log("cat= ", cat, "localMenuCategories", localMenuCategories);
  };

  const removeCat = (cat) => {
    console.log("rm", cat);
    let localMenuCategories = [...dinningMenuCategories];

    localMenuCategories = localMenuCategories.filter(
      (item) => item.value !== cat.value
    );

    setDinningMenuCategories(localMenuCategories);
  };

  const getDinningMenuCategories = () => {
    SERVER.get(MENU_CATEGORY_URL)
      .then(({ data }) => {
        if (
          data?.menuCategory?.categories &&
          data?.menuCategory?.categories?.length > 0
        ) {
          setDinningMenuCategories(data?.menuCategory?.categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveCategory = () => {
    setIsLoadingCategories(true);
    SERVER.patch(MENU_CATEGORY_URL, {
      categories: dinningMenuCategories,
    })
      .then(({ data }) => {
        console.log("handleSaveCategoryD", data);
        closeCatModal();
        getDinningMenuCategories();
      })
      .catch((err) => {
        console.log("handleSaveCategoryE", err);
      })
      .finally(() => setIsLoadingCategories(false));
  };

  const [tag, setTag] = useState("");
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [dinningMenuTags, setDinningMenuTags] = useState<any>([]);

  const handleClickTags = (e: any) => {
    let localMenuTags = [...dinningMenuTags];
    if (tag) {
      localMenuTags.push({ value: tag, label: tag });
      setDinningMenuTags(localMenuTags);
      setTag("");
    }
    console.log("tag= ", tag, "localMenuTags", localMenuTags);
  };

  const removeTag = (tag) => {
    console.log("rm", tag);
    let localMenuTags = [...dinningMenuTags];

    localMenuTags = localMenuTags.filter((item) => item.value !== tag.value);

    setDinningMenuTags(localMenuTags);
  };

  const getDinningMenuTags = () => {
    SERVER.get(MENU_TAG_URL)
      .then(({ data }) => {
        if (
          data?.menuTag?.tags &&
          data?.menuTag?.tags?.length > 0
        ) {
          setDinningMenuTags(data?.menuTag?.tags);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveTag = () => {
    setIsLoadingTags(true);
    SERVER.patch(MENU_TAG_URL, {
      tags: dinningMenuTags,
    })
      .then(({ data }) => {
        console.log("handleSaveTagsD", data);
        closeTagsModal();
        getDinningMenuTags();
      })
      .catch((err) => {
        console.log("handleSaveTagsE", err);
      })
      .finally(() => setIsLoadingTags(false));
  };

  const handleChangeTag = (event: SelectChangeEvent<typeof ingredients>) => {
    const {
      target: { value },
    } = event;
    setIngredients(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  
  const [menuDelivery, setMenuDelivery] = useState<any>([]);

  const getMenuDelivery = () => {
    SERVER.get(MENU_DELIVERY_URL)
      .then(({ data }) => {
        setMenuDelivery([]);
        if (
          data?.data &&
          data?.data?.length > 0
        ) {
          setMenuDelivery(data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  useEffect(() => {
    dispatch(getMenus());
    dispatch(getSubscriptionMenus());
    getDinningMenuCategories();
    getDinningMenuTags();
    getMenuDelivery();
  }, []);

  const [q, setQ] = useState("");
  
  const searchFiltered = q === ""
    ? menu
    : menu.filter((item: any) =>
      item?.category?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
      item?.foodName?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
      item?.description?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
    );


  return (
    <>
      <ChefDashboardLayout>
        <>
          <div className="w-full px-2 lg:px-6 py-4">
            <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-y-3">
              <PageTitle title="Menu" />

              {business && (
                <div className="">
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-y-3 gap-x-3 px-3">

                    <OutlineButton
                      title="Delivery"
                      extraClasses="px-8 py-2 !border-[#06C167] !text-[#06C167]"
                      onClick={() => openDeliveryModal()}
                    />

                    <OutlineButton
                      title="Preview Store"
                      extraClasses="px-8 py-2 !border-[#06C167] !text-[#06C167]"
                      onClick={() =>
                        window.open(
                          `/preview/storefront/${formatBusinessNameLink(
                            business?.businessName
                          )}`,
                          "_blank"
                        )
                      }
                    />

                    <div className="h-full flex flex-row items-center justify-center lg:justify-between gap-x-3">
                      <Button
                        loading={businessLoading}
                        title={
                          business?.status === "active"
                            ? "Unpublish Menu"
                            : "Publish Menu"
                        }
                        extraClasses={
                          user?.image &&
                          user?.phoneNumber &&
                          user?.address &&
                          user?.bio
                            ? "!bg-[#06C167]"
                            : "bg_ter_gray_color"
                        }
                        disabled={
                          !(
                            user?.image &&
                            user?.phoneNumber &&
                            user?.address &&
                            user?.bio
                          )
                        }
                        onClick={
                          user?.image &&
                          user?.phoneNumber &&
                          user?.address &&
                          user?.bio
                            ? business?.status === "active"
                              ? () => updateBusinessState("inactive")
                              : () => updateBusinessState("active")
                            : () =>
                                setPublishError(
                                  "Please complete your profile verification."
                                )
                        }
                      />

                      <button 
                        className="w-fit h-full px-6 py-3 rounded-xl bg-[#06C167]"
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/storefront-shop/${formatBusinessNameLink(
                            business?.businessName
                          )}`)
                          setAlertPresent("Url copied to clipboard!");
                          setOpenAlert(true);
                        }}
                      >
                        <BiLinkAlt size={30} color="#fff" />
                      </button>
                    </div>
                  </div>
                  {publishError && (
                    <p className="mt-2 text-sm text-center text-red-600">
                      {publishError}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-2 lg:px-5 mt-3">
              <div className="flex flex-col lg:flex-row w-full justify-between gap-y-5">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-x-3 gap-y-3">
                  <div className="flex gap-3">
                    <div className="w-fit bg-white rounded-full pl-18 pr-20 flex items-center justify-between w-fit border border-neutral-200">
                      <div className="p-2">
                        <IoSearchSharp color="#D6D6D6" size={20} />
                      </div>
                      <div className="flex-1 ml-4">
                        <input
                          // ref={ref}
                          placeholder="Search menu"
                          className="py-2 w-full rounded-full input_text text-md font_regular outline-none"
                          onChange={(e: any) => {
                            if (e.target.value) {
                              setQ(e.target.value);
                            } else {
                              setQ(e.target.value);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-x-3 gap-y-3">
                  <OutlineButton
                    title="Category"
                    extraClasses="!w-4/5 !mx-auto !lg:mx-auto lg:w-52 px-8 py-2 !border-[#06C167] !text-[#06C167]"
                    onClick={() => {
                      openCatModal();
                    }}
                  />

                  <OutlineButton
                    title="Ingredient"
                    extraClasses="!w-4/5 !mx-auto !lg:mx-auto lg:w-52 px-8 py-2 !border-[#06C167] !text-[#06C167]"
                    onClick={() => {
                      openTagsModal();
                    }}
                  />
                  
                  <OutlineButton
                    title="Add Menu"
                    extraClasses="!w-4/5 !mx-auto !lg:mx-auto lg:w-52 px-8 py-2 !border-[#06C167] !text-[#06C167]"
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

              {menu && menu?.length > 0 ? (
                <div className="lg:inline-flex flex-row w-full flex-wrap mt-7 ">
                  {searchFiltered?.map((menu: any) => (
                    <div key={menu?._id} className="lg:w-[31%] mt-7 lg:mr-5">
                      <MenuCard
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
                  type="dropdown"
                  placeholder="Category"
                  name="category"
                  onChange={handleChange}
                  value={values.category}
                  options={dinningMenuCategories}
                  error={errors.category && touched.category && errors.category}
                />

                <Input
                  type="number"
                  placeholder="Price"
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

                {/* <TextArea
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
                /> */}

                <Autocomplete
                  multiple
                  id="ingredients"
                  // name="ingredients"
                  options={dinningMenuTags.map((option) => option.value)}
                  defaultValue={values.ingredients.split(", ")}
                  onChange={(event: any, newValue: any) => {
                    console.log(
                      "Pingredients",
                      values.ingredients,
                      newValue,
                      "seStru= ",
                      newValue.toString().split(",").join(", ")
                    );
                    setFieldValue(
                      "ingredients",
                      newValue.toString().split(",").join(", ")
                    );
                  }}
                  freeSolo
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        key={index}
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Main ingredients"
                      placeholder="Main ingredients"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
                {errors.ingredients && touched.ingredients && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {errors.ingredients}
                  </p>
                )}

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
                          key={day}
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
                  placeholder='Price'
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
                          key={day}
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

          {/* CATEGORY */}
          <Modal
            open={catModal}
            onClose={closeCatModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <div className="flex">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Add a new category
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeCatModal}
                />
              </div>

              <div className="mt-3 w-full h-5/6 relative">
                <TextField
                  sx={{ m: 1 }}
                  variant="outlined"
                  className="w-full"
                  label="Category"
                  id="outlined-adornment-password"
                  onChange={(e: any) => {
                    setCat(e.target.value);
                    console.log(e.target.value);
                  }}
                  value={cat}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <button
                          onClick={handleClickCategory}
                          className="primary_bg_color text-white text-xs rounded-lg py-1 px-2 cursor-pointer"
                        >
                          Add category
                        </button>
                      </InputAdornment>
                    ),
                  }}
                />

                <div className="w-full max-h-96 h-fit py-3 overflow-y-scroll">
                  {dinningMenuCategories?.length > 0 && (
                    <div
                      className="flex flex-row flex-wrap h-fit p-3 rounded my-3 gap-x-1"
                      style={{ maxHeight: "250px" }}
                    >
                      {dinningMenuCategories?.map((cat: any, i: number) => (
                        <div
                          key={cat.label}
                          className="flex flex-row justify-between bg-gray-200 items-center w-fit h-fit py-2 px-1 my-1 gap-x-1 rounded-full"
                        >
                          <div className="flex flex-row justify-between items-center">
                            <div className="ml-3 flex flex-row justify-between items-center">
                              <p className="text-xs font-bold font_regular text-black">
                                {`${cat.value}`}
                              </p>
                            </div>
                          </div>
                          <div>
                            <AiFillCloseCircle
                              size={24}
                              color="#fff"
                              className="cursor-pointer hover:text-red-600"
                              onClick={() => {
                                removeCat(cat);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-10 absolute bottom-0 w-full">
                  <OutlineButton
                    loading={isLoadingCategories}
                    title="Save Categories"
                    extraClasses="w-full p-3 rounded-full px-8 py-2"
                    onClick={() => handleSaveCategory()}
                  />
                </div>
              </div>
            </div>
          </Modal>

          {/* TAGS */}
          <Modal
            open={tagsModal}
            onClose={closeTagsModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <div className="flex">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Add a new Ingredient
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeTagsModal}
                />
              </div>

              <div className="mt-3 w-full h-5/6 relative">
                <TextField
                  sx={{ m: 1 }}
                  variant="outlined"
                  className="w-full"
                  label="Ingredients"
                  id="outlined-adornment-password"
                  onChange={(e: any) => {
                    setTag(e.target.value);
                    console.log(e.target.value);
                  }}
                  value={tag}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <button
                          onClick={handleClickTags}
                          className="primary_bg_color text-white text-xs rounded-lg py-1 px-2 cursor-pointer"
                        >
                          Add ingredient
                        </button>
                      </InputAdornment>
                    ),
                  }}
                />

                <div className="w-full max-h-96 h-fit py-3 overflow-y-scroll">
                  {dinningMenuTags?.length > 0 && (
                    <div
                      className="flex flex-row flex-wrap h-fit p-3 rounded my-3 gap-x-1"
                      style={{ maxHeight: "250px" }}
                    >
                      {dinningMenuTags?.map((cat: any, i: number) => (
                        <div
                          key={cat.label}
                          className="flex flex-row justify-between bg-gray-200 items-center w-fit h-fit py-2 px-1 my-1 gap-x-1 rounded-full"
                        >
                          <div className="flex flex-row justify-between items-center">
                            <div className="ml-3 flex flex-row justify-between items-center">
                              <p className="text-xs font-bold font_regular text-black">
                                {`${cat.value}`}
                              </p>
                            </div>
                          </div>
                          <div>
                            <AiFillCloseCircle
                              size={24}
                              color="#fff"
                              className="cursor-pointer hover:text-red-600"
                              onClick={() => {
                                removeTag(cat);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-10 absolute bottom-0 w-full">
                  <OutlineButton
                    loading={isLoadingTags}
                    title="Save Ingredients"
                    extraClasses="w-full p-3 rounded-full px-8 py-2"
                    onClick={() => handleSaveTag()}
                  />
                </div>
              </div>
            </div>
          </Modal>
          
          {/* DELIVERY */}
          <Modal
            open={deliveryModal}
            onClose={closeDeliveryModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-4/5 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-3 lg:p-7 my-10 outline-none">
              <div className="flex">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Delivery
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeDeliveryModal}
                />
              </div>

              <div className="mt-3 w-full h-5/6 relative">
                

                <div className="flex flex-col items-stretch gap-y-5 w-full h-full px-2 py-3 overflow-y-auto">
                  {menuDelivery?.length > 0 && (
                    menuDelivery?.map((item, i) => (
                      <MenuDelivery key={item._id} menuDelivery={menuDelivery}  setMenuDelivery={setMenuDelivery} closeDeliveryModal={closeDeliveryModal} getMenuDelivery={getMenuDelivery} deliveryItems={item} />
                    ))
                  )}

                  <MenuDelivery menuDelivery={menuDelivery}  setMenuDelivery={setMenuDelivery} closeDeliveryModal={closeDeliveryModal} getMenuDelivery={getMenuDelivery} deliveryItems={false} />
                </div>

                {/* <div className="mt-10 absolute bottom-0 w-full">
                  <OutlineButton
                    loading={isLoadingTags}
                    title="Close"
                    extraClasses="w-full p-3 rounded-full px-8 py-2 !bg-white"
                    onClick={() => closeDeliveryModal()}
                  />
                </div> */}
              </div>
            </div>
          </Modal>

          <Snackbar
            open={openAlert}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
            message={alertPresent}
          />
        </>
      </ChefDashboardLayout>
    </>
  );
};

export default OnlineMenu;
