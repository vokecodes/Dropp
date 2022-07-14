import React from "react";

const Supermarkets = ({ supermartkets, galley }) => {
  return (
    <section>
      <div className="supermarkets_bg pt-20 pb-60">
        <div className="w-4/5 mx-auto">
          <h1 className="lg:text-6xl text-4xl text-white font_bold text-center">
            Shop from over 1000+ stores and supermarkets.
          </h1>

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
        <div className="pt-14 overflow-hidden">
          <div class="logos-slideshow">
            <div class="mover-1"></div>
          </div>
        </div>

        <div className="mt-5 absolute">
          <div class="tech-slideshow">
            <div class="mover-1"></div>
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
