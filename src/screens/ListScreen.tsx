import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import { RiDeleteBinLine } from 'react-icons/ri';
import Spacer from '../components/Spacer';
import TextButton from '../components/TextButton';
import useTaskStore from '../hooks/use-task-store';
import { Task } from '../types';
import IconButton from '../components/IconButton';

const Input = styled.input`
    background: #001;
    border-radius: 10px;
    color: #fff;
    border: none;
    padding: 10px 24px;
    margin-top: 20px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 310px;


`

const Item = styled.div`
    display: flex;
    padding: 8px 24px;
    background: #28083ab8;
    margin-bottom: 15px;
    color: #fff;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    font-size: 18px;
    align-items: center;
`
const DeleteIcon = styled(RiDeleteBinLine)`
    font-size: 20px;

    visibility: hidden;

    ${Item}:hover & {
        visibility: visible;
    }
`

type Props = {};

const ListScreen: React.FC<Props> = () => {
    const { addTask, tasks, setTasks, updateTaskCompletion } = useTaskStore();

    const [newTaskLabel, setNewTaskLabel] = useState('');

    const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value);

    function handleNewTaskKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && newTaskLabel !== '') {
            addTask({ label: newTaskLabel });
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

    return <Container>


        {tasks.map(task => <Item key={task.id}><input type="checkbox" checked={task.isComplete} onChange={(handleTaskCompleteChange(task))} />
            <Spacer width={24} />
            {task.label}
            <Spacer flex={1} />
            <IconButton onClick={handleTaskDeleteClick(task)}><DeleteIcon /></IconButton>
        </Item>)}

        <Input type="text" placeholder="Add a task" value={newTaskLabel} onChange={handleNewTaskLabelChange} onKeyPress={handleNewTaskKeyPress} />


        <TextButton onClick={handleClearClick} style={{ alignSelf: "center" }}>Clear completed</TextButton>

    </Container>
}

export default ListScreen;