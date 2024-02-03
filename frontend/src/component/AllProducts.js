import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuCard from "./MenuCard";
// import { CategoryCard } from "./CategoryCard";

export const AllProducts = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData);

  //Menu list
  //const menuProductList = productData

  //Image loading message
  const loadingArray = new Array(6).fill(null);

  //function to view categorized products
  //const [filterby,setFilterBy] = useState()
  const [dataFilter, setDataFilter] = useState([]);
  //By default display all products
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]); //Array dependancy



  return (
    <>
      <div className="text-2xl font-bold">
        <h2>{heading}</h2>
      </div>
      <div className="flex flex-wrap mt-3 gap-5 items-center justify-center">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              //if data is present,display products
              return (
                <MenuCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              );
            })
          : loadingArray.map((el, index) => {
              return <MenuCard key={index} loading={"Loading..."} />;
            })}
      </div>
    </>
  );
};
