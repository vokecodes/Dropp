import Button from "../Button";
import React from "react";
import { LandingPageHeroProps } from "../../utils/Interfaces";
import { FaPlusCircle } from "react-icons/fa";

const Header = ({
  backgroundImage,
  bgExtraClasses,
  textContainerClasses,
  text1,
  text1ExtraClasses,
  text2,
  text3,
  text4,
  text4ExtraClasses,
  buttonTitle,
  buttonClick,
  newFlag,
}: LandingPageHeroProps) => {
  return (
    <>
      {newFlag ? (
        <div className={`${bgExtraClasses}`}>
          <div className={`${textContainerClasses}`}>
            <p className={`${text1ExtraClasses} flex items-center gap-x-2`}>
              {text1}
              <span className="bg-white rounded-full p-0">
                <FaPlusCircle
                  color="#06c167"
                  size={50}
                  style={{
                    borderStyle: "none",
                  }}
                />
              </span>
            </p>
            <p className={`${text1ExtraClasses}`}>{text2}</p>
            <p className={`${text1ExtraClasses}`}>{text3}</p>
            <p className={`${text1ExtraClasses}`}>{text4}</p>
          </div>
          <img
            src={backgroundImage}
            className="w-4/5 md:w-1/2 lg:w-2/5 h-auto p-0 lg:my-2 mx-0 relative top-10 md:top-5 lg:static lg:top-0 floating"
            alt="Hero Image"
          />
        </div>
      ) : (
        <div
          className={` ${bgExtraClasses}`}
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4))`,
            backgroundImage: `url(${backgroundImage})`,
            backgroundBlendMode: "overlay",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
          }}
        >
          <div className={`${textContainerClasses}`}>
            <p className={`${text1ExtraClasses}`}>{text1}</p>
            <p className={`${text1ExtraClasses}`}>{text2}</p>
            <p className={`${text1ExtraClasses}`}>{text3}</p>
            <p className={`${text4ExtraClasses}`}>{text4}</p>
            <Button
              title={buttonTitle}
              showIcon
              onClick={buttonClick}
              extraClasses="primary_txt_color white_bg_color mb-8 mt-6"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
