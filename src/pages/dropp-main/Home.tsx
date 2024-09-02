import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactGA from "react-ga4";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useTransform, useScroll, motion } from "framer-motion";
import Header from "../../components/Header";
import Register from "../../components/Register";
import ResetPassword from "../../components/ResetPassword";
import NeedSomething from "../../components/NeedSomething";
import Supermarkets from "../../components/Supermarkets";
import Steps from "../../components/Steps";
import Banner from "../../components/Banner";
import Testimonials from "../../components/Testimonials";
import Footer from "../../components/Footer";
import { Images } from "../../config/images";
import Button from "../../components/Button";
// import Lenis from "@studio-freight/lenis/types";
import OptionCard from "../../components/OptionCard";
import OverlapCard from "../../components/OverlapCard";
import { smoothScrollTo } from "../../utils/scrollIntoView";
import { BASE_API_URL } from "../../_redux/urls";
import axios from "axios";
import { shallowEqual, useSelector } from "react-redux";

const CATEGORIES = [
  "Dine-In",
  "Private Chef",
  "Bar & Lounge",
  "Cafe & Bakery",
  "Food Truck",
  "Fast Casual",
];

const CATEGORIES_POST = [
  {
    image: "/images/restaurant.png",
    title: "Dine-In",
    subtitle: "Serve up a memorable dining experience.",
    description:
      "Greet and seat new guests like regulars and efficiently manage and optimize your tables.",
  },
  {
    image: "/images/private-chefs.png",
    title: "Private Chef",
    subtitle: "Succeed on your own terms.",
    description:
      "Attract new customers & build your personal brand with hospitality-driven software that works hard on your behalf.",
  },
  {
    image: "/images/Bar.png",
    title: "Bar & Lounge",
    subtitle: "Your bartenders' best friend.",
    description:
      "Get the right drinks out before the ice melt, and keep your space packed with thirsty customers.",
  },
  {
    image: "/images/Cafe.png",
    title: "Cafe & Bakery",
    subtitle: "The morning rush doesn’t have to feel so rushed.",
    description:
      "Give your margins a jolt and become a part of your customers daily rituals.",
  },
  {
    image: "/images/Food_truck.png",
    title: "Food Truck",
    subtitle: "Software that's built for the road.",
    description:
      "Excite your crowd with food truck-friendly ways to order and pay, and intuitive menus you’ll pick up fast.",
  },
  {
    image: "/images/Casual.png",
    title: "Fast Casual",
    subtitle: "Fire up efficiency.",
    description:
      "Turn up your volume, and get orders from counter to customer in record time.",
  },
];

const FAQS = [
  {
    id: 1,
    title: "What is Dropp?",
    description:
      " Dropp is the ultimate modern food business platform, making it easy to start, grow and scale your food business.",
  },
  {
    id: 2,
    title: "What makes Dropp different from traditional POS systems?",
    description:
      "Unlike conventional POS systems, which mainly focuses on processing transactions, Dropp is an all-in-one solution that enhances restaurants to sell more, streamline operations and automate for efficiency. It incorporates advanced features like a robust loyalty program and real-time analytics to help food business owners make make data driven decision.",
  },
  {
    id: 3,
    title: "How quickly can Dropp be up and running in my restaurant?",
    description:
      "Dropp is designed for quick and efficient onboarding. All you need is to decide, our team works diligently to ensure a smooth and speedy setup. Timelines is within 24hrs to a few days depending on the size and needs of your restaurant. Our goal is to minimize disruption.",
  },
  {
    id: 4,
    title: "Does Dropp support multi-location restaurants?",
    description:
      "Absolutely! Dropp is built with multi-location functionality in mind, making it an ideal choice for restaurant chains & franchises. The platform allows for centralised control over menus, promotions and pricing, while also offering the flexibility for individual customisations in these locations.",
  },
  {
    id: 5,
    title: "For which types of businesses is Dropp best suited?",
    description:
      "Whether you’re running a small café, a boutique restaurant, bars & lounge, food truck, fast casuals, ghost or commercial kitchens, corporate food companies, or a private chef, Dropp simplifies your business so you can focus on your craft and customers.",
  },
  {
    id: 6,
    title:
      "How secure is the Dropp system, particularly concerning customer data?",
    description:
      "Security is top priority for Dropp especially when it comes to protecting customer data. We employ robust methods and comply with local laws and regulations to safeguard all the information passing through our system.",
  },
];

