import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/Login';
import Profile from './components/Profile';
import Spots from './components/Spots';
import Home from './components/Home';
import IntroduceSpot from './components/IntroduceSpot';
import { getAWSTempCred } from './components/AuthenticatingUser';




// const Home = () => <h1>Welcome to Home Page</h1>;

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInUserProfile, setLoggedInUserProfile] = useState(null);
  
  // AWS.config.credentials

  const handleLogin = async  (user) => {
    console.log("App handleLogin");
    console.log(user);
    setLoggedInUser(user.username);
    setLoggedInUserProfile(user);

    await getAWSTempCred(user.cognitoUser);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <Navbar user={loggedInUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/profile" element={<Profile user={loggedInUserProfile} />} />
        <Route path="/Spots" element={<Spots />} />
        <Route path="/intoduce-spot" element={<IntroduceSpot user={loggedInUserProfile} />} />
      </Routes>
    </Router>
  );
};

export default App;
