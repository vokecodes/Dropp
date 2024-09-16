// @ts-nocheck

import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Hotjar from "@hotjar/browser";
import Modal from "@mui/material/Modal";
import { v4 as uuidv4 } from "uuid";
import { FaWallet } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FiChevronLeft } from "react-icons/fi";
import CustomerDashboardLayout from "../../components/CustomerDashboardLayout";
import CustomerOrderItem from "../../components/CustomerOrderItem";
import PageTitle from "../../components/PageTitle";
import TabMenu from "../../components/TabMenu";
import Button from "../../components/Button";
import { CUSTOMER_ORDERS_MENU } from "../../utils/Globals";
import { OrderItemProps, SeOrderItemProps } from "../../utils/Interfaces";
import { useAppDispatch } from "../../redux/hooks";
import {
  getProfileUserAccount,
  getUserWalletAccount,
  getUserWalletTransactionAccount,
} from "../../_redux/user/userAction";
import { formatPrice, formatRemoteAmountKobo } from "../../utils/formatMethods";
import { useFormik } from "formik";
import { WithdrawAmountSchema } from "../../utils/ValidationSchema";
import Input from "../../components/CustomInput";
import OutlineButton from "../../components/OutlineButton";
import axios from "axios";
import { TRANSACTION_URL } from "../../_redux/urls";
import { addUserCard, getUserCards } from "../../_redux/card/cardAction";
import CardItem from "../../components/CardItem";
import WalletItem from "../../components/WalletItem";
import ColoredSpinner from "../../components/ColoredSpinner";
import CustomerWalletItem from "../../components/CustomerWalletItem";
import TrackGoogleAnalyticsEvent from "../../components/TrackGoogleAnalyticsEvent";

const TRANSACTION_TYPE = "USER_FUNDING";

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

