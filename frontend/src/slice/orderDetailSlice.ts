import { Order, OrderState } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: { loading: true } as OrderState,
    reducers: {
        orderDetailRequest: () => {
            return { loading: true };
        },
        orderDetailSuccess: (state, action: PayloadAction<Order>) => {
            return { order: action.payload };
        },
        orderDetailFail: (state, action: PayloadAction<string>) => {
            return { error: action.payload };
        }
    }
});

export const { orderDetailRequest, orderDetailSuccess, orderDetailFail } = orderDetailSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrderDetail: (state: RootState) => OrderState = state => state.orderDetail;

export const orderDetailReducer = orderDetailSlice.reducer;