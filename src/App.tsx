
import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import TaskContext from './contexts/task-store';
import useLocalStorege from './hooks/use-local-storege';
import FocusScreen from './screens/FocusScreen';
import ListScreen from './screens/ListScreen';
import { colors, GlobalStyle } from './styles';
import { Task } from './types';

const Layout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 35px;
`

const Nav = styled.nav`
  display: flex;
  margin-bottom: 45px;
`;

const TabButton = styled(NavLink)`
  background: #141214;
  color: #e7ddeb;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  height: 62px;
  width: 120px;

  &:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  &:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  &.active {
    background:${colors.primary};
    color: #000;
  }
`;

function App() {

  const [tasks, setTasks] = useLocalStorege<Task[]>('tasks',[]);

  return (
    <>
    <GlobalStyle/>
    <BrowserRouter>
    <TaskContext.Provider value={[tasks, setTasks]}>
      <Layout>
      <Nav>
        <TabButton to="/" >List</TabButton >
        
        <TabButton to="/focus" >Focus</TabButton>

      </Nav>
     
      <Routes >
        <Route path='/' element={<ListScreen />}  />
        <Route path='/focus' element={<FocusScreen  />} />
      </Routes>
      </Layout>
      </TaskContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
