import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Verify.css';

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state; // Get the email from the state

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/verify/', {
        email: email,
        code: verificationCode
      });
      console.log(response.data);
      setSuccessMessage('Verification successful!');
      // Redirect to login page after successful verification
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Verification failed:', error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="verify-container">
      <h2>Verify Your Email</h2>
      <p>Please enter the verification code sent over email</p>
      <form onSubmit={handleVerify} className="verify-form">
        <div className="form-group">
          <label>Verification Code:</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="verify-button">Verify</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Verify;