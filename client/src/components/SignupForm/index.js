import React, { useState } from 'react';

export const SignupForm = ({ handleSignup }) => {
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
      <form onSubmit={e => handleSignup(e, { username, password })}>
        <h4>Sign Up</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type="submit" />
      </form>
  );
}
