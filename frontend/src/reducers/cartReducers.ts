import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import { ProductData } from "../data/ProductData";
import { ActionToState } from "./reducers";
import { CartAction } from "../actions/cartActions";

export type CartState = { loading?: boolean, payload?: ProductData[], error?: string };

const initialCartState: CartState = { payload: [] };

export const productListReducer = (state: CartState = initialCartState, action: CartAction) => {
    return cartActionToState(state, action);
};

const cartActionToState: ActionToState<CartState, CartAction> = (state, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            return { loading: false, payload: action.payload };
        case CART_REMOVE_ITEM:
            return { loading: false, payload: action.payload };
        default:
            return state;
    }
};