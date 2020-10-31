import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import Dashboard from '../pages/Dashboard'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import RecoverAccount from '../pages/RecoverAccount'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/sign-in" component={SignIn} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/recover-account" component={RecoverAccount} />

    <Route path="/" exact component={Dashboard} isPrivate />
  </Switch>
)

export default Routes
