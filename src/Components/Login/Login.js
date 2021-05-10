import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { loginUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'





function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) {
            axios.post('/api/user/login', { email, password }).then(res => {
                props.loginUser(res.data)
                props.history.push('/tasks')
            }).catch(err => {
                alert(err.response.request.response)
            })
        } else {
            alert("Please fill out both fields")
        }
    }
    return <Container className='bg-primary'>
        <h1>Task Manager</h1>
        <p>Sign in or create an account to track your tasks you want to accomplish!</p>
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId='formBasicEmail'>
                <Form.Label> Email Address</Form.Label >
                <Form.Control onChange={e => setEmail(e.target.value)} type='text' placeholder='Enter Email' />
            </Form.Group >
            <Form.Group className='mt-2' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter Password' />
            </Form.Group>
            <Button variant='info' className='mt-3 btn btn-primary' type='submit'>Login</Button>
        </Form >
        <Link to='/register'>
            <Button variant='info' className='mt-4 mb-4'>Register</Button>
        </Link>
    </Container >
}

export default connect(null, { loginUser })(Login)