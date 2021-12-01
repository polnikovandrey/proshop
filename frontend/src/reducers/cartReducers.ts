import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import { ActionToState, CartAction, CartItem, CartState } from "../store/types";

const initialCartState: CartState = { cartItems: [] };

export const cartReducer = (state: CartState = initialCartState, action: CartAction) => {
    return cartActionToState(state, action);
};

const cartActionToState: ActionToState<CartState, CartAction> = (state, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            if (action.payload) {
                const actionItem: CartItem = action.payload;
                const stateItem = state.cartItems.find(item => item.productId === actionItem.productId);
                if (stateItem) {
                    return { cartItems: state.cartItems.map(item => item.productId === stateItem.productId ? actionItem : item) };
                } else {
                    return { cartItems: [ ...state.cartItems, actionItem ] };
                }
            } else {
                throw new Error('CartAction.payload undefined')
            }
        case CART_REMOVE_ITEM:
            return { cartItems: [] };
        default:
            return state;
    }
};