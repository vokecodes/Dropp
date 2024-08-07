import React from "react";
import Navbar from "./Navbar";
import OutlineButton from "./OutlineButton";
import Button from "./Button";

const Header = ({ itemsImage, setShowModal }) => {
  return (
    <section className="header_bg">
      <Navbar setShowModal={setShowModal} />
      <div className="mt-24 flex flex-col items-center">
        <div
          style={{
            backgroundImage: `url('/images/yellow-mark.svg')`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="-mt-8">
            <p className="text-6xl text_black text-center font_bold">
              Making growth
            </p>
            <p className="mt-5 text-6xl text_black text-center font_bold">
              easy for restaurants
            </p>
          </div>
        </div>

        <p className="text-xl text-[#4A443A] text-center my-5 font_medium">
          Dropp empowers you with all the tools you need to work smarter, <br />
          earn more & automate for efficiency all in one place.
        </p>
        <div className="flex justify-center gap-4 mt-5">
          <OutlineButton title="Book a Demo" />
          <Button title="Get started" />
        </div>
        <div className="mt-5">
          <img src="/images/dashbord_mock.svg" alt="dashbord_mock" />
        </div>
      </div>
      {/* <main className="w-4/5 lg:w-4/6 mx-auto pt-5 lg:flex flex-row">
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
              onClick={() => setShowModal(true)}
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
          <div className="lg:w-4/5 lg:mx-auto">
            <img src={itemsImage} alt="items" className="pb-20 lg:ml-20" />
          </div>
        </div>
      </main> */}
    </section>
  );
};

export default Header;
