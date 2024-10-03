import React from 'react';
import '../../styles/auth.css';

const ForgotPassword: React.FC = () => {
  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form className="auth-form">
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
