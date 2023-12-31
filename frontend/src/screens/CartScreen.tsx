import React, { useEffect } from "react";
import { match } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cartAddItemAction, cartRemoveItemAction } from "../actions/cartActions"
import { History } from "history";
import { Link } from "react-router-dom";
import { Button, Card, Col, FormControl, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import { selectCart } from "../slice/cartSlice";
import { CartItem } from "../store/types";
import { orderCreateResetAction, orderDeliverResetAction, orderDetailResetAction, orderPayResetAction } from "../actions/orderActions";

const CartScreen = ({ history, location, match }: { history: History, location: Location, match: match<{ id: string }> }) => {
    const productId: string = match.params.id;
    const quantity: number = location.search ? Number(location.search.split('=')[1]) : 1;            // location.search = ?quantity=5
    const dispatch = useAppDispatch();
    const { items }: { items: CartItem[] } = useAppSelector(selectCart);
    const checkoutHandler = async () => {
        await orderDetailResetAction(dispatch);
        await orderPayResetAction(dispatch);
        await orderCreateResetAction(dispatch);
        await orderDeliverResetAction(dispatch);
        history.push('/login?redirect=shipping');
    };
    useEffect(() => {
        (async () => {
            if (productId) {
                await cartAddItemAction(productId, quantity, dispatch);
            }
        })();
    }, [ dispatch, productId, quantity ]);
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {items.length === 0
                    ? <Message>Your cart is empty <Link to='/'>Go back</Link> </Message>
                    : (
                        <ListGroup variant='flush'>
                            {items.map(item => {
                                return (
                                    <ListGroup.Item key={item.productId}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col md={2}>
                                                <FormControl as='select'
                                                             value={item.quantity}
                                                             onChange={(e) => cartAddItemAction(item.productId, Number(e.target.value), dispatch)}>
                                                    {
                                                        [...Array(item.countInStock)]
                                                            .map((key: string, value: number) => {
                                                                return (
                                                                    <option key={value + 1} value={value + 1}>
                                                                        {value + 1}
                                                                    </option>
                                                                );
                                                            })
                                                    }
                                                </FormControl>
                                            </Col>
                                            <Col md={2}>
                                                <Button type='button' variant='light' onClick={() => cartRemoveItemAction(item.productId, dispatch)}>
                                                    <i className='fas fa-trash'/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({items.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0)}) items</h2>
                            ${items.reduce((accumulator, currentItem) => accumulator + currentItem.quantity * currentItem.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={items.length === 0} onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;