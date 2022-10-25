import { useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
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
  const [textCopied, setTextCopied] = useState(false);
  const [showShareButtons, setShowShareButtons] = useState(false);

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

  const handleInvite = () => setShowShareButtons(!showShareButtons);

  const renderShareButtons = () => (
    <div className="mt-2 flex flex-row">
      <FacebookShareButton
        url="https://www.getdropp.com/"
        quote={`Use my referral code ${user?.referralCode} and get N200.`}
        className="mr-2"
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        url="https://www.getdropp.com/"
        className="mr-2"
      >
        <FacebookMessengerIcon size={32} round={true} />
      </FacebookMessengerShareButton>
      <WhatsappShareButton
        url="https://www.getdropp.com/"
        className="mr-2"
        title={`Use my referral code ${user?.referralCode} and get N200.`}
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton
        url="https://www.getdropp.com/"
        title={`Use my referral code ${user?.referralCode} and get N200.`}
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    </div>
  );

  const renderMobileShareButtons = () => (
    <div className="mt-2 flex flex-row">
      <FacebookShareButton
        url="https://www.getdropp.com/"
        quote={`Use my referral code ${user?.referralCode} and get N200.`}
        className="mr-2"
      >
        <FacebookIcon size={24} round={true} />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        url="https://www.getdropp.com/"
        className="mr-2"
      >
        <FacebookMessengerIcon size={24} round={true} />
      </FacebookMessengerShareButton>
      <WhatsappShareButton
        url="https://www.getdropp.com/"
        title={`Use my referral code ${user?.referralCode} and get N200.`}
        className="mr-2"
      >
        <WhatsappIcon size={24} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton
        url="https://www.getdropp.com/"
        title={`Use my referral code ${user?.referralCode} and get N200.`}
      >
        <TwitterIcon size={24} round={true} />
      </TwitterShareButton>
    </div>
  );

  const renderNoReferralCodeText = () => (
    <p className="text-xs lg:text-sm font_bold whitespace-pre-line lg:whitespace-normal mt-1">
      {`Get your referral code to invite \nyour friends above.`}
    </p>
  );

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
                <>
                  <CopyToClipboard
                    text={user?.referralCode}
                    onCopy={() => {
                      setTextCopied(true);
                      setTimeout(() => {
                        setTextCopied(false);
                      }, 1000);
                    }}
                  >
                    <img
                      src={Images.copy}
                      alt="copy"
                      className="ml-2 cursor-pointer"
                    />
                  </CopyToClipboard>
                  {textCopied && (
                    <p className="ml-3 text-xs font-bold text_light_orange">
                      Copied!
                    </p>
                  )}
                </>
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
      <div className="lg:flex lg:flex-row mb-7">
        <div className="mb-7 lg:mb-0 lg:mr-3">
          <div className="hidden lg:block">
            <div className="absolute p-6">
              <p className="text-base text_red font_bold">
                My referral <br />
                credit balance:
              </p>
              <a
                href="https://opposite-pet-88e.notion.site/Dropp-Referral-Cedit-How-it-works-122ef8aab7e440598468567a51a1b14a"
                target="_blank"
                rel="noreferrer"
                className="text-xs text_red font_medium underline cursor-pointer"
              >
                Learn more here
              </a>
              <p className="mt-3 text-2xl font_medium">
                N{user?.referralBonus}
              </p>
            </div>
            <img
              src={Images.referralBalanceBanner}
              alt="referralBanner"
              className=""
            />
          </div>
          <div className="lg:hidden">
            <div className="absolute p-6">
              <div className="flex flex-row">
                <p className="flex-1 text-sm text_red font_bold">
                  My referral credit balance:
                </p>
                <div className="ml-12 flex flex-row items-center">
                  <a
                    href="https://opposite-pet-88e.notion.site/Dropp-Referral-Cedit-How-it-works-122ef8aab7e440598468567a51a1b14a"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text_red font_medium cursor-pointer"
                  >
                    Learn more here
                  </a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="3"
                    stroke="#750000"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font_medium mt-2">
                N{user?.referralBonus}
              </p>
            </div>
            <img
              src={Images.mReferralBalanceBanner}
              alt="referralBanner"
              className=""
            />
          </div>
        </div>
        <div className="">
          <div className="absolute p-6">
            <p className="text-xl text-white font_bold">
              Enjoy free delivery <br /> on your first Dropp!
            </p>
          </div>
          <img src={Images.enjoyBanner} alt="enjoy_banner" className="" />
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="absolute p-4 lg:p-6">
          <p className="text-3xl text-black font_medium">
            Invite friends & earn.
          </p>
          <p className="text-xs lg:text-sm lg:my-2 font_medium">
            Invite your friends & we’ll credit you both <br />{" "}
            <span className="font_bold">N200</span> when they register with your
            referral code.
          </p>
          <button
            className="bg-black h-6 lg:h-8 w-28 lg:w-40 rounded-full text-xs text-white font_bold cursor-pointer"
            onClick={() => handleInvite()}
          >
            Invite a friend
          </button>
          {showShareButtons && (
            <>
              {user?.referralCode
                ? renderShareButtons()
                : renderNoReferralCodeText()}
            </>
          )}
        </div>
        <img src={Images.referralBanner} alt="referralBanner" />
      </div>
      <div className="lg:hidden">
        <div className="absolute px-4 py-2 lg:p-6">
          <p className="text-lg text-black font_medium">
            Invite friends & earn.
          </p>
          <p className="text-xs font_meidum">
            Invite your friends & we’ll credit you <br /> both{" "}
            <span className="font_bold">N200</span> when they register with{" "}
            <br /> your referral code.
          </p>
          <button
            className="mt-2 bg-black h-6 w-28 rounded-full text-xs text-white font_bold cursor-pointer"
            onClick={() => handleInvite()}
          >
            Invite a friend
          </button>
          {showShareButtons && (
            <>
              {user?.referralCode
                ? renderMobileShareButtons()
                : renderNoReferralCodeText()}
            </>
          )}
        </div>
        <img src={Images.mReferralBanner} alt="referralBanner" />
      </div>
    </div>
  );
};

export default UserDetails;
