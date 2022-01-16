import axios, { AxiosRequestConfig } from "axios";
import { Dispatch } from "redux";
import { Order } from "../store/types";
import { orderCreateFail, orderCreateRequest, orderCreateSuccess } from "../slice/orderCreateSlice";

export const createOrderAction = async (order: Order, token: string, dispatch: Dispatch) => {
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