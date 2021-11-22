import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { ProductData } from "../data/ProductData";
import { ProductAction } from "../actions/productActions";
import { appDispatch, useAppSelector } from "../hooks";
import axios from "axios";

const HomeScreen = () => {

    // TODO !!! ProductState
    const productList = useAppSelector((state: { productList: { loading: boolean, error: string, products: ProductData[] } }) => state.productList);

    const { loading, error, products } = productList;

    const loadProductsList = () => async () => {
        try {
            appDispatch(ProductAction.createProductListRequestAction());
            const { data }: { data: ProductData[] } = await axios.get('/api/product');
            appDispatch(ProductAction.createProductListSuccessAction(data));
        } catch (error: any) {
            appDispatch(ProductAction.createProductListFailAction(error.response && error.response.data.message ? error.response.data.message : error.message));
        }
    };

    useEffect(() => {
        appDispatch(loadProductsList());
    }, [ appDispatch ]);

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