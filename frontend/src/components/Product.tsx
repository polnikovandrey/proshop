import React from "react";
import {Card} from "react-bootstrap";
import {Rating} from "./Rating";
import {ProductData} from "../data/ProductData";

const Product = ({ productData }: { productData: ProductData }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/product/${productData._id}`}>
                <Card.Img src={productData.image} variant='top'/>
            </a>
            <Card.Body>
                <a href={`/product/${productData._id}`}>
                    <Card.Title as='div'>
                        <strong>{productData.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as='div'>
                    <Rating ratingData={productData.toRatingData()}/>
                </Card.Text>
                <Card.Text as='h3'>${productData.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default Product;