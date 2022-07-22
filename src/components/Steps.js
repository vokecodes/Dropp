import React, { useState, useRef } from "react";
// import { useParallax, Parallax } from "react-scroll-parallax";
import { useSpring, config, animated } from "react-spring";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { Images } from "../config/images";

const Steps = ({ bannerImage, businesses }) => {
  // const { ref } = useParallax({ speed: 10 });

  const [flip, set] = useState(false);

  const steps = [
    {
      id: 1,
      image: Images.step01,
      number: "01.",
      title: `Create a shopping list. \n Very simple.`,
      description: `Fill your shopping list with everything from \n groceries to pharmacy essentials and more.`,
    },
    {
      id: 2,
      image: Images.step02,
      number: "02.",
      title: `Have your shopping taken \ncare of by a Dropper.`,
      description: `Forget to add something? Just send your \nDropper a message through the app.`,
    },
    {
      id: 3,
      image: Images.step03,
      number: "03.",
      title: `Get it when you \nneed it.`,
      description: `Need an order delivered later? \nSchedule it for later.`,
    },
  ];

  const words = ["We", "came.", "We", "saw.", "We", "kicked", "its", "ass."];

  const { scroll } = useSpring({
    scroll: (steps.length - 1) * 400,
    from: { scroll: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  });

  const url = (name, wrap = false) =>
    `${
      wrap ? "url(" : ""
    }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
      wrap ? ")" : ""
    }`;

  const parallax = useRef(null);

  return (
    <section className="header_bg">
      <div className="lg:w-4/6 mx-auto pt-40 lg:pt-12">
        <div className="lg:mt-32">
          <h1 className="lg:text-6xl text-4xl font_bold text-center text_black1 mb-5">
            Dropp it in few clicks.
          </h1>
          <p className="hidden lg:block text-lg lg:text-2xl font_medium text-center text_black1">
            Shop from your favorite stores, track your orders, chat with <br />
            your shopper and pay in minutes.
          </p>
          <p className="lg:hidden text-lg lg:text-2xl font_medium text-center text_black1 px-10">
            Shop from your favorite stores, track your orders, chat with your
            shopper and pay in minutes.
          </p>
        </div>

        {/* <div style={{ width: "100%", height: "100%", background: "#253237" }}>
          <Parallax ref={parallax} pages={3}>
            <ParallaxLayer
              offset={1}
              speed={1}
              style={{ backgroundColor: "#805E73" }}
            />
            <ParallaxLayer
              offset={2}
              speed={1}
              style={{ backgroundColor: "#87BCDE" }}
            />

            <ParallaxLayer
              offset={0}
              speed={0}
              factor={3}
              style={{
                backgroundImage: url("stars", true),
                backgroundSize: "cover",
              }}
            />

            <ParallaxLayer
              offset={1.3}
              speed={-0.3}
              style={{ pointerEvents: "none" }}
            >
              <img
                src={url("satellite4")}
                style={{ width: "15%", marginLeft: "70%" }}
              />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
              <img
                src={url("cloud")}
                style={{ display: "block", width: "20%", marginLeft: "55%" }}
              />
              <img
                src={url("cloud")}
                style={{ display: "block", width: "10%", marginLeft: "15%" }}
              />
            </ParallaxLayer>

            <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
              <img
                src={url("cloud")}
                style={{ display: "block", width: "20%", marginLeft: "70%" }}
              />
              <img
                src={url("cloud")}
                style={{ display: "block", width: "20%", marginLeft: "40%" }}
              />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
              <img
                src={url("cloud")}
                style={{ display: "block", width: "10%", marginLeft: "10%" }}
              />
              <img
                src={url("cloud")}
                style={{ display: "block", width: "20%", marginLeft: "75%" }}
              />
            </ParallaxLayer>

            <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
              <img
                src={url("cloud")}
                style={{ display: "block", width: "20%", marginLeft: "60%" }}
              />
              <img
                src={url("cloud")}
                style={{ display: "block", width: "25%", marginLeft: "30%" }}
              />
              <img
                src={url("cloud")}
                style={{ display: "block", width: "10%", marginLeft: "80%" }}
              />
            </ParallaxLayer>

            <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
              <img
                src={url("cloud")}
                style={{ display: "block", width: "20%", marginLeft: "5%" }}
              />
              <img
                src={url("cloud")}
                style={{ display: "block", width: "15%", marginLeft: "75%" }}
              />
            </ParallaxLayer>

            <ParallaxLayer
              offset={2.5}
              speed={-0.4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <img src={url("earth")} style={{ width: "60%" }} />
            </ParallaxLayer>

            <ParallaxLayer
              offset={2}
              speed={-0.3}
              style={{
                backgroundSize: "80%",
                backgroundPosition: "center",
                backgroundImage: url("clients", true),
              }}
            />

            <ParallaxLayer
              offset={0}
              speed={0.1}
              onClick={() => parallax.current.scrollTo(1)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={url("server")} style={{ width: "20%" }} />
            </ParallaxLayer>

            <ParallaxLayer
              offset={1}
              speed={0.1}
              onClick={() => parallax.current.scrollTo(2)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={url("bash")} style={{ width: "40%" }} />
            </ParallaxLayer>

            <ParallaxLayer
              offset={2}
              speed={-0}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => parallax.current.scrollTo(0)}
            >
              <img src={url("clients-main")} style={{ width: "40%" }} />
            </ParallaxLayer>
          </Parallax>
        </div> */}

        {/* <div
          className="mt-12 lg:mt-20"
          style={{ position: "absolute", width: "60%", height: "100%" }}
        >
          <Parallax pages={3} style={{ top: "0", left: "0" }}>
            <ParallaxLayer
              offset={0}
              speed={2.5}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "blue",
              }}
            >
              <div className="hidden lg:block lg:flex lg:flex-row">
                <div className="lg:w-1/2">
                  <img
                    src={Images.step01}
                    alt={`Create a shopping list. \n Very simple.`}
                  />
                </div>
                <div className="lg:w-1/2 ml-0 lg:ml-10">
                  <div>
                    <p className="text-center lg:text-left step_num text_yellow font_heavy">
                      01.
                    </p>
                    <p className="font_bold text-2xl lg:text-4xl text-center lg:text-left text_black1 whitespace-pre-line">
                      {`Create a shopping list. Very simple.`}
                    </p>
                    <p className="my-3 font_medium text-base lg:text-xl text-center lg:text-left text_black1 whitespace-pre-line">
                      {`Fill your shopping list with everything from groceries to pharmacy essentials and more.`}
                    </p>
                  </div>

                  <div className="text-center lg:text-left mt-7">
                    <button className="w-80 lg:w-72 font_bold py-5 border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
                      Schedule a Dropp!
                    </button>
                  </div>
                </div>
              </div>
            </ParallaxLayer>

            <ParallaxLayer
              offset={1}
              speed={2}
              style={{ backgroundColor: "#ff6d6d" }}
            />

            <ParallaxLayer
              offset={1}
              speed={0.5}
              style={
                {
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // color: "white",
                }
              }
            >
              <div className="hidden lg:block lg:flex lg:flex-row">
                <div className="lg:w-1/2">
                  <img
                    src={Images.step02}
                    alt={`Have your shopping taken \ncare of by a Dropper.`}
                  />
                </div>
                <div className="lg:w-1/2 ml-0 lg:ml-10">
                  <div>
                    <p className="text-center lg:text-left step_num text_yellow font_heavy">
                      02.
                    </p>
                    <p className="font_bold text-2xl lg:text-4xl text-center lg:text-left text_black1 whitespace-pre-line">
                      {`Have your shopping \ntaken care of by a Dropper.`}
                    </p>
                    <p className="my-3 font_medium text-base lg:text-xl text-center lg:text-left text_black1 whitespace-pre-line">
                      {`Forget to add something? \nJust send your Dropper a \nmessage through the app. `}
                    </p>
                  </div>

                  <div className="text-center lg:text-left mt-7">
                    <button className="w-80 lg:w-72 font_bold py-5 border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
                      Schedule a Dropp!
                    </button>
                  </div>
                </div>
              </div>
            </ParallaxLayer>

            <ParallaxLayer
              offset={2}
              speed={2}
              // style={{ backgroundColor: "black" }}
            />

            <ParallaxLayer
              offset={2}
              speed={0.5}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="hidden lg:block lg:flex lg:flex-row">
                <div className="lg:w-1/2">
                  <img src={Images.step01} alt={`Get it when \nyou need it.`} />
                </div>
                <div className="lg:w-1/2 ml-0 lg:ml-10">
                  <div>
                    <p className="text-center lg:text-left step_num text_yellow font_heavy">
                      03.
                    </p>
                    <p className="font_bold text-2xl lg:text-4xl text-center lg:text-left text_black1 whitespace-pre-line">
                      {`Get it when \nyou need it.`}
                    </p>
                    <p className="my-3 font_medium text-base lg:text-xl text-center lg:text-left text_black1 whitespace-pre-line">
                      {`Need an order delivered later? \nSchedule it for later.`}
                    </p>
                  </div>

                  <div className="text-center lg:text-left mt-7">
                    <button className="w-80 lg:w-72 font_bold py-5 border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
                      Schedule a Dropp!
                    </button>
                  </div>
                </div>
              </div>
            </ParallaxLayer>
          </Parallax>
         
        </div> */}
      </div>
      <div
        className="w-4/5 lg:w-4/6 mx-auto pt-40 lg:pt-12"
        // style={{ marginTop: 800 }}
      >
        <div className="lg:flex lg:flex-row pt-32 pb-64">
          <div className="my-auto flex-1">
            <h1 className="text-4xl lg:text-6xl text-center lg:text-left text_black1 font_bold">
              Love to shop? <br />
              <span>Join our growing</span> <br />
              list of Droppers.
            </h1>
            <p className="my-7 font_medium text-lg lg:text-2xl text-center lg:text-left text_black1">
              Shop and deliver groceries to others <br /> and get paid for it!
            </p>
            <div className="text-center lg:text-left">
              <button
                className="my-5 w-72 lg:w-80 font_bold py-3 button text-lg rounded-xl shadow-sm text-white bg_primary"
                onClick={() =>
                  window.open("https://forms.gle/1UYShXQKgjpZheS67")
                }
              >
                Become a Dropper today!
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img
              src={bannerImage}
              alt="items"
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 duration-300"
            />
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
