import React from "react";
import Navbar from "./Navbar";
import OutlineButton from "./OutlineButton";
import Button from "./Button";
import { Link } from "react-router-dom";

const Header = ({ itemsImage, setShowModal, handleScrollTo }) => {
  return (
    <section className="header_bg lg:pb-20">
      <Navbar setShowModal={setShowModal} handleScrollTo={() => handleScrollTo()} />

      <main className="w-4/5 lg:w-5/6 mx-auto pt-5 lg:flex flex-row items-center">
        <div className="lg:w-3/5 lg:flex-1">
          <div className="hidden lg:block">
            <h1 className="lg:text-6xl text-4xl font_bold text_black">
              Making growth <br /> easy for restaurants
            </h1>
            <p className="my-7 font_regular text_black text-lg">
              Dropp empowers you with all the tools you need to work smarter,{" "}
              <br />
              earn more & automate for efficiency all in one place.
            </p>
          </div>
          <div className="lg:hidden mt-10">
            <h1 className="lg:text-6xl text-4xl font_bold text_black text-center">
              Making growth easy for restaurants
            </h1>
            <p className="my-7 font_regular text_black text-lg  text-center">
              Dropp empowers you with all the tools you need to work smarter,
              earn more & automate for efficiency all in one place.
            </p>
          </div>
          <div className="flex gap-4 mt-5">
            {/* <a href="#demoForm" className=""> */}
            <OutlineButton
              title="Book a Demo"
              extraClasses="w-32 lg:w-2/6"
              onClick={() => handleScrollTo("demoForm", 3000)}
            />
            {/* </a> */}
            <Link to={"/auth/register"} className="w-32 lg:w-2/6">
              <Button
                title="Get started"
                extraClasses="w-full h-full"
                // onClick={() => setShowModal(true)}
              />
            </Link>
          </div>
          {/* <div className="text-center lg:text-left">
            <button
              className="w-80 lg:w-60 font_bold py-5 button border border-transparent text-lg rounded-xl shadow-sm text-center text-white bg_primary"
              onClick={() => setShowModal(true)}
            >
              Try Dropp now!
            </button>
          </div> */}
        </div>

        <div className="lg:w-3/6">
          {/* <img src={itemsImage} alt="items" className="pb-20 lg:ml-20" /> */}
          <div className="mt-10 lg:mt-20">
            <img src="/images/dashboard_mock.png" alt="dashboard_mock" />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Header;
