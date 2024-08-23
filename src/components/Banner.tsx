import React from "react";

const Banner = ({ bannerImage, businesses }: any) => {
  return (
    <section className="header_bg">
      <div className="w-4/5 lg:w-4/6 mx-auto pt-40 lg:pt-12">
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
            {businesses?.map((business: any, i: number) => {
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

export default Banner;
