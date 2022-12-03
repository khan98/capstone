import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import EventBoards from './components/pages/EventBoards' 
import Planner from './components/pages/Planner' 
import LogOut from './components/pages/LogOut' 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/eventboard' element={<EventBoards />} />
          <Route exact path='/planner' element={<Planner />} />
          <Route exact path='/log-out' element={<LogOut />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
