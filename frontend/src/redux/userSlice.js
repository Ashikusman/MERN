import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //_id :  "",
    userId: "",
    firstName : "",
    lastName : "",
    email : "",    
    image : "",
    
   
    //userList: [],
    userList: JSON.parse(localStorage.getItem('userLists')) || [], // Load from localStorage if available
};

export const userSlice = createSlice({
    name : "user",
    initialState,
    // initialState : {},
    reducers : {
        setDataUser: (state, action) => {
            // console.log(action); // to check whether data is coming or not
            state.userList = [...action.payload];
            localStorage.setItem('userLists', JSON.stringify(state.userList)); // Persist to localStorage
          },
        loginRedux : (state, action)=>{ //call the loginRedux method in login page
            //console.log(action.payload.data)
            //state._id = action.payload.data._id
            state.userId = action.payload.data.userId
            state.firstName = action.payload.data.firstName
            state.lastName = action.payload.data.lastName
            state.email = action.payload.data.email
            state.image = action.payload.data.image           
            localStorage.setItem('userLists', JSON.stringify(state.userList)); // Persist to localStorage
            //console.log("Login payload:", action.payload.data);


        },
        logoutRedux : (state, action)=>{
            //state._id = "";
            state.userId = "";
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.image = "";
        }
    }
})
export const {setDataUser,loginRedux, logoutRedux} = userSlice.actions

export default userSlice.reducer