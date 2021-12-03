import axios from "axios";
import { Dispatch } from "redux";
import { addCartItem, removeCartItem } from "../slice/cartSlice";
import store from "../store/store";
import { ProductItem } from "../store/types";

export const cartAddItemAction = async (id: string, qty: number, dispatch: Dispatch) => {
    const { data }: { data: ProductItem } = await axios.get(`/api/product/${id}`);
    dispatch(addCartItem({ productId: data._id, name: data.name, image: data.image, price: data.price, countInStock: data.countInStock, qty: qty}));
    localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.items));
}

export const cartRemoveItemAction = async (dispatch: Dispatch) => {
    dispatch(removeCartItem());    // TODO !!! payload
}