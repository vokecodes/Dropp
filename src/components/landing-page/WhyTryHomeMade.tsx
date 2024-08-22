import React from "react";
import Button from "../Button";

const WhyTryHomeMade = ({ buttonClick }: any) => {
  return (
    <div className="tertiary_bg_colo mt-20">
      <h1 className="card_headerText text-4xl font_bold text-center">
        Why Try homemade?
      </h1>

      <div className="mt-10 lg:mt-20 lg:flex flex-row justify-center mx-10">
        <div
          className="lg:mr-10 w-full lg:w-2/5"
          // style={{ height: 663, width: 634 }}
        >
          <img src="images/stack.png" alt="stack" className="w-full" />
        </div>

        <div className="mt-10 lg:mt-0">
          <div className="flex flow-row">
            <div>
              <img src="images/love.svg" alt="love" className="" />
            </div>
            <div className="ml-7">
              <h2 className="card_headerText text-2xl font_bold">
                Support local cooks.
              </h2>
              <p className="gray_text_color font_regular w-66 text-1xl mt-2 ">
                Unlike restaurants, you know who <br /> makes your meal & how it
                is prepared.
              </p>
            </div>
          </div>
          <div className="flex flow-row my-10">
            <div>
              <img src="images/location.svg" alt="love" className="" />
            </div>
            <div className="ml-7">
              <h2 className="card_headerText text-2xl font_bold">
                Explore new cultures.
              </h2>
              <p className="gray_text_color font_regular w-66 text-1xl mt-2 ">
                Reconnect with your local favourites <br /> & explore new
                cultures through <br /> traditional homemade cuisines.
              </p>
            </div>
          </div>
          <div className="flex flow-row">
            <div>
              <img src="images/tag.svg" alt="love" className="" />
            </div>
            <div className="ml-7">
              <h2 className="card_headerText text-2xl font_bold">
                Starting at N1,000.
              </h2>
              <p className="gray_text_color font_regular w-66 text-1xl mt-2 ">
                Enjoy authentic homemade meals <br />
                without breaking bank or time.
              </p>
              <Button
                title="Explore Meals"
                showIcon
                onClick={buttonClick}
                extraClasses="w-52 lg:w-80  mt-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhyTryHomeMade;
