import { productDetailsReducer, productListReducer } from "../reducers/productReducers";
import { configureStore } from "@reduxjs/toolkit";
import { EnhancedStore } from "@reduxjs/toolkit/src/configureStore";
import { cartReducer } from "../reducers/cartReducers";
import { CartItem } from "./types";

const cartItemsLocalStorageItem = localStorage.getItem('cartItems');
const cartItemsFromStorage: CartItem[] = cartItemsLocalStorageItem ? JSON.parse(cartItemsLocalStorageItem) : [];

const store: EnhancedStore = configureStore(
    {
        reducer: {
            productList: productListReducer,
            productDetails: productDetailsReducer,
            cart: cartReducer
        },
        preloadedState: { cart: { cartItems: cartItemsFromStorage } }
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;