import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { ProductData } from "../data/ProductData";
import axios from "axios";

const HomeScreen = () => {
    const [ products, setProducts ] = useState<ProductData[]>([]);
    useEffect(() => {
        (async () => {
            const { data }: { data: ProductData[] } = await axios.get('/api/product');
            setProducts(data);
        })();
    }, []);
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