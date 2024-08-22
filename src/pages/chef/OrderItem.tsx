import React, { useState } from "react";
import {
  IoIosArrowDropdown,
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

const OrderItem = ({ order, extraClasses, buttonText, hideButton }: any) => {
  const [toggler, setToggler] = useState(false);

  return (
    <div className="flex flex-col items-center justify-around bg-white w-full rounded-xl p-4 transition-all ease-in-out duration-300">
      <div
        className={`flex flex-row items-center justify-between w-full py-2  ${
          true &&
          "cursor-pointer hover:bg-gray-100 rounded-t-xl px-3 transition-all ease-in-out duration-300"
        }`}
        style={{ borderBottom: "1px solid #FFDCE0" }}
        onClick={() => setToggler(!toggler)}
      >
        <p className="font_medium">
          {order?.order?.length} item{order?.order?.length > 1 && "s"}
        </p>
        <span className="transition-all ease-in-out duration-300">
          {toggler ? (
            <IoIosArrowDropupCircle size={22} color="#06c167" />
          ) : (
            <IoIosArrowDropdown size={22} color={"#000000"} />
          )}
        </span>
      </div>

      {!hideButton && (
        <div className="w-full h-fit">
          <button
            className={`font_bold w-full rounded-lg py-3 text-sm ${extraClasses}`}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>

    // <div>
    //   {order?.cartMenu?.map((item: any, index: number) => (
    //     <div
    //       key={index}
    //       className="flex flex-col items-center justify-around bg-white w-full rounded-xl p-4 transition-all ease-in-out duration-300"
    //     >

    //       <div className="w-full flex flex-row items-center justify-between gap-x-2">
    //         <div className="flex flex-row items-center justify-between gap-x-2">
    //           <div className="h-fit w-fit rounded-full">
    //             <img src="/img/food.png" className="w-9 h-auto" alt="food" />
    //           </div>
    //           <div className="font_bold text-sm space-y-2">
    //             <p>{item?.foodName}</p>
    //             <p>
    //               {item?.portion} portion{Number(item?.portion) > 1 && "s"}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default OrderItem;
