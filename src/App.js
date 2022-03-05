import logo from "./images/dropp_logo.svg";
import items from "./images/items.svg";
import spar from "./images/spar.svg";
import plus from "./images/plus.svg";
import check from "./images/check.svg";
import location from "./images/location.svg";
import DROPP from "./images/DROPP.DROPP.svg";
import "./App.css";

function App() {
  return (
    <>
      {/* Dropp Banner */}
      <section className="" style={{ backgroundColor: "#FFFFF5" }}>
        <div className="lg:w-4/5 mx-auto py-10">
          <a href="/">
            <span className="sr-only">Dropp</span>
            <img className="" src={logo} alt="dropp_logo" />
          </a>
        </div>
        <main className="lg:w-4/5 mx-auto pt-5 pb-20  lg:flex flex-row">
          <div className="flex-1 lg:mt-20 mr-10">
            <h1 className="text-6xl font_bold">
              Groceries <br /> delivered to your <br /> doorstep in 1 hour.
            </h1>
            <p className="my-7 font_regular text-lg">
              Dropp is a grocery delivery platform facilitating doorstep
              deliveries of <br /> groceries and other home essentials in
              Africa.
            </p>
            <button className="inline-flex items-center px-28 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg_primary">
              Schedule a Dropp
            </button>
            <div className="my-7">
              <div className="hr_line" />
              <p className="py-4 font_regular text-lg flex flex-row items-center">
                We shop from your fav Spar supermarket
                <img src={spar} alt="spar_logo" className="ml-3" />
              </p>
              <div className="hr_line" />
            </div>
          </div>
          <div className="">
            <img src={items} alt="items" />
          </div>
        </main>
      </section>

      {/* Dropp it in few clicks. */}
      <section className="lg:w-4/5 mx-auto pt-5 pb-20">
        <div className="flex-1 lg:mt-20">
          <h1
            className="text-5xl font_bold text-center mb-20"
            style={{ fontSize: 65 }}
          >
            Dropp it in few clicks.
          </h1>
        </div>
        <div className="my-10 lg:flex flex-row justify-between">
          <div
            className="p-16 step_card"
            style={{ backgroundColor: "#FFFFF5" }}
          >
            <div className="flex place-content-center">
              <img src={plus} alt="Vector" />
            </div>
            <div className="text-center">
              <p className="font_bold my-10 text-left text-xl">
                Choose what you want. Very simple.
              </p>
              <p className="font_regular text-left text-xl">
                Select items from your favorite grocery stores on our platform.
              </p>
            </div>
          </div>
          <div
            className="p-16 step_card"
            style={{ backgroundColor: "#F3FFF9" }}
          >
            <div className="flex place-content-center">
              <img src={check} alt="Vector" />
            </div>
            <div className="text-center">
              <p className="font_bold my-10 text-left text-xl">
                We do the shopping. No stress.
              </p>
              <p className="font_regular text-left text-xl">
                A personal shopper receives your order and starts collecting
                ordered items.
              </p>
            </div>
          </div>
          <div
            className="p-16 step_card"
            style={{ backgroundColor: "#FFF7F5" }}
          >
            <div className="flex place-content-center">
              <img src={location} alt="Vector" />
            </div>
            <div className="text-center">
              <p className="font_bold my-8 text-xl">
                You get your <br /> items in 1 hour.
              </p>
              <p className="font_regular text-left text-xl">
                Shopper then delivers groceries to your address.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-28 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg_primary">
            Start Dropp-ing now!
          </button>
        </div>
      </section>

      {/* See what people are saying! */}
      <section className="pt-5 pb-20" style={{ backgroundColor: "#FFFFF5" }}>
        <div className="flex-1 lg:mt-20">
          <h1
            className="text-5xl font_bold text-center mb-20"
            style={{ fontSize: 65 }}
          >
            See what people are saying!
          </h1>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="pt-5 pb-20"
        style={{ backgroundColor: "#FFE6B4" }}
      ></section>

      {/* Schedule a Dropp */}
      <section className="pt-40" style={{ backgroundColor: "#FFFFF5" }}>
        <div className="text-center my-24">
          <button className="inline-flex items-center px-28 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg_primary">
            Schedule a Dropp
          </button>
        </div>
        <img src={DROPP} alt="DROPP.DROPP" className="" />
        <div className="py-20 mx-32">
          <div className="hr_line" style={{ width: "100%" }} />
          <div className="flex mt-16">
            <div className="flex-1">
              <img className="" src={logo} alt="dropp_logo" />
            </div>
            <div className="flex justify-between" style={{ flexGrow: 0.2 }}>
              <p className="font_bold text-base">
                2021 Dropp technologies. <br /> All rights reserved.
              </p>
              <p className="font_regular text-base">
                <span className="font_bold">Wanna talk? </span>
                <br /> +2349061494881
              </p>
              <p className="font_regular text-base">
                <span className="font_bold">Follow Us</span>
                <br /> Instagram
                <br /> Facebook
                <br /> Twitter
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
