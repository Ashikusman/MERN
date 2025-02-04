import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  //cartItem: [],
  cartItem: JSON.parse(localStorage.getItem('cartItems')) || [], // Load from localStorage if available
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  //object
  reducers: {
    setDataProduct: (state, action) => {
      // console.log(action); // to check whether data is coming or not
      state.productList = [...action.payload];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItem)); // Persist to localStorage
    },
    
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      console.log(check);
      if (check) {
        toast("Product already added to cart");
      } else {
        console.log(action);
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItem)); // Persist to localStorage
    },
    deleteCartItem: (state, action) => {
      console.log(action.payload);
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1); //splice mehtod is used to display the other element when one elemnt is deleted
      console.log(index);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItem)); // Persist to localStorage
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyIncrease = ++qty;
      state.cartItem[index].qty = qtyIncrease;

      //Total increase when qty increases 8.59.52
      const price = state.cartItem[index].price;
      const total = price * qtyIncrease;

      state.cartItem[index].total = total;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItem)); // Persist to localStorage
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtydecrease = --qty
        state.cartItem[index].qty = qtydecrease;

        const price = state.cartItem[index].price;
        const total = price * qtydecrease;

        state.cartItem[index].total = total;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItem)); // Persist to localStorage
      }
    },
    clearCart: (state) => {
      state.cartItem = [];
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  clearCart,

} = productSlice.actions;

export default productSlice.reducer;
