import React, { useEffect } from "react";
import { match } from "react-router";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadProductListAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ProductItem } from "../store/types";
import { selectProductList } from "../slice/productSlice";
import Paginate from "../components/Paginate";
import { selectUserInfo } from "../slice/userSlice";

const HomeScreen = ({ match }: { match: match<{ keyword: string, pageNumber: string }> }) => {
    const keyword = match.params.keyword;
    const pageNumber: string = match.params.pageNumber || String(1);
    const productList = useAppSelector(selectProductList);
    const { loading, result, error } = productList;
    const { user } = useAppSelector(selectUserInfo);
    const admin: boolean = user?.admin || false;
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            await loadProductListAction(dispatch, keyword, pageNumber);
        })();
    }, [ dispatch, keyword, pageNumber ]);

    return (
        <>
            <h1>Latest Products</h1>
            { loading && <Loader/> }
            { error && <Message variant='danger'>{productList.error}</Message> }
            { result && (
                <>
                    <Row>
                        {result!.products ?
                            result!.products.map((productData: ProductItem) => {
                                return <Col key={productData._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product productItem={productData}/>
                                </Col>
                            })
                            : <h3>Empty</h3>}
                    </Row>
                    <Paginate pages={result.pages} page={result.page} admin={admin} keyword={keyword ? keyword : ''}/>
                </>
            )
            }
        </>
    )
};
export default HomeScreen;