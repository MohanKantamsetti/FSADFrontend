import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state; // Get the email from the state

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/pwreset/', {
        email: email,
        password: password,
        code: verificationCode
      });
      console.log(response.data);
      // Redirect to login page after successful password reset
      navigate('/login');
    } catch (error) {
      console.error('Password reset failed:', error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword} className="reset-password-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} readOnly />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Verification Code:</label>
          <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
        </div>
        <button type="submit" className="reset-button">Set Password</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;