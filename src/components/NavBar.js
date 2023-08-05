import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav style={{ backgroundColor: 'lightblue', padding: '10px', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', marginRight: '20px' }}>
        <Link to="/">Home</Link>
      </div>      
      <div style={{ display: 'inline-block', marginRight: '20px' }}>
        <Link to="/Spots">Spots</Link>
      </div>
      <div style={{ display: 'inline-block', marginRight: '20px' }}>
        <Link to="/profile">Profile</Link>
      </div>
      <div style={{ display: 'inline-block', marginRight: '20px' }}>
        <Link to="/intoduce-spot">Introduce Spot</Link>
      </div>
      {user ? (
        <div style={{ display: 'inline-block' }}>
          Logged in as {user}. <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div style={{ display: 'inline-block' }}>
          <Link to="/login">Sign In</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
