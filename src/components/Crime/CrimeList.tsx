import React, { useEffect } from 'react';
import { useCrimes } from '../../context/CrimeContext';
import '../../styles/crime.css';

const CrimeList: React.FC = () => {
  const { crimes, fetchCrimes } = useCrimes();

  useEffect(() => {
    fetchCrimes();
  }, []);

  return (
    <div className="container">
      <h2>Crimes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crimes.map(crime => (
            <tr key={crime.id}>
              <td>{crime.id}</td>
              <td>{crime.title}</td>
              <td>{crime.date}</td>
              <td>
                <a href={`/crime/${crime.id}`}>View</a> |
                <a href={`/edit-crime/${crime.id}`}>Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrimeList;
