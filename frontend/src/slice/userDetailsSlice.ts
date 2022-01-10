import { UserDetailsState, UserInfo } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: { } as UserDetailsState,
    reducers: {
        userDetailsRequest: () => {
            return { loading: true };
        },
        userDetailsSuccess: (state, action: PayloadAction<UserInfo>) => {
            return { userDetail: action.payload };
        },
        userDetailsFail: (state, action: PayloadAction<string>) => {
            return { error: action.payload };
        }
    }
});

export const {
    userDetailsRequest, userDetailsSuccess, userDetailsFail
} = userDetailsSlice.actions;

export const selectUserDetails: (state: RootState) => UserDetailsState = state => state.userDetails;

export const userDetailsReducer = userDetailsSlice.reducer;