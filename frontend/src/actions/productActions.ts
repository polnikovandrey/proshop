import axios, { AxiosRequestConfig } from "axios";
import { Dispatch } from "redux";
import { productDetailFail, productDetailRequest, productDetailSuccess, productListFail, productListRequest, productListSuccess } from "../slice/productSlice";
import { ProductItem } from "../store/types";
import { productDeleteFail, productDeleteRequest, productDeleteSuccess } from "../slice/productDeleteSlice";

export const loadProductListAction = async (dispatch: Dispatch) => {
    try {
        dispatch(productListRequest());
        const { data }: { data: ProductItem[] } = await axios.get('/api/product');
        dispatch(productListSuccess(data));
    } catch (error: any) {
        dispatch(productListFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const loadProductDetailsAction = async (productId: string, dispatch: Dispatch) => {
    try {
        dispatch(productDetailRequest());
        const { data }: { data: ProductItem } = await axios.get(`/api/product/${productId}`);
        dispatch(productDetailSuccess(data));
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