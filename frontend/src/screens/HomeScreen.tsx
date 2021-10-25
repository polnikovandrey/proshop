import React from "react";
import {products} from "../products";
import {Col, Row} from "react-bootstrap";
import Product from "../components/Product";
import {ProductData} from "../data/ProductData";

const HomeScreen = () => {
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((productData: ProductData) => {
                    return <Col key={productData._id} sm={12} md={6} lg={4} xl={3}>
                        <Product productData={productData}/>
                    </Col>
                })}
            </Row>

        </>
    )
};
export default HomeScreen;