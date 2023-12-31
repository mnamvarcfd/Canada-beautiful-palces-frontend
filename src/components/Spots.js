// Spots.js
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { config as appConfig } from '../services/config';
import './Spots.css'; // Import CSS file for styling

const Spots = () => {
  const [spotsData, setSpotsData] = useState([]);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const requestURL = appConfig.api;

        // Get the current authenticated user
        const user = await Auth.currentAuthenticatedUser();

        // Get the Cognito token
        const token = user.signInUserSession.idToken.jwtToken;

        // Make a GET request to your API
        const res = await fetch(requestURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        // Parse the response as JSON
        const data = await res.json();
        console.log('data from API:', data);
        setSpotsData(data);

      } catch (error) {
        console.error('Error fetching spots:', error);
      }
    }

    fetchSpots();
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  // If spotsData is empty, display a message or handle as needed
  if (spotsData.length === 0) {
    return <div>No spots data available.</div>;
  }

  return (
    <div className="spots-grid">
      {spotsData.map((spot) => (
        <div key={spot.spotId.S} className="spot-card">
          <img
            src={spot.photoUrl.S}
            alt="Spot"
            className="spot-image"
          />
          <div className="spot-details">
            <p>
              <strong>Author:</strong> {spot.introducedBy.S}
            </p>
            <p>
              <strong>Address:</strong> {spot.address.S}
            </p>
            <p>
              <strong>Description:</strong> {spot.description.S}
            </p>
            <p>
              <strong>Name:</strong> {spot.name.S}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Spots;
