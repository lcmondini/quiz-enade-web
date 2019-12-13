import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Question from '../pages/Question';
import Chat from '../pages/Chat';
import Essay from '../pages/Essay';
import Correction from '../pages/Correction';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/question" component={Question} isPrivate />
      <Route path="/chat" component={Chat} isPrivate />
      <Route path="/essay" component={Essay} isPrivate />
      <Route path="/correction" component={Correction} isPrivate />
    </Switch>
  );
}
