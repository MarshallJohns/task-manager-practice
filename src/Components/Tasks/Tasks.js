import react, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { logoutUser, getUser } from '../../ducks/authReducer'
import axios from 'axios'
import Task from './Task'


function Tasks(props) {

    const [taskInput, setTaskInput] = useState('')
    const [tasks, setTasks] = useState([])
    const [user, setUser] = useState('')

    useEffect(() => {
        axios.get('/api/user/getuser').then(res => {
            setUser(res.data.first_name)
            props.getUser(res.data)
        })
        axios.get('/api/tasks/all').then(res => {
            setTasks(res.data)
        })
    }, [])

    const mappedTasks = tasks.map((e, i) => {
        return (
            <Task
                key={e.task_id}
                task={e.task}
                num={i + 1}
            />

        )
    })
    const handleLogout = () => {
        axios.delete('/api/user/logout').then(() => {
            props.logoutUser()
            props.history.push('/')
        })
    }

    return (
        <div>
            <div>
                <h1>Hello, {user}</h1>
                <ul>
                    {mappedTasks}
                </ul>
            </div>
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    );
}

export default connect(null, { logoutUser, getUser })(Tasks)