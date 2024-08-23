import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Hotjar from "@hotjar/browser";
import Modal from "@mui/material/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AutoComplete from "react-google-autocomplete";
import { FiChevronLeft, FiMenu } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import { MdOutlineClose, MdOutlinePause } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { GiCampCookingPot } from "react-icons/gi";
import { GiCook } from "react-icons/gi";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import { useAppDispatch } from "../../redux/hooks";
import CustomerDashboardLayout from "../../components/CustomerDashboardLayout";
import OutlineButton from "../../components/OutlineButton";
import TextArea from "../../components/TextArea";
import moment from "moment";
import { getABusinessByName } from "../../_redux/business/businessCrud";
import SubscriptionMenuCard from "../../components/SubscriptionMenuCard";
import {
  COMMON_DATE_FORMAT,
  formatPrice,
  formatRemoteAmountKobo,
  handleKeyboardPhoneNumber,
  handlePhoneNumber,
} from "../../utils/formatMethods";
import { CUSTOMER_ROUTES } from "../../routes/routes";
import { addUserCard, getUserCards } from "../../_redux/card/cardAction";
import {
  customerCreateSubscription,
  getCustomerSubscription,
  updateCustomerSubscription,
  getAllSubscriptionChefsAndMenus,
} from "../../_redux/subscription/subscriptionAction";
import Preloader from "../../components/Preloader";
import axios from "axios";
import {
  startLoading,
  stopLoading,
} from "../../_redux/subscription/subscriptionSlice";
import { TRANSACTION_URL, USER_URL } from "../../_redux/urls";
import { getSubscriptionMenus } from "../../_redux/subscriptionMenu/subscriptionMenuAction";
import { logoutSubscriptionMenu } from "../../_redux/subscriptionMenu/subscriptionMenuSlice";
import {
  checkUserFirstSubscription,
  createSubscription,
  createSubscriptionWallet,
} from "../../_redux/subscription/subscriptionCrud";
import ColoredSpinner from "../../components/ColoredSpinner";
import {
  getUserWalletAccount,
  updateProfileUserAccount,
} from "../../_redux/user/userAction";
import TrackGoogleAnalyticsEvent from "../../components/TrackGoogleAnalyticsEvent";
import { getCustomerOrders } from "../../_redux/order/orderAction";
import { Alert, Snackbar, Tooltip } from "@mui/material";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const REGIONS = ["South-West", "South-East", "South", "North", "Others"];

const mealAmount = 1500;
const maximumMeal = 6;
const deliveryAmount = 750;
const defaultWeek = 4;

