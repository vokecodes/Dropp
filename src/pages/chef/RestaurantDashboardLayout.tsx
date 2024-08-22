import { useSelector, shallowEqual } from "react-redux";
import { useLocation } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { RiWallet3Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { CiForkAndKnife } from "react-icons/ci";
import { MdHomeFilled } from "react-icons/md";
import MenuItem from "../../components/MenuItem";
import TopNav from "../../components/TopNav";
import Button from "../../components/Button";
import { DashboardLayoutProps } from "../../utils/Interfaces";
import { CHEF_ROUTES } from "../../routes/routes";
import LogoutButton from "../../components/LogoutButton";
import { GiKnifeFork } from "react-icons/gi";

const RestaurantDashboardLayout = ({
  page,
  children,
  kitchen,
}: DashboardLayoutProps) => {
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
        <GiKnifeFork
          size={24}
          color={
            location?.pathname === CHEF_ROUTES.linkRestaurantDineIn
              ? "#e85666"
              : "#787878"
          }
        />
      ),
      title: "Dine in",
      active: location?.pathname === CHEF_ROUTES.linkRestaurantDineIn,
      to: CHEF_ROUTES.linkRestaurantDineIn,
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

  return (
    <div className="dashboard_bg">
      <TopNav />
      <div className="py-5 w-full h-screen lg:flex">
        {!kitchen && (
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
        )}
        <div
          className={
            !kitchen ? `lg:w-4/5` : "lg:w-screen lg:h-screen ml-5 py-5"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardLayout;
