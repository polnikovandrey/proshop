import React, { FormEventHandler, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { History } from "history";
import { selectUserInfo } from "../slice/userSlice";
import { selectUserProfile } from "../slice/userProfileSlice";
import { clearUserProfileAction, getUserProfileAction, updateUserProfileAction } from "../actions/userProfileActions";
import { selectOrderUserList } from "../slice/orderUserListSlice";
import { orderUserListAction } from "../actions/orderActions";

const ProfileScreen = ({ history }: { history: History }) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    const userProfileState = useAppSelector(selectUserProfile);
    const { user: userProfileInfo } = userProfileState;
    const userInfoState = useAppSelector(selectUserInfo);
    const { user: userStateInfo } = userInfoState;
    const orderUserListState = useAppSelector(selectOrderUserList);
    const { loading: ordersLoading, orders, error: ordersError } = orderUserListState;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userStateInfo) {
            if (userProfileInfo?.name) {
                setName(userProfileInfo.name);
                setEmail(userProfileInfo.email);
            } else {
                (async () => {
                    await getUserProfileAction('profile', userStateInfo.token, dispatch);
                    await orderUserListAction(userStateInfo.token, dispatch);
                })();
            }
        } else {
            history.push('/login');
            clearUserProfileAction(dispatch)
        }
    }, [ dispatch, history, userStateInfo, userProfileInfo ]);

    const submitHandler: FormEventHandler = async (event) => {
        event.preventDefault();
        const userInfo = userInfoState.user;
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
        } else if (userInfo && userProfileState.user) {
            await updateUserProfileAction(userInfo._id, userInfo.token, { name, email, password }, dispatch);
        }
    };
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                { message && <Message variant='danger'>{message}</Message> }
                { userProfileState?.error && <Message variant='danger'>{userProfileState.error}</Message> }
                { userProfileState.success && <Message variant='success'>Profile updated</Message>}
                { userProfileState?.loading && <Loader/> }
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