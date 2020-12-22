import React, { useState } from 'react';

import './style.css';

export const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = e => {
    const name = e.target.value;
    setUsername(name);
  };

  const handlePasswordChange = e => {
    const p = e.target.value;
    setPassword(p);
  }

  return (
    <div className="form-container">
      <h1>Log In</h1>
      <form className="login-form" onSubmit={e => handleLogin(e, { username, password })}>
        <label htmlFor="username">Username</label>
        <input
            className="login-form-field"
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
            className="login-form-field"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
        />
        <input className="login-form-submit" type="submit" />
      </form>
    </div>
);
}
