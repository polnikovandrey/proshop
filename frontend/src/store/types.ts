import { AnyAction } from "redux";
import { ProductData } from "../data/ProductData";
import { AppDispatch } from "./store";


export type ActionToState<State, Action extends AnyAction> = (state: State, action: Action) => State;

export interface ActionDispatchParams<Action extends AnyAction> { dispatch: AppDispatch, action: Action }

export function createActionDispatcher<Action extends AnyAction>(): (params: ActionDispatchParams<Action>) => void {
    return ({ dispatch, action }) => dispatch(action);
}

export type CartItem = { productId: string, name: string, image: string, price: number, countInStock: number, qty: number };
export type CartState = { cartItems: CartItem[] };
export type CartAction = { type: string, payload?: CartItem };

export type ProductsListState = { loading?: boolean, payload?: ProductData[], error?: string };
export type ProductListAction = { type: string, payload?: ProductData[], error?: string };

export type ProductsDetailsState = { loading?: boolean, payload?: ProductData, error?: string };
export type ProductDetailsAction = { type: string, payload?: ProductData, error?: string };
