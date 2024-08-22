import React from "react";
import { HowHomeMadeWorksProps } from "../../utils/Interfaces";

const HowHomeMadeWorks = ({
  icon,
  header,
  paragraph,
}: HowHomeMadeWorksProps) => {
  return (
    <div className="card_bg_color rounded-2xl p-8 mb-5 lg:mb-0">
      <div>
        <img src={icon} alt="card-icon" />
      </div>
      <h2 className="card_headerText text-2xl mt-7 font_medium">{header}</h2>
      <p className="mt-4 gray_text_color text-base font_regular">{paragraph}</p>
    </div>
  );
};

export default HowHomeMadeWorks;
