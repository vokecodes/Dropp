import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import OutlineButton from "./OutlineButton";
import Button from "./Button";
import CustomInput from "./CustomInput";
import { useAppDispatch } from "../redux/hooks";
import { PaymentValues } from "../utils/FormInitialValue";
import PaymentItem from "./PaymentItem";
import {
  addPayment,
  deletePayment,
  getPayment,
} from "../_redux/payment/paymentAction";
import Dropdown from "./Dropdown";
import axios from "axios";
import ColoredSpinner from "./ColoredSpinner";
import { updateProfileChefAccount } from "../_redux/user/userAction";
import { CHEF_URL } from "../_redux/urls";

const ChefPayment = () => {
  const dispatch = useAppDispatch();

  const { error, loading, payment } = useSelector(
    (state: any) => ({
      payment: state.payment.payment,
      loading: state.payment.loading,
      error: state.payment.error,
    }),
    shallowEqual
  );

  const [paymentModal, setPaymentModal] = useState(false);
  const openPaymentModal = () => setPaymentModal(true);
  const closePaymentModal = () => setPaymentModal(false);

  const [bankNameValue, setBankNameValue] = useState<any>();

  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: PaymentValues,
      onSubmit: () => {
        handleAddPayment();
      },
    });

  const [selectedPayment, setSelectedPayment] = useState<string>();

  const [banksList, setBanksList] = useState<any>([]);

  const [verifyUserLoading, setVerifyUserLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>();

  const handlePaymentDelete = (paymentId: string) => {
    setSelectedPayment(paymentId);
    dispatch(deletePayment(paymentId, setSelectedPayment));
  };

  const getListOfBanks = () => {
    axios
      .get("https://api.paystack.co/bank?currency=NGN", {
        headers: {
          Authorization: `Bearer ${
            import.meta.env.REACT_APP_PAYSTACK_PUBLIC_KEY
          }`,
        },
      })
      .then(({ data }) => {
        const emptArr = [];
        const banks = data.data;
        for (let index = 0; index < banks.length; index++) {
          let element = banks[index];
          element.label = element.name;
          element.value = element.code;

          emptArr.push(element);
        }

        setBanksList(emptArr);
      })
      .catch((err) => {});
  };

  const verifyUserBank = (bankCode: string, accountNumber: string) => {
    setVerifyUserLoading(true);
    setErrorMessage("");
    axios
      .get(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
        {
          headers: {
            Authorization: `Bearer ${
              import.meta.env.REACT_APP_PAYSTACK_SECRET_KEY
            }`,
          },
        }
      )
      .then(({ data }) => {
        setFieldValue("accountName", data.data.account_name);
      })
      .catch((err) => {
        const res = err.response.data;
        setErrorMessage(res?.message);
      })
      .finally(() => setVerifyUserLoading(false));
  };

  const handleAddPayment = async () => {
    await dispatch(addPayment(values, closePaymentModal));

    try {
      const { data } = await axios.post(
        `https://api.paystack.co/transferrecipient`,
        {
          type: "nuban",
          name: values.accountName,
          account_number: values?.accountNumber,
          bank_code: values?.bankCode,
          currency: "NGN",
        },
        {
          headers: {
            Authorization: `Bearer ${
              import.meta.env.REACT_APP_PAYSTACK_SECRET_KEY
            }`,
          },
        }
      );

      const result = data?.data;

      await dispatch(
        updateProfileChefAccount(CHEF_URL, {
          recipientCode: result.recipient_code,
        })
      );
    } catch (error: any) {
      alert(
        "Something went wrong creating transfer recipient. Please try again and if it persists contact support."
      );
    }
  };

  useEffect(() => {
    getListOfBanks();
    dispatch(getPayment());
  }, []);

  return (
    <>
      {payment ? (
        <div className="lg:w-1/2">
          <p className="mb-5 text-xl text-black font-bold font_medium">
            Payment account
          </p>
          <PaymentItem
            bankImage="/images/bank-logo.svg"
            bankName={payment?.bankName}
            bankAccountName={payment?.accountName}
            bankAccountNumber={payment?.accountNumber}
            onDeleteClick={() => handlePaymentDelete(payment?._id)}
            deleteLoading={selectedPayment === payment?._id}
          />
          {/* <div className="my-10">
            <OutlineButton
              title="Add a new account"
              extraClasses="w-52 py-3"
              onClick={openPaymentModal}
            />
          </div> */}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-xl input_text mb-3">
            You have not added a payment account.
          </h2>
          <Button
            title="Add a payment account"
            extraClasses="py-4"
            onClick={() => openPaymentModal()}
          />
        </div>
      )}

      <Modal
        open={paymentModal}
        onClose={closePaymentModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            <p className="flex-1 text-xl text-center font_bold black2">
              Add a payment account
            </p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closePaymentModal}
            />
          </div>
          <div>
            <div className="mt-10">
              <Dropdown
                label="Bank Name"
                options={banksList}
                value={bankNameValue}
                onChange={(v: any) => {
                  setFieldValue("bankName", v.label);
                  setFieldValue("bankCode", v.value);
                }}
              />

              <CustomInput
                type="text"
                placeholder="Account Number"
                name="accountNumber"
                onChange={handleChange}
                value={values.accountNumber}
                onInput={(e: any) => {
                  let maxNum = 10;
                  if (e.target.value.length === maxNum) {
                    verifyUserBank(values.bankCode, e.target.value);
                  } else if (e.target.value.length > maxNum) {
                    e.target.value = e.target.value.slice(0, maxNum);
                  }
                }}
              />

              {verifyUserLoading && (
                <div className="flex justify-center">
                  <ColoredSpinner />
                </div>
              )}

              {errorMessage && (
                <p className="text-sm text-center text-red-600 my-2">
                  {errorMessage}
                </p>
              )}

              {values.accountName && (
                <CustomInput type="text" readOnly value={values.accountName} />
              )}

              {error && payment && (
                <p className="text-sm text-center text-red-600 my-2">{error}</p>
              )}

              <div className="mt-5">
                <OutlineButton
                  loading={loading}
                  title="Save"
                  extraClasses="w-full p-3 rounded-full"
                  onClick={() => handleSubmit()}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChefPayment;
