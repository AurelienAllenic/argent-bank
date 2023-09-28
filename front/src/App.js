import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './features/Slices';
import Home from './components/Home';
import SignIn from './components/SignIn';
import User from './components/User';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const isLoggedIn = useSelector(selectUser);
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sign-in" element={<SignIn />} />
          <>
          <Route exact path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
          </>
      </Routes>
    </div>
  </Router>
  );
}

export default App;