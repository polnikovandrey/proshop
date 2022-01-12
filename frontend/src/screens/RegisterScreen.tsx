import React, { FormEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { userRegisterAction } from "../actions/userActions";
import { History } from "history";
import FormContainer from "../components/FormContainer";
import { UserState } from "../store/types";
import { selectUserInfo } from "../slice/userSlice";

const RegisterScreen = ({ history, location }: { history: History, location: Location }) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    const userState: UserState = useAppSelector(selectUserInfo);
    const dispatch = useAppDispatch();

    const redirect: string = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userState?.user) {
            history.push(redirect);
        }
    }, [ history, redirect, userState ]);

    const submitHandler: FormEventHandler = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
        } else {
            await userRegisterAction(name, email, password, dispatch);
        }
    };
    return (
        <FormContainer>
            <h1>Sign up</h1>
            { message && <Message variant='danger'>{message}</Message> }
            { userState?.error && <Message variant='danger'>{userState.error}</Message> }
            { userState?.loading && <Loader/> }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen;