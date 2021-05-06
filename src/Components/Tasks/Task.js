import React, { useEffect, useState } from 'react';
import axios from 'axios'


function Task(props) {
    const { data, num, handleDeleteTask } = props
    return (
        <li>
            {`${num}. ${data.task}`}
            <button onClick={() => handleDeleteTask(data.task_id)}>Delete</button>
        </li>
    )
}

export default Task;