// // Register.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../../styles/auth.css';
// import logo from '../../assets/logo.png'

// const BACKEND_URl = 'http://localhost:8080/api';

// const Register: React.FC = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
  
//   const navigate = useNavigate();

//     const validateEmail = (email: string) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const validatePassword = (password: string) => {
//     const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//     return regex.test(password);
//     };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

   
//     if (!validateEmail(email)) {
//       setError('Invalid email format');
//       return;
//     }

//     if (!validatePassword(password)) {
//       setError('Password must be at least 8 characters long and contain at least one number');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    


//     try {
//       const response = await axios.post(`${BACKEND_URl}`+'/auth/register', {
//         names:fullName,
//         email,
//         password,
//         confirmPass:confirmPassword
//       });

//        if (response.status === 200) {
//         setSuccess('Registration successful!');
//         // navigate('/dashboard');
//       } else {
//         setError('Registration failed. Please try again.');
//       }

//       // if (response.status === 201) {
//       //   navigate('/dashboard');
//       // }
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className='authPage'>
//       <div className='background'>
//       </div>
//        <div className="auth-container">
//       <div className="logo">
//         <img src={logo} alt="Crime Mapping logo" />
//       </div>
//       <h2>Get Started</h2>
//       <p>Welcome to Crime Mapping - Let's create your account</p>
//       <form className="auth-form" onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//          <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//           {error && <p className="error-message">{error}</p>}
//           {success && <p className="success-message">{success}</p>}
//         <button type="submit" className="auth-button">Register</button>
//       </form>
//       <p className="login-redirect">
//         Already have an account? <a href="/login">Log in</a>
//       </p>
//     </div>
//    </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import logo from '../../assets/logo.png';

const BACKEND_URl = 'http://localhost:8080/api';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
    return regex.test(password);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    let validationErrors: any = {};

    // Reset previous errors
    setErrors({});

    if (!fullName) {
      validationErrors.fullName = 'Full Name is required';
    }

    if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!validatePassword(password)) {
      validationErrors.password = 'Password must be at least 8 characters and include at least one number';
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URl}/auth/register`, {
        fullName,
        email,
        password,
        confirmPass: confirmPassword,
      });

      if (response.status === 200) {
        setSuccess('Registration successful!');
        // navigate('/dashboard');
      } else {
        setErrors({ global: 'Registration failed. Please try again.' });
      }
    } catch (err) {
      setErrors({ global: 'Registration failed. Please try again.' });
      console.error(err);
    }
  };

  return (
    <div className='authPage'>
      <div className='background'></div>
      <div className="auth-container">
        <div className="logo">
          <img src={logo} alt="Crime Mapping logo" />
        </div>
        <h2>Get Started</h2>
        <p>Welcome to Crime Mapping - Let's create your account</p>
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={errors.fullName ? 'error-input' : ''}
            />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error-input' : ''}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? 'error-input' : ''}
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          {errors.global && <p className="error-message">{errors.global}</p>}

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
