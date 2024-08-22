import React, { useState } from "react";
import Button from "../Button";

interface FAQProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

const FAQ: React.FC<FAQProps> = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col lg:p-16">
      <h1 className="hidden lg:block text-center text-3xl card_headerText font_bold">
        Frequently asked questions
      </h1>
      <h1 className="lg:hidden text-center text-3xl card_headerText font_bold">
        Frequently asked <br /> questions
      </h1>
      <div className="px-4 py-8">
        {questions.map((question, index) => (
          <div key={index}>
            <div
              className={`cursor-pointer flex items-center justify-between px-4 py-2  border-b-2 border-gray-200 ${
                openIndex === index ? "bg-white " : ""
              }`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <p className="text-sm lg:text-lg input_text font_medium py-3">
                {question.question}
              </p>
              <div className="flex items-center">
                {/* <p
                  className={`${
                    openIndex === index ? "rotate-180" : ""
                  } transition duration-300 ease-in-out transform input_text`}
                >
                  &#9662;
                </p> */}
                {openIndex === index ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#585858"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#585858"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>
            </div>
            {openIndex === index && (
              <p className="px-4 py-2  font_regular">{question.answer}</p>
            )}
          </div>
        ))}
      </div>
      <div className="my-5 flex flex-col lg:flex-row justify-center items-center">
        <p className="text-lg gray_text_color font_medium lg:mr-10 mb-3 lg:mb-0">
          Still have more questions?{" "}
        </p>
        <Button
          title="Contact us"
          showIcon
          onClick={() =>
            window.open(
              "https://getdropp.notion.site/Homemade-Help-Center-f8653ff874e544c385113e3622daf64e",
              "_blank"
            )
          }
        />
      </div>
    </div>
  );
};

export default FAQ;
