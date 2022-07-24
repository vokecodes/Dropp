import React from "react";
import Navbar from "./Navbar";

const Header = ({ itemsImage, setShowModal }) => {
  return (
    <section className="header_bg">
      <Navbar setShowModal={setShowModal} />
      <main className="w-4/5 lg:w-4/6 mx-auto pt-5 lg:flex flex-row">
        <div className="lg:flex-1 lg:mt-20">
          <h1 className="hidden lg:block lg:text-6xl text-4xl font_bold text_black1">
            Groceries delivered <br /> to your doorstep, <br /> same day.
          </h1>
          <h1 className="lg:hidden lg:text-6xl text-4xl font_bold text_black1 text-center">
            Groceries <br /> delivered to <br /> your doorstep, <br /> same day.
          </h1>
          <p className="hidden lg:block my-7 font_regular text_black1 text-lg text-left">
            A personal shopper to shop & deliver home essentials including{" "}
            <br /> fresh fruits & vegetables directly to your door at
            supermarket prices.
          </p>
          <p className="lg:hidden my-7 font_regular text_black1 text-lg text-center">
            A personal shopper to shop & deliver home essentials including fresh
            fruits & vegetables directly to your door at supermarket prices.
          </p>
          <div className="text-center lg:text-left">
            <button
              className="w-80 lg:w-60 font_bold py-5 button border border-transparent text-lg rounded-xl shadow-sm text-center text-white bg_primary"
              onClick={() =>
                window.open("https://wa.me/message/YKVHYMI6AXGUC1")
              }
            >
              Try Dropp now!
            </button>
          </div>
          <div className="my-8 py-3 lg:w-80 avail_br">
            <p className="text-lg font_bold text_secondary">
              ⭐ Available only in Marina & Lekki.
            </p>
          </div>
        </div>
        <div>
          <div className="lg:w-4/5 mx-auto">
            <img src={itemsImage} alt="items" className="pb-20 ml-20" />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Header;
