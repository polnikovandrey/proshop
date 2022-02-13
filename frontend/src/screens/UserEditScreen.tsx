import React, { FormEventHandler, useEffect, useState } from "react";
import { match } from "react-router";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { History } from "history";
import FormContainer from "../components/FormContainer";
import { selectUserProfile } from "../slice/userProfileSlice";
import { getUserProfileAction } from "../actions/userProfileActions";
import { selectUserInfo } from "../slice/userSlice";
import { selectUserUpdate } from "../slice/userUpdateSlice";
import { resetUserProfileByIdAction, updateUserProfileByIdAction } from "../actions/userUpdateActions";

const UserEditScreen = ({ history, match }: { history: History, match: match<{ id: string }> }) => {
    const userId: string = match.params.id;
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ admin, setAdmin ] = useState(false);
    const userInfoState = useAppSelector(selectUserInfo);
    const token = userInfoState?.user?.token || '';
    const userProfileState = useAppSelector(selectUserProfile);
    const { loading, user, error } = userProfileState;
    const userUpdateState = useAppSelector(selectUserUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateState;
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async () => {
            if (successUpdate) {
                await resetUserProfileByIdAction(dispatch);
                history.push('/admin/userList')
            } else if (!user?.name || user._id != userId ) {
                await getUserProfileAction(userId, token, dispatch);
            } else {
                setName(user.name);
                setEmail(user.email);
                setAdmin(user.admin!);
            }
        })();
    }, [ dispatch, history, successUpdate, token, userId, user ]);

    const submitHandler: FormEventHandler = async (event) => {
        event.preventDefault();
        await updateUserProfileByIdAction(token, { _id: userId, name, email, admin }, dispatch);
    };
    return (
        <>
            <Link to='/admin/userList' className='btn btn-light my-3'>Go back</Link>
            <FormContainer>
                <h1>Edit user</h1>
                { loadingUpdate && <Loader/> }
                { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
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
                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId='admin'>
                                    <Form.Check type='checkbox' label='Admin' checked={admin} onChange={(e) => setAdmin(e.target.checked)}/>
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

export default UserEditScreen;