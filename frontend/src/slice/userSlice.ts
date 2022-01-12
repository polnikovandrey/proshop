import { UserInfo, UserState } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const userSlice = createSlice({
    name: 'userInfo',
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
        },
        userRegisterRequest: () => {
            return { loading: true };
        },
        userRegisterSuccess: (state, action: PayloadAction<UserInfo>) => {
            return { user: action.payload };
        },
        userRegisterFail: (state, action: PayloadAction<string>) => {
            return { error: action.payload };
        }
    }
});

export const {
    userLoginRequest, userLoginSuccess, userLoginFail,
    userLogout,
    userRegisterRequest, userRegisterSuccess, userRegisterFail
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserInfo: (state: RootState) => UserState = state => state.userInfo;

export const userReducer = userSlice.reducer;