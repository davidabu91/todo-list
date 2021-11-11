import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { nanoid } from 'nanoid';

type Props = {};

type Task = {
    id: string;
    label: string;
    isComplete: boolean;
}

const ListScreen: React.FC<Props> = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskLabel, setNewTaskLabel] = useState('');

    const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value);

    function handleNewTaskKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && newTaskLabel !== '') {
            setTasks(tasks => [...tasks, { id: nanoid(), label: newTaskLabel, isComplete: false }]);
            setNewTaskLabel('');
        }
    };

    const handleTaskCompleteChange = (handleTask: Task) => (e: ChangeEvent<HTMLInputElement>) => {
        setTasks(tasks => tasks.map(task => {
            if (task.id === handleTask.id) return {...task, isComplete: e.target.checked};
            return task;
        })
        );
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