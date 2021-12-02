import { CartItem, CartState } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: { cartItems: [] } as CartState,
    reducers: {
        addCartItem: (state, action: PayloadAction<CartItem>) => {
            const actionItem: CartItem = action.payload;
            const stateItem = state.cartItems.find(item => item.productId === actionItem.productId);
            // TODO !!! check reduxjs/toolkit state mutability
            if (stateItem) {
                return { cartItems: state.cartItems.map(item => item.productId === stateItem.productId ? actionItem : item) };
            } else {
                return { cartItems: [ ...state.cartItems, actionItem ] };
            }
        },
        removeCartItem: (state) => {
            return state;
        }
    }
});

export const { addCartItem, removeCartItem } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const cartReducer = cartSlice.reducer;