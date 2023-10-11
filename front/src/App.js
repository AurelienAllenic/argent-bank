import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './features/Slices';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import Error from './components/Error';

function App() {
  const isLoggedIn = useSelector(selectUser);
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
          <>
          <Route exact path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </>
        <Route exact path="*" element={<Error />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;