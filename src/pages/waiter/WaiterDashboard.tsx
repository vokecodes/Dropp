// @ts-nocheck
import { useState, useEffect, Fragment } from "react";
import { useSelector, shallowEqual } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import OrderItem from "./OrderItem";
import { SERVER } from "../../config/axios";
import { RESTAURANT_ORDER_URL } from "../../_redux/urls";
import MenuOrderItem from "./MenuOrderItem";
import WaiterLogoutButton from "../../components/WaiterLogoutButton";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { SoundNotification } from "../../components/SoundNotification";

const socket = io(import.meta.env.VITE_BASE_URL, {
  withCredentials: true,
});

const WaiterDashboard = () => {
  const { waiter } = useSelector(
    (state: any) => ({
      waiter: state.waiter.waiter,
    }),
    shallowEqual
  );
  const navigate = useNavigate();

  const [tableOrders, setTableOrders] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Flag to track if there are more items to load
  const [page, setPage] = useState(1); // Page number for pagination

  const getTableOrders = async (currentPage = 1) => {
    SERVER.get(
      `${RESTAURANT_ORDER_URL}/${waiter?.restaurant}/${waiter?.table}?page=${currentPage}`
    )
      .then(({ data }) => {
        if (currentPage === 1) {
          setTableOrders(data.data);
        } else {
          setTableOrders((prevTransactions: any) => [
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


  const [soundNotification, setSoundNotification] = useState(() => {
    return JSON.parse(localStorage.getItem("playSound")) || false;
  });
  const [playSound, setPlaySound] = useState(false);

  const receiveNotification = () => {
    setPlaySound(true);

    setTimeout(() => {
      setPlaySound(false);
    }, 3000);
  };

  useEffect(() => {
    const handleNewOrder = () => {
      getTableOrders(1);
      receiveNotification();
    };
  
    socket.on("newRestaurantOrder", handleNewOrder);
    socket.on("newReadyOrder", handleNewOrder);
    socket.on("updatedOrder", () => {getTableOrders(1)});
    
    return () => {
      socket.off("newRestaurantOrder", handleNewOrder);
      socket.off("newReadyOrder", handleNewOrder);
      socket.off("updatedOrder", () => {getTableOrders(1)});
    };
  }, []);

  const CATEGORIES = [
    {
      label: "New order",
      value: "pending",
    },
    { label: "Kitchen", value: "pending" },
    { label: "Cooking", value: "cooking" },
    { label: "Ready", value: "ready" },
    { label: "Completed", value: "completed" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedReadyOrder, setSelectedReadyOrder] = useState();

  const [ordersModal, setOrdersModal] = useState(false);
  const openOrdersModal = (order) => {
    setSelectedOrder(order);
    setOrdersModal(true);
  };
  const closeOrdersModal = () => {
    setSelectedOrder();
    setOrdersModal(false);
  };

  useEffect(() => {
    getTableOrders(page);
  }, []);

  const sortByUpdatedAt = (arr) => {
    return arr.sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA;
    });
  }

  const [columnCount, setColumnCount] = useState({
    "New order": [],
    Kitchen: [],
    Cooking: [],
    Ready: [],
    Completed: [],
  });

  useEffect(() => {
    const updatedColumnCount = {
      "New order": [],
      Kitchen: [],
      Cooking: [],
      Ready: [],
      Completed: [],
    };

    const sortedByDate = sortByUpdatedAt(tableOrders)

    sortedByDate &&
      sortedByDate?.length > 0 &&
      sortedByDate?.forEach((item, i) => {
        if (item?.status === "pending" && !updatedColumnCount["New order"]?.some(s => s.id === item.id)) {
          updatedColumnCount["New order"] = [...updatedColumnCount["New order"], item];
        }

        if (item?.status === "kitchen") {
          item?.order?.forEach((o: any) => {

            if (o?.status === "pending" && !updatedColumnCount["Kitchen"]?.some(s => s.id === item.id)){
              updatedColumnCount["Kitchen"] = [...updatedColumnCount["Kitchen"], item];
            }

            if ((o?.status === "ready" || o?.status === "sent") && !updatedColumnCount["Ready"]?.some(s => s.id === item.id)){
              updatedColumnCount["Ready"] = [...updatedColumnCount["Ready"], item];
            }

            if (o?.status === "cooking" && !updatedColumnCount["Cooking"]?.some(s => s.id === item.id)){
              updatedColumnCount["Cooking"] = [...updatedColumnCount["Cooking"], item];
            }
          });
        }

        if (item?.status === "completed" && !updatedColumnCount["Completed"]?.some(s => s.id === item.id)) {
          updatedColumnCount["Completed"] = [...updatedColumnCount["Completed"], item];
        }
      });

    setColumnCount(updatedColumnCount);
  }, [tableOrders]);

  
  
  return (
    <>
      <div className="lg:mx-5 px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <>
              <span className="sr-only">Homemade</span>
              <img className="h-5 lg:h-6 w-auto" src="/images/logo.svg" alt="" />
            </>
          </div>

          <div className="flex items-center justify-end">
            <SoundNotification 
              playNotif={playSound && soundNotification} 
              soundNotification={soundNotification}
              setSoundNotification={setSoundNotification}
              setPlaySound={setPlaySound}
            />

            <WaiterLogoutButton />
          </div>
        </div>
      </div>
      <div
        className="w-full h-screen px-3 lg:px-6 py-4"
        style={{ backgroundColor: "#F9F9F9" }}
      >
        <div className="px-2 flex justify-between items-center">
          <h3 className="font_bold text-2xl font-semibold">{waiter?.table}</h3>
          <Link
            to={`/restaurant/${waiter?.businessName}/${waiter?.table}`}
            target="_blank"
            className="inline-flex items-center justify-center primary_bg_color px-5 py-2 whitespace-nowrap text-lg text-white shadow-sm cursor-pointer rounded-xl font_medium"
          >
            Place Order
          </Link>
        </div>
        <div className="w-full h-fit py-1">
          {/* CATEGORIES */}
          <div className="w-full h-fit py-1">
            {CATEGORIES.length > 0 && (
              <div
                className="flex flex-row h-fit w-full px-2 pb-1 rounded my-1 gap-x-3 overflow-x-scroll"
                style={{ maxHeight: "250px" }}
              >
                {CATEGORIES.map((cat: any, i: number) => (
                  <div
                    key={i}
                    className={`flex flex-row justify-between bg-white items-center w-fit h-fit py-2 px-4 my-1 gap-x-1 rounded-full shrink-0 cursor-pointer ${
                      selectedCategory?.label === cat?.label
                        ? "primary_bg_color text-white"
                        : "bg_sec_gray_color text-gray-600"
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <div className="flex flex-row justify-between items-center">
                      {/* {cat.icons} */}
                      <div className="ml-1 flex flex-row justify-between items-center">
                        <p className="text-xs font-bold font_regular">
                          {`${cat?.label}`}
                        </p>
                        <div
                          className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center ${
                            selectedCategory?.label === cat?.label
                              ? "bg-black"
                              : "bg-white"
                          }`}
                        >
                          <p
                            className={`text-xs font_medium ${
                              selectedCategory?.label === cat?.label
                                ? "text-white"
                                : "primary_txt_color"
                            }`}
                          >
                            {columnCount[cat?.label]?.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl h-full w-full lg:p-5 mt-3 flex flex-col lg:flex-row justify-start items-center lg:items-start">
          <div className="w-full lg:w-8/12 h-full flex flex-col gap-x-5">
            <InfiniteScroll
              dataLength={tableOrders.length} // This is important to track the length of your data array
              next={() => {
                if (hasMore) {
                  getTableOrders(page);
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
              <div className="flex flex-col mt-2">

              {tableOrders ? (
                columnCount[selectedCategory?.label] && columnCount[selectedCategory?.label].length > 0 ? (
                  columnCount[selectedCategory?.label]?.map(
                    (tableOrder: any, i: number) => {
                      if(selectedCategory?.label !== 'Kitchen' && ['pending', 'completed'].includes(selectedCategory?.value)){
                        return (<OrderItem
                          key={i}
                          order={tableOrder}
                          selectedOrder={selectedOrder}
                          ordersModal={ordersModal}
                          openOrdersModal={() => openOrdersModal(tableOrder)}
                          closeOrdersModal={closeOrdersModal}
                          getTableOrders={getTableOrders}
                          selectedCategory={selectedCategory?.value}
                        />)
                      }else{
                        return (<MenuOrderItem
                          key={i}
                          orderStatus={selectedCategory?.value}
                          secondOrderStatus="sent"
                          thirdOrderStatus="declined"
                          order={tableOrder}
                          orderLength={tableOrder?.order?.length}
                          selectedOrder={selectedReadyOrder}
                          ordersModal={ordersModal} 
                          selectedCategory={selectedCategory?.value}
                          openOrdersModal={() => openOrdersModal(tableOrder)}
                          closeOrdersModal={() => closeOrdersModal()}
                          getTableOrders={getTableOrders}
                          selectedCategory={selectedCategory?.value}
                        />)
                      }
                    }
                  )
                ) : (
                  <div>No orders for the selected category.</div>
                )
              ) : (
                <div className="h-48 w-full flex flex-row items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#6D6D6D"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              )}
                
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaiterDashboard;
