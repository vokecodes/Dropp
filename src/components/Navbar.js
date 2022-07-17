import React from "react";
import { Link } from "react-router-dom";
import { Images } from "../config/images";

const Navbar = ({ setShowModal }) => {
  return (
    <nav className="w-4/5 lg:w-4/6 mx-auto flex justify-between py-10">
      <Link to="/">
        <span className="sr-only">Dropp</span>
        <img className="w-48" src={Images.logo} alt="dropp_logo" />
      </Link>
      <div className="lg:flex">
        <button
          className="hidden lg:block w-52 font_bold py-3 border_black text_black2 border-transparent text-sm rounded-xl shadow-sm"
          // onClick={() => setShowModal(true)}
        >
          Become a Dropper
        </button>
        <button className="w-24 lg:w-40 ml-5 font_bold py-3 border border-transparent text-sm rounded-xl shadow-sm text-white bg_primary">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
