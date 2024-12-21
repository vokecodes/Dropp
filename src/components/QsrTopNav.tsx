/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BsChatDots } from "react-icons/bs";
import { RiWallet3Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { CiForkAndKnife } from "react-icons/ci";
import { MdHomeFilled, MdOutlineFoodBank } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { GrFavorite } from "react-icons/gr";
import { GiKnifeFork } from "react-icons/gi";
import { RxStarFilled } from "react-icons/rx";
import { AiOutlineSearch, AiFillSetting } from "react-icons/ai";
import Button from "./Button";
import {
  AUTH_ROUTES,
  CHEF_ROUTES,
  CUSTOMER_ROUTES,
  COMPANY_ROUTES,
  HOME_ROUTES,
  SUB_CHEF_ROUTES,
  QSR_SUBADMIN_ROUTES,
  CASHIER_ROUTES,
  QSR_ROUTES,
} from "../routes/routes";
import { USER_TYPE } from "../utils/Globals";
import MenuItem from "./MenuItem";
import LogoutButton from "./LogoutButton";
import { QSR_SUB_ADMIN_USER, SUB_CHEF_USER } from "../config/UserType";
import { FaSquarePollVertical } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";

const QsrTopNav = ({ page, event }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, person, cashier } = useSelector(
    (state: any) => ({
      user: state.auth.user,
      person: state.user.user,
      cashier: state.cashier.cashier,
    }),
    shallowEqual
  );

  const superAdminMenuItems = [
    {
      icon: (
        <MdHomeFilled
          size={24}
          color={
            location?.pathname === QSR_ROUTES.linkQsr ? "#06c167" : "#787878"
          }
        />
      ),
      title: "Home",
      active: location?.pathname === QSR_ROUTES.linkQsr,
      to: QSR_ROUTES.linkQsr,
    },
    {
      icon: (
        <FaSquarePollVertical
          size={24}
          color={
            location?.pathname === QSR_ROUTES.linkQsrReports
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Report",
      active: location?.pathname === QSR_ROUTES.linkQsrReports,
      to: QSR_ROUTES.linkQsrReports,
      beta: true,
    },
    {
      icon: (
        <MdOutlineFoodBank
          size={28}
          color={
            location?.pathname === QSR_ROUTES.linkQsrMenu
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Menu",
      active:
        location?.pathname === QSR_ROUTES.linkQsrMenu,
      to: QSR_ROUTES.linkQsrMenu,
    },
    {
      icon: (
        <LuUsers
          size={24}
          color={
            location?.pathname === QSR_ROUTES.linkQsrCashier
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Cashier",
      active: location?.pathname === QSR_ROUTES.linkQsrCashier,
      to: QSR_ROUTES.linkQsrCashier,
    },
    {
        icon: (
            <BsChatDots
            size={24}
            color={
                location?.pathname === QSR_ROUTES.linkQsrAudit
                ? "#06c167"
                : "#787878"
            }
            />
        ),
        title: "Audit log",
        coming: true,
        active: location?.pathname === QSR_ROUTES.linkQsrAudit,
        to: "#",
    },
    {
      icon: (
        <AiFillSetting
          size={24}
          color={
            location?.pathname === QSR_ROUTES.linkQsrSettings
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === QSR_ROUTES.linkQsrSettings,
      to: QSR_ROUTES.linkQsrSettings,
    },
  ];
  
  const subAdminMenuItems = [
    {
      icon: (
        <FaSquarePollVertical
          size={24}
          color={
            location?.pathname === QSR_SUBADMIN_ROUTES.linkQsrSubAdmin
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Report",
      active: location?.pathname === QSR_SUBADMIN_ROUTES.linkQsrSubAdmin,
      to: QSR_SUBADMIN_ROUTES.linkQsrSubAdmin,
      beta: true,
    },
    {
      icon: (
        <MdOutlineFoodBank
          size={28}
          color={
            location?.pathname === QSR_SUBADMIN_ROUTES.linkQsrSubAdminMenu
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Menu",
      active:
        location?.pathname === QSR_SUBADMIN_ROUTES.linkQsrSubAdminMenu,
      to: QSR_SUBADMIN_ROUTES.linkQsrSubAdminMenu,
    },
    {
      icon: (
        <LuUsers
          size={24}
          color={
            location?.pathname === QSR_SUBADMIN_ROUTES.linkQsrSubAdminCashier
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Cashier",
      active: location?.pathname === QSR_SUBADMIN_ROUTES.linkQsrSubAdminCashier,
      to: QSR_SUBADMIN_ROUTES.linkQsrSubAdminCashier,
    },
    {
      icon: (
        <AiFillSetting
          size={24}
          color={
            location?.pathname === QSR_SUBADMIN_ROUTES.linkQsrSubAdminSettings
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Settings",
      active: location?.pathname === QSR_SUBADMIN_ROUTES.linkQsrSubAdminSettings,
      to: QSR_SUBADMIN_ROUTES.linkQsrSubAdminSettings,
    },
  ];
  
  const cashierMenuItems = [
    {
      icon: (
        <MdHomeFilled
          size={24}
          color={
            location?.pathname === CASHIER_ROUTES.linkCashier ? "#06c167" : "#787878"
          }
        />
      ),
      title: "Home",
      active: location?.pathname === CASHIER_ROUTES.linkCashier,
      to: CASHIER_ROUTES.linkCashier,
    },
    {
      icon: (
        <MdOutlineFoodBank
          size={28}
          color={
            location?.pathname === CASHIER_ROUTES.linkCashierOrders
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Orders",
      active:
        location?.pathname === CASHIER_ROUTES.linkCashierOrders,
      to: CASHIER_ROUTES.linkCashierOrders,
    }
  ];

  const menuItems =
    user?.user?.chefType === "quick_service"
      ? superAdminMenuItems
      : user?.user?.userType === QSR_SUB_ADMIN_USER
      ? subAdminMenuItems
      : cashierMenuItems;

  const notHomeRoutes = location?.pathname.startsWith("/c");

  return (
    <Popover className="sticky top-0 w-full bg-white z-50">
      <div className="lg:mx-5 px-4 sm:px-6">
        <div className="flex items-center justify-between py-6 md:justify-between md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            {person?.userType === USER_TYPE.CHEF ||
            person?.userType === USER_TYPE.COMPANY ? (
              <>
                <span className="sr-only">Dropp</span>
                <img className="h-6 w-auto" src="/images/logo.svg" alt="" />
              </>
            ) : (
              <Link to="/">
                <span className="sr-only">Dropp</span>
                <img className="h-6 w-auto" src="/images/logo.svg" alt="" />
              </Link>
            )}
          </div>
          {(user?.user || cashier) ? (
            <div className={notHomeRoutes ? "lg:hidden" : ""}>
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          ) : (
            <>
              <Popover.Button className="lg:hidden inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>

              <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                <Link to={AUTH_ROUTES.linkCompanySignUp}>
                  <p className="mr-8 whitespace-nowrap text-sm font_medium text-gray-500 hover:text-gray-900">
                    Register your Company
                  </p>
                </Link>
                <Link to={AUTH_ROUTES.linkChefSignUp}>
                  <p className="mr-8 whitespace-nowrap text-sm font_medium text-gray-500 hover:text-gray-900">
                    Become a home chef
                  </p>
                </Link>
                <Link
                  to={
                    page === USER_TYPE.CHEF
                      ? AUTH_ROUTES.linkChefLogin
                      : page === USER_TYPE.COMPANY
                      ? AUTH_ROUTES.linkCompanyLogin
                      : AUTH_ROUTES.linkCustomerLogin
                  }
                >
                  <p className="mr-8 whitespace-nowrap text-sm font_medium text-gray-500 hover:text-gray-900">
                    Log in
                  </p>
                </Link>
                <Button
                  title=" Sign up"
                  showIcon
                  onClick={() =>
                    event
                      ? HOME_ROUTES.linkEventRegister
                      : page === USER_TYPE.CHEF
                      ? navigate(AUTH_ROUTES.linkChefSignUp)
                      : page === USER_TYPE.COMPANY
                      ? navigate(AUTH_ROUTES.linkCompanySignUp)
                      : navigate(AUTH_ROUTES.linkCustomerSignUp)
                  }
                />
              </div>
            </>
          )}
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
          className="fixed z-10 top-2 h-svh lg:-top-5 transform transition w-full lg:w-96 lg:right-10"
        >
          <div className="w-11/12 lg:w-auto mx-auto h-svh lg:h-auto divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            {(user || cashier) ? (
              <div className="w-full h-full">
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
                        <p className="font_medium text-xl lg:text-3xl">
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
                    to={AUTH_ROUTES.linkCompanySignUp}
                    className="text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    Register your Company
                  </Link>
                  <Link
                    to={AUTH_ROUTES.linkChefSignUp}
                    className="text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    Become a chef
                  </Link>

                  <Link
                    to={
                      page === USER_TYPE.CHEF
                        ? AUTH_ROUTES.linkChefLogin
                        : page === USER_TYPE.COMPANY
                        ? AUTH_ROUTES.linkCompanyLogin
                        : AUTH_ROUTES.linkCustomerLogin
                    }
                    className="text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    Log in
                  </Link>
                </div>
                <div>
                  <Link
                    to={
                      event
                        ? HOME_ROUTES.linkEventRegister
                        : page === USER_TYPE.CHEF
                        ? AUTH_ROUTES.linkChefSignUp
                        : page === USER_TYPE.COMPANY
                        ? AUTH_ROUTES.linkCompanySignUp
                        : AUTH_ROUTES.linkCustomerSignUp
                    }
                    className="flex w-full items-center justify-center rounded-md border border-transparent primary_bg_color px-4 py-2 text-base font-medium text-white shadow-sm"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default QsrTopNav;
