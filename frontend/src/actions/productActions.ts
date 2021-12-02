import { ProductData } from "../data/ProductData";
import axios from "axios";
import { Dispatch } from "redux";
import { productDetailFail, productDetailRequest, productDetailSuccess, productListFail, productListRequest, productListSuccess } from "../slice/productSlice";

export const loadProductListAction = async (dispatch: Dispatch) => {
    try {
        dispatch(productListRequest());
        const { data }: { data: ProductData[] } = await axios.get('/api/product');
        dispatch(productListSuccess(data));
    } catch (error: any) {
        dispatch(productListFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const loadProductDetailsAction = async (productId: string, dispatch: Dispatch) => {
    try {
        dispatch(productDetailRequest());
        const { data }: { data: ProductData } = await axios.get(`/api/product/${productId}`);
        dispatch(productDetailSuccess(data));
    } catch (error: any) {
        const errorMessage: string = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch(productDetailFail(errorMessage));
    }
};