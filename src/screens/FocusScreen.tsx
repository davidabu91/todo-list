import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import TextButton from '../components/TextButton';
import useTaskStore from '../hooks/use-task-store';

type Props = {};

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    flex:1;
`

const Task = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    flex:1;
    font-size: 32px;
    padding-bottom: 45px;
`



const FocusScreen: React.FC<Props> = () => {

    const { focusedTask: task,  updateTaskCompletion, shuffleFocusTask } = useTaskStore();
    const handleMarkcompleted = () => {
        if(task)
        updateTaskCompletion(task.id, true)
    }

 

    return task ?
        <Container>
            <Task>{task.label}</Task>
            <Button onClick={handleMarkcompleted}>Mark completed</Button>
           <Spacer height={35}/>
            <TextButton onClick={shuffleFocusTask}>Nope</TextButton>
        </Container>
        :
        <div>No incomplete tasks. Yey!</div>
}

export default FocusScreen;
