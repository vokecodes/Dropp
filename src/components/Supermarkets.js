import React from "react";

const Supermarkets = ({ supermartkets, galley }) => {
  return (
    <section>
      <div className="supermarkets_bg pt-20 pb-60">
        <div className="w-4/5 mx-auto">
          <h1 className="lg:text-6xl text-4xl text-white font_bold text-center">
            Shop from over 1000+ stores and supermarkets.
          </h1>
        </div>
        <div className="pt-14 overflow-hidden">
          <div className="brands">
            <div className="flex flex-row ">
              {supermartkets?.map((supermartket) => (
                <div
                  key={supermartket.id}
                  className="shrink-0 w-72 h-16 p-4 flex flex-row items-center bg-white border rounded-xl shadow-2xl mr-5"
                >
                  <img
                    src={supermartket.image}
                    alt={supermartket.title}
                    className="mr-5"
                  />
                  <p className="font_medium text-black text-base">
                    {supermartket.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="pt-14 overflow-hidden">
          <div className="logos-slideshow">
            <div className="mover-1"></div>
          </div>
        </div> */}

        {/* <div className="mt-5 absolute">
          <div className="tech-slideshow">
            <div className="mover-1"></div>
          </div>
        </div> */}
        <div className="mt-5 absolute">
          <div className="overflow-hidden">
            {/* <div style={{ width: "100000px" }}> */}
            <div className="galley">
              <div className="flex flex-row ">
                {galley?.map((pic) => (
                  <img src={pic} alt="gallery" className="mr-5" />
                ))}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* <div className="mt__50 flex flex-row overflow-hidden">
        {galley?.map((pic) => (
          <img src={pic} alt="gallery" className="mr-5" />
        ))}
      </div> */}
    </section>
  );
};

export default Supermarkets;
