import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

const BACKEND_URl = 'http://localhost:8080/api';

interface Crime {
  id: number;
  crimeName:string,
  crimeType: string,
  emergencyLevel:string,
  suspectDescription:string,
  caseStatus:string,
  crimeLocation:string,
  timeOfOccurence:string
}

interface CrimeContextProps {
  crimes: Crime[];
  fetchCrimes: () => Promise<void>;
  addCrime: (crime: Crime) => Promise<void>;
  editCrime: (id: number, updatedCrime: Crime) => Promise<void>;
  deleteCrime: (id: number) => Promise<void>;
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
      const response = await axios.get(`${BACKEND_URl}/crimes`);
      setCrimes(response.data);
    } catch (error) {
      console.error('Fetch crimes error:', error);
    }
  };

  const addCrime = async (crime: Crime) => {
    try {
      await axios.post(`${BACKEND_URl}/crimes`, crime);
      fetchCrimes(); 
    } catch (error) {
      console.error('Add crime error:', error);
    }
  };

  const editCrime = async (id: number, updatedCrime: Crime) => {
    try {
      await axios.put(`${BACKEND_URl}/crimes/${id}`, updatedCrime);
      fetchCrimes();
    } catch (error) {
      console.error('Edit crime error:', error);
    }
  };

  const deleteCrime = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URl}/crimes/${id}`);
      fetchCrimes();
    } catch (error) {
      console.error('Delete crime error:', error);
    }
  };

  return (
    <CrimeContext.Provider value={{ crimes, fetchCrimes, addCrime, editCrime, deleteCrime }}>
      {children}
    </CrimeContext.Provider>
  );
};
