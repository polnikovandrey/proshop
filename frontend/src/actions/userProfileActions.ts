import { Dispatch } from "redux";
import axios, { AxiosRequestConfig } from "axios";
import { UserInfo, UserProfile } from "../store/types";
import { userProfileFail, userProfileRequest, userProfileReset, userProfileSuccess } from "../slice/userProfileSlice";

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