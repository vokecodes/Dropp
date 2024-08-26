import React from "react";
import { GalleyProps } from "../../utils/Interfaces";

interface Food {
  id: string;
  image: string;
  title: string;
}

const FoodGallery = ({ meals, foods }: GalleyProps) => {
  return (
    <section>
      <div className="gallery_bg py-10 h-full ">
        <div className="overflow-hidden">
          <div className="foodTitles">
            <div className="flex flex-row ">
              {foods &&
                foods.map((food: Food) => (
                  <div
                    key={food.id}
                    className="shrink-0 w-72 h-16 p-4 flex flex-row justify-center items-center bg-white rounded-xl shadow-2xl mr-5"
                  >
                    <img
                      src={food.image}
                      alt={food.title}
                      className="mr-3 rotate360"
                    />
                    <p className="font_medium text-black text-base">
                      {food.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="overflow-hidden">
            <div className="foodImages">
              <div className="flex flex-row ">
                {meals?.map(
                  (
                    pic: string | undefined,
                    i: React.Key | null | undefined
                  ) => (
                    <img key={i} src={pic} alt="gallery" className="mr-5" />
                  )
                )}
                {meals
                  .slice(0, 4)
                  ?.map(
                    (
                      pic: string | undefined,
                      i: React.Key | null | undefined
                    ) => (
                      <img key={i} src={pic} alt="gallery" className="mr-5" />
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden mt-5 mb-3">
          <div className="foodTitles">
            <div className="flex flex-row ">
              {foods &&
                foods.map((food: Food) => (
                  <div
                    key={food.id}
                    className="shrink-0 w-72 h-16 p-4 flex flex-row justify-center items-center bg-white rounded-xl shadow-2xl mr-5"
                  >
                    <img
                      src={food.image}
                      alt={food.title}
                      className="mr-3 rotate360"
                    />
                    <p className="font_medium text-black text-base">
                      {food.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodGallery;
