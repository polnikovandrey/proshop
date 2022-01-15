import { CartItem, CartState, ShippingAddress } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], shippingAddress: {} as ShippingAddress, paymentMethod: 'PayPal' } as CartState,
    reducers: {
        addCartItem: (state, action: PayloadAction<CartItem>) => {
            const actionItem: CartItem = action.payload;
            const stateItem = state.items.find(item => item.productId === actionItem.productId);
            if (stateItem) {
                state.items = state.items.map(item => item.productId === stateItem.productId ? actionItem : item);
            } else {
                state.items = state.items.concat(actionItem);
            }
        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            const productId: string = action.payload;
            state.items = state.items.filter(item => item.productId !== productId);
        },
        saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
            state.shippingAddress = action.payload;
        },
        savePaymentMethod: (state, action: PayloadAction<string>) => {
            state.paymentMethod = action.payload;
        }
    }
});

export const { addCartItem, removeCartItem, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems: (state: RootState) => CartItem[] = state => state.cart.items;
export const selectShippingAddress: (state: RootState) => ShippingAddress = state => state.cart.shippingAddress;
export const selectPaymentMethod: (state: RootState) => string = state => state.cart.paymenMethod;

export const cartReducer = cartSlice.reducer;