import React from "react";
import TextSlider from "./TextSlider";
import { Link } from "react-router-dom";
import { HOME_ROUTES } from "../../routes/routes";

const FoodSafety = () => {
  return (
    <div className="">
      <div className="relative -bottom-4 lg:-bottom-[4.5rem] w-full px-2">
        <img src="/images/foodsafety.svg" className="w-full object-cover" alt="" />
      </div>

      {/* <TextSlider /> */}
      <div className="relative rounded-3xl p-10 lg:p-20 bg-[#FEC5CB] overflow-hidden">
        <div className="absolute top-6 lg:left-60">
          <img src="images/particles.svg" alt="particles" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src="images/food-safety-badge.svg" alt="food-safety-badge" />
          <div className="my-5 text-center">
            <p className="hidden lg:block text-sm lg:text-base text-center gray_text_color font_regular">
              At Homemade, we have a conscious lifelong commitment to ensure{" "}
              <br />
              that your food always remain safe to eat. All vendors are required
              to <br /> pass an accredited food safety & quality assessment exam
              while also <br /> complying with local laws & guidelines.
            </p>
            <p className="lg:hidden text-sm lg:text-base text-center gray_text_color font_regular">
              At Homemade, we have a conscious lifelong commitment to ensure{" "}
              that your food always remain safe to eat. All vendors are required
              to pass an accredited food safety & quality assessment exam while
              also complying with local laws & guidelines.
            </p>
            <Link
              to={HOME_ROUTES.linkFoodSafety}
              className="text-center primary_txt_color underline font_bold mt-2 cursor-pointer"
            >
              Learn More
            </Link>
          </div>
          <img src="images/pot.svg" alt="pot" />
        </div>
      </div>
    </div>
  );
};

export default FoodSafety;
