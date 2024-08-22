// @ts-nocheck
import React, { useState } from "react";
import moment from "moment";

const Dates = ({ menu, selectedDate, setSelectedDate }: any) => {
  const monthDates = [...Array(28)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const monthDatesF = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return moment(d).format("dd").toUpperCase();
  });

  const menuDates =
    menu &&
    menu
      ?.filter((m: any) => monthDatesF.includes(m.deliveryDate))
      ?.map((m: any) => m.deliveryDate);

  return (
    <div className="mt-10 ">
      <div className="">
        <p className=" text-2xl">Pick a delivery date</p>
      </div>

      <div className="flex flex-row mt-6 6 overflow-scroll mr-10">
        <div
          className={`w-28 h-24 flex flex-col shrink-0 justify-center text-center rounded-xl mr-3 cursor-pointer text-center ${
            selectedDate === "all" ? "activeCalendarBorder" : "calendarBorder"
          }`}
          onClick={() => setSelectedDate("all")}
        >
          <p className="text-black text-2xl">All</p>
        </div>

        {menuDates?.length > 0 &&
          monthDates?.length > 0 &&
          monthDates
            ?.filter((d) =>
              menuDates.includes(moment(d).format("dd").toUpperCase())
            )
            ?.map((date: any, index: number) => (
              <div
                key={index}
                className={`w-28 h-24 flex flex-col shrink-0 justify-center text-center rounded-xl mr-3 cursor-pointer text-center ${
                  selectedDate !== "all" &&
                  date?.toLocaleDateString() ===
                    selectedDate?.toLocaleDateString()
                    ? "activeCalendarBorder"
                    : "calendarBorder"
                }`}
                onClick={() => {
                  setSelectedDate(date);
                }}
              >
                <p className="input_text text-sm uppercase">
                  {moment(date).format("ddd")}
                </p>
                <p className="text-black text-2xl">
                  {moment(date).format("MMM D")}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Dates;
