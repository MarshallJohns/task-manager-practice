import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { loginUser } from '../../ducks/authReducer'
import { connect } from 'react-redux'


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
    return <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>
                Email:
                <input
                    value={email}
                    placeholder='example@email.com'
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    value={password}
                    placeholder='Enter Password'
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <button>Login</button>
        </form>
        <Link to='/register'>
            <button>Register</button>
        </Link>
    </div>
}

export default connect(null, { loginUser })(Login)