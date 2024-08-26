import { FiChevronRight } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import { RxCaretDown } from "react-icons/rx";
import Button from "./Button";
import { DashboardBannerCardProps } from "../utils/Interfaces";
import { formatRemoteAmountKobo } from "../utils/formatMethods";

const BannerCard = ({
  backgroundImage,
  backgroundColor,
  textContainerClasses,
  text1,
  text2,
  text3,
  bgExtraClasses,
  text1ExtraClasses,
  text2ExtraClasses,
  text3ExtraClasses,
  iconSize,
  iconColor,
  iconExtraClasses,
  noShowRightIcon,
  onClickText3,
  onClickText4,
  text3Link,
  showWalletIcons,
  showWalletFormat,
  showDownload,
  chefWallet,
  restaurantWallet,
}: DashboardBannerCardProps) => {
  return (
    <div
      className={`rounded-2xl ${bgExtraClasses}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div
        className={`${textContainerClasses}`}
        style={{
          backgroundColor: `${backgroundColor}`,
        }}
      >
        {showWalletIcons && (
          <div className="mb-5 flex flex-col md:flex-row justify-between align-center">
            <div className="hidden md:block lg:mb-0 mb-2">
              <FaWallet className="w-12 h-12 p-2 primary_txt_color" />
            </div>
            <div>
              <div className="flex flex-col md:flex-row justify-between align-center gap-4">
                <button
                  className="primary_bg_color px-4 py-2 text-white rounded-lg"
                  onClick={onClickText3}
                >
                  Fund Wallet
                </button>
                <button
                  className="px-4 py-2 text-white rounded-lg"
                  style={{ backgroundColor: "#000" }}
                  onClick={onClickText4}
                >
                  Fund Employee
                </button>
              </div>
            </div>
          </div>
        )}

        {showWalletFormat && (
          <div className="mb-5 flex flex-col md:flex-row justify-start align-center gap-x-20">
            <div className="hidden md:block">
              <FaWallet className="w-12 h-12 p-2 primary_txt_color" />
            </div>
            <div>
              <div className="flex flex-col md:flex-row justify-between align-center gap-4">
                <button
                  className="primary_bg_color px-4 py-2 text-white rounded-lg"
                  onClick={onClickText3}
                >
                  Fund Wallet
                </button>
                {showDownload && (
                  <>
                    <button
                      type="button"
                      className="text-black hover:text-black border border-black hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-black dark:text-black dark:hover:text-black dark:hover:bg-gray-200 dark:focus:ring-gray-200 flex flex-row items-center justify-between"
                      style={{ borderColor: "#06c167" }}
                      onClick={onClickText4}
                    >
                      Export History
                      <span className="ml-2 rounded-full h-fit w-fit p-0 bg-gray-200">
                        <RxCaretDown className="w-5 h-5 text-black" />
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <p className={`${text1ExtraClasses}`}>{text1}</p>
        <p className={`${text2ExtraClasses}`}>{text2}</p>
        {text3Link ? (
          <a
            href={text3Link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            <p className={`${text3ExtraClasses}`}>{text3} </p>
            {!noShowRightIcon && (
              <FiChevronRight
                size={iconSize}
                color={iconColor}
                className={`${iconExtraClasses}`}
              />
            )}
          </a>
        ) : (
          <div className="flex items-center" onClick={onClickText3}>
            <p className={`${text3ExtraClasses}`}>{text3} </p>
            {!noShowRightIcon && (
              <FiChevronRight
                size={iconSize}
                color={iconColor}
                className={`${iconExtraClasses}`}
              />
            )}
          </div>
        )}

        {restaurantWallet && (
          <div className="my-3 flex">
            <div className="flex items-center">
              <div className="border-2 primary_border_color h-10" />
              <div className="ml-2">
                <p className="text-lg text-white font_regular">
                  Online orders:
                </p>
                <p className="text-lg text-white font_regular">
                  {formatRemoteAmountKobo(chefWallet).naira}
                  {formatRemoteAmountKobo(chefWallet).kobo}
                </p>
              </div>
            </div>
            <div className="ml-12 flex items-center">
              <div className="border-2 primary_border_color h-10" />
              <div className="ml-2">
                <p className="text-lg text-white font_regular">
                  Dine-in orders:
                </p>
                <p className="text-lg text-white font_regular">
                  {formatRemoteAmountKobo(restaurantWallet).naira}
                  {formatRemoteAmountKobo(restaurantWallet).kobo}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerCard;
