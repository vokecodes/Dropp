import React from "react";
import Navbar from "./Navbar";
import OutlineButton from "./OutlineButton";
import Button from "./Button";

const Header = ({ itemsImage, setShowModal }) => {
  return (
    <section className="header_bg">
      <Navbar setShowModal={setShowModal} />

      <main className="w-4/5 lg:w-4/6 mx-auto pt-5 lg:flex flex-row">
        <div className="lg:flex-1 lg:mt-20">
          <h1 className="lg:text-6xl text-4xl font_bold text_black1">
            Making growth easy for restaurants
          </h1>
          <p className="my-7 font_regular text_black1 text-lg text-left">
            Dropp empowers you with all the tools you need to work smarter,{" "}
            <br />
            earn more & automate for efficiency all in one place.
          </p>
          <div className="flex justify-center gap-4 mt-5">
            <OutlineButton title="Book a Demo" extraClasses="w-36 lg:w-full" />
            <Button title="Get started" extraClasses="w-36 lg:w-full" />
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

        <div className="lg:w-4/5 mt-10 lg:mt-0">
          {/* <img src={itemsImage} alt="items" className="pb-20 lg:ml-20" /> */}
          <img src="/images/dashbord_mock.svg" alt="dashbord_mock" />
        </div>
      </main>
    </section>
  );
};

export default Header;
