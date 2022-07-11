import React from "react";

const Banner = ({ bannerImage, businesses }) => {
  return (
    <section className="header_bg">
      <div className="w-4/5 mx-auto">
        <div className="lg:flex lg:flex-row pt-32 pb-80">
          <div className="flex-1 my-auto">
            <h1 className="lg:text-6xl text-4xl font_bold">
              Love to shop? <br /> Join our growing <br /> list of Droppers.
            </h1>
            <p className="lg:block hidden my-7 font_regular text-lg text-left">
              Shop and deliver groceries to others <br /> and get paid for it!
            </p>
            <button className="w-72 lg:w-80 font_bold py-3 button border border-transparent text-lg rounded-xl shadow-sm text-white bg_primary">
              Become a Dropper today
            </button>
          </div>
          <div className="mt-10">
            <img src={bannerImage} alt="items" />
          </div>
        </div>
        <div
          className="bg-white rounded-xl shadow-md h-96 lg:h-80 py-10 lg:py-20"
          style={{
            width: "inherit",
            position: "absolute",
            marginTop: "-260px",
          }}
        >
          <h2 className="text-2xl lg:text-3xl font_medium text_gray text-center">
            Trusted by some of the notable businesses around.
          </h2>
          <div className="lg:flex lg:flex-row lg:justify-between px-20 pb-20 pt-5 lg:pt-10">
            {businesses?.map((business) => (
              <img
                key={business.id}
                src={business.image}
                alt={business.title}
                className="mr-10 mb-5"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
