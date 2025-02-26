import { useSelector, shallowEqual } from "react-redux";
import { useLocation } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { RiWallet3Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { CiForkAndKnife } from "react-icons/ci";
import { MdHomeFilled, MdOutlineFoodBank } from "react-icons/md";
import { GiKnifeFork } from "react-icons/gi";
import { FaSquarePollVertical } from "react-icons/fa6";
import MenuItem from "./MenuItem";
import TopNav from "./TopNav";
import Button from "./Button";
import { DashboardLayoutProps } from "../utils/Interfaces";
import {
  CHEF_ROUTES,
  STOREFRONT_ROUTES,
  SUB_CHEF_ROUTES,
} from "../routes/routes";
import LogoutButton from "./LogoutButton";
import { LuUsers } from "react-icons/lu";
import { STOREFRONT_USER, SUB_CHEF_USER } from "../config/UserType";

const ChefDashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  const { user, auth } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
      user: state.user.user,
    }),
    shallowEqual
  );

  const menuItems = [
    {
      icon: (
        <MdHomeFilled
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChef ? "#06c167" : "#787878"
          }
        />
      ),
      title: "Home",
      active: location?.pathname === CHEF_ROUTES.linkChef,
      to: CHEF_ROUTES.linkChef,
    },
    {
      icon: (
        <FaSquarePollVertical
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefReports
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Reports",
      active: location?.pathname === CHEF_ROUTES.linkChefReports,
      to: CHEF_ROUTES.linkChefReports,
      pro: true,
    },
    {
      icon: (
        <CgFileDocument
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefOrders
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Orders",
      active: location?.pathname === CHEF_ROUTES.linkChefOrders,
      to: CHEF_ROUTES.linkChefOrders,
    },
    {
      icon: (
        <CiForkAndKnife
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefDineIn
              ? "#06c167"
              : location?.pathname === CHEF_ROUTES.linkChefTableManagement
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Dine-in",
      active:
        location?.pathname === CHEF_ROUTES.linkChefDineIn ||
        location?.pathname === CHEF_ROUTES.linkChefTableManagement,
      to: CHEF_ROUTES.linkChefDineIn,
      pro: true,
    },
    {
      icon: (
        <MdOutlineFoodBank
          size={28}
          color={
            location?.pathname === CHEF_ROUTES.linkChefMenu
              ? "#06c167"
              : location?.pathname === CHEF_ROUTES.linkChefMenuOnline
              ? "#06c167"
              : location?.pathname === CHEF_ROUTES.linkChefMenuDineIn
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Menu",
      active:
        location?.pathname === CHEF_ROUTES.linkChefMenu ||
        location?.pathname === CHEF_ROUTES.linkChefMenuOnline ||
        location?.pathname === CHEF_ROUTES.linkChefMenuDineIn,
      to: CHEF_ROUTES.linkChefMenu,
    },
    {
      icon: (
        <GiKnifeFork
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkKitchen
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Kitchen",
      active: location?.pathname === CHEF_ROUTES.linkKitchen,
      to: CHEF_ROUTES.linkKitchen,
      pro: true,
    },
    {
      icon: (
        <RiWallet3Line
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefWallet
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Wallet",
      active: location?.pathname === CHEF_ROUTES.linkChefWallet,
      to: CHEF_ROUTES.linkChefWallet,
    },
    {
      icon: (
        <BsChatDots
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefChat
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Chat",
      active: location?.pathname === CHEF_ROUTES.linkChefChat,
      to: CHEF_ROUTES.linkChefChat,
    },
    {
      icon: (
        <LuUsers
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkSubChefs
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Sub Admins",
      active: location?.pathname === CHEF_ROUTES.linkSubChefs,
      to: CHEF_ROUTES.linkSubChefs,
      pro: true,
    },
    {
      icon: (
        <AiFillSetting
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefSettings
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === CHEF_ROUTES.linkChefSettings,
      to: CHEF_ROUTES.linkChefSettings,
    },
  ];

  const storefrontMenuItems = [
    {
      icon: (
        <MdHomeFilled
          size={24}
          color={
            location?.pathname === STOREFRONT_ROUTES.linkStorefront
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Home",
      active: location?.pathname === STOREFRONT_ROUTES.linkStorefront,
      to: STOREFRONT_ROUTES.linkStorefront,
    },
    {
      icon: (
        <FaSquarePollVertical
          size={24}
          color={
            location?.pathname === STOREFRONT_ROUTES.linkStorefrontReports
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Reports",
      active: location?.pathname === STOREFRONT_ROUTES.linkStorefrontReports,
      to: STOREFRONT_ROUTES.linkStorefrontReports,
    },

    {
      icon: (
        <MdOutlineFoodBank
          size={28}
          color={
            location?.pathname === STOREFRONT_ROUTES.linkStorefrontMenu
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Menu",
      active: location?.pathname === STOREFRONT_ROUTES.linkStorefrontMenu,
      to: STOREFRONT_ROUTES.linkStorefrontMenu,
    },
    {
      icon: (
        <CgFileDocument
          size={24}
          color={
            location?.pathname === STOREFRONT_ROUTES.linkStorefrontOrders
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Orders",
      active: location?.pathname === STOREFRONT_ROUTES.linkStorefrontOrders,
      to: STOREFRONT_ROUTES.linkStorefrontOrders,
    },
    {
      icon: (
        <RiWallet3Line
          size={24}
          color={
            location?.pathname === STOREFRONT_ROUTES.linkStorefrontWallet
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "My Wallet",
      active: location?.pathname === STOREFRONT_ROUTES.linkStorefrontWallet,
      to: STOREFRONT_ROUTES.linkStorefrontWallet,
    },
    {
      icon: (
        <BsChatDots
          size={24}
          color={
            location?.pathname === STOREFRONT_ROUTES.linkStorefrontChat
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Chats",
      active: location?.pathname === STOREFRONT_ROUTES.linkStorefrontChat,
      // to: STOREFRONT_ROUTES.linkStorefrontChat,
      coming: true,
    },
    {
      icon: (
        <AiFillSetting
          size={24}
          color={
            location?.pathname === STOREFRONT_ROUTES.linkStorefrontSettings
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === STOREFRONT_ROUTES.linkStorefrontSettings,
      to: STOREFRONT_ROUTES.linkStorefrontSettings,
    },
  ];

  const restaurantMenuItems = [
    {
      icon: (
        <MdHomeFilled
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChef ? "#06c167" : "#787878"
          }
        />
      ),
      title: "Home",
      active: location?.pathname === CHEF_ROUTES.linkChef,
      to: CHEF_ROUTES.linkChef,
    },
    {
      icon: (
        <FaSquarePollVertical
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefReports
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Reports",
      active: location?.pathname === CHEF_ROUTES.linkChefReports,
      to: CHEF_ROUTES.linkChefReports,
      beta: true,
    },
    {
      icon: (
        <CiForkAndKnife
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefDineIn
              ? "#06c167"
              : location?.pathname === CHEF_ROUTES.linkChefTableManagement
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Dine-in",
      active:
        location?.pathname === CHEF_ROUTES.linkChefDineIn ||
        location?.pathname === CHEF_ROUTES.linkChefTableManagement,
      to: CHEF_ROUTES.linkChefDineIn,
    },
    {
      icon: (
        <MdOutlineFoodBank
          size={28}
          color={
            location?.pathname === CHEF_ROUTES.linkChefMenu
              ? "#06c167"
              : location?.pathname === CHEF_ROUTES.linkChefMenuOnline
              ? "#06c167"
              : location?.pathname === CHEF_ROUTES.linkChefMenuDineIn
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Menu",
      active:
        location?.pathname === CHEF_ROUTES.linkChefMenu ||
        location?.pathname === CHEF_ROUTES.linkChefMenuOnline ||
        location?.pathname === CHEF_ROUTES.linkChefMenuDineIn,
      to: CHEF_ROUTES.linkChefMenu,
    },
    {
      icon: (
        <GiKnifeFork
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkKitchen
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Kitchen",
      active: location?.pathname === CHEF_ROUTES.linkKitchen,
      to: CHEF_ROUTES.linkKitchen,
      newTab: true,
    },
    {
      icon: (
        <RiWallet3Line
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefWallet
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Wallet",
      active: location?.pathname === CHEF_ROUTES.linkChefWallet,
      to: CHEF_ROUTES.linkChefWallet,
    },
    {
      icon: (
        <BsChatDots
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefChat
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Chat",
      active: location?.pathname === CHEF_ROUTES.linkChefChat,
      to: CHEF_ROUTES.linkChefChat,
    },
    {
      icon: (
        <LuUsers
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkSubChefs
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Sub Admins",
      active: location?.pathname === CHEF_ROUTES.linkSubChefs,
      to: CHEF_ROUTES.linkSubChefs,
    },
    {
      icon: (
        <AiFillSetting
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefSettings
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === CHEF_ROUTES.linkChefSettings,
      to: CHEF_ROUTES.linkChefSettings,
    },
  ];

  const subChefMenuItems = [
    {
      icon: (
        <MdOutlineFoodBank
          size={28}
          color={
            location?.pathname === SUB_CHEF_ROUTES.linkSubChef
              ? "#06c167"
              : location?.pathname === SUB_CHEF_ROUTES.linkSubChefMenuOnline
              ? "#06c167"
              : location?.pathname === SUB_CHEF_ROUTES.linkSubChefMenuDineIn
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Menu",
      active:
        location?.pathname === SUB_CHEF_ROUTES.linkSubChef ||
        location?.pathname === SUB_CHEF_ROUTES.linkSubChefMenuOnline ||
        location?.pathname === SUB_CHEF_ROUTES.linkSubChefMenuDineIn,
      to: SUB_CHEF_ROUTES.linkSubChef,
    },
    {
      icon: (
        <FaSquarePollVertical
          size={24}
          color={
            location?.pathname === SUB_CHEF_ROUTES.linkSubChefReports
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Reports",
      active: location?.pathname === SUB_CHEF_ROUTES.linkSubChefReports,
      to: SUB_CHEF_ROUTES.linkSubChefReports,
      beta: true,
    },
    {
      icon: (
        <CiForkAndKnife
          size={24}
          color={
            location?.pathname === SUB_CHEF_ROUTES.linkSubChefDineIn
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Dine-in",
      active: location?.pathname === SUB_CHEF_ROUTES.linkSubChefDineIn,
      to: SUB_CHEF_ROUTES.linkSubChefDineIn,
    },
    {
      icon: (
        <CgFileDocument
          size={24}
          color={
            location?.pathname === SUB_CHEF_ROUTES.linkSubChefTableManagement
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Tables",
      active: location?.pathname === SUB_CHEF_ROUTES.linkSubChefTableManagement,
      to: SUB_CHEF_ROUTES.linkSubChefTableManagement,
    },
    {
      icon: (
        <GiKnifeFork
          size={24}
          color={
            location?.pathname === SUB_CHEF_ROUTES.linkKitchen
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Kitchen",
      active: location?.pathname === SUB_CHEF_ROUTES.linkKitchen,
      to: SUB_CHEF_ROUTES.linkKitchen,
      newTab: true,
    },
    {
      icon: (
        <AiFillSetting
          size={24}
          color={
            location?.pathname === SUB_CHEF_ROUTES.linkSubChefSettings
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === SUB_CHEF_ROUTES.linkSubChefSettings,
      to: SUB_CHEF_ROUTES.linkSubChefSettings,
    },
  ];

  return (
    <div className="dashboard_bg">
      <TopNav />
      <div className="py-5 w-full h-screen lg:flex">
        <div className="hidden lg:block lg:w-1/5">
          <div className="fixed h-screen" style={{ width: "17.12rem" }}>
            <div className="h-5/6 w-full bg-white py-4 pr-3 flex flex-col">
              <p className="pl-10 text-lg text-black font_medium">
                Hi {user?.firstName},
              </p>
              <p className="pl-10 text-sm gray_color font_medium">
                {user?.email}
              </p>
              <div className="mt-5 flex-1">
                <>
                  {auth?.user?.userType === SUB_CHEF_USER ? (
                    <>
                      {subChefMenuItems?.map((item, i) => (
                        <MenuItem
                          key={i}
                          icon={item?.icon}
                          title={item?.title}
                          active={item?.active}
                          to={item?.to}
                          newTab={item?.newTab}
                        />
                      ))}
                    </>
                  ) : auth?.user?.chefType === STOREFRONT_USER ? (
                    <>
                      {storefrontMenuItems?.map((item: any, i) => (
                        <MenuItem
                          key={i}
                          icon={item?.icon}
                          title={item?.title}
                          active={item?.active}
                          to={item?.to}
                          newTab={item?.newTab}
                          beta={item?.beta}
                          pro={item?.pro}
                          coming={item?.coming}
                        />
                      ))}
                    </>
                  ) : auth?.user?.isRestaurant ? (
                    <>
                      {restaurantMenuItems?.map((item: any, i) => (
                        <MenuItem
                          key={i}
                          icon={item?.icon}
                          title={item?.title}
                          active={item?.active}
                          to={item?.to}
                          newTab={item?.newTab}
                          beta={item?.beta}
                          pro={item?.pro}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {menuItems?.map((item: any, i) => (
                        <MenuItem
                          key={i}
                          icon={item?.icon}
                          title={item?.title}
                          active={item?.active}
                          to={item?.to}
                          newTab={item?.newTab}
                          beta={item?.beta}
                          pro={item?.pro}
                        />
                      ))}
                    </>
                  )}
                </>

                <LogoutButton />
              </div>
              <div className="ml-8">
                <Button
                  title="Contact Support"
                  extraClasses="w-44 text-sm"
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

export default ChefDashboardLayout;
