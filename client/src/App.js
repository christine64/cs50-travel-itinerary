import React, { useState, useEffect } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import { DefaultErrorPage } from './pages/DefaultErrorPage';
import { TravelItinerary } from './pages/TravelItinerary';
import { Locations } from './pages/Locations';
import { Homepage } from './pages/Homepage';
import { Wishlist } from './pages/Wishlist';
import { Logout } from './components/Logout';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { Country } from './components/Country';
import { Header } from './components/Header';

import './index.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const fetchJwtToken = () => {
    fetch('http://localhost:8000/api/currentuser/', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    })
    .then(res => res.json())
    .then(json => {
      if (json.hasOwnProperty('user') || json.hasOwnProperty('username')) {
        const username = localStorage.getItem('username');
        const user = username.filter(name => username === name);

        if(user) {
          setLoggedIn(true);
          setUsername(user.username);
          setError('');
        }
      }
    })
    .catch((error) => { 
      console.log('Could not log user in using token.');
    });
  }

  useEffect(() => {
    if (localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== undefined) {
      fetchJwtToken()
    } else {
      setLoggedIn(false);
    }
  }, []);
    
  const handleLogin = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      if (json.hasOwnProperty('user') || json.hasOwnProperty('username')) {
        localStorage.setItem('token', json.token);
        setLoggedIn(true);
        setUsername(json.user.username);
        setError('');
      } else {
        setError(json.non_field_errors);
      }
    })
    .catch((error) => {
      setError('There was an error logging you in, please try again.');
    });
  };

  const handleSignup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      if (json.hasOwnProperty('user') || json.hasOwnProperty('username')) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.user.username);
        setLoggedIn(true);
        setUsername(json.user.username)
      } else {
        setError(json.non_field_errors);
      }
    })
    .catch((error) => {
      /** only display error if it is coming from API, not a JS error **/
      if (!error.toString().includes('TypeError')) {
        setError('There was an error signing you up, please try again.');
      }
    });;
  };
    
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="App">
      <div className="link-container">
        <Header
          children={<div>
            <NavLink className="header-nav-link" activeClassName="active" exact to="/">Homepage</NavLink>
            { console.log(loggedIn, 'hello') }
            { loggedIn && <NavLink className="header-nav-link" activeClassName="active" to="/travel-itinerary">Travel Itinerary</NavLink> }
            { loggedIn && <NavLink className="header-nav-link" activeClassName="active" to="/locations">Locations</NavLink> }
            { loggedIn && <NavLink className="header-nav-link" activeClassName="active" to="/wishlist">Wishlist</NavLink> }
            {
              loggedIn ? 
              <NavLink className="header-nav-link" activeClassName="active" to="/logout">Logout</NavLink>
              : <div>
                  <NavLink className="header-nav-link" activeClassName="active" to="/login">Login</NavLink>
                  <NavLink className="header-nav-link" activeClassName="active" to="/signup">Signup</NavLink>
                </div>
            }
          </div>}
        />
      </div>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/travel-itinerary" exact component={TravelItinerary} />
        <Route path='/locations/:locationId' component={Country} />
        <Route path="/locations" component={Locations} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/login" 
          render={() => (
            <LoginForm handleLogin={handleLogin} />
          )}
        />
        <Route path="/signup" 
          render={() => (
            <SignupForm handleSignup={handleSignup} />
          )}
        />
        <Route path="/logout" 
          render={() => (
            <Logout handleLogout={handleLogout} />
          )}
        />
        <Route component={DefaultErrorPage} />
      </Switch>
      { username && `Hi ${username}` }
      { error }
    </div>
  );
}

export default App;