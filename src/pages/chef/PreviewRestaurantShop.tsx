import React, { useState, useEffect, useCallback } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { GiCook } from "react-icons/gi";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import Footer from "../../components/landing-page/Footer";
import TopNav from "../../components/landing-page/TopNav";
import { CiShare2 } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { GiKnifeFork } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import ChefsDates from "../../components/landing-page/ChefsDates";
import ChefShopMenuCard from "../../components/ChefShopMenuCard";
import { getABusinessRestaurantByName } from "../../_redux/business/businessCrud";
import Preloader from "../../components/Preloader";
import { useAppDispatch } from "../../redux/hooks";
import moment from "moment";
import NotFound from "../../components/NotFound";
import { USER_TYPE } from "../../utils/Globals";
import { SERVER } from "../../config/axios";
import { DINNING_MENU_CATEGORY_URL } from "../../_redux/urls";

const PreviewRestaurantShop = () => {
  const dispatch = useAppDispatch();

  const { person } = useSelector(
    (state: any) => ({
      person: state.user.user,
    }),
    shallowEqual
  );

  const { businessName } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [chef, setChef] = useState<any>();
  const [dinningMenuCategories, setDinningMenuCategories] = useState<any>([]);

  const getChef = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await getABusinessRestaurantByName(businessName);

      if (data) {
        setChef(data.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getDinningMenuCategories = () => {
    SERVER.get(DINNING_MENU_CATEGORY_URL)
      .then(({ data }) => {
        console.log("wneklm", data);
        if (
          data?.dinningMenuCategory?.categories &&
          data?.dinningMenuCategory?.categories?.length > 0
        ) {
          setDinningMenuCategories(data?.dinningMenuCategory?.categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getChef();
    getDinningMenuCategories();
  }, [dispatch, getChef]);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {chef ? (
            <div>
              <div className="bg-white">
                <TopNav
                  textUrl={undefined}
                  loginUrl={undefined}
                  text={"Become a chef"}
                  login={"Login"}
                />
                <div className="flex flex-row">
                  <div className="w-full lg:w-9/12">
                    <div className="bg-white lg:pl-16 pb-9 ">
                      <img
                        src={
                          chef?.business?.coverImage ||
                          "/images/chef-landing-page-hero.png"
                        }
                        alt="chefBanner"
                        // className="rounded-xl h-96 w-full object-cover"
                        className="rounded-3xl lg:rounded-xl h-96 w-full object-cover"
                      />

                      <div className="flex flex-row mt-5 mx-5">
                        <div className="">
                          <div
                            className={`border-4 w-20 lg:w-40 h-20 lg:h-40 rounded-full flex justify-center items-center  overflow-hidden ${
                              chef?.profile?.image
                                ? "border-white"
                                : "primary_border_color"
                            }`}
                          >
                            {chef?.profile?.image ? (
                              <img
                                src={chef?.profile?.image}
                                alt="chef"
                                className="w-20 lg:w-40 h-20 lg:h-40 rounded-full object-cover"
                              />
                            ) : (
                              <GiCook
                                color="#e85666"
                                className="w-20 lg:w-40 h-20 lg:h-40 rounded-full p-4"
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 ml-4">
                          <div>
                            <div className="flex flex-row items-center">
                              <h1 className="text-xl lg:text-3xl font_bold ">
                                {chef?.business?.businessName}
                              </h1>
                            </div>

                            <p className="input_text font_regular">
                              By{" "}
                              <span className="capitalize">
                                {chef?.profile?.firstName}
                              </span>{" "}
                              <span className="capitalize">
                                {chef?.profile?.lastName}
                              </span>
                            </p>

                            <div className="mt-2">
                              <p className="input_text font_regular text-sm text-wrap h-10 overflow-hidden">
                                {chef?.business?.businessDescription}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pl-5 lg:pl-16 my-8">
                      <div className="flex flex-row flex-nowrap overflow-scroll">
                        <div
                          className="px-5 py-3 flex shrink-0 items-center mr-3 primary_bg_color rounded-full cursor-pointer"
                          onClick={() => {}}
                        >
                          <GiKnifeFork size={24} color="#ffffff" />
                          <p className="pl-2 text-white text-md">All</p>
                        </div>
                        {dinningMenuCategories?.map(
                          (category: any, i: number) => (
                            <div
                              key={i}
                              className={`px-4 py-3 flex shrink-0 items-center justify-center text-center rounded-full mr-3 cursor-pointer`}
                              style={{ backgroundColor: "#EDECEC" }}
                              onClick={() => {}}
                            >
                              <MdFastfood size={24} color="#6D6D6D" />
                              <p
                                className="pl-2 text-white text-md"
                                style={{ color: "#6D6D6D" }}
                              >
                                {category?.label}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="grayBackground pb-20 pt-5">
                      <h1 className="pl-5 lg:pl-16 card_headerText text-2xl">
                        Main Items
                      </h1>
                      <div className="flex flex-row flex-wrap mx-5">
                        <>
                          {chef?.menu &&
                            chef?.menu?.map((menu: any) => (
                              <div
                                key={menu._id}
                                className="w-full lg:w-[30%] lg:mr-5"
                              >
                                <ChefShopMenuCard menu={menu} />
                              </div>
                            ))}
                        </>
                      </div>
                    </div>
                  </div>
                </div>

                <Footer
                  chefDashboard={
                    person?.userType === USER_TYPE.CHEF ? true : false
                  }
                />
              </div>
            </div>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  );
};

export default PreviewRestaurantShop;