const FEATURES = [
  {
    image: "/images/save_time.svg",
    subtitle: "SAVE TIME",
    title: "2hrs",
    description: "ON AVERAGE PER DAY",
  },
  {
    image: "/images/increase_satisfaction.svg",
    subtitle: "INCREASE SATISFACTION",
    title: "4.4/5",
    description: "SATISFACTION SCORE FROM DROPP USERS",
  },
  {
    image: "/images/increase_revenue.svg",
    subtitle: "INCREASE REVENUE",
    title: "20%",
    description: "OF OUR RESTAURANTS REPORT INCREASED REVENUE",
  },
];

const Home = () => {
  const navigate = useNavigate();

  // const { user } = useSelector(
  //   (state: any) => ({
  //     user: state.auth.user,
  //   }),
  //   shallowEqual
  // );

  // const getUser = useCallback(() => {
  //   const result = sessionStorage.getItem("auth");

  //   if (result) navigate("/chef");
  // }, [navigate]);

  // useEffect(() => {
  //   console.log({ user });
  // }, []);

  const [showModal, setShowModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const [selectedFaq, setSelectedFaq] = useState(FAQS[0]);

  const categoryPostRef = useRef<any>(null);
  const categoryRefs = useRef<any>([]);

  const scrollToCategoryPost = (index: any) => {
    const postElement = categoryRefs.current[index];

    if (postElement && categoryPostRef.current) {
      const offsetLeft = postElement.offsetLeft;

      console.log({ offsetLeft });

      categoryPostRef.current.scrollTo({
        left: offsetLeft,
        behavior: "smooth",
      });
    } else {
      console.error(`No element found for index: ${index}`);
    }
  };

  useEffect(() => {
    console.log('selectedCategory= ', selectedCategory)
    scrollToCategoryPost(CATEGORIES.indexOf(selectedCategory))
  }, [selectedCategory])

  const businessesRef = useRef<any>(null);
  const [businessScrollDirection, setBusinessScrollDirection] = useState(1); // 1 for right, -1 for left

  const scrollPostLeft = () => {
    if (categoryPostRef.current) {
      categoryPostRef.current.scrollLeft -= 500;
    }
  };

  const scrollPostRight = () => {
    if (categoryPostRef.current) {
      categoryPostRef.current.scrollLeft += 500;
    }
  };

  const scrollBusinessesPostLeft = () => {
    if (businessesRef.current) {
      businessesRef.current.scrollLeft -= 500;
    }
  };

  const scrollBusinessesPostRight = () => {
    if (businessesRef.current) {
      businessesRef.current.scrollLeft += 500;
    }
  };

  useEffect(() => {
    const businessScrollContainer = businessesRef.current;
    const businessScrollSpeed = 1.5; // Adjust the scroll speed
    let businessScrollInterval: any;

    const startBusinessScroll = () => {
      businessScrollInterval = setInterval(() => {
        // Scroll in the current direction
        businessScrollContainer.scrollLeft +=
          businessScrollSpeed * businessScrollDirection;

        // Check if we've reached the end of the scroll (right or left)
        if (
          businessScrollContainer.scrollLeft +
            businessScrollContainer.clientWidth >=
          businessScrollContainer.scrollWidth
        ) {
          setBusinessScrollDirection(-1); // Switch to left
        } else if (businessScrollContainer.scrollLeft <= 0) {
          setBusinessScrollDirection(1); // Switch to right
        }
      }, 20);
    };

    const stopBusinessScroll = () => {
      clearInterval(businessScrollInterval);
    };

    businessScrollContainer.addEventListener("mouseenter", stopBusinessScroll);
    businessScrollContainer.addEventListener("mouseleave", startBusinessScroll);

    startBusinessScroll();

    return () => {
      stopBusinessScroll();
      businessScrollContainer.removeEventListener(
        "mouseenter",
        stopBusinessScroll
      );
      businessScrollContainer.removeEventListener(
        "mouseleave",
        startBusinessScroll
      );
    };
  }, [businessScrollDirection]);

  const actionsContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: actionsContainerRef,

    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  const [activeCard, setActiveCard] = useState(0);

  const handleScrollTo = (id: any, duration: any) => {
    // console.log('hvbhdgjkgbkjgf= ', id, duration)
    smoothScrollTo(id, duration);
  };

  const bookDemoSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    email: Yup.string().email().required("Email is required."),
    phoneNumber: Yup.string()
      .min(11, "Phone number is not valid.")
      .required("Phone number is required."),
    restaurantName: Yup.string().required("Restaurant name is required."),
    message: Yup.string().optional(),
  });

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const bookADemo = (values: any, formikBag: any) => {
    axios
      .post(`${BASE_API_URL}/dropp-book-demo`, {
        ...values,
      })
      .then(({ data }) => {
        const { success } = data;
        if (success) setSuccess(true);
      })
      .catch((error) => {
        const { message } = error.response.data;
        if (message) setErrorMessage(message);
      })
      .finally(() => formikBag.setSubmitting(false));
  };

  return (
    <>
      <div className={`${showModal ? "blur-bg" : ""}`}>
        {/* Header */}
        <Header
          itemsImage={Images.itemsGif}
          setShowModal={setShowModal}
          handleScrollTo={handleScrollTo}
          setSelectedCategory={setSelectedCategory}
        />

        <div
          className="bg-[#24412C] pt-20 lg:pt-32 h-[960px] lg:h-[820px] relative"
          id="restaurant"
        >
          <div className="lg:px-32 px-6">
            <p className="text-white text-center text-3xl lg:text-5xl font_bold">
              A Dropp™ for every food business.
            </p>
            <div className="hidden lg:block w-full h-full relative">
              <div className="w-full my-5 flex justify-center space-x-4 overflow-x-auto my-scroll-container">
                {CATEGORIES.map((cat, i) => (
                  <div
                    key={i}
                    className={`${
                      selectedCategory === cat ? "bg-[#FEC828]" : "bg-[#06C167]"
                    } flex-shrink-0 px-4 py-2 rounded-full cursor-pointer ease-out duration-300`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      scrollToCategoryPost(i);
                    }}
                  >
                    <p className="text-[#385C44] font_bold text-lg uppercase">
                      {cat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:hidden w-full h-full relative">
            <div className="w-full my-5 flex flex-row items-center justify-start space-x-4 overflow-x-auto my-scroll-container">
              {CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  className={`${
                    selectedCategory === cat ? "bg-[#FEC828]" : "bg-[#06C167]"
                  } flex-shrink-0 px-4 py-2 rounded-full cursor-pointer ease-out duration-300`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    scrollToCategoryPost(i);
                  }}
                >
                  <p className="text-[#385C44] font_bold text-lg uppercase">
                    {cat}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="z-30 absolute w-full h-full lg:mx-auto top-64">
            <div className="flex items-center relative">
              <div
                className="absolute z-20 top-[10rem] lg:top-1/2 left-3 lg:left-10 w-[60px] h-[60px] shadow-2xl rounded-full bg-white flex items-center justify-center cursor-pointer"
                onClick={scrollPostLeft}
              >
                <img src="/images/arrow-left.svg" alt="arrow-left" />
              </div>
              <div
                className="w-full my-5 flex space-x-4 overflow-x-auto my-scroll-container"
                ref={categoryPostRef}
              >
                {CATEGORIES_POST.map((cat, i) => (
                  <div
                    key={i}
                    ref={(el) => (categoryRefs.current[i] = el)}
                    className={`category-post-card w-[344px] lg:w-[36%] flex-shrink-0 bg-white p-6 rounded-2xl lg:flex gap-5 ${
                      i === 0 ? "ml-5 lg:ml-20" : ""
                    }`}
                  >
                    <div className="w-[280px] h-[245px] lg:w-[200px] lg:h-[336px]">
                      <img
                        src={cat.image}
                        alt="restaurant"
                        className="w-[280px] h-[245px] lg:w-[200px] lg:h-[336px] object-cover rounded-2xl"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center bg-white lg:shadow-2xl rounded-2xl">
                      <div className="w-full lg:px-16 px-3 py-8 lg:py-0">
                        <p className="text-xl font_bold text-[#06C16B] uppercase tracking-wider">
                          {cat.title}
                        </p>
                        <p className="text-2xl font_bold text-[#385C44]">
                          {cat.subtitle}
                        </p>
                        <p className="mt-2 text-lg font_medium text-[#8F8F8F]">
                          {cat.description}
                        </p>
                        <div className="my-3">
                          <Link to={"/auth/register"} className="w-44">
                            <Button
                              title="Get started"
                              showIcon
                              extraClasses="px-4 justify-between"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="absolute z-10 top-[10rem] lg:top-1/2 right-3 lg:right-10 w-[60px] h-[60px] shadow-2xl rounded-full bg-white flex items-center justify-center cursor-pointer"
                onClick={scrollPostRight}
              >
                <img src="/images/arrow-right.svg" alt="arrow-right" />
              </div>
            </div>
          </div>

          <div className="absolute lg:w-full z-10 bottom-8 lg:bottom-10">
            <div className="lg:flex lg:justify-center lg:items-center">
              <img src="/images/restaurants-logo.svg" alt="restaurants-logo" />
            </div>
          </div>
        </div>

        <div
          className="lg:px-32 px-6 pt-32"
          style={{
            backgroundImage: `url('/images/home-banner-vec.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="-mt-10">
              <p className="text-3xl lg:text-5xl text_black text-center font_bold">
                All the tools you need to succeed in <br /> one place!
              </p>
              <p className="text-lg lg:text-xl text-[#4A443A] text-center my-3">
                Dropp gives you the power to connect the front and back of house
                while <br />
                freeing you up to focus on the customer experience.
              </p>
            </div>
          </div>
        </div>

        <div className="pb-24">
          <div className="overlapping-cards-container">
            <div className="overlapping-card">
              <div
                className={`category-post-card w-full lg:w-[1148px] bg-[#99C446] rounded-2xl lg:flex lg:justify-around px-11 pt-8 lg:pt-12 pb-10 lg:pb-0`}
                id="ordering-tools"
              >
                <div className="">
                  <img src="/images/Ordering.png" alt="Ordering" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-5xl text-[#00170C] font_bold mb-5">
                    Ordering <br /> tools!
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg text-[#00170C] font_medium">
                      QR Digital Menu
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-lg text-[#00170C] font_medium">
                      Online Ordering Link
                    </p>
                  </div>
                  <p className="text-lg text-[#00170C] font_medium">
                    Dropp Takeout™ (coming soon)
                  </p>
                  <Link to={"/auth/register"} className="w-44">
                    <button
                      type="submit"
                      className="mt-6 inline-flex bg-white text-[#00170C] items-center justify-between px-4 py-2 whitespace-nowrap text-base shadow-sm cursor-pointer rounded-lg font_bold"
                      onClick={() => {}}
                    >
                      Get started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        width={16}
                        height={16}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="overlapping-card">
              <div
                className={`category-post-card w-full lg:w-[1148px] bg-[#385C44] rounded-2xl lg:flex lg:justify-around px-11 pt-8 lg:pt-12 pb-10 lg:pb-0`}
                id="operation-tools"
              >
                <div className="flex flex-col justify-center">
                  <p className="text-5xl text-white font_bold mb-5">
                    Operations <br /> tools!
                  </p>
                  <p className="text-lg text-white font_medium">
                    Kitchen Display System (KDS)
                  </p>
                  <p className="text-lg text-white font_medium">
                    Waiter & Staff Mgt.
                  </p>
                  <p className="text-lg text-white font_medium">
                    Menu & Order Mgt.
                  </p>
                  <Link to={"/auth/register"} className="w-44">
                    <button
                      type="submit"
                      className="mt-6 inline-flex bg-white text-[#00170C] items-center justify-between px-4 py-2 whitespace-nowrap text-base shadow-sm cursor-pointer rounded-lg font_bold"
                      onClick={() => {}}
                    >
                      Get started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        width={16}
                        height={16}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div>
                  <img src="/images/Operation.png" alt="Operation" />
                </div>
              </div>
            </div>
            <div id="overlappingCard" className="overlapping-card">
              <div
                className={`category-post-card w-full lg:w-[1148px] bg-[#9E6A55] rounded-2xl lg:flex lg:justify-around px-11 pt-8 lg:lg:pt-12 pb-10 lg:pb-0`}
                id="marketing-tools"
              >
                <div className="">
                  <img src="/images/Marketing.png" alt="Marketing" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-5xl text-white font_bold mb-5">
                    Marketing <br /> tools!
                  </p>
                  <p className="text-lg text-white font_medium">
                    Discounts & Loyalty
                  </p>
                  <p className="text-lg text-white font_medium">
                    Customised Website
                  </p>
                  <p className="text-lg text-white font_medium">
                    Customer Engagement Tools
                  </p>
                  <p className="text-lg text-white font_medium">
                    Homemade by Dropp™
                  </p>
                  <Link to={"/auth/register"} className="w-44">
                    <button
                      type="submit"
                      className="mt-6 inline-flex bg-white text-[#9E6A55] items-center justify-between px-4 py-2 whitespace-nowrap text-base shadow-sm cursor-pointer rounded-lg font_bold"
                      onClick={() => {}}
                    >
                      Get started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        width={16}
                        height={16}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="overlapping-card">
              <div
                className={`category-post-card w-full lg:w-[1148px] bg-[#99C446] rounded-2xl lg:flex lg:justify-around px-11 pt-8 lg:lg:pt-12 pb-10 lg:pb-0`}
                id="analytics-insight"
              >
                <div className="flex flex-col justify-center">
                  <p className="text-5xl text-[#00170C] font_bold mb-5">
                    Analytics &
                    <br /> Insights!
                  </p>
                  <p className="text-lg text-[#00170C] font_medium">
                    Tools to earn more
                  </p>
                  <p className="text-lg text-[#00170C] font_medium">
                    Tools to save more
                  </p>
                  <p className="text-lg text-[#00170C] font_medium">
                    Tools to understand your customer
                  </p>
                  <Link to={"/auth/register"} className="w-44">
                    <button
                      type="submit"
                      className="mt-6 inline-flex bg-white text-[#00170C] items-center justify-between px-4 py-2 whitespace-nowrap text-base shadow-sm cursor-pointer rounded-lg font_bold"
                      onClick={() => {}}
                    >
                      Get started
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        width={16}
                        height={16}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div>
                  <img src="/images/Analytics.png" alt="Analytics" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full ">
          <img
            src="/images/restaurant2a.png"
            alt="restaurant2"
            className="w-full h-[451px] lg:h-[502px] object-cover"
          />

          <div className="w-full absolute top-72 lg:top-80">
            <div className="w-4/5 mx-auto lg:flex lg:justify-center gap-3 lg:gap-5">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="lg:w-[26%] bg-white rounded-3xl p-11 shadow-2xl mb-3 lg:mb-8"
                >
                  <img src={f.image} alt="save_time" className="w-28 h-28" />
                  <p className="text-xl uppercase text-[#99C446] font_bold tracking-wider mt-10">
                    {f.subtitle}
                  </p>
                  <div className="ms-2">
                    <p className="text-6xl text-[#99C446] font_heavy mt-5">
                      {f.title}
                    </p>
                    <p className="text-base uppercase text-[#8F8F8F] font_bold">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-[72rem] lg:pt-96 pb-16 lg:pb-32 header_bg">
          <div className="lg:px-32 px-6 flex flex-col items-center">
            <p className="hidden lg:block text-3xl lg:text-5xl text_black text-center font_bold">
              150+ food businesses use <br /> Dropp to get the job done.
            </p>
            <p className="lg:hidden text-3xl lg:text-5xl text_black text-center font_bold">
              150+ food businesses use Dropp to get the job done.
            </p>
          </div>

          <div className="w-full overflow-x-hidden flex flex-row items-center relative">
            <div
              className="absolute z-20 left-3 lg:left-10 w-[60px] h-[60px] shadow-2xl rounded-full bg-white flex items-center justify-center cursor-pointer"
              onClick={scrollBusinessesPostLeft}
            >
              <img src="/images/arrow-left.svg" alt="arrow-left" />
            </div>

            <div
              className="my-20 flex space-x-4 overflow-x-auto my-scroll-container animate-scroll"
              ref={businessesRef}
            >
              <div className="flex-shrink-0">
                <img src="/images/pappies-group.png" alt="pappies" />
              </div>
              <div className="flex-shrink-0">
                <img src="/images/funmi.png" alt="funmi" />
              </div>
              <div className="flex-shrink-0">
                <img src="/images/feli.png" alt="feli" />
              </div>
              <div className="flex-shrink-0">
                <img src="/images/bola.png" alt="bola" />
              </div>
              <div className="flex-shrink-0">
                <img src="/images/okonkwo.png" alt="okonkwo" />
              </div>
            </div>

            <div
              className="absolute z-10 right-3 lg:right-10 w-[60px] h-[60px] shadow-2xl rounded-full bg-white flex items-center justify-center cursor-pointer"
              onClick={scrollBusinessesPostRight}
            >
              <img src="/images/arrow-right.svg" alt="arrow-right" />
            </div>
          </div>
          <div className="lg:mt-20 flex justify-center">
            <Link to={"/auth/register"} className="w-52">
              <Button title="Join them!" extraClasses="" />
            </Link>
          </div>
        </div>

        <div className="relative bg-[#24412C]" id="pricing">
          <div className="lg:px-32 pt-16 lg:pt-32 p-6 relative z-50">
            <p className="text-3xl lg:text-5xl text-white font_bold text-center">
              Built for growth, grows with you.{" "}
            </p>
            <p className="text-lg lg:text-xl text-white font_regular text-center my-3">
              Flexible plans to make it easy to start or switch.
            </p>

            <div className="lg:w-4/5 mx-auto mt-10">
              <div className="lg:flex justify-center gap-8">
                <div className="bg-[#99C446] rounded-2xl p-8 mb-10 relative">
                  <p className="lg:text-5xl text-3xl text-[#24412C] font_bold">
                    Restaurants
                  </p>
                  <p className="text-lg lg:text-xl text-[#4A443A] font_medium my-3">
                    For all type and size of restaurants looking to boost
                    revenue and streamline operations.
                  </p>
                  <div>
                    <p className="text-white text-3xl lg:text-5xl font_bold">
                      ₦20,000/<span className="text-lg">month</span>
                    </p>
                    <p className="text-white text-lg lg:text-xl font_bold">
                      +2.5% commission fee
                    </p>
                    <div className="border border-white my-3" />
                  </div>
                  <div className="mt-5 mb-20">
                    <ul className="list-disc pl-5">
                      <li className="text-lg text-[#4A443A] font_regular">
                        Menu management
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Customised website
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Kitchen display system
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Sales reports and insights
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Payment collection
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Online ordering
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Customer management
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Loyalty features
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        QR digital menu
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Pay at table
                      </li>
                    </ul>
                  </div>
                  <Link to={"/auth/register"} className="w-[84%]">
                    <button className="absolute bottom-5 bg-white inline-flex items-center justify-center px-10 py-2 font_bold whitespace-nowrap text-base text-[#24412C] shadow-sm cursor-pointer rounded-full">
                      Get started
                    </button>
                  </Link>
                </div>
                <div className="bg-[#99C446] rounded-2xl p-8 mb-10 relative">
                  <p className="text-3xl lg:text-5xl text-[#24412C] font_bold">
                    Private Chefs
                  </p>
                  <p className="text-lg lg:text-xl text-[#4A443A] font_medium my-3">
                    Ideal for private/independent chefs who just want to take
                    online orders.
                  </p>
                  <div>
                    <p className="text-white text-3xl lg:text-5xl font_bold uppercase">
                      Free
                    </p>
                    <p className="text-white text-lg lg:text-xl font_bold">
                      +15% commission fee
                    </p>
                    <div className="border border-white my-3" />
                  </div>
                  <div className="mt-5 mb-20">
                    <ul className="list-disc pl-5">
                      <li className="text-lg text-[#4A443A] font_regular">
                        Menu management
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Customised website
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Payment collection
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Online ordering
                      </li>
                      <li className="text-lg text-[#4A443A] font_regular">
                        Customer management
                      </li>
                    </ul>
                  </div>
                  <Link to={"/auth/register"} className="w-[84%]">
                    <button className="absolute bottom-5 bg-white inline-flex items-center justify-center px-10 py-2 font_bold whitespace-nowrap text-base text-[#24412C] shadow-sm cursor-pointer rounded-full">
                      Get started
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div id="demoForm" className="lg:w-4/5 mx-auto">
              <div className="bg-white rounded-2xl lg:p-20 p-6">
                <p className="lg:text-5xl text-3xl text_black font_bold text-center">
                  Get a free online demo from our <br /> team of restaurant
                  pros.
                </p>
                <p className="lg:text-xl text-lg text-[#4A443A] font_medium text-center my-3">
                  We’ll follow up within 24 hours to find a convenient time for
                  you.
                </p>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    restaurantName: "",
                    message: "",
                  }}
                  validationSchema={bookDemoSchema}
                  onSubmit={(values, formikBag) => {
                    console.log("values= ", values);
                    bookADemo(values, formikBag);
                  }}
                >
                  {(props) => (
                    <div className="mt-12">
                      <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-x-3">
                        <div className="mb-3 w-full">
                          <Field
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            className="block w-full bg-[#F1F1F1] rounded-xl font_medium py-5 pl-8 pr-4 text-xl outline-none mb-3"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="span"
                            className="text-xs text-red-500 font_regular"
                          />
                        </div>

                        <div className="mb-3 w-full">
                          <Field
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            className="block w-full bg-[#F1F1F1] rounded-xl font_medium py-5 pl-8 pr-4 text-xl outline-none mb-3"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="span"
                            className="text-xs text-red-500 font_regular"
                          />
                        </div>
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="email"
                          placeholder="Email"
                          className="block w-full bg-[#F1F1F1] rounded-xl font_medium py-5 pl-8 pr-4 text-xl outline-none mb-3"
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-xs text-red-500 font_regular"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          className="block w-full bg-[#F1F1F1] rounded-xl font_medium py-5 pl-8 pr-4 text-xl outline-none mb-3"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="span"
                          className="text-xs text-red-500 font_regular"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="restaurantName"
                          placeholder="Restaurant Name"
                          className="block w-full bg-[#F1F1F1] rounded-xl font_medium py-5 pl-8 pr-4 text-xl outline-none mb-3"
                        />
                        <ErrorMessage
                          name="restaurantName"
                          component="span"
                          className="text-xs text-red-500 font_regular"
                        />
                      </div>
                      <div>
                        <Field
                          as="textarea"
                          name="message"
                          placeholder="Message"
                          className="block w-full bg-[#F1F1F1] rounded-xl font_medium py-5 pl-8 pr-4 text-xl outline-none mb-3"
                        />
                        <ErrorMessage
                          name="message"
                          component="span"
                          className="text-xs text-red-500 font_regular"
                        />
                      </div>
                      {errorMessage && (
                        <div className="w-full py-2">
                          <p className="text-center text-xs text-red-400">
                            {errorMessage}
                          </p>
                        </div>
                      )}
                      {success && (
                        <div className="w-full py-2">
                          <p className="text-center text-lg text-green-800">
                            Demo booked.
                          </p>
                        </div>
                      )}
                      <Button
                        title="Book a Demo"
                        extraClasses="mt-5 w-60 py-3"
                        loading={props.isSubmitting}
                        onClick={props.handleSubmit}
                      />
                    </div>
                  )}
                </Formik>
              </div>
            </div>
            <div className="lg:w-4/5 mx-auto mt-10">
              <div className="bg-white rounded-2xl lg:p-20 p-6">
                <p className="lg:text-5xl lg:pt-0 pt-10 text-3xl text_black font_bold text-center">
                  FAQs
                </p>
                <div className="lg:mt-16 mt-8">
                  {FAQS.map((f, i) => (
                    <div
                      key={i}
                      className={`${
                        FAQS.length - 1 !== i && "border-b border-[#BDBDBD]"
                      } p-6 cursor-pointer`}
                      onClick={() => setSelectedFaq(f)}
                    >
                      <div className="flex justify-between">
                        <p className="text-lg lg:text-2xl text-black font_medium">
                          {f.title}
                        </p>
                        <div>
                          {selectedFaq.id === f.id ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#33A36D"
                              width={25}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#33A36D"
                              width={25}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {selectedFaq.id === f.id && (
                        <p className="text-base lg:text-lg text-[#6F6F6F] font_medium my-5">
                          {f.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[-4rem] lg:bottom-[-20rem] w-full z-10">
            <div className="">
              <img
                src="/images/restaurants-logo2.svg"
                className="w-full"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Need Something */}
        {/* <NeedSomething
          items={items}
          title="Dropp"
          setShowModal={setShowModal}
        /> */}

        {/* Supermarkets */}
        {/* <Supermarkets supermartkets={supermartkets} galley={galley} /> */}

        {/* Steps */}
        {/* <Steps
          bannerImage={Images.boy}
          businesses={businesses}
          setShowModal={setShowModal}
        /> */}

        {/* Banner */}
        {/* <Banner bannerImage={Images.boy} businesses={businesses} /> */}

        {/* Testimonials */}
        {/* <Testimonials setShowModal={setShowModal} /> */}

        {/* Footer */}
        <Footer logo={Images.logo} />
      </div>
    </>
  );
};

export default Home;
