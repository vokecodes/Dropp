import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { formatPrice, truncateText } from "../utils/formatMethods";

const RestaurantShopCartMenuCard = ({
  menu,
  onClickAddToBag,
  inCart,
  cartMenu,
  handleIncrement,
  handleDecrement,
  selectedMealQuantityReached,
  showMinimumQuantityReached,
  addMenuError,
}: any) => {
  return (
    <div className="w-full h-full bg-white p-4 shadow rounded-xl cursor-pointer flex">
      <div className="w-1/3 h-full mr-5">
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
                className="h-20 lg:h-28 rounded-xl object-cover"
              />
            ))}
          </Carousel>
        )}
      </div>

      <div className="w-2/3 h-full">
        <div className="w-full h-full flex flex-col items-start justify-between">
          <div className="w-full flex gap-x-3">
            <h2 className="w-full text-black font_medium line-clamp-2 text-ellipsis overflow-hidden capitalize">
              {truncateText(menu?.foodName, 25, 23)}
            </h2>
          </div>

          <h6 className="text-lg font_bold primary_txt_color mt-1">
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

          <div className="my-1 w-full">
            {inCart ? (
              <div className="w-full primary_bg_color flex flex-row justify-between items-center rounded-full p-1">
                <p
                  className="font-bold cursor-pointer h-6 w-6 lg:h-5 w-5 bg-white text-lg rounded-full flex items-center justify-center"
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
                <p className="mx-5 font_bold">
                  {cartMenu?.find((m: any) => m._id === menu._id)?.quantity}
                </p>
                <p
                  className="font-bold cursor-pointer h-6 w-6 lg:h-5 w-5 bg-white text-lg rounded-full flex items-center justify-center"
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
                className="w-full py-1 border-2 primary_border_color text-base lg:text-sm font_medium text-gray-400 text-center shadow-sm cursor-pointer rounded-full"
                onClick={onClickAddToBag}
              >
                Add to bag
              </button>
            )}
          </div>
        </div>

        {showMinimumQuantityReached &&
          selectedMealQuantityReached === menu && (
            <p className="mt-2 text-sm text-center text-red-600">
              Minimum quantity is {menu?.minimumQuantity}
            </p>
          )}

        {cartMenu?.filter((m: any) => m === menu)?.length > 0 &&
          addMenuError && (
            <p className="mt-2 text-sm text-center text-red-600">
              {addMenuError}
            </p>
          )}
      </div>
    </div>
  );
};

export default RestaurantShopCartMenuCard;
