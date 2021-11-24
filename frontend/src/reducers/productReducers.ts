import { ProductData } from "../data/ProductData";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { ProductListAction } from "../actions/productActions";

export type ProductsListState = { loading?: boolean, payload?: ProductData[], error?: string };

const initialState: ProductsListState = {};

export const productListReducer = (state: ProductsListState = initialState, action: ProductListAction) => {
    return productListActionToState(state, action);
};

type ActionToState<S, A> = (state: S, action: A) => S;

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