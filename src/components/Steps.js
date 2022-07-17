import React from "react";
import { Images } from "../config/images";

const Steps = ({ step1Class, step2Class, step3Class }) => {
  console.log("eikmf", step1Class);
  return (
    <section className="header_bg">
      <div className="w-4/5 lg:w-4/6 mx-auto pt-40 lg:pt-12">
        <div className="lg:mt-32">
          <h1 className="lg:text-6xl text-2xl font_bold text-center text_black1 mb-5">
            Dropp it in few clicks.
          </h1>
          <p className="text-lg lg:text-2xl font_medium text-center text_black1">
            Our WhatsApp bot solution enables you to shop, track and pay in
            minutes.
          </p>
        </div>
        <div className="mt-20">
          {/* {steps?.map((step) => (
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
          ))} */}
          <div className={`${step1Class ? "hidden" : "block"}`}>
            <div className="lg:flex lg:flex-row">
              <div className="lg:w-1/2">
                <img
                  src={Images.step01}
                  alt={`Create a shopping list. \n Very simple.`}
                />
              </div>
              <div className="lg:w-1/2 ml-0 lg:ml-10">
                <p className="text-center lg:text-left step_num text_yellow font_heavy">
                  01.
                </p>
                <p className="font_bold text-2xl lg:text-4xl text-center lg:text-left text_black1 whitespace-pre-line">
                  {`Create a shopping list. \n Very simple.`}
                </p>
                <p className="my-3 font_medium text-base lg:text-xl text-center lg:text-left text_black1 whitespace-pre-line">
                  {`Fill your shopping list with everything from \n groceries to pharmacy essentials and more.`}
                </p>
                <div className="text-center lg:text-left mt-7">
                  <button className="w-80 lg:w-72 font_bold py-5 border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
                    Schedule a Dropp!
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className={`${step2Class ? "hidden" : "block"}`}>
            <div className="lg:flex lg:flex-row">
              <div className="lg:w-1/2">
                <img
                  src={Images.step02}
                  alt={`Have your shopping taken \ncare of by a Dropper.`}
                />
              </div>
              <div className="lg:w-1/2 ml-0 lg:ml-10">
                <p className="text-center lg:text-left step_num text_yellow font_heavy">
                  02.
                </p>
                <p className="font_bold text-2xl lg:text-4xl text-center lg:text-left text_black1 whitespace-pre-line">
                  {`Have your shopping taken \ncare of by a Dropper.`}
                </p>
                <p className="my-3 font_medium text-base lg:text-xl text-center lg:text-left text_black1 whitespace-pre-line">
                  {`Forget to add something? Just send your \nDropper a message through the app.`}
                </p>
                <div className="text-center lg:text-left mt-7">
                  <button className="w-80 lg:w-72 font_bold py-5 border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
                    Schedule a Dropp!
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className={`${step3Class ? "hidden" : "block"}`}>
            <div className="lg:flex lg:flex-row">
              <div className="lg:w-1/2">
                <img src={Images.step03} alt={`Get it when you \nneed it.`} />
              </div>
              <div className="lg:w-1/2 ml-0 lg:ml-10">
                <p className="text-center lg:text-left step_num text_yellow font_heavy">
                  03.
                </p>
                <p className="font_bold text-2xl lg:text-4xl text-center lg:text-left text_black1 whitespace-pre-line">
                  {`Get it when you \nneed it.`}
                </p>
                <p className="my-3 font_medium text-base lg:text-xl text-center lg:text-left text_black1 whitespace-pre-line">
                  {`Need an order delivered later? \nSchedule it for later.`}
                </p>
                <div className="text-center lg:text-left mt-7">
                  <button className="w-80 lg:w-72 font_bold py-5 border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
                    Schedule a Dropp!
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Steps;
