import { ProductData } from "../data/ProductData";
import { AppDispatch } from "../store";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import { ActionDispatchParams } from "../reducers/reducers";

export type CartAction = { type: string, payload?: ProductData[], error?: string };

const cartActionDispatcher = ({ dispatch, action }: ActionDispatchParams<CartAction>) => dispatch(action);

export const cartAddItemAction = async (dispatch: AppDispatch) => {
    cartActionDispatcher({ dispatch, action: { type: CART_ADD_ITEM, payload: [] }});
}

export const cartRemoveItemAction = async (dispatch: AppDispatch) => {
    cartActionDispatcher( { dispatch, action: { type: CART_REMOVE_ITEM, payload: [] }});
}