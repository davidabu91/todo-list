import React from 'react';
import { TasksProps } from '../types';

type Props = TasksProps & {};

const FocusScreen: React.FC<Props> = ({ tasks, updateTaskCompletion }) => {
    const task = tasks.filter(task => !task.isComplete)[0];

    const handleMarkcompleted = () => {
        updateTaskCompletion(task.id, true)
    }

    return task ?
        <div>
            <div>{task.label}</div>
            <button onClick={handleMarkcompleted}>mark completed</button>
        </div>
        :
        <div>No incomplete tasks. Yey!</div>
}

export default FocusScreen;
