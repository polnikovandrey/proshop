import React, { FormEventHandler, useEffect, useState } from "react";
import { match } from "react-router";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { History } from "history";
import FormContainer from "../components/FormContainer";
import { selectUserInfo } from "../slice/userSlice";
import { selectProductDetail } from "../slice/productSlice";
import { loadProductDetailsAction } from "../actions/productActions";

const ProductEditScreen = ({ history, match }: { history: History, match: match<{ id: string }> }) => {
    const productId: string = match.params.id;
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState(0);
    const [ image, setImage ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ countInStock, setCountInStock ] = useState(0);
    const [ description, setDescription ] = useState('');

    const userInfoState = useAppSelector(selectUserInfo);
    const token = userInfoState?.user?.token || '';
    const productDetails = useAppSelector(selectProductDetail);
    const { loading, item: product, error } = productDetails;

    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            if (!product?.name || product._id !== productId ) {
                await loadProductDetailsAction(productId, dispatch);
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        })();
    }, [ dispatch, product, productId ]);

    const submitHandler: FormEventHandler = async (event) => {
        event.preventDefault();
        // TODO update product
    };
    return (
        <>
            <Link to='/admin/productList' className='btn btn-light my-3'>Go back</Link>
            <FormContainer>
                <h1>Edit product</h1>
                { loading
                    ? <Loader/>
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId='price'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
                                </Form.Group>
                                <Form.Group controlId='image'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId='brand'>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId='countInStock'>
                                    <Form.Label>Count In Stock</Form.Label>
                                    <Form.Control type='number' placeholder='Enter count in stock' value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))}/>
                                </Form.Group>
                                <Form.Group controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                                </Form.Group>
                                <Button type='submit' variant='primary'>
                                    Update
                                </Button>
                            </Form>
                        )}
            </FormContainer>
        </>
    );
}

export default ProductEditScreen;