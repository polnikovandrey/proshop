import { Dispatch } from "redux";
import axios, { AxiosRequestConfig } from "axios";
import { UserInfo } from "../store/types";
import { userDetailsFail, userDetailsRequest, userDetailsSuccess } from "../slice/userDetailsSlice";

export const getUserDetailsAction = async (id: string, token: string, dispatch: Dispatch) => {
    try {
        dispatch(userDetailsRequest());
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        const { data }: { data: UserInfo } = await axios.get(`/api/users/${id}`, config);
        dispatch(userDetailsSuccess(data));
    } catch (error: any) {
        dispatch(userDetailsFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};