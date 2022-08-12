import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Images } from "../config/images";
import { AUTH_DATA } from "../reducers/type";

const Navbar = ({ user, setShowModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: AUTH_DATA,
      payload: null,
    });
    sessionStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <nav className="w-4/5 lg:w-4/6 mx-auto flex lg:items-center justify-between py-10">
      <Link to={user ? "/dashboard" : "/"}>
        <span className="sr-only">Dropp</span>
        <img
          className="w-40 mx-auto lg:w-48 lg:mx-0"
          src={Images.logo}
          alt="dropp_logo"
        />
      </Link>
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
              onClick={() => window.open("https://forms.gle/1UYShXQKgjpZheS67")}
            >
              Become a Dropper
            </button>
            <button
              className="w-24 lg:w-40 ml-5 font_bold py-3 border border-transparent text-sm rounded-xl shadow-sm text-white bg_primary"
              onClick={() => setShowModal(true)}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