const Wallet = () => {
  const dispatch = useAppDispatch();

  const { auth, user, wallet, cards, walletTransaction, userLoading } =
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
    dispatch(getProfileUserAccount());
    dispatch(getUserWalletAccount());
    dispatch(getUserCards());
    dispatch(getUserWalletTransactionAccount());
  }, []);

  const [showFundWalletModal, setShowFundWalletModal] = useState(false);
  const [fundingSuccessful, setFundingSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedFundingSource, setSelectedFundingSource] = useState<any>("");
  const [showCards, setShowCards] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>();

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

      if (parseFloat(values.amount) < 1000) {
        setErrorMessage("Minimum amount is ₦1,000.");
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
    },
  });

  const closeFundWalletModal = () => {
    setShowFundWalletModal(false);
    setShowCards(false);
    setFundingSuccessful(false);
    setSelectedFundingSource(null);
    setSelectedCard(null);
    setErrorMessage("");
    resetForm();
  };

  const verifyTransaction = async (referenceId: any) => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `${TRANSACTION_URL}/verify/${referenceId}`
      );
      const result = data?.data;

      if (result?.status) {
        setFundingSuccessful(true);
        dispatch(getUserWalletAccount());
        dispatch(getUserWalletTransactionAccount());

        TrackGoogleAnalyticsEvent(
          "FUND_WALLET",
          "Fund by Paystack",
          window.location.pathname + window.location.search,
          {
            amount: Number(values.amount),
            userId: user._id,
          }
        );
        Hotjar.event("FUND_WALLET");
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const initiateFunding = async (amount: any) => {
    setIsLoading(true);

    try {
      const referenceId = uuidv4();

      let handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, // Replace with your public key
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
              Authorization: `Bearer ${
                import.meta.env.VITE_PAYSTACK_SECRET_KEY
              }`,
            },
          }
        );

        const result = data?.data;

        if (result?.status) {
          setShowCards(false);
          setFundingSuccessful(true);
          setTimeout(() => {
            dispatch(getUserWalletAccount());
            dispatch(getUserWalletTransactionAccount());
          }, 5000);

          TrackGoogleAnalyticsEvent(
            "FUND_WALLET",
            "Fund by card",
            window.location.pathname + window.location.search,
            {
              amount: Number(values.amount),
              userId: user._id,
            }
          );
          Hotjar.event("FUND_WALLET");
        }
      } catch (error: any) {
        alert("Server error! Try again and if it persists contact support.");
      } finally {
        setIsLoading(false);
      }
    } else {
      handleSubmit();
    }
  };

  const refundTransaction = async (referenceId: any) => {
    await axios
      .post(
        "https://api.paystack.co/refund",
        { transaction: referenceId },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
          },
        }
      )
      .then(({ data }) => {})
      .catch((err) => {});
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
            addUserCard({
              authorization: result.data.authorization,
              customer: result.data.customer,
            })
          );
          await refundTransaction(referenceId);

          setTimeout(() => {
            dispatch(getUserCards());
          }, 5000);
        }
      })
      .catch((err) => {});
  };

  const handleAddCard = () => {
    try {
      const transactionId = uuidv4();
      let handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, // Replace with your public key
        email: user.email,
        amount: 50 * 100,
        ref: transactionId,
        channels: ["card"],
        metadata: {
          transactionType: "USER_ADD_CARD",
          userId: user._id,
        },
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

  const [selectedTransaction, setSelectedTransaction] = useState<any>("");

  return (
    <>
      <CustomerDashboardLayout>
        <div className="w-full h-screen px-6 py-4">
          <PageTitle title="My Wallet" />
          <div className="mt-10 w-full lg:w-5/6">
            <div className="flex">
              <FaWallet size={28} color="#06c167" />
              <div className="ml-4 lg:flex items-center mb-8">
                <div>
                  <div className="flex">
                    <p className="ml-4 text-md text-black font_regular">
                      Balance
                    </p>
                  </div>
                  <p className="mt-5 text-4xl lg:text-6xl text-black font_bold">
                    {formatRemoteAmountKobo(wallet?.balance).naira}
                    <span className="text-2xl lg:text-4xl font_regular">
                      {formatRemoteAmountKobo(wallet?.balance).kobo}
                    </span>
                  </p>
                </div>
                <div
                  className="hidden lg:block w-[1px] h-20 mx-14"
                  style={{ backgroundColor: "#D1D1D1" }}
                />
                <div className="border-b my-5" />
                <div>
                  <Button
                    title="Fund my wallet"
                    extraClasses=""
                    onClick={() => setShowFundWalletModal(true)}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl w-full py-10 px-5 mt-3">
              {userLoading ? (
                <div className="flex justify-center">
                  <ColoredSpinner />
                </div>
              ) : (
                <>
                  {walletTransaction ? (
                    <>
                      <div className="inline-flex flex-row">
                        <h1 className="text-xl text-black font_medium mt-1.5 w-full">
                          Transaction history
                        </h1>
                        {/* <div className="inline-flex flex-row  rounded-full bg-gray-200 py-.5 px-1.5 ml-2 w-full">
                    <img src="../images/search.svg" alt="search" width={15} />
                    <Input
                      placeholder="Search history"
                      className="border-0 bg-transparent rounded-full py-2 px-4 focus:outline-none w-full"
                    />
                  </div> */}
                      </div>

                      <div className="flex justify-between lg:justify-start border-b border-t  py-5 mt-10">
                        <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color">
                          Transaction
                        </p>
                        <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color">
                          Amount
                        </p>

                        <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color">
                          Status
                        </p>
                      </div>

                      <div>
                        {walletTransaction.length > 0 &&
                          walletTransaction?.map(
                            (transaction: any, i: number) => (
                              <CustomerWalletItem
                                key={i}
                                transactionType={transaction?.type}
                                source={transaction?.source}
                                amount={formatPrice(transaction?.amount)}
                                date={moment(transaction?.createdAt).format(
                                  "MMM DD YY"
                                )}
                                time={moment(transaction?.createdAt).format(
                                  "HH:mm a"
                                )}
                                status={transaction?.status}
                                showDetail={
                                  selectedTransaction === transaction?._id
                                }
                                onClickIconOpen={() =>
                                  setSelectedTransaction(transaction?._id)
                                }
                                onClickIconClose={() =>
                                  setSelectedTransaction("")
                                }
                              />
                            )
                          )}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center mb-6">
                      <img src="/images/empty-order.svg" alt="empty" />
                      <h2 className="text-xl input_text mb-3">
                        You have no transactions.
                      </h2>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </CustomerDashboardLayout>

      <Modal
        open={showFundWalletModal}
        onClose={closeFundWalletModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-5/6 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            {showCards && (
              <div
                className="w-9 h-9 rounded-full bg_light_gray flex items-center justify-center"
                onClick={() => setShowCards(false)}
              >
                <FiChevronLeft
                  size={20}
                  color="#8E8E8E"
                  className="cursor-pointer"
                />
              </div>
            )}
            <p className="flex-1 text-xl text-center font_bold black2">
              Fund Wallet
            </p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={() => closeFundWalletModal()}
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
                <span className="font_bold">₦{formatPrice(values.amount)}</span>{" "}
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
                    <p className="mt-8 text-lg font_medium text-black">Cards</p>
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
                      placeholder="Amount (Minimum of ₦1,000)"
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
                          onClick={() => setSelectedFundingSource(source?.type)}
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-black mr-4 flex items-center justify-center">
                              <img src={source?.image} alt={source?.title} />
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
                          {FUNDING_SOURCES.length !== i + 1 && (
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
    </>
  );
};

export default Wallet;
