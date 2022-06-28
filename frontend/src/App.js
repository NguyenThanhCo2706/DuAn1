// import './App.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage/Homepage';
import Student from './components/Student/Student';
import UpdateStudent from './components/Student/UpdateStudent'
import CreateStudent from './components/Student/CreateStudent'
import { useState } from 'react';


function App() {
  const [username, setUsername] = useState('')
  return (
    <Router>
      <Navbar username={username} setUser={setUsername} />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUser={setUsername} />} />
          <Route path="/viewstudent/:id" element={<Student />} />
          <Route path="/updatestudent/:id" element={<UpdateStudent />} />
          <Route path="/createstudent" element={<CreateStudent />} />

          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
