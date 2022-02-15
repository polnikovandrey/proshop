import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Loader from "../components/Loader";
import { Button, Table } from "react-bootstrap";
import Message from "../components/Message";
import { selectUserInfo } from "../slice/userSlice";
import { History } from "history";
import { selectOrderList } from "../slice/orderListSlice";
import { orderListAction } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

const OrderListScreen = ({ history }: { history: History }) => {
    const dispatch = useAppDispatch();
    const orderList = useAppSelector(selectOrderList);
    const { loading, orders, error } = orderList;
    const userInfoState = useAppSelector(selectUserInfo);
    const token = userInfoState?.user?.token || '';
    const admin = userInfoState.user?.admin;

    useEffect(() => {
        (async () => {
            if (admin) {
                await orderListAction(token, dispatch);
            } else {
                history.push('/login');
            }
        })();
    }, [ admin, dispatch, history, token ]);
    return (
        <>
            <h1>Orders</h1>
            { loading && <Loader/> }
            { error && <Message variant='danger'>{error}</Message> }
            { !loading && !error && (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders?.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.toString().substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    { order.paid
                                        ? order.paidAt.toString().substring(0, 10)
                                        : <i className='fas fa-times' style={{color: 'red'}}/> }
                                </td>
                                <td>
                                    { order.delivered
                                        ? order.deliveredAt.toString().substring(0, 10)
                                        : <i className='fas fa-times' style={{color: 'red'}}/> }
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrderListScreen;