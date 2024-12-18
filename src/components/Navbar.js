import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user'); // Retrieve user data from local storage
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/job-posts">Job Posts</Link>
      <Link to="/about-us">About Us</Link>
      <Link to="/contact-us">Contact Us</Link>
      <Link to="/register">Register</Link>
      {isLoggedIn && <Link to="/dashboard">Dashboard</Link>} {/* Conditionally render */}
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
