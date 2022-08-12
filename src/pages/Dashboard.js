import React, { useState, useEffect, useCallback } from "react";
import ReactGA from "react-ga4";
import axios from "axios";
import Navbar from "../components/Navbar";
import ShoppingList from "../components/ShoppingList";
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
            <ShoppingList />
            <UserDetails user={user} />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
