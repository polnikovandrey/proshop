import { ProductData } from "../data/ProductData";
import { AppDispatch } from "../store";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import axios from "axios";

export type ProductListAction = { type: string, payload?: ProductData[], error?: string };

const productListDispatch = (dispatch: AppDispatch, productListAction: ProductListAction) => {
    dispatch(productListAction);
};

export const loadProductListAction = async (dispatch: AppDispatch) => {
    try {
        productListDispatch(dispatch, { type: PRODUCT_LIST_REQUEST });
        const { data }: { data: ProductData[] } = await axios.get('/api/product');
        productListDispatch(dispatch, { type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error: any) {
        productListDispatch(dispatch, { type: PRODUCT_LIST_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};