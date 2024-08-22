import moment from "moment";
import React, { useState } from "react";
import { COMMON_DATE_FORMAT } from "../utils/formatMethods";

const ChefsReviews = ({ reviews }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  //   const [reviews] = useState([
  //     {
  //       customer: "Seye Ade",
  //       review:
  //         "I ordered one regular and one boneless biryani the quantity is reduced a lot the packaging is becoming smaller every time, lots of different in taste too. I felt like this is not the regular place I order",
  //       date: "Dec 07, 2022",
  //     },
  //     {
  //       customer: "Seye Ade",
  //       review:
  //         "I ordered one regular and one boneless biryani the quantity is reduced a lot the packaging is becoming smaller every time, lots of different in taste too. I felt like this is not the regular place I order",
  //       date: "Dec 07, 2022",
  //     },
  //     {
  //       customer: "Seye Ade",
  //       review:
  //         "I ordered one regular and one boneless biryani the quantity is reduced a lot the packaging is becoming smaller every time, lots of different in taste too. I felt like this is not the regular place I order",
  //       date: "Dec 07, 2022",
  //     },
  //     {
  //       customer: "Seye Ade",
  //       review:
  //         "I ordered one regular and one boneless biryani the quantity is reduced a lot the packaging is becoming smaller every time, lots of different in taste too. I felt like this is not the regular place I order",
  //       date: "Dec 07, 2022",
  //     },
  //     {
  //       customer: "Seye Ade",
  //       review:
  //         "I ordered one regular and one boneless biryani the quantity is reduced a lot the packaging is becoming smaller every time, lots of different in taste too. I felt like this is not the regular place I order",
  //       date: "Dec 07, 2022",
  //     },
  //     {
  //       customer: "Seye Ade",
  //       review:
  //         "I ordered one regular and one boneless biryani the quantity is reduced a lot the packaging is becoming smaller every time, lots of different in taste too. I felt like this is not the regular place I order",
  //       date: "Dec 07, 2022",
  //     },
  //   ]);
  const handleSeeAllClick = () => {
    setShowAll(!showAll);
  };

  //   const currentReviews = showAll
  //     ? reviews
  //     : reviews.slice(currentIndex, currentIndex + 3);

  return (
    <>
      {reviews?.length > 0 && (
        <>
          <h1 className="card_headerText font_bold text-2xl">Reviews</h1>
          <div className="flex flex-row flex-wrap mt-6">
            {reviews?.map((review: any, index: number) => {
              if (review.review) {
                return (
                  <div
                    className="bg-white custom-width p-4 mr-7 rounded-xl  mt-4"
                    key={index}
                  >
                    <div>
                      <div className="flex flex-row">
                        <img
                          src={review?.customer?.image || "/images/user.png"}
                          alt="user"
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="ml-2">
                          <h1 className="font_bold text-1xl">
                            {review?.customer?.firstName}{" "}
                            {review?.customer?.lastName}
                          </h1>
                          <p className="input_text text-xs font_regular">
                            {review?.createdAt
                              ? moment(review?.updatedAt).format(
                                  COMMON_DATE_FORMAT
                                )
                              : ""}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs mt-3 font_regular">
                        {review?.review}
                      </p>
                    </div>
                  </div>
                );
              }
              return "";
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ChefsReviews;
