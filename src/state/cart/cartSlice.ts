import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";

const cart:any = localStorage.getItem("cart")
const initialState = localStorage.getItem("cart")
  ? JSON.parse(cart)
  : { cartItems: [] }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find((i:any) => i.id === item.id)

      if (existItem) {
        state.cartItems = state.cartItems.map((i:any) =>
          i.id === existItem.id ? item : i
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.cartItems = state.cartItems.filter((item: any) => item.id !== id);

      return updateCart(state);
    }
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer