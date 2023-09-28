import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../img/argentBankLogo.png';
import { useDispatch } from 'react-redux';
import { logout } from '../features/Slices';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSigninPage = location.pathname === '/sign-in';
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    dispatch(logout())
    navigate('/sign-in')
}

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
        {isHomePage ? (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle icon-nav"></i>
            Sign In
          </Link>
        ) : isSigninPage ? (
          <></>
        ) : (
          <Link className="main-nav-item" to="/sign-in"  onClick={(e) => handleLogout(e)}>
            <i className="fa fa-power-off icon-nav" aria-hidden="true"></i>
            Sign Out
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;