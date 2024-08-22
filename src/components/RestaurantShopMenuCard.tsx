import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import Hotjar from "@hotjar/browser";
import Modal from "@mui/material/Modal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { FaConciergeBell } from "react-icons/fa";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import {
  favoriteAMeal,
  unFavoriteAMeal,
} from "../_redux/favourite/favouriteAction";
import { useAppDispatch } from "../redux/hooks";
import ColoredSpinner from "./ColoredSpinner";
import { formatPrice, truncateText } from "../utils/formatMethods";
import TrackGoogleAnalyticsEvent from "./TrackGoogleAnalyticsEvent";

const RestaurantShopMenuCard = ({
  chefName,
  menu,
  onClickAddToBag,
  inCart,
  cartMenu,
  handleIncrement,
  handleDecrement,
  selectedMealQuantityReached,
  showMinimumQuantityReached,
  addMenuError,
  popular,
}: any) => {
  const dispatch = useAppDispatch();

  const { foodName } = useParams();

  const { user, favouriteMeals, mealLoading } = useSelector(
    (state: any) => ({
      user: state.user.user,
      favouriteMeals: state.favourite.meals,
      mealLoading: state.favourite.mealLoading,
    }),
    shallowEqual
  );

  const favouriteMeal = () => {
    if (!user) {
      alert("You are not logged in.");
    } else {
      dispatch(favoriteAMeal(menu?._id));

      TrackGoogleAnalyticsEvent(
        `FAVORITE_MEAL`,
        `Favorite meal ${menu?.foodName}`,
        window.location.pathname + window.location.search,
        {
          foodName: menu?.foodName,
        }
      );
      Hotjar.event("FAVORITE_MEAL");
    }
  };

  const unFavoriteMeal = () => {
    if (!user) {
      alert("You are not logged in.");
    } else {
      dispatch(unFavoriteAMeal(menu?._id));

      TrackGoogleAnalyticsEvent(
        `UNFAVORITE_MEAL`,
        `Unfavorite meal ${menu?.foodName}`,
        window.location.pathname + window.location.search,
        {
          foodName: menu?.foodName,
        }
      );
      Hotjar.event("UNFAVORITE_MEAL");
    }
  };

  const menuIsUserFavourite =
    favouriteMeals &&
    menu &&
    favouriteMeals?.length > 0 &&
    favouriteMeals?.find((f: any) => f.menu?._id === menu?._id);

  const [menuInfoModal, setMenuInfoModal] = useState(false);
  const [showShareButtons, setShowShareButtons] = useState(false);

  const openMenuInfoModal = () => setMenuInfoModal(true);
  const closeMenuInfoModal = () => {
    setMenuInfoModal(false);
    setShowShareButtons(false);
  };

  useEffect(() => {
    const name = foodName?.split("-").join(" ");

    if (name === menu?.foodName) {
      openMenuInfoModal();
    }
  }, []);

  const shareMessage = `Hey, check out this meal on Homemade ${
    window.location.origin
  }/explore/${chefName?.trim().split(" ").join("-")}/${menu?.foodName
    ?.split(" ")
    .join("-")}`;

  const renderShareButtons = () => (
    <div className="mt-2 flex flex-col">
      <FacebookShareButton
        url=" "
        quote={shareMessage}
        className="mb-2"
        onClick={() => {
          TrackGoogleAnalyticsEvent(
            `SHARE_MEAL_ON_FACEBOOK`,
            `Share meal on facebook`,
            window.location.pathname + window.location.search,
            {}
          );
          Hotjar.event("SHARE_MEAL_ON_FACEBOOK");
        }}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton
        url=" "
        className="mb-2"
        title={shareMessage}
        onClick={() => {
          TrackGoogleAnalyticsEvent(
            `SHARE_MEAL_ON_WHATSAPP`,
            `Share meal on Whatsapp`,
            window.location.pathname + window.location.search,
            {}
          );
          Hotjar.event("SHARE_MEAL_ON_WHATSAPP");
        }}
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton
        url=" "
        title={shareMessage}
        onClick={() => {
          TrackGoogleAnalyticsEvent(
            `SHARE_MEAL_ON_TWITTER`,
            `Share meal on Twitter`,
            window.location.pathname + window.location.search,
            {}
          );
          Hotjar.event("SHARE_MEAL_ON_TWITTER");
        }}
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    </div>
  );

  return (
    <div className="w-full">
      <div className="relative w-full h-fit lg:h-96 bg-white shadow lg:mt-0 p-2 lg:p-0 rounded-xl cursor-pointer flex flex-row justify-between items-center lg:flex-col lg:justify-start lg:items-center">
        <div
          className="w-48 lg:w-full h-full lg:h-1/2 overflow-hidden mr-5 lg:m-0"
          onClick={openMenuInfoModal}
        >
          {menu?.images && menu?.images?.length > 0 && (
            <Carousel
              showIndicators={false}
              showStatus={false}
              autoPlay
              infiniteLoop
              showThumbs={false}
            >
              {menu?.images?.map((image: string, i: number) => (
                <img
                  key={i}
                  src={image}
                  alt="food"
                  className="w-48 lg:w-full min-h-48 h-48 rounded-xl object-cover object-center"
                />
              ))}
            </Carousel>
          )}
        </div>

        <div className="w-3/5 lg:w-full h-full lg:h-1/2 flex flex-col items-start justify-between lg:p-3">
          <div className="w-full flex flex-col items-start justify-start lg:justify-between">
            <div className="absolute top-4 left-3 lg:left-4 flex flex-col lg:flex-row justify-start items-center gap-x-2 gap-y-1 lg:gap-y-0">
              {popular && (
                <button className="w-16 lg:w-24 h-6 lg:h-10 py-1 bg-[#99C446] shadow-sm rounded-3xl flex items-center justify-center">
                  <p className="text-[0.7rem] lg:text-base text-uppercase font_medium text-white text-center">
                    POPULAR
                  </p>
                </button>
              )}

              {menu?.discount && (
                <div className="yellow_bg w-16 lg:w-24 h-6 lg:h-10 rounded-3xl flex items-center justify-center">
                  <p className="text-[0.7rem] lg:text-base text-black font_medium text-center">
                    {menu?.discount}% off
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-x-3">
              <div className="w-full">
                <h2
                  className="hidden lg:block text-black font_medium overflow-hidden text-ellipsis capitalize"
                  onClick={openMenuInfoModal}
                >
                  {menu?.foodName}
                </h2>
                <h2
                  className="block lg:hidden text-black font_medium overflow-hidden text-ellipsis capitalize"
                  onClick={openMenuInfoModal}
                >
                  {truncateText(menu?.foodName, 25, 23)}
                </h2>
              </div>
            </div>

            <h6
              className="text-lg font_bold primary_txt_color mt-1"
              onClick={openMenuInfoModal}
            >
              <span
                className={`${
                  menu?.discount ? "line-through primary_light_txt_color" : ""
                }`}
              >
                ₦{formatPrice(menu?.price)}
              </span>{" "}
              {menu?.discount && (
                <span>
                  ₦
                  {formatPrice(
                    menu?.price - (menu?.price / 100) * menu?.discount
                  )}
                </span>
              )}
            </h6>

            <div className="w-40">
              <p
                className="text-gray-400 text-sm font_regular mt-1 truncate"
                onClick={openMenuInfoModal}
              >
                {menu?.description}
              </p>
            </div>

            <h3
              className="underline text-gray-400 text-sm font_bold mt-1"
              onClick={openMenuInfoModal}
            >
              See more
            </h3>

            <div className="my-2 w-full">
              {inCart ? (
                <div className="primary_bg_color flex flex-row justify-between items-center rounded-full p-1 w-full">
                  <p
                    className="font-bold cursor-pointer h-9 w-9 bg-white text-xl rounded-full flex items-center justify-center"
                    onClick={() =>
                      handleDecrement(
                        cartMenu?.find((m: any) => m._id === menu._id),
                        cartMenu?.find((m: any) => m._id === menu._id)
                          ?.minimumQuantity
                      )
                    }
                  >
                    -
                  </p>
                  <p className="mx-5 font_bold text-white">
                    {cartMenu?.find((m: any) => m._id === menu._id)?.quantity}
                  </p>
                  <p
                    className="font-bold cursor-pointer h-9 w-9 bg-white text-xl rounded-full flex items-center justify-center"
                    onClick={() => {
                      handleIncrement(
                        cartMenu?.find((m: any) => m._id === menu._id)
                      );
                    }}
                  >
                    +
                  </p>
                </div>
              ) : (
                <button
                  className="w-full py-1 border-2 primary_border_color text-lg font_medium text-gray-400 text-center shadow-sm cursor-pointer rounded-full"
                  onClick={onClickAddToBag}
                >
                  Add to bag
                </button>
              )}
            </div>
          </div>
          {showMinimumQuantityReached &&
            selectedMealQuantityReached._id === menu._id && (
              <p className="mt-1 text-sm text-center text-red-600 w-full">
                Minimum quantity is {menu?.minimumQuantity}
              </p>
            )}

          {cartMenu?.filter((m: any) => m === menu)?.length > 0 &&
            addMenuError && (
              <p className="mt-1 text-sm text-center text-red-600 w-full">
                {addMenuError}
              </p>
            )}
        </div>
      </div>

      <Modal
        open={menuInfoModal}
        onClose={closeMenuInfoModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        component={"div"}
      >
        <div className="absolute top-1/2 left-1/2 w-11/12 lg:w-1/3 h-4/5 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl my-10 pb-4 outline-none">
          <div className="relative h-full overflow-y-hidden">
            <div
              style={{
                backgroundImage: `url(${menu?.images[0]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="sticky top-0 h-2/5 rounded-t-3xl"
            >
              <div className="flex justify-between py-3 px-6 input_text">
                <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-y-1 gap-x-1 ">
                  {/* <div
                    className="rounded-full  flex items-center justify-center w-10 h-10 bg-white cursor-pointer"
                    onClick={
                      menuIsUserFavourite
                        ? () => unFavoriteMeal()
                        : () => favouriteMeal()
                    }
                  >
                    {mealLoading ? (
                      <ColoredSpinner />
                    ) : (
                      <>
                        {menuIsUserFavourite ? (
                          <AiFillHeart fontSize={30} color="#06c167" />
                        ) : (
                          <AiOutlineHeart fontSize={30} color="#8E8E8E" />
                        )}
                      </>
                    )}
                  </div> */}

                  {/* <div className="mx-2">
                    <div
                      className="rounded-full bg-white flex items-center justify-center w-10 h-10 cursor-pointer"
                      onClick={() => setShowShareButtons(!showShareButtons)}
                    >
                      <IoIosShareAlt fontSize={30} color="#8E8E8E" />
                    </div>
                    {showShareButtons && renderShareButtons()}
                  </div> */}
                  {popular && (
                    <button className="w-24 h-10 bg-[#99C446] shadow-sm rounded-3xl flex items-center justify-center">
                      <p className="text-[0.7rem] lg:text-base text-uppercase font_medium text-white text-center">
                        POPULAR
                      </p>
                    </button>
                  )}
                  {menu?.discount && (
                    <div className="yellow_bg w-24 h-10 rounded-3xl flex items-center justify-center">
                      <p className="text-md text-black font_medium text-center">
                        {menu?.discount}% off
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className="rounded-full bg-white flex items-center justify-center w-10 h-10 cursor-pointer"
                  onClick={closeMenuInfoModal}
                >
                  <XMarkIcon className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="w-full h-3/5 overflow-y-scroll">
              <div className="mt-3 py-3 px-10">
                <h2 className="card_headerText text-2xl capitalize font_medium">
                  {menu?.foodName}
                </h2>
                <h6 className="text-xl font_bold primary_txt_color mt-2">
                  <span
                    className={`${
                      menu?.discount
                        ? "line-through primary_light_txt_color"
                        : ""
                    }`}
                  >
                    ₦{formatPrice(menu?.price)}
                  </span>{" "}
                  {menu?.discount && (
                    <span>
                      ₦
                      {formatPrice(
                        menu?.price - (menu?.price / 100) * menu?.discount
                      )}
                    </span>
                  )}
                </h6>
              </div>

              <div className="flex flex-row justify-between py-3 px-10 grayBackground">
                <div>
                  <h1 className="text-lg font_bold">Portion size</h1>
                  <div className="mt-1 flex items-center">
                    <FaConciergeBell fontSize={20} color="#717171" />
                    <p className="input_text ml-2">{menu?.portion}</p>
                  </div>
                </div>
              </div>

              <div className="py-3 px-10">
                <div className="mb-3">
                  <h2 className="text-lg font_bold">Description</h2>
                  <p className="text-gray-400 text-sm text-wrap mt-1">
                    {menu?.description &&
                      `${menu?.description[0].toUpperCase()}${menu?.description.slice(
                        1,
                        menu?.description.length
                      )}.`}
                  </p>
                </div>
                <div className="mb-3">
                  <h2 className="text-lg font_bold">Main ingredients</h2>
                  {/* {menu?.ingredients &&
                  menu?.ingredients?.length > 0 &&
                  menu?.ingredients?.map((ingredient: any) => (
                    <p className="text-gray-400 text-sm truncate mt-1">
                      {ingredient}
                    </p>
                  ))} */}
                  <p className="text-gray-400 text-sm text-wrap mt-1">
                    {menu?.ingredients &&
                      `${menu?.ingredients[0].toUpperCase()}${menu?.ingredients.slice(
                        1,
                        menu?.ingredients.length
                      )}.`}
                  </p>
                </div>
                <div className="mb-3">
                  <h2 className="text-lg font_bold">Other notes</h2>
                  <p className="text-gray-400 text-sm text-wrap mt-1">
                    {menu?.note}
                  </p>
                </div>
              </div>

              <div className="relative h-1/6 w-full mt-3 flex flex-col justify-start items-center">
                {inCart ? (
                  <div className="primary_bg_color flex flex-row justify-between items-center rounded-full p-3 w-4/5 mx-auto">
                    <p
                      className="font-bold cursor-pointer h-9 w-9 bg-white text-xl rounded-full flex items-center justify-center"
                      onClick={() =>
                        handleDecrement(
                          cartMenu?.find((m: any) => m._id === menu._id),
                          cartMenu?.find((m: any) => m._id === menu._id)
                            ?.minimumQuantity
                        )
                      }
                    >
                      -
                    </p>
                    <p className="mx-5 text-xl font_bold text-white">
                      {cartMenu?.find((m: any) => m._id === menu._id)?.quantity}
                    </p>
                    <p
                      className="font-bold cursor-pointer h-9 w-9 bg-white text-xl rounded-full flex items-center justify-center"
                      onClick={() => {
                        handleIncrement(
                          cartMenu?.find((m: any) => m._id === menu._id)
                        );
                      }}
                    >
                      +
                    </p>
                  </div>
                ) : (
                  <button
                    className="border-2 primary_border_color text-lg font_medium text-gray-400 text-center shadow-sm cursor-pointer rounded-full py-3 w-4/5 mx-auto"
                    onClick={onClickAddToBag}
                  >
                    Add to bag
                  </button>
                )}
                {showMinimumQuantityReached &&
                  selectedMealQuantityReached._id === menu._id && (
                    <p className="mt-1 text-sm text-center text-red-600 w-full">
                      Minimum quantity is {menu?.minimumQuantity}
                    </p>
                  )}

                {cartMenu?.filter((m: any) => m === menu)?.length > 0 &&
                  addMenuError && (
                    <p className="mt-1 text-sm text-center text-red-600 w-full">
                      {addMenuError}
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RestaurantShopMenuCard;
