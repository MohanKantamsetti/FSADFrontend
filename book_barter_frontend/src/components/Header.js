import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';
import bookLogo from '../assets/book-logo.svg';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token');
  const isHome = location.pathname === '/';
  const isProfile = location.pathname === '/profile';

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('access_token');
    try {
      await axios.post('http://localhost:5000/api/user/logout/', {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('email');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img src={bookLogo} alt="Book Barter Logo" className="logo-img" />
          <Link to="/" className="navbar-link">Book Barter</Link>
        </div>
        <ul className="navbar-list">
          {!isHome && (
            <li className="navbar-item">
              <Link to="/" className="navbar-link">Home</Link>
            </li>
          )}
          {isLoggedIn ? (
            <>
              {!isProfile && (
                <li className="navbar-item">
                  <Link to="/profile" className="navbar-link">Profile</Link>
                </li>
              )}
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-link logout-button">Logout</button>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
          )}
          <li className="navbar-item">
            <Link to="/wiki" className='navbar-link'>Wiki</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;