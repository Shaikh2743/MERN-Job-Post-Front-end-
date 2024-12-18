// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Job Posting Platform</h1>
      <p>Find your dream job or post a new one!</p>
      <Link to="/job-posts">View Job Posts</Link>
    </div>
  );
};

export default Home;
