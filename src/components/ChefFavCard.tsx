import { useNavigate } from "react-router-dom";
import { GiCook } from "react-icons/gi";
import OutlineStar from "./OutlineStar";
import SolidStar from "./SolidStar";
import { formatBusinessNameLink } from "../utils/formatMethods";

const ChefFavCard = ({ chef }: any) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow mt-7 rounded-xl cursor-pointer"
      onClick={() =>
        navigate(
          `/explore/${formatBusinessNameLink(chef?.business?.businessName)}`
        )
      }
    >
      {" "}
      <img
        src={chef?.business?.coverImage || "/images/chef-landing-page-hero.png"}
        alt="food"
        className="w-full h-80 object-cover rounded-t-xl"
      />
      <div className="-mt-10 flex mx-5">
        <div className="flex-1" />
        <div
          className={`mb-5 shadow border-4 w-20 h-20 rounded-full flex justify-center items-center overflow-hidden ${
            chef?.profile?.image ? "border-white" : "primary_border_color"
          }`}
        >
          {chef?.profile?.image ? (
            <img
              src={chef?.profile?.image}
              alt="chef"
              className="w-18 h-18 rounded-full"
            />
          ) : (
            <GiCook size={52} color="#e85666" />
          )}
        </div>
      </div>
      <div className="-mt-16 py-4 px-6 ">
        <h2 className="text-black font_regular text-xl">
          {chef?.business?.businessName}
        </h2>
        <h6 className="text-sm font_bold">
          by {chef?.profile?.firstName} {chef?.profile?.lastName}
        </h6>
        <p className="input_text text-sm truncate mt-1">
          {chef?.business?.businessSpecialisation}
        </p>
        {/* <div className="mt-2 flex flex-row items-center">
              <div className="flex flex-row">
                <SolidStar />
                <SolidStar />
                <SolidStar />
                <OutlineStar />
                <OutlineStar />
              </div>
              <h3 className="ml-2 input_text text-sm font_regular">
                {4.5} ({100} Ratings)
              </h3>
            </div> */}
      </div>
    </div>
  );
};

export default ChefFavCard;
