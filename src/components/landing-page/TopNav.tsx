/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { Popover, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { BsChatDots } from "react-icons/bs";
import { RiWallet3Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { CiForkAndKnife } from "react-icons/ci";
import { MdHomeFilled, MdOutlineFoodBank } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { AiOutlineSearch, AiFillSetting } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { RxStarFilled } from "react-icons/rx";
import Button from "../Button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BsFillHandbagFill } from "react-icons/bs";
import {
  AUTH_ROUTES,
  CHEF_ROUTES,
  COMPANY_ROUTES,
  CUSTOMER_ROUTES,
  HOME_ROUTES,
  SUB_CHEF_ROUTES,
} from "../../routes/routes";
import MenuItem from "../MenuItem";
import LogoutButton from "../LogoutButton";
import { USER_TYPE } from "../../utils/Globals";
import TrackGoogleAnalyticsEvent from "../TrackGoogleAnalyticsEvent";
import { FaSquarePollVertical } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";

const TopNav = ({ showCart, onClickCart, cartTotalItems, event }: any) => {
  const navigate = useNavigate();

  const location = useLocation();

  const { user, person } = useSelector(
    (state: any) => ({
      user: state.auth.user,
      person: state.user.user,
    }),
    shallowEqual
  );

  const companyMenuItems = [
    {
      icon: (
        <MdHomeFilled
          size={24}
          color={
            location?.pathname === COMPANY_ROUTES.linkCompany
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Home",
      active: location?.pathname === COMPANY_ROUTES.linkCompany,
      to: COMPANY_ROUTES.linkCompany,
    },
    {
      icon: (
        <CgFileDocument
          size={24}
          color={
            location?.pathname === COMPANY_ROUTES.linkCompanyEmployees
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Employees",
      active: location?.pathname === COMPANY_ROUTES.linkCompanyEmployees,
      to: COMPANY_ROUTES.linkCompanyEmployees,
    },
    {
      icon: (
        <RiWallet3Line
          size={24}
          color={
            location?.pathname === COMPANY_ROUTES.linkCompanyWallet
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "My Wallet",
      active: location?.pathname === COMPANY_ROUTES.linkCompanyWallet,
      to: COMPANY_ROUTES.linkCompanyWallet,
    },
    {
      icon: (
        <AiFillSetting
          size={24}
          color={
            location?.pathname === COMPANY_ROUTES.linkCompanySettings
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === COMPANY_ROUTES.linkCompanySettings,
      to: COMPANY_ROUTES.linkCompanySettings,
    },
  ];

  const chefMenuItems = [
    {
      icon: (
        <MdHomeFilled
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChef ? "#e85666" : "#787878"
          }
        />
      ),
      title: "Home",
      active: location?.pathname === CHEF_ROUTES.linkChef,
      to: CHEF_ROUTES.linkChef,
    },
    {
      icon: (
        <CgFileDocument
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefOrders
              ? "#e85666"
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
            location?.pathname === CHEF_ROUTES.linkChefMenu
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Menu",
      active: location?.pathname === CHEF_ROUTES.linkChefMenu,
      to: CHEF_ROUTES.linkChefMenu,
    },
    {
      icon: (
        <RiWallet3Line
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefWallet
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "My Wallet",
      active: location?.pathname === CHEF_ROUTES.linkChefWallet,
      to: CHEF_ROUTES.linkChefWallet,
    },
    {
      icon: (
        <BsChatDots
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefChat
              ? "#e85666"
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
        <AiFillSetting
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefSettings
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === CHEF_ROUTES.linkChefSettings,
      to: CHEF_ROUTES.linkChefSettings,
    },
  ];

  const restaurantMenuItems = [
    {
      icon: (
        <MdHomeFilled
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChef ? "#e85666" : "#787878"
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
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Reports",
      active: location?.pathname === CHEF_ROUTES.linkChefReports,
      to: CHEF_ROUTES.linkChefReports,
    },
    {
      icon: (
        <CgFileDocument
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefOrders
              ? "#e85666"
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
              ? "#e85666"
              : location?.pathname === CHEF_ROUTES.linkChefTableManagement
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Dine in",
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
              ? "#e85666"
              : location?.pathname === CHEF_ROUTES.linkChefMenuOnline
              ? "#e85666"
              : location?.pathname === CHEF_ROUTES.linkChefMenuDineIn
              ? "#e85666"
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
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Kitchen",
      active: location?.pathname === CHEF_ROUTES.linkKitchen,
      to: CHEF_ROUTES.linkKitchen,
    },
    {
      icon: (
        <RiWallet3Line
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefWallet
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "My Wallet",
      active: location?.pathname === CHEF_ROUTES.linkChefWallet,
      to: CHEF_ROUTES.linkChefWallet,
    },
    {
      icon: (
        <BsChatDots
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefChat
              ? "#e85666"
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
        <AiFillSetting
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkChefSettings
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === CHEF_ROUTES.linkChefSettings,
      to: CHEF_ROUTES.linkChefSettings,
    },
  ];

  const customerMenuItems = [
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
              ? "#e85666"
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
              ? "#e85666"
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
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "My Favourites",
      active: location?.pathname === CUSTOMER_ROUTES.linkCustomerFavourites,
      to: CUSTOMER_ROUTES.linkCustomerFavourites,
    },
    {
      icon: (
        <BsChatDots
          size={24}
          color={
            location?.pathname === CUSTOMER_ROUTES.linkCustomerChat
              ? "#e85666"
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
        <RxStarFilled
          size={24}
          color={
            location?.pathname === CUSTOMER_ROUTES.linkCustomerSubscription
              ? "#e85666"
              : "#787878"
          }
        />
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
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === CUSTOMER_ROUTES.linkCustomerSettings,
      to: CUSTOMER_ROUTES.linkCustomerSettings,
    },
  ];

  const subChefMenuItems = [
    {
      icon: (
        <MdOutlineFoodBank
          size={28}
          color={
            location?.pathname === SUB_CHEF_ROUTES.linkSubChef
              ? "#e85666"
              : location?.pathname === SUB_CHEF_ROUTES.linkSubChefMenuOnline
              ? "#e85666"
              : location?.pathname === SUB_CHEF_ROUTES.linkSubChefMenuDineIn
              ? "#e85666"
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
        <CiForkAndKnife
          size={24}
          color={
            location?.pathname === SUB_CHEF_ROUTES.linkSubChefDineIn
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Dine in",
      active: location?.pathname === SUB_CHEF_ROUTES.linkSubChefDineIn,
      to: SUB_CHEF_ROUTES.linkSubChefDineIn,
    },
    {
      icon: (
        <CgFileDocument
          size={24}
          color={
            location?.pathname === SUB_CHEF_ROUTES.linkSubChefTableManagement
              ? "#e85666"
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
        <AiFillSetting
          size={24}
          color={
            location?.pathname === SUB_CHEF_ROUTES.linkSubChefSettings
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === SUB_CHEF_ROUTES.linkSubChefSettings,
      to: SUB_CHEF_ROUTES.linkSubChefSettings,
    },
  ];

  const menuItems =
    person?.userType === USER_TYPE.SUB_CHEF
      ? subChefMenuItems
      : person?.isRestaurant
      ? restaurantMenuItems
      : person?.userType === USER_TYPE.CHEF
      ? chefMenuItems
      : person?.userType === USER_TYPE.COMPANY
      ? companyMenuItems
      : customerMenuItems;

  return (
    <Popover className="sticky top-0 z-50 w-full bg-white">
      <div className="lg:mx-10 px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Homemade</span>
              <img className="h-6 w-auto" src="/images/logo.svg" alt="" />
            </Link>
          </div>

          <div className="flex items-center">
            {showCart && (
              <div className="">
                {cartTotalItems > 0 && (
                  <div className="lg:hidden mr-5" onClick={onClickCart}>
                    <div
                      className="absolute top-8 primary_bg_color w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ right: "4.5rem" }}
                    >
                      <p className="text-white text-center text-xs">
                        {cartTotalItems}
                      </p>
                    </div>

                    <BsFillHandbagFill size={28} color="#4E0B2B" />
                  </div>
                )}
              </div>
            )}
            <>
              {user?.user ? (
                <Popover.Button className="ml-0 inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              ) : (
                <>
                  <Popover.Button className="lg:hidden inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                  <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                    <Link
                      to={HOME_ROUTES.linkChefLandingPage}
                      onClick={() => {
                        TrackGoogleAnalyticsEvent(
                          "HOME",
                          "Become a chef",
                          window.location.pathname + window.location.search,
                          {}
                        );
                      }}
                    >
                      <p className="mr-8 whitespace-nowrap text-sm font_medium text-gray-500 hover:text-gray-900">
                        Become a chef
                      </p>
                    </Link>
                    <Link
                      to={AUTH_ROUTES.linkCustomerLogin}
                      onClick={() =>
                        TrackGoogleAnalyticsEvent(
                          "HOME",
                          "Login",
                          window.location.pathname + window.location.search,
                          {}
                        )
                      }
                    >
                      <p className="mr-8 whitespace-nowrap text-sm font_medium text-gray-500 hover:text-gray-900">
                        Log in
                      </p>
                    </Link>
                    <Button
                      title=" Sign up"
                      showIcon
                      onClick={() => {
                        navigate(
                          event
                            ? HOME_ROUTES.linkEventRegister
                            : AUTH_ROUTES.linkCustomerSignUp
                        );

                        TrackGoogleAnalyticsEvent(
                          "HOME",
                          "Sign up customer",
                          window.location.pathname + window.location.search,
                          {}
                        );
                      }}
                    />
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 -top-5 transform transition w-full lg:w-96 lg:right-10"
        >
          <div className="divide-y-2 divide-gray-50 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 mt-7">
            {/* <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="/images/logo.svg"
                    alt="Homemade"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div> */}
            {user ? (
              <div>
                <div className="flex flex-col gallery_bg py-3 rounded-t-xl">
                  <div className="flex self-end mr-5">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6 " aria-hidden="true" />
                    </Popover.Button>
                  </div>
                  {user && (
                    <div className="flex flex-col items-center justify-center mb-2">
                      {user?.user?.image ? (
                        <img
                          src={user?.user?.image}
                          alt="user"
                          className="w-11 h-11 rounded-full"
                        />
                      ) : (
                        <CiUser size={52} color="#fff" />
                      )}
                      <div className="text-center text-white">
                        <p className="font_medium text-3xl">
                          {person?.firstName} {person?.lastName}
                        </p>
                        <p className="font_regular">{person?.email}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {menuItems?.map((item, i) => (
                    <MenuItem
                      key={i}
                      icon={item?.icon}
                      title={item?.title}
                      //   active={item?.active}
                      to={item?.to}
                    />
                  ))}
                  <LogoutButton />
                </div>
                <div className="ml-8 py-6">
                  <Button title="Help center" extraClasses="w-5/6 text-sm" />
                </div>
              </div>
            ) : (
              <div className="space-y-6 py-6 px-5">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <Link
                    to={HOME_ROUTES.linkChefLandingPage}
                    className="text-sm font_medium text-gray-900 hover:text-gray-700"
                  >
                    Become a chef
                  </Link>

                  <Link
                    to={AUTH_ROUTES.linkCustomerLogin}
                    className="text-sm font_medium text-gray-900 hover:text-gray-700"
                  >
                    Log in
                  </Link>
                </div>
                <Link
                  to={
                    event
                      ? HOME_ROUTES.linkEventRegister
                      : AUTH_ROUTES.linkCustomerSignUp
                  }
                  className="flex w-full items-center justify-center rounded-md border border-transparent primary_bg_color px-4 py-2 text-base font-medium text-white shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default TopNav;

// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React from "react";
// import { Fragment } from "react";
// import { useLocation } from "react-router-dom";
// import { useSelector, shallowEqual } from "react-redux";
// import { Popover, Transition } from "@headlessui/react";
// import { Link, useNavigate } from "react-router-dom";
// import { BsChatDots } from "react-icons/bs";
// import { RiWallet3Line } from "react-icons/ri";
// import { CgFileDocument } from "react-icons/cg";
// import { CiForkAndKnife } from "react-icons/ci";
// import { MdHomeFilled, MdOutlineFoodBank } from "react-icons/md";
// import { CiUser } from "react-icons/ci";
// import { AiOutlineSearch, AiFillSetting } from "react-icons/ai";
// import { GrFavorite } from "react-icons/gr";
// import { RxStarFilled } from "react-icons/rx";
// import { LuUser } from "react-icons/lu";
// import Button from "../Button";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { BsFillHandbagFill } from "react-icons/bs";
// import {
//   AUTH_ROUTES,
//   CHEF_ROUTES,
//   CUSTOMER_ROUTES,
//   COMPANY_ROUTES,
//   HOME_ROUTES,
//   SUB_CHEF_ROUTES,
// } from "../../routes/routes";
// import MenuItem from "../MenuItem";
// import LogoutButton from "../LogoutButton";
// import { USER_TYPE } from "../../utils/Globals";
// import TrackGoogleAnalyticsEvent from "../TrackGoogleAnalyticsEvent";
// import { GiKnifeFork } from "react-icons/gi";

// const TopNav = ({ showCart, onClickCart, cartTotalItems, event }: any) => {
//   const navigate = useNavigate();

//   const location = useLocation();

//   const { user, person } = useSelector(
//     (state: any) => ({
//       user: state.auth.user,
//       person: state.user.user,
//     }),
//     shallowEqual
//   );

//   const companyMenuItems = [
//     {
//       icon: (
//         <MdHomeFilled
//           size={24}
//           color={
//             location?.pathname === COMPANY_ROUTES.linkCompany
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Home",
//       active: location?.pathname === COMPANY_ROUTES.linkCompany,
//       to: COMPANY_ROUTES.linkCompany,
//     },
//     {
//       icon: (
//         <LuUser
//           size={24}
//           color={
//             location?.pathname === COMPANY_ROUTES.linkCompanyEmployees
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Employees",
//       active: location?.pathname === COMPANY_ROUTES.linkCompanyEmployees,
//       to: COMPANY_ROUTES.linkCompanyEmployees,
//     },
//     {
//       icon: (
//         <RiWallet3Line
//           size={24}
//           color={
//             location?.pathname === COMPANY_ROUTES.linkCompanyWallet
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "My Wallet",
//       active: location?.pathname === COMPANY_ROUTES.linkCompanyWallet,
//       to: COMPANY_ROUTES.linkCompanyWallet,
//     },
//     {
//       icon: (
//         <AiFillSetting
//           size={24}
//           color={
//             location?.pathname === COMPANY_ROUTES.linkCompanySettings
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Settings",
//       active: location?.pathname === COMPANY_ROUTES.linkCompanySettings,
//       to: COMPANY_ROUTES.linkCompanySettings,
//     },
//   ];

//   const chefMenuItems = [
//     {
//       icon: (
//         <MdHomeFilled
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChef ? "#e85666" : "#787878"
//           }
//         />
//       ),
//       title: "Home",
//       active: location?.pathname === CHEF_ROUTES.linkChef,
//       to: CHEF_ROUTES.linkChef,
//     },
//     {
//       icon: (
//         <CgFileDocument
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefOrders
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "My Orders",
//       active: location?.pathname === CHEF_ROUTES.linkChefOrders,
//       to: CHEF_ROUTES.linkChefOrders,
//     },
//     {
//       icon: (
//         <CiForkAndKnife
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefMenu
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Menu",
//       active: location?.pathname === CHEF_ROUTES.linkChefMenu,
//       to: CHEF_ROUTES.linkChefMenu,
//     },
//     {
//       icon: (
//         <RiWallet3Line
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefWallet
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "My Wallet",
//       active: location?.pathname === CHEF_ROUTES.linkChefWallet,
//       to: CHEF_ROUTES.linkChefWallet,
//     },
//     {
//       icon: (
//         <BsChatDots
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefChat
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Chat",
//       active: location?.pathname === CHEF_ROUTES.linkChefChat,
//       to: CHEF_ROUTES.linkChefChat,
//     },
//     {
//       icon: (
//         <AiFillSetting
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefSettings
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Settings",
//       active: location?.pathname === CHEF_ROUTES.linkChefSettings,
//       to: CHEF_ROUTES.linkChefSettings,
//     },
//   ];

//   const restaurantMenuItems = [
//     {
//       icon: (
//         <MdHomeFilled
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChef ? "#e85666" : "#787878"
//           }
//         />
//       ),
//       title: "Home",
//       active: location?.pathname === CHEF_ROUTES.linkChef,
//       to: CHEF_ROUTES.linkChef,
//     },
// {
//       icon: (
//         <FaSquarePollVertical
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefReports
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Reports",
//       active: location?.pathname === CHEF_ROUTES.linkChefReports,
//       to: CHEF_ROUTES.linkChefReports,
//     },
//     {
//       icon: (
//         <CgFileDocument
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefOrders
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Orders",
//       active: location?.pathname === CHEF_ROUTES.linkChefOrders,
//       to: CHEF_ROUTES.linkChefOrders,
//     },
//     {
//       icon: (
//         <CiForkAndKnife
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefDineIn
//               ? "#e85666"
//               : location?.pathname === CHEF_ROUTES.linkChefTableManagement
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Dine in",
//       active:
//         location?.pathname === CHEF_ROUTES.linkChefDineIn ||
//         location?.pathname === CHEF_ROUTES.linkChefTableManagement,
//       to: CHEF_ROUTES.linkChefDineIn,
//     },
//     {
//       icon: (
//         <MdOutlineFoodBank
//           size={28}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefMenu
//               ? "#e85666"
//               : location?.pathname === CHEF_ROUTES.linkChefMenuOnline
//               ? "#e85666"
//               : location?.pathname === CHEF_ROUTES.linkChefMenuDineIn
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Menu",
//       active:
//         location?.pathname === CHEF_ROUTES.linkChefMenu ||
//         location?.pathname === CHEF_ROUTES.linkChefMenuOnline ||
//         location?.pathname === CHEF_ROUTES.linkChefMenuDineIn,
//       to: CHEF_ROUTES.linkChefMenu,
//     },
//     {
//       icon: (
//         <GiKnifeFork
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkKitchen
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Kitchen",
//       active: location?.pathname === CHEF_ROUTES.linkKitchen,
//       to: CHEF_ROUTES.linkKitchen,
//     },
//     {
//       icon: (
//         <RiWallet3Line
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefWallet
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "My Wallet",
//       active: location?.pathname === CHEF_ROUTES.linkChefWallet,
//       to: CHEF_ROUTES.linkChefWallet,
//     },
//     {
//       icon: (
//         <BsChatDots
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefChat
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Chat",
//       active: location?.pathname === CHEF_ROUTES.linkChefChat,
//       to: CHEF_ROUTES.linkChefChat,
//     },
//     {
//       icon: (
//         <AiFillSetting
//           size={24}
//           color={
//             location?.pathname === CHEF_ROUTES.linkChefSettings
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Settings",
//       active: location?.pathname === CHEF_ROUTES.linkChefSettings,
//       to: CHEF_ROUTES.linkChefSettings,
//     },
//   ];

//   const customerMenuItems = [
//     {
//       icon: <AiOutlineSearch size={24} color={"#787878"} />,
//       title: "Find a meal",
//       active: false,
//       to: HOME_ROUTES.linkExplore,
//     },
//     {
//       icon: (
//         <CgFileDocument
//           size={24}
//           color={
//             location?.pathname === CUSTOMER_ROUTES.linkCustomer ||
//             location?.pathname === CUSTOMER_ROUTES.linkCustomerOrders
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "My Orders",
//       active:
//         location?.pathname === CUSTOMER_ROUTES.linkCustomer ||
//         location?.pathname === CUSTOMER_ROUTES.linkCustomerOrders,
//       to: CUSTOMER_ROUTES.linkCustomer,
//     },
//     {
//       icon: (
//         <RiWallet3Line
//           size={24}
//           color={
//             location?.pathname === CUSTOMER_ROUTES.linkCustomerWallet
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "My Wallet",
//       active: location?.pathname === CUSTOMER_ROUTES.linkCustomerWallet,
//       to: CUSTOMER_ROUTES.linkCustomerWallet,
//     },
//     {
//       icon: (
//         <GrFavorite
//           size={24}
//           color={
//             location?.pathname === CUSTOMER_ROUTES.linkCustomerFavourites
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "My Favourites",
//       active: location?.pathname === CUSTOMER_ROUTES.linkCustomerFavourites,
//       to: CUSTOMER_ROUTES.linkCustomerFavourites,
//     },
//     // {
//     //   icon: <CiForkAndKnife size={24} color={"#787878"} />,
//     //   title: "Start Cooking Too",
//     //   active: false,
//     //   to: HOME_ROUTES.linkChefLandingPage,
//     // },
//     {
//       icon: (
//         <BsChatDots
//           size={24}
//           color={
//             location?.pathname === CUSTOMER_ROUTES.linkCustomerChat
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Chat",
//       active: location?.pathname === CUSTOMER_ROUTES.linkCustomerChat,
//       to: CUSTOMER_ROUTES.linkCustomerChat,
//     },
//     {
//       icon: (
//         <RxStarFilled
//           size={24}
//           color={
//             location?.pathname === CUSTOMER_ROUTES.linkCustomerSubscription
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Subscription",
//       active: location?.pathname === CUSTOMER_ROUTES.linkCustomerSubscription,
//       to: CUSTOMER_ROUTES.linkCustomerSubscription,
//     },
//     {
//       icon: (
//         <AiFillSetting
//           size={24}
//           color={
//             location?.pathname === CUSTOMER_ROUTES.linkCustomerSettings
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Settings",
//       active: location?.pathname === CUSTOMER_ROUTES.linkCustomerSettings,
//       to: CUSTOMER_ROUTES.linkCustomerSettings,
//     },
//   ];

//   const subChefMenuItems = [
//     {
//       icon: (
//         <MdOutlineFoodBank
//           size={28}
//           color={
//             location?.pathname === SUB_CHEF_ROUTES.linkSubChef
//               ? "#e85666"
//               : location?.pathname === SUB_CHEF_ROUTES.linkSubChefMenuOnline
//               ? "#e85666"
//               : location?.pathname === SUB_CHEF_ROUTES.linkSubChefMenuDineIn
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Menu",
//       active:
//         location?.pathname === SUB_CHEF_ROUTES.linkSubChef ||
//         location?.pathname === SUB_CHEF_ROUTES.linkSubChefMenuOnline ||
//         location?.pathname === SUB_CHEF_ROUTES.linkSubChefMenuDineIn,
//       to: SUB_CHEF_ROUTES.linkSubChef,
//     },
//     {
//       icon: (
//         <CgFileDocument
//           size={24}
//           color={
//             location?.pathname === SUB_CHEF_ROUTES.linkSubChefTableManagement
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Tables",
//       active: location?.pathname === SUB_CHEF_ROUTES.linkSubChefTableManagement,
//       to: SUB_CHEF_ROUTES.linkSubChefTableManagement,
//     },
//     {
//       icon: (
//         <AiFillSetting
//           size={24}
//           color={
//             location?.pathname === SUB_CHEF_ROUTES.linkSubChefSettings
//               ? "#e85666"
//               : "#787878"
//           }
//         />
//       ),
//       title: "Settings",
//       active: location?.pathname === SUB_CHEF_ROUTES.linkSubChefSettings,
//       to: SUB_CHEF_ROUTES.linkSubChefSettings,
//     },
//   ];

//   const menuItems =
//     person?.userType === USER_TYPE.SUB_CHEF
//       ? subChefMenuItems
//       : person?.isRestaurant
//       ? restaurantMenuItems
//       : person?.userType === USER_TYPE.CHEF
//       ? chefMenuItems
//       : person?.userType === USER_TYPE.COMPANY
//       ? companyMenuItems
//       : customerMenuItems;

//   return (
//     <div className="absolute top-10 w-full">
//       <Popover className="sticky top-0 z-50 w-5/6 lg:w-4/5 mx-auto p-3 rounded-full bg-[#4E0B2B]">
//         <div className="w-full flex items-center justify-between lg:justify-center">
//           <div className="">
//             <Link to="/">
//               <span className="sr-only">Homemade</span>
//               <img className="h-6 w-auto" src="/images/logowhite.svg" alt="" />
//             </Link>
//           </div>

//           <div className="hidden lg:flex flex-1 flex items-center justify-center">
//             <Popover className="relative">
//               <Popover.Button>
//                 <div className="w-24 p-2 bg-white rounded-full mr-4 flex items-center button-shine">
//                   <p className="whitespace-nowrap text-sm font_bold text-[#4E0B2B] text-center">
//                     For You
//                   </p>
//                   <div className="ml-2 w-4 h-4 rounded-full bg-[#E85666] flex items-center justify-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="#ffffff"
//                       className="w-3 h-3"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </Popover.Button>
//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-200"
//                 enterFrom="opacity-0 translate-y-1"
//                 enterTo="opacity-100 translate-y-0"
//                 leave="transition ease-in duration-150"
//                 leaveFrom="opacity-100 translate-y-0"
//                 leaveTo="opacity-0 translate-y-1"
//               >
//                 <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
//                   <div className="w-56 shrink rounded-xl bg-[#4E0B2B] p-2 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
//                     <Link
//                       to={HOME_ROUTES.linkExplore}
//                       className="block p-2 text-lg leading-6 text-white flex gap-x-3"
//                     >
//                       <img
//                         className="h-6 w-auto"
//                         src="/images/explore.svg"
//                         alt=""
//                       />
//                       Explore meals
//                     </Link>
//                     <Link
//                       to={HOME_ROUTES.linkSubscription}
//                       className="block p-2 text-lg leading-6 text-white flex gap-x-3"
//                     >
//                       <img
//                         className="h-6 w-auto"
//                         src="/images/sub.svg"
//                         alt=""
//                       />
//                       Subscription
//                     </Link>
//                   </div>
//                 </Popover.Panel>
//               </Transition>
//             </Popover>

//             <Link
//               to={HOME_ROUTES.linkChefLandingPage}
//               onClick={() => {
//                 TrackGoogleAnalyticsEvent(
//                   "HOME",
//                   "Become a chef",
//                   window.location.pathname + window.location.search,
//                   {}
//                 );
//               }}
//             >
//               <p className="mr-8 whitespace-nowrap text-sm font_bold text-white">
//                 Food businesses
//               </p>
//             </Link>

//             <Link to={HOME_ROUTES.linkCompanies}>
//               <p className="mr-8 whitespace-nowrap text-sm font_bold text-white">
//                 Company
//               </p>
//             </Link>
//           </div>

//           <div className="hidden lg:flex flex gap-x-1">
//             <Link
//               to={AUTH_ROUTES.linkCustomerLogin}
//               onClick={() =>
//                 TrackGoogleAnalyticsEvent(
//                   "HOME",
//                   "Login",
//                   window.location.pathname + window.location.search,
//                   {}
//                 )
//               }
//             >
//               <p className="w-20 p-2 border-2 border-white rounded-full mr-4 whitespace-nowrap text-sm font_bold text-white text-center button-shine">
//                 Sign in
//               </p>
//             </Link>

//             <Link
//               to={
//                 event
//                   ? HOME_ROUTES.linkEventRegister
//                   : AUTH_ROUTES.linkCustomerSignUp
//               }
//               onClick={() => {
//                 TrackGoogleAnalyticsEvent(
//                   "HOME",
//                   "Sign up customer",
//                   window.location.pathname + window.location.search,
//                   {}
//                 );
//               }}
//             >
//               <p className="w-20 p-2 bg-[#E85666] rounded-full mr-4 whitespace-nowrap text-sm font_bold text-white text-center button-shine">
//                 Sign up
//               </p>
//             </Link>
//           </div>

//           <Popover.Button className="lg:hidden text-white">
//             <span className="sr-only">Open menu</span>
//             <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//           </Popover.Button>

//           {/* <div className="flex items-center">
//           {showCart && (
//             <div className="">
//               {cartTotalItems > 0 && (
//                 <div className="lg:hidden mr-5" onClick={onClickCart}>
//                   <div
//                     className="absolute top-8 primary_bg_color w-4 h-4 rounded-full flex items-center justify-center"
//                     style={{ right: "4.5rem" }}
//                   >
//                     <p className="text-white text-center text-xs">
//                       {cartTotalItems}
//                     </p>
//                   </div>

//                   <BsFillHandbagFill size={28} color="#4E0B2B" />
//                 </div>
//               )}
//             </div>
//           )}
//           <>
//             {user?.user ? (
//               <Popover.Button className="ml-0 inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
//                 <span className="sr-only">Open menu</span>
//                 <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//               </Popover.Button>
//             ) : (
//               <>
//                 <Popover.Button className="lg:hidden inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
//                   <span className="sr-only">Open menu</span>
//                   <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//                 </Popover.Button>

//               </>
//             )}
//           </>
//         </div> */}
//         </div>

//         <Transition
//           as={Fragment}
//           enter="duration-200 ease-out"
//           enterFrom="opacity-0 scale-95"
//           enterTo="opacity-100 scale-100"
//           leave="duration-100 ease-in"
//           leaveFrom="opacity-100 scale-100"
//           leaveTo="opacity-0 scale-95"
//         >
//           <Popover.Panel
//             focus
//             className="absolute z-10 -top-5 transform transition w-full lg:w-96 lg:right-10"
//           >
//             <div className="divide-y-2 divide-gray-50 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 mt-7">
//               {/* <div className="px-5 pt-5 pb-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <img
//                     className="h-8 w-auto"
//                     src="/images/logo.svg"
//                     alt="Homemade"
//                   />
//                 </div>
//                 <div className="-mr-2">
//                   <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
//                     <span className="sr-only">Close menu</span>
//                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                   </Popover.Button>
//                 </div>
//               </div>
//             </div> */}
//               {user ? (
//                 <div>
//                   <div className="flex flex-col gallery_bg py-3 rounded-t-xl">
//                     <div className="flex self-end mr-5">
//                       <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
//                         <span className="sr-only">Close menu</span>
//                         <XMarkIcon className="h-6 w-6 " aria-hidden="true" />
//                       </Popover.Button>
//                     </div>
//                     {user && (
//                       <div className="flex flex-col items-center justify-center mb-2">
//                         {user?.user?.image ? (
//                           <img
//                             src={user?.user?.image}
//                             alt="user"
//                             className="w-11 h-11 rounded-full"
//                           />
//                         ) : (
//                           <CiUser size={52} color="#fff" />
//                         )}
//                         <div className="text-center text-white">
//                           <p className="font_medium text-3xl">
//                             {person?.firstName} {person?.lastName}
//                           </p>
//                           <p className="font_regular">{person?.email}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                   <div>
//                     {menuItems?.map((item, i) => (
//                       <MenuItem
//                         key={i}
//                         icon={item?.icon}
//                         title={item?.title}
//                         //   active={item?.active}
//                         to={item?.to}
//                       />
//                     ))}
//                     <LogoutButton />
//                   </div>
//                   <div className="ml-8 py-6">
//                     <Button title="Help center" extraClasses="w-5/6 text-sm" />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-6 py-6 px-5">
//                   <div className="grid grid-cols-2 gap-y-4 gap-x-8">
//                     <Link
//                       to={AUTH_ROUTES.linkCompanySignUp}
//                       className="text-sm font_medium text-gray-900 hover:text-gray-700"
//                     >
//                       Register your Company
//                     </Link>

//                     <Link
//                       to={HOME_ROUTES.linkChefLandingPage}
//                       className="text-sm font_medium text-gray-900 hover:text-gray-700"
//                     >
//                       Become a chef
//                     </Link>

//                     <Link
//                       to={AUTH_ROUTES.linkCustomerLogin}
//                       className="text-sm font_medium text-gray-900 hover:text-gray-700"
//                     >
//                       Log in
//                     </Link>
//                   </div>
//                   <Link
//                     to={
//                       event
//                         ? HOME_ROUTES.linkEventRegister
//                         : AUTH_ROUTES.linkCustomerSignUp
//                     }
//                     className="flex w-full items-center justify-center rounded-md border border-transparent primary_bg_color px-4 py-2 text-base font-medium text-white shadow-sm"
//                   >
//                     Sign up
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </Popover.Panel>
//         </Transition>
//       </Popover>
//     </div>
//   );
// };

// export default TopNav;
