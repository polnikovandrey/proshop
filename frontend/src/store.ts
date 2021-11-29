import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import { configureStore } from "@reduxjs/toolkit";
import { EnhancedStore } from "@reduxjs/toolkit/src/configureStore";

const store: EnhancedStore = configureStore(
    {
        reducer: {
            productList: productListReducer,
            productDetails: productDetailsReducer
        }
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;