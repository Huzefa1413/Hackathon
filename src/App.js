import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin'
import Navbar from './components/Navbar';
import AddClass from './components/AddClass'
import AddStudent from './components/AddStudent'
import MarkAttendance from './components/MarkAttendance'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Navbar />} />
        <Route path="/addclass" element={<><Navbar /><AddClass /></>} />
        <Route path="/addstudent" element={<><Navbar /><AddStudent /></>} />
        <Route path="/markattendance" element={<><Navbar /><MarkAttendance /></>} />
      </Routes>
    </Router>
  );
}

export default App;
