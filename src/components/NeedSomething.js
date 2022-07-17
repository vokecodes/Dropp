import React from "react";

const NeedSomething = ({ items }) => {
  return (
    <section className="w-4/5 lg:w-4/6 mx-auto pt-5 pb-20">
      <div className="flex-1 lg:mt-20">
        <h1 className="lg:text-6xl text-4xl font_bold text-center text_secondary2 mb-5">
          Need something? Just Dropp it!
        </h1>
        <p className="text-2xl font_medium text-center text_secondary2">
          Explore our assortment of fresh fruits, vegetables, bread and more.
        </p>
      </div>
      <div className="my-10 flex flex-row flex-wrap justify-around">
        {items?.map((item) => (
          <div className="" key={item.id}>
            <img
              src={item.image}
              alt={item.tile}
              className="hidden lg:block mx-auto"
            />
            <img
              src={item.mobileImage}
              alt={item.tile}
              className="lg:hidden mx-auto"
            />
            <p className="font_regular text-sm lg:text-lg text-black text-center my-3">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a href="#stores">
          <button className="w-80 font_bold py-5 border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
            Schedule a Dropp!
          </button>
        </a>
      </div>
    </section>
  );
};

export default NeedSomething;
