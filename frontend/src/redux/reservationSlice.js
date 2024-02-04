import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    date: "",
    endTime: "",
    month: "",
    noOfPerson: "",
    selectTable: "",
    startTime: "",
    year: "",
};

export const reservationSlice = createSlice({
    name : "reservation",
    initialState,
    reducers : {
        setDatareservation : (state, action) => {
            console.log(action.payload.data)

            state.noOfPerson = action.payload.data.noOfPerson
            state.date = action.payload.data.date
            state.month = action.payload.data.month
            state.year = action.payload.data.year
            state.startTime = action.payload.data.startTime
            state.endTime = action.payload.data.endTime
            state.selectTable = action.payload.data.selectTable
        }
    }

})

export const {setDatareservation} = reservationSlice.actions

export default reservationSlice.reducer
