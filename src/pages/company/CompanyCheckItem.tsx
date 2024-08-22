import { useEffect, useRef, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { CompanyCheckItemProps } from "../../utils/Interfaces";

const defaultStyles = ["primary_bg_color", "to bottom, #06c167, #fff"];
const completedStyles = ["bg-green-500", "#fff, #BDBDBD, #fff"];
const inCompleteStyles = ["bg-gray-950", "#fff, #BDBDBD, #fff"];

const CompanyCheckItem = ({
  num,
  title,
  checked,
  to,
  action,
  type,
  firstCheck,
  setFirstCheck,
}: CompanyCheckItemProps) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState("hidden");
  const [styles, setStyles] = useState(defaultStyles);
  // const first = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (checked && num == firstCheck) {
      setFirstCheck(num + 1);
    }

    if (checked) {
      setStyles(completedStyles);
    } else if (num == firstCheck) {
      setStyles(defaultStyles);
      setShow("block");
    } else if (!checked) {
      setStyles(inCompleteStyles);
    }
  });

  return (
    <>
      {
        <Link
          to={checked ? "#" : to ? to : "#"}
          className="w-full p-0 m-0 h-fit"
        >
          <div className="flex flex-row items-stretch justify-around gap-x-1 pl-2 py-2 w-full">
            <div className="w-1/6 flex flex-col gap-y-0.5">
              <div
                className={`p-3 mb-1 rounded-full w-1 h-1 ${styles[0]} flex justify-around items-center mx-auto`}
              >
                <p className="text-white text-xs m-0 p-0">
                  {checked ? <FaCheck /> : num}
                </p>
              </div>

              <div
                className={`mx-auto h-full w-1 rounded-lg`}
                style={{ backgroundImage: `linear-gradient(${styles[1]})` }}
              >
                &nbsp;
              </div>
            </div>
            <div className="w-5/6 grow flex flex-col gap-y-1.5">
              <div>
                <p className="font-semibold text-base mb-3">{title}</p>
              </div>

              <div className={`h-fit ${show} cursor-pointer`}>
                <button
                  className={`rounded-full primary_bg_color text-white py-1.5 px-3 text-xs mb-8`}
                >
                  <span>{action}</span>
                </button>
              </div>
            </div>
          </div>
        </Link>
      }
    </>
  );
};

export default CompanyCheckItem;
