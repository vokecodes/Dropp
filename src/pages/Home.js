import React, { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import Header from "../components/Header";
import Login from "../components/Login";
import NeedSomething from "../components/NeedSomething";
import Supermarkets from "../components/Supermarkets";
import Steps from "../components/Steps";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { Images } from "../config/images";

const items = [
  {
    id: 0,
    title: "Fruits",
    image: Images.fruits,
    mobileImage: Images.fruits_mobile,
  },
  {
    id: 1,
    title: "Drinks",
    image: Images.drinks,
    mobileImage: Images.drinks_mobile,
  },
  {
    id: 2,
    title: "Canned food",
    image: Images.canned_food,
    mobileImage: Images.canned_food_mobile,
  },
  {
    id: 3,
    title: "Snacks",
    image: Images.snacks,
    mobileImage: Images.snacks_mobile,
  },
  {
    id: 4,
    title: "Bread & Bakery",
    image: Images.bread_bakery,
    mobileImage: Images.bread_bakery_mobile,
  },
  {
    id: 5,
    title: "Spices",
    image: Images.spices,
    mobileImage: Images.spices_mobile,
  },
  {
    id: 6,
    title: "Condiments",
    image: Images.condiments,
    mobileImage: Images.condiments_mobile,
  },
  {
    id: 7,
    title: "More",
    image: Images.more,
    mobileImage: Images.more_mobile,
  },
];

const supermartkets = [
  {
    id: 1,
    title: "Addide Supermarket",
    image: Images.addide_sm,
  },
  {
    id: 2,
    title: "Next Cash & Carry",
    image: Images.next_cash_carry_sm,
  },
  {
    id: 3,
    title: "Spar Market",
    image: Images.spar_sm,
  },
  {
    id: 4,
    title: "FoodCo",
    image: Images.foodco_sm,
  },
  {
    id: 5,
    title: "Jendol Superstores",
    image: Images.jendol_sm,
  },
  {
    id: 6,
    title: "Justrite Superstore",
    image: Images.justrite_sm,
  },
  {
    id: 6,
    title: "Supermark Nigeria",
    image: Images.supermart_sm,
  },
  {
    id: 7,
    title: "The Hygiene Supermarket",
    image: Images.hygiene_sm,
  },
  {
    id: 8,
    title: "Twins Faja Supermarket",
    image: Images.twins_faja_sm,
  },
  {
    id: 9,
    title: "Bargains Supermarket",
    image: Images.bargains_sm,
  },
  {
    id: 10,
    title: "Emel Supermarket Solutions",
    image: Images.emel_sm,
  },
  {
    id: 11,
    title: "Buy 4 Less Supermarket",
    image: Images.buy_4_less_sm,
  },
  {
    id: 12,
    title: "CMart Stores",
    image: Images.cmart_sm,
  },
  {
    id: 13,
    title: "Market Square",
    image: Images.market_square_sm,
  },
];

const galley = [
  Images.gImage1,
  Images.gImage2,
  Images.gImage3,
  Images.gImage4,
  Images.gImage5,
  Images.gImage6,
  Images.gImage7,
  Images.gImage8,
  Images.gImage9,
  Images.gImage1,
  Images.gImage2,
  Images.gImage3,
  Images.gImage4,
  Images.gImage5,
  Images.gImage6,
  Images.gImage7,
  Images.gImage8,
  Images.gImage9,
];

const steps = [
  {
    id: 1,
    image: Images.step01,
    number: "01.",
    title: `Create a shopping list. \n Very simple.`,
    description: `Fill your shopping list with everything from \n groceries to pharmacy essentials and more.`,
  },
  // {
  //   id: 2,
  //   image: Images.step02,
  //   number: "02.",
  //   title: `Have your shopping taken \ncare of by a Dropper.`,
  //   description: `Forget to add something? Just send your \nDropper a message through the app.`,
  // },
  // {
  //   id: 3,
  //   image: Images.step03,
  //   number: "03.",
  //   title: `Get it when you \nneed it.`,
  //   description: `Need an order delivered later? \nSchedule it for later.`,
  // },
];

const businesses = [
  { id: 0, title: "Paga", image: Images.paga, mobileImage: Images.paga_mobile },
  {
    id: 1,
    title: "Eight Studio",
    image: Images.studio8,
    mobileImage: Images.studio8_mobile,
  },
  {
    id: 2,
    title: "Vvend",
    image: Images.vvend,
    mobileImage: Images.vvend_mobile,
  },
  {
    id: 3,
    title: "Remotely",
    image: Images.remotely,
    mobileImage: Images.remotely_mobile,
  },
];

const Home = () => {
  useEffect(() => {
    ReactGA.initialize("G-EHK6CS7TX2");
    ReactGA.send(window.location.pathname + window.location.search);
  }, []);

  const [step1Class] = useState(false);
  const [step2Class] = useState(false);
  const [step3Class] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("scroll", pop);

  //   return () => window.removeEventListener("scroll", pop);
  // }, []);

  // const pop = () => {
  //   if (window.scrollY > 2500) {
  //     // setX(classes.Swipe);
  //     setStep1Class(true);
  //   }

  //   if (window.scrollY > 2700) {
  //     // setNavColor('red');
  //     setStep2Class(true);
  //     console.log("2600");
  //   }

  //   if (window.scrollY > 2800) {
  //     // setNavColor('red');
  //     setStep3Class(true);
  //     console.log("2700");
  //   }
  // };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Header */}
      <Header itemsImage={Images.items} setShowModal={setShowModal} />

      {/* Need Something */}
      <NeedSomething items={items} title="Dropp" />

      {/* Supermarkets */}
      <Supermarkets supermartkets={supermartkets} galley={galley} />

      {/* Steps */}
      <Steps bannerImage={Images.boy} businesses={businesses} />

      {/* Banner */}
      {/* <Banner bannerImage={Images.boy} businesses={businesses} /> */}

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer logo={Images.logo} />

      <Login showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Home;
