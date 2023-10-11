import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../img/argentBankLogo.png';
import { useDispatch } from 'react-redux';
import { logout } from '../features/Slices';
import ApiService from '../service/apiServices';

const Nav = ({ firstName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSigninPage = location.pathname === '/login';
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in using the JWT token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isHomePage && isLoggedIn === false ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle icon-nav"></i>
            Sign In
          </Link>
        ) : isLoggedIn ? (
          <div>
            <Link
              className="main-nav-item"
              to="/login"
              onClick={(e) => handleLogout(e)}
            >
              <i className="fa fa-sign-out icon-nav" aria-hidden="true"></i>
              Sign Out
            </Link>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle icon-nav"></i>
              {firstName}
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Nav;