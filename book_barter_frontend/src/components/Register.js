import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/user/register/', {
        email,
        password,
        preferences
      });
      console.log(response.data);
      // Redirect to verify page after successful registration
      navigate('/verify', { state: { email: email } });
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = (index, value) => {
    const newPreferences = [...preferences];
    newPreferences[index] = value;
    setPreferences(newPreferences);
  };

  const addPreferenceField = () => {
    setPreferences([...preferences, '']);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Book Preferences:</label>
          {preferences.map((preference, index) => (
            <input
              key={index}
              type="text"
              value={preference}
              onChange={(e) => handlePreferenceChange(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={addPreferenceField}>Add Preference</button>
        </div>
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Register;