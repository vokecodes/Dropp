import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { BsChatDots } from "react-icons/bs";
import { RiWallet3Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { CiForkAndKnife } from "react-icons/ci";
import { MdHomeFilled, MdOutlineFoodBank } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { AiOutlineSearch, AiFillSetting } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { RxStarFilled } from "react-icons/rx";
import Button from "./Button";
import OutlineButton from "./OutlineButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaSquarePollVertical } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";

import axios from "axios";
import { Images } from "../config/images";
import { AUTH_DATA } from "../reducers/type";

const Navbar = ({ user, setShowModal, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || "");

  const handleLogout = () => {
    dispatch({
      type: AUTH_DATA,
      payload: null,
    });
    sessionStorage.removeItem("auth");
    navigate("/");
  };

  const handleChangeAddress = (value) => {
    setAddress(value);

    const result = sessionStorage.getItem("auth");
    const { token, data } = JSON.parse(result);

    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/user/${data?.user?._id}/address`,
        { address: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        sessionStorage.setItem("auth", JSON.stringify(data.updatedUser));
      })
      .catch((error) => {});
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
    { name: "Marketplace", href: "", current: false },
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
    // <div className="w-4/5 lg:w-4/6 mx-auto">
    //   <nav className="flex lg:items-center justify-between py-10">
    //     <div className="lg:flex items-center">
    //       <Link to={user ? "/dashboard" : "/"}>
    //         <span className="sr-only">Dropp</span>
    //         <img
    //           className="w-40 mx-auto lg:w-48 lg:mx-0"
    //           src={Images.logo}
    //           alt="dropp_logo"
    //         />
    //       </Link>
    //       {user && (
    //         <div className="hidden lg:block ml-5">
    //           <div className="absolute mt-4 ml-5">
    //             <img src={Images.carbon_location} alt="location" className="" />
    //           </div>
    //           <input
    //             className="px-12 py-4 w_483 address_input rounded-2xl outline-none focus:outline-none"
    //             value={address}
    //             onChange={(e) => handleChangeAddress(e.target.value)}
    //           />
    //         </div>
    //       )}
    //     </div>
    //     <div className="lg:flex">
    //       {user ? (
    //         <button
    //           className="w-24 h-8 font_bold border border-transparent rounded-xl shadow-sm text-sm text_orange bg_light_orange"
    //           onClick={handleLogout}
    //         >
    //           Log out
    //         </button>
    //       ) : (
    //         <>
    //           <button
    //             className="hidden lg:block w-52 font_bold py-3 border_black text_black2 border-transparent text-sm rounded-xl shadow-sm"
    //             onClick={() =>
    //               window.open("https://forms.gle/1UYShXQKgjpZheS67")
    //             }
    //           >
    //             Become a Dropper
    //           </button>
    //           <button
    //             className="w-32 lg:w-40 ml-5 font_bold py-3 border border-transparent text-sm rounded-xl shadow-sm text-white bg_primary"
    //             onClick={() => setShowModal(true)}
    //           >
    //             Sign up / Login
    //           </button>
    //         </>
    //       )}
    //     </div>
    //   </nav>
    //   {user && (
    //     <div className="lg:hidden">
    //       <div className="absolute mt-4 ml-5">
    //         <img src={Images.carbon_location} alt="location" className="" />
    //       </div>
    //       <input
    //         className="px-12 py-4 w-full address_input rounded-2xl outline-none focus:outline-none"
    //         value={address}
    //         onChange={(e) => handleChangeAddress(e.target.value)}
    //       />
    //     </div>
    //   )}
    // </div>
    <Disclosure as="header" className="pt-8 z-30">
      <div className="px-2 sm:px-4 lg:px-32">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center">
              <img alt="Dropp" src={Images.logo} className="h-8 w-auto" />
            </div>
          </div>
          <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <nav
              aria-label="Global"
              className="hidden lg:flex lg:space-x-8 lg:py-2"
            >
              <Menu as="div" className="relative ml-4 flex-shrink-0 z-20">
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
                        stroke-width="2"
                        stroke="#4A443A"
                        width={16}
                        height={16}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-20 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {restaurantNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        onClick={() => setSelectedCategory(item.name)}
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-lg font_medium text-[#4A443A]"
              >
                Private Chef
              </a>
              <Menu as="div" className="relative ml-4 flex-shrink-0 z-20">
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
                        stroke-width="2"
                        stroke="#4A443A"
                        width={16}
                        height={16}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-20 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {productNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
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
                href="#"
                className="inline-flex items-center px-3 py-2 text-lg font_medium text-[#4A443A]"
              >
                Marketplace
              </a>
            </nav>
          </div>
          <div className="relative z-10 flex items-center lg:hidden">
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
          <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:gap-3 lg:items-center">
            <OutlineButton
              title=" Log in"
              onClick={() => setShowModal(true)}
              extraClasses="w-24"
            />
            <Button
              title=" Sign up"
              onClick={() => setShowModal(true)}
              extraClasses="w-24"
            />
          </div>
        </div>
      </div>

      <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
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
          {user && (
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
          )}
          <div className="flex flex-col mt-3 space-y-3 px-2">
            <OutlineButton
              title="Log in"
              onClick={() => setShowModal(true)}
              extraClasses="w-44"
            />
            <Button
              title="Sign up"
              onClick={() => setShowModal(true)}
              extraClasses="w-44"
            />
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
