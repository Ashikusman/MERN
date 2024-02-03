import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import toast from 'react-hot-toast';

const Newproduct = () => {
  //function to create useState to store data
  const [data,setData] = useState({ //data is passed to onSubmit method in form
    name : "",
    category : "",
    image : "",
    price : "",
    description : ""
  })

  const handleOnChange = (e)=>{
    const {name,value} = e.target
    
    //preve is to restore the previous value
    setData((preve)=>{
      return{
        ...preve, //spread the previous value
        [name] : value //without using square brackets gives an error
      }
    })
  }

  //function to upload image
  const UploadImage = async(e)=>{
    const data = await ImagetoBase64(e.target.files[0])
    //console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
    })
  }


  const handleSubmit = async(e)=>{
    e.preventDefault() //to avoid page refresh after submit
    // console.log(data)
    //4.10.14

    //field validation
    const {name,category,image, price} = data

    if(name && category && image && price) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{ //Api endpoint
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      }) //4.22.55
  
      //converting fetched data in JSON format
      const fetchRes = await fetchData.json()
      // console.log(fetchRes)
  
      toast(fetchRes.message)

      //Clear fields after data submit 
      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""

        }
      })//5.09.27
    }
    else {
      toast("Please fill in the required fields")
    }
    

    
  }

  return (
    <div className="p-5">
        <form className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input 
          className="bg-orange-100 drop-shadow-md shadow-md px-2 py-1 rounded focus-within:outline-red-300" 
          type={"text"} 
          name="name" 
          onChange={handleOnChange} 
          value={data.name}
          />

          <label htmlFor="category" className="mt-3">Product Category</label>
          <select 
          className="bg-orange-100 drop-shadow-md shadow-md px-2 py-1 rounded focus-within:outline-red-300" 
          id="category" 
          name="category" 
          onChange={handleOnChange} 
          value={data.category}
          >
            <option>Select category</option>
            <option>Indian</option>
            <option>Chinese</option>
            <option>Arabian</option>
            <option>Western</option>
            <option>Appetizers</option>
            <option>Desserts</option>
            <option>Beverages</option>
          </select>

          <label htmlFor="image" className="mt-3">Image
          <div className="h-40 w-full bg-orange-100 drop-shadow-md shadow-md px-2 py-1 rounded focus-within:outline-red-300 flex items-center justify-center cursor-pointer">
            {data.image ? <img src={data.image} alt="" className="h-full"/> : <span className="text-8xl" ><FaCloudUploadAlt /></span>}
            <input type={"file"} id="image" accept="image/*" onChange={UploadImage} className="hidden"/>
             
          </div>
          </label>

          <label htmlFor="price" className="mt-3">Price</label>
          <input 
          className="bg-orange-100 drop-shadow-md shadow-md px-2 py-1 rounded focus-within:outline-red-300" 
          type={"text"} 
          name="price" 
          onChange={handleOnChange}
          value={data.price}
          />

          {/* 3.55.00 */}
          <label htmlFor="description" className="mt-3">Product Description</label>         
          <textarea rows={2} 
          className="bg-orange-100 drop-shadow-md shadow-md px-2 py-1 rounded focus-within:outline-red-300 resize-none" 
          name="description" 
          onChange={handleOnChange}
          value={data.description} 
          ></textarea>

          <button className="w-full max-w-[150px] m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-3">Submit</button>
        </form>
    </div>
  )
}

export default Newproduct;