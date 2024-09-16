// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import axios from "axios";
import { Modal } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { BsFillCheckCircleFill } from "react-icons/bs";
import OutlineButton from "./OutlineButton";
import Button from "./Button";
import { useAppDispatch } from "../redux/hooks";
import ColoredSpinner from "./ColoredSpinner";
import { TRANSACTION_URL } from "../_redux/urls";
import {
  addUserCard,
  defaultUserCard,
  deleteUserCard,
  getUserCards,
} from "../_redux/card/cardAction";
import CardItem from "./CardItem";

const CustomerPayment = () => {
  const dispatch = useAppDispatch();

  const { auth, user, cards, error, loading } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
      user: state.user.user,
      loading: state.cards.loading,
      error: state.cards.error,
      cards: state.cards.cards,
    }),
    shallowEqual
  );

  const [selectedCard, setSelectedCard] = useState<string>();

  const [deleteCard, setDeleteCard] = useState<string>("");
  const [isDeleteLoading, setIDeleteLoading] = useState<boolean>(false);

  const handleCardDelete = () => {
    dispatch(
      deleteUserCard(
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
            Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
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
            addUserCard({
              authorization: result.data.authorization,
              customer: result.data.customer,
            })
          );
          await refundTransaction(referenceId);
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
          openVerifyPaymentModal();
          verifyTransaction(transactionId);
        },
      });

      handler.openIframe();
    } catch (err) {}
  };

  const setDefaultCard = (cardId: string) => {
    setSelectedCard(cardId);
    dispatch(defaultUserCard(cardId, setSelectedCard));
  };

  useEffect(() => {
    dispatch(getUserCards());
  }, []);

  return (
    <>
      {cards?.length > 0 ? (
        <div className="lg:w-1/2">
          <div className="mb-8">
            <OutlineButton
              title="Add a new card"
              extraClasses="w-52 py-3"
              onClick={handleAddCard}
            />
          </div>
          {refundSuccess && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
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
              cardNumber={"****    *****    ****   " + c?.authorization?.last4}
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
          <Button
            title="Add a card"
            extraClasses="py-4"
            onClick={() => handleAddCard()}
          />
        </div>
      )}

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

          <div className="flex mt-10 justify-center">
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

export default CustomerPayment;
