import React from "react";

export const Receipt = ({ name, image,total }) => {
  
  return (
    <div>
      <div className="bg-white shadow-md p-2 flex gap-3 rounded border border-gray">
        <div>
          {/* 8.21.58 */}
          <img src={image} className="max-w-[150px] min-h-[150px] " alt="" />
        </div>
        <div className="flex flex-col  w-full">
          <div className="flex justify-between">
            <div>
              <h3 className=" font-bold capitalize text-lg md:text-xl mt-3 ">
                {name}
              </h3>
            </div>
            <div>
              <p>Rs: {total}</p>
            </div>
          </div>         
        </div>
      </div>

    </div>
  );
};
