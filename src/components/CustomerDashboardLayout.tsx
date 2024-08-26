import { useSelector, shallowEqual } from "react-redux";
import { useLocation } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { RxStarFilled } from "react-icons/rx";
import { RiWallet3Line } from "react-icons/ri";
import { GrFavorite } from "react-icons/gr";
import { BsChatDots } from "react-icons/bs";
import MenuItem from "./MenuItem";
import TopNav from "./TopNav";
import Button from "./Button";
import { DashboardLayoutProps } from "../utils/Interfaces";
import { CUSTOMER_ROUTES, HOME_ROUTES } from "../routes/routes";
import LogoutButton from "./LogoutButton";

const CustomerDashboardLayout = ({ page, children }: DashboardLayoutProps) => {
  const location = useLocation();

  const { user } = useSelector(
    (state: any) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  const menuItems = [
    {
      icon: <AiOutlineSearch size={24} color={"#787878"} />,
      title: "Find a meal",
      active: false,
      to: HOME_ROUTES.linkExplore,
    },
    {
      icon: (
        <CgFileDocument
          size={24}
          color={
            location?.pathname === CUSTOMER_ROUTES.linkCustomer ||
            location?.pathname === CUSTOMER_ROUTES.linkCustomerOrders
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "My Orders",
      active:
        location?.pathname === CUSTOMER_ROUTES.linkCustomer ||
        location?.pathname === CUSTOMER_ROUTES.linkCustomerOrders,
      to: CUSTOMER_ROUTES.linkCustomer,
    },
    {
      icon: (
        <RiWallet3Line
          size={24}
          color={
            location?.pathname === CUSTOMER_ROUTES.linkCustomerWallet
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "My Wallet",
      active: location?.pathname === CUSTOMER_ROUTES.linkCustomerWallet,
      to: CUSTOMER_ROUTES.linkCustomerWallet,
    },
    {
      icon: (
        <GrFavorite
          size={24}
          color={
            location?.pathname === CUSTOMER_ROUTES.linkCustomerFavourites
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "My Favourites",
      active: location?.pathname === CUSTOMER_ROUTES.linkCustomerFavourites,
      to: CUSTOMER_ROUTES.linkCustomerFavourites,
    },
    // {
    //   icon: (
    //     <CiForkAndKnife
    //       size={24}
    //       color={
    //         // location?.pathname === CUSTOMER_ROUTES.linkChefWallet
    //         //   ? "#06c167"
    //         //   :
    //         "#787878"
    //       }
    //     />
    //   ),
    //   title: "Start Cooking Too",
    //   active: false,
    //   to: HOME_ROUTES.linkChefLandingPage,
    // },
    {
      icon: (
        <BsChatDots
          size={24}
          color={
            location?.pathname === CUSTOMER_ROUTES.linkCustomerChat
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Chat",
      active: location?.pathname === CUSTOMER_ROUTES.linkCustomerChat,
      to: CUSTOMER_ROUTES.linkCustomerChat,
    },
    {
      icon: (
        <div
          className={`w-6 h-6 rounded-md flex items-center justify-center ${
            location?.pathname === CUSTOMER_ROUTES.linkCustomerSubscription
              ? "primary_bg_color"
              : "bg_sec_gray_color"
          }`}
        >
          <RxStarFilled
            size={12}
            color={
              location?.pathname === CUSTOMER_ROUTES.linkCustomerSubscription
                ? "#fff"
                : "#06c167"
            }
          />
        </div>
      ),
      title: "Subscription",
      active: location?.pathname === CUSTOMER_ROUTES.linkCustomerSubscription,
      to: CUSTOMER_ROUTES.linkCustomerSubscription,
    },
    {
      icon: (
        <AiFillSetting
          size={24}
          color={
            location?.pathname === CUSTOMER_ROUTES.linkCustomerSettings
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === CUSTOMER_ROUTES.linkCustomerSettings,
      to: CUSTOMER_ROUTES.linkCustomerSettings,
    },
  ];

  return (
    <div className="dashboard_bg">
      <TopNav />
      <div className="py-5 w-full h-screen lg:flex">
        <div className="hidden lg:block lg:w-1/5">
          <div
            className="fixed h-screen w-[20%]"
            // style={{ width: "17.12rem" }}
          >
            <div className="h-5/6 w-full bg-white py-4 pr-3 flex flex-col">
              <p className="pl-10 text-lg text-black font_medium">
                Hi {user?.firstName},
              </p>
              <p className="pl-10 text-sm gray_color font_medium">
                {user?.email}
              </p>
              <div className="mt-10 flex-1">
                {menuItems?.map((item, i) => (
                  <MenuItem
                    key={i}
                    icon={item?.icon}
                    title={item?.title}
                    active={item?.active}
                    to={item?.to}
                  />
                ))}
                <LogoutButton />
              </div>
              <div className="ml-8">
                <Button
                  title="Contact Support"
                  extraClasses="w-5/6 text-sm"
                  onClick={() =>
                    window.open(
                      "https://getdropp.notion.site/Homemade-Help-Center-f8653ff874e544c385113e3622daf64e",
                      "_blank"
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-4/5">{children}</div>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;
