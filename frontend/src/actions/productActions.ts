import axios, { AxiosRequestConfig } from "axios";
import { Dispatch } from "redux";
import { productDetailFail, productDetailRequest, productDetailSuccess, productListFail, productListRequest, productListSuccess } from "../slice/productSlice";
import { ProductItem } from "../store/types";
import { productDeleteFail, productDeleteRequest, productDeleteSuccess } from "../slice/productDeleteSlice";
import { productCreateFail, productCreateRequest, productCreateReset, productCreateSuccess } from "../slice/productCreateSlice";

export const loadProductListAction = async (dispatch: Dispatch) => {
    try {
        dispatch(productListRequest());
        const { data: products }: { data: ProductItem[] } = await axios.get('/api/product');
        dispatch(productListSuccess(products));
    } catch (error: any) {
        dispatch(productListFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const loadProductDetailsAction = async (productId: string, dispatch: Dispatch) => {
    try {
        dispatch(productDetailRequest());
        const { data: product }: { data: ProductItem } = await axios.get(`/api/product/${productId}`);
        dispatch(productDetailSuccess(product));
    } catch (error: any) {
        const errorMessage: string = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch(productDetailFail(errorMessage));
    }
};

export const deleteProductAction = async (productId: string, token: string, dispatch: Dispatch) => {
    try {
        dispatch(productDeleteRequest());
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        await axios.delete(`/api/product/${productId}`, config);
        dispatch(productDeleteSuccess());
    } catch (error: any) {
        const errorMessage: string = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch(productDeleteFail(errorMessage));
    }
};

export const createProductAction = async (token: string, dispatch: Dispatch) => {
    try {
        dispatch(productCreateRequest());
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const { data: product }: { data: ProductItem } = await axios.post('/api/product', {}, config);
        dispatch(productCreateSuccess(product));
    } catch (error: any) {
        const errorMessage: string = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch(productCreateFail(errorMessage));
    }
};

export const resetCreateProductAction = (dispatch: Dispatch) => {
    dispatch(productCreateReset());
}