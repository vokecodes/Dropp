import React from "react";

const Supermarkets = ({ supermartkets, galley }) => {
  return (
    <section>
      <div className="supermarkets_bg">
        <div className="w-4/5 mx-auto pt-10">
          <div className="flex-1 lg:mt-20">
            <h1 className="lg:text-6xl text-4xl text-white font_bold text-center mb-10">
              Over 1000 supermakets to shop from.
            </h1>
          </div>

          {/* <div className="w-full flex flex-row overflow-hidden">
            {supermartkets?.map((supermartket) => (
              <div
                key={supermartket.id}
                className="animate- shrink-0 w-64 h-16 p-4 flex flex-row items-center bg-white border rounded-xl shadow-2xl mr-5"
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
          </div> */}
        </div>
        <div className="pt-5 pb-20">
          <div class="logos-slideshow">
            <div class="mover-1"></div>
            {/* <div class="mover-2"></div> */}
          </div>
        </div>
      </div>
      <div className="mt__50">
        <div class="tech-slideshow">
          <div class="mover-1"></div>
          {/* <div class="mover-2"></div> */}
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
