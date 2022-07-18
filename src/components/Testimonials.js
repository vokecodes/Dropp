import React from "react";
import { Images } from "../config/images";

const Testimonials = ({}) => {
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
          <div className="lg:w-96 bg-white px-10 py-10 rounded-2xl items-center">
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
              life.
            </p>
            <p className="font_regular text-lg text-black">
              They do all the shopping for you without any hiccup. I will
              recommend Dropp 1001 times.
            </p>
          </div>
          <div className="lg:w-96 bg-white px-10 py-10 rounded-2xl items-center mt-5">
            <div className="flex flex-row items-center mb-8">
              <img
                src={Images.lolade}
                className="h-18 w-18 rounded-full"
                alt="lolade"
              />
              <p className="font_bold text-2xl text-black ml-5">Lolade</p>
            </div>
            <p className="font_regular text-lg text-black">
              My mother is quite old and it is very difficult for me to do her
              shopping for her because of my busy schedule. The first time I
              used Dropp I was skeptical about it, but right now I&apos;m pretty
              much convinced and I&apos;m using it for the fourth time.
            </p>
            <p className="font_regular text-lg text-black">
              I would recommend Dropp over and over again.
            </p>
          </div>
        </div>
        <div className="mx-3">
          <div className="bg-white px-10 py-10 rounded-2xl items-center mt-5 lg:mt-0">
            <div className="flex flex-row items-center mb-8">
              <img
                src={Images.alex}
                className="h-18 w-18 rounded-full"
                alt="alex"
              />
              <p className="font_bold text-2xl text-black ml-5">Alex</p>
            </div>
            <p className="font_regular text-lg text-black">
              This is a game-changer for me, I have always been looking for a
              way to get rid of shopping because of my busy schedule. Dropp came
              in at the right time, especially now that my wife and I had our
              baby.
            </p>
            <p className="font_regular text-lg text-black mt-5">
              I’m scheduling a Dropp again this week and the week to come and
              the one after. LOL
            </p>
          </div>
          <div className="bg-white px-10 py-10 rounded-2xl items-center mt-5">
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
              order is here in less than an hour, I&apos;m surprised how they do
              the magic but it works and it matches my remote work lifestyle. Go
              schedule a Dropp and see for yourself.
            </p>
          </div>
        </div>
        <div className="mx-3">
          <div className="lg:w-96 bg-white px-10 py-10 rounded-2xl items-center mt-5 lg:mt-0">
            <div className="flex flex-row items-center mb-8">
              <img
                src={Images.tobi}
                className="h-18 w-18 rounded-full"
                alt="tobi"
              />
              <p className="font_bold text-2xl text-black ml-5">Tobi</p>
            </div>
            <p className="font_regular text-lg text-black">
              A friend told me about Dropp and I could not believe it, until I
              scheduled a Dropp myself, it is a cool experience and the person
              that shopped for me was super nice.
            </p>
            <p className="font_regular text-lg text-black mt-2">
              I&apos;m recommending this to everybody I meet.
            </p>
          </div>
          <div className="lg:w-96 bg-white px-10 py-10 rounded-2xl items-center mt-5">
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
              life since I got to Lagos, I&apos;m quite lazy with shopping and
              sometimes have to force myself to do it, but when I discovered
              Dropp, it was like they lifted the weight of the world off my
              shoulders, sharing this with all my family members right now.
            </p>
          </div>
        </div>
      </div>

      <div className="my-20 flex justify-center">
        <button className="w-80 font_bold py-3 button text-lg rounded-xl shadow-sm text-white bg_primary">
          Schedule a Dropp!
        </button>
      </div>
      <div className="overflow-hidden">
        <div id="DROPP">
          <div className="flex flex-row">
            <img src={Images.DROPP} alt="DROPP.DROPP" className="w-full" />
            <img src={Images.DROPP} alt="DROPP.DROPP" className="w-full" />
            <img src={Images.DROPP} alt="DROPP.DROPP" className="w-full" />
            <img src={Images.DROPP} alt="DROPP.DROPP" className="w-full" />
            <img src={Images.DROPP} alt="DROPP.DROPP" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