const CustomerSubscription = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    auth,
    user,
    cards,
    wallet,
    subscription,
    getLoading,
    loading,
    subscriptionError,
    chefsMenus,
    orders,
  } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
      user: state.user.user,
      cards: state.cards.cards,
      wallet: state.user.wallet,
      getLoading: state.subscription.getLoading,
      loading: state.subscription.loading,
      subscriptionError: state.subscription.error,
      subscription: state.subscription.subscription,
      chefsMenus: state.subscription.chefsMenus,
      orders: state.orders.orders,
    }),
    shallowEqual
  );

  const defaultCard = cards?.find((c: any) => c.defaultCard);

  const [step, setStep] = useState(0);
  const [cancelModal, setCancelModal] = useState(false);
  const [mealModal, setMealModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<any>("");
  const [error, setError] = useState<any>("");
  const [dayError, setDayError] = useState<any>("");
  const [mealError, setMealError] = useState<any>("");

  const [selectedRegion, setSelectedRegion] = useState("all");

  const [editSubscription, setEditSubscription] = useState<any>();
  const [editMealModal, setEditMealModal] = useState(false);
  const [editSelectedWeek, setEditSelectedWeek] = useState<any>("");

  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<any>();
  const [walletError, setWalletError] = useState<any>();
  const closePaymentModal = () => setPaymentModal(false);
  const openPaymentModal = () => setPaymentModal(true);

  const [reason, setReason] = useState<any>();

  const closeCancelModal = () => {
    setCancelModal(false);
    setEditSubscription("");
    window.location.reload();
  };
  const openCancelModal = () => setCancelModal(true);

  const openMealModal = (w: any) => {
    setMealModal(true);
    setSelectedWeek(w);
  };

  const closeMealModal = () => {
    setMealModal(false);
    setSelectedWeek("");
    setMealError("");
  };

  const openEditMealModal = (w: any) => {
    setEditMealModal(true);
    console.log("openEditMealModal= ", w);
    setEditSelectedWeek(w);
  };

  const closeEditMealModal = () => {
    setEditMealModal(false);
    setEditSelectedWeek("");
    setMealError("");
  };

  const [editSuccessModal, setEditSuccessModal] = useState(false);
  const openEditSuccessModal = () => {
    setEditSuccessModal(true);
  };

  const closeEditSuccessModal = () => {
    setEditSuccessModal(false);
    setEditSubscription("");
  };

  const [weeks, setWeeks] = useState([
    {
      name: "Week 1",
      day: "",
      menu: [] as any,
    },
    {
      name: "Week 2",
      day: "",
      menu: [] as any,
    },
    {
      name: "Week 3",
      day: "",
      menu: [] as any,
    },
    {
      name: "Week 4",
      day: "",
      menu: [] as any,
    },
  ]);

  const [editWeeks, setEditWeeks] = useState<any[]>([]);

  const prevStep = () => {
    if (step === 0) {
      return;
    }
    setStep(step - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const [startDate, setStartDate] = useState();

  const {
    values,
    setValues,
    handleChange,
    setFieldValue,
    handleSubmit,
    touched,
    errors,
    setFieldError,
  } = useFormik({
    initialValues: {
      meals: 0,
      whatsAppNumber: user?.phoneNumber ? user?.phoneNumber : "",
      startDate: "",
      deliveryAddress: "",
      deliveryAddressLatitude: "",
      deliveryAddressLongitude: "",
      note: "",
    },
    validationSchema: Yup.object().shape({
      meals: Yup.number().min(1, "Meals must be greater than or equal to 1"),
      startDate: Yup.string().required("Start date is required."),
      whatsAppNumber: Yup.string()
        .required("Whatsapp Number is required.")
        .min(11, "Whatsapp Number must be equal to 11"),
      deliveryAddress: Yup.string().required("Delivery address is required."),
    }),
    onSubmit: () => {
      nextStep();
    },
  });

  const handleSelectDays = (w: any, day: any) => {
    const localWeeks = [...weeks];
    const weekIndex = localWeeks.indexOf(w);
    const weekDay = localWeeks[weekIndex].day;

    if (weekDay === day) {
      localWeeks[weekIndex].day = "";
      setWeeks(localWeeks);
      setDayError("");
      return;
    }

    localWeeks[weekIndex].day = day;
    setWeeks(localWeeks);
    setDayError("");
  };

  const handleSelectMenu = (meal: any) => {
    const localWeeks = [...weeks];
    const weekIndex = localWeeks.indexOf(selectedWeek);
    const menu = localWeeks[weekIndex].menu;

    if (menu.includes(meal)) {
      const mealIndex = menu.indexOf(meal);
      menu.splice(mealIndex, 1);
      localWeeks[weekIndex].menu = menu;
      setWeeks(localWeeks);
      setMealError("");
      setError("");
      return;
    }

    // const checkAnotherChefMenu = menu?.filter((m: any) => {
    //   return m.owner !== meal.owner;
    // });

    // if (checkAnotherChefMenu.length > 0) {
    //   localWeeks[weekIndex].menu = [meal];
    //   setWeeks(localWeeks);
    //   setMealError("");
    //   setError("");
    //   return;
    // }

    if (menu.length >= values.meals) {
      setMealError(`You've chosen the week's maximum meal.`);
      return;
    }

    menu.push(meal);
    localWeeks[weekIndex].menu = menu;
    setWeeks(localWeeks);
    setMealError("");
    setError("");
  };

  const handleEditSelectMenu = (meal: any) => {
    const localWeeks = [...editWeeks];
    const weekIndex = localWeeks.findIndex(
      (curWeek) => editSelectedWeek.name === curWeek.name
    );
    const menu = [...localWeeks[weekIndex].menu];

    if (menu.includes(meal)) {
      const mealIndex = menu.indexOf(meal);
      menu.splice(mealIndex, 1);
      localWeeks[weekIndex].menu = menu;
      setEditWeeks(localWeeks);
      const updatedSubscription = { ...editSubscription, weeks: localWeeks };
      setEditSubscription(updatedSubscription);
      setMealError("");
      setError("");
      return;
    }

    if (menu.length >= values.meals) {
      setMealError(`You've selected the maximum meal for the week.`);
      return;
    }

    menu.push(meal);
    const updatedWeek = { ...localWeeks[weekIndex], menu: [...menu] };
    localWeeks[weekIndex] = updatedWeek;
    setEditWeeks(localWeeks);
    const updatedSubscription = { ...editSubscription, weeks: localWeeks };
    setEditSubscription(updatedSubscription);
    setMealError("");
    setError("");
  };

  const handleRemoveMenu = (w: any, meal: any) => {
    const localWeeks = [...weeks];
    const weekIndex = localWeeks.indexOf(w);
    const menu = localWeeks[weekIndex].menu;

    const mealIndex = menu.indexOf(meal);
    menu.splice(mealIndex, 1);
    setWeeks(localWeeks);
  };

  const handleEditRemoveMenu = (w: any, meal: any) => {
    const localWeeks = [...editWeeks];
    const weekIndex = localWeeks.indexOf(w);
    const menu = [...localWeeks[weekIndex].menu];

    const mealIndex = menu.indexOf(meal);
    menu.splice(mealIndex, 1);

    const updatedWeek = { ...localWeeks[weekIndex], menu: [...menu] };
    localWeeks[weekIndex] = updatedWeek;
    setEditWeeks(localWeeks);
    const updatedSubscription = { ...editSubscription, weeks: [...localWeeks] };
    setEditSubscription(updatedSubscription);
  };

  const selectedWeeks = weeks?.filter((w) => w.day).length;

  const selectedMenus = weeks?.filter(
    (w) => w.menu.length >= values.meals
  ).length;

  const selectedEditWeeks = editWeeks?.filter((w) => w.day).length;

  const selectedEditMenus = editWeeks?.filter(
    (w) => w.menu.length >= values.meals
  ).length;

  const [applyDiscount, setApplyDiscount] = useState(false);

  const checkFirstSubscription = async () => {
    const { data } = await checkUserFirstSubscription();

    if (data.success) {
      setApplyDiscount(data.firstSubscription);
    }
  };

  useEffect(() => {
    checkFirstSubscription();
  });

  const planAmount = values.meals
    ? mealAmount * values.meals * defaultWeek + deliveryAmount * defaultWeek
    : 0;

  const totalAmount = values.meals
    ? applyDiscount
      ? ((mealAmount * values.meals * defaultWeek +
          deliveryAmount * defaultWeek) /
          100) *
        90
      : mealAmount * values.meals * defaultWeek + deliveryAmount * defaultWeek
    : 0;

  const noDiscountTotalAmount = values.meals
    ? mealAmount * values.meals * defaultWeek + deliveryAmount * defaultWeek
    : 0;

  const [isLoading, setIsLoading] = useState(false);

  const submitSubscription = async () => {
    setIsLoading(true);

    try {
      const formatWeeks = weeks?.map((w) => {
        return {
          ...w,
          menu: w?.menu?.map((m: any) => m?._id),
        };
      });

      const { data } = await createSubscription({
        ...values,
        weeks: formatWeeks,
        totalAmount,
        planAmount,
      });

      if (data.success) {
        let handler = window.PaystackPop.setup({
          key: import.meta.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
          email: user.email,
          amount: totalAmount * 100,
          // plan: data?.planCode,
          ref: data?.data?._id,
          metadata: {
            transactionType: "SUBSCRIPTION",
            userId: user._id,
          },
          onClose: function () {
            alert("Transaction was not completed, window closed.");
            prevStep();
          },
          callback: function (response: any) {
            closePaymentModal();
            dispatch(getCustomerSubscription());
            TrackGoogleAnalyticsEvent(
              "SUBSCRIPTION_ORDER",
              "Order a meal subscription",
              window.location.pathname + window.location.search,
              {
                subscriptionId: data.data._id,
                subscriptionAmount: totalAmount,
                userId: user._id,
              }
            );
            TrackGoogleAnalyticsEvent(
              "purchase",
              "Purchase",
              window.location.pathname + window.location.search,
              {
                orderId: data.data._id,
                subscriptionAmount: totalAmount,
                userId: user._id,
              }
            );
            Hotjar.event("SUBSCRIPTION_ORDER");
          },
        });

        handler.openIframe();
      }
    } catch (error: any) {
      setWalletError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const submitSubscriptionWallet = async () => {
    setIsLoading(true);

    try {
      const formatWeeks = weeks?.map((w) => {
        return {
          ...w,
          menu: w?.menu?.map((m: any) => m?._id),
        };
      });

      const { data } = await createSubscriptionWallet({
        ...values,
        weeks: formatWeeks,
        totalAmount,
        planAmount,
      });

      if (data.success) {
        closePaymentModal();
        dispatch(getCustomerSubscription());
        TrackGoogleAnalyticsEvent(
          "SUBSCRIPTION_ORDER",
          "Order a meal subscription",
          window.location.pathname + window.location.search,
          {
            subscriptionId: data.data._id,
            amount: totalAmount,
            userId: user._id,
          }
        );
        TrackGoogleAnalyticsEvent(
          "purchase",
          "Purchase",
          window.location.pathname + window.location.search,
          {
            orderId: data.data._id,
            subscriptionAmount: totalAmount,
            userId: user._id,
          }
        );
        Hotjar.event("SUBSCRIPTION_ORDER");
      }
    } catch (error: any) {
      console.log("njeks", error, error?.response?.data);

      setWalletError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = () => {
    if (!reason) {
      setError("Kindly provide a reason why you are cancelling.");
      return;
    }

    setError("");

    const formatWeeks = subscription?.weeks?.map((w: any) => {
      return {
        ...w,
        status: w.status === "delivered" ? w.status : "canceled",
      };
    });

    dispatch(
      updateCustomerSubscription(
        subscription?._id,
        { status: "canceled", reason, weeks: formatWeeks },
        closeCancelModal
      )
    );
  };

  const pauseSubscription = (status: string) => {
    const formatWeeks = subscription?.weeks?.map((w: any) => {
      return {
        ...w,
        status: w.status === "delivered" ? w.status : "paused",
      };
    });

    dispatch(
      updateCustomerSubscription(
        subscription?._id,
        { status: "paused", weeks: formatWeeks },
        closeCancelModal
      )
    );
  };

  const activateSubscription = (status: string) => {
    const formatWeeks = subscription?.weeks?.map((w: any) => {
      return {
        ...w,
        status: w.status === "paused" ? "processed" : w.status,
      };
    });

    dispatch(
      updateCustomerSubscription(
        subscription?._id,
        {
          status,
          startDate: new Date().toISOString().split("T")[0],
          weeks: formatWeeks,
        },
        closeCancelModal
      )
    );
  };

  const handleEditSubscription = () => {
    if (subscription?.status !== "active") {
      alert("Cant edit an inactive subscription.");
      return;
    }

    setEditSubscription(subscription);
    setEditWeeks(subscription.weeks);

    setValues({
      ...values,
      meals: subscription.meals,
      startDate: subscription.startDate,
      deliveryAddress: subscription.deliveryAddress,
      deliveryAddressLatitude: subscription.deliveryAddressLatitude,
      deliveryAddressLongitude: subscription.deliveryAddressLongitude,
      whatsAppNumber: subscription.whatsAppNumber,
      note: subscription.note,
    });

    setStep(0);
  };

  const handleEditSelectDays = (w: any, day: any) => {
    const localWeeks = [...editWeeks];
    const weekIndex = localWeeks.indexOf(w);
    const weekDay = localWeeks[weekIndex].day;

    if (weekDay === day) {
      const updatedWeek = { ...localWeeks[weekIndex], day: "" };

      localWeeks[weekIndex] = updatedWeek;
      setEditWeeks(localWeeks);
      const updatedSubscription = { ...editSubscription, weeks: localWeeks };
      setEditSubscription(updatedSubscription);
      console.log(updatedSubscription);

      setDayError("");
      return;
    }

    const updatedWeek = { ...localWeeks[weekIndex], day: day };
    localWeeks[weekIndex] = updatedWeek;
    setEditWeeks(localWeeks);
    const updatedSubscription = { ...editSubscription, weeks: localWeeks };
    setEditSubscription(updatedSubscription);
    setDayError("");
  };

  const start = moment();
  const end = moment(values?.startDate).add(4, "weeks");
  const weeksToGo = end.diff(start, "weeks");
  const weeksLeft = weeksToGo < 4 ? weeksToGo + 1 : 4;

  const updateSubscribeMenu = () => {
    if (selectedEditWeeks < weeksLeft || selectedEditMenus < weeksLeft) {
      setError(
        `You need to select a minimum of ${values.meals} meal${
          values.meals > 1 ? "s" : ""
        } weekly.`
      );
      return;
    }

    const formatWeeks = editWeeks?.map((w) => {
      return {
        ...w,
        menu: w?.menu?.map((m: any) => m?._id),
      };
    });

    dispatch(
      updateCustomerSubscription(
        subscription?._id,
        { ...values, weeks: formatWeeks, totalAmount },
        openEditSuccessModal
      )
    );
  };

  const handleContinueToPayment = () => {
    if (selectedWeeks < 4 || selectedMenus < 4) {
      setError(
        `You need to select a minimum of ${values.meals} meal${
          values.meals > 1 ? "s" : ""
        } weekly.`
      );
      return;
    }

    setWalletError("");
    openPaymentModal();
  };

  const handleWalletPayment = () => {
    if (totalAmount > wallet?.balance) {
      setWalletError("Insufficient wallet balance.");
      return;
    } else {
      submitSubscriptionWallet();
    }
  };

  const handlePayment = () => {
    if (selectedPaymentOption === "other") {
      submitSubscription();
    } else {
      handleWalletPayment();
    }
  };

  useEffect(() => {
    dispatch(getUserCards());
    dispatch(getCustomerOrders());
    dispatch(getCustomerSubscription());
    dispatch(getAllSubscriptionChefsAndMenus());
    dispatch(getUserWalletAccount());
  }, []);

  const [alertPresent, setAlertPresent] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleWhatsAppNumberAlert = (message: string) => {
    setAlertPresent(message);
    setOpenAlert(true);
  };

  const handleCloseAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleSetWhatsAppNumber = () => {
    console.log("whatsAppNumber= ", values.whatsAppNumber);
    console.log("user Number= ", user?.phoneNumber);

    console.log("values user test= ", !/\D/g.test(values.whatsAppNumber));

    if (values.whatsAppNumber == user?.phoneNumber) {
      setAlertPresent("Whatsapp number has not been changed!");
      setOpenAlert(true);
      return;
    } else if (!values.whatsAppNumber) {
      setAlertPresent("Whatsapp number has not been set!");
      setOpenAlert(true);
      return;
    } else if (/\D/g.test(values.whatsAppNumber)) {
      setAlertPresent("Whatsapp number contains non-digits");
      setOpenAlert(true);
      return;
    } else if (values.whatsAppNumber.length !== 11) {
      setAlertPresent("Whatsapp number must contain 11 digits");
      setOpenAlert(true);
      return;
    }

    console.log("values user= ", {
      phoneNumber: values.whatsAppNumber,
      ...user,
    });

    let whatsAppNum = true;

    dispatch(
      updateProfileUserAccount(
        USER_URL,
        { phoneNumber: values.whatsAppNumber, ...values },
        setAlertPresent,
        handleWhatsAppNumberAlert
      )
    );
  };

  // useEffect(() => {
  //   console.log('errors= ', errors)
  //   console.log('touched= ', touched)
  // }, [touched, errors]);

  const editStartDate = moment(values?.startDate)
    .subtract(3, "days")
    .isAfter(moment());

  return (
    <>
      <CustomerDashboardLayout>
        <div className="w-full px-6 py-4">
          <PageTitle title="Subscription" />

          <div className="my-5 bg-white rounded-3xl p-10">
            {editSubscription ? (
              <div className="w-full">
                {step === 0 && (
                  <div>
                    <div className="h-28 primary_bg_color rounded-2xl pl-8 flex items-center">
                      <div className="w-1/3">
                        <p className="text-white text-2xl font_bold">
                          10% discount on
                        </p>
                        <p className="text-white text-2xl font_medium">
                          your first subscription.
                        </p>
                      </div>
                      <div className="w-2/3">
                        <img
                          src="/images/sub_banner.png"
                          alt="sub-banner"
                          className="w-full h-28 object-cover rounded-r-2xl"
                        />
                      </div>
                    </div>

                    <div className="mt-10 lg:w-96">
                      {/* NUMBER OF MEALS */}
                      <div className="mb-2">
                        <label className="text-sm secondary_gray_color">
                          Number of meals per week?
                        </label>

                        <div className="relative mt-1 w-full flex items-center bg_gray_sub py-3 px-4 rounded-md outline-none">
                          <div
                            className="w-8 h-8 bg_counter_sub rounded-md flex justify-center items-center cursor-pointer"
                            onClick={() => {
                              if (values.meals <= 0) {
                                return;
                              }
                              let value = values.meals - 1;
                              setFieldValue("meals", value);
                            }}
                          >
                            <p className="text-black text-2xl font_bold">-</p>
                          </div>
                          <div className="flex-1">
                            <p className="text-black text-sm  text-center font_bold">
                              {values.meals}{" "}
                              {`meal${values.meals > 0 ? "s" : ""}`}
                            </p>
                          </div>
                          <div
                            className="w-8 h-8 bg_counter_sub rounded-md flex justify-center items-center cursor-pointer"
                            onClick={() => {
                              if (values.meals >= maximumMeal) return;
                              let value = values.meals + 1;
                              setFieldValue("meals", value);
                            }}
                          >
                            <p className="text-black text-2xl font_bold">+</p>
                          </div>

                          <div
                            className={`${
                              !editStartDate
                                ? "absolute top-0 left-0 right-0 bottom-0 bg-neutral-400/30 cursor-not-allowed block"
                                : "hidden"
                            }`}
                          ></div>
                        </div>

                        {errors.meals &&
                          editSubscription.meals !== values.meals && (
                            <p className="text-sm text-red-500 text-center">
                              {errors.meals}
                            </p>
                          )}
                        <div
                          className={`${
                            !editStartDate ? "block px-2 lg:px-5" : "hidden"
                          }`}
                        >
                          <p className="text-red-600 font_medium text-sm font-bold">
                            You cannot edit Number of meals because this
                            subscription has started!
                          </p>
                        </div>
                      </div>

                      {/* START DATE */}
                      <div
                        className={`mb-2 ${
                          editStartDate ? "" : "cursor-not-allowed"
                        }`}
                      >
                        <label
                          className={`text-sm secondary_gray_color ${
                            editStartDate ? "" : "cursor-not-allowed"
                          }`}
                        >
                          Start date?
                        </label>
                        <input
                          type="date"
                          value={values.startDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={handleChange("startDate")}
                          className={`mt-1 w-full block bg_gray_sub text-black text-sm font_medium py-3 px-4 rounded-md outline-none ${
                            editStartDate ? "" : "cursor-not-allowed"
                          }`}
                          disabled={editStartDate ? false : true}
                        />
                        {errors.startDate &&
                          editSubscription.startDate !== values.startDate && (
                            <p className="text-sm text-red-500 text-center">
                              {errors.startDate}
                            </p>
                          )}
                        <div
                          className={`${
                            !editStartDate ? "block px-2 lg:px-5" : "hidden"
                          }`}
                        >
                          <p className="text-red-600 font_medium text-sm font-bold">
                            You cannot edit Start date because this subscription
                            has started!
                          </p>
                        </div>
                      </div>

                      {/* ADDRESS */}
                      <div className="mb-2">
                        <label className="text-sm secondary_gray_color">
                          Delivery address
                        </label>
                        <AutoComplete
                          apiKey={import.meta.env.REACT_APP_GOOGLE_MAPS_KEY}
                          defaultValue={values.deliveryAddress}
                          onPlaceSelected={(place) => {
                            setFieldValue(
                              "deliveryAddress",
                              place.formatted_address
                            );
                            setFieldValue(
                              "deliveryAddressLatitude",
                              place.geometry.location.lat()
                            );
                            setFieldValue(
                              "deliveryAddressLongitude",
                              place.geometry.location.lng()
                            );
                          }}
                          className="mt-1 w-full block bg_gray_sub text-black text-sm font_medium py-3 px-4 rounded-md outline-none"
                          language="en"
                          options={{
                            types: ["geocode"],
                            componentRestrictions: { country: "ng" },
                          }}
                        />

                        {errors.deliveryAddress &&
                          editSubscription.deliveryAddress !==
                            values.deliveryAddress && (
                            <p className="text-sm text-red-500 text-center">
                              {errors.deliveryAddress}
                            </p>
                          )}
                      </div>

                      {/* Whatsapp */}
                      <div className="mb-2">
                        <label className="text-sm secondary_gray_color">
                          Whatsapp number
                        </label>
                        <input
                          type="tel"
                          name="whatsAppNumber"
                          value={values.whatsAppNumber}
                          onChange={handleChange("whatsAppNumber")}
                          onKeyUp={handleKeyboardPhoneNumber}
                          className="mt-1 block w-full bg_gray_sub text-black text-sm font_medium py-3 px-4 rounded-md outline-none"
                        />

                        {errors?.whatsAppNumber &&
                          typeof errors.whatsAppNumber === "string" &&
                          editSubscription.whatsAppNumber !==
                            values.whatsAppNumber && (
                            <p className="text-sm text-red-500 text-center">
                              {errors.whatsAppNumber}
                            </p>
                          )}
                      </div>

                      {/* NOTES */}
                      <div className="mb-2">
                        <label className="text-sm secondary_gray_color">
                          Notes (Optional)
                        </label>
                        <input
                          value={values.note}
                          onChange={handleChange("note")}
                          className="mt-1 block w-full bg_gray_sub text-black text-sm font_medium py-3 px-4 rounded-md outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="lg:w-1/2">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => prevStep()}
                    >
                      <FiChevronLeft size={28} color="text-black" />
                      <p className="ml-2 text-xl font_medium text-black">
                        Back
                      </p>
                    </div>
                    <p className="text-lg secondary_gray_color mt-5">
                      Create your weekly meal experience
                    </p>
                    {editSubscription?.weeks.map((w: any, i: number) => {
                      return (
                        <React.Fragment key={i}>
                          <div className={`relative my-5 px-3`}>
                            <div className="border border_inactive mb-3" />
                            <p className="text-lg font_bold gray5_color">
                              {w.name}
                            </p>
                            <p className="text-base font_medium gray5_color mt-2">
                              Select the day you want your food delivered this
                              week
                            </p>
                            <div className="my-3 flex flex-wrap">
                              {DAYS?.map((day: any, num: number) => (
                                <div
                                  key={num}
                                  className="relative w-14 h-14 mb-1 lg:mb-0 mr-2 rounded-full"
                                >
                                  <div
                                    className={`w-14 h-14 rounded-full flex justify-center items-center cursor-pointer ${
                                      w.day === day
                                        ? "primary_bg_color"
                                        : "border sec_red_border_color"
                                    }`}
                                    onClick={() => handleEditSelectDays(w, day)}
                                  >
                                    <p
                                      className={`text-md font_medium cursor-pointer ${
                                        w.day === day ? "text-white" : "red"
                                      }`}
                                    >
                                      {day}
                                    </p>
                                  </div>
                                  <div
                                    className={`${
                                      moment()
                                        .add(3, "days")
                                        .isAfter(
                                          moment(values?.startDate)
                                            .add(i + 1, "weeks")
                                            .add(3, "days")
                                            .day(day)
                                        )
                                        ? "absolute top-0 left-0 right-0 bottom-0 bg-neutral-400/30 rounded-full cursor-not-allowed block"
                                        : "hidden"
                                    }`}
                                  ></div>
                                </div>
                              ))}
                            </div>
                            {!w.day && dayError && (
                              <p className="text-xs text-red-600">{dayError}</p>
                            )}
                            <div
                              className="mt-7 mb-3 sec_primary_bg_color w-40 h-10 rounded-3xl flex items-center pl-5 cursor-pointer"
                              onClick={() => {
                                if (w.day) {
                                  openEditMealModal(w);
                                  return;
                                }
                                setDayError("Pick a day.");
                              }}
                            >
                              <IoIosAddCircleOutline
                                size={18}
                                color="#ec4444"
                              />
                              <p className="ml-1 text-sm font_medium black_shade cursor-pointer">
                                Add a meal
                              </p>
                            </div>
                            <div className="flex flex-wrap">
                              {w?.menu?.length > 0 &&
                                w?.menu?.map((m: any, i: number) => (
                                  <div
                                    key={i}
                                    className="my-3 mr-1 sec_primary_bg_color w-56 h-10 p-2 rounded-3xl flex items-center"
                                  >
                                    <div className="flex-1 flex items-center">
                                      <img
                                        src={m.images[0]}
                                        className="w-8 h-8 rounded-full"
                                        alt="meal"
                                      />
                                      <p className="ml-1 text-xs font_medium black_shade">
                                        {m.foodName}
                                      </p>
                                    </div>
                                    <div
                                      className="w-6 h-6 rounded-full bg-white flex justify-center items-center cursor-pointer"
                                      onClick={() => handleEditRemoveMenu(w, m)}
                                    >
                                      <MdOutlineClose />
                                    </div>
                                  </div>
                                ))}
                            </div>

                            <div
                              className={`${
                                moment(values?.startDate)
                                  .add(i + 1, "weeks")
                                  .day(w?.day)
                                  .subtract(3, "days")
                                  .isBefore(moment()) ||
                                w?.status == "delivered"
                                  ? "absolute top-0 left-0 right-0 bottom-0 bg-neutral-400/10 rounded-xl cursor-not-allowed block"
                                  : "hidden"
                              }`}
                            ></div>
                          </div>

                          <div
                            className={`${
                              moment(values?.startDate)
                                .add(i + 1, "weeks")
                                .day(w?.day)
                                .subtract(3, "days")
                                .isBefore(moment()) || w?.status == "delivered"
                                ? "block px-2 lg:px-5"
                                : "hidden"
                            }`}
                          >
                            <p className="text-red-600 font_medium text-sm font-bold">
                              You cannot edit this week because it is 3 days
                              before the delivery date or it has been delivered!
                            </p>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}

                {step === 0 && (
                  <p className="lg:w-80 my-5 gray_color text-sm font_medium">
                    Note that weekly menu will be delivered at once by
                    <span className="font_bold"> 1 PM</span> on your preferred
                    day of the week.
                  </p>
                )}

                {step === 1 && (
                  <div>
                    <p className="gray_color text-sm font_bold">
                      {values.meals} meal{values.meals > 1 ? "s" : ""} per week
                    </p>
                    <p className="gray_color text-sm font_medium">
                      {moment(values.startDate).format(COMMON_DATE_FORMAT)} -{" "}
                      {moment(values.startDate)
                        .add(4, "weeks")
                        .format(COMMON_DATE_FORMAT)}
                    </p>
                    <p className="gray_color text-sm font_medium">
                      {values.deliveryAddress}
                    </p>
                  </div>
                )}

                <div className="my-5">
                  <p className="primary_txt_color text-4xl font_bold">
                    ₦{formatPrice(totalAmount)}
                  </p>
                  <p className="text-xl gray_color font_medium">Monthly</p>
                </div>

                {error && <p className="my-2 text-xs text-red-600">{error}</p>}

                <Button
                  loading={loading}
                  title="Continue"
                  extraClasses="w-full lg:w-96"
                  onClick={() => {
                    if (step === 0) {
                      handleSubmit();
                      return;
                    }
                    updateSubscribeMenu();
                  }}
                />
              </div>
            ) : (
              <div>
                {getLoading ? (
                  <div className="flex items-center justify-center">
                    <ColoredSpinner heightWidthClasses="w-10 h-10" />
                  </div>
                ) : (
                  <div>
                    {subscription && subscription?.status !== "canceled" ? (
                      <div className="lg:w-1/2">
                        {subscription?.status !== "processing" && (
                          <div className="lg:flex mb-5">
                            <OutlineButton
                              title="Edit subscription"
                              extraClasses="lg:mr-5 mb-5 lg:mb-0"
                              onClick={() => {
                                console.log("editSubscription clicked!!!");
                                handleEditSubscription();
                              }}
                            />
                            <Button
                              loading={loading}
                              title={
                                subscription?.status === "paused"
                                  ? "Activate subscription"
                                  : `Pause subscription`
                              }
                              onClick={
                                subscription?.status === "paused"
                                  ? () => activateSubscription("active")
                                  : () => pauseSubscription("paused")
                              }
                            />
                          </div>
                        )}
                        <div className="border border_inactive my-3" />
                        {subscription?.status === "active" ? (
                          <p className="primary_txt_color text-2xl lg:text-3xl font_bold my-5">
                            Great! Your Homemade monthly subscription is active
                            🥳
                          </p>
                        ) : (
                          <p className="gray_6 text-2xl lg:text-3xl font_bold my-5">
                            Your subscription{" "}
                            {subscription?.status === "canceled"
                              ? `has been ${subscription?.status}`
                              : `is ${subscription?.status}`}
                          </p>
                        )}
                        <div className="border border_inactive my-3" />
                        <div className="my-5">
                          {subscription?.weeks?.length > 0 &&
                            subscription?.weeks?.map((week: any, i: number) => {
                              return (
                                <div className="flex mb-10" key={i}>
                                  <div
                                    className={`w-14 h-14 rounded-full flex justify-center items-center ${
                                      week.status === "canceled"
                                        ? "bg_gray_color"
                                        : "primary_bg_color"
                                    }`}
                                  >
                                    {week.status === "delivered" ? (
                                      <BsCheck size={60} color="#fff" />
                                    ) : week.status === "canceled" ? (
                                      <MdOutlineClose size={40} color="#fff" />
                                    ) : week.status === "paused" ? (
                                      <MdOutlinePause size={40} color="#fff" />
                                    ) : (
                                      <GiCampCookingPot
                                        size={40}
                                        color="#fff"
                                      />
                                    )}
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-lg font_medium gray5_color">
                                      {week?.name} - {week?.day}{" "}
                                      {moment(subscription?.startDate)
                                        .add(i + 1, "weeks")
                                        .day(week?.day)
                                        .format(COMMON_DATE_FORMAT)}
                                    </p>
                                    <div>
                                      {week?.menu?.length > 0 &&
                                        week?.menu?.map(
                                          (meal: any, i: number) => (
                                            <div key={i} className="">
                                              <p className="text-md font_medium black_shade">
                                                {meal?.foodName}
                                              </p>
                                              {/* <div className="mx-2 bg_gray_5 w-2.5 h-2.5 rounded-full" /> */}
                                            </div>
                                          )
                                        )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        <div className="border border_inactive my-3" />
                        <div>
                          <p className="gray_color text-sm font_bold">
                            {subscription?.meals} meals per week
                          </p>
                          <p className="gray_color text-sm font_medium">
                            {moment(subscription?.startDate)
                              .add(1, "weeks")
                              .day(subscription?.weeks[0]?.day)
                              .format(COMMON_DATE_FORMAT)}{" "}
                            -{" "}
                            {moment(subscription.startDate)
                              .add(4, "weeks")
                              .day(subscription?.weeks[3]?.day)
                              .format(COMMON_DATE_FORMAT)}
                          </p>
                          <p className="gray_color text-sm font_medium">
                            {subscription?.deliveryAddress}
                          </p>
                        </div>
                        <div className="my-5">
                          {subscription?.weeks?.length > 0 &&
                            subscription?.weeks?.map((week: any, i: number) => {
                              return (
                                <p
                                  key={i}
                                  className="text-md font_medium gray5_color mb-1"
                                >
                                  {week?.name} - {week?.day}{" "}
                                  {moment(subscription?.startDate)
                                    .add(i + 1, "weeks")
                                    .day(week?.day)
                                    .format(COMMON_DATE_FORMAT)}
                                </p>
                              );
                            })}
                        </div>
                        <div className="my-5">
                          <p className="primary_txt_color text-4xl font_bold">
                            ₦{formatPrice(subscription?.totalAmount)}
                          </p>
                          <p className="text-xl gray_color font_medium">
                            Monthly
                          </p>
                        </div>
                        <div className="border border_inactive my-3" />
                        {subscription?.status !== "canceled" && (
                          <div
                            className="cursor-pointer"
                            onClick={() => openCancelModal()}
                          >
                            <p className="text-base font_medium secondary_gray_color">
                              Cancel subscription
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full">
                        {step === 0 && (
                          <div>
                            <div className="hidden lg:block">
                              <div className=" h-28 primary_bg_color rounded-2xl pl-8 flex items-center">
                                <div className="w-1/3">
                                  <p className="text-white text-2xl font_bold">
                                    10% discount on
                                  </p>
                                  <p className="text-white text-2xl font_medium">
                                    your first subscription.
                                  </p>
                                </div>
                                <div className="w-2/3">
                                  <img
                                    src="/images/sub_banner.png"
                                    alt="sub-banner"
                                    className="w-full h-28 object-cover rounded-r-2xl"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="lg:hidden">
                              <img
                                src="/images/sub_banner_mobile.png"
                                alt="sub-banner"
                                className="w-full object-cover"
                              />
                            </div>
                            <div className="mt-10 lg:w-96">
                              {/* NUMBER OF MEALS */}
                              <div className="mb-2">
                                <label className="text-sm secondary_gray_color">
                                  Number of meals per week?
                                </label>
                                <div className="mt-1 w-full flex items-center bg_gray_sub py-3 px-4 rounded-md outline-none">
                                  <div
                                    className="w-8 h-8 bg_counter_sub rounded-md flex justify-center items-center cursor-pointer"
                                    onClick={() => {
                                      if (values.meals <= 0) {
                                        return;
                                      }
                                      let value = values.meals - 1;
                                      setFieldValue("meals", value);
                                    }}
                                  >
                                    <p className="text-black text-2xl font_bold">
                                      -
                                    </p>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-black text-sm  text-center font_bold">
                                      {values.meals}{" "}
                                      {`meal${values.meals > 1 ? "s" : ""}`}
                                    </p>
                                  </div>
                                  <div
                                    className="w-8 h-8 bg_counter_sub rounded-md flex justify-center items-center cursor-pointer"
                                    onClick={() => {
                                      // if (values.meals >= maximumMeal) return;
                                      let value = values.meals + 1;
                                      setFieldValue("meals", value);
                                    }}
                                  >
                                    <p className="text-black text-2xl font_bold">
                                      +
                                    </p>
                                  </div>
                                </div>
                                {errors.meals && touched.meals && (
                                  <p className="text-sm text-red-500 text-center">
                                    {errors.meals}
                                  </p>
                                )}
                              </div>

                              {/* START DATE */}
                              <div className="w-full mb-2 flex flex-col">
                                <label className="text-sm secondary_gray_color">
                                  Start date
                                </label>

                                <DatePicker
                                  selected={startDate}
                                  onChange={(date: any) => {
                                    setStartDate(date);
                                    setFieldValue(
                                      "startDate",
                                      date.toISOString().split("T")[0]
                                    );
                                  }}
                                  minDate={
                                    new Date(
                                      Date.now() + 2 * 24 * 60 * 60 * 1000
                                    )
                                  }
                                  className="mt-1 w-full block bg_gray_sub text-black text-sm font_medium py-3 px-4 rounded-md outline-none"
                                />
                                {errors.startDate && touched.startDate && (
                                  <p className="text-sm text-red-500 text-center">
                                    {errors.startDate}
                                  </p>
                                )}
                              </div>

                              {/* ADDRESS */}
                              <div className="mb-2">
                                <label className="text-sm secondary_gray_color">
                                  Delivery address
                                </label>
                                <AutoComplete
                                  apiKey={
                                    import.meta.env.REACT_APP_GOOGLE_MAPS_KEY
                                  }
                                  defaultValue={values.deliveryAddress}
                                  onPlaceSelected={(place) => {
                                    setFieldValue(
                                      "deliveryAddress",
                                      place.formatted_address
                                    );
                                    setFieldValue(
                                      "deliveryAddressLatitude",
                                      place.geometry.location.lat()
                                    );
                                    setFieldValue(
                                      "deliveryAddressLongitude",
                                      place.geometry.location.lng()
                                    );
                                    setFieldError("deliveryAddress", "");
                                  }}
                                  className="mt-1 w-full block bg_gray_sub text-black text-sm font_medium py-3 px-4 rounded-md outline-none"
                                  language="en"
                                  options={{
                                    types: ["geocode"],
                                    componentRestrictions: { country: "ng" },
                                  }}
                                />
                                {errors.deliveryAddress &&
                                  touched.deliveryAddress && (
                                    <p className="text-sm text-red-500 text-center">
                                      {errors.deliveryAddress}
                                    </p>
                                  )}
                              </div>

                              {/* Whatsapp */}
                              <div className="mb-2">
                                <label className="text-sm secondary_gray_color">
                                  Whatsapp number
                                </label>

                                <div className="relative mt-1 block w-full bg_gray_sub text-black text-sm font_medium rounded-md outline-none flex flex-row items-center">
                                  <input
                                    type="tel"
                                    className="h-full w-full shrink-0 bg_gray_sub py-3 px-4 outline-none rounded-md"
                                    name="whatsAppNumber"
                                    value={values.whatsAppNumber}
                                    onChange={handleChange("whatsAppNumber")}
                                    onKeyUp={handleKeyboardPhoneNumber}
                                  />

                                  <div className="absolute top-0 right-2 h-full flex flex-row items-center justify-center">
                                    <button
                                      className="w-fit h-fit px-2 lg:px-5 py-1 rounded-lg bg-neutral-200 font_bold text-xs lg:text-base hover:bg-neutral-300"
                                      onClick={handleSetWhatsAppNumber}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>

                                {errors?.whatsAppNumber &&
                                  typeof errors.whatsAppNumber === "string" &&
                                  touched.whatsAppNumber && (
                                    <p className="text-sm text-red-500 text-center">
                                      {errors.whatsAppNumber}
                                    </p>
                                  )}
                              </div>

                              {/* NOTES */}
                              <div className="mb-2">
                                <label className="text-sm secondary_gray_color">
                                  Notes (Optional)
                                </label>
                                <input
                                  value={values.note}
                                  onChange={handleChange("note")}
                                  className="mt-1 block w-full bg_gray_sub text-black text-sm font_medium py-3 px-4 rounded-md outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 1 && (
                          <div className="lg:w-1/2">
                            <div
                              className="flex items-center cursor-pointer"
                              onClick={() => prevStep()}
                            >
                              <FiChevronLeft size={28} color="text-black" />
                              <p className="ml-2 text-xl font_medium text-black">
                                Back
                              </p>
                            </div>
                            <p className="text-lg secondary_gray_color mt-5">
                              Create your weekly meal experience
                            </p>
                            {weeks.map((w, i) => {
                              return (
                                <div className="my-5" key={i}>
                                  <div className="border border_inactive mb-3" />
                                  <p className="text-lg font_bold gray5_color">
                                    {w.name}
                                  </p>
                                  <p className="text-base font_medium gray5_color mt-2">
                                    Select the day you want your food delivered
                                    this week
                                  </p>
                                  <div className="my-3 flex flex-wrap">
                                    {DAYS?.map((day: any, i: number) => (
                                      <div
                                        key={i}
                                        className={`mb-1 lg:mb-0 mr-2 w-14 h-14 rounded-full flex justify-center items-center cursor-pointer ${
                                          w.day === day
                                            ? "primary_bg_color"
                                            : "border sec_red_border_color"
                                        }`}
                                        onClick={() => handleSelectDays(w, day)}
                                      >
                                        <p
                                          className={`text-md font_medium cursor-pointer ${
                                            w.day === day ? "text-white" : "red"
                                          }`}
                                        >
                                          {day}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  {!w.day && dayError && (
                                    <p className="text-xs text-red-600">
                                      {dayError}
                                    </p>
                                  )}
                                  <div
                                    className="mt-7 mb-3 sec_primary_bg_color w-40 h-10 rounded-3xl flex items-center pl-5 cursor-pointer"
                                    onClick={() => {
                                      if (w.day) {
                                        openMealModal(w);
                                        return;
                                      }
                                      setDayError("Pick a day.");
                                    }}
                                  >
                                    <IoIosAddCircleOutline
                                      size={18}
                                      color="#ec4444"
                                    />
                                    <p className="ml-1 text-sm font_medium black_shade cursor-pointer">
                                      Add a meal
                                    </p>
                                  </div>
                                  <div className="flex flex-wrap">
                                    {w?.menu?.length > 0 &&
                                      w?.menu?.map((m: any, i: number) => (
                                        <div
                                          key={i}
                                          className="my-3 mr-1 sec_primary_bg_color w-56 h-10 p-2 rounded-3xl flex items-center"
                                        >
                                          <div className="flex-1 flex items-center">
                                            <img
                                              src={m.images[0]}
                                              className="w-8 h-8 rounded-full"
                                              alt="meal"
                                            />
                                            <p className="ml-1 text-xs font_medium black_shade">
                                              {m.foodName}
                                            </p>
                                          </div>
                                          <div
                                            className="w-6 h-6 rounded-full bg-white flex justify-center items-center cursor-pointer"
                                            onClick={() =>
                                              handleRemoveMenu(w, m)
                                            }
                                          >
                                            <MdOutlineClose />
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {step === 0 && (
                          <p className="lg:w-80 my-5 gray_color text-sm font_medium">
                            Note that weekly menu will be delivered at once by{" "}
                            <span className="font_bold">1 PM</span> on your
                            preferred day of the week.
                          </p>
                        )}

                        {step === 1 && (
                          <div>
                            <p className="gray_color text-sm font_bold">
                              {values.meals} meal{values.meals > 1 ? "s" : ""}{" "}
                              per week
                            </p>
                            <p className="gray_color text-sm font_medium">
                              {moment(values.startDate).format(
                                COMMON_DATE_FORMAT
                              )}{" "}
                              -{" "}
                              {moment(values.startDate)
                                .add(4, "week")
                                .day(weeks[3]?.day)
                                .format(COMMON_DATE_FORMAT)}
                            </p>
                            <p className="gray_color text-sm font_medium">
                              {values.deliveryAddress}
                            </p>
                            <div className="my-3">
                              {weeks?.length > 0 &&
                                weeks?.map((week: any, i: number) => {
                                  return (
                                    <div key={i}>
                                      {week?.day ? (
                                        <p className="text-md font_medium gray5_color mb-1">
                                          {week?.name} - {week?.day}{" "}
                                          {moment(values?.startDate)
                                            .add(i + 1, "weeks")
                                            .day(week?.day)
                                            .format(COMMON_DATE_FORMAT)}
                                        </p>
                                      ) : null}
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        )}

                        <div className="my-5">
                          <div className="">
                            <div className="flex items-center">
                              <p className="primary_txt_color text-3xl lg:text-4xl font_bold">
                                ₦{formatPrice(totalAmount)}
                              </p>
                              {noDiscountTotalAmount > 0 && applyDiscount && (
                                <p className="ml-3 primary_txt_color text-3xl lg:text-4xl font_bold line-through">
                                  ₦{formatPrice(noDiscountTotalAmount)}
                                </p>
                              )}
                            </div>
                          </div>
                          <p className="text-xl gray_color font_medium">
                            Monthly
                          </p>

                          {applyDiscount && (
                            <div className="mb-3 p-3 yellow_bg w-36 rounded-full flex items-center justify-center">
                              <p className="text-xs text-black font_medium text-center">
                                10% Discount applied
                              </p>
                            </div>
                          )}
                        </div>

                        {error && (
                          <p className="my-2 text-xs text-red-600">{error}</p>
                        )}

                        <Button
                          title="Continue"
                          extraClasses="w-full lg:w-96"
                          onClick={() => {
                            if (step === 0) {
                              handleSubmit();
                              return;
                            }
                            handleContinueToPayment();
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SNACKBAR */}
        <Snackbar
          open={openAlert}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          message={alertPresent}
        />

        {/* CREATE MEAL MODAL */}
        <Modal
          open={mealModal}
          onClose={closeMealModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className="absolute top-1/2 left-1/2 w-full h-5/6 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl pb-7 px-12 my-10 outline-none">
            <div className="sticky top-0 z-50 bg-white pt-7">
              <div className="flex">
                <div className="flex-1">
                  <p className="text-xl font_medium black2">
                    Create your weekly meal experience
                  </p>
                </div>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeMealModal}
                />
              </div>

              <div className="flex flex-row flex-wrap mt-4 overflow-x-scroll">
                <div
                  className={`w-20 lg:w-28 h-10 border rounded-full cursor-pointer flex items-center justify-center ${
                    selectedRegion === "all"
                      ? "primary_bg_color text-white"
                      : "secondary_gray_color text-black"
                  }`}
                  onClick={() => setSelectedRegion("all")}
                >
                  <p
                    className={`text-xs lg:text-sm ${
                      selectedRegion === "all"
                        ? "primary_bg_color text-white"
                        : "secondary_gray_color text-black"
                    }`}
                  >
                    All
                  </p>
                </div>
                {REGIONS.map((region: any, index: number) => (
                  <div
                    key={index}
                    className={`mb-2 w-20 lg:w-28 h-10 border rounded-full mx-1 cursor-pointer flex items-center justify-center ${
                      selectedRegion === region
                        ? "primary_bg_color text-white"
                        : "secondary_gray_color text-black"
                    }`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <p
                      className={`text-xs lg:text-sm ${
                        selectedRegion === region
                          ? "primary_bg_color text-white"
                          : "secondary_gray_color text-black"
                      }`}
                    >
                      {region}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border_gray_meal my-7" />
            </div>

            <div className="pl-1">
              {selectedRegion === "all" ? (
                <>
                  {chefsMenus?.length > 0 &&
                    chefsMenus?.map((chefMenu: any, i: number) => (
                      <div className="mt-5" key={i}>
                        <div className="flex items-center">
                          <div>
                            {chefMenu?.profile?.image ? (
                              <img
                                src={chefMenu?.profile?.image}
                                alt="chef"
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <GiCook
                                color="#06c167"
                                className="w-12 h-12 rounded-full"
                              />
                            )}
                          </div>
                          <div>
                            <h1 className="ml-2 text-xl lg:text-3xl font_bold secondary_text_color">
                              {chefMenu?.business?.businessName}
                            </h1>
                          </div>
                        </div>
                        <div className="w-full pl-1 flex basis-0 whitespace-nowrap overflow-x-auto">
                          {chefMenu?.subscriptionMenu?.length > 0 &&
                            chefMenu?.subscriptionMenu?.map(
                              (menu: any, i: any) => (
                                <div
                                  key={i}
                                  className="w-60 lg:w-72 grow-0 shrink-0 basis-60 lg:basis-72 mr-2 mb-5"
                                >
                                  <SubscriptionMenuCard
                                    menu={menu}
                                    onClickAddToBag={() =>
                                      handleSelectMenu(menu)
                                    }
                                    inCart={weeks
                                      ?.find(
                                        (w: any) => w.name === selectedWeek.name
                                      )
                                      ?.menu?.includes(menu)}
                                    menuError={mealError}
                                  />
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  {chefsMenus?.length > 0 &&
                    chefsMenus
                      ?.filter((c: any) =>
                        c?.business?.businessSpecialisation?.includes(
                          selectedRegion
                        )
                      )
                      ?.map((chefMenu: any, i: number) => (
                        <div className="mt-5" key={i}>
                          <div className="flex items-center">
                            <div>
                              {chefMenu?.profile?.image ? (
                                <img
                                  src={chefMenu?.profile?.image}
                                  alt="chef"
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                <GiCook
                                  color="#06c167"
                                  className="w-12 h-12 rounded-full"
                                />
                              )}
                            </div>
                            <div>
                              <h1 className="ml-2 text-xl lg:text-3xl font_bold secondary_text_color">
                                {chefMenu?.business?.businessName}
                              </h1>
                            </div>
                          </div>
                          <div className="flex flex-wrap">
                            {chefMenu?.subscriptionMenu?.length > 0 &&
                              chefMenu?.subscriptionMenu?.map(
                                (menu: any, i: any) => (
                                  <div
                                    key={i}
                                    className="w-full lg:w-[22%] lg:mr-5"
                                  >
                                    <SubscriptionMenuCard
                                      menu={menu}
                                      onClickAddToBag={() =>
                                        handleSelectMenu(menu)
                                      }
                                      inCart={weeks
                                        ?.find(
                                          (w: any) =>
                                            w.name === selectedWeek.name
                                        )
                                        ?.menu?.includes(menu)}
                                      menuError={mealError}
                                    />
                                  </div>
                                )
                              )}
                          </div>
                        </div>
                      ))}
                </>
              )}
            </div>
          </div>
        </Modal>

        {/* EDIT MEAL MODAL */}
        <Modal
          open={editMealModal}
          onClose={closeEditMealModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className="absolute top-1/2 left-1/2 w-full h-5/6 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl pb-7 px-12 my-10 outline-none">
            <div className="sticky top-0 z-50 bg-white pt-7">
              <div className="flex">
                <div className="flex-1">
                  <p className="text-xl font_medium black2">
                    Edit your weekly meal experience
                  </p>
                </div>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeEditMealModal}
                />
              </div>

              <div className="flex flex-row flex-wrap mt-4 overflow-x-scroll">
                <div
                  className={`w-20 lg:w-28 h-10 border rounded-full cursor-pointer flex items-center justify-center ${
                    selectedRegion === "all"
                      ? "primary_bg_color text-white"
                      : "secondary_gray_color text-black"
                  }`}
                  onClick={() => setSelectedRegion("all")}
                >
                  <p
                    className={`text-xs lg:text-sm ${
                      selectedRegion === "all"
                        ? "primary_bg_color text-white"
                        : "secondary_gray_color text-black"
                    }`}
                  >
                    All
                  </p>
                </div>
                {REGIONS.map((region: any, index: number) => (
                  <div
                    key={index}
                    className={`mb-2 w-20 lg:w-28 h-10 border rounded-full mx-1 cursor-pointer flex items-center justify-center ${
                      selectedRegion === region
                        ? "primary_bg_color text-white"
                        : "secondary_gray_color text-black"
                    }`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <p
                      className={`text-xs lg:text-sm ${
                        selectedRegion === region
                          ? "primary_bg_color text-white"
                          : "secondary_gray_color text-black"
                      }`}
                    >
                      {region}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border_gray_meal my-7" />
            </div>

            <div className="pl-1">
              {selectedRegion === "all" ? (
                <>
                  {chefsMenus?.length > 0 &&
                    chefsMenus?.map((chefMenu: any, i: number) => (
                      <div className="mt-5" key={i}>
                        <div className="flex items-center">
                          <div>
                            {chefMenu?.profile?.image ? (
                              <img
                                src={chefMenu?.profile?.image}
                                alt="chef"
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <GiCook
                                color="#06c167"
                                className="w-12 h-12 rounded-full"
                              />
                            )}
                          </div>
                          <div>
                            <h1 className="ml-2 text-xl lg:text-3xl font_bold secondary_text_color">
                              {chefMenu?.business?.businessName}
                            </h1>
                          </div>
                        </div>
                        <div className="w-full pl-1 flex basis-0 whitespace-nowrap overflow-x-auto">
                          {chefMenu?.subscriptionMenu?.length > 0 &&
                            chefMenu?.subscriptionMenu?.map(
                              (menu: any, i: any) => (
                                <div
                                  key={i}
                                  className="w-60 lg:w-72 grow-0 shrink-0 basis-60 lg:basis-72 mr-2 mb-5"
                                >
                                  <SubscriptionMenuCard
                                    menu={menu}
                                    onClickAddToBag={() =>
                                      handleEditSelectMenu(menu)
                                    }
                                    inCart={editWeeks
                                      ?.find(
                                        (w: any) =>
                                          w.name === editSelectedWeek.name
                                      )
                                      ?.menu?.includes(menu)}
                                    menuError={mealError}
                                  />
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  {chefsMenus?.length > 0 &&
                    chefsMenus
                      ?.filter((c: any) =>
                        c?.business?.businessSpecialisation?.includes(
                          selectedRegion
                        )
                      )
                      ?.map((chefMenu: any, i: number) => (
                        <div className="mt-5" key={i}>
                          <div className="flex items-center">
                            <div>
                              {chefMenu?.profile?.image ? (
                                <img
                                  src={chefMenu?.profile?.image}
                                  alt="chef"
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                <GiCook
                                  color="#06c167"
                                  className="w-12 h-12 rounded-full"
                                />
                              )}
                            </div>
                            <div>
                              <h1 className="ml-2 text-xl lg:text-3xl font_bold secondary_text_color">
                                {chefMenu?.business?.businessName}
                              </h1>
                            </div>
                          </div>
                          <div className="flex flex-wrap">
                            {chefMenu?.subscriptionMenu?.length > 0 &&
                              chefMenu?.subscriptionMenu?.map(
                                (menu: any, i: any) => (
                                  <div
                                    key={i}
                                    className="w-full lg:w-[22%] lg:mr-5"
                                  >
                                    <SubscriptionMenuCard
                                      menu={menu}
                                      onClickAddToBag={() =>
                                        handleEditSelectMenu(menu)
                                      }
                                      inCart={editWeeks
                                        ?.find(
                                          (w: any) =>
                                            w.name === editSelectedWeek.name
                                        )
                                        ?.menu?.includes(menu)}
                                      menuError={mealError}
                                    />
                                  </div>
                                )
                              )}
                          </div>
                        </div>
                      ))}
                </>
              )}
            </div>
          </div>
        </Modal>

        <Modal
          open={paymentModal}
          onClose={closePaymentModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
            <div className="flex">
              <div className="flex-1">
                <h1 className="card_headerText text-3xl font_regular">
                  Payment
                </h1>
                <div className="flex flex-row justify-between">
                  <p className="text-lg font_medium input_text">
                    Select a payment method
                  </p>
                </div>
              </div>
              <IoMdClose
                size={24}
                color="#8E8E8E"
                className="cursor-pointer"
                onClick={closePaymentModal}
              />
            </div>
            <div className="my-3">
              {(cards?.length > 0 || orders?.length > 0) && (
                <div className="grayBackground flex p-6 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <FaWallet size={28} color="#06c167" />
                      <p className="ml-2 text-md text-black font_regular">
                        Balance
                      </p>
                    </div>
                    <p className="my-3 text-4xl text-black font_bold">
                      {formatRemoteAmountKobo(wallet?.balance).naira}
                      <span className="text-xl font_regular">
                        {formatRemoteAmountKobo(wallet?.balance).kobo}
                      </span>
                    </p>
                    <Button
                      title="Fund my wallet"
                      extraClasses=""
                      onClick={() =>
                        navigate(CUSTOMER_ROUTES.linkCustomerWallet)
                      }
                    />
                  </div>
                  <div
                    className={`w-7 h-7 flex justify-center items-center cursor-pointer ${
                      selectedPaymentOption === "wallet"
                        ? "border-2 primary_border_color rounded-full"
                        : ""
                    }`}
                    onClick={() => setSelectedPaymentOption("wallet")}
                  >
                    <div
                      className={`w-5 h-5 rounded-full cursor-pointer ${
                        selectedPaymentOption === "wallet"
                          ? "primary_bg_color"
                          : "bg_check_inactive_payment"
                      }`}
                    />
                  </div>
                </div>
              )}
              <div className="grayBackground flex  p-6">
                <div className="h-7 w-7 rounded-full bg-black flex justify-center items-center">
                  <FiMenu color="#ffffff" />
                </div>
                <div className="flex-1 ml-3">
                  <p className="black3 text-md font_medium">
                    Other payment options
                  </p>
                  <p className="input_text text-sm font_medium">
                    Card, Transfer or USSD
                  </p>
                </div>
                <div
                  className={`w-7 h-7 flex justify-center items-center self-center cursor-pointer ${
                    selectedPaymentOption === "other"
                      ? "border-2 primary_border_color rounded-full"
                      : ""
                  }`}
                  onClick={() => setSelectedPaymentOption("other")}
                >
                  <div
                    className={`w-5 h-5 rounded-full cursor-pointer ${
                      selectedPaymentOption === "other"
                        ? "primary_bg_color"
                        : "bg_check_inactive_payment"
                    }`}
                  />
                </div>
              </div>

              <div className="mt-4">
                {(walletError || subscriptionError) && (
                  <p className="my-2 text-xs text-center text-red-600">
                    {walletError || subscriptionError}
                  </p>
                )}
                <Button
                  loading={isLoading}
                  title="Proceed"
                  disabled={!selectedPaymentOption}
                  extraClasses="w-full p-3 rounded-full"
                  onClick={handlePayment}
                />
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          open={cancelModal}
          onClose={closeCancelModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-2/4 lg:h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
            <div className="flex">
              <div className="flex-1">
                <p className="text-xl text-center font_bold black2">
                  Why do you want to cancel
                </p>
                <p className="my-3 text-base text-center font_medium black2">
                  Your feedback is very helpful to us to help us improve
                  Homemade for you
                </p>
              </div>
              <IoMdClose
                size={24}
                color="#8E8E8E"
                className="cursor-pointer"
                onClick={closeCancelModal}
              />
            </div>
            <div className="">
              <TextArea
                placeholder="Reason"
                name={"reason"}
                onChange={(e: any) => setReason(e.target.value)}
                extraClasses="h-32"
              />

              <div>
                {(error || subscriptionError) && (
                  <p className="my-2 text-xs text-center text-red-600">
                    {error || subscriptionError}
                  </p>
                )}
                <Button
                  loading={loading}
                  title="Cancel subscription"
                  extraClasses="w-full p-3 rounded-full"
                  onClick={() => cancelSubscription()}
                />
              </div>
            </div>
          </div>
        </Modal>

        {/* EDIT SUCCESSFUL */}
        <Modal
          // open={true}
          open={editSuccessModal}
          onClose={() => {
            closeEditSuccessModal();
          }}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
            <div className="flex flex-col justify-between items-center p-0 h-full">
              <div
                className="h-fit my-3 w-100 w-full flex flex-col gap-y-10"
                style={{ minHeight: "80%" }}
              >
                <div className="flex w-full justify-end">
                  <IoMdClose
                    size={24}
                    color="#8E8E8E"
                    className="cursor-pointer self-end"
                    onClick={() => {
                      closeEditSuccessModal();
                    }}
                  />
                </div>

                <div
                  className="flex flex-col justify-center items-center h-full w-full mb-5"
                  style={{ minHeight: "80%" }}
                >
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="my-6 w-28 h-28 rounded-full suc_withdraw_bg flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#06c167"
                        className="w-14 h-14"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="my-3 text-xl text-center font_bold black2">
                      Meal plan edited successfully.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 w-full">
                <div className="absolute bottom-10 w-5/6">
                  <Button
                    title="Continue"
                    extraClasses="w-full p-3 rounded-full"
                    onClick={() => {
                      closeEditSuccessModal();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </CustomerDashboardLayout>
    </>
  );
};

export default CustomerSubscription;
