import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from 'react-s-alert';
import Signup from './pages/Signup'

import './App.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const App = () => (
  <Switch>
    {/* <Route exact path="/" render={() => (<Redirect to="/dashboard"/>)}/> */}
    {/* <Route exact path="/login" component={Login} /> */}
    <Route exact path="/" component={Signup} />
    <Alert stack={{limit: 3}} />
  </Switch>
);

export default App;
