import axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { ProductData } from "../data/ProductData";
import { ActionCreator, AnyAction, Dispatch } from "redux";

export const listProducts: ActionCreator<any> = () => async (dispatch: Dispatch<AnyAction>) =>  {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data }: { data: ProductData[] } = await axios.get('/api/product');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error: any) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};