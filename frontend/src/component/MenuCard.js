import React from "react";
// import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
// import { addCartItem } from '../redux/productSlice';

export const MenuCard = ({ name, image, price, category, loading, id }) => {
  //const dispatch = useDispatch()

  // //Add product to cart
  // const handleAddCart = (e)=>{
  //   dispatch(addCartItem({
  //     _id : id,
  //     name : name,
  //     price : price,
  //     category : category,
  //     image: image

  //   }))
  //   //alert("hii")
  // }
  return (
    <div className="bg-white shadow-md p-2 rounded w-80 min-h-[200px] ">
      {image ? (
        <>
          <Link to={`/productdisplay/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
            <div className="">
              <img src={image} className="w-80 h-60" alt="" />
            </div>
            <h3 className="text-center font-bold capitalize ">{name}</h3>
            <p className="text-center font-bold">
              Rs: <span className="text-red-600">{price}</span>
            </p>
            <div className="md:1/2 flex flex-wrap bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer items-center justify-center rounded h-8">
              <button className="">View Product</button>
            </div>
          </Link>
        </>
      ) 
      : (
        <div className="flex items-center justify-center h-60">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
