import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";

import { DefaultErrorPage } from './pages/DefaultErrorPage';
import { TravelItinerary } from "./pages/TravelItinerary";
import { Locations } from "./pages/Locations";
import { Wishlist } from "./pages/Wishlist";
import { Country } from './components/Country';
import { Header } from './components/Header';

import './index.css';

const App = () => {
  return (
    <div className="App">
      <div className="link-container">
        <Header
          children={<div>
            <NavLink className="header-nav-link" activeClassName="active" exact to="/">Homepage</NavLink>
            <NavLink className="header-nav-link" activeClassName="active" to="/travel-itinerary">Travel Itinerary</NavLink>
            <NavLink className="header-nav-link" activeClassName="active" to="/locations">Locations</NavLink>
            <NavLink className="header-nav-link" activeClassName="active" to="/wishlist">Wishlist</NavLink>
          </div>}
        />
      </div>
      <Switch>
        <Route path="/" exact component={TravelItinerary} />
        <Route path="/travel-itinerary" exact component={TravelItinerary} />
        <Route path='/locations/:locationId' component={Country} />
        <Route path="/locations" component={Locations} />
        <Route path="/wishlist" component={Wishlist} />
        <Route component={DefaultErrorPage} />
      </Switch>
    </div>
  );
}

export default App;