// import './App.css';
import Login from './components/User/Login';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage/Homepage';
import Student from './components/Student/Student';
import UpdateStudent from './components/Student/UpdateStudent'
import CreateStudent from './components/Student/CreateStudent'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Register from './components/User/Register';


function App() {
  const [username, setUsername] = useState('')
  const [students, setStudents] = useState()
  useEffect(() => {
    axios.get('/student/list').then((data) => {
      setStudents(data.data);
    })
  }, [])
  console.log(students)
  return (
    <Router>
      <Navbar
        username={username}
        setUser={setUsername}
        setStudents={setStudents}
      />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage students={students} setStudents={setStudents} />} />
          <Route path="/login" element={<Login setUser={setUsername} />} />
          <Route path="/viewstudent/:id" element={<Student />} />
          <Route path="/updatestudent/:id" element={<UpdateStudent setStudents={setStudents} />} />
          <Route path="/createstudent" element={<CreateStudent setStudents={setStudents} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
