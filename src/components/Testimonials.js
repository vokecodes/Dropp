import React from "react";

const Testimonials = ({ testimonials, dropp_logo }) => {
  return (
    <section className="pt-32 pb-10 bg_green">
      <h1 className="my-20 text-6xl text-white font_bold text-center">
        See what people are saying!
      </h1>

      <div className="w-4/5 mx-auto">
        <div className="lg:flex lg:flex-row lg:flex-wrap lg:justify-center">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white lg:w-1/4 lg:h-96 rounded-3xl items-center mt-20 lg:mt-10 mb-10 mx-auto lg:mr-5 px-10"
            >
              <img
                src={testimonial.image}
                className="h-20 w-20 rounded-full border-4 border_green mx-auto testimonial_image"
                alt={testimonial.name}
              />
              <p className="mt-6 font_bold text-2xl text-black text-center">
                {testimonial.name}
              </p>
              <p className="py-4 font_regular text-base text-black text-center">
                {testimonial.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-20 flex justify-center">
        <button className="w-80 font_bold py-3 button text-xl rounded-xl shadow-sm text-white bg_primary">
          Schedule a Dropp
        </button>
      </div>
      <div id="DROPP">
        <img src={dropp_logo} alt="DROPP.DROPP" className="w-full" />
      </div>
    </section>
  );
};

export default Testimonials;
