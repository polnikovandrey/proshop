import { UserInfo, UserState } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const userSlice = createSlice({
    name: 'userLogin',
    initialState: { } as UserState,
    reducers: {
        userLoginRequest: () => {
            return { loading: true };
        },
        userLoginSuccess: (state, action: PayloadAction<UserInfo>) => {
            return { user: action.payload };
        },
        userLoginFail: (state, action: PayloadAction<string>) => {
            return { error: action.payload };
        },
        userLogout: () => {
            return { };
        }
    }
});

export const { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser: (state: RootState) => UserState = state => state.userLogin;

export const userReducer = userSlice.reducer;