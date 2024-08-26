// @ts-nocheck
import { useSelector, shallowEqual } from "react-redux";
import { useLocation } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { RiWallet3Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { CiForkAndKnife } from "react-icons/ci";
import { MdHomeFilled } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import MenuItem from "../../components/MenuItem";
import TopNav from "../../components/TopNav";
import Button from "../../components/Button";
import { DashboardLayoutProps } from "../../utils/Interfaces";
import { COMPANY_ROUTES } from "../../routes/routes";
import LogoutButton from "../../components/LogoutButton";

const CompanyDashboardLayout = ({ page, children }: DashboardLayoutProps) => {
  const location = useLocation();

  const { user } = useSelector(
    (state: any) => ({
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
        <LuUser
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

  return (
    <div className="dashboard_bg">
      <TopNav />
      <div className="py-5 w-full h-screen lg:flex">
        <div className="hidden lg:block lg:w-1/5">
          <div
            className="fixed w-full md:w-auto xl:w-full h-screen"
            style={{ maxWidth: "17.12rem" }}
          >
            <div className="h-5/6 w-full bg-white py-4 pr-3 flex flex-col">
              <p className="pl-10 text-lg text-black font_medium">
                Hi {user?.companyName},
              </p>
              <p className="pl-10 text-sm gray_color font_medium">
                {user?.officialEmail}
              </p>
              <div className="mt-5 flex-1">
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

export default CompanyDashboardLayout;
