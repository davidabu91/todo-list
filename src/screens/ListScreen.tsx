import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Task, TasksProps } from '../types';

type Props = TasksProps & {};



const ListScreen: React.FC<Props> = ({addTask, tasks, setTasks, updateTaskCompletion}) => {

    const [newTaskLabel, setNewTaskLabel] = useState('');

    const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value);

    function handleNewTaskKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && newTaskLabel !== '') {
         addTask( { label: newTaskLabel });
            setNewTaskLabel('');
        }
    };

    const handleTaskCompleteChange = (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
        updateTaskCompletion(task.id, e.target.checked);
    };

    const handleTaskDeleteClick = (handleTask: Task) => () => {
        setTasks(tasks => tasks.filter(task => task.id !== handleTask.id));
    }

    const handleClearClick = () => {
        setTasks(tasks => tasks.filter(task => !task.isComplete));
    }

    return <div>
        <ul>
            {tasks.map(task => <div key={task.id}><input type="checkbox" checked={task.isComplete} onChange={(handleTaskCompleteChange(task))}/>{task.label}
            <button onClick={handleTaskDeleteClick(task)}>delet</button>
            </div>)}
        </ul>
        <input type="text" value={newTaskLabel} onChange={handleNewTaskLabelChange} onKeyPress={handleNewTaskKeyPress} />
        <div>
        <button onClick={handleClearClick}>Clear compleeted</button>
        </div>
    </div>
}

export default ListScreen;