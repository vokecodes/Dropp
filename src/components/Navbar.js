import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Images } from "../config/images";
import { AUTH_DATA } from "../reducers/type";

const Navbar = ({ user, setShowModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || "");

  const handleLogout = () => {
    dispatch({
      type: AUTH_DATA,
      payload: null,
    });
    sessionStorage.removeItem("auth");
    navigate("/");
  };

  const handleChangeAddress = (value) => {
    setAddress(value);

    const result = sessionStorage.getItem("auth");
    const { token, data } = JSON.parse(result);

    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/user/${data?.user?._id}/address`,
        { address: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {})
      .catch((error) => {});
  };

  return (
    <div className="w-4/5 lg:w-4/6 mx-auto">
      <nav className="flex lg:items-center justify-between py-10">
        <div className="lg:flex items-center">
          <Link to={user ? "/dashboard" : "/"}>
            <span className="sr-only">Dropp</span>
            <img
              className="w-40 mx-auto lg:w-48 lg:mx-0"
              src={Images.logo}
              alt="dropp_logo"
            />
          </Link>
          {user && (
            <div className="hidden lg:block ml-5">
              <div className="absolute mt-4 ml-5">
                <img src={Images.carbon_location} alt="location" className="" />
              </div>
              <input
                className="px-12 py-4 w_483 address_input rounded-2xl outline-none focus:outline-none"
                value={address}
                onChange={(e) => handleChangeAddress(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="lg:flex">
          {user ? (
            <button
              className="w-24 h-8 font_bold border border-transparent rounded-xl shadow-sm text-sm text_orange bg_light_orange"
              onClick={handleLogout}
            >
              Log out
            </button>
          ) : (
            <>
              <button
                className="hidden lg:block w-52 font_bold py-3 border_black text_black2 border-transparent text-sm rounded-xl shadow-sm"
                onClick={() =>
                  window.open("https://forms.gle/1UYShXQKgjpZheS67")
                }
              >
                Become a Dropper
              </button>
              <button
                className="w-32 lg:w-40 ml-5 font_bold py-3 border border-transparent text-sm rounded-xl shadow-sm text-white bg_primary"
                onClick={() => setShowModal(true)}
              >
                Sign up / Login
              </button>
            </>
          )}
        </div>
      </nav>
      {user && (
        <div className="lg:hidden">
          <div className="absolute mt-4 ml-5">
            <img src={Images.carbon_location} alt="location" className="" />
          </div>
          <input
            className="px-12 py-4 w-full address_input rounded-2xl outline-none focus:outline-none"
            value={address}
            onChange={(e) => handleChangeAddress(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
