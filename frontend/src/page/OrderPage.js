import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import emptyOrderImage from "../Assets/emptyorder.png";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/productSlice";
// console.log("AAA");

export const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);

  // Optionally, you can fetch order data from the store or pass it via navigation state
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);

  const reservationData = useSelector((state) => state.reservation.reservationList);
  console.log(reservationData);

  // const lastReservation = reservationData.slice(-1).pop();
  // console.log(lastReservation);

  // console.log("Full reservation data:", reservationData);
  // console.log("Sliced data:", reservationData.slice(-1));
  // console.log("Last reservation:", lastReservation);

  // If order data is passed via location state
  useEffect(() => {
    if (location.state && location.state.orderData) {
      setOrderData(location.state.orderData);
    }
  }, [location]);

  // If order data is not passed via state, try getting from store or use productCartItem
  useEffect(() => {
    if (!orderData && productCartItem.length > 0) {
      setOrderData({
        items: productCartItem,
        total:
          productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0) +
          500, // Adding table reservation charge
        reservations: reservationData,
      });
    }
  }, [productCartItem, reservationData, orderData]);

  const subTotal = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const dispatch = useDispatch();

  // Handle order placement (send order data to backend)
  const handlePlaceOrder = async () => {
    // console.log("AAA");

    if (orderData && user.email) {
      try {
        // Send order data to backend API to save it
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: user.userId,
              products: productCartItem.map((item) => ({
                productId: item.productId,
                quantity: item.qty,
                price: item.price,
              })),
              totalAmount: subTotal + 500,
              reservations: reservationData, // Ensure this includes the necessary reservation details
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.success) {
          dispatch(clearCart());
          alert("Order placed successfully!");
          //Navigate("/orderconfirmation");
          navigate("/orderconfirmation", { state: { orderData: orderData } });
          //window.location.href = '/orderconfirmation';
        } else {
          alert("There was an error placing the order.");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        alert("There was an error placing the order.");
      }
    } else {
      alert("Please login to place an order!");
      navigate("/login");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Summary </h2>
      {orderData ? (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full max-w-4xl">
            <h3 className="text-xl font-semibold">Your Order</h3>
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
              {orderData.reservations.map((reservation,index) => (
                <li key={index} className="flex-col">
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

            {/*To fix error "TypeError: orderData.reservations.map is not a function"*/}

            {/* <div className="flex-col">
              <div className="flex justify-between">
                No. of Persons <span>{orderData.reservations.noOfPerson}</span>
              </div>
              <div className="w-full flex justify-between">
                <div>Date</div>
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
            <div className="bg-red-600 text-white p-4 rounded-md">
              <h3 className="text-lg font-semibold">User Details</h3>
              <p>Name: {user.firstName}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={emptyOrderImage} alt="Empty Order" />
          <br />
          <p>Your order was not found!</p>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Place Order
        </button>
      </div>
      <div className="mt-4">
        <Link to={"/menu"}>
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
            Cancel Order
          </button>
        </Link>
      </div>
    </div>
  );
};
