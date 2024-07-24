import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AddToCartProductType = {
  id: string;
  title: string;
  img: string;
  price: string;
  quantity: string;
};

const initialState: Array<AddToCartProductType> = [];

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartProductType>) => {
      if (state.findIndex((pro) => pro.id === action.payload.id) == -1) {
        state.push(action.payload);
      } else {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: (parseInt(item.quantity) + 1).toString() }
            : item
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((item) => item.id === id);
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
