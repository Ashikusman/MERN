import React from "react";
import { useSelector } from "react-redux";
import { Receipt } from "../component/Receipt";

export const Success = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  // console.log(productCartItem);

  const userData = useSelector((state) => state.user);
  console.log(userData)

  const reservationData = useSelector((state) => state.reservation);
  console.log(reservationData)

  //acc-accumulator, curr-current
  //use parseInt because curr.total will be in string format
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const subTotal = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  return (
    <div className="p-2 md:p-4">
      <div className="text-center mt-5 text-4xl font-bold text-red-500">
        <h1>Thanks for placing your order</h1>
      </div>
      <div className="py-5 md:flex gap-4">
        <div className=" w-full max-w-3xl ">
          {productCartItem.map((el) => {
            return (
              <Receipt
                key={el._id}
                id={el._id}
                name={el.name}
                image={el.image}
                price={el.price}
                qty={el.qty}
                total={el.total}
              />
            );
          })}
          <div className="w-full flex p-2 text-lg border border-white">
            <p>No of Items</p>
            <p className="ml-auto font-bold">{totalQty}</p>
          </div>
          <div className="w-full flex p-2 text-lg border border-white">
            <p>Sub total</p>
            <p className="ml-auto font-bold">Rs: {subTotal}</p>
          </div>
          <div className="w-full flex p-2 text-lg border border-white">
            <p>Table reservation charge</p>
            <p className="ml-auto font-bold">500</p>
          </div>
          <div className="w-full flex p-2 text-lg border border-white">
            <p>Total</p>
            <p className="ml-auto font-bold">Rs: {subTotal + 500}</p>
          </div>
          <hr />
        </div>

        <div className="w-full max-w-2xl ml-auto rounded">
          <div>
            <h2 className="bg-blue-600 text-white text-2xl p-2">
              Your details
            </h2>
          </div>
          <div className="w-full flex p-2 text-lg border border-white">
            <p>First Name</p>
            <p className="ml-auto font-bold">{userData.firstName}</p>
          </div>
          <div className="w-full flex p-2 text-lg border border-white">
            <p>Last Name</p>
            <p className="ml-auto font-bold">{userData.lastName}</p>
          </div>
          <div className="w-full flex p-2 text-lg border border-white">
            <p>Email</p>
            <p className="ml-auto font-bold">{userData.email}</p>
          </div>
          {/* <div className="w-full flex p-2 text-lg border border-white">
            <p>Person count</p>
            <p className="ml-auto font-bold">{reservationData.noOfPerson}</p>
          </div>
          <div className="w-full flex p-2 text-lg border border-white">
            <p>Reservation date</p>
            <p className="ml-auto font-bold">{reservationData.date}</p>
            <p className="ml-auto font-bold">{reservationData.month}</p>
            <p className="ml-auto font-bold">{reservationData.year}</p>
          </div>
          <div className="w-full flex p-2 text-lg border border-white">
            <p>Reservation time</p>
            <p className="ml-auto font-bold">{reservationData.startTime} - </p>
            <p className="ml-auto font-bold">{reservationData.endTime}</p>
          </div>         
          <div className="w-full flex p-2 text-lg border border-white">
            <p>Table reserved</p>
            <p className="ml-auto font-bold">{reservationData.selectTable}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
