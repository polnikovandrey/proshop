import React, { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
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
import { loadProductDetailsAction, resetUpdateProductAction, updateProductAction } from "../actions/productActions";
import { selectProductUpdate } from "../slice/productUpdateSlice";
import axios from "axios";

const ProductEditScreen = ({ history, match }: { history: History, match: match<{ id: string }> }) => {
    const productId: string = match.params.id;
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState(0);
    const [ image, setImage ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ countInStock, setCountInStock ] = useState(0);
    const [ description, setDescription ] = useState('');
    const [ uploading, setUploading ] = useState(false);

    const userInfoState = useAppSelector(selectUserInfo);
    const token = userInfoState?.user?.token || '';
    const productDetails = useAppSelector(selectProductDetail);
    const { loading, item: product, error } = productDetails;
    const productDetailId = product?._id;
    const productUpdate = useAppSelector(selectProductUpdate);
    const { loading: loadingUpdate, product: updatedProduct, error: errorUpdate } = productUpdate;


    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            if (updatedProduct) {
                resetUpdateProductAction(dispatch);
                history.push('/admin/productList');
            } else if (productDetailId !== productId) {
                await loadProductDetailsAction(productId, dispatch);
            } else if (product) {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        })();
    }, [ dispatch, history, product, productId, productDetailId, updatedProduct ]);

    const submitHandler: FormEventHandler = async (event) => {
        event.preventDefault();
        const updateProduct = { _id: productId, name, price, image, brand, category, countInStock, description };
        await updateProductAction(updateProduct, token, dispatch);
    };
    const uploadFileHandler: FormEventHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const { data:imageUrl }: { data: string } = await axios.post('/api/upload', formData, config);
            setImage(imageUrl);
            setUploading(false);
        } catch (err: any) {
            console.error(err);
            setUploading(false);
        }
    };
    return (
        <>
            <Link to='/admin/productList' className='btn btn-light my-3'>Go back</Link>
            <FormContainer>
                <h1>Edit product</h1>
                { (loading || loadingUpdate) && <Loader/> }
                { (error || errorUpdate) && <Message variant='danger'>{error || errorUpdate}</Message>}
                { (!loading && !loadingUpdate && !error && !errorUpdate)
                    && (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId='price' className='mb-3'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
                            </Form.Group>
                            <Form.Group controlId='image' className='mb-3'>
                                <Form.Label>Enter Image</Form.Label>
                                <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId='image' className='mb-3'>
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type='file' onChange={uploadFileHandler}/>
                                { uploading && <Loader/> }
                            </Form.Group>
                            <Form.Group controlId='brand' className='mb-3'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId='countInStock' className='mb-3'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control type='number' placeholder='Enter count in stock' value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))}/>
                            </Form.Group>
                            <Form.Group controlId='category' className='mb-3'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId='description' className='mb-4'>
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