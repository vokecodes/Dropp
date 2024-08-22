import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Images } from "../../config/images";

const Market = () => {
  const stores = [
    {
      name: "FoodCo Lekki",
      image: Images.foodco,
      location: "Lekki, Lagos",
      status: "• Delivery & pickup",
      link: "https://paystack.shop/droppfoodco",
    },
    {
      name: "Addide Supermarket",
      image: Images.addide,
      location: "Marina, Lagos",
      status: "• Delivery & pickup",
      link: "https://paystack.shop/droppaddide",
    },
    {
      name: "Next Cash & Carry",
      image: Images.next,
      location: "Abuja",
      status: "• Delivery & pickup",
      link: "https://paystack.shop/droppnext-cash--carry",
    },
    {
      name: "Spar Market",
      image: Images.spar,
      location: "Coming soon!",
      status: "",
      link: "#",
    },
    {
      name: "Jendol Superstores",
      image: Images.jendol,
      location: "Coming soon!",
      status: "",
      link: "#",
    },
    {
      name: "Justrite Superstore",
      // image: Images?.justrite,
      location: "Coming soon!",
      status: "",
      link: "#",
    },
  ];

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Dropp Banner */}
      <Navbar setShowModal={setShowModal} />

      {/* Choose your store in Lagos or Abuja. */}
      <section className="w-4/5 mx-auto pt-5 pb-20" id="stores">
        <div className="flex-1 lg:mt-20">
          <h1 className="lg:text-6xl text-4xl font_bold text-center mb-20">
            Choose your store in Lagos or Abuja.
          </h1>
        </div>
        <div className="lg:mt-10 lg:mb-2 lg:flex lg:flex-row lg:flex-wrap lg:justify-between">
          {stores.map((store, i) => (
            <div
              key={i}
              className="flex flex-row items-center bg-white border rounded-xl shadow-2xl px-4 py-3 lg:w-1/3 lg:mr-5 mt-5 cursor-pointer"
              onClick={() => window.open(store.link)}
            >
              <img src={store.image} alt={store.name} className="mr-5" />
              <div>
                <p className="font_bold text-xl">{store.name}</p>
                <p
                  className={`font_bold text-md ${
                    store.location.startsWith("Coming")
                      ? "text_red "
                      : "text_primary"
                  }`}
                >
                  {store.location}{" "}
                  <span className="text-black">{store.status}</span>
                </p>
              </div>
            </div>
          ))}
          {/* <div
            className="flex flex-row items-center bg-white border rounded-xl shadow-2xl px-4 py-3 lg:w-1/3 lg:mr-5 mt-5 cursor-pointer"
            onClick={() => window.open("")}
          >
            <img src={Images.addide} alt="Addide" className="mr-5" />
            <div>
              <p className="font_bold text-xl"></p>
              <p className="font_bold text_primary text-md">
                {" "}
                <span className="text-black"></span>
              </p>
            </div>
          </div>
          <div
            className="flex flex-row items-center bg-white border rounded-xl shadow-2xl px-4 py-3 lg:w-1/3 lg:mr-5 mt-5 cursor-pointer"
            onClick={() =>
              window.open("")
            }
          >
            <img src={Images.next} alt="Next" className="mr-5" />
            <div>
              <p className="font_bold text-xl"> </p>
              <p className="font_bold text_primary text-md">
                 <span className="text-black">• Delivery & pickup</span>
              </p>
            </div>
          </div> */}
        </div>
        {/* <div className="lg:flex lg:flex-row lg:justify-between">
          <div className="flex flex-row items-center bg-white border rounded-xl shadow-2xl px-4 py-3 lg:w-1/3 lg:mr-5 mt-5">
            <img src={Images.spar} alt="Spar" className="mr-5" />
            <div>
              <p className="font_bold text-xl"></p>
              <p className="font_bold text-md"></p>
            </div>
          </div>
          <div className="flex flex-row items-center bg-white border rounded-xl shadow-2xl px-4 py-3 lg:w-1/3 lg:mr-5 mt-5">
            <img src={Images.jendol} alt="Jendol" className="mr-5" />
            <div>
              <p className="font_bold text-xl"></p>
              <p className="font_bold text_red text-md">Coming soon!</p>
            </div>
          </div>
          <div className="flex flex-row items-center bg-white border rounded-xl shadow-2xl px-4 py-3 lg:w-1/3 lg:mr-5 mt-5">
            <img src={Images.justrite} alt="Justrite" className="mr-5" />
            <div>
              <p className="font_bold text-xl"></p>
              <p className="font_bold text_red text-md">Coming soon!</p>
            </div>
          </div>
        </div> */}
      </section>

      {/* Dropp it in few clicks. */}
      <section className="w-4/5 mx-auto pt-5 pb-20">
        <div className="flex-1 lg:mt-20">
          <h1 className="lg:text-6xl text-4xl font_bold text-center mb-20">
            Dropp it in few clicks.
          </h1>
        </div>
        <div className="my-10 lg:flex lg:flex-row lg:justify-between">
          <div
            className="lg:w-1/3 py-16 px-10 lg:mr-10 rounded-l3xlg"
            style={{ backgroundColor: "#FFFFF5" }}
          >
            <div className="flex place-content-center">
              <img src={Images.plus} alt="Vector" />
            </div>
            <div className="text-left">
              <p className="font_bold my-10 text-2xl">
                Choose what you <br /> want. Very simple.
              </p>
              <p className="font_regular text-xl">
                Select items from your favourite grocery stores on our platform.
              </p>
            </div>
          </div>
          <div
            className="lg:w-1/3 py-16 px-10 lg:mr-10 mt-5 lg:mt-0 rounded-3xl"
            style={{ backgroundColor: "#F3FFF9" }}
          >
            <div className="flex place-content-center">
              <img src={Images.check} alt="Vector" />
            </div>
            <div className="text-left">
              <p className="font_bold my-10 text-2xl">
                We do the shopping. <br /> No stress.
              </p>
              <p className="font_regular text-xl">
                A personal shopper receives your order and starts collecting
                ordered items.
              </p>
            </div>
          </div>
          <div
            className="lg:w-1/3 py-16 px-10 lg:mr-10 mt-5 lg:mt-0 rounded-3xl"
            style={{ backgroundColor: "#FFF7F5" }}
          >
            <div className="flex place-content-center">
              <img src={Images.location} alt="Vector" />
            </div>
            <div className="text-left">
              <p className="font_bold my-8 text-2xl">
                You get your <br /> items in 1 hour.
              </p>
              <p className="font_regular text-xl">
                Shopper then delivers groceries to your address.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a href="#stores">
            <button className="w-full lg:w-1/5 font_bold py-3 border border-transparent text-sm rounded-xl shadow-sm text-white bg_primary">
              Start Dropp-ing now!
            </button>
          </a>
        </div>
      </section>

      {/* See what people are saying! */}
      <section
        className="pt-5 lg:pb-20 pb-32"
        style={{ backgroundColor: "#FFFFF5" }}
      >
        <div className="flex-1 lg:mt-20">
          <h1 className="lg:text-6xl text-4xl font_bold text-center mb-20">
            See what people are saying!
          </h1>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="pt-5 pb-20 h_601"
        style={{ backgroundColor: "#FFE6B4" }}
      >
        <div className="lg:w-11/12 mx-auto">
          <div
            className="lg:flex lg:flex-row lg:justify-between"
            style={{ marginTop: -150 }}
          >
            <div className="mx-5 lg:mx-0">
              <div className="bg-white px-10 py-20 rounded-2xl items-center testimonial_card">
                <div className="flex flex-row items-center mb-8">
                  <img
                    src={Images.afolabi}
                    className="h-18 w-18 rounded-full"
                    alt="afolabi"
                  />
                  <p className="font_bold text-2xl text-black ml-5">Afolabi</p>
                </div>
                <p className="font_regular text-lg text-black">
                  Dropp is everything I have always needed to complement my busy
                  <br />
                  life. They do all the shopping for you <br /> without any
                  hiccup. I will <br /> recommend Dropp 1001 times.
                </p>
              </div>
              <div className="bg-white px-10 py-20 rounded-2xl items-center mt-5 testimonial_card h_484">
                <div className="flex flex-row items-center mb-8">
                  <img
                    src={Images.lolade}
                    className="h-18 w-18 rounded-full"
                    alt="lolade"
                  />
                  <p className="font_bold text-2xl text-black ml-5">Lolade</p>
                </div>
                <p className="font_regular text-lg text-black">
                  My mother is quite old and it is very difficult for me to do
                  her shopping for her because of my busy schedule. The first
                  time I used Dropp I was skeptical about it, but right now I’m
                  pretty much convinced and I’m using it for the fourth time.
                </p>
                <p className="font_regular text-lg text-black mt-5">
                  I would recommend Dropp over and over again.
                </p>
              </div>
            </div>
            <div className="mx-5 lg:mx-0">
              <div className="bg-white px-10 py-20 rounded-2xl items-center mt-5 lg:mt-0 testimonial_card h_484">
                <div className="flex flex-row items-center mb-8">
                  <img
                    src={Images.alex}
                    className="h-18 w-18 rounded-full"
                    alt="alex"
                  />
                  <p className="font_bold text-2xl text-black ml-5">Alex</p>
                </div>
                <p className="font_regular text-lg text-black">
                  This is a game-changer for me, I have always been looking for
                  a way to get rid of shopping because of my busy schedule.
                  Dropp came in at the right time, especially now that my wife
                  and I had our baby.
                </p>
                <p className="font_regular text-lg text-black mt-5">
                  I’m scheduling a Dropp again this week and the week to come
                  and the one after. LOL
                </p>
              </div>
              <div className="bg-white px-10 py-20 rounded-2xl items-center mt-5 testimonial_card">
                <div className="flex flex-row items-center mb-8">
                  <img
                    src={Images.taiwo}
                    className="h-18 w-18 rounded-full"
                    alt="taiwo"
                  />
                  <p className="font_bold text-2xl text-black ml-5">Taiwo</p>
                </div>
                <p className="font_regular text-lg text-black">
                  I just schedule a Dropp in the middle of the day, and boom the
                  order is here in less than an hour, I&apos;m surprised how
                  they do the magic but it works and it matches my remote work
                  lifestyle. Go schedule a Dropp and see for yourself.
                </p>
              </div>
            </div>
            <div className="mx-5 lg:mx-0">
              <div className="bg-white px-10 py-20 rounded-2xl items-center mt-5 lg:mt-0 testimonial_card">
                <div className="flex flex-row items-center mb-8">
                  <img
                    // src={Images.tobi}
                    className="h-18 w-18 rounded-full"
                    alt="tobi"
                  />
                  <p className="font_bold text-2xl text-black ml-5">Tobi</p>
                </div>
                <p className="font_regular text-lg text-black">
                  A friend told me about Dropp and I could not believe it, until
                  I scheduled a Dropp myself, it is a cool experience and the
                  person that shopped for me was super nice. I&apos;m
                  recommending this to everybody I meet.
                </p>
              </div>
              <div className="bg-white px-10 py-20 rounded-2xl items-center mt-5 testimonial_card h_484">
                <div className="flex flex-row items-center mb-8">
                  <img
                    src={Images.victor}
                    className="h-18 w-18 rounded-full"
                    alt="victor"
                  />
                  <p className="font_bold text-2xl text-black ml-5">Victor</p>
                </div>
                <p className="font_regular text-lg text-black">
                  Oh my God, I have been looking for a platform like this all my
                  life since I got to Lagos, I&apos;m quite lazy with shopping
                  and sometimes have to force myself to do it, but when I
                  discovered Dropp, it was like they lifted the weight of the
                  world off my shoulders, sharing this with all my family
                  members right now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule a Dropp */}
      <section className="lg:pt-40" style={{ backgroundColor: "#FFFFF5" }}>
        <div className="text-center mt-24 mb-10">
          <a href="#stores">
            <button className="w-2/3 lg:w-1/5 font_bold py-3 border border-transparent text-sm rounded-xl shadow-sm text-white bg_primary">
              Schedule a Dropp
            </button>
          </a>
        </div>
        <div id="DROPP">
          <img src={Images.DROPP} alt="DROPP.DROPP" className="w-full" />
        </div>
        <div className="footer_hr_line my-10 mx-5 lg:mx-24" />
        <div className="lg:mx-28 mx-10 mt-10 lg:mt-0">
          <div className="lg:flex mt-16">
            <div className="lg:flex-1">
              <img className="w-48" src={Images.logo} alt="dropp_logo" />
            </div>
            <div
              className="lg:flex lg:justify-between mt-10 lg:mt-0"
              style={{ flexGrow: 0.2 }}
            >
              <p className="font_bold text-base my-5 lg:my-0">
                2022 Dropp technologies. <br /> All rights reserved. <br />
                <a
                  href="https://opposite-pet-88e.notion.site/Terms-of-Use-750a370ccc434a16b2b80c3f277f4968"
                  target="_blank"
                  rel="noreferrer"
                  className="font_regular"
                >
                  Terms of Use
                </a>
              </p>
              <p className="font_regular text-base my-5 lg:my-0">
                <span className="font_bold">Wanna talk? </span>
                <br />
                <a href="mailto:hello@getdropp.com">hello@getdropp.com</a>
                <br />
                <a
                  href="https://api.whatsapp.com/send?phone=+23408068424478&text=Hello, I have a question for Dropp https://paystack.shop/dropp"
                  target="_blank"
                  rel="noreferrer"
                >
                  +2349061494881
                </a>
              </p>
              <p className="font_regular text-base pb-10 lg:pb-0">
                <span className="font_bold">Follow Us</span>
                <br />
                <a
                  href="https://www.instagram.com/getdropp/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/company/getdropp/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <br />
                <a
                  href="https://twitter.com/getdropp?s=11"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Market;
