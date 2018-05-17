import React from 'react';
import styles from './task.css'

const Task = (props) => {
    return (
        <div className="task chip teal lighten-2 white-text">
            {props.value}
            <i   
                onClick={(event) => {props.onClickTask(props.keyValue)}} 
                className="close fa fa-times"
                ></i>
        </div>
    );
}

export default Task;