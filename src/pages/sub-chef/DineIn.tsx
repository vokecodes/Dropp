// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import RestaurantDashboardLayout from "./RestaurantDashboardLayout";
import PageTitle from "../../components/PageTitle";
import OutlineButton from "../../components/OutlineButton";
import BannerCard from "../../components/BannerCard";
import Button from "../../components/Button";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import Input from "../../components/CustomInput";
import { BiImages } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import { DineInNewMenuValues } from "../../utils/FormInitialValue";
import { useFormik } from "formik";
import Dropdown from "../../components/Dropdown";
import { useAppDispatch } from "../../redux/hooks";
import {
  addDineInMenu,
  getDineInMenus,
  updateDineInMenu,
} from "../../_redux/dinningMenu/dinningMenuAction";
import MenuCard from "../../components/MenuCard";
import ColoredSpinner from "../../components/ColoredSpinner";
import { formatBusinessNameLink } from "../../utils/formatMethods";
import { updateBusinessStatus } from "../../_redux/business/businessAction";
import TextArea from "../../components/TextArea";
import { HandleMultipleImagesUpload } from "../../utils/uploadMultipleImages";
import { DineInNewMenuInputsSchema } from "../../utils/ValidationSchema";
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

const discountOptions = [
  { value: "5", label: "5% Discount" },
  { value: "10", label: "10% Discount" },
  { value: "15", label: "15% Discount" },
  { value: "20", label: "20% Discount" },
];

