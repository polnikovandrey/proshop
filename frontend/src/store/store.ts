import { configureStore } from "@reduxjs/toolkit";
import { EnhancedStore } from "@reduxjs/toolkit/src/configureStore";
import { CartItem, ShippingAddress, UserState } from "./types";
import { cartReducer } from "../slice/cartSlice";
import { productDetailReducer, productListReducer } from "../slice/productSlice";
import { userReducer } from "../slice/userSlice";
import { userProfileReducer } from "../slice/userProfileSlice";

const cartItemsLocalStorageItem = localStorage.getItem('cartItems');
const cartItemsFromStorage: CartItem[] = cartItemsLocalStorageItem ? JSON.parse(cartItemsLocalStorageItem) : [];

const userLocalStorageItem = localStorage.getItem('user');
const userFromStorage: UserState = userLocalStorageItem ? { user: JSON.parse(userLocalStorageItem) } : { };

const shippingAddressStorageItem = localStorage.getItem('shippingAddress');
const shippingAddressFromStorage: ShippingAddress = shippingAddressStorageItem ? JSON.parse(shippingAddressStorageItem) : {};

const store: EnhancedStore = configureStore(
    {
        reducer: {
            cart: cartReducer,
            productList: productListReducer,
            productDetails: productDetailReducer,
            userInfo: userReducer,
            userProfile: userProfileReducer
        },
        preloadedState: {
            cart: { items: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
            userInfo: userFromStorage
        }
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;