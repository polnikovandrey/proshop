import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { ProductData } from "../data/ProductData";
import { useAppSelector } from "../hooks";
import { ProductsListState } from "../reducers/productReducers";
import { loadProductListAction } from "../actions/productActions";

const HomeScreen = () => {

    const productList: ProductsListState = useAppSelector((state: { productList: ProductsListState }) => state.productList);

    useEffect(() => {
        loadProductListAction().then();
    }, []);

    return (
        <>
            <h1>Latest Products</h1>
            {productList.loading
                ? <h2>Loading...</h2>
                : productList.error
                    ? <h3>{productList.error}</h3>
                    : (
                        <Row>
                            {productList.payload ?
                                productList.payload.map((productData: ProductData) => {
                                    return <Col key={productData._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product productData={productData}/>
                                    </Col>
                                })
                                : <h3>Empty</h3>}
                        </Row>
                    )}
        </>
    )
};
export default HomeScreen;