import { Images } from "../config/images";

const UserDetails = ({ user, setShowProfileModal, setShowPasswordModal }) => {
  return (
    <div className="lg:w-1/2">
      <img src={Images.dashboard_banner} alt="dashboard_banner" />
      <div className="my-10 w-full register_bg rounded-3xl p-6">
        <div className="flex">
          <div className="flex-1">
            <h1 className="text-2xl font_bold shrink">Hi, {user?.firstName}</h1>
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
      <img src={Images.invite} alt="invite_banner" />
    </div>
  );
};

export default UserDetails;
