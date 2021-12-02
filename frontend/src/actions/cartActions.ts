import { ProductData } from "../data/ProductData";
import axios from "axios";
import { Dispatch } from "redux";
import { addCartItem, removeCartItem } from "../slice/cartSlice";
import store from "../store/store";

export const cartAddItemAction = async (id: string, qty: number, dispatch: Dispatch) => {
    const { data }: { data: ProductData } = await axios.get(`/api/product/${id}`);
    dispatch(addCartItem({ productId: data._id, name: data.name, image: data.image, price: data.price, countInStock: data.countInStock, qty: data.countInStock}));
    localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems));
}

export const cartRemoveItemAction = async (dispatch: Dispatch) => {
    dispatch(removeCartItem());    // TODO !!! payload
}