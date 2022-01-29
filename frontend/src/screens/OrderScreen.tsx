import React, { useEffect, useState } from 'react';
import { match } from "react-router";
import { numberToPriceString, OrderDetailState, OrderPayState } from "../store/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import { Link } from 'react-router-dom';
import { orderDetailAction, orderPayAction, orderPayResetAction } from "../actions/orderActions";
import { selectUserInfo } from "../slice/userSlice";
import { selectOrderDetail } from "../slice/orderDetailSlice";
import Loader from "../components/Loader";
import axios from "axios";
import { selectOrderPay } from "../slice/orderPaySlice";
import { PayPalButton } from "react-paypal-button-v2";

const OrderScreen = ({ match }: { match: match<{ id: string }> }) => {
    const [ sdkReady, setSdkReady ] = useState(false);
    const dispatch = useAppDispatch();
    const orderDetailState: OrderDetailState = useAppSelector(selectOrderDetail);
    const { loading, order, error } = orderDetailState;
    const orderPayState: OrderPayState = useAppSelector(selectOrderPay);
    const { loading: payLoading, success: paySuccess, error: payError } = orderPayState;
    const userInfoState = useAppSelector(selectUserInfo);
    const token: string = userInfoState.user?.token || '';
    const orderId: string = match.params.id;
    const addPayPalScript = async () => {
        const { data: clientId }: { data: string } = await axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => setSdkReady(true);
        document.body.appendChild(script);
    };
    useEffect(() => {
        (async () => {
            if (!order || order._id !== orderId || paySuccess) {
                await orderPayResetAction(dispatch);
                await orderDetailAction(orderId, token, dispatch);
            } else if (!order.paid) {
                if (window.paypal) {
                    setSdkReady(true);
                } else {
                    await addPayPalScript();
                }
            }
        })();
    }, [ dispatch, order, orderId, paySuccess, sdkReady, token ]);
    const successPaymentHandler = async (paymentDetails: any, paymentData: any) => {
        await orderPayAction(orderId, paymentDetails, token, dispatch);
    };
    return loading
        ? <Loader/>
        : error
            ? <Message variant='danger'>{error}</Message>
            : order ?
                <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>{order.user.name}
                                </p>
                                <p>
                                    <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {order.delivered
                                    ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                    : <Message variant='danger'>Not delivered</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.paid
                                    ? <Message variant='success'>Paid on {order.paidAt}</Message>
                                    : <Message variant='danger'>Not paid</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {!order.items || order.items.length === 0
                                    ? <Message>Order is empty</Message>
                                    : (
                                        <ListGroup variant='flush'>
                                            {order.items.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.productId}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${numberToPriceString(order.itemsPrice)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${numberToPriceString(order.shippingPrice)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${numberToPriceString(order.taxPrice)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${numberToPriceString(order.totalPrice)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {!order.paid && (
                                    <ListGroup.Item>
                                        {payLoading && <Loader/>}
                                        {!sdkReady ? <Loader/> : (
                                            <PayPalButton amount={numberToPriceString(order.totalPrice)} onSuccess={successPaymentHandler}/>
                                        )}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        : <Message variant='danger'>No order</Message>;

};

export default OrderScreen;