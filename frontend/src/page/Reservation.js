import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const Reservation = () => {
  //After login it should direct to reservation page
  const navigate = useNavigate();

  // const reservationData = useSelector((state) => state.reservation.reservationList)
  // console.log(reservationData);

  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState({
    noOfPerson: "",
    date: "",
    month: "",
    year: "",
    startTime: "",
    endTime: "",
    selectTable: "",
  });
  // console.log(data);

  //function to hide and show tables
  const handleShowTable = () => {
    //preve means previous value
    setShowTable((preve) => !preve);
  };

  //function to store data
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  //Arrow function to avoid page refresh after submit
  const handleSubmit = async(e) => {
    e.preventDefault(); //to avoid page refresh after submit
    const {noOfPerson,date,month,year,startTime, endTime, selectTable } =
      data;

    if (
      noOfPerson &&
      date &&
      month &&
      year &&
      startTime &&
      endTime &&
      selectTable
    ) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/reservation`,{ //Api endpoint
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      //converting fetched data in JSON format
      const fetchRes = await fetchData.json()
      // console.log(fetchRes)

      toast(fetchRes.message)
      if(fetchRes.alert){
        navigate("/menu"); //directing to menu page       
      }      
    }
    else {
      //alert("Please fill in the required fields")

    }
  };


  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4 ">
        <form className=" py-3 " onSubmit={handleSubmit}>
          <label>No of Person</label>
          <input
            type={"text"}
            id="noOfPerson"
            name="noOfPerson"
            className=" mt-1 mb-2 w-full bg-orange-100 drop-shadow-md shadow-md px-2 py-1 rounded focus-within: outline-red-300"
            value={data.noOfPerson}
            onChange={handleOnChange}
          />
          <br />
          <br />
          <label className="">Date</label>
          <select
            className="ml-10 mt-3 mb-2 bg-orange-100 drop-shadow-md shadow-md  rounded"
            id="date"
            name="date"
            value={data.date}
            onChange={handleOnChange}
          >
            <option>Date</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
          </select>
          <select
            className="ml-3 mt-3 mb-2 bg-orange-100 drop-shadow-md shadow-md  rounded"
            id="month"
            name="month"
            value={data.month}
            onChange={handleOnChange}
          >
            <option>Month</option>
            <option>Jan</option>
            <option>Feb</option>
            <option>Mar</option>
            <option>Apr</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>Aug</option>
            <option>Sept</option>
            <option>Oct</option>
            <option>Nov</option>
            <option>Dec</option>
          </select>
          <select
            className="ml-3 mt-3 mb-2 bg-orange-100 drop-shadow-md shadow-md  rounded"
            id="year"
            name="year"
            value={data.year}
            onChange={handleOnChange}
          >
            <option>Year</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>
          <br />
          <br />
          <label className="">Start Time</label>
          <select
            className="w-full ml-auto mt- mb-2 bg-orange-100 drop-shadow-md shadow-md  rounded"
            id="startTime"
            name="startTime"
            value={data.startTime}
            onChange={handleOnChange}
          >
            <option>Select time</option>
            <option>12.30 pm</option>
            <option>1.00 pm</option>
            <option>1.30 pm</option>
            <option>2.00 pm</option>
            <option>2.30 pm</option>
            <option>3.00 pm</option>
            <option>3.30 pm</option>
            <option>4.00 pm</option>
            <option>4.30 pm</option>
            <option>5.00 pm</option>
            <option>5.30 pm</option>
            <option>6.00 pm</option>
            <option>6.30 pm</option>
            <option>7.00 pm</option>
            <option>7.30 pm</option>
            <option>8.00 pm</option>
            <option>8.30 pm</option>
            <option>9.00 pm</option>
            <option>9.30 pm</option>
            <option>10.00 pm</option>
          </select>
          <br />
          <br />
          <label>End Time</label>
          <select
            className="w-full ml-auto mt-1 mb-2 bg-orange-100 drop-shadow-md shadow-md  rounded"
            id="endTime"
            name="endTime"
            value={data.endTime}
            onChange={handleOnChange}
          >
            <option>Select time</option>
            <option>1.00 pm</option>
            <option>1.30 pm</option>
            <option>2.00 pm</option>
            <option>2.30 pm</option>
            <option>3.00 pm</option>
            <option>3.30 pm</option>
            <option>4.00 pm</option>
            <option>4.30 pm</option>
            <option>4.30 pm</option>
            <option>5.00 pm</option>
            <option>5.30 pm</option>
            <option>6.00 pm</option>
            <option>6.30 pm</option>
            <option>7.00 pm</option>
            <option>7.30 pm</option>
            <option>8.00 pm</option>
            <option>8.30 pm</option>
            <option>9.00 pm</option>
            <option>9.30 pm</option>
            <option>10.00 pm</option>
          </select>
          <br />
          <button
            className=" flex flex-col mb-2 w-full max-w-[150px] m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-3 items-center justify-center "
            onClick={handleShowTable}
          >
            Find table
          </button>
          <br />

          {showTable ? (
            <>
              <select
                className=" flex flex-col  m-auto mt-2 mb-2 bg-orange-100 drop-shadow-md shadow-md  rounded items-center justify-center"
                id="selectTable"
                name="selectTable"
                value={data.selectTable}
                onChange={handleOnChange}
              >
                <option>Select table </option>
                <option id="table1" >Table (1 person) </option>
                <option id="table2" >Table (2 persons) </option>
                <option id="table3" >Table (4 persons) </option>
                <option id="table4" >Table (6 persons) </option>
                <option id="table5" >Table (8 persons) </option>
              </select>
              <br />
            </>
          ) : (
            <p className="text-center">Choose the time period above</p>
          )}

          <button className=" flex flex-col w-full max-w-[150px] m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-3 items-center justify-center">
            Reserve
          </button>
        </form>
      </div>
    </div>
  );
};
