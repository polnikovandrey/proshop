import { ProductData } from "../data/ProductData";
import { AppDispatch } from "../store/store";
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/productConstants";
import axios from "axios";
import { createActionDispatcher } from "../store/types";

export type ProductListAction = { type: string, payload?: ProductData[], error?: string };


const productListDispatcher = createActionDispatcher<ProductListAction>();

export const loadProductListAction = async (dispatch: AppDispatch) => {
    try {
        productListDispatcher({ dispatch, action: { type: PRODUCT_LIST_REQUEST }});
        const { data }: { data: ProductData[] } = await axios.get('/api/product');
        productListDispatcher({ dispatch, action: { type: PRODUCT_LIST_SUCCESS, payload: data }});
    } catch (error: any) {
        productListDispatcher({ dispatch, action: { type: PRODUCT_LIST_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message }});
    }
};


export type ProductDetailsAction = { type: string, payload?: ProductData, error?: string };

const productDetailDispatcher = createActionDispatcher<ProductDetailsAction>();

export const loadProductDetailsAction = async (productId: string, dispatch: AppDispatch) => {
    try {
        productDetailDispatcher({dispatch, action: { type: PRODUCT_DETAILS_REQUEST }});
        const { data }: { data: ProductData } = await axios.get(`/api/product/${productId}`);
        productDetailDispatcher({dispatch, action: { type: PRODUCT_DETAILS_SUCCESS, payload: data }});
    } catch (error: any) {
        productDetailDispatcher({dispatch, action: { type: PRODUCT_DETAILS_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message }});
    }
};