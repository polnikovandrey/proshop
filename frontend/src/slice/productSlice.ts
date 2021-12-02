import { ProductsDetailsState, ProductsListState } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ProductData } from "../data/ProductData";

export const productListSlice = createSlice({
    name: 'productList',
    initialState: {} as ProductsListState,
    reducers: {
        productListRequest: (state) => {
            return { loading: true };
        },
        productListSuccess: (state, action: PayloadAction<ProductData[]>) => {
            return { loading: false, payload: action.payload };
        },
        productListFail: (state, action: PayloadAction<string>) => {
            return { loading: false, error: action.payload };
        }
    }
});

export const { productListRequest, productListSuccess, productListFail } = productListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProductList = (state: RootState) => state.productList;

export const productListReducer = productListSlice.reducer;


export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {} as ProductsDetailsState,
    reducers: {
        productDetailRequest: (state) => {
            return { loading: true };
        },
        productDetailSuccess: (state, action: PayloadAction<ProductData>) => {
            return { loading: false, payload: action.payload };
        },
        productDetailFail: (state, action: PayloadAction<string>) => {
            return { loading: false, error: action.payload };
        }
    }
});

export const { productDetailRequest, productDetailSuccess, productDetailFail } = productDetailSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProductDetail = (state: RootState) => state.productDetail;

export const productDetailReducer = productDetailSlice.reducer;