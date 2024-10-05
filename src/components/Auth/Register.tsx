// Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import logo from '../../assets/logo.png'

const BACKEND_URl = 'http://localhost:8080/api';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${BACKEND_URl}`+'/auth/register', {
        names:fullName,
        email,
        password,
        confirmPass:confirmPassword
      });

      if (response.status === 201) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className='authPage'>
      <div className='background'>
        {/* <img src="../../assets/crimeImg.png" alt="" /> */}
      </div>
       <div className="auth-container">
      <div className="logo">
        <img src={logo} alt="Crime Mapping logo" />
      </div>
      <h2>Get Started</h2>
      <p>Welcome to Crime Mapping - Let's create your account</p>
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
         <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="auth-button">Register</button>
      </form>
      <p className="login-redirect">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
   </div>
  );
};

export default Register;
