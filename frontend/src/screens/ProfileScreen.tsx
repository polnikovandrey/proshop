import React, { FormEventHandler, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { History } from "history";
import { selectUser } from "../slice/userSlice";
import { selectUserDetails } from "../slice/userDetailsSlice";
import { getUserDetailsAction } from "../actions/userDetailsActions";

const ProfileScreen = ({ history }: { history: History }) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    const userDetailsState = useAppSelector(selectUserDetails);
    const { userDetail } = userDetailsState;
    const userState = useAppSelector(selectUser);
    const { userInfo } = userState;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userInfo) {
            if (userDetail?.name) {     // TODO !!! clean after logout
                setName(userDetail.name);
                setEmail(userDetail.email);
            } else {
                (async () => {
                    await getUserDetailsAction('profile', userInfo.token, dispatch);
                })();
            }
        } else {
            history.push('/login');
        }
    }, [ dispatch, history, userDetail, userInfo ]);

    const submitHandler: FormEventHandler = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
        } else {
            // DISPATCH UPDATE PROFILE
        }
    };
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                { message && <Message variant='danger'>{message}</Message> }
                { userDetailsState?.error && <Message variant='danger'>{userDetailsState.error}</Message> }
                { userDetailsState?.loading && <Loader/> }
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
}

export default ProfileScreen;