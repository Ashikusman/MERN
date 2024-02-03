import React from 'react'
//import Indian from "../Assets/Indian.jpg"
// import Chinese from "../Assets/chinese.jpg"
// import Arabian from "../Assets/arabian.jpg"
// import Western from "../Assets/western.jpg"
// import Appetizers from "../Assets/Appetizers.jpg"
// import Desserts from "../Assets/Desserts.jpg"
// import Beverages from "../Assets/Beverages.jpg"

export const CategoryCard = ({category,onClick,}) => {
  return (
    <div onClick={onClick}>
      {/* 7.05.13 */}        
        <div className="bg-blue-500 text-white hover:bg-blue-800 p-8 cursor pointer rounded ">
          <p className="text-center text-xl font-bold">{category}</p> 
        </div>
        
    </div>
  )
}
