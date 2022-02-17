import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

// TODO !!! clean cart after ??? (logout -> login another user -> stale cart)
// TODO !!! check order is placed after placeOrder -> pay (after another user placed an order)
// TODO !!! check correct order is paid after create order -> create new order another user -> pay
// TODO !!! admin order list -> details of not paid order -> payment buttons visible

const App = () => {
    return (
        <Router>
            <Route render={ (props) => <Header {...props}/> }/>
            <main className="py-3">
                <Container>
                    <Route path='/order/:id' component={OrderScreen}/>
                    <Route path='/placeOrder' component={PlaceOrderScreen}/>
                    <Route path='/payment' component={PaymentScreen}/>
                    <Route path='/shipping' component={ShippingScreen}/>
                    <Route path='/login' component={LoginScreen}/>
                    <Route path='/register' component={RegisterScreen}/>
                    <Route path='/profile' component={ProfileScreen}/>
                    <Route path='/product/:id' component={ProductScreen}/>
                    <Route path='/cart/:id?' component={CartScreen}/>
                    <Route path='/admin/userList' component={UserListScreen}/>
                    <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
                    <Route path='/admin/productList/:pageNumber' component={ProductListScreen} exact/>
                    <Route path='/admin/productList' component={ProductListScreen} exact/>
                    <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
                    <Route path='/admin/orderList' component={OrderListScreen}/>
                    <Route path='/search/:keyword' component={HomeScreen} exact/>
                    <Route path='/page/:pageNumber' component={HomeScreen} exact/>
                    <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact/>
                    <Route path='/' component={HomeScreen} exact/>
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
