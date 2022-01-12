import { Dispatch } from "redux";
import axios, { AxiosRequestConfig } from "axios";
import { UserInfo, UserProfile } from "../store/types";
import {
    userProfileFail,
    userProfileRequest,
    userProfileReset,
    userProfileSuccess,
    userProfileUpdateFail,
    userProfileUpdateRequest,
    userProfileUpdateSuccess
} from "../slice/userProfileSlice";

export const getUserProfileAction = async (id: string, token: string, dispatch: Dispatch) => {
    try {
        dispatch(userProfileRequest());
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        const { data }: { data: UserInfo } = await axios.get(`/api/users/${id}`, config);
        const userProfile: UserProfile = { name: data.name, email: data.email };
        dispatch(userProfileSuccess(userProfile));
    } catch (error: any) {
        dispatch(userProfileFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const clearUserProfileAction = (dispatch: Dispatch) => {
    dispatch(userProfileReset());
}

export const updateUserProfileAction = async (id: string, token: string, userProfile: UserProfile, dispatch: Dispatch) => {
    const dataOut = { userProfile: { _id: id, name: userProfile.name, email: userProfile.email, password: userProfile.password }};
    try {
        dispatch(userProfileUpdateRequest());
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        const { data }: { data: UserInfo } = await axios.put(`/api/users/profile`, dataOut, config);
        const userProfile: UserProfile = { name: data.name, email: data.email };
        dispatch(userProfileUpdateSuccess(userProfile));
    } catch (error: any) {
        dispatch(userProfileUpdateFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};