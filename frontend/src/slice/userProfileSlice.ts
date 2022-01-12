import { UserProfile, UserProfileState } from "../store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: { } as UserProfileState,
    reducers: {
        userProfileRequest: () => {
            return { loading: true };
        },
        userProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
            return { user: action.payload };
        },
        userProfileFail: (state, action: PayloadAction<string>) => {
            return { error: action.payload };
        },
        userProfileReset: () => {
            return { };
        },
        userProfileUpdateRequest: () => {
            return { loading: true };
        },
        userProfileUpdateSuccess: (state, action: PayloadAction<UserProfile>) => {
            return { user: action.payload };
        },
        userProfileUpdateFail: (state, action: PayloadAction<string>) => {
            return { error: action.payload };
        },
        userProfileUpdateReset: () => {
            return { };
        }
    }
});

export const {
    userProfileRequest, userProfileSuccess, userProfileFail, userProfileReset, userProfileUpdateRequest, userProfileUpdateSuccess, userProfileUpdateFail, userProfileUpdateReset
} = userProfileSlice.actions;

export const selectUserProfile: (state: RootState) => UserProfileState = state => state.userProfile;

export const userProfileReducer = userProfileSlice.reducer;