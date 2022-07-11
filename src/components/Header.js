import React from "react";
import Navbar from "./Navbar";

const Header = ({ itemsImage, setShowModal }) => {
  return (
    <section className="header_bg">
      <Navbar setShowModal={setShowModal} />
      <main className="w-4/5 mx-auto pt-5 pb-20  lg:flex flex-row">
        <div className="flex-1 lg:mt-20 mr-10">
          <h1 className="lg:text-6xl text-4xl font_bold">
            Groceries delivered <br /> to your doorstep in <br /> 1 hour.
          </h1>
          <p className="lg:block hidden my-7 font_regular text-lg text-left">
            We deliver your groceries including fresh fruits and <br />
            vegetables in organic quality directly to your <br /> home. Within 1
            hour and at supermarket prices.
          </p>
          <p className="lg:hidden my-7 font_regular text-lg text-left">
            We deliver your groceries including fresh fruits and vegetables in
            organic quality directly to your home. Within 1 hour and at
            supermarket prices.
          </p>
          <a href="#stores">
            <button className="w-60 font_bold py-3 button border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
              Try Dropp now!
            </button>
          </a>
          <div className="my-8 py-3 w-44 avail_br">
            <p className="text-lg font_bold text_secondary">
              ⭐ Available in Lagos
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
