import { configureStore } from "@reduxjs/toolkit";
import { EnhancedStore } from "@reduxjs/toolkit/src/configureStore";
import { CartItem, ShippingAddress, UserState } from "./types";
import { cartReducer } from "../slice/cartSlice";
import { productDetailReducer, productListReducer } from "../slice/productSlice";
import { userReducer } from "../slice/userSlice";
import { userProfileReducer } from "../slice/userProfileSlice";
import { orderCreateReducer } from "../slice/orderCreateSlice";
import { orderDetailReducer } from "../slice/orderDetailSlice";
import { orderPayReducer } from "../slice/orderPaySlice";
import { orderUserListReducer } from "../slice/orderUserListSlice";
import { userListReducer } from "../slice/userListSlice";
import { userDeleteReducer } from "../slice/userDeleteSlice";
import { userUpdateReducer } from "../slice/userUpdateSlice";

const cartItemsLocalStorageItem = localStorage.getItem('cartItems');
const cartItemsFromStorage: CartItem[] = cartItemsLocalStorageItem ? JSON.parse(cartItemsLocalStorageItem) : [];

const userLocalStorageItem = localStorage.getItem('user');
const userFromStorage: UserState = userLocalStorageItem ? { user: JSON.parse(userLocalStorageItem) } : { };

const shippingAddressStorageItem = localStorage.getItem('shippingAddress');
const shippingAddressFromStorage: ShippingAddress = shippingAddressStorageItem ? JSON.parse(shippingAddressStorageItem) : {};

const paymentMethodStorageItem = localStorage.getItem('paymentMethod');
const paymentMethodFromStorage: string = paymentMethodStorageItem ? JSON.parse(paymentMethodStorageItem) : 'PayPal';

const store: EnhancedStore = configureStore(
    {
        reducer: {
            cart: cartReducer,
            orderCreate: orderCreateReducer,
            orderDetail: orderDetailReducer,
            orderUserList: orderUserListReducer,
            orderPay: orderPayReducer,
            productList: productListReducer,
            productDetails: productDetailReducer,
            userInfo: userReducer,
            userList: userListReducer,
            userDelete: userDeleteReducer,
            userProfile: userProfileReducer,
            userUpdate: userUpdateReducer
        },
        preloadedState: {
            cart: { items: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod: paymentMethodFromStorage },
            userInfo: userFromStorage
        }
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;