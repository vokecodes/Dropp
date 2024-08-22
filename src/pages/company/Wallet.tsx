import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import moment from "moment";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import { FaCalendarAlt, FaFilePdf, FaFileCsv } from "react-icons/fa";
import { BiSolidFileDoc } from "react-icons/bi";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import Input from "../../components/CustomInput";
import CompanyDashboardLayout from "./CompanyDashboardLayout";
import BannerCard from "../../components/BannerCard";
import PageTitle from "../../components/PageTitle";
import WalletItem from "../../components/WalletItem";
import { useAppDispatch } from "../../redux/hooks";
import OutlineButton from "../../components/OutlineButton";
import { formatPrice, formatRemoteAmountKobo } from "../../utils/formatMethods";
import axios from "axios";
import Radio from "@mui/material/Radio";
import {
  getProfileCompanyAccount,
  getCompanyWalletTransactionAccount,
  getCompanyWalletAccount,
} from "../../_redux/user/userAction";
import { WithdrawAmountSchema } from "../../utils/ValidationSchema";
import ColoredSpinner from "../../components/ColoredSpinner";
import Button from "../../components/Button";
import {
  addCompanyCard,
  defaultCompanyCard,
  getCompanyCards,
} from "../../_redux/card/cardAction";
import CardItem from "../../components/CardItem";
import { TRANSACTION_URL } from "../../_redux/urls";
import { BsFillCheckCircleFill } from "react-icons/bs";
import {
  companyExportTransactions,
  downloadCompanyExport,
} from "../../_redux/wallet/walletCrud";
import { store } from "../store";

const TRANSACTION_TYPE = "COMPANY_FUNDING";

const FUNDING_SOURCES = [
  {
    type: "card",
    image: "../images/solar_card.svg",
    title: "Pay with Card",
  },
  {
    type: "paystack",
    image: "../images/PaystackLogo.svg",
    title: "Pay with Paystack",
  },
];

