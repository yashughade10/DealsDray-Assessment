import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import { UserContext } from './context/userContext';
import Home from './components/Home';
import EmployeeList from './components/EmployeeList';
import UpdateEmployee from './components/UpdateEmployee';
import CreateEmployee from './components/CreateEmployee';

function App() {

  const [isLoginTrue, setIsLoginTrue] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ isLoginTrue, setIsLoginTrue, user, setUser }} >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Layout />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/employees' element={<EmployeeList />} />
          <Route exact path='/create-employee' element={<CreateEmployee />} />
          <Route exact path='/update-details/:id' element={<UpdateEmployee />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
