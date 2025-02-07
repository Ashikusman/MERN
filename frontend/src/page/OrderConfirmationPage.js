import React from "react";
import { Link, useLocation } from "react-router-dom";

export const OrderConfirmationPage = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>

      {orderData ? (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full max-w-4xl">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            <ul>
              {orderData.items.map((item) => (
                <li
                  key={item.productId}
                  className="flex justify-between py-2 border-b"
                >
                  <span>{item.name}</span>
                  <span>Rs: {item.total}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold">Reservation Details</h3>
            <ul>
              {orderData.reservations.map((reservation) => (
                <li key={reservation.reservationId} className="flex-col">
                  <div className="flex justify-between">
                    No. of Persons <span>{reservation.noOfPerson}</span>
                  </div>
                  <div className="w-full flex justify-between">
                    <div>
                      Date
                    </div>                   
                    <div>
                      <span>{reservation.date}th </span>
                      <span>{reservation.month}</span>
                      <span> {reservation.year}</span>
                    </div> 
                  </div>
                  <div className="flex justify-between">
                    Start Time <span>{reservation.startTime}</span>
                  </div>
                  <div className="flex justify-between">
                    Start Time <span>{reservation.endTime}</span>
                  </div>
                  <div className="flex justify-between">
                    Selected Table <span>{reservation.selectTable}</span>
                  </div>
                </li>
              ))}
            </ul>
            {/* <div className="flex-col">
              <div className="flex justify-between">
                No. of Persons <span>{orderData.reservations.noOfPerson}</span>
              </div>
              <div className="w-full flex justify-between">
                <div>
                  Date
                </div>
                <div>
                  <span>{orderData.reservations.date}th </span>
                  <span>{orderData.reservations.month}</span>
                  <span> {orderData.reservations.year}</span>
                </div>
              </div>
              <div className="flex justify-between">
                Start Time <span>{orderData.reservations.startTime}</span>
              </div>
              <div className="flex justify-between">
                End Time <span>{orderData.reservations.endTime}</span>
              </div>
              <div className="flex justify-between">
                Selected Table <span>{orderData.reservations.selectTable}</span>
              </div>
            </div> */}
            <div className="mt-4">
              <p className="font-semibold">
                Total Amount: Rs: {orderData.total}
              </p>
              <p className="text-sm mt-2">
                Table reservation charge included: Rs 500
              </p>
            </div>
          </div>

          <div className="w-full max-w-md ml-auto">
            <div className="bg-green-600 text-white p-4 rounded-md">
              <h3 className="text-lg font-semibold">
                Your Order was Successful!
              </h3>
              <p>Thank you for your order!</p>
            </div>
            <Link to={"/menu"}>
              <button className="bg-blue-500 hover:bg-blue-600 w-full text-white text-lg p-2 mt-3">
                Go back to menu
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p>Your order could not be found.</p>
        </div>
      )}
    </div>
  );
};
