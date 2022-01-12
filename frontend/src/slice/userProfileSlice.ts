import { UserInfo, UserProfileState } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: { } as UserProfileState,
    reducers: {
        userProfileRequest: () => {
            return { loading: true };
        },
        userProfileSuccess: (state, action: PayloadAction<UserInfo>) => {
            return { user: action.payload };
        },
        userProfileFail: (state, action: PayloadAction<string>) => {
            return { error: action.payload };
        },
        userProfileClear: () => {
            return { };
        }
    }
});

export const {
    userProfileRequest, userProfileSuccess, userProfileFail, userProfileClear
} = userProfileSlice.actions;

export const selectUserProfile: (state: RootState) => UserProfileState = state => state.userProfile;

export const userProfileReducer = userProfileSlice.reducer;