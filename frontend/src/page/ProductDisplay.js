import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllProducts } from "../component/AllProducts";
import { addCartItem } from "../redux/productSlice";


const ProductDisplay = () => {

  //Display product by Id
  const { filterby } = useParams();
  //console.log(params.filterby) //7.8.44

  const productData = useSelector((state) => state.product.productList);
  //console.log(productData);

  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  // console.log(productDisplay);

  const dispatch = useDispatch()

  //Add product to cart
  const handleAddCart = (e)=>{
    dispatch(addCartItem(productDisplay))
    //alert("hii")
  }


  return (
    <div className="p-2 md:p-5">
      <div className="text-2xl font-bold mt-2">
        <h2>Product Details</h2>
      </div>
      <br/>
      <div className="md:flex m-auto max-w-4xl items-center justify-center gap-5 bg-white  ">    
        <div className="max-w-md p-5">
        {/* 7.31.09 */}
          <img src={productDisplay.image} classname="" alt="" />
        </div>
        <div className="flex flex-col px-5">
          <h3 className=" font-bold capitalize text-2xl md:text-4xl mt-3 ">
            {productDisplay.name}
          </h3>
          <p className=" font-bold md:text-2xl mt-4 ">Rs: <span className="text-red-600">{productDisplay.price}</span></p>
          <div className="">
            <button className=" bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-pointer rounded min-w-[100px] py-2 mt-2" onClick={handleAddCart}>Add to Cart</button>
          </div>
          <div>
            <p className="font-bold md:text-2xl mt-4">Description:</p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <br/>
      <AllProducts heading = {"Other products"} />
    </div>
    
    
  )
}

export default ProductDisplay;
