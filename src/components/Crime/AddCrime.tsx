import React, { useState } from 'react';
import { useCrimes } from '../../context/CrimeContext';
import '../../styles/crime.css';

const AddCrime: React.FC = () => {
  const { addCrime } = useCrimes();
  const [crimeName, setCrimeName] = useState('');
  const [crimeType, setCrimeType] = useState('');
  const [emergencyLevel, setEmergencyLevel] = useState('');
  const [suspectDescription, setSuspectDescription] = useState('');
  const [caseStatus, setCaseStatus] = useState('');
  const [crimeLocation, setCrimeLocation] = useState('');
  const [timeOfOccurence, setTimeOfOccurence] = useState('');

  const crimeTypeOptions = ['THEFT', 'ASSAULT', 'BURGLARY', 'RAPE'];
  const emergencyLevelOptions = ['HIGH', 'INTERMEDIATE', 'LOW'];
  const caseStatusOptions = ['OPEN', 'CLOSED', 'UNDER_INVESTIGATION'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCrime({
      id: 0,
      crimeName,
      crimeType,
      emergencyLevel,
      suspectDescription,
      caseStatus,
      crimeLocation,
      timeOfOccurence: new Date(timeOfOccurence).toISOString(),
    });
    // Clear input fields after submission
    setCrimeName('');
    setCrimeType('THEFT');
    setEmergencyLevel('LOW');
    setSuspectDescription('');
    setCaseStatus('OPEN');
    setCrimeLocation('');
    setTimeOfOccurence('');
  };

  return (
    <div className="auth-container">
      <h2>Add New Crime</h2>
      <form className="auth-form" onSubmit={handleSubmit}>

         <input
          type="text"
          placeholder="Crime Name"
          value={crimeName}
          onChange={(e) => setCrimeName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Crime Type"
          value={crimeType}
          onChange={(e) => setCrimeType(e.target.value)}
          required
        />
       <select
          value={crimeType}
          onChange={(e) => setCrimeType(e.target.value)}
          required
        >
          {crimeTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={emergencyLevel}
          onChange={(e) => setEmergencyLevel(e.target.value)}
          required
        >
          {emergencyLevelOptions.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Suspect Description"
          value={suspectDescription}
          onChange={(e) => setSuspectDescription(e.target.value)}
          required
        />
        <select
          value={caseStatus}
          onChange={(e) => setCaseStatus(e.target.value)}
          required
        >
          {caseStatusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Crime Location"
          value={crimeLocation}
          onChange={(e) => setCrimeLocation(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={timeOfOccurence}
          onChange={(e) => setTimeOfOccurence(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCrime;
