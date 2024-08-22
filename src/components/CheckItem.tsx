import { AiFillCheckCircle } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { CheckItemProps } from "../utils/Interfaces";
import { CHEF_URL } from "../_redux/urls";
import { updateProfileUserAccount } from "../_redux/user/userAction";

const CheckItem = ({ title, checked, to, external, type }: CheckItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      {external ? (
        <div
          className="border-b sec_gray_border_color cursor-pointer"
          onClick={() => {
            if (!checked) {
              if (to) {
                window.open(to);
                // if (type) {
                //   dispatch(
                //     updateProfileUserAccount(CHEF_URL, type)
                //   );
                // }
                return;
              }
              return;
            }
          }}
        >
          <div className="pl-6 pr-2 py-6 flex items-center">
            {checked ? (
              <AiFillCheckCircle size={18} color="#4E0B2B" />
            ) : (
              <div className="bg_check_inactive h-4 w-4 rounded-full" />
            )}
            <p className="flex-1 ml-3 text-sm ter_gray_color">{title}</p>
            <FiChevronRight color="#000" />
          </div>
        </div>
      ) : (
        <Link to={checked ? "#" : to ? to : "#"}>
          <div className="border-b sec_gray_border_color">
            <div className="pl-6 pr-2 py-6 flex items-center">
              {checked ? (
                <AiFillCheckCircle size={18} color="#4E0B2B" />
              ) : (
                <div className="bg_check_inactive h-4 w-4 rounded-full" />
              )}
              <p className="flex-1 ml-3 text-sm ter_gray_color">{title}</p>
              <FiChevronRight color="#000" />
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default CheckItem;
