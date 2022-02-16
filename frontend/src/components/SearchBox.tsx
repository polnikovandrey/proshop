import React, { FormEventHandler, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { History } from "history";

const SearchBox = ({ history }: { history: History}) => {
    const [ keyword, setKeyword ] = useState('');
    const submitHandler: FormEventHandler = async (event) => {
        event.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
        }
    };
    return (
        <div>
            <Form onSubmit={submitHandler} className='d-flex'>
                <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search products...' className='mr-sm-2 ml-sm-5'/>
                <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
            </Form>
        </div>
    );
};

export default SearchBox;