import React, { useEffect, useState } from "react";
import { match } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Col, FormControl, Image, ListGroup, Row } from "react-bootstrap";
import { Rating } from "../components/Rating";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadProductDetailsAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { History } from "history";
import { ProductsDetailsState } from "../store/types";
import { selectProductDetail } from "../slice/productSlice";

const ProductScreen = ({ history, match }: { history: History, match: match<{ id: string }> }) => {

    const [ quality, setQuality ] = useState(1);

    const productDetails: ProductsDetailsState = useAppSelector(selectProductDetail);

    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            await loadProductDetailsAction(match.params.id, dispatch);
        })();
    }, [ match, dispatch ]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?quality=${quality}`);
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go back</Link>
            {productDetails.loading
                ? <Loader/>
                : productDetails.error
                    ? <Message variant='danger'>{productDetails.error}</Message>
                    : productDetails.item
                        ? (
                            <Row>
                                <Col md={6}>
                                    <Image src={productDetails.item.image} alt={productDetails.item.name} fluid/>
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h3>{productDetails.item.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating ratingItem={{ rating: productDetails.item.rating, numReviews: productDetails.item.numReviews}}/>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Price: ${productDetails.item.price}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Description: {productDetails.item.description}
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
                                                        <strong>${productDetails.item.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Status:
                                                    </Col>
                                                    <Col>
                                                        <strong>{productDetails.item.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {
                                                productDetails.item.countInStock > 0 &&  (
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Quality</Col>
                                                            <Col>
                                                                <FormControl as='select' value={quality} onChange={(e) => setQuality(Number(e.target.value))}>
                                                                    {
                                                                        [...Array(productDetails.item.countInStock)]
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
                                                <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={productDetails.item.countInStock === 0}>
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