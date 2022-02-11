import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUserList } from "../slice/userListSlice";
import { userListAction } from "../actions/userActions";
import Loader from "../components/Loader";
import { Button, Table } from "react-bootstrap";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { selectUserInfo } from "../slice/userSlice";
import { History } from "history";

const UserListScreen = ({ history }: { history: History }) => {
    const dispatch = useAppDispatch();
    const userListState = useAppSelector(selectUserList);
    const { loading, users, error } = userListState;
    const userInfoState = useAppSelector(selectUserInfo);
    const token = userInfoState?.user?.token || '';
    const admin = userInfoState.user?.admin;
    useEffect(() => {
        (async () => {
            if (admin) {
                await userListAction(token, dispatch);
            } else {
                history.push('/login');
            }
        })();
    }, [ admin, dispatch, history, token ]);
    function deleteHandler(userId: string) {
        console.log('delete');
    }
    return (
        <>
            <h1>Users</h1>
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
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users?.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                        <td>
                                            {user.admin
                                                ? (<i className='fas fa-check' style={{color: "green"}}/>)
                                                : (<i className='fas fa-times' style={{color: "red"}}/>)}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'/>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen;