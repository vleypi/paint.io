import './App.css';
import Canvas from './components/Canvas/Canvas';
import Chat from './components/Chat/Chat'
import React from 'react';
import Nickname from './components/Login/Nickname';
import {Routes, Route, Navigate} from 'react-router-dom'
import {useAuth} from './hooks/useAuth.js'
import { useSelector } from 'react-redux';

function App() {
  useAuth()
  const profile = useSelector(({profile})=>profile)
  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<Nickname />} />
        <Route path='/:id' exact element={<Canvas />} />
      </Routes>
    </div>
  );
}

export default App;
