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
import MenuItem from "../../components/MenuItem";
import TopNav from "../../components/TopNav";
import Button from "../../components/Button";
import { DashboardLayoutProps } from "../../utils/Interfaces";
import {
  ADMIN_ROUTES,
  CHEF_ROUTES,
  SUB_CHEF_ROUTES,
} from "../../routes/routes";
import LogoutButton from "../../components/LogoutButton";
import { LuUsers } from "react-icons/lu";
import { SUB_CHEF_USER } from "../../config/UserType";
import Navbar from "../../components/Navbar";

const AdminDashboardLayout = ({ children }) => {
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
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.7151 9.09358L19.0351 3.72024C16.9418 2.25358 13.7284 2.33358 11.7151 3.89358L5.0351 9.10691C3.70177 10.1469 2.64844 12.2802 2.64844 13.9602V23.1602C2.64844 26.5602 5.40844 29.3336 8.80844 29.3336H23.1818C26.5818 29.3336 29.3418 26.5736 29.3418 23.1736V14.1336C29.3418 12.3336 28.1818 10.1202 26.7151 9.09358ZM22.5018 17.8669C22.5018 18.3869 22.0884 18.8002 21.5684 18.8002C21.0484 18.8002 20.6351 18.3869 20.6351 17.8669V17.6269L17.0084 21.2536C16.8084 21.4536 16.5418 21.5469 16.2618 21.5202C15.9951 21.4936 15.7418 21.3336 15.5951 21.1069L14.2351 19.0802L11.0618 22.2536C10.8751 22.4402 10.6484 22.5202 10.4084 22.5202C10.1684 22.5202 9.92844 22.4269 9.7551 22.2536C9.3951 21.8936 9.3951 21.3069 9.7551 20.9336L13.7284 16.9602C13.9284 16.7602 14.1951 16.6669 14.4751 16.6936C14.7551 16.7202 15.0084 16.8669 15.1551 17.1069L16.5151 19.1336L19.3284 16.3202H19.0884C18.5684 16.3202 18.1551 15.9069 18.1551 15.3869C18.1551 14.8669 18.5684 14.4536 19.0884 14.4536H21.5684C21.6884 14.4536 21.8084 14.4802 21.9284 14.5202C22.1551 14.6136 22.3418 14.8002 22.4351 15.0269C22.4884 15.1469 22.5018 15.2669 22.5018 15.3869V17.8669Z"
            fill={
              location?.pathname === ADMIN_ROUTES.linkAdmin
                ? "#06C167"
                : "#787878"
            }
          />
        </svg>
      ),
      title: "Home",
      active: location?.pathname === ADMIN_ROUTES.linkAdmin,
      to: ADMIN_ROUTES.linkAdmin,
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99667 20.3333C9.74333 20.3333 9.49 20.2399 9.29 20.0399C8.90333 19.6533 8.90333 19.0133 9.29 18.6266L13.5567 14.3599C13.77 14.1466 14.05 14.0399 14.3567 14.0666C14.65 14.0933 14.9167 14.2533 15.09 14.5066L16.5433 16.6933L21.2767 11.9599C21.6633 11.5733 22.3033 11.5733 22.69 11.9599C23.0767 12.3466 23.0767 12.9866 22.69 13.3733L17.09 18.9733C16.8767 19.1866 16.5967 19.2933 16.29 19.2666C15.9967 19.2399 15.73 19.0799 15.5567 18.8266L14.1033 16.6399L10.7033 20.0399C10.5033 20.2399 10.25 20.3333 9.99667 20.3333Z"
            fill={"#787878"}
          />
          <path
            d="M21.9948 16.3332C21.4481 16.3332 20.9948 15.8798 20.9948 15.3332V13.6665H19.3281C18.7815 13.6665 18.3281 13.2132 18.3281 12.6665C18.3281 12.1198 18.7815 11.6665 19.3281 11.6665H21.9948C22.5415 11.6665 22.9948 12.1198 22.9948 12.6665V15.3332C22.9948 15.8798 22.5415 16.3332 21.9948 16.3332Z"
            fill={"#787878"}
          />
          <path
            d="M19.9974 30.3332H11.9974C4.7574 30.3332 1.66406 27.2398 1.66406 19.9998V11.9998C1.66406 4.75984 4.7574 1.6665 11.9974 1.6665H19.9974C27.2374 1.6665 30.3307 4.75984 30.3307 11.9998V19.9998C30.3307 27.2398 27.2374 30.3332 19.9974 30.3332ZM11.9974 3.6665C5.85073 3.6665 3.66406 5.85317 3.66406 11.9998V19.9998C3.66406 26.1465 5.85073 28.3332 11.9974 28.3332H19.9974C26.1441 28.3332 28.3307 26.1465 28.3307 19.9998V11.9998C28.3307 5.85317 26.1441 3.6665 19.9974 3.6665H11.9974Z"
            fill={"#787878"}
          />
        </svg>
      ),
      title: (
        <span>
          Homemade <br /> (Coming soon!)
        </span>
      ),
      // active: location?.pathname === ADMIN_ROUTES.l,
      // to: CHEF_ROUTES.linkChefReports,
      // pro: true,
    },
    // {
    // icon: (
    //     <AiFillSetting
    //     size={24}
    //     color={
    //         location?.pathname === ADMIN_ROUTES.linkAdminSettings
    //         ? "#06c167"
    //         : "#787878"
    //     }
    //     />
    // ),
    // title: "Settings",
    // active: location?.pathname === ADMIN_ROUTES.linkAdminSettings,
    // to: ADMIN_ROUTES.linkAdminSettings,
    // },
  ];

  return (
    <div className="dashboard_bg">
      <Navbar admin={true} />
      <div className="py-5 w-full h-screen lg:flex">
        <div className="hidden lg:block lg:w-1/5">
          <div className="fixed h-screen" style={{ width: "17.12rem" }}>
            <div className="h-5/6 w-full bg-white py-4 pr-3 flex flex-col">
              <p className="pl-10 text-lg text-black font_medium">
                Hi {auth?.user?.firstName},
              </p>
              <p className="pl-10 text-sm gray_color font_medium">
                {auth?.user?.email}
              </p>
              <div className="mt-5 flex-1">
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

                <LogoutButton admin={true} />
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

export default AdminDashboardLayout;
