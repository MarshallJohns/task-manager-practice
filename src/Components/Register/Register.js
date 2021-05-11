import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { loginUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'
import axios from 'axios'

function Register(props) {
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = (e) => {
        e.preventDefault()
        if (firstName && email && password) {
            axios.post('/api/user/register', { firstName, email, password }).then(res => {
                loginUser(res.data)
                props.history.push('/tasks')
            })
        }
    }
    console.log(firstName, email, password)
    return (
        <Container>
            <Form onSubmit={e => handleRegister(e)}>
                <Form.Group className='mt-4'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control onChange={e => setFirstName(e.target.value)} type='text' placeholder='First name' />
                </Form.Group>
                <Form.Group className='mt-4'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)} type='email' placeholder='Example@email.com' />
                </Form.Group>
                <Form.Group className='mt-4'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' />
                </Form.Group>
                <Button type='submit'>Register</Button>
            </Form>

        </Container>
    );
}

export default connect(null, { loginUser })(Register);