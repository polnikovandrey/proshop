import { Reducer } from "redux";
import { ProductData } from "../data/ProductData";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { ProductAction } from "../actions/productActions";

class ProductsState {
    constructor(
        public loading: boolean,
        public payload?: ProductData[],
        public error?: string
    ) {
    }
}

const initialState: ProductsState = new ProductsState(false, []);

export const productListReducer: Reducer = (state: ProductsState = initialState, action: ProductAction) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return new ProductsState(true, []);
        case PRODUCT_LIST_SUCCESS:
            return new ProductsState(false, action.payload);
        case PRODUCT_LIST_FAIL:
            return new ProductsState(false, [], action.error);
        default:
            return state;
    }
};