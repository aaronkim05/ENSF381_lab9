import './login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function login() {
// State to hold the username
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

async function handleSubmit(event) {
  event.preventDefault();
  if (!username || !password) {
    setError('Username and password are required');
    return;
  }

  try {
    const response = await fetch('/validate_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'username':username, 'password':password }),
    });
    const data = await response.text();

    if (response.ok) {
      navigate('/predict');
    } else {
      const data = await response.json();
      setError(data.message || 'Invalid login credentials');
    }
  } catch (error) {
    setError('Error during form submission:', error);
  }};


  return (
    <div>
      <head>
        <title>Login</title>
      </head>
        <form class="form2-container" onSubmit={handleSubmit}>
        <h1>Login</h1>
          <label>
            Username:
            <br></br>
            <input class="form2-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          </label>
          <label>
            Password:
            <br></br>
            <input class="form2-input" type="text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </label>
          <button class="form2-button" type="submit">Login</button>
        </form>
    </div>
  );
}

export default login;

