import { Reducer } from "redux";
import { ProductData } from "../data/ProductData";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";

export class ProductsListState {
    constructor(
        public loading: boolean,
        public payload?: ProductData[] | undefined,
        public error?: string | undefined
    ) {
    }
}

const initialState: ProductsListState = new ProductsListState(false, []);

export const productListReducer: Reducer = (state: ProductsListState = initialState, action: { type: string, payload?: ProductData[], error?: string }) => {
    const { type, payload, error } = action;
    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return new ProductsListState(true, []);
        case PRODUCT_LIST_SUCCESS:
            return new ProductsListState(false, payload);
        case PRODUCT_LIST_FAIL:
            return new ProductsListState(false, [], error);
        default:
            return state;
    }
};