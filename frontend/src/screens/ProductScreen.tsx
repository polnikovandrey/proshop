import React, { useEffect, useState } from "react";
import { match } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Rating } from "../components/Rating";
import { ProductData } from "../data/ProductData";
import { ProductRatingData } from "../data/ProductRatingData";
import axios from "axios";

const ProductScreen = ({ match }: { match: match<{ id: string }> }) => {
    const [ productData, setProductData ] = useState<ProductData>();
    useEffect(() => {
        (async () => {
            const { data }: { data: ProductData } = await axios.get(`/api/product/${match.params.id}`);
            setProductData(data);
        })();
    }, [ match ]);
    const backButton = <Link className='btn btn-light my-3' to='/'>Go back</Link>;
    if (productData) {
        return (
            <>
                {backButton}
                <Row>
                    <Col md={6}>
                        <Image src={productData.image} alt={productData.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{productData.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating ratingData={new ProductRatingData(productData.rating, productData.numReviews)}/>
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