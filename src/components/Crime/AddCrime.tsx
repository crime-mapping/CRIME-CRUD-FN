import React, { useState } from 'react';
import { useCrimes } from '../../context/CrimeContext';
import '../../styles/crime.css';

const AddCrime: React.FC = () => {
  const { addCrime } = useCrimes();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCrime({ id: 0, title, description, date: new Date().toISOString() });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="container">
      <h2>Add New Crime</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Crime Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCrime;
