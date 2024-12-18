import React, { useState } from 'react';
import axios from 'axios';

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [positions, setPositions] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/jobs/add-job',
        {
          jobTitle,
          positions,
          companyName,
          email,
          phoneNumber,
          jobDescription,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Job posted successfully:', response.data);
      alert('Job posted successfully!');
    } catch (error) {
      console.error('Error adding job post:', error.response?.data || error.message);
      alert('Failed to add job post 123');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Positions"
        value={positions}
        onChange={(e) => setPositions(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <textarea
        placeholder="Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button type="submit">Submit Job</button>
    </form>
  );
};

export default AddJob;
