import React from "react";
import {match} from "react-router";
import {Link} from "react-router-dom";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {Rating} from "../components/Rating";
import {products} from "../products";
import {ProductData} from "../data/ProductData";

const ProductScreen = ({ match }: { match: match<{  id: string }> }) => {
    const productData: ProductData | undefined = products.find(p => p._id === match.params.id);
    const backButton = <Link className='btn btn-light my-3' to='/'>Go back</Link>;
    if (productData) {
        return (
            <>
                {backButton}
                <Row>
                    <Col md={6}>
                        <Image src={productData.image} alt={productData.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{productData.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating ratingData={productData.toRatingData()}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${productData.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {productData.description}
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
                                            <strong>${productData.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            <strong>{productData.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className='btn-block' type='button' disabled={productData.countInStock === 0}>
                                        Add to cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    } else {
        return (
            <>
                {backButton}
            </>
        );
    }
};
export default ProductScreen;