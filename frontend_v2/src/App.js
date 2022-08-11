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
import SearchPage from './components/SearchPage/SearchPage';






function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewstudent/:id" element={<Student />} />
          <Route path="/updatestudent/:id" element={<UpdateStudent />} />
          <Route path="/createstudent" element={<CreateStudent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listsearch" element={<SearchPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
