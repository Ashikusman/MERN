import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // date: "",
    // endTime: "",
    // month: "",
    // noOfPerson: "",
    // selectTable: "",
    // startTime: "",
    // year: "",
   reservationList: []
   //reservationList: JSON.parse(localStorage.getItem('reservationLists')) || [], // Load from localStorage if available
   
};

export const reservationSlice = createSlice({
    name : "reservation",
    initialState,
    reducers : {
        setDatareservation : (state, action) => {    
            // state.noOfPerson = action.payload.data.noOfPerson
            // state.date = action.payload.data.date
            // state.month = action.payload.data.month
            // state.year = action.payload.data.year
            // state.startTime = action.payload.data.startTime
            // state.endTime = action.payload.data.endTime
            // state.selectTable = action.payload.data.selectTable
            state.reservationList = [...action.payload];
            //localStorage.setItem('reservationLists', JSON.stringify(state.reservationList)); // Persist to localStorage
            //console.log(action);
        }
    }

})

export const {setDatareservation} = reservationSlice.actions

export default reservationSlice.reducer
