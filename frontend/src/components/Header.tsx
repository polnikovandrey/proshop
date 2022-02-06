import React, { FormEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { UserState } from "../store/types";
import { selectUserInfo } from "../slice/userSlice";
import { userLogoutAction } from "../actions/userActions";
import { clearUserProfileAction } from "../actions/userProfileActions";
import { orderUserListResetAction } from "../actions/orderActions";

const Header = () => {
    const userState: UserState = useAppSelector(selectUserInfo);
    const dispatch = useAppDispatch();
    const logoutHandler: FormEventHandler = async () => {
        await userLogoutAction(dispatch);
        await clearUserProfileAction(dispatch);
        await orderUserListResetAction(dispatch);
    };
    return <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className="fas fa-shopping-cart"/> Cart</Nav.Link>
                        </LinkContainer>
                        { userState.user ? (
                            <NavDropdown title={userState.user.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-user"/> Log in</Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>;
}

export default Header
