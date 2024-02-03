import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice'
import productSliceReducer from './productSlice'


export const store = configureStore({
    // reducer: {}
    //Then go to frontend/index.js to import store
    reducer: {
        user : userSliceReducer,
        product : productSliceReducer,
        
    }
    
})