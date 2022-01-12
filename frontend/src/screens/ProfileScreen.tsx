import React, { FormEventHandler, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { History } from "history";
import { selectUserInfo } from "../slice/userSlice";
import { selectUserProfile } from "../slice/userProfileSlice";
import { clearUserProfileAction, getUserProfileAction } from "../actions/userProfileActions";
import { UserInfo, UserProfile } from "../store/types";

const ProfileScreen = ({ history }: { history: History }) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    const userProfileState = useAppSelector(selectUserProfile);
    const userInfoState = useAppSelector(selectUserInfo);
    const dispatch = useAppDispatch();
    const userProfile: UserProfile | undefined = userProfileState.user;
    const userInfo: UserInfo | undefined = userInfoState.user;


    useEffect(() => {
        if (userInfo) {
            if (userProfile?.name) {
                setName(userProfile.name);
                setEmail(userProfile.email);
            } else {
                (async () => {
                    await getUserProfileAction('profile', userInfo.token, dispatch);
                })();
            }
        } else {
            history.push('/login');
            clearUserProfileAction(dispatch)
        }
    }, [ dispatch, history, userInfo, userProfile ]);

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
                { userProfileState?.error && <Message variant='danger'>{userProfileState.error}</Message> }
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