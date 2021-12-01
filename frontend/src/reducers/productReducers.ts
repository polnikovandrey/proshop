import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/productConstants";
import { ActionToState, ProductDetailsAction, ProductListAction, ProductsDetailsState, ProductsListState } from "../store/types";

const initialListState: ProductsListState = {};

export const productListReducer = (state: ProductsListState = initialListState, action: ProductListAction) => {
    return productListActionToState(state, action);
};

const productListActionToState: ActionToState<ProductsListState, ProductListAction> = (state, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, payload: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.error };
        default:
            return state;
    }
};



const initialDetailsState: ProductsDetailsState = {};

export const productDetailsReducer = (state: ProductsDetailsState = initialDetailsState, action: ProductDetailsAction) => {
    return productDetailsActionToState(state, action);
};

const productDetailsActionToState: ActionToState<ProductsDetailsState, ProductDetailsAction> = (state, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, payload: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.error };
        default:
            return state;
    }
};