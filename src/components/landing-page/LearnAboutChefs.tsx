import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { learnAboutChefsPropsData } from "../../utils/Interfaces";
import Button from "../Button";

const LearnAboutChefs = ({
  data,
  buttonTitle,
  buttonClick,
}: learnAboutChefsPropsData) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide + 1 === data.length) return;
    setCurrentSlide(currentSlide + 1);
  };

  const handlePrev = () => {
    if (currentSlide === 0) return;

    setCurrentSlide(currentSlide - 1);
  };

  return (
    <div className="mx-10 lg:mx-48 mt-14 mb-28">
      <div className="text-center">
        <h1 className="card_headerText text-center text-4xl font_bold">
          Make money from your kitchen
        </h1>
        <p className="gary_txt_color text-xl lg:text-2xl font_regular mt-2 text-center px-9">
          Join our carefully vetted and talented Home Chefs sharing the magic of
          great food.
        </p>
      </div>
      <Carousel
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        autoPlay
        stopOnHover
        selectedItem={currentSlide}
      >
        {data?.map((chef, i) => (
          <div key={i} className="lg:flex flex-row mt-9 ">
            <div>
              <div style={{ width: "95%" }}>
                <img src={chef.picture1} alt="chef" className="w-full" />
              </div>
              <div className="hidden lg:block">
                <div className="lg:flex flex-row justify-between my-6 lg:mt-6">
                  <Button
                    title={buttonTitle}
                    showIcon
                    onClick={buttonClick}
                    extraClasses="w-1/2"
                  />

                  <div className="flex items-center justify-evenly mr-10">
                    <div
                      className="cursor-pointer mr-10"
                      onClick={() => handlePrev()}
                    >
                      <img
                        src="images/prev.svg"
                        alt="previous"
                        className="w-12 h-12"
                      />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleNext()}
                    >
                      <img
                        src="images/next.svg"
                        alt="next"
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="my-3">
                <img src={chef.picture2} alt="picture2" />
              </div>
              <div className="primary_bg_color white_txt_color rounded-2xl p-10">
                <div className="text-left w-20 h-20">
                  <img src="images/hotMealicon.svg" alt="icon" />
                </div>
                <p className="mt-3 text-left font_regular">{chef.paragraph}</p>
                <h2 className="mt-3 3xl text-left font_bold">
                  {chef.chefsName}
                </h2>
              </div>
            </div>
            <div className="lg:hidden mt-5 flex items-center justify-between">
              <div className="w-4/6">
                <Button
                  title={buttonTitle}
                  showIcon
                  onClick={buttonClick}
                  extraClasses="w-full"
                />
              </div>
              <div className="flex items-center">
                <div
                  className="cursor-pointer mr-5"
                  onClick={() => handlePrev()}
                >
                  <img
                    src="images/prev.svg"
                    alt="previous"
                    className="w-8 h-8"
                  />
                </div>
                <div className="cursor-pointer" onClick={() => handleNext()}>
                  <img src="images/next.svg" alt="next" className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LearnAboutChefs;
