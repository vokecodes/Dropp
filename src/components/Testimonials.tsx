import React from "react";
import { Images } from "../config/images";

const Testimonials = ({ setShowModal }) => {
  return (
    <section className="pt-40 lg:pt-32 pb-10 supermarkets_bg">
      <h1 className="hidden lg:block my-20 text-6xl text-white font_bold text-center">
        See what people are saying!
      </h1>
      <h1 className="lg:hidden my-20 text-4xl text-white font_bold text-center">
        See what people <br /> are saying!
      </h1>

      {/* <div className="w-4/5 lg:w-4/6 mx-auto">
        <div className="flex flex-row flex-wrap justify-center">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white w_300 mb-3 rounded-3xl items-center mr-3 px-10 shrink-0"
            >
              <img
                src={testimonial.image}
                className="h-20 w-20 rounded-full border-4 border_green mx-auto testimonial_image"
                alt={testimonial.name}
              />
              <p className="mt-6 font_bold text-2xl text-black text-center">
                {testimonial.name}
              </p>
              <p className="py-4 font_regular text-sm text-black text-center">
                {testimonial.message}
              </p>
            </div>
          ))}
        </div>
      </div> */}
      <div className="w-45 lg:w-4/6 mx-auto lg:flex lg:flex-row justify-center">
        <div className="mx-3">
          <div className="lg:w-96 bg-white px-10 py-10 rounded-2xl items-center transition ease-in-out delay-150 hover:scale-105 duration-300">
            <div className="flex flex-row items-center mb-8">
              <img
                src={Images.afolabi}
                className="h-16 w-16 rounded-full"
                alt="afolabi"
              />
              <div>
                <p className="font_bold text-2xl text_black1 ml-5">Afolabi</p>
                <p className="font_bold text-sm text_gray ml-5">
                  Lead Software Engineer,
                </p>
              </div>
            </div>
            <p className="font_regular text-base text_black1">
              Dropp is everything I have always needed to complement my busy
              life. They do all the shopping for you without any hiccups. Omo, I
              recommend Dropp 1001 times
            </p>
          </div>
          <div className="lg:w-96 bg-white px-10 py-10 rounded-2xl items-center mt-5 transition ease-in-out delay-150 hover:scale-105 duration-30">
            <div className="flex flex-row items-center mb-8">
              <img
                src={Images.lolade}
                className="h-16 w-16 rounded-full"
                alt="lolade"
              />
              <div>
                <p className="font_bold text-2xl text_black1 ml-5">Ifeoma</p>
                <p className="font_bold text-sm text_gray ml-5">
                  Financial Analyst,
                </p>
              </div>
            </div>
            <p className="font_regular text-base text_black1">
              I have an aged mother and it is quite difficult for me to help her
              with grocery shopping because of my busy schedule. A friend told
              me about Dropp, initially I was skeptical, but right now, I'm so
              much in love with the platform and this is me using it for the
              fourth time. If you want a soft life, Dropp is your answer.
            </p>
          </div>
        </div>
        <div className="mx-3">
          <div className="lg:w-96 bg-white px-10 py-10 rounded-2xl items-center mt-5 lg:mt-0 transition ease-in-out delay-150 hover:scale-105 duration-30">
            <div className="flex flex-row items-center mb-8">
              <img
                src={Images.alex}
                className="h-16 w-16 rounded-full"
                alt="alex"
              />
              <div>
                <p className="font_bold text-2xl text_black1 ml-5">Alex</p>
                <p className="font_bold text-sm text_gray ml-5">
                  Community manager,
                </p>
              </div>
            </div>
            <p className="font_regular text-base text_black1">
              This is a game-changer for me, I hate going to the supermarkets. I
              have been looking for a platform to help my life. Dropp came in at
              the right time. I’m scheduling a Dropp again this week and the
              week to come. Lmao, we die here.
            </p>
          </div>
          <div className="lg:w-96 bg-white px-10 py-10 rounded-2xl items-center mt-5 transition ease-in-out delay-150 hover:scale-105 duration-30">
            <div className="flex flex-row items-center mb-8">
              <img
                src={Images.taiwo}
                className="h-16 w-16 rounded-full"
                alt="taiwo"
              />
              <div>
                <p className="font_bold text-2xl text_black1 ml-5">Racheal</p>
                <p className="font_bold text-sm text_gray ml-5">
                  Investment Banker,
                </p>
              </div>
            </div>
            <p className="font_regular text-base text_black1">
              I scheduled a Dropp in the middle of the day, and boom the order
              came like magic in less than an hour. I'm surprised how they do
              this, but it works and matches my remote work life. Go schedule a
              Dropp and see for yourself !!!
            </p>
          </div>
        </div>
        <div className="mx-3">
          <div className="lg:w-96 bg-white px-10 py-10 rounded-2xl items-center mt-5 lg:mt-0 transition ease-in-out delay-150 hover:scale-105 duration-30">
            <div className="flex flex-row items-center mb-8">
              <img
                src={Images.yetunde}
                className="h-16 w-16 rounded-full"
                alt="tobi"
              />
              <div>
                <p className="font_bold text-2xl text_black1 ml-5">Yetunde</p>
                <p className="font_bold text-sm text_gray ml-5">
                  Risk & Compliance Lead,
                </p>
              </div>
            </div>
            <p className="font_regular text-base text_black1">
              Recently, a friend told me about Dropp, though it took a while for
              me to try the platform. I could not believe it until I scheduled a
              Dropp myself, it’s a really cool experience. The person that
              shopped for me was super nice. I'm recommending this to everybody
              I meet.
            </p>
          </div>
          <div className="lg:w-96 bg-white px-10 py-10 rounded-2xl items-center mt-5 transition ease-in-out delay-150 hover:scale-105 duration-30">
            <div className="flex flex-row items-center mb-8">
              <img
                src={Images.victor}
                className="h-16 w-16 rounded-full"
                alt="victor"
              />
              <div>
                <p className="font_bold text-2xl text_black1 ml-5">Victor</p>
                <p className="font_bold text-sm text_gray ml-5">
                  Product Designer,
                </p>
              </div>
            </div>
            <p className="font_regular text-base text-black">
              Omo, I’ve been looking for a platform like this all my life in
              Lagos. I'm quite lazy with shopping and sometimes have to force
              myself to do it. Since I discovered Dropp, it’s been the biggest
              flex of my life. My personal shopper feels like a friend. Biggest
              fan right here.
            </p>
          </div>
        </div>
      </div>

      <div className="my-20 flex justify-center">
        <button
          className="w-80 font_bold py-3 button text-lg rounded-xl shadow-sm text-white bg_primary"
          onClick={() => setShowModal(true)}
        >
          Schedule a Dropp!
        </button>
      </div>
      {/* <div className="overflow-hidden">
        <div id="DROPP">
          <div className="flex flex-row">
            <img src={Images.DROPP} alt="DROPP.DROPP" className="w-full" />
            <img src={Images.DROPP} alt="DROPP.DROPP" className="w-full" />
            <img src={Images.DROPP} alt="DROPP.DROPP" className="w-full" />
            <img src={Images.DROPP} alt="DROPP.DROPP" className="w-full" />
            <img src={Images.DROPP} alt="DROPP.DROPP" className="w-full" />
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Testimonials;
