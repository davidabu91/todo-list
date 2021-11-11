import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import FocusScreen from './screens/FocusScreen';
import ListScreen from './screens/ListScreen';
import { Task } from './types';


function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const updateTaskCompletion = (taskId: string, isComplete: boolean ) => {
    setTasks(tasks => tasks.map(task => {
      if (task.id === taskId) return { ...task, isComplete};
      return task;
    })
    );
  }

  const tasksApi = { tasks, setTasks, updateTaskCompletion };

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
