import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { ProductData } from "../data/ProductData";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadProductListAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ProductsListState } from "../store/types";

const HomeScreen = () => {

    const productList: ProductsListState = useAppSelector((state: { productList: ProductsListState }) => state.productList);

    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            await loadProductListAction(dispatch);
        })();
    }, [ dispatch ]);

    return (
        <>
            <h1>Latest Products</h1>
            {productList.loading
                ? <Loader/>
                : productList.error
                    ? <Message variant='danger'>{productList.error}</Message>
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