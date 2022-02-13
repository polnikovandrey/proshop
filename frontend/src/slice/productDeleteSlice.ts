import { ProductDeleteStata } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const productDeleteSlice = createSlice({
    name: 'productDelete',
    initialState: { } as ProductDeleteStata,
    reducers: {
        productDeleteRequest: () => {
            return { loading: true };
        },
        productDeleteSuccess: () => {
            return { success: true };
        },
        productDeleteFail: (state, action: PayloadAction<string>) => {
            return { error: action.payload };
        },
    }
});

export const { productDeleteRequest, productDeleteSuccess, productDeleteFail } = productDeleteSlice.actions;

export const selectProductDelete: (state: RootState) => ProductDeleteStata = state => state.productDelete;

export const productDeleteReducer = productDeleteSlice.reducer;