import React, { useState, useEffect, useCallback } from "react";
import ReactGA from "react-ga4";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Images } from "../config/images";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    const result = sessionStorage.getItem("auth");

    const { token, data } = JSON.parse(result);

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/${data?.user?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data?.success) setUser(data?.user);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    if (!user) getUser();
  }, [getUser, user]);

  return (
    <>
      {!user ? (
        <div className="splash-screen">
          <img src={Images.logo} alt="logo" />
        </div>
      ) : (
        <>
          <Navbar user={user} />

          <div className="w-4/5 lg:w-4/6 mx-auto pt-5 lg:flex flex-row">
            <div>
              <img src={Images.dashboard_banner} alt="dashboard_banner" />
              <div className="my-10 register_bg rounded-3xl p-6">
                <div className="flex">
                  <div className="flex-1">
                    <h1 className="text-2xl font_bold">
                      Hi, {user?.firstName}{" "}
                    </h1>
                  </div>
                  {/* <div className="">
          <button className="bg_yellow h-8 w-24 rounded-full text-xs font_bold">
            Edit
          </button>
        </div> */}
                </div>
                <div className="my-5">
                  <div className="flex dashboard_hr py-3">
                    <div className="w-2/5">
                      <p className="text-sm label_color font_bold">Phone</p>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={Images.settings_phone}
                        alt="settings phone"
                        className="mr-2"
                      />
                      <p className="text-base text-black font_bold">
                        {user?.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex dashboard_hr py-3">
                    <div className="w-2/5">
                      <p className="text-sm label_color font_bold">Email</p>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={Images.mail}
                        alt="settings phone"
                        className="mr-2"
                      />
                      <p className="text-base text-black font_bold">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex dashboard_hr py-3">
                    <div className="w-2/5">
                      <p className="text-sm label_color font_bold">
                        My shopping week
                      </p>
                    </div>
                    <div className="w-3/5 flex items-center">
                      <img
                        src={Images.shopping_cart}
                        alt="settings phone"
                        className="mr-2"
                      />
                      <div className="w-full flex flex-wrap">
                        {user?.shoppingWeek?.map((week) => (
                          <button className="bg_week h-5 w-16 rounded-full text-xs font_medium mr-2">
                            {week}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex dashboard_hr py-3">
                    <div className="w-2/5">
                      <p className="text-sm label_color font_bold">
                        Account password
                      </p>
                    </div>
                    <div className="w-3/5 flex items-center">
                      <div className="flex-1 flex items-center">
                        <img
                          src={Images.lock}
                          alt="settings phone"
                          className="mr-2"
                        />
                        <p className="text-base text-black font_bold mt-2">
                          **********
                        </p>
                      </div>
                      {/* <div className="flex">
              <p className="text-xs font_normal light_gray">
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
            </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <img src={Images.invite} alt="invite_banner" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
