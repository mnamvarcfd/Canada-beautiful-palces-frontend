import React, { useState } from 'react';
import AuthenticatingUser from './AuthenticatingUser';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('mnam');
  const [password, setPassword] = useState('MMmm4321@');

  const handleLogin = async () => {
    console.log("handleLogin");

    const user = await AuthenticatingUser(username, password);

    console.log("After AuthenticatingUser ", user);

    if (user) {
      console.log("handleLogin ", user);
      onLogin(user); 
    } else {
      alert('Login failed. Invalid username or password.');
    }
  };

  return (
    <div>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
