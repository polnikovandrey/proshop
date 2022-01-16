import React, { FormEventHandler, useEffect } from 'react';
import { CartState, Order, OrderCreateState } from "../store/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCart } from "../slice/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import { Link } from 'react-router-dom';
import { createOrderAction } from "../actions/orderActions";
import { selectUserInfo } from "../slice/userSlice";
import { selectOrderCreate } from "../slice/orderCreateSlice";
import { History } from "history";

const PlaceOrderScreen = ({ history }: { history: History }) => {
    const cart: CartState = useAppSelector(selectCart);
    const itemsPrice: number = cart.items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice: number = itemsPrice > 100 ? 0 : 100;
    const taxPrice: number = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice: number = itemsPrice + shippingPrice + taxPrice;
    const order: Order = { ...cart, itemsPrice, shippingPrice, taxPrice, totalPrice };
    const dispatch = useAppDispatch();
    const stateCreateOrder: OrderCreateState = useAppSelector(selectOrderCreate);
    useEffect(() => {
        if (stateCreateOrder.order) {
            history.push(`/order/${stateCreateOrder.order._id}`);
        }
    }, [history, stateCreateOrder]);
    const userInfoState = useAppSelector(selectUserInfo);
    const placeOrderHandler: FormEventHandler = async () => {
        if (userInfoState.user) {
            await createOrderAction(order, userInfoState.user.token, dispatch);
        }
    };
    const addDecimals: (num: number) => string = num => (Math.round(num * 100) / 100).toFixed(2);
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
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
                            {order.items.length === 0
                                ? <Message>Your cart is empty</Message>
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
                                                        {item.qty} x ${addDecimals(item.price)} = ${addDecimals(item.qty * item.price)}
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
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={order.items.length === 0} onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {stateCreateOrder.error && <Message variant='danger'>{stateCreateOrder.error}</Message>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;