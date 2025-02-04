import React, { useEffect, useState } from "react";
import SignupImage from "../Assets/user.png";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //Import useNavigate above
  const navigate = useNavigate()
  // console.log(data)
  const location = useLocation();
  const [reservationData,setReservationData] = useState(null);

  useEffect(() => {
    if(location.state && location.state.reservationData) {
      setReservationData(location.state.reservationData)

    }
  }, [location])

  //useSelector comes from the react-redux
  const userData = useSelector((state) => state.user)
  

  //To send data to redux folder
  const dispatch = useDispatch()
  //call it in when login is successful



  //function to hide and show password
  const handleShowPassword = () => {
    //preve means previous value
    setShowPassword((preve) => !preve);
  };

  //function to store data 
  const handleOnChange = (e) => {
    const {name,value} = e.target
    setData((preve)=>{
        return{
            //spread operator
            ...preve,
            [name] : value
        }
    })
  }
  
  //Arrow function to avoid page refresh after submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    //Making fields mandatory to fill
    const {email, password} = data
    if(email && password) {
        //When deployed url will change for this create a file named .env
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`,{
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })

        //converting fetched data in JSON format
        const dataRes = await fetchData.json()
        // console.log(dataRes)
        //Import toast above
        toast(dataRes.message)

        if(dataRes.alert) {
          dispatch(loginRedux(dataRes))
          navigate("/reservation") //direct to reservation
          if(dataRes.data.email === process.env.REACT_APP_ADMIN_EMAIL) {
            navigate("/newproduct");
          }       
        }
        
        // console.log(userData)

        // if(dataRes.email === process.env.REACT_APP_ADMIN_EMAIL) {
        //   dispatch(loginRedux(dataRes))
        //   navigate("/menu")
        // }

        //alert("Successful")

        //cd frontend
        //npm install @reduxjs/toolkit
        //npm i redux
        //npm i react-redux

        //Using React-redux to attached data to all components
        
    }
    
    else{
        alert("Please enter in the required fields")
    } 
  }
  return (
    <div>
      <div className="p-3 md:p-4">
        <div className="w-full max-w-sm bg-white  m-auto flex  flex-col p-4">
          {/* <h1 className="text-center text-2xl font-bold">Sign Up</h1> */}
          <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
            <img src={SignupImage} className="w-full" alt="" />
          </div>
          <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>

            <label htmlFor="email">Email</label>
            <input
              type={"email"}
              id="email"
              name="email"
              className="mt-1 mb-2 w-full bg-orange-100 drop-shadow-md shadow-md px-2 py-1 rounded focus-within:outline-red-300"
              value={data.email}
              onChange={handleOnChange}

            />

            <label htmlFor="password">Password</label>
            <div className="flex px-2 py-1 rounded mt-1 mb-2  bg-orange-100 drop-shadow-md shadow-md focus-within:outline focus-within:outline-red-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full bg-orange-100 border-none outline-none"
                value={data.password}
                onChange={handleOnChange}
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>            
            <button className="w-full max-w-[150px] m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-3">
              Login
            </button>
          </form>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;
