import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
} from "@headlessui/react";
import Button from "./Button";
import OutlineButton from "./OutlineButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Images } from "../config/images";
import { AUTH_DATA } from "../reducers/type";
import MenuItemLocal from "./MenuItem";
import {
  CHEF_ROUTES,
  COMPANY_ROUTES,
  CUSTOMER_ROUTES,
  HOME_ROUTES,
  SUB_CHEF_ROUTES,
} from "../routes/routes";

import { BsChatDots } from "react-icons/bs";
import { RiWallet3Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { CiForkAndKnife } from "react-icons/ci";
import { MdHomeFilled, MdOutlineFoodBank } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { AiOutlineSearch, AiFillSetting } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { RxStarFilled } from "react-icons/rx";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaSquarePollVertical } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";
import { USER_TYPE } from "../utils/Globals";
import LogoutButton from "./LogoutButton";

const Navbar = ({ setShowModal, setSelectedCategory, authPage }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, person } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
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
              ? "#06c167"
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
              ? "#06c167"
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
              ? "#06c167"
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
              ? "#06c167"
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
            location?.pathname === CHEF_ROUTES.linkChefMenu
              ? "#06c167"
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
              ? "#06c167"
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
        <RxStarFilled
          size={24}
          color={
            location?.pathname === CUSTOMER_ROUTES.linkCustomerSubscription
              ? "#06c167"
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
        <CiForkAndKnife
          size={24}
          color={
            location?.pathname === SUB_CHEF_ROUTES.linkSubChefDineIn
              ? "#06c167"
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

  const handleLogout = () => {
    dispatch({
      type: AUTH_DATA,
      payload: null,
    });
    sessionStorage.removeItem("auth");
    navigate("/");
  };

  const navigation = [
    { name: "Restaurant", href: "#", current: true },
    {
      name: "Private Chef",
      href: "",
      current: false,
    },
    { name: "Product", href: "#", current: false },
    { name: "Pricing", href: "#pricing", current: false },
    { name: "Marketplace", href: HOME_ROUTES.linkExplore, current: false },
  ];

  const mobileNavigation = [
    { name: "Pricing", href: "#pricing", current: false },
    { name: "Marketplace", href: HOME_ROUTES.linkExplore, current: false },
  ];

  const restaurantNavigation = [
    { name: "Dine-in", href: "#restaurant" },
    { name: "Private Chef", href: "#restaurant" },
    { name: "Bar & Lounge", href: "#restaurant" },
    { name: "Cafe", href: "#restaurant" },
    { name: "Food Truck", href: "#restaurant" },
    { name: "Fast Casual", href: "#restaurant" },
  ];

  const productNavigation = [
    { name: "Ordering tools", href: "#ordering-tools" },
    { name: "Restaurant operation tools", href: "#operation-tools" },
    { name: "Marketing tools", href: "#marketing-tools" },
    { name: "Analytics & Insight", href: "#analytics-insight" },
  ];

  return (
    <Disclosure as="header" className="pt-8 z-40 w-full">
      <div className="px-2 sm:px-4 lg:px-32">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-50 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center">
              <Link to={"/"}>
                <img
                  alt="Dropp"
                  src={Images.logo}
                  className="h-8 w-auto z-50"
                />
              </Link>
            </div>
          </div>
          {!authPage && (
            <div className="relative z-40 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
              <nav
                aria-label="Global"
                className="hidden lg:flex lg:flex-wrap lg:py-2"
              >
                <Menu as="div" className="relative flex-shrink-0 z-50">
                  <div>
                    <MenuButton className="relative flex">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <div className="flex items-center gap-1 inline-flex items-center px-3 py-2">
                        <p className="text-lg font_medium text-[#4A443A]">
                          Restaurant
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="#4A443A"
                          width={16}
                          height={16}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </div>
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute left-0 w-48 origin-top-right rounded-2xl bg-white py-1 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in z-50"
                  >
                    {restaurantNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-4 py-2 text-sm font_medium text-gray-700 data-[focus]:bg-gray-100"
                          onClick={() => setSelectedCategory(item.name)}
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
                <a
                  href="#restaurant"
                  className="inline-flex items-center px-3 py-2 text-lg font_medium text-[#4A443A]"
                >
                  Private Chef
                </a>
                <Menu as="div" className="relative ml-4 flex-shrink-0 z-50">
                  <div>
                    <MenuButton className="relative flex">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <div className="flex items-center gap-1 inline-flex items-center px-3 py-2">
                        <p className="text-lg font_medium text-[#4A443A]">
                          Product
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="#4A443A"
                          width={16}
                          height={16}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </div>
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute left-0 w-48 origin-top-right rounded-2xl bg-white py-1 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in z-50"
                  >
                    {productNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-4 py-2 text-sm font_medium text-gray-700 data-[focus]:bg-gray-100"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
                <a
                  href="#pricing"
                  className="inline-flex items-center px-3 py-2 text-lg font_medium text-[#4A443A]"
                >
                  Pricing
                </a>
                <a
                  href={HOME_ROUTES.linkExplore}
                  className="inline-flex items-center px-3 py-2 text-lg font_medium text-[#4A443A]"
                >
                  Marketplace
                </a>
              </nav>
            </div>
          )}
          {/* <div className="relative z-40 flex items-center lg:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div> */}

          <DisclosurePanel
            as="nav"
            aria-label="Global"
            // className="bg-red-900 h-full"
            className="absolute right-0 w-96 flex flex-col gallery_bg py-3 rounded-t-xl"
          >
            {/* <div className="space-y-1 px-2 pb-3 pt-2"> */}

            <DisclosureButton
              as="a"
              href=""
              className="block rounded-md px-3 py-2 text-lg text-[#fff] font_medium"
            >
              {person && (
                <div className="flex flex-col items-center justify-center mb-2">
                  {person?.user?.image ? (
                    <img
                      src={person?.user?.image}
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
              <div className="bg-white">
                {menuItems?.map((item, i) => (
                  <MenuItemLocal
                    key={i}
                    icon={item?.icon}
                    title={item?.title}
                    //   active={item?.active}
                    to={item?.to}
                  />
                ))}
                <LogoutButton />
                <div className="ml-8 py-6">
                  <Button title="Help center" extraClasses="w-5/6 text-sm" />
                </div>
              </div>
            </DisclosureButton>
          </DisclosurePanel>

          <div className="hidden lg:relative lg:z-50 lg:ml-4 lg:flex lg:gap-3 lg:items-center">
            {auth?.user ? (
              <>
                <div className="relative z-40 flex items-center">
                  {/* Mobile menu button */}
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon
                      aria-hidden="true"
                      className="block h-6 w-6 group-data-[open]:hidden"
                    />
                    <XMarkIcon
                      aria-hidden="true"
                      className="hidden h-6 w-6 group-data-[open]:block"
                    />
                  </DisclosureButton>
                </div>
              </>
            ) : (
              <>
                <Link to={"/auth/login"}>
                  <OutlineButton title="Log in" extraClasses="w-24" />
                </Link>
                <Link to={"/auth/register"}>
                  <Button title="Sign up" extraClasses="w-24" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Disclosure as="div" className="">
            <DisclosureButton className="group flex w-full items-center gap-5 rounded-lg py-2 px-3 text-lg font_medium leading-7 text-gray-900 hover:bg-gray-50">
              Restaurant
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#4A443A"
                width={16}
                height={16}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </DisclosureButton>
            <DisclosurePanel className="mt-2 space-y-2">
              {restaurantNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font_medium leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </DisclosurePanel>
          </Disclosure>
          <DisclosureButton
            as="a"
            href=""
            className="block rounded-md px-3 py-2 text-lg text-[#4A443A] font_medium"
          >
            Private Chef
          </DisclosureButton>
          <Disclosure as="div" className="">
            <DisclosureButton className="group flex w-full items-center gap-5 rounded-lg py-2 px-3 text-lg font_medium leading-7 text-gray-900 hover:bg-gray-50">
              Product
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#4A443A"
                width={16}
                height={16}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </DisclosureButton>
            <DisclosurePanel className="mt-2 space-y-2">
              {productNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font_medium leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </DisclosurePanel>
          </Disclosure>
          {mobileNavigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className="block rounded-md px-3 py-2 text-lg text-[#4A443A] font_medium"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <div className="border-t border-gray-200 pb-3 pt-4">
          {/* {user && (
            <div className="hidden lg:block ml-5">
              <div className="absolute mt-4 ml-5">
                <img src={Images.carbon_location} alt="location" className="" />
              </div>
              <input
                className="px-12 py-4 w_483 address_input rounded-2xl outline-none focus:outline-none"
                value={address}
                onChange={(e) => handleChangeAddress(e.target.value)}
              />
            </div>
          )} */}
          {auth?.user ? (
            <Button
              title="Log out"
              onClick={() => handleLogout()}
              extraClasses="w-24 ms-4"
            />
          ) : (
            <div className="flex flex-col items-center justify-start mt-3 gap-5 px-4">
              <Link to={"/auth/login"}>
                <OutlineButton
                  title="Log in"
                  // onClick={() => setShowModal(true)}
                  extraClasses="w-44"
                />
              </Link>
              <Link to={"/auth/register"}>
                <Button
                  title="Sign up"
                  // onClick={() => setShowModal(true)}
                  extraClasses="w-44"
                />
              </Link>
            </div>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
