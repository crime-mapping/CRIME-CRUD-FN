import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface Crime {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface CrimeContextProps {
  crimes: Crime[];
  fetchCrimes: () => Promise<void>;
  addCrime: (crime: Crime) => Promise<void>;
}

const CrimeContext = createContext<CrimeContextProps | undefined>(undefined);

export const useCrimes = () => {
  const context = useContext(CrimeContext);
  if (!context) {
    throw new Error("useCrimes must be used within a CrimeProvider");
  }
  return context;
};

export const CrimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [crimes, setCrimes] = useState<Crime[]>([]);

  const fetchCrimes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/crimes');
      setCrimes(response.data);
    } catch (error) {
      console.error('Fetch crimes error:', error);
    }
  };

  const addCrime = async (crime: Crime) => {
    try {
      await axios.post('http://localhost:5000/api/crimes', crime);
      fetchCrimes(); // Refresh crime list after adding
    } catch (error) {
      console.error('Add crime error:', error);
    }
  };

  return (
    <CrimeContext.Provider value={{ crimes, fetchCrimes, addCrime }}>
      {children}
    </CrimeContext.Provider>
  );
};
