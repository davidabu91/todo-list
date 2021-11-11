import { shuffle } from 'lodash';
import { nanoid } from 'nanoid';
import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import useLocalStorege from './hooks/use-local-storege';
import FocusScreen from './screens/FocusScreen';
import ListScreen from './screens/ListScreen';
import { Task } from './types';


function App() {

  const [tasks, setTasks] = useLocalStorege<Task[]>('tasks',[]);
  const [focusedTaskId, setFocusedTaskId] = useLocalStorege<string | undefined>('focused',undefined);


  const addTask = (task: Pick<Task, "label">) => {
    const id = nanoid()
    setTasks(tasks => [...tasks, { id:id, label: task.label, isComplete: false }]);
      if(!focusedTaskId) setFocusedTaskId(id)

  }

  const updateTaskCompletion = (taskId: string, isComplete: boolean ) => {
    setTasks(tasks => tasks.map(task => {
      if (task.id === taskId) return { ...task, isComplete};
      return task;
    })
    );
  }

  const focusedTask = tasks.find((task) => task.id === focusedTaskId);

  const shuffleFocusTask = () => {
    setFocusedTaskId(
      shuffle(tasks.filter(task => !task.isComplete))[0]?.id 
      );
  };

  const tasksApi = {addTask, focusedTask, tasks, setTasks, shuffleFocusTask, updateTaskCompletion };

  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" >List</NavLink>
        {' '}-{' '}
        <NavLink to="/focus">Focus</NavLink>

      </nav>
      <br />
      <Routes >
        <Route path='/' element={<ListScreen {...tasksApi} />} />
        <Route path='/focus' element={<FocusScreen {...tasksApi} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
