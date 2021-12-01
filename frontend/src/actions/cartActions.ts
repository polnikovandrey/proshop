import { ProductData } from "../data/ProductData";
import { AppDispatch } from "../store/store";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import { CartAction, createActionDispatcher } from "../store/types";
import axios from "axios";

const cartActionDispatcher = createActionDispatcher<CartAction>();

export const cartAddItemAction = async (id: string, qty: number, dispatch: AppDispatch) => {
    const { data }: { data: ProductData } = await axios.get(`/api/product/${id}`);
    cartActionDispatcher(
        { dispatch,
            action: { type: CART_ADD_ITEM,
                payload: { productId: data._id, name: data.name, image: data.image, price: data.price, countInStock: data.countInStock, qty: data.countInStock} }});
    // localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems));
}

export const cartRemoveItemAction = async (dispatch: AppDispatch) => {
    cartActionDispatcher( { dispatch, action: { type: CART_REMOVE_ITEM }});    // TODO !!! payload
}