const DineIn = () => {
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  const {
    error,
    loading,
    table,
    dinningMenu,
    business,
    businessLoading,
    user,
  } = useSelector(
    (state: any) => ({
      business: state.business.business,
      businessLoading: state.business.loading,
      table: state.table.table,
      dinningMenu: state.dinningMenu.dinningMenu,
      loading: state.dinningMenu.loading,
      error: state.dinningMenu.error,
      user: state.user.user,
    }),
    shallowEqual
  );

  const [editMenu, setEditMenu] = useState<any>();

  const [menuModal, setMenuModal] = useState(false);
  const openMenuModal = () => setMenuModal(true);
  const closeMenuModal = () => {
    setEditMenu("");
    setMenuModal(false);
  };

  const [catModal, setCatModal] = useState(false);
  const openCatModal = () => setCatModal(true);
  const closeCatModal = () => {
    setCatModal(false);
  };

  useEffect(() => {
    dispatch(getDineInMenus());
  }, []);

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
        await dispatch(updateDineInMenu(values, editMenu?._id, closeMenuModal));
      } else {
        await dispatch(addDineInMenu(values, closeMenuModal));
      }
      console.log("dfvgbdfgb", values);
      setEditMenu("");
    },
  });

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

  const [cat, setCat] = useState("");
  const [categories, setCategories] = useState([]);

  const handleClickCategory = (e: any) => {
    if (cat) {
      setCategories([...categories, { label: cat, value: cat }]);
      setCat("");
    }
    console.log("cat= ", cat);
  };

  const removeCat = () => {
    console.log("rm");
  };

  console.log("menus= ", dinningMenu);

  // const tables = [
  //   {
  //       id: 0,
  //       name: 'table 1',
  //       orders: 10,
  //   },
  //   {
  //       id: 1,
  //       name: 'table 2',
  //       orders: 10,
  //   },
  //   {
  //       id: 2,
  //       name: 'table 3',
  //       orders: 10,
  //   },
  //   {
  //       id: 3,
  //       name: 'table 4',
  //       orders: 10,
  //   },
  //   {
  //       id: 0,
  //       name: 'table 1',
  //       orders: 10,
  //   },
  //   {
  //       id: 1,
  //       name: 'table 2',
  //       orders: 10,
  //   },
  //   {
  //       id: 2,
  //       name: 'table 3',
  //       orders: 10,
  //   },
  //   {
  //       id: 3,
  //       name: 'table 4',
  //       orders: 10,
  //   },
  //   {
  //       id: 0,
  //       name: 'table 1',
  //       orders: 10,
  //   },
  //   {
  //       id: 1,
  //       name: 'table 2',
  //       orders: 10,
  //   },
  //   {
  //       id: 2,
  //       name: 'table 3',
  //       orders: 10,
  //   },
  //   {
  //       id: 3,
  //       name: 'table 4',
  //       orders: 10,
  //   },
  //   {
  //       id: 0,
  //       name: 'table 1',
  //       orders: 10,
  //   },
  //   {
  //       id: 1,
  //       name: 'table 2',
  //       orders: 10,
  //   },
  //   {
  //       id: 2,
  //       name: 'table 3',
  //       orders: 10,
  //   },
  //   {
  //       id: 3,
  //       name: 'table 4',
  //       orders: 10,
  //   },
  //   {
  //       id: 0,
  //       name: 'table 1',
  //       orders: 10,
  //   },
  //   {
  //       id: 1,
  //       name: 'table 2',
  //       orders: 10,
  //   },
  //   {
  //       id: 2,
  //       name: 'table 3',
  //       orders: 10,
  //   },
  //   {
  //       id: 3,
  //       name: 'table 4',
  //       orders: 10,
  //   },
  // ]

  const COOKING = [
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
  ];

  const PICKUP = [
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
  ];

  const READY = [
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
  ];

  const COMPLETED = [
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
    {
      name: "Asaro ememi",
      portion: "2",
    },
  ];

  // useEffect(() => {
  //   let startY: any;
  //   let startX: any;
  //   let scrollLeft: any;
  //   let scrollTop: any;
  //   let isDown: any;

  //   ref.current.scrollLeft += 1000;

  //   function mouseIsDown(e: MouseEvent){
  //     console.log('first1')
  //     isDown = true;
  //     startY = e.pageY - ref.current.offsetTop;
  //     startX = e.pageX - ref.current.offsetLeft;
  //     scrollLeft = ref.current.scrollLeft;
  //     scrollTop = ref.current.scrollTop;
  //     // console.log('e= ', e.target.pageX, e.currentTarget.pageX)
  //   }

  //   function mouseUp(e: MouseEvent){
  //     console.log('first2')
  //     isDown = false;
  //   }

  //   function mouseLeave(e: MouseEvent){
  //     console.log('first3')
  //     isDown = false;
  //   }

  //   function mouseMove(e: MouseEvent){
  //     if(isDown){
  //       e.preventDefault();
  //       //Move vertcally
  //       const y = e.pageY - ref.current.offsetTop;
  //       const walkY = y - startY;
  //       ref.current.scrollTop = scrollTop - walkY;

  //       //Move Horizontally
  //       const x = e.pageX - ref.current.offsetLeft;
  //       const walkX = x - startX;
  //       ref.current.scrollLeft = scrollLeft - walkX;
  //       console.log('first4', y, x, walkY, walkX)
  //     }
  //   }

  //   ref.current.addEventListener('mousedown', mouseIsDown);
  //   ref.current.addEventListener('mouseup', mouseUp)
  //   ref.current.addEventListener('mouseleave', mouseLeave);
  //   ref.current.addEventListener('mousemove', mouseMove);

  //   return () => {
  //     ref?.current?.removeEventListener("mousedown", mouseIsDown);
  //     ref?.current?.removeEventListener("mouseup", mouseUp);
  //     ref?.current?.removeEventListener("mouseleave", mouseLeave);
  //     ref?.current?.removeEventListener("mousemove", mouseMove);
  //   };
  // }, [ref])

  console.log("table= ", table);

  return (
    <>
      <RestaurantDashboardLayout>
        <>
          <div className="w-full px-6 py-4">
            <div className="lg:flex flex-row w-full justify-between">
              <PageTitle
                title="Orders"
                extraClasses="text-center lg:text-start mb-3 lg:mb-0"
              />
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
              <div className="flex flex-col items-center justify-start gap-y-4">
                <div className="w-full h-fit py-1">
                  {tables.length > 0 && (
                    <div
                      className="flex flex-row h-fit w-full px-2 pb-1 rounded my-1 gap-x-3 overflow-x-scroll"
                      style={{ maxHeight: "250px" }}
                    >
                      <div className="flex flex-row justify-between bg-gray-200 items-center w-fit h-fit py-2 px-3 my-1 gap-x-2 rounded-full shrink-0 cursor-pointer">
                        <div className="flex flex-row justify-between items-center">
                          <div className="ml-1 flex flex-row justify-between items-center">
                            <p className="text-xs font-bold font_regular text-black">
                              All
                            </p>
                          </div>
                        </div>
                        <p className="h-fit w-fit rounded-full px-2 bg-white">
                          <span className="primary_txt_color font_regular text-xs">
                            40
                          </span>
                        </p>
                      </div>
                      {table.map((cat: any, i: number) => (
                        <div
                          key={cat.id}
                          className="flex flex-row justify-between bg-gray-200 items-center w-fit h-fit py-2 px-2 my-1 gap-x-1 rounded-full shrink-0 cursor-pointer"
                        >
                          <div className="flex flex-row justify-between items-center">
                            <div className="ml-1 flex flex-row justify-between items-center">
                              <p className="text-xs font-bold font_regular text-black">
                                {`${cat.name}`}
                              </p>
                            </div>
                          </div>
                          <p className="h-fit w-fit rounded-full px-2 bg-white">
                            <span className="primary_txt_color font_regular text-xs">
                              {cat.orders}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  ref={ref}
                  className="w-full h-full overflow-x-scroll cursor-grab active:cursor-grabbing rotate-180"
                >
                  <div className="flex flex-row w-fit h-full gap-x-3 -rotate-180 pt-3">
                    {/* COOKING */}
                    <div className="flex flex-col items-center justify-start gap-y-3 w-72 h-full min-h-screen max-h-screen overflow-y-scroll bg-gray-100 rounded-xl pb-3">
                      <div className="w-full px-3 py-3">
                        <p className="text-start font_medium">New orders</p>
                      </div>

                      {COOKING.map((order: any, i: number) => (
                        <div className="w-11/12 mx-auto">
                          <div className="flex flex-col justify-center gap-y-4 bg-white px-2 py-4 rounded-lg">
                            <div className="w-full flex flex-row items-center justify-between gap-x-2">
                              <div className="flex flex-row items-center justify-between gap-x-2">
                                <div className="h-fit w-fit rounded-full">
                                  <img
                                    src="/img/food.png"
                                    className="w-9 h-auto"
                                    alt="food"
                                  />
                                </div>
                                <div className="font_bold text-sm space-y-2">
                                  <p>{order.name}</p>
                                  <p>{order.portion} portion</p>
                                </div>
                              </div>
                              <div className="shrink-0">
                                <button className="bg-gray-200 text-xs px-2 py-1 rounded-2xl font_bold primary_txt_color bg_pink">
                                  Details
                                </button>
                              </div>
                            </div>
                            <div className="w-full h-fit">
                              <button className="font_bold w-full rounded-lg py-3 bg-gray-200 text-sm">
                                Start cooking
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* PICKUP */}
                    <div className="flex flex-col items-center justify-start gap-y-3 w-72 h-full min-h-screen max-h-screen overflow-y-scroll bg-gray-100 rounded-xl pb-3">
                      <div className="w-full px-3 py-3">
                        <p className="text-start font_medium">Cooking</p>
                      </div>

                      {PICKUP.map((order: any, i: number) => (
                        <div className="w-11/12 mx-auto">
                          <div className="flex flex-col justify-center gap-y-4 bg-white px-2 py-4 rounded-lg">
                            <div className="w-full flex flex-row items-center justify-between gap-x-2">
                              <div className="flex flex-row items-center justify-between gap-x-2">
                                <div className="h-fit w-fit rounded-full">
                                  <img
                                    src="/img/food.png"
                                    className="w-9 h-auto"
                                    alt="food"
                                  />
                                </div>
                                <div className="font_bold text-sm space-y-2">
                                  <p>{order.name}</p>
                                  <p>{order.portion} portion</p>
                                </div>
                              </div>
                              <div className="shrink-0">
                                <button className="bg-gray-200 text-xs px-2 py-1 rounded-2xl font_bold primary_txt_color bg_pink">
                                  Details
                                </button>
                              </div>
                            </div>
                            <div className="w-full h-fit">
                              <button className="font_bold w-full rounded-lg py-3 primary_txt_color bg_pink text-sm">
                                Ready to pickup
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* READY */}
                    <div className="flex flex-col items-center justify-start gap-y-3 w-72 h-full min-h-screen max-h-screen overflow-y-scroll bg-gray-100 rounded-xl pb-3">
                      <div className="w-full px-3 py-3">
                        <p className="text-start font_medium">New orders</p>
                      </div>

                      {READY.map((order: any, i: number) => (
                        <div className="w-11/12 mx-auto">
                          <div className="flex flex-col justify-center gap-y-4 bg-white px-2 py-4 rounded-lg">
                            <div className="w-full flex flex-row items-center justify-between gap-x-2">
                              <div className="flex flex-row items-center justify-between gap-x-2">
                                <div className="h-fit w-fit rounded-full">
                                  <img
                                    src="/img/food.png"
                                    className="w-9 h-auto"
                                    alt="food"
                                  />
                                </div>
                                <div className="font_bold text-sm space-y-2">
                                  <p>{order.name}</p>
                                  <p>{order.portion} portion</p>
                                </div>
                              </div>
                              <div className="shrink-0">
                                <button className="bg-gray-200 text-xs px-2 py-1 rounded-2xl font_bold primary_txt_color bg_pink">
                                  Details
                                </button>
                              </div>
                            </div>
                            <div className="w-full h-fit">
                              <button className="font_bold w-full rounded-lg py-3 text-green-600 bg-green-200 text-sm">
                                Start cooking
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* COMPLETED */}
                    <div className="flex flex-col items-center justify-start gap-y-3 w-72 h-full min-h-screen max-h-screen overflow-y-scroll bg-gray-100 rounded-xl pb-3">
                      <div className="w-full px-3 py-3">
                        <p className="text-start font_medium">Completed</p>
                      </div>

                      {COMPLETED.map((order: any, i: number) => (
                        <div className="w-11/12 mx-auto">
                          <div className="flex flex-col justify-center gap-y-4 bg-white px-2 py-4 rounded-lg">
                            <div className="w-full flex flex-row items-center justify-between gap-x-2">
                              <div className="flex flex-row items-center justify-between gap-x-2">
                                <div className="h-fit w-fit rounded-full">
                                  <img
                                    src="/img/food.png"
                                    className="w-9 h-auto"
                                    alt="food"
                                  />
                                </div>
                                <div className="font_bold text-sm space-y-2">
                                  <p>{order.name}</p>
                                  <p>{order.portion} portion</p>
                                </div>
                              </div>
                              <div className="shrink-0">
                                <button className="bg-gray-200 text-xs px-2 py-1 rounded-2xl font_bold primary_txt_color bg_pink">
                                  Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </RestaurantDashboardLayout>
    </>
  );
};

export default DineIn;
