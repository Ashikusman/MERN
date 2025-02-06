import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice'
import productSliceReducer from './productSlice'
import reservationSliceReducer from './reservationSlice'
import orderSliceReducer from './orderSlice'


export const store = configureStore({
    // reducer: {}
    //Then go to frontend/index.js to import store
    reducer: {
        user : userSliceReducer,
        product : productSliceReducer,
        reservation : reservationSliceReducer,
        order : orderSliceReducer

        
    }
    
})