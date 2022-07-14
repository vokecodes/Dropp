import React from "react";

const Steps = ({ steps }) => {
  return (
    <section className="header_bg w-4/5 lg:w-3/5 mx-auto pt-40 lg:pt-12 pb-10">
      <div className="lg:mt-24">
        <h1 className="lg:text-6xl text-2xl font_bold text-center text_secondary2 mb-5">
          Dropp it in few clicks.
        </h1>
        <p className="text-lg lg:text-2xl font_medium text-center text_secondary2">
          Our WhatsApp bot solution enables you to shop, track and pay in
          minutes.
        </p>
      </div>
      <div className="mt-28">
        {steps?.map((step) => (
          <div key={step.id} className="lg:flex lg:flex-row">
            <div className="lg:w-1/2">
              <img src={step.image} alt={step.tile} />
            </div>
            <div className="lg:w-1/2 ml-0 lg:ml-10">
              <p className="text-center lg:text-left step_num text_yellow font_heavy">
                {step.number}
              </p>
              <p className="font_bold text-2xl lg:text-4xl text-center lg:text-left text_black1 whitespace-pre-line">
                {step.title}
              </p>
              <p className="my-3 font_medium text-base lg:text-xl text-center lg:text-left text_black1 whitespace-pre-line">
                {step.description}
              </p>
              <div className="text-center lg:text-left mt-7">
                <button className="w-80 lg:w-72 font_bold py-5 border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
                  Schedule a Dropp!
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
