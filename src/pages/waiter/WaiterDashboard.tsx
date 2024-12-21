import { useState, useEffect, Fragment, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import OrderItem from "./OrderItem";
import { SERVER } from "../../config/axios";
import { RESTAURANT_ORDER_URL } from "../../_redux/urls";
import MenuOrderItem from "./MenuOrderItem";
import WaiterLogoutButton from "../../components/WaiterLogoutButton";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { SoundNotification } from "../../components/SoundNotification";
import { getABusinessByName } from "../../_redux/business/businessCrud";
import InfinityScroll from "../../components/InfinityScroll";

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

  const [chef, setChef] = useState<any>(null);
  
  const getChef = async () => {
    try {
      const { data } = await getABusinessByName(waiter?.businessName);
      
      if (data) {
        setChef(data.data);
      }
    } catch (error) {
      console.log("chef err= ", error);
    }
  };

  const loading = useRef(false)
  const [hasMore, setHasMore] = useState({
    "pending": true,
    "cooking": true,
    "ready": true,
    "completed": true,
    "kitchen": true,
  });
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState<any>({});
  const [columnCount, setColumnCount] = useState({
    "pending": 0,
    "cooking": 0,
    "ready": 0,
    "completed": 0,
    "kitchen": 0,
  });
  
  const getTableOrders = async (currentPage = page, noSkip=true) => {
    if (loading.current) return;
    loading.current = true;

    try{
      const { data } = await SERVER.get(
        `${RESTAURANT_ORDER_URL}/waiter/${waiter?.restaurant}/${waiter?._id}?page=${currentPage}&waiterType=waiter`
      )

      const totalPages = data?.pagination.totalPages || 1;

      if (currentPage === 1) {
        setColumns({...data?.data[waiter?.table]});
      } else {
        setColumns((prevColumns: any) => {
          const updatedColumns = { ...prevColumns };
    
          Object.keys(data?.data[waiter?.table] || {}).forEach((status) => {
            if (!updatedColumns[status]) {
              updatedColumns[status] = [];
            }
    
            const existingIds = new Set(updatedColumns[status].map((item) => item.id));
  
            const newItems = data?.data[waiter?.table][status].filter((item) => !existingIds.has(item.id));
            
            updatedColumns[status] = [...updatedColumns[status], ...newItems];
          });
    
          return updatedColumns;
        });
      }
      
      setColumnCount((prev) => {
        const newCount = { ...prev };
        Object.keys(data?.columnCount[waiter?.table] || {}).forEach((status) => {
          newCount[status] = data.columnCount[waiter?.table][status]?.totalCount || 0;
        });
        return newCount;
      });
  
      setHasMore((prev) => {
        const newHasMore = { ...prev };
  
        Object.keys(data?.columnCount[waiter?.table] || {}).forEach((status) => {
          const totalCount = data.columnCount[waiter?.table][status]?.totalCount || 0;
          const currentCount =
            (columns[status]?.length || 0) + (data?.data[waiter?.table][status]?.length || 0);
          newHasMore[status] = currentCount < totalCount;
        });
  
        return newHasMore;
      });
  
      if(noSkip){
        setPage((prevPage) => {
          let newPage = 0
          newPage = prevPage < totalPages ? prevPage + 1 : prevPage
          return newPage
        });
      }
    }catch(error){
      console.error("Error fetching orders:", error);
    }finally{
      loading.current = false;
    }
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
    socket.on("updatedOrder", () => {
      getTableOrders(1);
    });

    return () => {
      socket.off("newRestaurantOrder", handleNewOrder);
      socket.off("newReadyOrder", handleNewOrder);
      socket.off("updatedOrder", () => {
        getTableOrders(1);
      });
    };
  }, []);

  const CATEGORIES = [
    {
      label: "New order",
      value: "pending",
    },
    { label: "Kitchen", value: "kitchen" },
    { label: "Cooking", value: "cooking" },
    { label: "Ready", value: "ready" },
    { label: "Completed", value: "completed" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [selectedReadyOrder, setSelectedReadyOrder] = useState();

  const [ordersModal, setOrdersModal] = useState(false);
  const openOrdersModal = (order) => {
    setSelectedOrder(order);
    setOrdersModal(true);
  };
  const closeOrdersModal = () => {
    setSelectedOrder({});
    setOrdersModal(false);
  };

  useEffect(() => {
    getTableOrders(1);
    getChef();
  }, []);

  const loadMore = () => {
    if(loading.current) return
    getTableOrders()
  }

  const sortByCreatedAt = (arr: { createdAt: string }[]) => {
    return arr.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  };

  const addDisplayIds = (restaurantOrders: any[]) => {
    const suffixes: { [key: string]: number } = {}; // Track suffixes for each restaurantOrder
  
    restaurantOrders.forEach((restaurantOrder) => {
      const parentId = restaurantOrder.id?.toString(); // Use restaurantOrder's unique ID
      suffixes[parentId] = 0; // Initialize suffix counter for this parent order
  
      restaurantOrder.order.forEach((item: any) => {
        const suffix = String.fromCharCode(97 + suffixes[parentId]); // Generate suffix (a, b, c, ...)
        item.displayId = `${parentId}-${suffix}`; // Add displayId to order item
        suffixes[parentId] += 1; // Increment suffix counter
      });
    });
  
    return restaurantOrders;
  };
  

  // Filter the object while retaining its structure
  const [filteredColumns, setFilteredColumns] = useState({})

  useEffect(() => {
    setFilteredColumns({})

    const localFiltered = Object.fromEntries(
      Object.entries(columns).map(([key, value]) => {
  
        // Sort by 'createdAt' before returning
        const sortedArray = sortByCreatedAt((value as any[]));
  
        // Add display IDs
        const withDisplayIds = addDisplayIds(sortedArray);
  
        // Return the key and the processed array
        return [key, withDisplayIds];
      })
    );

    setFilteredColumns({...localFiltered})
  }, [columnCount, columns, selectedCategory])

  console.log('column= ', filteredColumns, columnCount)

  return (
    <>
      <div className="lg:mx-5 px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <>
              <span className="sr-only">Homemade</span>
              <img
                className="h-5 lg:h-6 w-auto"
                src="/images/logo.svg"
                alt=""
              />
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
                            {columnCount[cat?.value]}
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
            <InfinityScroll
              data={filteredColumns[selectedCategory?.value] || []}
              getMore={loadMore}
              hasMore={hasMore[selectedCategory?.value]}
            >
              <div className="flex flex-col mt-2">
                {columns ? (
                  filteredColumns[selectedCategory?.value] &&
                  filteredColumns[selectedCategory?.value].length > 0 ? (
                    filteredColumns[selectedCategory?.value]?.map(
                      (tableOrder: any, i: number) => {
                        if (
                          ["pending", "completed"].includes(tableOrder?.status)
                        ) {
                          return (
                            <OrderItem
                              key={i}
                              order={tableOrder}
                              page={page}
                              selectedOrder={selectedOrder}
                              ordersModal={ordersModal}
                              openOrdersModal={() =>
                                openOrdersModal(tableOrder)
                              }
                              closeOrdersModal={closeOrdersModal}
                              getTableOrders={getTableOrders}
                              selectedCategory={selectedCategory?.value}
                              chef={chef}
                              waiter={waiter}
                              table={waiter?.table}
                            />
                          );
                        } else {
                          return (
                            <MenuOrderItem
                              key={i}
                              orderStatus={selectedCategory?.value}
                              secondOrderStatus="sent"
                              thirdOrderStatus="declined"
                              order={tableOrder}
                              orderLength={tableOrder?.order?.length}
                              selectedOrder={selectedReadyOrder}
                              ordersModal={ordersModal}
                              selectedCategory={selectedCategory?.value}
                              openOrdersModal={() =>
                                openOrdersModal(tableOrder)
                              }
                              closeOrdersModal={() => closeOrdersModal()}
                              getTableOrders={getTableOrders}
                              chef={chef}
                              waiter={waiter}
                              table={waiter?.table}
                            />
                          );
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
            </InfinityScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaiterDashboard;
