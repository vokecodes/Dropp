import { useState, useCallback } from "react";
import axios from "axios";
import { Images } from "../config/images";
import LoadingSpinner from "./LoadingSpinner";

const UserDetails = ({
  user,
  getUser,
  setShowProfileModal,
  setShowPasswordModal,
}) => {
  const referralBonusCheck = user?.referralCode;
  const [loading, setLoading] = useState(false);

  const getReferralCode = () => {
    setLoading(true);
    const result = sessionStorage.getItem("auth");
    const { token, data } = JSON.parse(result);

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user/shopper/${data?.user?._id}/referralCode`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        alert("Referral code generated.");
        getUser();
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  };

  return (
    <div className="lg:w-1/2">
      <div className="mt-10 mb-7 w-full register_bg rounded-3xl p-6">
        <div className="flex">
          <div className="flex-1">
            {/* <h1 className="text-2xl font_bold shrink">Hi, {user?.firstName}</h1> */}
          </div>
          <button
            className="bg_yellow h-8 w-24 rounded-full text-xs font_bold"
            onClick={() => setShowProfileModal(true)}
          >
            Edit
          </button>
        </div>
        <div className="my-5">
          <div className="flex dashboard_hr py-3">
            <div className="w-1/4">
              <p className="text-sm label_color font_bold">Phone</p>
            </div>
            <div className="w-3/4 ml-2  flex items-center">
              <img
                src={Images.settings_phone}
                alt="settings phone"
                className="mr-2"
              />
              <p className="text-sm text-black font_bold">
                {user?.phoneNumber}
              </p>
            </div>
          </div>
          <div className="flex dashboard_hr py-3">
            <div className="w-1/4">
              <p className="text-sm label_color font_bold">Email</p>
            </div>
            <div className="w-3/4 ml-2 flex items-center">
              <img src={Images.mail} alt="settings phone" className="mr-2" />
              <p className="text-sm text-black font_bold shrink">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="flex dashboard_hr py-3">
            <div className="w-1/4">
              <p className="text-sm label_color font_bold">My shopping week</p>
            </div>
            <div className="w-3/4 ml-2 flex items-center">
              <img
                src={Images.shopping_cart}
                alt="settings phone"
                className="mr-2"
              />
              <div className="w-full flex flex-wrap">
                {user?.shoppingWeek?.map((week, i) => (
                  <button
                    key={i}
                    className="bg_week h-5 w-16 rounded-full text-xs font_medium mr-2 mb-1"
                  >
                    {week}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex dashboard_hr py-3">
            <div className="w-1/4">
              <p className="text-sm label_color font_bold">My referral code</p>
            </div>
            <div className="w-3/4 ml-2 flex items-center">
              {referralBonusCheck && (
                <img
                  src={Images.shareRound}
                  alt="share round"
                  className="mr-2"
                />
              )}
              {referralBonusCheck ? (
                <p className="text-sm text-black font_bold shrink">
                  {user?.referralCode}
                </p>
              ) : (
                <button
                  className="bg_yellow h-8 w-36 rounded-full text-xs font_bold"
                  onClick={() => getReferralCode()}
                >
                  {loading ? (
                    <div className="flex justify-center mt-1">
                      <LoadingSpinner color="#fec62e" />
                    </div>
                  ) : (
                    "Get your referral code"
                  )}
                </button>
              )}
              {referralBonusCheck && (
                <img src={Images.copy} alt="copy" className="ml-2" />
              )}
            </div>
          </div>
          <div className="flex dashboard_hr py-3">
            <div className="w-1/4">
              <p className="text-sm label_color font_bold">Account password</p>
            </div>
            <div className="w-3/4 ml-2 lg:flex items-center">
              <div className="flex-1 flex items-center">
                <img src={Images.lock} alt="settings phone" className="mr-2" />
                <p className="text-base text-black font_bold mt-2">
                  **********
                </p>
              </div>
              <div
                className="flex cursor-pointer"
                onClick={() => setShowPasswordModal(true)}
              >
                <p className="text-sm font_normal light_gray">
                  Change password
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#918d77"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex lg:flex-row mb-5">
        <div className="mb-3 lg:mb-0  h-44 lg:mr-3">
          <div className="absolute p-6">
            <p className="text-base text_red font_bold">
              My referral <br />
              credit balance:
            </p>
            <p className="text-2xl font_bold">N{user?.referralBonus}</p>
          </div>
          <img
            src={Images.referralBalanceBanner}
            alt="referralBanner"
            className="h-44"
          />
        </div>
        <div className="h-44">
          <div className="absolute p-6">
            <p className="text-xl text-white font_bold">
              Enjoy free delivery <br /> on your first Dropp!
            </p>
          </div>
          <img src={Images.enjoyBanner} alt="enjoy_banner" className="h-44" />
        </div>
      </div>
      <div>
        <div className="absolute p-4 lg:p-6">
          <p className="text-2xl lg:text-3xl text-black font_medium">
            Invite friends & earn.
          </p>
          <p className="text-xs lg:text-sm font_bold lg:my-2">
            Invite your friends & we’ll credit you both <br /> N200 when they
            register with your referral code.
          </p>
          <button className="bg-black h-6 lg:h-8 w-28 lg:w-40 rounded-full text-xs text-white font_bold">
            Invite a friend
          </button>
        </div>
        <img src={Images.referralBanner} alt="referralBanner" />
      </div>
    </div>
  );
};

export default UserDetails;
