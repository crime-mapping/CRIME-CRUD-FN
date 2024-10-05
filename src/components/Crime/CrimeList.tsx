import React, { useState, useEffect } from 'react';
import { useCrimes } from '../../context/CrimeContext';
import axios from 'axios';
import '../../styles/crime.css';
import ConfirmationModal from '../ConfirmationModel';

const CrimeList: React.FC = () => {
  const { crimes, fetchCrimes, addCrime, editCrime, deleteCrime } = useCrimes();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCrime, setNewCrime] = useState({
    id: 0,
    crimeName: '',
    crimeType: '',
    emergencyLevel: '',
    suspectDescription: '',
    caseStatus: '',
    crimeLocation: '',
    timeOfOccurence: '',
  });
  const [editCrimeId, setEditCrimeId] = useState<number | null>(null);
  const [editCrimeData, setEditCrimeData] = useState(newCrime);
  const [filterType, setFilterType] = useState('');
  const [filterEmergencyLevel, setFilterEmergencyLevel] = useState('');
  const [filterCaseStatus, setFilterCaseStatus] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filteredCrimes, setFilteredCrimes] = useState(crimes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crimeToDelete, setCrimeToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchCrimes();
  }, []);

  useEffect(() => {
    setFilteredCrimes(crimes);
  }, [crimes]);

  const handleFilterChange = async () => {
    let url = 'http://localhost:8080/api/crimes';

    if (filterType) {
      url = `http://localhost:8080/api/crimes/type/${filterType}`;
    } else if (filterEmergencyLevel) {
      url = `http://localhost:8080/api/crimes/emergency-level/${filterEmergencyLevel}`;
    } else if (filterCaseStatus) {
      url = `http://localhost:8080/api/crimes/case-status/${filterCaseStatus}`;
    } else if (filterLocation) {
      url = `http://localhost:8080/api/crimes/location/${filterLocation}`;
    }

    try {
      const response = await axios.get(url);
      setFilteredCrimes(response.data);
    } catch (error) {
      console.error('Error fetching filtered crimes:', error);
    }
  };

  const handleAddCrime = (e: React.FormEvent) => {
    e.preventDefault();
    addCrime(newCrime);
    setShowAddForm(false);
    setNewCrime({
      id: 0,
      crimeName: '',
      crimeType: '',
      emergencyLevel: '',
      suspectDescription: '',
      caseStatus: '',
      crimeLocation: '',
      timeOfOccurence: '',
    });
  };

  const handleEditCrime = (e: React.FormEvent) => {
    e.preventDefault();
    if (editCrimeId !== null) {
      editCrime(editCrimeId, editCrimeData);
      setEditCrimeId(null);
    }
  };

   const handleDeleteCrime = (id: number) => {
    setCrimeToDelete(id);
    setIsModalOpen(true);
  };

   const confirmDelete = () => {
    if (crimeToDelete !== null) {
      deleteCrime(crimeToDelete);
      setCrimeToDelete(null);
    }
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCrimeToDelete(null);
  };

  return (
    <div className="container">
      <h2>Crime List</h2>

      <div className="actions">
        <button className="add-crime-btn" onClick={() => setShowAddForm(true)}>
          Add New Crime
        </button>

        {/* Crime Type Dropdown */}
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-dropdown">
          <option value="">Filter by crime type</option>
          <option value="THEFT">Theft</option>
          <option value="MURDER">Murder</option>
          <option value="ASSAULT">Assault</option>
        </select>

        {/* Emergency Level Dropdown */}
        <select value={filterEmergencyLevel} onChange={(e) => setFilterEmergencyLevel(e.target.value)} className="filter-dropdown">
          <option value="">Filter by emergency level</option>
          <option value="LOW">Low</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="HIGH">High</option>
        </select>

        {/* Case Status Dropdown */}
        <select value={filterCaseStatus} onChange={(e) => setFilterCaseStatus(e.target.value)} className="filter-dropdown">
          <option value="">Filter by case status</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
        </select>

        {/* Location Filter */}
        <input
          type="text"
          placeholder="Filter by location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="filter-input"
        />
        
        <button onClick={handleFilterChange} className="filter-btn">Apply Filters</button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Crime</h3>
            <form onSubmit={handleAddCrime}>
              <input
                type="text"
                placeholder="Crime Name"
                value={newCrime.crimeName}
                onChange={(e) => setNewCrime({ ...newCrime, crimeName: e.target.value })}
                required
              />
              <select
                value={newCrime.crimeType}
                onChange={(e) => setNewCrime({ ...newCrime, crimeType: e.target.value })}
                required
              >
                <option value="">Select Crime Type</option>
                <option value="THEFT">Theft</option>
                <option value="ASSAULT">Assault</option>
                <option value="BURGLARY">Burglary</option>
                <option value="RAPE">Rape</option>
              </select>
              <select
                value={newCrime.emergencyLevel}
                onChange={(e) => setNewCrime({ ...newCrime, emergencyLevel: e.target.value })}
                required
              >
                <option value="">Select Emergency Level</option>
                <option value="HIGH">High</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="LOW">Low</option>
              </select>
              <input
                type="text"
                placeholder="Suspect Description"
                value={newCrime.suspectDescription}
                onChange={(e) => setNewCrime({ ...newCrime, suspectDescription: e.target.value })}
                required
              />
              <select
                value={newCrime.caseStatus}
                onChange={(e) => setNewCrime({ ...newCrime, caseStatus: e.target.value })}
                required
              >
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
                <option value="UNDER_INVESTIGATION">Under Investigation</option>
              </select>
              <input
                type="text"
                placeholder="Crime Location"
                value={newCrime.crimeLocation}
                onChange={(e) => setNewCrime({ ...newCrime, crimeLocation: e.target.value })}
                required
              />
              <input
                type="datetime-local"
                value={newCrime.timeOfOccurence}
                onChange={(e) => setNewCrime({ ...newCrime, timeOfOccurence: e.target.value })}
                required
              />
              <button type="submit" className="submit-btn">Save Crime</button>
              <button type="button" className="close-btn" onClick={() => setShowAddForm(false)}>Close</button>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Crime Name</th>
            <th>Type</th>
            <th>Emergency Level</th>
            <th>Suspect Description</th>
            <th>Case Status</th>
            <th>Location</th>
            <th>Time of Occurrence</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCrimes.map((crime) => (
            <tr key={crime.id}>
              <td>{crime.id}</td>
              <td>
                {editCrimeId === crime.id ? (
                  <input
                    type="text"
                    value={editCrimeData.crimeName}
                    onChange={(e) => setEditCrimeData({ ...editCrimeData, crimeName: e.target.value })}
                  />
                ) : (
                  crime.crimeName
                )}
              </td>
                 <td>
                {editCrimeId === crime.id ? (
                  <select
                    value={editCrimeData.crimeType}
                    onChange={(e) => setEditCrimeData({ ...editCrimeData, crimeType: e.target.value })}
                  >
                    <option value="THEFT">Theft</option>
                    <option value="ASSAULT">Assault</option>
                    <option value="BURGLARY">Burglary</option>
                    <option value="RAPE">Rape</option>
                  </select>
                ) : (
                  crime.crimeType
                )}
              </td>
                <td>
                {editCrimeId === crime.id ? (
                  <select
                    value={editCrimeData.emergencyLevel}
                    onChange={(e) => setEditCrimeData({ ...editCrimeData, emergencyLevel: e.target.value })}
                  >
                    <option value="HIGH">High</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="LOW">Low</option>
                  </select>
                ) : (
                  crime.emergencyLevel
                )}
              </td>
               <td>
                {editCrimeId === crime.id ? (
                  <input
                    type="text"
                    value={editCrimeData.suspectDescription}
                    onChange={(e) => setEditCrimeData({ ...editCrimeData, suspectDescription: e.target.value })}
                  />
                ) : (
                  crime.suspectDescription
                )}
              </td>
                <td>
                {editCrimeId === crime.id ? (
                  <select
                    value={editCrimeData.caseStatus}
                    onChange={(e) => setEditCrimeData({ ...editCrimeData, caseStatus: e.target.value })}
                  >
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                    <option value="UNDER_INVESTIGATION">Under Investigation</option>
                  </select>
                ) : (
                  crime.caseStatus
                )}
              </td>
               <td>
                {editCrimeId === crime.id ? (
                  <input
                    type="text"
                    value={editCrimeData.crimeLocation}
                    onChange={(e) => setEditCrimeData({ ...editCrimeData, crimeLocation: e.target.value })}
                  />
                ) : (
                  crime.crimeLocation
                )}
              </td>
              <td>
                {editCrimeId === crime.id ? (
                  <input
                    type="datetime-local"
                    value={editCrimeData.timeOfOccurence}
                    onChange={(e) => setEditCrimeData({ ...editCrimeData, timeOfOccurence: e.target.value })}
                  />
                ) : (
                  crime.timeOfOccurence
                )}
              </td>
              <td className='row-actions'>
                {editCrimeId === crime.id ? (
                  <button className="save-btn" onClick={handleEditCrime}>Save</button>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => {
                      setEditCrimeId(crime.id);
                      setEditCrimeData(crime);
                    }}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteCrime(crime.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this crime?"
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default CrimeList;
