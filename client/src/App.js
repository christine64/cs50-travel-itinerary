import React, { useState, useEffect } from 'react';
import { Route, Switch, NavLink, Redirect, useHistory } from 'react-router-dom';

import { DefaultErrorPage } from './pages/DefaultErrorPage';
import { Footer } from './components/Footer';
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
  // const [redirectState, setRedirect] = useState(null);

  let history = useHistory();

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
    .catch(() => { 
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
        history.push('/travel-itinerary')
        // <Redirect to={'/travel-itinerary'} />
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
          children={
          <div className="header-container">
            <div>
              <NavLink className="header-nav-link" activeClassName="active" exact to="/">Homepage</NavLink>
              { loggedIn && <NavLink className="header-nav-link" activeClassName="active" to="/travel-itinerary">Travel Itinerary</NavLink> }
              { loggedIn && <NavLink className="header-nav-link" activeClassName="active" to="/locations">Locations</NavLink> }
              { loggedIn && <NavLink className="header-nav-link" activeClassName="active" to="/wishlist">Wishlist</NavLink> }
              {
                loggedIn ? 
                <NavLink className="header-nav-link" activeClassName="active" to="/logout">Logout</NavLink>
                : <span>
                    <NavLink className="header-nav-link" activeClassName="active" to="/login">Login</NavLink>
                    <NavLink className="header-nav-link" activeClassName="active" to="/signup">Signup</NavLink>
                  </span>
              }
            </div>
            <ul className="sm-icons">
                <li className="sm-facebook">
                  <a href="#" target="_blank">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <title>Facebook icon</title>
                      <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" fill="#fff"></path>
                    </svg>
                  </a>
                </li>
                <li className="sm-instagram">
                  <a href="#" target="_blank">
                    <svg role="img" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <title>Instagram icon</title>
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
                    </svg>
                  </a>
                </li>
                <li className="sm-youtube">
                  <a href="#" target="_blank">
                    <svg role="img" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>YouTube icon</title>
                      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"></path>
                    </svg>
                  </a>
                </li>
              </ul>
          </div>
          }
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
      { error }
      <Footer />
    </div>
  );
}

export default App;