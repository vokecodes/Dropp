import React from "react";
import { Images } from "../config/images";

const Steps = ({
  step1Class,
  step2Class,
  step3Class,
  bannerImage,
  businesses,
}) => {
  return (
    <section className="header_bg">
      <div className="w-4/5 lg:w-4/6 mx-auto pt-40 lg:pt-12">
        <div className="lg:mt-32">
          <h1 className="lg:text-6xl text-4xl font_bold text-center text_black1 mb-5">
            Dropp it in few clicks.
          </h1>
          <p className="text-lg lg:text-2xl font_medium text-center text_black1">
            Our WhatsApp bot solution enables you to shop, track and pay in
            minutes.
          </p>
        </div>
        <div className="mt-12 lg:mt-20">
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
            <div className="hidden lg:block lg:flex lg:flex-row">
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
            <div className="lg:hidden lg:flex lg:flex-row">
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
              <div className="lg:w-1/2 mt-10">
                <img
                  src={Images.step01}
                  alt={`Create a shopping list. \n Very simple.`}
                />
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

        <div className="lg:flex lg:flex-row pt-32 pb-64">
          <div className="my-auto flex-1">
            <h1 className="text-4xl lg:text-6xl text-center lg:text-left text_black1 font_bold">
              Love to shop? <br />
              <span>Join our growing</span> <br />
              list of Droppers.
            </h1>
            {/* <h1 className="lg:hidden text-3xl text_black1 font_bold">
              Love to shop? <br />
              Join our growing <br />
              list of Droppers.
            </h1> */}
            <p className="my-7 font_medium text-lg lg:text-2xl text-center lg:text-left text_black1">
              Shop and deliver groceries to others <br /> and get paid for it!
            </p>
            <div className="text-center lg:text-left">
              <button className="my-5 w-72 lg:w-80 font_bold py-3 button text-lg rounded-xl shadow-sm text-white bg_primary">
                Become a Dropper today!
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img src={bannerImage} alt="items" />
          </div>
        </div>
      </div>
      <div className="lg:w-4/6 lg:mx-auto">
        <div
          className="bg-white rounded-xl shadow-md py-16 mx-2"
          style={{
            width: "inherit",
            position: "absolute",
            marginTop: "-180px",
          }}
        >
          <h2 className="hidden lg:block text-3xl font_medium text_gray text-center">
            Trusted by some of the notable <br /> businesses around.
          </h2>
          <h2 className="lg:hidden text-xl font_medium text_gray text-center">
            Trusted by some of the notable <br /> businesses around.
          </h2>
          <div className="flex flex-row flex-wrap justify-center px-5 pt-6">
            {businesses?.map((business, i) => {
              return (
                <React.Fragment key={business.id}>
                  <img
                    src={business.image}
                    alt={business.title}
                    className={`w-36 hidden lg:block ${
                      businesses.length === i + 1 ? "" : "mr-12"
                    }`}
                  />
                  <img
                    src={business.mobileImage}
                    alt={business.title}
                    className={`w-32 lg:hidden mb-5 ${
                      businesses.length === i + 1 ? "" : "mr-7"
                    }`}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
