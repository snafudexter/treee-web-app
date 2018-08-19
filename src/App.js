import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const App = () => (
  <Switch>
    {/* <Route exact path="/" render={() => (<Redirect to="/dashboard"/>)}/> */}
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
  </Switch>
);

export default App;
