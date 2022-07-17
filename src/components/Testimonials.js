import React from "react";

const Testimonials = ({ testimonials, dropp_logo }) => {
  return (
    <section className="pt-40 lg:pt-32 pb-10 supermarkets_bg">
      <h1 className="my-20 text-6xl text-white font_bold text-center">
        See what people are saying!
      </h1>

      <div className="w-4/5 lg:w-3/5 mx-auto">
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
      </div>

      <div className="my-20 flex justify-center">
        <button className="w-80 font_bold py-3 button text-xl rounded-xl shadow-sm text-white bg_primary">
          Schedule a Dropp!
        </button>
      </div>
      <div className="overflow-hidden">
        <div id="DROPP">
          <img src={dropp_logo} alt="DROPP.DROPP" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
