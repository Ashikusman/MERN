import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import banner from "../Assets/banner.png";
import { MenuCard } from "../component/MenuCard";
import { CategoryCard } from "../component/CategoryCard";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
// import { AllProducts } from "../component/AllProducts";
//import ProductDisplay from "./ProductDisplay";

const Menu = () => {
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData);

  
  //Menu list
  //const menuProductList = productData

  //Menu loading message
  const loadingArrayMenu = new Array(8).fill(null);

  //This is used for slide targeting a container
  const slideProductRef = useRef();

  //Function for next product slide
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  //Function for previous product slide
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  //function to view product categories
  const categoryList = [...new Set(productData.map((el) => el.category))];
  // console.log(categoryList);

  //function to view categorized products
  //const [filterby,setFilterBy] = useState()
  const [dataFilter, setDataFilter] = useState([]);
  //By default display all products
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]); //Array dependancy

  //returning categorized products
  const handleFilterProduct = (category) => {
    const filter = productData.filter((el) => el.category === category);
    setDataFilter(() => {
      return [...filter];
    });
  };

  return (
    <div className="p-2 md:p-4">
      <div>
        <img
          className="md:1/2 m-auto items-center justify-center h-80 w-full"
          src={banner}
          alt=""
        />
      </div>
      <br />
      <div className="flex text-2xl font-bold w-full">
        <h2>Categories</h2>
        <div className="ml-auto flex gap-3">
          <button className="bg-white" onClick={preveProduct}>
            <GrFormPrevious />
          </button>
          <button className="bg-white" onClick={nextProduct}>
            <GrFormNext />
          </button>
        </div>
      </div>
      <div
        className=" mt-3 flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all cursor-pointer"
        ref={slideProductRef}>
        {categoryList[0] ? categoryList.map((el) => {
          return (
            <CategoryCard
              key={el}
              category={el}
              onClick={() => handleFilterProduct(el)}
            />
          );
        })
        :
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
      </div>
      <br />
      <br />
      {/* <AllProducts heading={"Menu"} /> */}
      <div className="text-2xl font-bold">
        <h2>Menu</h2>
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
          : loadingArrayMenu.map((el, index) => {
              return <MenuCard key={index} loading={"Loading..."} />;
            })}
      </div>
      <br />
      <br />

      {/* <div className="text-2xl font-bold">
        <h2>All products</h2>
      </div>
      <div className="md:1/2 flex flex-wrap mt-3 gap-5 items-center justify-center"> 
        {
          menuProductList[0] ? menuProductList.map(el=>{ //if data is present,display products
            return(
              <MenuCard
                key = {el._id}
                image = {el.image}
                name = {el.name}
                price = {el.price}
                category = {el.category}
              />              
            ) 
          })
          : loadingArray.map((el,index)=>{
            return(
              <MenuCard
                key = {index}
                loading={"Loading..."}
              />               
            )
          })         
        }       
      </div> */}
      {/* 5.50.53 */}
    </div>
  );
};

export default Menu;
