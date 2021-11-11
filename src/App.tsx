
import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import TaskContext from './contexts/task-store';
import useLocalStorege from './hooks/use-local-storege';
import FocusScreen from './screens/FocusScreen';
import ListScreen from './screens/ListScreen';
import { Task } from './types';


function App() {

  const [tasks, setTasks] = useLocalStorege<Task[]>('tasks',[]);


  return (
    <BrowserRouter>
    <TaskContext.Provider value={[tasks, setTasks]}>
      <nav>
        <NavLink to="/" >List</NavLink>
        {' '}-{' '}
        <NavLink to="/focus">Focus</NavLink>

      </nav>
      <br />
      <Routes >
        <Route path='/' element={<ListScreen />} />
        <Route path='/focus' element={<FocusScreen  />} />
      </Routes>
      </TaskContext.Provider>
    </BrowserRouter>
  );
}

export default App;
