import React, { useState, useEffect, useCallback } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { IoMdSend } from "react-icons/io";
import PageTitle from "./PageTitle";
import Button from "./Button";
import { HOME_ROUTES } from "../routes/routes";
import moment from "moment";
import { CUSTOMER_USER } from "../config/UserType";
import { COMMON_DATE_FORMAT } from "../utils/formatMethods";

const Chat = ({ orders, subscriptionOrders }: any) => {
  const navigate = useNavigate();

  const { user } = useSelector(
    (state: any) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  // const scroll = useRef<any>();

  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>();

  const getMessages = (messageId: any) => {
    const q = query(collection(db, messageId), orderBy("createdAt"), limit(50));
    onSnapshot(q, (QuerySnapshot) => {
      let localMessages: any = [];
      QuerySnapshot.forEach((doc) => {
        localMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(localMessages);
    });
  };

  const handSelectMessage = (order: any) => {
    setSelectedMessage(order);
  };

  const sendMessage = useCallback(async () => {
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    await addDoc(collection(db, selectedMessage?.id), {
      orderId: selectedMessage?.id,
      text: message,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      avatar: user?.image ?? "",
      createdAt: serverTimestamp(),
      date: new Date(),
    });

    setMessage("");
  }, [
    message,
    selectedMessage?.id,
    user?.email,
    user?.firstName,
    user?.image,
    user?.lastName,
  ]);

  useEffect(() => {
    if (selectedMessage) {
      getMessages(selectedMessage?.id);
    }
  }, [selectedMessage]);

  useEffect(() => {
    const keyEnter = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }
    };

    document.addEventListener("keydown", keyEnter);

    return () => {
      document.removeEventListener("keydown", keyEnter);
    };
  }, [message, sendMessage]);

  return (
    <div className=" w-full px-6 py-4">
      <PageTitle title="Chat" />
      <div className=" mt-8 lg:flex flex-row h-2/6 overflow-hidden">
        <div className="p-4 bg-white rounded-lg lg:w-1/5 h-[500px] overflow-scroll">
          <h1 className="font_bold text-2xl mb-8">Orders</h1>
          {/* <div>
            {subscriptionOrders?.length > 0 &&
              subscriptionOrders
                ?.filter((o: any) => o.status === "active")
                ?.map((subscriptionOrder: any, index: number) => {
                  let formattedSubscriptionOrder = { ...subscriptionOrder };
                  formattedSubscriptionOrder.id = subscriptionOrder?._id;

                  return (
                    <div
                      key={index}
                      className={`px-4 flex flex-row items-center gap-4 border-b my-2 pb-2 cursor-pointer  hover:text-white ${
                        formattedSubscriptionOrder?._id === selectedMessage?._id
                          ? "bg_menu"
                          : "bg-transparent"
                      }`}
                      onClick={() =>
                        handSelectMessage(formattedSubscriptionOrder)
                      }
                    >
                      {formattedSubscriptionOrder?.chef?.image ||
                      formattedSubscriptionOrder?.customer?.image ? (
                        <img
                          src={
                            formattedSubscriptionOrder?.chef?.image ||
                            formattedSubscriptionOrder?.customer?.image
                          }
                          alt="dp"
                          className="w-12 h-12 rounded-full mt-2"
                        />
                      ) : (
                        <CiUser size={60} color="#e85666" />
                      )}

                      <div className="w-40">
                        <p
                          className={`input_text text-sm truncate ${
                            formattedSubscriptionOrder?.id ===
                            selectedMessage?.id
                              ? "font_bold"
                              : "font_regular"
                          }`}
                        >
                          #
                          {formattedSubscriptionOrder?._id.substring(
                            formattedSubscriptionOrder?._id.length - 5
                          )}{" "}
                          -{" "}
                          {moment(
                            formattedSubscriptionOrder?.deliveryDate
                          ).format(COMMON_DATE_FORMAT)}
                        </p>
                        <h1
                          className={`text-black text-base text- ${
                            formattedSubscriptionOrder?.id ===
                            selectedMessage?.id
                              ? "font_bold"
                              : "font_regular"
                          }`}
                        >
                          {formattedSubscriptionOrder?.chef?.firstName ||
                            formattedSubscriptionOrder?.customer?.firstName}
                        </h1>
                      </div>
                    </div>
                  );
                })}
          </div> */}
          <div>
            {orders.length > 0 &&
              orders
                ?.filter((o: any) => o.status === "processed")
                ?.map((order: any, index: number) => (
                  <div
                    key={index}
                    className={`px-4 flex flex-row items-center gap-4 border-b my-2 pb-2 cursor-pointer  hover:text-white ${
                      order?.id === selectedMessage?.id
                        ? "bg_menu"
                        : "bg-transparent"
                    }`}
                    onClick={() => handSelectMessage(order)}
                  >
                    {order?.chef?.image || order?.customer?.image ? (
                      <img
                        src={order?.chef?.image || order?.customer?.image}
                        alt="dp"
                        className="w-12 h-12 rounded-full mt-2"
                      />
                    ) : (
                      <CiUser size={60} color="#e85666" />
                    )}

                    <div className="w-40">
                      <p
                        className={`input_text text-sm truncate ${
                          order?.id === selectedMessage?.id
                            ? "font_bold"
                            : "font_regular"
                        }`}
                      >
                        #{order.id.substring(order.id.length - 5)} -{" "}
                        {moment(order?.deliveryDate).format(COMMON_DATE_FORMAT)}
                      </p>
                      <h1
                        className={`text-black text-base text- ${
                          order?.id === selectedMessage?.id
                            ? "font_bold"
                            : "font_regular"
                        }`}
                      >
                        {order?.chef?.firstName || order?.customer?.firstName}
                      </h1>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="bg-white lg:ml-5 mt-5 lg:mt-0 px-6 pt-6 h- overflow-scroll lg:w-4/5  flex flex-col">
          {orders?.filter((o: any) => o.status === "processed")?.length > 0 ? (
            <>
              {selectedMessage ? (
                <>
                  <div className="flex-1">
                    {/* <h1 className="input_text text-center">
                      Yesterday, 9:24pm
                    </h1> */}
                    <div>
                      {messages.length > 0 &&
                        messages?.map((message: any, i: number) => (
                          <div key={i}>
                            {message?.email === user?.email ? (
                              <div className="flex flex-row justify-end gap-6 mt-5">
                                <div className="outboxchat mt-2">
                                  <p className="text-base">{message?.text}</p>
                                  <p className="text-sm text-right font_light">
                                    {moment(
                                      message?.date?.toDate().toDateString()
                                    ).format("DD/MM/YYYY")}
                                  </p>
                                </div>
                                {message?.avatar ? (
                                  <img
                                    src={message?.avatar}
                                    alt="avatar"
                                    className="w-12 h-12 rounded-full mt-2"
                                  />
                                ) : (
                                  <CiUser size={28} color="#e85666" />
                                )}
                              </div>
                            ) : (
                              <div className="flex flex-row justify-start gap-6 mt-5">
                                {message?.avatar ? (
                                  <img
                                    src={message?.avatar}
                                    alt="avatar"
                                    className="w-12 h-12 rounded-full mt-2"
                                  />
                                ) : (
                                  <CiUser size={28} color="#e85666" />
                                )}
                                <div className="inboxchat mt-2">
                                  <p className="text-base text-right">
                                    {message?.text}
                                  </p>
                                  <p className="text-sm text-left font_light">
                                    {moment(
                                      message?.date?.toDate().toDateString()
                                    ).format("DD/MM/YYYY")}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* <span ref={scroll}></span> */}
                  <div className="my-5 flex send_input_bg rounded-full py- items-center">
                    <div className="flex-1 mr-10">
                      <input
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e: any) => setMessage(e.target.value)}
                        className="block w-full bg-transparent input_text font_medium py-4 pl-8 pr-4 sm:text-sm outline-none"
                      />
                    </div>
                    <div className="mr-5">
                      <IoMdSend
                        size={32}
                        color="#000"
                        className="cursor-pointer"
                        onClick={() => sendMessage()}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center mb-6">
                  <img src="/images/empty-order.svg" alt="empty" />
                  <h2 className="text-xl input_text mb-3">
                    Select an order to send a message.
                  </h2>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center mb-6">
              <img src="/images/empty-order.svg" alt="empty" />
              <h2 className="text-xl input_text mb-3">You have no order.</h2>
              {user?.userType === CUSTOMER_USER && (
                <Button
                  title="Find a meal"
                  extraClasses="py-4"
                  onClick={() => navigate(HOME_ROUTES.linkExplore)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
