import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  increaseQty,
  decreaseQty,
} from "../redux/productSlice";

export const CartProduct = ({ id, name, image, price, qty, total }) => {
  const dispatch = useDispatch();

  return (
      <div className="bg-white shadow-md p-2 flex gap-3 rounded border border-gray">
        <div>
          <img src={image} className="max-w-[150px] min-h-[150px] " alt="" />
        </div>
        <div className="flex flex-col  w-full">
          <div className="flex justify-between">
            <div>
              <h3 className=" font-bold capitalize text-lg md:text-xl mt-3 ">
                {name}
              </h3>
            </div>
            <div
              className="text-2xl text-red-500 hover:text-red-600 cursor-pointer"
              onClick={() => dispatch(deleteCartItem(id))}
            >
              <MdDelete />
            </div>
          </div>
          <p className=" font-bold md:text-xl mt-4 ">
            Rs: <span className="text-red-600">{price}</span>
          </p>
          <div className=" justify-between">
            <div className="flex gap-3 items-center">
              <button
                onClick={() => dispatch(increaseQty(id))}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer rounded min-w-[50px] py-1 mt-2"
              >
                +
              </button>
              <p className="font-bold ">{qty}</p>
              <button
                onClick={() => dispatch(decreaseQty(id))}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer rounded min-w-[50px] py-1 mt-2"
              >
                -
              </button>
            </div>
            <div className="flex gap-2 mt-2 font-bold md:text-lg">
              <p>Total</p>
              <p>Rs: {total}</p>
            </div>
          </div>
        </div>
      </div>
      

  );
};
