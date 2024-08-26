import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
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
import { formatPrice } from "../utils/formatMethods";

const ExploreMenuCard = ({ menu, onClickAddToBag, inCart, menuError }: any) => {
  const [menuInfoModal, setMenuInfoModal] = useState(false);

  const openMenuInfoModal = () => setMenuInfoModal(true);
  const closeMenuInfoModal = () => setMenuInfoModal(false);

  return (
    <div className="w-full">
      <div
        className="w-full bg-white shadow mt-5 lg:mr-7 rounded-xl cursor-pointer flex flex-col pb-5"
        // style={{ height: 440 }}
      >
        <div className="flex-1">
          <div className="">
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
                    className="w-full h-52 rounded-t-xl object-cover"
                  />
                ))}
              </Carousel>
            )}
          </div>
          <div className="py-4 px-6">
            <h2 className="text-black font_medium">{menu?.foodName}</h2>
            <p className="text-gray-400 text-sm font_regular mt-1 truncate">
              {menu?.description}
            </p>
            <h3
              className="underline text-gray-400 text-sm font_bold mt-1"
              onClick={openMenuInfoModal}
            >
              Item details
            </h3>
          </div>
        </div>
        <div className="px-6">
          {menuError && (
            <p className="mb-2 text-xs text-red-600">{menuError}</p>
          )}
          <button
            className="w-36 h-10 bg_select_meal flex items-center p-3 shadow-sm cursor-pointer rounded-full"
            onClick={onClickAddToBag}
          >
            <div
              className={`w-5 h-5 rounded-full ${
                inCart ? "primary_bg_color" : "bg-white"
              } `}
            />
            <p className="ml-2 text-sm font_medium text-black">Select meal</p>
          </button>
        </div>
      </div>

      <Modal
        open={menuInfoModal}
        onClose={closeMenuInfoModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        component={"div"}
      >
        <div className="absolute top-1/2 left-1/2 w-11/12 lg:w-1/3 h-4/5 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl my-10 pb-4 outline-none">
          <div>
            <div
              style={{
                backgroundImage: `url(${menu?.images[0]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
              }}
              className="h-72"
            >
              <div className="flex justify-between py-3 px-6 input_text">
                <div />
                <div
                  className="rounded-full bg-white flex items-center justify-center w-10 h-10 cursor-pointer"
                  onClick={closeMenuInfoModal}
                >
                  <XMarkIcon className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="mt-3 py-3 px-10">
              <h2 className="card_headerText text-2xl font_medium">
                {menu?.foodName}
              </h2>
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
                  {menu?.description}
                </p>
              </div>
              <div className="mb-3">
                <h2 className="text-lg font_bold">Main Ingredients</h2>
                <p className="text-gray-400 text-sm text-wrap mt-1">
                  {menu?.ingredients}
                </p>
              </div>
              <div className="mb-3">
                <h2 className="text-lg font_bold">Other notes</h2>
                <p className="text-gray-400 text-sm text-wrap mt-1">
                  {menu?.note}
                </p>
              </div>

              <div className="mt-7">
                <button
                  className="w-36 h-10 bg_select_meal flex items-center p-3 shadow-sm cursor-pointer rounded-full"
                  onClick={onClickAddToBag}
                >
                  <div
                    className={`w-5 h-5 rounded-full ${
                      inCart ? "primary_bg_color" : "bg-white"
                    } `}
                  />
                  <p className="ml-2 text-sm font_medium text-black">
                    Select meal
                  </p>
                </button>

                {menuError && (
                  <p className="mb-2 text-xs text-red-600">{menuError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExploreMenuCard;
