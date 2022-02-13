import React, { useEffect } from 'react';
import { match } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Loader from "../components/Loader";
import { Button, Col, Row, Table } from "react-bootstrap";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { selectUserInfo } from "../slice/userSlice";
import { History } from "history";
import { selectProductList } from "../slice/productSlice";
import { loadProductListAction } from "../actions/productActions";

const ProductListScreen = ({ history, match }: { history: History, match: match<{ id: string }> }) => {
    const dispatch = useAppDispatch();

    const productListState = useAppSelector(selectProductList)
    const { loading, items, error } = productListState;
    const { user } = useAppSelector(selectUserInfo);
    const { token, admin } = user || {};
    useEffect(() => {
        (async () => {
            if (admin) {
                await loadProductListAction(dispatch);
            } else {
                history.push('/login');
            }
        })();
    }, [ admin, dispatch, history ]);
    async function createProductHandler() {
        // TODO create product
    }
    async function deleteHandler(productId: string) {
        if (window.confirm('Are you sure?')) {
            // TODO delete product
        }
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={() => createProductHandler()}>
                        <i className='fas fa-plus'/> Create Product
                    </Button>
                </Col>
            </Row>
            {loading
                ? <Loader/>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                items?.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer to={`product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'/>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    )}
        </>
    );
};

export default ProductListScreen;