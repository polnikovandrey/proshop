import React, { FormEventHandler, useEffect, useState } from "react";
import { match } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Col, Form, FormControl, Image, ListGroup, Row } from "react-bootstrap";
import { Rating } from "../components/Rating";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createReviewAction, loadProductDetailsAction, resetCreateReviewAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { History } from "history";
import { ProductsDetailsState, ReviewCreateState, UserState } from "../store/types";
import { selectProductDetail } from "../slice/productSlice";
import { selectReviewCreate } from "../slice/reviewCreateSlice";
import { selectUserInfo } from "../slice/userSlice";

const ProductScreen = ({ history, match }: { history: History, match: match<{ id: string }> }) => {
    const [ quantity, setQuantity ] = useState(1);
    const [ rating, setRating ] = useState(0);
    const [ comment, setComment ] = useState('');
    const userState: UserState = useAppSelector(selectUserInfo);
    const { user } = userState;
    const token = user?.token || '';
    const productDetails: ProductsDetailsState = useAppSelector(selectProductDetail);
    const reviewCreate: ReviewCreateState = useAppSelector(selectReviewCreate);
    const { success: successReviewCreate, error: errorReviewCreate } = reviewCreate;
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async () => {
            if (successReviewCreate) {
                alert('Review submitted')
                setRating(0);
                setComment('');
                resetCreateReviewAction(dispatch);
            }
            await loadProductDetailsAction(match.params.id, dispatch);
        })();
    }, [ dispatch, match, successReviewCreate ]);
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?quantity=${quantity}`);
    };
    const submitHandler: FormEventHandler = async (event) => {
        event.preventDefault();
        await createReviewAction(match.params.id, { rating, comment }, token, dispatch);
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
                            <>
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
                                                                <Col>Quantity</Col>
                                                                <Col>
                                                                    <FormControl as='select' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
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
                                <Row>
                                    <Col md={6}>
                                        <h2>Reviews</h2>
                                        { productDetails.item.reviews.length === 0 && <Message>No reviews</Message> }
                                        <ListGroup variant='flush'>
                                            {
                                                productDetails.item.reviews.map(review => (
                                                    <ListGroup.Item key={review._id}>
                                                        <strong>{review.name}</strong>
                                                        <Rating ratingItem={{ rating: review.rating }}/>
                                                        <p>{review.createdAt.toString().substring(0, 10)}</p>
                                                        <p>{review.comment}</p>
                                                    </ListGroup.Item>
                                                ))
                                            }
                                            <ListGroup.Item>
                                                <h2>Write a customer review</h2>
                                                { errorReviewCreate && <Message variant='danger'>{errorReviewCreate}</Message> }
                                                { user
                                                    ? (
                                                        <Form onSubmit={submitHandler}>
                                                            <Form.Group controlId='rating'>
                                                                <Form.Label>Rating</Form.Label>
                                                                <Form.Control as='select' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                                                    <option value=''>Select...</option>
                                                                    <option value='1'>1 - Poor</option>
                                                                    <option value='2'>2 - Fair</option>
                                                                    <option value='3'>3 - Good</option>
                                                                    <option value='4'>4 - Very good</option>
                                                                    <option value='5'>5 - Excellent</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Form.Group controlId='comment'>
                                                                <Form.Label>Comment</Form.Label>
                                                                <Form.Control as='textarea' rows={3} value={comment} onChange={(e) => setComment(e.target.value)}/>
                                                            </Form.Group>
                                                            <Button type='submit' variant='primary'>Submit</Button>
                                                        </Form>
                                                    )
                                                    : <Message>Please <Link to='/login'>sign in</Link> to write a review</Message> }
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </>
                        )
                        : <h3>Empty</h3>
            }
        </>
    );
};
export default ProductScreen;