// @ts-nocheck
import { useState, useEffect, Fragment } from "react";
import { useSelector, shallowEqual } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import OrderItem from "./OrderItem";
import { SERVER } from "../../config/axios";
import { RESTAURANT_ORDER_URL, RESTAURANT_TABLE_URL } from "../../_redux/urls";
import MenuOrderItem from "./MenuOrderItem";
import WaiterLogoutButton from "../../components/WaiterLogoutButton";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { getTables } from "../../_redux/table/tableAction";
import { useAppDispatch } from "../../redux/hooks";
import { ClickAwayListener } from "@mui/material";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import io from "socket.io-client";
import { SoundNotification } from "../../components/SoundNotification";
import { getABusinessByName } from "../../_redux/business/businessCrud";

const socket = io(import.meta.env.VITE_BASE_URL, {
  withCredentials: true,
});



const SuperWaiterDashboard = () => {
  const { superWaiter } = useSelector(
    (state: any) => ({
      superWaiter: state.waiter.superWaiter,
    }),
    shallowEqual
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [restaurantOrders, setRestaurantOrders] = useState([]);
  const [table, setTable] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Flag to track if there are more items to load
  const [page, setPage] = useState(1); // Page number for pagination
  const [chef, setChef] = useState<any>(null);

  const getChef = async () => {
    try {
      const { data } = await getABusinessByName(superWaiter?.businessName);

      if (data) {
        setChef(data.data);
      }
    } catch (error) {
    }
  };

  const getRestaurantOrders = async (currentPage = 1) => {
    SERVER.get(
      `${RESTAURANT_ORDER_URL}/all-restaurant-orders/${superWaiter?.restaurant}?page=${currentPage}`
    )
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
  
  const getRestaurantTables = async () => {
    SERVER.get(
      `${RESTAURANT_TABLE_URL}/super-tables/${superWaiter?.restaurant}`
    )
      .then(({ data }) => {
        setTable(data?.data);
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


  // Listen for new orders from the server
  useEffect(() => {
    const handleNewOrder = () => {
      getRestaurantOrders(1);
      receiveNotification();
    };
  
    socket.on("newRestaurantOrder", handleNewOrder);
    socket.on("newReadyOrder", handleNewOrder);
    socket.on("updatedOrder", () => {getRestaurantOrders(1)});
    
    return () => {
      socket.off("newRestaurantOrder", handleNewOrder);
      socket.off("newReadyOrder", handleNewOrder);
      socket.off("updatedOrder", () => {getRestaurantOrders(1)});
    };
  }, []);

  const CATEGORIES = [
    { label: "New order", value: "pending" },
    { label: "Kitchen", value: "pending" },
    { label: "Cooking", value: "cooking" },
    { label: "Ready", value: "ready" },
    { label: "Completed", value: "completed" },
  ];

  
  const [tablesMap, setTablesMap] = useState({})
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  
  const [selectedTable, setSelectedTable] = useState(null);
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

  const [openTableLinks, setOpenTableLinks] = useState(false);

  const handleClickAway = () => setOpenTableLinks(false);

  useEffect(() => {
    getRestaurantTables();
    getRestaurantOrders(page);
    getChef();
  }, []);

  const sortByUpdatedAt = (arr) => {
    return arr.sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA;
    });
  }

  useEffect(() => {
    const tableOrderMap = {};
    const sortedByDate = sortByUpdatedAt(restaurantOrders)

    table && superWaiter && table?.length > 0 && table.filter(table => table.userType === 'waiter' && superWaiter.subTables.includes(table._id) ).map((item, i) => {

      tableOrderMap[item?.table] = {
        "New order": [],
        Kitchen: [],
        Cooking: [],
        Ready: [],
        Completed: [],
      }
    })

    table && superWaiter && sortedByDate &&
      sortedByDate?.length > 0 && sortedByDate.forEach(order => {
        const tableNumber = order?.table?.table;
        const orderArray = order?.order;
        const orderStatus = order?.status;

        if(!tableNumber || !superWaiter.subTables.includes(order?.table._id)){
          return;
        }

        if (orderStatus === "pending") {
          tableOrderMap[tableNumber]["New order"]?.push(order)
        }
        
        if (orderStatus === "kitchen") {
          order?.order?.forEach((o: any) => {
            if (o?.status === "pending") {
              if(tableOrderMap[tableNumber]["Kitchen"].some(item => item.id === order.id)){
                return
              }else{
                tableOrderMap[tableNumber]["Kitchen"]?.push(order)
              }
            }
            
            if (o?.status === "ready" || o?.status === "sent") {
              if(tableOrderMap[tableNumber]["Ready"].some(item => item.id === order.id)){
                return
              }else{
                tableOrderMap[tableNumber]["Ready"]?.push(order)
              }
            }
            
            if (o?.status === "cooking") {
              if(tableOrderMap[tableNumber]["Cooking"].some(item => item.id === order.id)){
                return
              }else{
                tableOrderMap[tableNumber]["Cooking"]?.push(order)
              }
            }
          });
        }
        
        if (orderStatus === "completed") {
          tableOrderMap[tableNumber]["Completed"]?.push(order)
        }
      }
    );

    setTablesMap(tableOrderMap)
    !selectedTable && setSelectedTable(Object.keys(tableOrderMap)[0])
  }, [restaurantOrders, table])


  return (
    <>
      <div className="lg:mx-5 px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <>
              <span className="sr-only">Dropp</span>
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
          <h3 className="font_bold text-2xl font-semibold">{superWaiter?.table}</h3>

          <div className="mt-2 lg:mt-0">
            <div className="inline-flex items-center justify-center primary_bg_color px-5 py-2 whitespace-nowrap shadow-sm cursor-pointer rounded-xl font_medium"
              onClick={() => {
                setOpenTableLinks(!openTableLinks);
              }}
            >
              <p className={`text-xs lg:text-sm font_medium text-lg text-white`}>
                Place Order
              </p>
              {openTableLinks ? (
                <TiArrowSortedUp color="#ffffff" size={20} />
              ) : (
                <TiArrowSortedDown color="#ffffff" size={20} />
              )}
            </div>
            {openTableLinks && (
              <ClickAwayListener
                onClickAway={() => handleClickAway()}
              >
                <div
                  className={`absolute z-10 bg-white mb-2 w-32 lg:w-36 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black`}
                >
                  {Object.keys(tablesMap)?.map((item: any, i: number) => (
                    <Link key={i} to={`/restaurant/${superWaiter?.businessName}/${item}`} target="_blank" >
                      <div className="flex items-center cursor-pointer mb-2 hover:bg-neutral-200" >
                        <p
                          className={`text-xs lg:text-sm secondary_gray_color text-black`}
                        >
                          {item}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>

        <div className="w-full h-fit py-1">
          {/* TABLES */}
          <div className="w-full h-fit py-1">
            {table?.length > 0 && (
              <div
                className="flex flex-row h-fit w-full px-2 pb-1 rounded my-1 gap-x-3 overflow-x-scroll reduce-scrollbar"
                style={{ maxHeight: "250px" }}
              >
                {Object.keys(tablesMap).map((cat: any, i: number) => (
                  <div
                    key={i}
                    className={`flex flex-row justify-between items-center w-fit h-fit py-2 px-4 my-1 gap-x-1 rounded-full shrink-0 cursor-pointer ${
                      selectedTable === cat
                        ? "bg-[#888888] text-white"
                        : "bg_sec_gray_color text-gray-600"
                    }`}
                    onClick={() => setSelectedTable(cat)}
                  >
                    <div className="flex flex-row justify-between items-center">
                      <div className="ml-1 flex flex-row justify-between items-center">
                        <p className="text-xs font-bold font_regular">
                          {`${cat}`}
                        </p>
                        <div
                          className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center ${
                            selectedTable === cat
                              ? "bg-[#383838]"
                              : "bg-white"
                          }`}
                        >
                          <p
                            className={`text-xs font_medium ${
                              selectedTable === cat
                                ? "text-white"
                                : "primary_txt_color"
                            }`}
                          >
                            {tablesMap && tablesMap[cat]["New order"]?.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* CATEGORIES */}
          <div className="w-full h-fit py-1">
            {CATEGORIES.length > 0 && (
              <div
                className="flex flex-row h-fit w-full px-2 pb-1 rounded my-1 gap-x-3 overflow-x-scroll reduce-scrollbar"
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
                      <div className="ml-1 flex flex-row justify-between items-center">
                        <p className="text-xs font-bold font_regular">
                          {`${cat?.label}`}
                        </p>
                        <div
                          className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center ${
                            selectedCategory?.label === cat?.label
                              ? "bg-[#03391F]"
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
                            { tablesMap && tablesMap[selectedTable] && tablesMap[selectedTable][cat?.label]?.length }
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
              dataLength={restaurantOrders.length}
              next={() => {
                if (hasMore) {
                  getRestaurantOrders(page);
                }
              }}
              hasMore={hasMore}
              endMessage={
                <p className="mt-5 text-center font_medium">
                  Yay, you've seen it all.
                </p>
              }
            >
              <div className="flex flex-col mt-2">
                {tablesMap ? (
                  tablesMap[selectedTable] ? (
                    tablesMap[selectedTable][selectedCategory?.label] && tablesMap[selectedTable][selectedCategory?.label].length > 0 ? (
                      tablesMap[selectedTable][selectedCategory?.label]?.map(
                        (tableOrder: any, i: number) => {
                          if(selectedCategory?.label !== 'Kitchen' && ['pending', 'completed'].includes(selectedCategory?.value)){
                            return (<OrderItem
                              key={i}
                              order={tableOrder}
                              selectedOrder={selectedOrder}
                              ordersModal={ordersModal}
                              openOrdersModal={() => openOrdersModal(tableOrder)}
                              closeOrdersModal={closeOrdersModal}
                              getTableOrders={getRestaurantOrders}
                              selectedCategory={selectedCategory?.value}
                              chef={chef}
                              waiter={table.filter(item => item.table === selectedTable)[0]}
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
                              getTableOrders={getRestaurantOrders}
                              selectedCategory={selectedCategory?.value}
                              chef={chef}
                              waiter={table.filter(item => item.table === selectedTable)[0]}
                            />)
                          }
                        }
                      )
                    ) : (
                      <div>No orders for the selected category.</div>
                    )
                  ) : (
                    <div>No table selected.</div>
                  )
                ) : (
                  <div>No tables available.</div>
                )}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperWaiterDashboard;
