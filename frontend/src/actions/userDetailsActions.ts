import { Dispatch } from "redux";
import axios, { AxiosRequestConfig } from "axios";
import { UserInfo } from "../store/types";
import { userProfileClear, userProfileFail, userProfileRequest, userProfileSuccess } from "../slice/userProfileSlice";

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
        dispatch(userProfileSuccess(data));
    } catch (error: any) {
        dispatch(userProfileFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const clearUserProfileAction = (dispatch: Dispatch) => {
    dispatch(userProfileClear());
}