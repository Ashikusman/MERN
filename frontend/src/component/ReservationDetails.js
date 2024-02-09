import React from "react";

export const ReservationDetails = ({
  noOfPerson,
  date,
  month,
  year,
  startTime,
  endTime,
  selectTable
}) => {
    
  return (
    <div>
      <div className="w-full flex p-2 text-lg border border-white">
        <p>No of Person</p>
        <p className="ml-auto font-bold">{noOfPerson}</p>
      </div>
      <div className="w-full flex p-2 text-lg border border-white">
        <p>Date</p>
        <p className="ml-auto font-bold">{date} th</p>
      </div>
      <div className="w-full flex p-2 text-lg border border-white">
        <p>Month</p>
        <p className="ml-auto font-bold">{month}</p>
      </div>
      <div className="w-full flex p-2 text-lg border border-white">
        <p>Year</p>
        <p className="ml-auto font-bold">{year}</p>
      </div>
      <div className="w-full flex p-2 text-lg border border-white">
        <p>Start Time</p>
        <p className="ml-auto font-bold">{startTime}</p>
      </div>
      <div className="w-full flex p-2 text-lg border border-white">
        <p>End Time</p>
        <p className="ml-auto font-bold">{endTime}</p>
      </div>
      <div className="w-full flex p-2 text-lg border border-white">
        <p>Select Table</p>
        <p className="ml-auto font-bold">{selectTable}</p>
      </div>
    </div>
  );
};
