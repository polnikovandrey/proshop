import React, { useEffect } from "react";
import { match } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartAddItemAction } from "../actions/cartActions"
import { History } from "history";

const CartScreen = ({ history, location, match }: { history: History, location: Location, match: match<{ id: string }> }) => {
    const productId: string = match.params.id;
    const qty: number = location.search ? Number(location.search.split('=')[1]) : 1;            // location.search = ?qty=5
    const dispatch = useAppDispatch();

    const { items } = useAppSelector(state => state.cart);

    useEffect(() => {
        if (productId) {
            (async () => {
                await cartAddItemAction(productId, qty, dispatch);
            })();
        }
    }, [ dispatch, productId, qty ]);
    return <></>;
}

export default CartScreen;