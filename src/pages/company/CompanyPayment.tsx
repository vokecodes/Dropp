import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import OutlineButton from "../../components/OutlineButton";
import Button from "../../components/Button";
import CustomInput from "../../components/CustomInput";
import { useAppDispatch } from "../../redux/hooks";
import { getProfileCompanyAccount } from "../../_redux/user/userAction";
import { PaymentValues } from "../../utils/FormInitialValue";
import PaymentItem from "../../components/PaymentItem";
import {
  addCompanyCard,
  defaultCompanyCard,
  deleteCompanyCard,
  getCompanyCards,
} from "../../_redux/card/cardAction";
import Dropdown from "../../components/Dropdown";
import axios from "axios";
import ColoredSpinner from "../../components/ColoredSpinner";
import { TRANSACTION_URL } from "../../_redux/urls";
import { v4 as uuidv4 } from "uuid";
import CardItem from "../../components/CardItem";
import { BsFillCheckCircleFill } from "react-icons/bs";

const CompanyPayment = () => {
  const dispatch = useAppDispatch();

  const { user, error, loading, cards } = useSelector(
    (state: any) => ({
      user: state.user.user,
      cards: state.cards.cards,
      loading: state.payment.loading,
      error: state.payment.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getProfileCompanyAccount());
    // dispatch(getPayment());
    dispatch(getCompanyCards());
  }, []);

  // CARD MANAGEMENT FUNCS

  const [selectedCard, setSelectedCard] = useState<string>();

  const [deleteCard, setDeleteCard] = useState<string>("");
  const [isDeleteLoading, setIDeleteLoading] = useState<boolean>(false);

  const handleCardDelete = () => {
    dispatch(
      deleteCompanyCard(
        deleteCard,
        setDeleteCard,
        closeDeletePaymentModal,
        setIDeleteLoading
      )
    );
  };

  const [verifyPaymentModal, setVerifyPaymentModal] = useState(false);
  const openVerifyPaymentModal = () => setVerifyPaymentModal(true);
  const closeVerifyPaymentModal = () => setVerifyPaymentModal(false);

  const [deletePaymentModal, setDeletePaymentModal] = useState(false);
  const openDeletePaymentModal = () => setDeletePaymentModal(true);
  const closeDeletePaymentModal = () => setDeletePaymentModal(false);

  const [refundSuccess, setRefundSuccess] = useState(false);

  const refundTransaction = async (referenceId: any) => {
    await axios
      .post(
        "https://api.paystack.co/refund",
        { transaction: referenceId },
        {
          headers: {
            Authorization: `Bearer ${
              import.meta.env.REACT_APP_PAYSTACK_SECRET_KEY
            }`,
          },
        }
      )
      .then(({ data }) => {
        setRefundSuccess(true);
      })
      .catch((err) => {});
  };

  const verifyTransaction = async (referenceId: any) => {
    await axios
      .get(`${TRANSACTION_URL}/verify/${referenceId}`)
      .then(async ({ data }) => {
        const result = data?.data;

        if (result?.status) {
          closeVerifyPaymentModal();
          await dispatch(
            addCompanyCard({
              authorization: result.data.authorization,
              customer: result.data.customer,
            })
          );
          await refundTransaction(referenceId);
        }
      })
      .catch((err) => {
        alert("Server error! Try again and if it persists contact support.");
      });
  };

  const handleAddCard = () => {
    try {
      const transactionId = uuidv4();
      let handler = window.PaystackPop.setup({
        key: import.meta.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Replace with your public key
        email: user.email,
        amount: 50 * 100,
        ref: transactionId,
        channels: ["card"],
        metadata: {
          transactionType: "COMPANY_ADD_CARD",
          userId: user._id,
        },
        onClose: function () {
          alert("Transaction was not completed, window closed.");
        },
        callback: function (response: any) {
          openVerifyPaymentModal();
          verifyTransaction(transactionId);
        },
      });

      handler.openIframe();
    } catch (err) {}
  };

  const setDefaultCard = (cardId: string) => {
    setSelectedCard(cardId);
    dispatch(defaultCompanyCard(cardId, setSelectedCard));
  };

  // END CARD

  return (
    <>
      <div className="lg:w-1/2">
        <p className="mb-5 text-xl text-black font-bold font_medium">
          Payment account
        </p>
        <hr />
        <div className=" my-5">
          {cards?.length > 0 ? (
            <div className="w-full my-2">
              {refundSuccess && (
                <div className="rounded-md bg-green-50 p-4 w-full">
                  <div className="flex w-full">
                    <div className="flex-shrink-0">
                      <BsFillCheckCircleFill
                        className="h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Refund has been queued for processing
                      </h3>
                      <div className="mt-">
                        <div className="-mx-2">
                          <button
                            type="button"
                            className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                            onClick={() => setRefundSuccess(false)}
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {cards?.map((c: any) => (
                <CardItem
                  key={c?._id}
                  bankName={c?.authorization?.bank}
                  cardNumber={
                    "****    *****    ****   " + c?.authorization?.last4
                  }
                  card={c?.authorization?.brand}
                  selectedCard={c?.defaultCard}
                  selectedLoading={c?._id === selectedCard}
                  onClickSelectCard={() => setDefaultCard(c?._id)}
                  onDeleteClick={() => {
                    openDeletePaymentModal();
                    setDeleteCard(c?._id);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-xl input_text mb-3">
                You have not added any payment method.
              </h2>
            </div>
          )}
        </div>
        <div className="mb-8">
          <OutlineButton
            title="Add a new card"
            extraClasses="w-52 py-3"
            onClick={handleAddCard}
          />
        </div>
      </div>

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

      {/* DELETE PAYMENT MODAL */}
      <Modal
        open={deletePaymentModal}
        onClose={closeDeletePaymentModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <h3 className="mt-2 text-center font_bold text-2xl black2">
            Are you sure you want to delete this card?
          </h3>

          <div className="flex flex-col md:flex-row gap-y-5 md:gap-y-0 mt-10 justify-center">
            <OutlineButton
              title="Cancel"
              extraClasses="w-52 py-3 mr-10"
              onClick={() => closeDeletePaymentModal()}
            />
            <Button
              title="Yes, I want to"
              extraClasses="w-52 py-3"
              loading={isDeleteLoading}
              onClick={() => handleCardDelete()}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CompanyPayment;
