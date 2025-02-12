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
import ChefsDates from "../../components/landing-page/ChefsDates";
import ChefShopMenuCard from "../../components/ChefShopMenuCard";
import { getABusinessByName } from "../../_redux/business/businessCrud";
import Preloader from "../../components/Preloader";
import { useAppDispatch } from "../../redux/hooks";
import moment from "moment";
import NotFound from "../../components/NotFound";
import { USER_TYPE } from "../../utils/Globals";

const APP_URL = window.location.origin;

const PreviewChefShop = () => {
  const dispatch = useAppDispatch();

  const { person } = useSelector(
    (state: any) => ({
      person: state.user.user,
    }),
    shallowEqual
  );

  const [showShareButtons, setShowShareButtons] = useState(false);

  const { businessName } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [chef, setChef] = useState<any>();

  const getChef = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await getABusinessByName(businessName);

      if (data) {
        setChef(data.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getChef();
  }, [dispatch, getChef]);

  const [cartMenu, setCartMenu] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState("all");

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
                                color="#06c167"
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
                              <div className="flex-1 hidden lg:block">
                                <div className="justify-end flex flex-row input_text">
                                  <div className="rounded-full solid_border flex items-center justify-center w-10 h-10 mr-5 cursor-pointer">
                                    <AiOutlineHeart fontSize={30} />
                                  </div>
                                  <div className="flex rounded-xl solid_border items-center justify-center px-2 cursor-pointer">
                                    <CiShare2 fontSize={18} />
                                    <h1 className="ml-2 font_regular">Share</h1>
                                  </div>
                                </div>
                              </div>
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

                            {chef?.profile?.address && (
                              <p className="input_text text-base font_bold">
                                <span className="capitalize">
                                  {chef?.profile?.address}
                                </span>
                              </p>
                            )}

                            <div className="lg:flex my-3">
                              <div
                                className={`w-60 flex p-2 items-center justify-center rounded-lg ${
                                  chef?.profile?.virtualKitchenVisit
                                    ? "bg_green"
                                    : "sec_primary_bg_color"
                                }`}
                              >
                                <img
                                  src={
                                    chef?.profile?.virtualKitchenVisit
                                      ? "/images/food_safety_icon.svg"
                                      : "/images/food_safety_pending_icon.svg"
                                  }
                                  alt="safety batch"
                                />
                                <p
                                  className={`ml-3 font-bold ${
                                    chef?.profile?.virtualKitchenVisit
                                      ? "txt_green"
                                      : "txt_danger"
                                  }`}
                                >
                                  Food Safety{" "}
                                  {chef?.profile?.virtualKitchenVisit
                                    ? "Certified"
                                    : "Pending"}
                                </p>
                              </div>
                              <div className="lg:ml-5">
                                {chef?.rating && chef?.rating?.length > 0 && (
                                  <div className="flex flex-row items-center mt-2 lg:mt-0">
                                    {/* <SolidStar /> */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="#06c167"
                                      className="w-8 h-8"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    {chef?.rating &&
                                      chef?.rating?.length > 0 && (
                                        <h3 className="ml-2 input_text text-md font_bold">
                                          {(
                                            chef?.rating?.reduce(
                                              (partialSum: any, a: any) =>
                                                partialSum + a,
                                              0
                                            ) / chef?.rating?.length
                                          ).toFixed(1)}{" "}
                                          ({chef?.rating?.length} Rating
                                          {chef?.rating?.length > 1 && "s"})
                                        </h3>
                                      )}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mt-2">
                              <p className="input_text font_regular text-sm text-wrap h-10 overflow-hidden">
                                {chef?.business?.businessDescription}
                              </p>
                            </div>

                            <div className="flex flex-row flex-wrap">
                              {chef?.business &&
                                chef?.business?.businessSpecialisation &&
                                chef?.business?.businessSpecialisation?.map(
                                  (s: any, i: any) => (
                                    <div
                                      key={i}
                                      className="mt-2 tertiary_bg_color w-28 py-2 rounded-xl mr-2"
                                    >
                                      <p className="tertiary_text_color text-center font_bold">
                                        {s}
                                      </p>
                                    </div>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChefsDates
                        menu={chef?.menu}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setCartMenu={setCartMenu}
                      />
                    </div>
                    <div className="grayBackground pb-20 pt-5">
                      <h1 className="pl-5 lg:pl-16 card_headerText text-2xl">
                        {selectedDate &&
                          selectedDate !== "all" &&
                          moment(selectedDate).format("dddd")}{" "}
                        Main Items
                      </h1>
                      <div className="flex flex-row flex-wrap mx-5">
                        {selectedDate === "all" ? (
                          <>
                            {chef?.menu &&
                              chef?.menu?.map((menu: any) => (
                                <div
                                  key={menu._id}
                                  className="w-full lg:w-[30%] lg:mr-5"
                                >
                                  <ChefShopMenuCard
                                    menu={menu}
                                    onClickAddToBag={() => {}}
                                    inCart={cartMenu?.includes(menu)}
                                    cartMenu={cartMenu}
                                  />
                                </div>
                              ))}
                          </>
                        ) : (
                          <>
                            {chef?.menu &&
                              chef?.menu?.length > 0 &&
                              chef?.menu
                                ?.filter(
                                  (m: any) =>
                                    m.deliveryDate ===
                                    moment(selectedDate)
                                      .format("dd")
                                      .toUpperCase()
                                )
                                .map((menu: any) => (
                                  <div
                                    key={menu._id}
                                    className="w-full lg:w-[30%] lg:mr-5"
                                  >
                                    <ChefShopMenuCard
                                      menu={menu}
                                      onClickAddToBag={() => {}}
                                      inCart={cartMenu?.includes(menu)}
                                      cartMenu={cartMenu}
                                    />
                                  </div>
                                ))}
                          </>
                        )}
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

export default PreviewChefShop;
