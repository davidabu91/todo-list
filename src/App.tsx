import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import ListScreen from './screens/ListScreen';


function App() {
  return (
    <BrowserRouter>
    <Routes >
      <Route  path='/' element={<ListScreen/>}/>
      <Route path='/focus'></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
