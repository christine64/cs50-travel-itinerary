import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";

import { TravelItinerary } from "./pages/TravelItinerary";
import { Locations } from "./pages/Locations";
import { Wishlist } from "./pages/Wishlist";

const App = () => {
  return (
    <div className="App">
      <div className="link-container">
        <NavLink activeClassName="active" exact to="/">Homepage</NavLink>
        <NavLink activeClassName="active" to="/travel-itinerary">Travel Itinerary</NavLink>
        <NavLink activeClassName="active" to="/locations">Locations</NavLink>
        <NavLink activeClassName="active" to="/wishlist">Wishlist</NavLink>
      </div>
      <Switch>
        <Route path="/" exact component={TravelItinerary} />
        <Route path="/travel-itinerary" exact component={TravelItinerary} />
        <Route path="/locations" component={Locations} />
        <Route path="/wishlist" component={Wishlist} />
      </Switch>
    </div>
  );
}

export default App;