const CompanyWallet = () => {
  const dispatch = useAppDispatch();

  const { auth, wallet, cards, user, walletTransaction, userLoading } =
    useSelector(
      (state: any) => ({
        auth: state.auth.user,
        user: state.user.user,
        wallet: state.user.wallet,
        cards: state.cards.cards,
        walletTransaction: state.user.walletTransaction,
        userLoading: state.user.loading,
      }),
      shallowEqual
    );

  useEffect(() => {
    dispatch(getProfileCompanyAccount());
    dispatch(getCompanyWalletAccount());
    dispatch(getCompanyWalletTransactionAccount());
    dispatch(getCompanyCards());
  }, []);

  const [selectedView, setSelectedView] = useState<any>("all");
  const VIEWS = ["Successful", "Pending", "Failed"];

  // DATE FILTER
  const [filterDateModal, setFilterDateModal] = useState(false);
  const openFilterDateModal = () => setFilterDateModal(true);
  const closeFilterDateModal = () => setFilterDateModal(false);

  // EXPORT DATA
  const [exportModal, setExportModal] = useState(false);
  const [exportSuccessful, setExportSuccessful] = useState(false);
  const openExportModal = () => setExportModal(true);
  const closeExportModal = () => {
    setExportData("");
    setExportDataError("");
    setExportModal(false);
    setExportSuccessful(false);
  };

  const [exportData, setExportData] = useState("");
  const [exportDataError, setExportDataError] = useState("");

  const handleExportData = async () => {
    setExportDataError("");

    if (!exportData) {
      setExportDataError("No file format selected");
      return;
    }
    setIsLoading(true);

    try {
      const { data } = await companyExportTransactions(
        exportData.toUpperCase()
      );
      console.log("exportData= ", data);
      if (data?.success) {
        window.open(data?.downloadLink, "_blank", "noopener,noreferrer");
        setExportSuccessful(true);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log("error final= ", error);
      alert(
        "Something went wrong! Try again and if it persists contact support."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // CARD MANAGEMENT FUNCS
  const [selectedCard, setSelectedCard] = useState<any>();
  const [selectedTransaction, setSelectedTransaction] = useState<any>("");
  const [showFundWalletModal, setShowFundWalletModal] = useState(false);
  const [fundingSuccessful, setFundingSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFundingSource, setSelectedFundingSource] = useState<any>("");
  const [showCards, setShowCards] = useState(false);

  const [fundWalletModal, setFundWalletModal] = useState(false);
  const openFundWalletModal = () => setFundWalletModal(true);
  const closeFundWalletModal = () => {
    setFundWalletModal(false);
    setShowCards(false);
    setFundingSuccessful(false);
    setSelectedFundingSource(null);
    setSelectedCard(null);
    setErrorMessage("");
    resetForm();
  };

  const [verifyPaymentModal, setVerifyPaymentModal] = useState(false);
  const openVerifyPaymentModal = () => setVerifyPaymentModal(true);
  const closeVerifyPaymentModal = () => setVerifyPaymentModal(false);

  const [refundSuccess, setRefundSuccess] = useState(false);

  const refundTransaction = async (referenceId: any) => {
    await axios
      .post(
        "https://api.paystack.co/refund",
        { transaction: referenceId },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`,
          },
        }
      )
      .then(({ data }) => {
        setRefundSuccess(true);
      })
      .catch((err) => {});
  };

  const verifyTransaction = async (referenceId: any) => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `${TRANSACTION_URL}/verify/${referenceId}`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );

      const result = data?.data;

      if (result?.status) {
        setFundingSuccessful(true);
        dispatch(getCompanyWalletAccount());
        dispatch(getCompanyWalletTransactionAccount());
      }
    } catch (error) {
      alert("Server error! Try again and if it persists contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAddCardTransaction = async (referenceId: any) => {
    await axios
      .get(`${TRANSACTION_URL}/verify/${referenceId}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      })
      .then(async ({ data }) => {
        const result = data?.data;

        if (result?.status) {
          await dispatch(
            addCompanyCard({
              authorization: result.data.authorization,
              customer: result.data.customer,
            })
          );
          await refundTransaction(referenceId);

          setTimeout(() => {
            dispatch(getCompanyCards());
          }, 5000);
        }
      })
      .catch((err) => {});
  };

  const handleAddCard = () => {
    try {
      const transactionId = uuidv4();
      let handler = window.PaystackPop.setup({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Replace with your public key
        email: user.email,
        amount: 50 * 100,
        ref: transactionId,
        channels: ["card"],
        onClose: function () {
          alert("Transaction was not completed, window closed.");
        },
        callback: function (response: any) {
          verifyAddCardTransaction(transactionId);
        },
      });

      handler.openIframe();
    } catch (err) {}
  };

  const setDefaultCard = (cardId: string) => {
    setSelectedCard(cardId);
    dispatch(defaultCompanyCard(cardId, setSelectedCard));
  };

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: WithdrawAmountSchema,
    onSubmit: () => {
      setErrorMessage("");

      if (!selectedFundingSource) {
        setErrorMessage("Select a funding option.");
        return;
      }

      if (parseFloat(values.amount) < 10000) {
        setErrorMessage("Minimum amount is ₦10,000.");
        return;
      }

      if (selectedFundingSource === "paystack") {
        initiateFunding(values.amount);
        return;
      }

      if (selectedFundingSource === "card") {
        setShowCards(true);
        return;
      }

      // if (selectedFundingSource === "card") {
      // handleFundSubmit();
      // return;
      // }
    },
  });

  const initiateFunding = async (amount: any) => {
    setIsLoading(true);
    console.log("funds", amount);

    try {
      const referenceId = uuidv4();

      let handler = window.PaystackPop.setup({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Replace with your public key
        email: user.email,
        amount: amount * 100,
        ref: referenceId,
        metadata: {
          transactionType: TRANSACTION_TYPE,
          userId: user._id,
        },
        onClose: function () {
          alert("Transaction was not completed, window closed.");
        },
        callback: function (response: any) {
          verifyTransaction(referenceId);
        },
      });

      handler.openIframe();
    } catch (error: any) {
      setErrorMessage(
        "Server error! Try again and if it persists contact support."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFundSubmit = async () => {
    if (showCards) {
      if (!selectedCard) {
        setErrorMessage("Select a card");
        return;
      }

      setIsLoading(true);

      try {
        const { data } = await axios.post(
          "https://api.paystack.co/transaction/charge_authorization",
          {
            email: selectedCard?.customer?.email,
            amount: Number(values.amount) * 100,
            authorization_code: selectedCard?.authorization?.authorization_code,
            metadata: {
              transactionType: TRANSACTION_TYPE,
              userId: user._id,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`,
            },
          }
        );

        const result = data?.data;

        if (result?.status) {
          console.log("handleFundSubmit", result);
          setShowCards(false);
          setFundingSuccessful(true);
          setTimeout(() => {
            dispatch(getCompanyWalletAccount());
            dispatch(getCompanyWalletTransactionAccount());
          }, 5000);
        }
      } catch (error: any) {
        console.log("transaction errors=", error);
        alert("Server error! Try again and if it persists contact support.");
      } finally {
        setIsLoading(false);
      }
    } else {
      handleSubmit();
    }
  };

  const [q, setQ] = useState("");

  // console.log('wallet= ', wallet)

  return (
    <>
      <CompanyDashboardLayout>
        <div className="w-full px-6 py-4">
          <PageTitle title="Wallet" />
          <div className="mt-5">
            <BannerCard
              // backgroundImage="/images/chef-menu-banner.svg"
              bgExtraClasses="p-4 lg:p-4 bg-cover bg-no-repeat min-w-full h-66"
              textContainerClasses="px-10 py-5"
              text1="Balance"
              text1ExtraClasses="text-base text-dark font_regular"
              text2={
                formatRemoteAmountKobo(wallet?.balance).naira +
                formatRemoteAmountKobo(wallet?.balance).kobo
              }
              text2ExtraClasses="text-2xl md:text-5xl text-black font_bold mt-3 mb-5"
              text3=""
              text3ExtraClasses="hidden"
              iconColor="#fff"
              iconSize={24}
              iconExtraClasses="hidden"
              onClickText3={() => openFundWalletModal()}
              showWalletFormat={true}
              // showDownload={false}
              showDownload={walletTransaction?.length > 0}
              onClickText4={() => openExportModal()}
            />
          </div>

          <div className="bg-white rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-md w-full py-10 px-5 mt-3">
            {walletTransaction && walletTransaction?.length > 0 ? (
              <>
                <div className="inline-flex flex-row justify-between items-center gap-x-8 font-semibold w-full break-keep overflow-x-auto py-5 md:py-0">
                  <h1 className="text-xl text-black font_medium mt-1.5 w-fit">
                    Transactions
                  </h1>

                  <div
                    className="justify-self-end flex flex-row flex-none overflow-x-auto rounded-full py-.5 items-center"
                    style={{ backgroundColor: "#F0F1F5" }}
                  >
                    <div
                      className={`w-16 lg:w-20 h-8 md:h-10 rounded-full cursor-pointer flex items-center justify-center ${
                        selectedView === "all"
                          ? "primary_bg_color text-white"
                          : "secondary_gray_color text-black"
                      }`}
                      onClick={() => setSelectedView("all")}
                    >
                      <p
                        className={`text-xs lg:text-sm ${
                          selectedView === "all"
                            ? "primary_bg_color text-white"
                            : "secondary_gray_color text-black"
                        }`}
                      >
                        All
                      </p>
                    </div>

                    {VIEWS.map((view: any, index: number) => (
                      <div
                        key={index}
                        className={`w-16 lg:w-20 h-8 md:h-10 rounded-full cursor-pointer flex items-center justify-center ${
                          selectedView === view
                            ? "primary_bg_color text-white"
                            : "secondary_gray_color text-black"
                        }`}
                        onClick={() => setSelectedView(view)}
                      >
                        <p
                          className={`text-xs lg:text-sm ${
                            selectedView === view
                              ? "primary_bg_color text-white"
                              : "secondary_gray_color text-black"
                          }`}
                        >
                          {view}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* DATE */}
                  {/* <button
                    className="inline-flex flex-row items-center justify between gap-x-2 rounded-full font-normal bg-gray-200 py-1 pl-5 pr-20 h-8 md:h-10 text-gray-500"
                    onClick={() => openFilterDateModal()}
                  >
                    <FaCalendarAlt size={15} className="bg-gray m-0" />
                    Date
                  </button> */}

                  {/* SEARCH */}
                  <div
                    className="inline-flex flex-row rounded-full bg-gray-200 py-0 md:py-.5 pl-3 pr-1 w-2/6"
                    style={{ minWidth: "150px" }}
                  >
                    <img src="../images/search.svg" alt="search" width={15} />
                    <input
                      placeholder="Search for recipients"
                      className="border-0 bg-transparent rounded-full  py-1 md:py-2 pl-2 pr-8 font-normal focus:outline-none w-full"
                      value={q}
                      onChange={(e: any) => {
                        setQ(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="w-full overflow-x-auto">
                  <div
                    className="grid grid-cols-5 items-center justify-items-start md:justify-between border-b border-t font-semibold py-5 mt-10 gap-x-5 break-keep w-full"
                    style={{ minWidth: "800px" }}
                  >
                    <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color">
                      Transaction
                    </p>
                    <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color">
                      Amount
                    </p>
                    <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color col-span-2">
                      Recipient
                    </p>

                    <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color">
                      Status
                    </p>
                  </div>

                  {userLoading ? (
                    <div className="flex justify-center my-16">
                      <ColoredSpinner
                        sx={[{ width: "5rem", height: "auto" }]}
                      />
                    </div>
                  ) : (
                    <>
                      <div
                        className="w-full max-w-screen h-fit max-h-screen lg:max-h-96 overflow-y-scroll"
                        style={{ minWidth: "800px" }}
                      >
                        {q?.length > 0
                          ? walletTransaction
                              ?.filter(
                                (transaction: any) =>
                                  transaction?.recipient?.firstName
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(q.toLowerCase()) > -1 ||
                                  transaction?.recipient?.lastName
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(q.toLowerCase()) > -1 ||
                                  transaction?.recipient?.email
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(q.toLowerCase()) > -1
                              )
                              .map((transaction: any, i: number) => (
                                <WalletItem
                                  key={i}
                                  transactionType={transaction?.type}
                                  amount={formatPrice(transaction?.amount)}
                                  date={moment(transaction?.createdAt).format(
                                    "MMM DD YYYY"
                                  )}
                                  time={moment(transaction?.createdAt).format(
                                    "HH:mm a"
                                  )}
                                  status={transaction?.status}
                                  recipient={transaction?.recipient}
                                  companyWallet={true}
                                  self={user}
                                  selectedView={selectedView}
                                />
                              ))
                          : walletTransaction.map(
                              (transaction: any, i: number) => (
                                <WalletItem
                                  key={i}
                                  transactionType={transaction?.type}
                                  amount={formatPrice(transaction?.amount)}
                                  date={moment(transaction?.createdAt).format(
                                    "MMM DD YYYY"
                                  )}
                                  time={moment(transaction?.createdAt).format(
                                    "HH:mm a"
                                  )}
                                  status={transaction?.status}
                                  recipient={transaction?.recipient}
                                  companyWallet={true}
                                  self={user}
                                  selectedView={selectedView}
                                />
                              )
                            )}
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center mb-6 p-16">
                <svg
                  width="91"
                  height="90"
                  viewBox="0 0 81 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" width="80" height="80" rx="40" fill="#F8F8F8" />
                  <path
                    d="M48.3137 21.4219C54.0733 21.4219 57.2802 24.7289 57.2802 30.3954V49.5872C57.2802 55.3466 54.0733 58.5792 48.3137 58.5792H32.6871C27.019 58.5792 23.7188 55.3466 23.7188 49.5872V30.3954C23.7188 24.7289 27.019 21.4219 32.6871 21.4219H48.3137ZM33.1905 46.949C32.6312 46.8932 32.0905 47.1534 31.7922 47.6364C31.4938 48.1009 31.4938 48.714 31.7922 49.197C32.0905 49.6615 32.6312 49.9402 33.1905 49.8658H47.8084C48.5524 49.7915 49.1136 49.158 49.1136 48.4167C49.1136 47.655 48.5524 47.0233 47.8084 46.949H33.1905ZM47.8084 38.4753H33.1905C32.3869 38.4753 31.7362 39.1274 31.7362 39.9262C31.7362 40.7251 32.3869 41.3754 33.1905 41.3754H47.8084C48.6102 41.3754 49.2628 40.7251 49.2628 39.9262C49.2628 39.1274 48.6102 38.4753 47.8084 38.4753ZM38.7636 30.061H33.1905V30.0795C32.3869 30.0795 31.7362 30.7298 31.7362 31.5287C31.7362 32.3276 32.3869 32.9778 33.1905 32.9778H38.7636C39.5672 32.9778 40.2198 32.3276 40.2198 31.5082C40.2198 30.7112 39.5672 30.061 38.7636 30.061Z"
                    fill="#06c167"
                  />
                </svg>

                <h2 className="text-xl input_text mb-3">
                  You have no transactions.
                </h2>
              </div>
            )}
          </div>

          {/* DATE FILTER MODAL */}
          <Modal
            open={filterDateModal}
            onClose={closeFilterDateModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <div className="flex px-4">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Date filter
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeFilterDateModal}
                />
              </div>

              <div>
                <p className="my-2 text-gray-500">Start date:</p>
                <div className="inline-flex flex-row items-center rounded-lg bg-gray-200 py-1 pl-3 pr-1 w-full">
                  <input
                    type="date"
                    className="border-0 bg-transparent rounded-full py-2 pl-4 pr-6 font-normal focus:outline-none w-full cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <p className="my-2 text-gray-500">End date:</p>
                <div className="inline-flex flex-row items-center rounded-lg bg-gray-200 py-1 pl-3 pr-1 w-full">
                  <input
                    type="date"
                    className="border-0 bg-transparent rounded-full py-2 pl-4 pr-6 font-normal focus:outline-none w-full cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex mt-10 justify-center">
                <Button
                  title="Apply filter"
                  extraClasses="w-52 py-3 w-full rounded-full"
                  onClick={() => console.log("filter")}
                />
              </div>
            </div>
          </Modal>

          {/* EXPORT DATA MODAL */}
          <Modal
            open={exportModal}
            onClose={closeExportModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <div className="flex px-4">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Export
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeExportModal}
                />
              </div>

              {exportSuccessful ? (
                <div className="flex flex-col justify-center items-center">
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
                    Export successful
                  </p>
                  <p className="text-lg text-black font_medium text-center">
                    Your transaction data has been successfully exported.
                  </p>

                  <div className="my-3 mx-auto w-5/6">
                    <Button
                      title="Done"
                      extraClasses="w-full p-3 rounded-full"
                      onClick={() => closeExportModal()}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="my-3">
                    <p className="flex flex-row items-center justify-between my-2 text-black font-semibold">
                      <span className="inline-flex items-center">
                        <FaFilePdf className="w-10 h-10 p-2 primary_txt_color" />
                        <label htmlFor="pdf">Export as PDF</label>
                      </span>
                      {/* <input
                        type="radio"
                        name="pdf"
                        id="pdf"
                        className="cursor-pointer"
                        style={{ width: "3.5rem" }}
                      /> */}
                      <Radio
                        checked={exportData === "pdf"}
                        onChange={(e: any) => {
                          console.log(e.target.value);
                          setExportData(e.target.value);
                        }}
                        value={"pdf"}
                        name={"export"}
                        inputProps={{ "aria-label": "A" }}
                      />
                    </p>
                  </div>

                  <hr className="w-4/5 mx-auto" />

                  <div className="my-3">
                    <p className="flex flex-row items-center justify-between my-2 text-black font-semibold">
                      <span className="inline-flex items-center w-full">
                        <BiSolidFileDoc className="w-10 h-10 p-2 primary_txt_color" />
                        <label htmlFor="doc">Export as DOC</label>
                      </span>
                      {/* <input
                        type="radio"
                        name="doc"
                        id="doc"
                        className="cursor-pointer"
                        style={{ width: "3.5rem" }}
                      /> */}
                      <Radio
                        checked={exportData === "doc"}
                        onChange={(e: any) => {
                          console.log(e.target.value);
                          setExportData(e.target.value);
                        }}
                        value={"doc"}
                        name={"export"}
                        inputProps={{ "aria-label": "A" }}
                      />
                    </p>
                  </div>

                  <hr className="w-4/5 mx-auto" />

                  <div className="my-3">
                    <p className="flex flex-row items-center justify-between my-2 text-black font-semibold">
                      <span className="inline-flex items-center">
                        <FaFileCsv className="w-10 h-10 p-2 primary_txt_color" />
                        <label htmlFor="csv">Export as CSV</label>
                      </span>
                      {/* <input
                        type="radio"
                        name="csv"
                        id="csv"
                        className="cursor-pointer"
                        style={{ width: "3.5rem" }}
                      /> */}
                      <Radio
                        checked={exportData === "csv"}
                        onChange={(e: any) => {
                          console.log(e.target.value);
                          setExportData(e.target.value);
                        }}
                        value={"csv"}
                        name={"export"}
                        inputProps={{ "aria-label": "A" }}
                      />
                    </p>
                  </div>

                  <div className="w-full py-1">
                    <p className="text-red-600 text-base text-center">
                      {exportDataError && exportDataError}
                    </p>
                  </div>

                  <div className="flex mt-10 justify-center">
                    <Button
                      loading={isLoading}
                      title="Export"
                      extraClasses="w-52 py-3 w-full rounded-full"
                      onClick={handleExportData}
                    />
                  </div>
                </div>
              )}
            </div>
          </Modal>

          {/* FUND WALLET MODAL */}
          <Modal
            // open={true}
            open={fundWalletModal}
            onClose={closeFundWalletModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-10 my-10 outline-none">
              <div className="flex">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Fund wallet
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeFundWalletModal}
                />
              </div>

              {fundingSuccessful ? (
                <div className="flex flex-col justify-center items-center">
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
                    Funding successful
                  </p>
                  <p className="text-lg text-black font_medium text-center">
                    <span className="font_bold">
                      ₦{formatPrice(values.amount)}
                    </span>{" "}
                    has been added to <br /> your wallet balance.
                  </p>

                  <div className="absolute bottom-10 w-5/6 left-8 lg:left-12">
                    <Button
                      title="Done"
                      extraClasses="w-full p-3 rounded-full"
                      onClick={() => closeFundWalletModal()}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mt-10">
                    {showCards ? (
                      <>
                        <p className="mt-8 text-lg font_medium text-black">
                          Cards
                        </p>
                        <div className="my-5 h-[2px] grayBackground" />
                        <div className="h-52 overflow-scroll">
                          {cards?.map((c: any) => (
                            <div
                              key={c?._id}
                              className="border-b py-3 flex items-center justify-between cursor-pointer"
                              onClick={() => setSelectedCard(c)}
                            >
                              <div className="flex items-center">
                                <div className="ml-5">
                                  <p className="text-lg gray_color font_regular uppercase">
                                    {c?.authorization?.bank}
                                  </p>
                                  <div className="flex items-center">
                                    <p className="text-lg text-black font_bold">
                                      {"****    *****    ****   " +
                                        c?.authorization?.last4}
                                    </p>
                                    <div className="mx-1 bg_ter_gray_color w-1 h-1 rounded-full" />
                                    <p className="text-lg text-black font_regular uppercase">
                                      {c?.authorization?.brand}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full cursor-pointer ${
                                  selectedCard?._id === c?._id
                                    ? "primary_bg_color"
                                    : "bg_check_inactive"
                                }`}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="">
                          <OutlineButton
                            title="Add a new card"
                            onClick={() => handleAddCard()}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="">
                        <Input
                          type="number"
                          placeholder="Amount (Minimum of ₦10,000)"
                          name="amount"
                          onChange={handleChange}
                          value={values.amount}
                          error={errors.amount}
                        />
                        <div className="my-6">
                          <p className="mt-8 text-md font_medium secondary_gray_color">
                            Select your funding option
                          </p>
                          <div className="my-5 h-[2px] grayBackground" />
                          {FUNDING_SOURCES?.map((source, i) => (
                            <div
                              key={i}
                              className="cursor-pointer"
                              onClick={() =>
                                setSelectedFundingSource(source?.type)
                              }
                            >
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-black mr-4 flex items-center justify-center">
                                  <img
                                    src={source?.image}
                                    alt={source?.title}
                                  />
                                </div>
                                <p className="flex-1 text-lg font_medium black3">
                                  {source.title}
                                </p>
                                <div
                                  className={`w-5 h-5 rounded-full cursor-pointer ${
                                    selectedFundingSource === source?.type
                                      ? "primary_bg_color"
                                      : "bg_check_inactive"
                                  }`}
                                />
                              </div>
                              {FUNDING_SOURCES?.length !== i + 1 && (
                                <div className="my-5 h-[2px] grayBackground" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {errorMessage && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {errorMessage}
                      </p>
                    )}

                    <div className="absolute bottom-10 w-5/6 left-8 lg:left-12">
                      <Button
                        loading={isLoading}
                        title="Proceed"
                        extraClasses="w-full p-3 rounded-full"
                        onClick={() => handleFundSubmit()}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Modal>

          {/* VERIFY PAYMENT MODAL */}
          <Modal
            open={verifyPaymentModal}
            onClose={closeVerifyPaymentModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-80 h-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <h3 className="text-center font_bold text-2xl black2">
                Verifying card
              </h3>

              <div className="mt-3 flex justify-center" role="status">
                <ColoredSpinner heightWidthClasses="h-10 w-10" />
              </div>
            </div>
          </Modal>
        </div>
      </CompanyDashboardLayout>
    </>
  );
};

export default CompanyWallet;
