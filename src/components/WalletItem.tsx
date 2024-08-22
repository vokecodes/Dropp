import React from "react";
import { WalletItemProps } from "../utils/Interfaces";
import { CiUser } from "react-icons/ci";

const WalletItem = ({
  transactionType,
  amount,
  time,
  date,
  status,
  companyWallet,
  recipient,
  self,
  selectedView,
  source,
}: any) => {
  return (
    <>
      {companyWallet ? (
        <>
          <div
            className={`my-7 w-full ${
              selectedView === "Successful" && status !== "Completed"
                ? "hidden"
                : selectedView === "Pending" && status !== "Pending"
                ? "hidden"
                : selectedView === "Failed" && status !== "Failed"
                ? "hidden"
                : ""
            }`}
          >
            <div className="grid grid-cols-5 items-center justify-items-start md:justify-between px-2 pb-4 gap-x-5 w-full">
              <div className="w-full">
                <p className="text-sm lg:text-xl font-bold font_regular text-black">
                  {transactionType}
                </p>
                <p className="text-xs lg:text-sm font_regular sec_gray_color w-full">
                  {date} - {time}
                </p>
              </div>

              <div className="w-full">
                <h3
                  className={`text-sm lg:text-xl font_bold text-black ${
                    transactionType === "Withdrawal"
                      ? "debit_color"
                      : transactionType === "Debit"
                      ? "debit_color"
                      : "credit_color"
                  }`}
                >
                  {(transactionType === "Withdrawal" ||
                    transactionType === "Debit") &&
                    "-"}
                  ₦{amount}
                </h3>
              </div>

              <div className="w-full col-span-2">
                <div className="flex flex-row justify-start items-start gap-x-2">
                  <div className="w-fit h-fit m-0 p-0 rounded-full">
                    {recipient?.image ? (
                      <img
                        src={`${recipient?.image}`}
                        alt="recipient"
                        className="rounded-full w-14 h-14 p-2"
                      />
                    ) : !recipient && self?.image ? (
                      <img
                        src={`${self?.image}`}
                        alt="recipient"
                        className="rounded-full w-14 h-14 p-2"
                      />
                    ) : (
                      <CiUser className="w-14 h-14 p-2" color="#e85666" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm lg:text-base font-bold font_regular text-black">
                      {recipient
                        ? `${recipient?.firstName} ${recipient?.lastName} `
                        : `Self`}
                    </p>
                    <p className="text-xs lg:text-sm font_regular sec_gray_color w-full">
                      {recipient ? recipient?.email : self.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <p className="text-sm lg:text-xl font_regular sec_gray_color">
                  {status}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="my-7">
            <div className="flex justify-between items-center px-2 pb-4">
              <div className="lg:w-1/3">
                <p className="text-sm lg:text-xl font-bold font_regular text-black">
                  {transactionType}
                </p>
              </div>

              <div className="lg:w-1/3">
                <h3
                  className={`text-sm lg:text-xl font_bold text-black ${
                    transactionType === "Withdrawal"
                      ? "debit_color"
                      : transactionType === "Debit"
                      ? "debit_color"
                      : "credit_color"
                  }`}
                >
                  {(transactionType === "Withdrawal" ||
                    transactionType === "Debit") &&
                    "-"}
                  ₦{amount}
                </h3>
              </div>

              <div className="lg:w-1/3">
                <p className="text-sm lg:text-base font_bold font_regular text-black">
                  {date}
                </p>
                <p className="text-xs lg:text-sm font_regular sec_gray_color">
                  {time}
                </p>
              </div>

              <div className="lg:w-1/3">
                <p className="text-sm lg:text-xl font_regular sec_gray_color">
                  {source ? source : "N/A"}
                </p>
              </div>

              <div className="lg:w-1/3">
                <p className="text-sm lg:text-xl font_regular sec_gray_color">
                  {status}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WalletItem;
