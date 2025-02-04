import React from "react";
//import arrow_icon from "../Assets/arrow.png"
import banner_image from "../Assets/banner_image.jpg";
import Indian from "../Assets/Indian.jpg";
import Chinese from "../Assets/chinese.jpg";
import Arabian from "../Assets/arabian.jpg";
import Western from "../Assets/western.jpg";
import { Link } from "react-router-dom";
import { Footer } from "../component/Footer";

const Home = () => {
  return (
    <>
      <div className="p-2 md:p-4">
        <div className="md:flex items-center justify-center">
          <div className="md:w-1/2 py-2 ">
            <h2 className="text-4xl md:text-7xl font bold text-center ">
              Welcome!!!
            </h2>
            <div className=" md:w-1/2 m-auto flex items-center justify-center">
              <Link to={`/signup`}>
                <button className=" bg-blue-500 font-bold text-white hover:bg-blue-600 cursor-pointer px-8 py-2 rounded-md mt-8 ">
                  Sign Up Now
                </button>
              </Link>
              {/* <img src={arrow_icon} alt=""/> */}
            </div>
          </div>

          <div className="md:w-1/2">
            <img src={banner_image} alt="" />
          </div>
        </div>
        <br />

        <h1 className="text-center text-4xl font-bold">Main Cuisines</h1>
        <br />

        <Link
          to={`/menu`}
          onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
        >
          <div className="md:1/2 flex flex-wrap gap-6 items-center justify-center ">
            <div>
              <img className="w-80 h-50" src={Indian} alt="" />
              <p className="text-center text-xl font-bold">Indian</p>
            </div>
            <div>
              <img className="w-80 h-50" src={Chinese} alt="" />
              <p className="text-center text-xl font-bold">Chinese</p>
            </div>
            <div>
              <img className="w-80 h-60" src={Arabian} alt="" />
              <p className="text-center text-xl font-bold">Arabian</p>
            </div>
            <div>
              <img className="w-80 h-50" src={Western} alt="" />
              <p className="text-center text-xl font-bold">Western</p>
            </div>
          </div>
        </Link>
      </div>      
      <Footer />
    </>
  );
};

export default Home;
