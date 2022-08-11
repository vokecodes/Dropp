import React, { useState, useEffect, useCallback } from "react";
import ReactGA from "react-ga4";
import axios from "axios";
import Navbar from "../components/Navbar";
import UserDetails from "../components/UserDetails";
import { Images } from "../config/images";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    const result = sessionStorage.getItem("auth");

    const { token, data } = JSON.parse(result);

    axios
      .get(
        `https://dropp-backend.herokuapp.com/api/v1/user/${data?.user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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

          <div className="w-4/5 lg:w-4/6 mx-auto pt-5 lg:flex lg:justify-between">
            <div className="lg:w-1/2 lg:mr-5 bg_shopping p-8 rounded-3xl shadow-sm mb-10 lg:mb-0">
              <div className="flex">
                <div className="flex-1">
                  <h2 className="text-2xl font_bold">My Shopping list</h2>
                </div>
                <button className="bg_yellow h-8 w-32 rounded-full text-xs font_normal font-bold">
                  My list
                </button>
              </div>

              <div className="my-5">
                <div className="bg-white px-6 py-4 rounded-2xl flex items-center">
                  <div className="flex-1">
                    <p className="text-base font_bold">List name</p>
                    <div className="flex">
                      <p className="text-sm font-medium font_normal text_item_light_gray">
                        Suger, Milk, Milo, Chocolate
                      </p>
                      <button className="bg_shopping h-6 w-16 rounded-full text-xs text_light_orange font_medium">
                        +23 items
                      </button>
                    </div>
                  </div>
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
            <UserDetails user={user} />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
