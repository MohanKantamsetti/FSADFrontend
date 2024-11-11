import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login/', {
        email,
        password
      });
      const { access_token, userid, email: userEmail } = response.data.data;
      console.log(response.data);
      // Store the access token, user ID, and email in localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user_id', userid);
      localStorage.setItem('email', userEmail);
      // Redirect to user profile page after successful login
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
      <p>
        Forgot your password? <a href="/forgot-password">Reset Password</a>
      </p>
    </div>
  );
};

export default Login;