import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from 'views/LandingPage'
import GuiPage from 'views/GuiPage'
import FibonacciPage from 'views/FibonacciPage'

export default (
  <Switch>
    <Route path='/fib' component={FibonacciPage} />
    <Route path='/gui' component={GuiPage} />
    <Route path='/' component={LandingPage} />
  </Switch>
)
