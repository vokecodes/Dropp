import React from "react";

const Steps = ({ steps }) => {
  return (
    <section className="header_bg">
      <div className="w-4/5 mx-auto pt-12 pb-20">
        <div className="flex-1 lg:mt-20">
          <h1 className="lg:text-6xl text-4xl font_bold text-center text_secondary2 mb-5">
            Dropp it in few clicks.
          </h1>
          <p className="text-2xl font_medium text-center text_secondary2">
            Our WhatsApp bot solution enables you to shop, track and pay in
            minutes.
          </p>
        </div>
      </div>
      <div className="mt-8">
        {steps?.map((step) => (
          <div key={step.id} className="lg:flex lg:flex-row">
            <div className="lg:w-1/2">
              <img src={step.image} alt={step.tile} />
            </div>
            <div className="lg:w-1/2 mx-10 lg:mx-0">
              <p className="step_num text_yellow font_heavy">{step.number}</p>
              <p className="font_bold text-4xl text_black1 whitespace-pre-line">
                {step.title}
              </p>
              <p className="my-3 font_medium text-xl text_black1 whitespace-pre-line">
                {step.description}
              </p>
              <button className="my-10 w-72 font_bold py-5 border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
                Schedule a Dropp
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
