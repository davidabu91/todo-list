import React from 'react';
import useTaskStore from '../hooks/use-task-store';

type Props = {};

const FocusScreen: React.FC<Props> = () => {

    const { focusedTask: task,  updateTaskCompletion, shuffleFocusTask } = useTaskStore();
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
