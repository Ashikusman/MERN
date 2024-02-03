import React, { useState } from "react";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  // console.log(userData);
  const dispatch = useDispatch();
  //Create another function in userSlice

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logged out successfully");
  };

  //To check whether admin email is shown in console
  //If it is "undefined" restart app
  //console.log(process.env.REACT_APP_ADMIN_EMAIL)

  //8.09.26
  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="flex items-center gap-3 h-8">
            <img className="h-full" src={logo} alt="" />
            <h2 className="text-lg">Restaurant</h2>
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            {/* <Link to={"reservation"}>Reservation</Link> */}
            <Link to={"menu"}>Menu</Link>
            {/* <Link to={"productdisplay/6582fc9c2fe8786557af4d1c"}>Product</Link> */}
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl relative">
            <Link to={"cart"}>
              <FaShoppingCart />
              {/*30.07 */}
              <div className="absolute -top-3 -right-3 text-white bg-red-500 h-5 w-4 rounded-full p-0 text-sm text-center">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div onClick={handleShowMenu}>
            <div className="text-2xl cursor-pointer w-8 h-7 rounded-full overflow-hidden">
              {userData.image ? (
                <img
                  src={userData.image}
                  alt="user"
                  className="w-full h-full"
                />
              ) : (
                <FaUser />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {/* New product tab will be visible for admin only */}
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    New product
                  </Link>
                )}
                {/* If logout tab when user image is shown */}
                {userData.firstName ? (
                  <p
                    className="whitespace-nowrap cursor-pointer text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    Login
                  </Link>
                )}
                <nav className=" text-base md:text-md flex flex-col md:hidden ">
                  <Link to={""}>Home</Link>
                  <Link to={"menu"}>Menu</Link>
                  {/* <Link to={"productdisplay/6582fc9c2fe8786557af4d1c"}>Product</Link> */}
                  <Link to={"about"}>About</Link>
                  <Link to={"contact"}>Contact</Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
