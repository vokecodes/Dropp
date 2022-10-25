import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ShoppingList from "../components/ShoppingList";
import UserDetails from "../components/UserDetails";
import Profile from "../components/Profile";
import ChangePassword from "../components/ChangePassword";
import Options from "../components/Options";
import { Images } from "../config/images";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const getUser = useCallback(() => {
    const result = sessionStorage.getItem("auth");

    if (result) {
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
        .catch((error) => {});
    } else {
      navigate("/");
    }
  }, [navigate]);

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

          <div className="w-11/12 lg:w-4/6 mx-auto pt-5 pb-20 lg:flex lg:justify-between">
            <div className="lg:w-1/2 lg:mr-5">
              {showShoppingList ? (
                <ShoppingList setShowShoppingList={setShowShoppingList} />
              ) : (
                <Options
                  user={user}
                  setShowShoppingList={setShowShoppingList}
                />
              )}
            </div>
            <UserDetails
              user={user}
              setShowProfileModal={setShowProfileModal}
              setShowPasswordModal={setShowPasswordModal}
              getUser={getUser}
            />
          </div>
          <Profile
            user={user}
            showProfileModal={showProfileModal}
            setShowProfileModal={setShowProfileModal}
          />
          <ChangePassword
            user={user}
            showPasswordModal={showPasswordModal}
            setShowPasswordModal={setShowPasswordModal}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
