import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import CrimeList from './components/Crime/CrimeList';
// import AddCrime from './components/Crime/AddCrime';
import { AuthProvider } from './context/AuthContext';
import { CrimeProvider } from './context/CrimeContext';
import Register from './components/Auth/Register';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CrimeProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Login />} />
            <Route path="/dashboard" element={<CrimeList />} />
            {/* <Route path="/add-crime" element={<AddCrime />} /> */}
          </Routes>
        </CrimeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
