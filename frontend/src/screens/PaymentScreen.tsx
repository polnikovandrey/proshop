import React, { FormEventHandler, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { History } from "history";
import FormContainer from "../components/FormContainer";
import { ShippingAddress } from "../store/types";
import { selectCart } from "../slice/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethodAction } from "../actions/cartActions";

const PaymentScreen = ({ history }: { history: History }) => {
    const { shippingAddress }: { shippingAddress: ShippingAddress } = useAppSelector(selectCart);
    if (!shippingAddress) {
        history.push('/shipping');
    }
    const [ paymentMethod, setPaymentMethod ] = useState('PayPal');
    const dispatch = useAppDispatch();
    const submitHandler: FormEventHandler = async (e) => {
        e.preventDefault();
        await savePaymentMethodAction(paymentMethod, dispatch);
        history.push('/placeOrder');
    };
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Select Method</h1>
            <Col>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>Select Method</Form.Label>
                        <Col>
                            <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Continue</Button>
                </Form>
            </Col>
        </FormContainer>
    );
};

export default PaymentScreen;