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

    const handleLogout = () => {
        axios.delete('/api/user/logout').then(() => {
            props.logoutUser()
            props.history.push('/')
        })
    }

    const handleNewTask = (e) => {
        e.preventDefault()
        axios.post(`/api/tasks/add`, { taskInput }).then(res => {
            setTasks(res.data)
            setTaskInput('')
        }).catch(err => console.log(err))
    }


    const handleDeleteTask = (id) => {
        axios.delete(`/api/tasks/${id}`).then(res => {
            setTasks(res.data)
        })
    }

    const mappedTasks = tasks.map((e, i) => {
        return (
            <Task
                key={e.task_id}
                data={e}
                num={i + 1}
                handleDeleteTask={handleDeleteTask}
            />

        )
    })
    return (
        <div>
            <div>
                <h1>Hello, {user}</h1>
                <form onSubmit={(e) => handleNewTask(e)}>
                    <label htmlFor='newTask'>Want to add a new task?</label>
                    <input
                        type="text"
                        name='newTask'
                        value={taskInput}
                        onChange={e => setTaskInput(e.target.value)}
                    />
                    <button>Add</button>
                </form>
                <ul>
                    {mappedTasks}
                </ul>
            </div>
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    );
}

export default connect(null, { logoutUser, getUser })(Tasks)