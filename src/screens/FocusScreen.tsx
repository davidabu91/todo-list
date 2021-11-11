import React from 'react';
import { TasksProps } from '../types';

type Props = TasksProps & {};

const FocusScreen: React.FC<Props> = ({ focusedTask: task,  updateTaskCompletion, shuffleFocusTask }) => {

    const handleMarkcompleted = () => {
        if(task)
        updateTaskCompletion(task.id, true)
    }

 

    return task ?
        <div>
            <div>{task.label}</div>
            <button onClick={handleMarkcompleted}>mark completed</button>
            <button onClick={shuffleFocusTask}>nope</button>
        </div>
        :
        <div>No incomplete tasks. Yey!</div>
}

export default FocusScreen;
