// @ts-nocheck
import React, { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import PageTitle from "../../components/PageTitle";
import BannerCard from "../../components/BannerCard";
import { Link } from "react-router-dom";
import { SUB_CHEF_ROUTES } from "../../routes/routes";
import { useAppDispatch } from "../../redux/hooks";
import { getProfileSubChefAccount } from "../../_redux/user/userAction";

const ChefMenu = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(
    (state: any) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getProfileSubChefAccount());
  }, []);

  return (
    <>
      <ChefDashboardLayout>
        <>
          <div className="w-full px-6 py-4">
            <div className="lg:flex flex-row w-full justify-between">
              <PageTitle title="My Menu" />
            </div>

            <div className="mt-5">
              <BannerCard
                backgroundImage="/images/chef-menu-banner.svg"
                bgExtraClasses="p-7 lg:p-2 bg-cover bg-no-repeat min-w-full h-42"
                textContainerClasses="pl-10 py-10"
                text1="Design your menu"
                text1ExtraClasses="text-3xl text-white font_bold  mb-5"
                text2="Craft beautiful menus, set your own prices & available dates, and start selling right away."
                text2ExtraClasses="text-xs text-white font_regular mt-2 mb-5 w-60"
                // text3="Show tips"
                // text3ExtraClasses="text-1xl text-white font_regular"
                // iconColor="#fff"
                // iconSize={24}
                // iconExtraClasses="ml-2"
              />
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-y-0 lg:gap-x-2 w-full h-fit py-5">
                <Link to={SUB_CHEF_ROUTES.linkSubChefMenuOnline}>
                  <div className="relative w-full h-fit rounded-2xl">
                    <img
                      src="/img/online.png"
                      alt=""
                      className="object-cover h-56 min-h-full w-full rounded-2xl"
                    />
                    <div className="absolute bottom-5 left-0 p-5 space-y-3">
                      <p className="text-start text-white text-2xl font-semibold font_medium">
                        Homemade Menu
                      </p>
                      <button
                        className="px-3 py-1 rounded-lg text-white font_medium"
                        style={{ backgroundColor: "#FFFFFF26" }}
                      >
                        Learn more
                      </button>
                    </div>
                  </div>
                </Link>

                {user?.isRestaurant && (
                  <Link to={SUB_CHEF_ROUTES.linkSubChefMenuDineIn}>
                    <div
                      className="relative w-full h-fit rounded-2xl"
                      style={{ border: "2px solid rgba(232, 86, 102, 0.46)" }}
                    >
                      <img
                        src="/img/dine-in.png"
                        alt=""
                        className="object-cover h-56 min-h-full w-full rounded-2xl"
                      />
                      <div className="absolute bottom-5 left-0 p-5 space-y-3">
                        <p className="text-start text-black text-2xl font-semibold font_medium">
                          Dine-in Menu
                        </p>
                        <button
                          className="px-3 py-1 rounded-lg font_medium"
                          style={{
                            backgroundColor: "rgb(78 11 43 / 0.11)",
                            color: "#4E0B2B",
                          }}
                        >
                          Learn more
                        </button>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      </ChefDashboardLayout>
    </>
  );
};

export default ChefMenu;
