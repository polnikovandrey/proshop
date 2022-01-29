import React, { FormEventHandler, useEffect } from 'react';
import { CartState, numberToPrice, numberToPriceString, Order, OrderState } from "../store/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCart } from "../slice/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import { Link } from 'react-router-dom';
import { orderCreateAction } from "../actions/orderActions";
import { selectUserInfo } from "../slice/userSlice";
import { selectOrderCreate } from "../slice/orderCreateSlice";
import { History } from "history";

const PlaceOrderScreen = ({ history }: { history: History }) => {
    const cart: CartState = useAppSelector(selectCart);
    const itemsPrice: number = numberToPrice(cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0));
    const shippingPrice: number = numberToPrice(itemsPrice > 100 ? 0 : 100);
    const taxPrice: number = numberToPrice(0.15 * itemsPrice);
    const totalPrice: number = numberToPrice(itemsPrice + shippingPrice + taxPrice);
    const order: Order = { ...cart, itemsPrice, shippingPrice, taxPrice, totalPrice };
    const dispatch = useAppDispatch();
    const createOrderState: OrderState = useAppSelector(selectOrderCreate);
    useEffect(() => {
        if (createOrderState.order) {
            history.push(`/order/${createOrderState.order._id}`);
        }
    }, [history, createOrderState]);
    const userInfoState = useAppSelector(selectUserInfo);
    const placeOrderHandler: FormEventHandler = async () => {
        if (userInfoState.user) {
            await orderCreateAction(order, userInfoState.user.token, dispatch);
        }
    };
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
                                                        {item.quantity} x ${numberToPriceString(item.price)} = ${numberToPriceString(item.quantity * item.price)}
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
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={order.items.length === 0} onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {createOrderState.error && <Message variant='danger'>{createOrderState.error}</Message>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;