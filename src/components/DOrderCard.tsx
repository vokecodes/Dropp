import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { DOrderCardProps } from "../utils/Interfaces";

const DOrderCard = ({ title, total, to }: DOrderCardProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-center p-4 lg:p-0 bg-white rounded-2xl h-60 lg:h-52 lg:w-[48%]">
      <div className="lg:ml-14 lg:mr-10">
        <img src="/images/document.svg" alt="doc" />
      </div>
      <div className="mt-5 lg:mt-0">
        <p className="text-sm lg:text-base ter_gray_color font_regular">
          {title}
        </p>
        <p className="my-2 text-4xl text-black font_bold">{total}</p>
        <Link to={to}>
          <div className="flex items-center">
            <p className="text-base lg:text-xl text-black font_regular">
              View all
            </p>
            <FiChevronRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DOrderCard;
