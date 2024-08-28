import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Button from "../Button";
import { HOME_ROUTES } from "../../routes/routes";

const Testimonials = ({ navigate, buttonClick }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = [
    {
      customer: "Bello",
      description:
        "Now I feel like visiting home. What in God's name is this magic I just had. Surreal taste! Amazing service!!",
      image: "images/testimonial1.png",
      icon: "images/emoji.svg",
    },
    {
      customer: "Afolabi",
      description:
        "Now that I've found my food plug, I'm never going back to eating out again. Ever. Thank you homemade.",
      image: "images/testimonial.png",
      icon: "images/emoji2.svg",
    },
    {
      customer: "Kemi",
      description:
        "I travel a lot and I’m hardly in one place, so I rarely cook. But homemade has made life easy for me when it comes to food.",
      image: "images/testimonial3.png",
      icon: "images/emoji.svg",
    },
    {
      customer: "Seyi",
      description:
        "I just ate the meal prepared by my Home Chef and I'm absolutely in awe. It reminds me of my Yoruba aunt, sister Peju’s special dinner.",
      image: "images/testimonial2.png",
      icon: "images/emoji2.svg",
    },
  ];

  const handleNext = () => {
    if (currentIndex === 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;

    setCurrentIndex(currentIndex - 1);
  };

  const handlePrevClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(reviews.length - 3);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNextClick = () => {
    if (currentIndex === reviews.length - 3) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <div className="py-16">
      <h1 className="text-4xl text-center text-white font_bold mb-10">
        People love Dropp. <br />{" "}
        <span className="text-[#06c16b] italic">See for yourself.</span>
      </h1>
      <div className="w-4/5 mx-auto my-14">
        <div className="w-full lg:flex flex-row gap-y-3">
          {/* <Carousel
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            autoPlay
            stopOnHover
            selectedItem={currentIndex}
          > */}
          {reviews?.map((review, index) => (
            <div className="h-96 lg:mr-5">
              <div
                key={index}
                className="relative z-10 h-96 bg-black border border-[#06c167] p-8 rounded-2xl flex flex-col items-center justify-center"
              >
                <img
                  src={review.image}
                  alt={review.customer}
                  className="w-16 h-16 rounded-full"
                  // style={{ width: "20%" }}
                />
                <p className="my-5 text-xs leading-5 text-center text-white font_regular">
                  {review.description}
                </p>
                <h3 className="text-white font_medium">{review.customer}</h3>
                <img
                  src={review.icon}
                  alt={review.customer}
                  // style={{ width: "20%" }}
                  className="mt-5 w-20 h-16"
                />
              </div>
              <div className="-mt-2 w-4/5 h-5 mx-auto bg-[#4E0B2B] rounded-3xl" />
            </div>
          ))}

          {/* <div className="lg:flex">
                {reviews?.slice(1)?.map((review, index) => (
                  <div
                    key={index}
                    className="lg:w-2/3 lg:mr-5 white_bg_color p-8 rounded-2xl mb-5 lg:mb-0"
                  >
                    <img
                      src={review.image}
                      alt={review.customer}
                      style={{ width: "20%" }}
                    />
                    <p className="gray_text_color mt-2 font_regular">
                      {review.description}
                    </p>
                    <h3 className="gray_text_color mt-2 font_bold">
                      {review.customer}
                    </h3>
                  </div>
                ))}
              </div> */}
          {/* </Carousel> */}
          {/* <div className="mt-5 flex justify-center lg:justify-left">
              <div onClick={handlePrev} className="cursor-pointer mr-10">
                <img
                  src="images/pinkPrev.svg"
                  alt="previous"
                  className="w-8 h-8"
                />
              </div>
              <div onClick={handleNext} className="cursor-pointer">
                <img src="images/pinkNext.svg" alt="next" className="w-8 h-8" />
              </div>
          </div> */}
        </div>

        <div className="flex items-center justify-center gap-x-4">
          <Button
            title="Order instantly"
            extraClasses="w-40"
            onClick={() => navigate(HOME_ROUTES.linkExplore)}
          />
          <Button
            title="Buy a meal plan"
            bgColor=" bg-[#4E0B2B]"
            extraClasses="w-40"
            onClick={() => navigate(HOME_ROUTES.linkSubscription)}
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
