import React from "react";
import { useSelector } from "react-redux";
import { CartProduct } from "../component/CartProduct";
import emptyCartImage from "../Assets/emptycart.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  // console.log(productCartItem);

  const user = useSelector((state) => state.user);
  //console.log(user)
  console.log("User state:", user);

  const navigate = useNavigate();

  const reservationData = useSelector((state) => state.reservation.reservationList);
  //console.log(reservationData);

  // const lastReservation = reservationData.slice(-1).pop();
  // console.log(lastReservation);

  // const location = useLocation();
  // const reservationData =  location.state?.reservationData
  // console.log(reservationData);


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


  const handleCheckout = async () => {
    if (user.email) {
      // const reservations = Array.isArray(lastReservation) ? lastReservation : [lastReservation];
      // console.log(reservations);
      navigate("/order", {
        state: {
          orderData: { items: productCartItem, total: subTotal + 500, reservations: reservationData},
        },
      });
      /*const orderData = {
        user: user.userId,
        products: productCartItem.map(item => ({
          productId: item._id,
          quantity: item.qty,
          price: item.price,
        })),
        totalAmount: subTotal + 500,
      };

      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        //body: JSON.stringify(productCartItem),
        body: JSON.stringify(orderData),
      });

      // console.log("test");
      // console.log(res);
      // console.log("test");
      // console.log(`${process.env.REACT_APP_SERVER_DOMAIN}/order`);

      const data = await res.json();
      console.log(data);
      */
      /*if (data.success) {
        
        navigate("/order", {
          state: {
            orderData: { items: productCartItem, total: subTotal + 500 },
          },
        });
        //window.location.href = '/order';
        //console.log("test");
        //console.log(data);
      }*/     
    } 
    else {
      toast("You need to login");
      setTimeout(() => {
        navigate("/login",{
          // state: {
          //   reservationData: {reservations: reservationData},
          // },         
        });
      }, 1000);
      //window.location.href = '/login';
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold ">Your Cart</h2>
        {productCartItem[0] ? (
          <div className="mt-3 md:flex gap-4">
            <div className=" w-full max-w-4xl">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
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
            </div>

            <div className="w-full max-w-xl ml-auto rounded">
              <div>
                <h2 className="bg-red-600 text-white text-2xl p-2">
                  Order Summary
                </h2>
              </div>
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
                <button
                  className="bg-black w-full text-white text-lg p-2"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>

              <Link to={"/menu"}>
                <button className="bg-blue-500 hover:bg-blue-600 w-full text-white text-lg p-2 mt-3">
                  Order More
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center flex-col">
            <img src={emptyCartImage} alt="" />
            <br />
            <Link to={"/menu"}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg p-3 rounded">
                Check Menu
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
