import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { logoutUser, getUser } from '../../ducks/authReducer'
import axios from 'axios'


function Tasks(props) {

    const [taskInput, setTaskInput] = useState('')

    useEffect(() => {
        axios.get('/api/user/getuser').then(res => {
            props.getUser(res.data)
        })
    }, [])

    const handleLogout = () => {
        axios.delete('/api/user/logout').then(() => {
            props.logoutUser()
            props.history.push('/')
        })
    }

    return (
        <div>
            Tasks.js
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    );
}

export default connect(null, { logoutUser, getUser })(Tasks)