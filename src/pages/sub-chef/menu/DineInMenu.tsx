// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PageTitle from "../../../components/PageTitle";
import OutlineButton from "../../../components/OutlineButton";
import Button from "../../../components/Button";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import Input from "../../../components/CustomInput";
import { BiImages } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import { DineInNewMenuValues } from "../../../utils/FormInitialValue";
import { useFormik } from "formik";
import Dropdown from "../../../components/Dropdown";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addDineInMenu,
  getSubChefDineInMenus,
  subChefAddDineInMenu,
  subChefUpdateDineInMenu,
  updateDineInMenu,
} from "../../../_redux/dinningMenu/dinningMenuAction";
import MenuCard from "../../../components/MenuCard";
import ColoredSpinner from "../../../components/ColoredSpinner";
import TextArea from "../../../components/TextArea";
import { HandleMultipleImagesUpload } from "../../../utils/uploadMultipleImages";
import { DineInNewMenuInputsSchema } from "../../../utils/ValidationSchema";
import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import ChefDashboardLayout from "../../../components/ChefDashboardLayout";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { SUB_CHEF_ROUTES } from "../../../routes/routes";
import {
  getSubChefDineInMenuCategories,
  updateSubChefDineInMenuCategories,
} from "../../../_redux/dinningMenu/dinningMenuCrud";
import SubMenuCard from "../../../components/SubMenuCard";
import {
  getSubBusiness,
  updateSubBusinessStatus,
} from "../../../_redux/business/businessAction";
import { formatBusinessNameLink } from "../../../utils/formatMethods";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, ingredients: readonly string[], theme: Theme) {
  return {
    fontWeight:
      ingredients.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const discountOptions = [
  { value: "5", label: "5% Discount" },
  { value: "10", label: "10% Discount" },
  { value: "15", label: "15% Discount" },
  { value: "20", label: "20% Discount" },
];

const DineInMenu = () => {
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { error, loading, dinningMenu, business, businessLoading } =
    useSelector(
      (state: any) => ({
        dinningMenu: state.dinningMenu.dinningMenu,
        loading: state.dinningMenu.loading,
        error: state.dinningMenu.error,
        business: state.business.business,
        businessLoading: state.business.loading,
      }),
      shallowEqual
    );

  const [editMenu, setEditMenu] = useState<any>();
  const [copyMenu, setCopyMenu] = useState<any>();

  const [menuModal, setMenuModal] = useState(false);
  const openMenuModal = () => setMenuModal(true);
  const closeMenuModal = () => {
    setEditMenu("");
    setMenuModal(false);
  };

  const [copyMenuModal, setCopyMenuModal] = useState(false);
  const openCopyMenuModal = () => {
    setCopyMenuModal(true);
  };
  const closeCopyMenuModal = () => {
    setCopyMenu("");
    setCopyMenuModal(false);
  };

  const [catModal, setCatModal] = useState(false);
  const openCatModal = () => setCatModal(true);
  const closeCatModal = () => {
    setCatModal(false);
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
    initialValues: DineInNewMenuValues,
    validationSchema: DineInNewMenuInputsSchema,
    onSubmit: async () => {
      if (editMenu) {
        await dispatch(
          subChefUpdateDineInMenu(values, editMenu?._id, closeMenuModal)
        );
      } else if (copyMenu) {
        const copiedValues = (({
          foodName,
          price,
          category,
          portion,
          minimumQuantity,
          description,
          ingredients,
          note,
          images,
        }) => ({
          foodName,
          price,
          category,
          portion,
          minimumQuantity,
          description,
          ingredients,
          note,
          images,
        }))(values);
        await dispatch(subChefAddDineInMenu(copiedValues, closeCopyMenuModal));
      } else {
        await dispatch(subChefAddDineInMenu(values, closeMenuModal));
      }
      setEditMenu("");
      setCopyMenu("");
    },
  });

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
  };

  const removeCat = (cat) => {
    let localMenuCategories = [...dinningMenuCategories];

    localMenuCategories = localMenuCategories.filter(
      (item) => item.value !== cat.value
    );

    setDinningMenuCategories(localMenuCategories);
  };

  const getDinningMenuCategories = async () => {
    try {
      const { data } = await getSubChefDineInMenuCategories();

      if (
        data?.dinningMenuCategory?.categories &&
        data?.dinningMenuCategory?.categories?.length > 0
      ) {
        setDinningMenuCategories(data?.dinningMenuCategory?.categories);
      }
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  const handleSaveCategory = async () => {
    setIsLoadingCategories(true);

    try {
      const { data } = await updateSubChefDineInMenuCategories({
        categories: dinningMenuCategories,
      });

      if (data.success) {
        closeCatModal();
        getDinningMenuCategories();
      }
    } catch (error) {
      alert(error?.response?.data?.message);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const updateBusinessState = (status: string) => {
    dispatch(updateSubBusinessStatus(status));
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
    SERVER.get(DINNING_MENU_TAG_URL)
      .then(({ data }) => {
        if (
          data?.dinningMenuTag?.tags &&
          data?.dinningMenuTag?.tags?.length > 0
        ) {
          setDinningMenuTags(data?.dinningMenuTag?.tags);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveTag = () => {
    setIsLoadingTags(true);
    SERVER.patch(DINNING_MENU_TAG_URL, {
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

  useEffect(() => {
    dispatch(getSubBusiness());
    dispatch(getSubChefDineInMenus());
    getDinningMenuCategories();
  }, []);

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
                          `/preview/restaurant/${formatBusinessNameLink(
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
              {dinningMenu && dinningMenu?.length > 0 ? (
                <>
                  <div className="inline-flex flex-col lg:flex-row w-full justify-between">
                    <div className="inline-flex flex-row">
                      <h1 className="text-xl text-black font_medium mt-1.5 text-center lg:text-start w-full lg:w-fit">
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

                    <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2 lg:gap-y-0 lg:gap-x-3">
                      <OutlineButton
                        title="Add a new menu"
                        extraClasses="w-52 px-8 py-2"
                        onClick={() => {
                          setValues(DineInNewMenuValues);
                          openMenuModal();
                        }}
                      />

                      <Button
                        title="Categories"
                        extraClasses="w-52 px-8 py-2"
                        onClick={() => {
                          openCatModal();
                        }}
                      />
                    </div>
                  </div>
                  <div className="lg:inline-flex flex-row w-full  flex-wrap mt-7 ">
                    {dinningMenu?.map((menu: any) => (
                      <div key={menu?._id} className="lg:w-[31%] mt-7 lg:mr-5">
                        <SubMenuCard
                          menu={menu}
                          mode={"dineIn"}
                          onClickEdit={() => {
                            setEditMenu(menu);
                            openMenuModal();
                            setValues(menu);
                          }}
                          onClickCopy={() => {
                            setCopyMenu(menu);
                            openCopyMenuModal();
                            setValues(menu);
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
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2 lg:gap-y-0 lg:gap-x-3">
                    <OutlineButton
                      title="Add a new menu"
                      extraClasses="w-52 px-8 py-2"
                      onClick={() => {
                        setValues(DineInNewMenuValues);
                        openMenuModal();
                      }}
                    />

                    <Button
                      title="Categories"
                      extraClasses="w-52 px-8 py-2"
                      onClick={() => {
                        openCatModal();
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DINE-IN MENU */}
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

                    {errors.images && (
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
                  placeholder={`Price`}
                  name="price"
                  onChange={(e: any) => {
                    setFieldValue("price", e.target.value);
                  }}
                  value={values.price}
                  error={errors.price && touched.price && errors.price}
                />

                <Dropdown
                  label="Discount (Optional)"
                  options={discountOptions}
                  value={discountValue}
                  onChange={(v: any) => {
                    setDiscountValue(v);
                  }}
                />

                <Input
                  type="text"
                  placeholder="Portion size: E.g plate, 10 liter bowl, 5 liter bowl"
                  name="portion"
                  onChange={handleChange}
                  value={values.portion}
                  error={errors.portion && touched.portion && errors.portion}
                />

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

                <TextArea
                  placeholder="Other notes (Optional)"
                  name="note"
                  onChange={handleChange}
                  value={values.note}
                />

                {error && dinningMenu && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {error}
                  </p>
                )}

                <div className="mt-10">
                  <OutlineButton
                    loading={loading}
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

          {/* COPY DINE-IN MENU */}
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

                    {errors.images && (
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
                  placeholder={`Price`}
                  name="price"
                  onChange={(e: any) => {
                    setFieldValue("price", e.target.value);
                  }}
                  value={values.price}
                  error={errors.price && touched.price && errors.price}
                />

                <Dropdown
                  label="Discount (Optional)"
                  options={discountOptions}
                  value={discountValue}
                  onChange={(v: any) => {
                    setDiscountValue(v);
                  }}
                />

                <Input
                  type="text"
                  placeholder="Portion size: E.g plate, 10 liter bowl, 5 liter bowl"
                  name="portion"
                  onChange={handleChange}
                  value={values.portion}
                  error={errors.portion && touched.portion && errors.portion}
                />

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

                {/* <div>
                  <FormControl sx={{ m: 1 }} className="w-full">
                    <InputLabel id="demo-multiple-chip-label">
                      Main ingredients
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={
                        typeof values.ingredients === "string"
                          ? values.ingredients.split(",")
                          : values.ingredients
                      }
                      onChange={handleChangeTag}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="Main ingredients"
                        />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {dinningMenuTags
                        .map((tag) => tag.value)
                        .map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, ingredients, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div> */}

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

                <TextArea
                  placeholder="Other notes (Optional)"
                  name="note"
                  onChange={handleChange}
                  value={values.note}
                />

                {error && dinningMenu && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {error}
                  </p>
                )}

                <div className="mt-10">
                  <OutlineButton
                    loading={loading}
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
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
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
        </>
      </ChefDashboardLayout>
    </>
  );
};

export default DineInMenu;