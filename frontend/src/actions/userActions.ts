import { Dispatch } from "redux";
import { UserInfo, UserListInfo } from "../store/types";
import { userLoginFail, userLoginRequest, userLoginSuccess, userLogout, userRegisterFail, userRegisterRequest, userRegisterSuccess } from "../slice/userSlice";
import axios, { AxiosRequestConfig } from "axios";
import { userListFail, userListRequest, userListSuccess } from "../slice/userListSlice";
import { userProfileReset } from "../slice/userProfileSlice";
import { orderUserListReset } from "../slice/orderUserListSlice";

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
    dispatch(userProfileReset());
    dispatch(orderUserListReset());
};

export const userRegisterAction = async (name: string, email: string, password: string, dispatch: Dispatch) => {
    try {
        dispatch(userRegisterRequest());
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data }: { data: UserInfo } = await axios.post('/api/users', { name, email, password }, config);
        dispatch(userRegisterSuccess(data));
        dispatch(userLoginSuccess(data));
        localStorage.setItem('user', JSON.stringify(data));
    } catch (error: any) {
        dispatch(userRegisterFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const userListAction = async (token: string, dispatch: Dispatch) => {
    try {
        dispatch(userListRequest());
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const { data }: { data: UserListInfo[] } = await axios.get('/api/users', config);
        dispatch(userListSuccess(data));
    } catch (error: any) {
        dispatch(userListFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};