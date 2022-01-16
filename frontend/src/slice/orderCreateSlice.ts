import { Order, OrderCreateState } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const orderCreateSlice = createSlice({
    name: 'orderCreate',
    initialState: {} as OrderCreateState,
    reducers: {
        orderCreateRequest: () => {
            return { loading: true };
        },
        orderCreateSuccess: (state, action: PayloadAction<Order>) => {
            return { order: action.payload };
        },
        orderCreateFail: (state, action: PayloadAction<string>) => {
            return { error: action.payload };
        }
    }
});

export const { orderCreateRequest, orderCreateSuccess, orderCreateFail } = orderCreateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrderCreate: (state: RootState) => OrderCreateState = state => state.orderCreate;

export const orderCreateReducer = orderCreateSlice.reducer;