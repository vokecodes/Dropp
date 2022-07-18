import React from "react";

const Banner = ({ bannerImage, businesses }) => {
  return (
    <section className="header_bg">
      <div className="w-4/5 lg:w-4/6 mx-auto">
        <div className="lg:flex lg:flex-row pt-32 pb-64">
          <div className="my-auto flex-1">
            <h1 className="text-3xl lg:text-6xl text_black1 font_bold">
              Love to shop? <br />
              <span>Join our growing</span> <br />
              list of Droppers.
            </h1>
            {/* <h1 className="lg:hidden text-3xl text_black1 font_bold">
              Love to shop? <br />
              Join our growing <br />
              list of Droppers.
            </h1> */}
            <p className="my-7 font_medium text-lg lg:text-2xl text-left text_black1">
              Shop and deliver groceries to others <br /> and get paid for it!
            </p>
            <button className="my-5 w-72 lg:w-80 font_bold py-3 button text-lg rounded-xl shadow-sm text-white bg_primary">
              Become a Dropper today!
            </button>
          </div>
          <div className="w-1/2">
            <img src={bannerImage} alt="items" />
          </div>
        </div>
        <div
          className="bg-white rounded-xl shadow-md py-16"
          style={{
            width: "inherit",
            position: "absolute",
            marginTop: "-180px",
          }}
        >
          <h2 className="text-2xl lg:text-3xl font_medium text_gray text-center">
            Trusted by some of the notable businesses around.
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
                    className="w-36 lg:hidden mb-5"
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
