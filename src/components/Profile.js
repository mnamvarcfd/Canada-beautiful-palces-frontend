import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const getAtribute = async (cognitoUser, attribute) => {
  const attributes = await Auth.userAttributes(cognitoUser);
  return attributes.find((a) => a.Name === attribute)?.Value || '';
};

const Profile = ({ user }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user && user.cognitoUser) {
      async function getEmail() {
        const emailValue = await getAtribute(user.cognitoUser, 'email');
        setEmail(emailValue);
      }
      getEmail();
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        <h1>Welcome to the Profile Page</h1>
        <p>Please sign in to view your profile.</p>
        <Link to="/login">Sign In</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {email}</p>
      <p>You are logged in.</p>
    </div>
  );
};

export default Profile;
