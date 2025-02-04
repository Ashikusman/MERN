import React, { useState } from "react";
import SignupImage from "../Assets/user.png";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";


const Signup = () => {
  //Import useNavigate above
  //After signup it should direct to login
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image:""
  });
  // console.log(data)

  //function to hide and show password
  const handleShowPassword = () => {
    //preve means previous value
    setShowPassword((preve) => !preve);
    
  };

  //function to hide and show confirm password
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
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

  //function to view uploaded image
  const handleUploadProfileImage = async(e) => {
    //console.log(e.target.files[0])
    const data = await ImagetoBase64(e.target.files[0])
    // console.log(data)

    setData((preve)=>{
        return{
          ...preve,
          image : data
        }
    })

  }
  // console.log(process.env.REACT_APP_SERVER_DOMAIN)

  //Arrow function to avoid page refresh after submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Making fields mandatory to fill
    const {firstName, email, password, confirmPassword} = data
    if(firstName && email && password && confirmPassword) {
        if(password === confirmPassword) {
            //When deployed url will change for this create a file named .env
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,{
              method : "POST",
              headers : {
                "content-type" : "application/json"
              },
              body : JSON.stringify(data)
            })

            //converting fetched data in JSON format
            const dataRes = await fetchData.json()
            // console.log(dataRes)


            //alert(dataRes.message) 
            //Import toast above
            toast(dataRes.message)
            if(dataRes.alert) {
              navigate("/login") //directing to login page
            }                       
        }
        else {
            alert("passsword and confirm password do not match")
        }
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
          <div className="w-20 h-20  overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
            <img src={ data.image ? data.image : SignupImage} className="w-full h-full" alt="" />
            {/* picture upload */}
            <label htmlFor="profileImage">
              <div className="absolute bottom-0 h-1/3 bg-blue-500 bg-opacity-50 w-full text-center cursor-pointer">
                <p className="text-sm text-white">Upload</p>
              </div>
              <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage}/>
            </label>            
          </div>
          <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              type={"text"}
              id="firstName"
              name="firstName"
              className="mt-1 mb-2 w-full bg-orange-100 drop-shadow-md shadow-md px-2 py-1 rounded focus-within:outline-red-300"
              value={data.firstName}
              onChange={handleOnChange}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              type={"text"}
              id="lastName"
              name="lastName"
              className="mt-1 mb-2 w-full bg-orange-100  drop-shadow-md shadow-md px-2 py-1 rounded focus-within:outline-red-300"
              value={data.lastName}
              onChange={handleOnChange}
            />
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

            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="flex px-2 py-1 rounded mt-1 mb-2  bg-orange-100 drop-shadow-md shadow-md focus-within:outline focus-within:outline-red-300">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full bg-orange-100 border-none outline-none"
                value={data.confirmPassword}
                onChange={handleOnChange}
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowConfirmPassword}
              >
                {showConfirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
            <button className="w-full max-w-[150px] m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-3">
              Sign Up
            </button>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
