import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user, onLogout }) => {
  const [showLogoutOption, setShowLogoutOption] = useState(false);

  const handleCircleClick = () => {
    setShowLogoutOption(!showLogoutOption);
  };

  const renderUserIcon = () => {
    if (user) {
      const initials = user.split(' ').map((name) => name[0].toUpperCase()).join('');
      return (
        <div style={{ display: 'inline-block', position: 'relative', marginRight: '20px' }}>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: 'lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={handleCircleClick}
          >
            {initials}
          </div>
          {showLogoutOption && (
            <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
              <button onClick={onLogout}>Log out</button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <Link to="/login">
            <FontAwesomeIcon icon={faSignInAlt} /> Sign In
          </Link>
        </div>
      );
    }
  };

  return (
    <nav style={{ backgroundColor: 'lightblue', padding: '10px', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', position: 'absolute', top: 0, right: 0 }}>
        {renderUserIcon()}
      </div>
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
    </nav>
  );
};

export default Navbar;
