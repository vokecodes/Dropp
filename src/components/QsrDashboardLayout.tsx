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
import { CASHIER_ROUTES, CHEF_ROUTES, QSR_ROUTES, SUB_CHEF_ROUTES } from "../routes/routes";
import LogoutButton from "./LogoutButton";
import { LuUsers } from "react-icons/lu";
import { SUB_CHEF_USER } from "../config/UserType";

const QsrDashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  const { user, auth, cashier } = useSelector(
    (state: any) => ({
      auth: state.auth.user,
      user: state.user.user,
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
            location?.pathname === CASHIER_ROUTES.linkCashier
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Report",
      active: location?.pathname === CASHIER_ROUTES.linkCashier,
      to: CASHIER_ROUTES.linkCashier,
      beta: true,
    },
    {
      icon: (
        <MdOutlineFoodBank
          size={28}
          color={
            location?.pathname === CASHIER_ROUTES.linkCashierMenu
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Menu",
      active:
        location?.pathname === CASHIER_ROUTES.linkCashierMenu,
      to: CASHIER_ROUTES.linkCashierMenu,
    },
    {
      icon: (
        <LuUsers
          size={24}
          color={
            location?.pathname === CASHIER_ROUTES.linkCashierCashier
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Cashier",
      active: location?.pathname === CASHIER_ROUTES.linkCashierCashier,
      to: CASHIER_ROUTES.linkCashierCashier,
    }
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
            location?.pathname === CASHIER_ROUTES.linkCashierMyOrders
              ? "#06c167"
              : "#787878"
          }
        />
      ),
      title: "Menu",
      active:
        location?.pathname === CASHIER_ROUTES.linkCashierMyOrders,
      to: CASHIER_ROUTES.linkCashierMyOrders,
    }
  ];

  return (
    <div className="dashboard_bg">
      <TopNav />
      <div className="py-5 w-full h-screen lg:flex">
        <div className="hidden lg:block lg:w-1/5 h-svh">
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
                  {auth?.user?.chefType === "quick_service" ? (
                    <>
                      {superAdminMenuItems?.map((item: any, i) => (
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
                  ) : cashier?.isSubAdmin ? (
                    <>
                      {subAdminMenuItems?.map((item: any, i) => (
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
                  ) : (
                    <>
                      {cashierMenuItems?.map((item: any, i) => (
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

                <LogoutButton cashier={cashier} />
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

export default QsrDashboardLayout;
