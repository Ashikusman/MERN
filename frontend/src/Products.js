import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AdminProducts } from "../component/AdminProducts";

export const Products = () => {
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData)
  return (
    <div className="p-5">
      <form className="m-auto w-full max-w-xl shadow p-3 bg-white">
        <div className="flex md:ml-10 justify-between">
          <label htmlFor="image" className="md:text-lg font-bold">Image</label>
          <label htmlFor="name" className="md:text-lg font-bold">Name</label>
          <label htmlFor="category" className="md:text-lg font-bold">Category</label>
          <label htmlFor="price" className="md:text-lg font-bold">Price</label>
          <label htmlFor="actions" className="md:text-lg font-bold">Actions</label>
        </div>
        <div>         
          {productData.map((el) => {
            return (
              <AdminProducts
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
              />
            );
          })}
        </div>
        {/* <table>
          <tr >
            <th className="items-center">
              <label htmlFor="image">Image</label>
            </th>
            <th className="items-center">
              <label htmlFor="name">Name</label>
            </th>
            <th className="items-center">
              <label htmlFor="category">Category</label>
            </th>
            <th className="items-center">
              <label htmlFor="price">Price</label>
            </th>
            <th className="items-center">
              <label htmlFor="actions">Actions</label>
            </th>
          </tr>
          <tr>
            {dataFilter.map((el) => {
              return (
                <AdminProducts
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              );
            })}
          </tr>
        </table> */}
        
      </form>
    </div>
  );
};
