import React, { useEffect } from 'react';
import { match } from "react-router";
import { addDecimals, OrderState } from "../store/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import { Link } from 'react-router-dom';
import { orderDetailAction } from "../actions/orderActions";
import { selectUserInfo } from "../slice/userSlice";
import { selectOrderDetail } from "../slice/orderDetailSlice";
import Loader from "../components/Loader";

const OrderScreen = ({ match }: { match: match<{ id: string }> }) => {
    const dispatch = useAppDispatch();
    const orderDetailState: OrderState = useAppSelector(selectOrderDetail);
    const { loading, order, error } = orderDetailState;
    const userInfoState = useAppSelector(selectUserInfo);
    const token: string = userInfoState.user?.token || '';
    const orderId: string = match.params.id;
    useEffect(() => {
        if (token) {
            (async () => {
                await orderDetailAction(orderId, token, dispatch);
            })();
        }
    }, [token, orderId, dispatch]);
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
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {order.paymentMethod}
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
                                                            {item.quality} x ${addDecimals(item.price)} = ${addDecimals(item.quality * item.price)}
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
                                        <Col>${addDecimals(order.itemsPrice)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${addDecimals(order.shippingPrice)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${addDecimals(order.taxPrice)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${addDecimals(order.totalPrice)}</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        : <Message variant='danger'>No order</Message>;

};

export default OrderScreen;