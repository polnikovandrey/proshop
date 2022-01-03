import { CartItem, CartState } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] } as CartState,
    reducers: {
        addCartItem: (state, action: PayloadAction<CartItem>) => {
            const actionItem: CartItem = action.payload;
            const stateItem = state.items.find(item => item.productId === actionItem.productId);
            if (stateItem) {
                return { items: state.items.map(item => item.productId === stateItem.productId ? actionItem : item) };
            } else {
                return { items: state.items.concat(actionItem) }
            }
        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            const productId: string = action.payload;
            return { items: state.items.filter(item => item.productId !== productId) };
        }
    }
});

export const { addCartItem, removeCartItem } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems: (state: RootState) => CartItem[] = state => state.cart.items;

export const cartReducer = cartSlice.reducer;