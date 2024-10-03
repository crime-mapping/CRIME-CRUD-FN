// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';
import logo from '../../assets/logo.png'

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='authPage'>
      <div className='background'>
        {/* <img src="../../assets/crimeImg.png" alt="jhgfd" /> */}
      </div>
    <div className="auth-container">
      <div className="logo">
        <img src={logo} alt="Crime Mapping logo" />
      </div>
      <h2>Welcome Back</h2>
      <p>Log in to continue to Crime Mapping</p>
      <form className="auth-form">
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
        <button type="button" className="auth-button" onClick={handleLogin}>Login</button>
      </form>
      <p className="login-redirect">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
    </div>
  );
};

export default Login;
