import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { ProductData } from "../data/ProductData";
import { Dispatch } from "redux";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {      // TODO !!! redux -> typescript

    const dispatch: Dispatch<any> = useDispatch();

    const productList = useSelector((state: { productList: { loading: boolean, error: string, products: ProductData[] } }) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [ dispatch ]);

    return (
        <>
            <h1>Latest Products</h1>
            { loading
                ? <h2>Loading...</h2>
                : error
                    ? <h3>{error}</h3>
                    : (
                        <Row>
                            {products.map((productData: ProductData) => {
                                return <Col key={productData._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product productData={productData}/>
                                </Col>
                            })}
                        </Row>
                    )}
        </>
    )
};
export default HomeScreen;