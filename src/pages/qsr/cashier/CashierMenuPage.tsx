// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import RestaurantDashboardLayout from "../RestaurantDashboardLayout";
import PageTitle from "../../../components/PageTitle";
import OutlineButton from "../../../components/OutlineButton";
import BannerCard from "../../../components/BannerCard";
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
  getDineInMenus,
  updateDineInMenu,
} from "../../../_redux/dinningMenu/dinningMenuAction";
import MenuCard from "../../../components/MenuCard";
import ColoredSpinner from "../../../components/ColoredSpinner";
import { formatBusinessNameLink } from "../../../utils/formatMethods";
import { updateBusinessStatus } from "../../../_redux/business/businessAction";
import TextArea from "../../../components/TextArea";
import { HandleMultipleImagesUpload } from "../../../utils/uploadMultipleImages";
import { DineInNewMenuInputsSchema } from "../../../utils/ValidationSchema";
import {
  Autocomplete,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import {
  DINNING_MENU_CATEGORY_URL,
  DINNING_MENU_TAG_URL,
} from "../../../_redux/urls";
import { SERVER } from "../../../config/axios";
import ChefDashboardLayout from "../../../components/ChefDashboardLayout";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CASHIER_ROUTES, CHEF_ROUTES, QSR_ROUTES } from "../../../routes/routes";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import QsrDashboardLayout from "../../../components/QsrDashboardLayout";
import { IoSearchSharp } from "react-icons/io5";
import { getABusinessRestaurantByName } from "../../../_redux/business/businessCrud";

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

const CashierMenuPage = () => {
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  // const [ingredients, setIngredients] = React.useState<string[]>([]);

  const { cashier } =
    useSelector(
      (state: any) => ({
        cashier: state.cashier.cashier,
      }),
      shallowEqual
    );

  const [chef, setChef] = useState<any>(null);

  const getChef = async () => {
      setIsLoading(true);
      try {
        const businessRestaurant = await getABusinessRestaurantByName(
          cashier.businessName,
          false
        );
  
        if (businessRestaurant.data) {
          setChef(businessRestaurant.data.data);
        }
      } catch (error) {
        console.log("error= ", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      getChef();
    }, []);

  const [q, setQ] = useState("");

  const searchFiltered =
    q === ""
      ? chef?.menu
      : chef?.menu.filter(
          (item: any) =>
            item?.category?.toString().toLowerCase().indexOf(q.toLowerCase()) >
              -1 ||
            item?.foodName?.toString().toLowerCase().indexOf(q.toLowerCase()) >
              -1 ||
            item?.description
              ?.toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
        );

  return (
    <>
      <QsrDashboardLayout>
        <>
          <div className="w-full px-2 lg:px-6 py-4">
            <div className="lg:flex flex-row w-full justify-start">
                <Link to={CASHIER_ROUTES.linkCashier}>
                    <div className="flex flex-row items-center cursor-pointer">
                        <MdOutlineArrowBackIosNew size={20} className="mr-3" />
                        <PageTitle title="Back" />
                    </div>
                </Link>
                
                {/* {business && (
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
                        extraClasses={
                            user?.image &&
                            user?.phoneNumber &&
                            user?.address &&
                            user?.bio
                            ? ""
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
                    </div>
                    {publishError && (
                        <p className="mt-2 text-sm text-center text-red-600">
                        {publishError}
                        </p>
                    )}
                    </div>
                )} */}
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
              {chef?.menu && chef?.menu?.length > 0 ? (
                <>
                  <div className="inline-flex flex-col lg:flex-row w-full justify-between gap-y-3">
                    <div className="inline-flex flex-row">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-3 lg:gap-y-0 lg:gap-x-5">
                            <div className="w-full lg:w-fit flex flex-row justify-between items-center lg:justify-start lg:gap-x-5">

                                <h1 className="text-xl text-black font_medium mt-1.5 text-center lg:text-start w-full lg:w-fit">
                                    Menu board
                                </h1>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-fit bg-white rounded-full pl-18 pr-5 flex items-center justify-between border border-neutral-200">
                                    <div className="p-2">
                                        <IoSearchSharp color="#D6D6D6" size={20} />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <input
                                            placeholder="Search menu"
                                            className="py-2 w-full lg:w-64 rounded-full input_text text-md font_regular outline-none"
                                            value={q}
                                            onChange={(e: any) => {
                                            setQ(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="lg:inline-flex flex-row w-full  flex-wrap mt-7 ">
                    {searchFiltered?.map((menu: any) => (
                      <div key={menu?._id} className="lg:w-[31%] mt-7 lg:mr-5">
                        <MenuCard
                          menu={menu}
                          mode={"qsrCashier"}
                          getChef={getChef}
                          chefId={chef?.profile?._id}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <h2 className="text-xl input_text mb-3 text-center">
                    You have not added a menu.
                  </h2>
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2 lg:gap-y-0 lg:gap-x-3">
                    <OutlineButton
                      title="Contact an Admin or logout and log back in..."
                      extraClasses="w-fit px-8 py-2 text-wrap"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      </QsrDashboardLayout>
    </>
  );
};

export default CashierMenuPage;
