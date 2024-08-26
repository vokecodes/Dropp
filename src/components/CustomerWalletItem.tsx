import React from "react";
import { WalletItemProps } from "../utils/Interfaces";
import { CiUser } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CustomerWalletItem = ({
  transactionType,
  amount,
  time,
  date,
  status,
  source,
  showDetail,
  onClickIconOpen,
  onClickIconClose,
}: WalletItemProps) => {
  return (
    <div className="my-7">
      <div className="flex justify-between items-center px-2 pb-4">
        <div className="w-1/3">
          <p className="text-xs lg:text-xl font-bold font_regular text-black">
            {transactionType}
          </p>
          <p className="hidden lg:block text-xs lg:text-base font_regular sec_gray_color">
            {date} - {time}
          </p>
          <p className="lg:hidden text-xs lg:text-base font_regular sec_gray_color">
            {date}
          </p>
          <p className="lg:hidden text-xs lg:text-base font_regular sec_gray_color">
            {time}
          </p>
        </div>

        <div className="w-1/3">
          <h3
            className={`text-xs lg:text-xl font_bold text-black ${
              transactionType === "Debit" ? "debit_color" : "credit_color"
            }`}
          >
            {transactionType === "Debit" && "-"}₦{amount}
          </h3>
        </div>

        <div className="w-1/3">
          <p className="text-xs lg:text-xl font_regular sec_gray_color">
            {status}
          </p>
        </div>

        <div className="cursor-pointer">
          {showDetail ? (
            <FaChevronUp color="#000" onClick={onClickIconClose} />
          ) : (
            <FaChevronDown color="#000" onClick={onClickIconOpen} />
          )}
        </div>
      </div>
      {showDetail && (
        <div className="">
          {source && (
            <div className="flex">
              {source?.image ? (
                <img
                  src={source?.image}
                  alt="avatar"
                  className="w-12 h-12 rounded-full mt-2"
                />
              ) : (
                <CiUser size={28} color="#06c167" className="" />
              )}
              <div className="ml-3">
                <p className="text-xs lg:text-base font_bold text-black">
                  {source?.name}
                </p>
                <p className="text-xs lg:text-sm font_regular sec_gray_color">
                  {source?.email}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerWalletItem;
