import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Fihr from '../containers/Category';

export default () => (
  <Router>
    <Switch>
      {/* Redirect for landing screen */}
      <Route exact path="/">
        <Redirect to="/fihr/Observation" />
      </Route>
      <Route path="/fihr/:category">
        <Fihr />
      </Route>
    </Switch>
  </Router>
);
