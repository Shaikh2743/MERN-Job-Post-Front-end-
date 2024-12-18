// src/components/JobPosts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobPosts = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="job-posts">
      <h2>Available Job Posts</h2>
      {jobs.length ? (
        jobs.map((job) => (
          <div key={job._id} className="job-post">
            <h3>{job.jobTitle}</h3>
            <p>{job.companyName}</p>
            <p>{job.description}</p>
            <p>Posted by: {job.postedBy.name}</p>
          </div>
        ))
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default JobPosts;
