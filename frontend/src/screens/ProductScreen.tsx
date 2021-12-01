import React, { useEffect, useState } from "react";
import { match } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Col, FormControl, Image, ListGroup, Row } from "react-bootstrap";
import { Rating } from "../components/Rating";
import { ProductRatingData } from "../data/ProductRatingData";
import { ProductsDetailsState } from "../reducers/productReducers";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadProductDetailsAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { History } from "history";

const ProductScreen = ({ history, match }: { history: History, match: match<{ id: string }> }) => {

    const [ qty, setQty ] = useState(1);

    const productDetails: ProductsDetailsState = useAppSelector((state: { productDetails: ProductsDetailsState }) => state.productDetails);

    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            await loadProductDetailsAction(match.params.id, dispatch);
        })();
    }, [ match, dispatch ]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go back</Link>
            {productDetails.loading
                ? <Loader/>
                : productDetails.error
                    ? <Message variant='danger'>{productDetails.error}</Message>
                    : productDetails.payload
                        ? (
                            <Row>
                                <Col md={6}>
                                    <Image src={productDetails.payload.image} alt={productDetails.payload.name} fluid/>
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h3>{productDetails.payload.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating ratingData={new ProductRatingData(productDetails.payload.rating, productDetails.payload.numReviews)}/>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Price: ${productDetails.payload.price}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Description: {productDetails.payload.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Price:
                                                    </Col>
                                                    <Col>
                                                        <strong>${productDetails.payload.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Status:
                                                    </Col>
                                                    <Col>
                                                        <strong>{productDetails.payload.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {
                                                productDetails.payload.countInStock > 0 &&  (
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Qty</Col>
                                                            <Col>
                                                                <FormControl as='select' value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
                                                                    {
                                                                        [...Array(productDetails.payload.countInStock)]
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
                                                        </Row>
                                                    </ListGroup.Item>
                                                )
                                            }

                                            <ListGroup.Item>
                                                <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={productDetails.payload.countInStock === 0}>
                                                    Add to cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        )
                        : <h3>Empty</h3>
            }
        </>
    );
};
export default ProductScreen;