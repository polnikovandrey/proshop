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
import { createProductAction, deleteProductAction, loadProductListAction, resetCreateProductAction } from "../actions/productActions";
import { selectProductDelete } from "../slice/productDeleteSlice";
import { selectProductCreate } from "../slice/productCreateSlice";

const ProductListScreen = ({ history, match }: { history: History, match: match<{ id: string }> }) => {
    const dispatch = useAppDispatch();

    const productListState = useAppSelector(selectProductList)
    const { loading, items, error } = productListState;
    const { user } = useAppSelector(selectUserInfo);
    const { token, admin } = user || { token: '', admin: false };
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = useAppSelector(selectProductDelete);
    const { loading: loadingCreate, product: createdProduct, success: successCreate, error: errorCreate } = useAppSelector(selectProductCreate);

    useEffect(() => {
        (async () => {
            resetCreateProductAction(dispatch);
            if (!admin) {
                history.push('/login');
            } else if (successCreate && createdProduct) {
                history.push(`/admin/product/${createdProduct._id}/edit`);
            } else {
                await loadProductListAction(dispatch);
            }
        })();
    }, [ admin, createdProduct, dispatch, history, successCreate, successDelete ]);
    const createProductHandler = async () => {
        await createProductAction(token, dispatch);
    }
    const deleteHandler = async (productId: string) => {
        if (window.confirm('Are you sure?')) {
            await deleteProductAction(productId, token, dispatch);
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
            { (loading || loadingDelete || loadingCreate) && <Loader/>}
            { (error || errorDelete || errorCreate) && <Message variant='danger'>{error || errorDelete || errorCreate}</Message>}
            { (!loading && !loadingDelete && !loadingCreate && !error && !errorDelete && !errorCreate) && (
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