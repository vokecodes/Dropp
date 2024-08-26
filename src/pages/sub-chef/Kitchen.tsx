// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "../../redux/hooks";
import { subChefGetTables } from "../../_redux/table/tableAction";
import { SERVER } from "../../config/axios";
import { SUB_CHEF_URL } from "../../_redux/urls";
import Button from "../../components/Button";
import OutlineButton from "../../components/OutlineButton";
import KitchenButton from "../../components/KitchenButton";
import { Link, useNavigate } from "react-router-dom";
import { SUB_CHEF_ROUTES } from "../../routes/routes";
import LogoutButton from "../../components/LogoutButton";
// import io from "socket.io-client";

// const socket = io(import.meta.env.REACT_APP_BASE_API_URL, {
//   withCredentials: true,
// });

const DECLINE_REASONS = [
  "Meal unavailable",
  "Customer unavailable",
  "Other reasons",
];

const Kitchen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { table } = useSelector(
    (state: any) => ({
      table: state.table.table,
    }),
    shallowEqual
  );

  const ref = useRef(null);

  const [restaurantOrders, setRestaurantOrders] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Flag to track if there are more items to load
  const [page, setPage] = useState(1); // Page number for pagination

  const getRestaurantOrders = async (currentPage = 1) => {
    SERVER.get(`${SUB_CHEF_URL}/restaurant?page=${currentPage}`)
      .then(({ data }) => {
        if (currentPage === 1) {
          setRestaurantOrders(data.data);
        } else {
          setRestaurantOrders((prevTransactions: any) => [
            ...prevTransactions,
            ...data.data,
          ]);
        }
        setPage(currentPage + 1);
        setHasMore(
          data.pagination.totalPages > 0 &&
            data.pagination.currentPage !== data.pagination.totalPages
        );
      })
      .catch((err) => {});
  };

  useEffect(() => {
    dispatch(subChefGetTables());
    getRestaurantOrders(page);
  }, []);

  // Listen for new orders from the server
  // useState(() => {
  //   socket.on("newRestaurantOrder", (newOrder) => {
  //     // Call getRestaurantOrders to update the orders
  //     getRestaurantOrders();
  //   });
  //   return () => {
  //     socket.off("newRestaurantOrder");
  //   };
  // }, []);

  const [declineModal, setDeclineModal] = useState(false);
  const openDeclineModal = () => setDeclineModal(true);
  const closeDeclineModal = () => setDeclineModal(false);

  const [startCooking, setStartCooking] = useState();
  const [readyForPickup, setReadyForPickup] = useState();
  const [sent, setSent] = useState();
  const [archive, setArchive] = useState();
  const [decline, setDecline] = useState();
  const [declineOrder, setDeclineOrder] = useState();
  const [declineOrderMenu, setDeclineOrderMenu] = useState();
  const [declineReason, setDeclineReason] = useState();
  const [declineLoading, setDeclineLoading] = useState(false);

  const handleStartCooking = async (orderId, menuId: any) => {
    setStartCooking(menuId);
    SERVER.patch(`${SUB_CHEF_URL}/${orderId}/${menuId}`, {
      status: "cooking",
    })
      .then(({ data }) => {
        getRestaurantOrders();
      })
      .catch((err) => {})
      .finally(() => setStartCooking());
  };

  const handleReadyForPickup = async (orderId, menuId: any) => {
    setReadyForPickup(menuId);
    SERVER.patch(`${SUB_CHEF_URL}/${orderId}/${menuId}`, {
      status: "ready",
    })
      .then(({ data }) => {
        getRestaurantOrders();
      })
      .catch((err) => {})
      .finally(() => setReadyForPickup());
  };

  const handleSent = async (orderId, menuId: any) => {
    setSent(menuId);
    SERVER.patch(`${SUB_CHEF_URL}/${orderId}/${menuId}`, {
      status: "sent",
    })
      .then(({ data }) => {
        getRestaurantOrders();
      })
      .catch((err) => {})
      .finally(() => setSent());
  };

  const handleDecline = async (orderId, menuId, reason) => {
    setDeclineLoading(true);
    SERVER.patch(`${SUB_CHEF_URL}/${orderId}/${menuId}`, {
      status: "declined",
      reason,
    })
      .then(({ data }) => {
        setDeclineOrder();
        setDeclineOrderMenu();
        setDeclineReason();
        getRestaurantOrders();
        closeDeclineModal();
      })
      .catch((err) => {})
      .finally(() => setDeclineLoading(false));
  };

  return (
    <>
      <div className="lg:mx-5 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between py-6 md:justify-start gap-y-3 md:gap-y-0 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Homemade</span>
              <img className="h-6 w-auto" src="/images/logo.svg" alt="" />
            </Link>
          </div>
          <div className="flex flex-row items-center justify-end gap-x-3 shrink-0">
            <OutlineButton
              title="Menu"
              onClick={() => navigate(SUB_CHEF_ROUTES.linkKitchenMenu)}
            />
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-4">
        <div className="w-full h-fit py-1">
          {table && table?.length > 0 && (
            <div
              className="flex flex-row h-fit w-full px-2 pb-1 rounded my-1 gap-x-3 overflow-x-scroll"
              style={{ maxHeight: "250px" }}
            >
              <div className="bg-gray-200 flex flex-row justify-between items-center w-fit h-fit py-2 px-4 rounded-full shrink-0 cursor-pointer">
                <p className="text-xs font-bold font_regular text-black">All</p>
                {/* <p className="h-fit w-fit rounded-full px-2 bg-white">
                  <span className="primary_txt_color font_regular text-xs">
                    40
                  </span>
                </p> */}
              </div>
              {/* {table.map((table: any, i: number) => (
                <div
                  key={i}
                  className="bg-gray-200 flex flex-row justify-between items-center w-fit h-fit py-2 px-4 rounded-full shrink-0 cursor-pointer"
                >
                  <p className="text-xs font-bold font_regular text-black">
                    {`${table?.table}`}
                  </p>
                  <p className="h-fit w-fit rounded-full px-2 bg-white">
                    <span className="primary_txt_color font_regular text-xs">
                      {table.orders}
                    </span>
                  </p>
                </div>
              ))} */}
            </div>
          )}
        </div>

        <InfiniteScroll
          dataLength={restaurantOrders?.length} // This is important to track the length of your data array
          next={() => {
            if (hasMore) {
              getRestaurantOrders(page);
            }
          }} // Function to call when reaching the end of the list
          hasMore={hasMore} // Flag to indicate if there are more items to load
          // loader={
          //   <p className="mt-5 text-center font_medium">Loading...</p>
          // } // Loader component while fetching more data
          endMessage={
            <p className="mt-5 text-center font_medium">
              Yay, you've seen it all.
            </p>
          } // Message when all items have been loaded
        >
          <div
            ref={ref}
            className="kitchen-div bg-white rounded-2xl w-fit md:w-full p-0 md:p-5 mt-3 h-screen overflow-x-scroll"
          >
            {/* <div className="flex flex-col items-center justify-start gap-y-4"> */}
            {/* <div className="w-full h-full"> */}

            <div className="snap-x md:snap-none snap-mandatory flex flex-row w-screen overflow-x-scroll md:w-fit h-full px-5 md:px-0 gap-x-5 no-scroll-bar">
              {/* NEW ORDERS */}
              <div className="relative flex flex-col items-center justify-start gap-y-3 w-[90vw] md:w-80 shrink-0 max-h-svh overflow-y-scroll  bg_pink rounded-xl p-2 snap-center">
                <div className="sticky top-0 flex flex-row justify-center bg-gray-200 items-center w-full gap-x-2 px-3 py-3 primary_bg_color rounded-xl">
                  <p className="text-center font_medium text-white">
                    New orders
                  </p>
                  {/* <p className="h-fit w-fit rounded-full p-1 bg-black flex flex-row items-center justify-center">
                  <span className="text-white font_regular text-xs">40</span>
                </p> */}
                </div>

                {/* <div className="w-full h-full min-h-screen max-h-screen flex flex-col items-center justify-start gap-y-3 p-4 rounded-xl"> */}
                {restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  restaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "kitchen" &&
                        ro?.status === "pending"
                    )
                    ?.map((order: any) => (
                      <div
                        key={order?._id}
                        className="bg-white w-full  mb-2 p-3 rounded-xl"
                      >
                        <p className="font-semibold font_medium">
                          {order?.name} - {order?.table?.table} #
                          {order?._id?.substring(order?._id?.length - 5)}
                        </p>
                        <div className="flex flex-row">
                          <img
                            src={order?.menu?.images[0]}
                            className="w-10 h-auto rounded-md"
                            alt="menu"
                          />
                          <div className="ml-2 font_bold text-sm space-y-2">
                            <p>{order?.menu?.foodName}</p>
                            <p>
                              {order?.quantity} portion
                              {order?.quantity > 1 && "s"}
                            </p>
                          </div>
                        </div>

                        <KitchenButton
                          title="Start Cooking"
                          extraClasses="mt-2 text-red-600 bg-red-100 border-red-600"
                          loading={startCooking === order?._id}
                          onClick={() =>
                            handleStartCooking(order?.parent, order?._id)
                          }
                        />

                        <KitchenButton
                          title="Decline"
                          extraClasses="mt-2 text-red-600 bg-red-100 border-red-600"
                          onClick={() => {
                            setDeclineOrder(order?.parent);
                            setDeclineOrderMenu(order?._id);
                            openDeclineModal();
                          }}
                        />
                      </div>
                    ))}
              </div>

              {/* COOKING */}
              <div className="relative flex flex-col items-center justify-start gap-y-3 w-[90vw] md:w-80 shrink-0 max-h-svh overflow-y-scroll bg-zinc-200 rounded-xl p-2 snap-center">
                <div className="sticky top-0 flex flex-row justify-center items-center w-full gap-x-2 px-3 py-3 bg-zinc-500 rounded-xl">
                  <p className="text-center font_medium text-white">Cooking</p>
                </div>
                {restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  restaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "kitchen" &&
                        ro?.status === "cooking"
                    )
                    ?.map((order: any) => (
                      <div
                        key={order?._id}
                        className="bg-white w-full  mb-2 p-3 rounded-xl"
                      >
                        <p className="font-semibold font_medium">
                          {order?.name} - {order?.table?.table} #
                          {order?._id?.substring(order?._id?.length - 5)}
                        </p>
                        <div className="flex flex-row">
                          <img
                            src={order?.menu?.images[0]}
                            className="w-10 h-auto rounded-md"
                            alt="menu"
                          />
                          <div className="ml-2 font_bold text-sm space-y-2">
                            <p>{order?.menu?.foodName}</p>
                            <p>
                              {order?.quantity} portion
                              {order?.quantity > 1 && "s"}
                            </p>
                          </div>
                        </div>

                        <KitchenButton
                          title="Ready For Pickup"
                          extraClasses="mt-2 bg_kitchen_ready border_kitchen_ready text_kitchen_ready"
                          loading={readyForPickup === order?._id}
                          onClick={() =>
                            handleReadyForPickup(order?.parent, order?._id)
                          }
                        />
                      </div>
                    ))}
              </div>

              {/* READY */}
              <div className="relative flex flex-col items-center justify-start gap-y-3 w-[90vw] md:w-80 shrink-0 max-h-svh overflow-y-scroll  bg-green-100 rounded-xl p-2 snap-center">
                <div className="sticky top-0 flex flex-row justify-center bg-gray-200 items-center w-full gap-x-2 px-3 py-3 bg-green-600 rounded-xl">
                  <p className="text-center font_medium text-white">
                    Ready for pickup
                  </p>
                </div>

                {restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  restaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "kitchen" && ro?.status === "ready"
                    )
                    ?.map((order: any) => (
                      <div
                        key={order?._id}
                        className="bg-white w-full  mb-2 p-3 rounded-xl"
                      >
                        <p className="font-semibold font_medium">
                          {order?.name} - {order?.table?.table} #
                          {order?._id?.substring(order?._id?.length - 5)}
                        </p>
                        <div className="flex flex-row">
                          <img
                            src={order?.menu?.images[0]}
                            className="w-10 h-auto rounded-md"
                            alt="menu"
                          />
                          <div className="ml-2 font_bold text-sm space-y-2">
                            <p>{order?.menu?.foodName}</p>
                            <p>
                              {order?.quantity} portion
                              {order?.quantity > 1 && "s"}
                            </p>
                          </div>
                        </div>

                        <KitchenButton
                          title="Sent"
                          extraClasses="mt-2 text-green-600 bg-green-100 border-green-600"
                          loading={sent === order?._id}
                          onClick={() => handleSent(order?.parent, order?._id)}
                        />
                      </div>
                    ))}
              </div>

              {/* SENT */}
              <div className="relative flex flex-col items-center justify-start gap-y-3 w-[90vw] md:w-80 shrink-0 max-h-svh overflow-y-scroll bg-yellow-100 rounded-xl p-2 snap-center">
                <div className="sticky top-0 flex flex-row justify-center bg-yellow-500 items-center w-full gap-x-2 px-3 py-3 rounded-xl">
                  <p className="text-center font_medium text-white">Sent</p>
                </div>

                {restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  restaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "kitchen" && ro?.status === "sent"
                    )
                    ?.map((order: any) => (
                      <div
                        key={order?._id}
                        className="bg-white w-full  mb-2 p-3 rounded-xl"
                      >
                        <p className="font-semibold font_medium">
                          {order?.name} - {order?.table?.table} #
                          {order?._id?.substring(order?._id?.length - 5)}
                        </p>
                        <div className="flex flex-row">
                          <img
                            src={order?.menu?.images[0]}
                            className="w-10 h-auto rounded-md"
                            alt="menu"
                          />
                          <div className="ml-2 font_bold text-sm space-y-2">
                            <p>{order?.menu?.foodName}</p>
                            <p>
                              {order?.quantity} portion
                              {order?.quantity > 1 && "s"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>

              {/* COMPLETED */}
              <div className="relative flex flex-col items-center justify-start gap-y-3 w-[90vw] md:w-80 shrink-0 max-h-svh overflow-y-scroll  bg-gray-100 rounded-xl p-2 snap-center">
                <div className="sticky top-0 flex flex-row justify-center bg-green-900 items-center w-full gap-x-2 px-3 py-3 rounded-xl">
                  <p className="text-center font_medium text-white">
                    Completed
                  </p>
                </div>

                {restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  restaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "completed" &&
                        ro?.status === "completed"
                    )
                    ?.map((order: any) => (
                      <div
                        key={order?._id}
                        className="bg-white w-full  mb-2 p-3 rounded-xl"
                      >
                        <p className="font-semibold font_medium">
                          {order?.name} - {order?.table?.table} #
                          {order?._id?.substring(order?._id?.length - 5)}
                        </p>
                        <div className="flex flex-row">
                          <img
                            src={order?.menu?.images[0]}
                            className="w-10 h-auto rounded-md"
                            alt="menu"
                          />
                          <div className="ml-2 font_bold text-sm space-y-2">
                            <p>{order?.menu?.foodName}</p>
                            <p>
                              {order?.quantity} portion
                              {order?.quantity > 1 && "s"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>

              {/* DECLINE */}
              <div className="relative flex flex-col items-center justify-start gap-y-3 w-[90vw] md:w-80 shrink-0 max-h-svh overflow-y-scroll  bg-red-100 rounded-xl p-2 snap-center">
                <div className="sticky top-0 flex flex-row justify-center bg-red-900 items-center w-full gap-x-2 px-3 py-3 rounded-xl">
                  <p className="text-center font_medium text-white">Decline</p>
                </div>

                {restaurantOrders &&
                  restaurantOrders?.length > 0 &&
                  restaurantOrders
                    ?.filter(
                      (ro) =>
                        ro?.parentStatus === "kitchen" &&
                        ro?.status === "declined"
                    )
                    ?.map((order: any) => (
                      <div
                        key={order?._id}
                        className="bg-white w-full  mb-2 p-3 rounded-xl"
                      >
                        <p className="font-semibold font_medium">
                          {order?.name} - {order?.table?.table} #
                          {order?._id?.substring(order?._id?.length - 5)}
                        </p>
                        <div className="flex flex-row">
                          <img
                            src={order?.menu?.images[0]}
                            className="w-10 h-auto rounded-md"
                            alt="menu"
                          />
                          <div className="ml-2 font_bold text-sm space-y-2">
                            <p>{order?.menu?.foodName}</p>
                            <p>
                              {order?.quantity} portion
                              {order?.quantity > 1 && "s"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>

              {/* ARCHIVE */}
              {/* <div className="flex flex-col items-center justify-start gap-y-3 w-80 h-fit min-h-screen overflow-y-scroll  bg-gray-100 rounded-xl p-2">
              <div className="flex flex-row justify-center bg-gray-900 items-center w-full gap-x-2 px-3 py-3 rounded-xl">
                <p className="text-center font_medium text-white">Archive</p>
              </div>

              {restaurantOrders &&
                restaurantOrders?.length > 0 &&
                restaurantOrders
                  ?.filter((ro) => ro?.status === "kitchen")
                  ?.map((order: any) => (
                    <>
                      {order?.order
                        ?.filter((o) => o?.status === "archived")
                        ?.map((menuOrder, i) => (
                          <div
                            key={i}
                            className="bg-white w-full  mb-2 p-3 rounded-xl"
                          >
                            <p className="font-semibold font_medium">
                              {order.name} - {order.table} #
                              {menuOrder?.id?.substring(
                                menuOrder?.id?.length - 5
                              )}
                            </p>
                            <div className="flex flex-row">
                              <img
                                src={menuOrder?.menu?.images[0]}
                                className="w-10 h-auto rounded-md"
                                alt="menu"
                              />
                              <div className="ml-2 font_bold text-sm space-y-2">
                                <p>{menuOrder?.menu?.foodName}</p>
                                <p>
                                  {menuOrder?.quantity} portion
                                  {menuOrder?.quantity > 1 && "s"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  ))}
            </div> */}
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </InfiniteScroll>
      </div>

      <Modal
        open={declineModal}
        onClose={closeDeclineModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/5 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none">
          <div className="flex flex-col justify-between items-center p-0 h-full">
            <div
              className="h-fit my-3 w-100 w-full flex flex-col gap-y-5"
              style={{ minHeight: "80%" }}
            >
              <div className="flex flex-row items-start justify-between w-full py-1">
                <div className="flex flex-row items-start justify-center w-full">
                  <p className="flex-1 text-2xl text-center text-black font-medium font_medium">
                    Why
                  </p>
                </div>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeDeclineModal}
                />
              </div>

              <div
                className="flex flex-col justify-start items-center h-full w-full mb-5"
                style={{ minHeight: "80%" }}
              >
                <div className="flex flex-col items-center justify-between w-full mt-3 h-full overflow-y-auto">
                  <div className="flex flex-col items-start justify-start gap-y-2 w-full">
                    {DECLINE_REASONS?.map((reason, i) => (
                      <div
                        key={i}
                        className={`flex flex-row items-center justify-between w-full px-3 py-1 border border-neutral-100 rounded-md hover:bg-neutral-100 cursor-pointer ${
                          declineReason === reason ? "bg-neutral-100" : ""
                        }`}
                        onClick={() => setDeclineReason(reason)}
                      >
                        <p className="text-md capitalize font_medium text-black font-medium text-wrap">
                          {reason}
                        </p>

                        <div
                          className={`mr-4 w-7 h-7 mb-2 flex justify-center items-center self-center cursor-pointer ${
                            declineReason === reason
                              ? "border-2 primary_border_color rounded-full"
                              : ""
                          }`}
                          onClick={() => setDeclineReason(reason)}
                        >
                          <div
                            className={`w-5 h-5 rounded-full cursor-pointer ${
                              declineReason === reason
                                ? "primary_bg_color"
                                : "bg_check_inactive_payment"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    title="Decline"
                    extraClasses="mt-6 w-full bg-red-100 border-red-600"
                    loading={declineLoading}
                    onClick={() => {
                      if (!declineReason)
                        return alert("Please select a reason");

                      handleDecline(
                        declineOrder,
                        declineOrderMenu,
                        declineReason
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Kitchen;
