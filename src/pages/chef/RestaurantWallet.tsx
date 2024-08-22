import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import moment from "moment";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import { useFormik } from "formik";
import Input from "../../components/CustomInput";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import BannerCard from "../../components/BannerCard";
import PageTitle from "../../components/PageTitle";
import WalletItem from "../../components/WalletItem";
import { useAppDispatch } from "../../redux/hooks";
import OutlineButton from "../../components/OutlineButton";
import TextArea from "../../components/TextArea";
import { getPayment } from "../../_redux/payment/paymentAction";
import { formatPrice, formatRemoteAmountKobo } from "../../utils/formatMethods";
import axios from "axios";
import {
  getChefRestaurantWalletAccount,
  getChefRestaurantWalletTransactionAccount,
  getProfileChefAccount,
  updateProfileChefAccount,
} from "../../_redux/user/userAction";
import { CHEF_URL } from "../../_redux/urls";
import { WithdrawAmountSchema } from "../../utils/ValidationSchema";
import ColoredSpinner from "../../components/ColoredSpinner";
import { chefRestaurantWalletWithdraw } from "../../_redux/user/userCrud";

const RestaurantWallet = () => {
  const dispatch = useAppDispatch();

  const {
    transactionsError,
    restaurantWalletTransaction,
    userLoading,
    restaurantWallet,
    payment,
    error,
    user,
  } = useSelector(
    (state: any) => ({
      transactionsError: state.transactions.error,
      restaurantWalletTransaction: state.user.restaurantWalletTransaction,
      userLoading: state.user.loading,
      restaurantWallet: state.user.restaurantWallet,
      payment: state.payment.payment,
      error: state.payment.error,
      user: state.user.user,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getProfileChefAccount());
    dispatch(getChefRestaurantWalletAccount());
    dispatch(getChefRestaurantWalletTransactionAccount());
    dispatch(getPayment());
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const [walletModal, setWalletModal] = useState(false);

  const [withdrawSuccessful, setWithdrawSuccessful] = useState(false);

  const openWalletModal = () => setWalletModal(true);

  const closeWalletModal = () => {
    setWalletModal(false);
    setWithdrawSuccessful(false);
  };
  const [errorMessage, setErrorMessage] = useState<string>();

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      amount: "",
      note: "",
    },
    validationSchema: WithdrawAmountSchema,
    onSubmit: () => {
      setErrorMessage("");

      if (!payment) {
        return;
      }

      if (
        restaurantWallet.balance < 0 ||
        restaurantWallet.balance < parseFloat(values.amount)
      ) {
        setErrorMessage("Your wallet balance is low.");
        return;
      }

      if (parseFloat(values.amount) < 5000) {
        setErrorMessage("Amount is less than the minimum amount of ₦5,000.");
        return;
      }

      if (user?.recipientCode) {
        withdrawTransaction(user?.recipientCode);
      } else {
        createTransferRecipient();
      }

      // dispatch(customerWithdrawTransactions(body, setWithdrawSuccessful));
    },
  });

  const amount = parseFloat(values.amount);

  const amountWithFee =
    amount >= 50000 ? amount + 50 : amount >= 5000 ? amount + 25 : amount;

  const createTransferRecipient = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `https://api.paystack.co/transferrecipient`,
        {
          type: "nuban",
          name: payment?.accountName,
          account_number: payment?.accountNumber,
          bank_code: payment?.bankCode,
          currency: "NGN",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      const result = data?.data;

      await dispatch(
        updateProfileChefAccount(CHEF_URL, {
          recipientCode: result.recipient_code,
        })
      );

      await withdrawTransaction(result.recipient_code);
    } catch (error: any) {
      alert(
        "Something went wrong creating transfer recipient. Please try again and if it persists contact support."
      );
    }
  };

  const withdrawTransaction = async (recipientCode: any) => {
    setIsLoading(true);

    const body = {
      ...values,
      amount: amountWithFee,
      type: "Withdrawal",
      accountName: payment.accountName,
      accountNumber: payment.accountNumber,
      bankName: payment.bankName,
      bankCode: payment.bankCode,
    };

    return chefRestaurantWalletWithdraw(body)
      .then(async ({ data }) => {
        await initiateTransfer(values.amount, data?.data?._id, recipientCode);
      })
      .catch((err) => {
        const error = err?.response?.data;
        setErrorMessage(
          error?.message ||
            "Something went wrong initiating transfer. Please try again and if it persists contact support."
        );
      });
  };

  const initiateTransfer = async (
    amount: any,
    referenceId: any,
    recipient: any
  ) => {
    try {
      const { data } = await axios.post(
        `https://api.paystack.co/transfer`,
        {
          source: "balance",
          amount: amount * 100,
          reference: referenceId,
          recipient,
          reason: values.note,
          metadata: {
            transactionType: "CHEF_WALLET_WITHDRAWAL",
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

      setWithdrawSuccessful(true);
    } catch (error: any) {
      setErrorMessage(
        "Something went wrong initiating transfer. Please try again and if it persists contact support."
      );
    } finally {
      setIsLoading(false);
      dispatch(getChefRestaurantWalletAccount());
      dispatch(getChefRestaurantWalletTransactionAccount());
    }
  };

  return (
    <>
      <ChefDashboardLayout>
        <div className="w-full px-6 py-4">
          <PageTitle title="My Restaurant Wallet" />
          <div className="mt-5">
            <BannerCard
              backgroundImage="/images/chef-menu-banner.svg"
              bgExtraClasses="p-7 lg:p-10 bg-cover bg-no-repeat min-w-full h-56"
              textContainerClasses="pl-10 py-5"
              text1="Balance"
              text1ExtraClasses="text-base text-white font_regular"
              text2={
                restaurantWallet
                  ? `${
                      formatRemoteAmountKobo(restaurantWallet?.balance).naira
                    }${formatRemoteAmountKobo(restaurantWallet?.balance).kobo}`
                  : ""
              }
              text2ExtraClasses="text-5xl text-white font_bold mt-3 mb-5"
              text3="Withdraw"
              text3ExtraClasses="text-lg text-white font_regular cursor-pointer"
              iconColor="#fff"
              iconSize={24}
              iconExtraClasses="ml-2"
              onClickText3={() => openWalletModal()}
            />
          </div>

          <div className="bg-white rounded-3xl w-full py-10 px-5 mt-3">
            {userLoading ? (
              <div className="flex justify-center">
                <ColoredSpinner />
              </div>
            ) : (
              <>
                {restaurantWalletTransaction?.length > 0 ? (
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
                        Time & Date
                      </p>

                      <p className="lg:w-1/3 text-sm lg:text-base font_regular gray_color">
                        Status
                      </p>
                    </div>

                    <div>
                      {restaurantWalletTransaction?.map(
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

          <Modal
            open={walletModal}
            onClose={closeWalletModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div
              className={`absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none ${
                withdrawSuccessful ? "h-3/5" : "h-4/5"
              }`}
            >
              <div className="flex">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Withdraw
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={() => closeWalletModal()}
                />
              </div>
              {withdrawSuccessful ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="my-8 w-28 h-28 rounded-full suc_withdraw_bg flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#E85666"
                      className="w-14 h-14"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-xl text-black font_medium text-center">
                    You have successfully withdrawn
                  </p>
                  <p className="text-xl text-black font_bold text-center">
                    ₦{formatPrice(amountWithFee)}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mt-10">
                    <Input
                      type="number"
                      placeholder="Amount (Minimum of ₦5,000)"
                      name="amount"
                      onChange={handleChange}
                      value={values.amount}
                    />

                    <Input
                      value={`${payment?.accountNumber} - ${payment?.bankName} - ${payment?.accountName}`}
                      readOnly
                    />

                    <TextArea
                      placeholder="Note (Optional)"
                      name="note"
                      onChange={handleChange}
                      value={values.note}
                    />

                    {error && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {error}
                      </p>
                    )}

                    {errorMessage && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {errorMessage}
                      </p>
                    )}

                    {transactionsError && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {transactionsError}
                      </p>
                    )}

                    <div className="mt-5">
                      <OutlineButton
                        loading={isLoading}
                        title="Proceed"
                        extraClasses="w-full p-3 rounded-full"
                        onClick={() => handleSubmit()}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </div>
      </ChefDashboardLayout>
    </>
  );
};

export default RestaurantWallet;
