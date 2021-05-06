import React, { useEffect, useState } from 'react';
import axios from 'axios'


function Task(props) {
    const { task, num } = props
    return (
        <li>
            {`${num}. ${task}`}
        </li>
    )
}

export default Task;