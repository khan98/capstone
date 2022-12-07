import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import EventsDetails from './components/EventsDetails';
import EventBoards from './components/pages/EventBoards';
import Planner from './components/pages/Planner' 
import Personal from './components/pages/Personal';
import LogIn from './components/pages/LogIn'
import Signup from './components/pages/Signup'
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
          <Route exact path='/personal' element={<Personal />} />
          <Route exact path='/log-in' element={<LogIn />} />
          <Route exact path='/log-out' element={<LogOut />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/blogs/:id' element={<EventsDetails/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
