import { Dispatch } from "redux";
import { UserInfo } from "../store/types";
import { userLoginFail, userLoginRequest, userLoginSuccess, userLogout } from "../slice/userSlice";
import axios, { AxiosRequestConfig } from "axios";

export const userLoginAction = async (email: string, password: string, dispatch: Dispatch) => {
    try {
        dispatch(userLoginRequest());
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data }: { data: UserInfo } = await axios.post('/api/users/login', { email, password }, config);
        dispatch(userLoginSuccess(data));
        localStorage.setItem('user', JSON.stringify(data));
    } catch (error: any) {
        dispatch(userLoginFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const userLogoutAction = async (dispatch: Dispatch) => {
    localStorage.removeItem('user');
    dispatch(userLogout());
};