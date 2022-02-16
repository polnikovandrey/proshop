import React, { useEffect } from "react";
import { match } from "react-router";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadProductListAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ProductItem, ProductsListState } from "../store/types";
import { selectProductList } from "../slice/productSlice";

const HomeScreen = ({ match }: { match: match<{ keyword: string }> }) => {
    const keyword = match.params.keyword;
    const productList: ProductsListState = useAppSelector(selectProductList);

    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            await loadProductListAction(dispatch, keyword);
        })();
    }, [ dispatch, keyword ]);

    return (
        <>
            <h1>Latest Products</h1>
            {productList.loading
                ? <Loader/>
                : productList.error
                    ? <Message variant='danger'>{productList.error}</Message>
                    : (
                        <Row>
                            {productList.items ?
                                productList.items.map((productData: ProductItem) => {
                                    return <Col key={productData._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product productItem={productData}/>
                                    </Col>
                                })
                                : <h3>Empty</h3>}
                        </Row>
                    )}
        </>
    )
};
export default HomeScreen;