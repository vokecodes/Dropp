import React from "react";
import Navbar from "./Navbar";

const Header = ({ itemsImage, setShowModal }) => {
  return (
    <section className="header_bg">
      <Navbar setShowModal={setShowModal} />
      <main className="w-4/5 lg:w-3/5 mx-auto pt-5 pb-20  lg:flex flex-row">
        <div className="flex-1 lg:mt-20 lg:mr-10">
          <h1 className="hidden lg:block lg:text-6xl text-4xl font_bold text_black1">
            Groceries delivered <br /> to your doorstep in <br /> 1 hour.
          </h1>
          <h1 className="lg:hidden lg:text-6xl text-4xl font_bold text_black1 text-center">
            Groceries <br /> delivered to <br /> your doorstep <br /> in hour.
          </h1>
          <p className="hidden lg:block my-7 font_regular text_black1 text-lg text-left">
            We deliver groceries including fresh fruits and vegetables directly
            to your home within 1hr and at supermarket prices.
          </p>
          <p className="lg:hidden my-7 font_regular text_black1 text-lg text-center">
            We deliver your groceries including fresh fruits and vegetables in
            organic quality directly to your home. Within 1 hour and at
            supermarket prices.
          </p>
          <div className="text-center lg:text-left">
            <button className="w-60 font_bold py-3 button border border-transparent text-lg rounded-xl shadow-sm text-center text-white bg_primary">
              Try Dropp now!
            </button>
          </div>
          <div className="my-8 py-3 lg:w-80 avail_br">
            <p className="text-lg font_bold text_secondary">
              ⭐ Available only in Marina and Lekki.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <img src={itemsImage} alt="items" />
        </div>
      </main>
    </section>
  );
};

export default Header;
