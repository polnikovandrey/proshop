import { configureStore } from "@reduxjs/toolkit";
import { EnhancedStore } from "@reduxjs/toolkit/src/configureStore";
import { CartItem, UserState } from "./types";
import { cartReducer } from "../slice/cartSlice";
import { productDetailReducer, productListReducer } from "../slice/productSlice";
import { userReducer } from "../slice/userSlice";

const cartItemsLocalStorageItem = localStorage.getItem('cartItems');
const cartItemsFromStorage: CartItem[] = cartItemsLocalStorageItem ? JSON.parse(cartItemsLocalStorageItem) : [];

const userLocalStorageItem = localStorage.getItem('user');
const userFromStorage: UserState = userLocalStorageItem ? { user: JSON.parse(userLocalStorageItem) } : { };

const store: EnhancedStore = configureStore(
    {
        reducer: {
            cart: cartReducer,
            productList: productListReducer,
            productDetails: productDetailReducer,
            userLogin: userReducer
        },
        preloadedState: {
            cart: { items: cartItemsFromStorage },
            userLogin: userFromStorage
        }
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;