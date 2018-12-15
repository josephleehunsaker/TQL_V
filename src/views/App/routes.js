import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from 'views/LandingPage'
import GuiPage from 'views/GuiPage'

export default (
  <Switch>
    <Route path='/gui' component={GuiPage} />
    <Route path='/' component={LandingPage} />
  </Switch>
)
