import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobData, setJobData] = useState({
    jobPost: '',
    positions: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    jobDescription: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found, please log in first');
      return;
    }

    try {
      // Sending POST request to backend API
      await axios.post(
        'http://localhost:5000/api/jobs/add-job', // Update URL if needed
        jobData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      alert('Job post added successfully!');
      setShowModal(false);

      // Reset job data after submission
      setJobData({
        jobPost: '',
        positions: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        jobDescription: ''
      });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Failed to add job post test');
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <button onClick={() => setShowModal(true)}>Add Job Post</button>
        </li>
        <li>
          <button>View/Edit Job Posts</button>
        </li>
      </ul>

      {/* Modal for Add Job Post */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h3>Add Job Post</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="jobPost"
                placeholder="Job Post Title"
                value={jobData.jobPost}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="positions"
                placeholder="Number of Positions"
                value={jobData.positions}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={jobData.companyName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Contact Email"
                value={jobData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={jobData.phoneNumber}
                onChange={handleChange}
                required
              />
              <textarea
                name="jobDescription"
                placeholder="Job Description"
                value={jobData.jobDescription}
                onChange={handleChange}
                required
              />
              <button type="submit">Submit Job</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
