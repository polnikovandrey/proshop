import axios, { AxiosRequestConfig } from "axios";
import { Dispatch } from "redux";
import { Order, OrderDetail } from "../store/types";
import { orderCreateFail, orderCreateRequest, orderCreateSuccess } from "../slice/orderCreateSlice";
import { orderDetailFail, orderDetailRequest, orderDetailSuccess } from "../slice/orderDetailSlice";
import { orderPayFail, orderPayRequest, orderPayReset, orderPaySuccess } from "../slice/orderPaySlice";
import { orderUserListFail, orderUserListRequest, orderUserListSuccess } from "../slice/orderUserListSlice";

export const orderCreateAction = async (order: Order, token: string, dispatch: Dispatch) => {
    try {
        dispatch(orderCreateRequest());
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        const { data }: { data: Order } = await axios.post('/api/orders', order, config);
        dispatch(orderCreateSuccess(data));
    } catch (error: any) {
        dispatch(orderCreateFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const orderDetailAction = async (orderId: string, token: string, dispatch: Dispatch) => {    // TODO !!! clean state after "Proceed to checkout"? Next order unavailable!
    try {
        dispatch(orderDetailRequest());
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const { data }: { data: OrderDetail } = await axios.get(`/api/orders/${orderId}`, config);
        dispatch(orderDetailSuccess(data));
    } catch (error: any) {
        dispatch(orderDetailFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const orderPayAction = async (orderId: string, paymentResult: any, token: string, dispatch: Dispatch) => {     // TODO !!! paymentResult type
    try {
        dispatch(orderPayRequest());
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        const { data }: { data: OrderDetail } = await axios.put(`/api/orders/${orderId}/paid`, paymentResult, config);
        dispatch(orderPaySuccess());
    } catch (error: any) {
        dispatch(orderPayFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const orderPayResetAction = async (dispatch: Dispatch) => {
    dispatch(orderPayReset());
};

export const orderUserListAction = async (token: string, dispatch: Dispatch) => {
    try {
        dispatch(orderUserListRequest());
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const { data }: { data: OrderDetail[] } = await axios.get('/api/orders/userOrderList', config);
        dispatch(orderUserListSuccess(data));
    } catch (error: any) {
        dispatch(orderUserListFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};