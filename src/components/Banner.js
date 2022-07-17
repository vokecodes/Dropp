import React from "react";

const Banner = ({ bannerImage, businesses }) => {
  return (
    <section className="header_bg">
      <div className="w-4/5 lg:w-4/6 mx-auto">
        <div className="lg:flex lg:flex-row pt-32 pb-64">
          <div className="">
            <h1 className="hidden lg:block lg:text-4xl text-2xl font_bold">
              Love to shop? <br /> Join our growing <br /> network of <br />
              Droppers and <br />
              earn extra cash <br />
              doing what you love.
            </h1>
            <h1 className="lg:hidden text-3xl text-4xl font_bold">
              Love to shop? Join our growing network of Droppers and earn extra
              cash doing what you love.
            </h1>
            <p className="lg:block hidden my-7 font_regular text-lg text-left">
              Shop and deliver groceries to others <br /> and get paid for it!
            </p>
            <button className="my-5 w-72 lg:w-80 font_bold py-3 button border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
              Become a Dropper today!
            </button>
          </div>
          <div className="w_550">
            <img src={bannerImage} alt="items" />
          </div>
        </div>
        <div
          className="bg-white rounded-xl shadow-md py-10"
          style={{
            width: "inherit",
            position: "absolute",
            marginTop: "-180px",
          }}
        >
          <h2 className="text-2xl lg:text-3xl px-5 font_medium text_gray text-center">
            Trusted by some of the notable businesses around.
          </h2>
          <div className="flex flex-row flex-wrap justify-between px-5 pt-5">
            {businesses?.map((business) => (
              <React.Fragment key={business.id}>
                <img
                  src={business.image}
                  alt={business.title}
                  className="mb-5 hidden lg:block"
                />
                <img
                  src={business.mobileImage}
                  alt={business.title}
                  className="mb-5 lg:hidden"
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
