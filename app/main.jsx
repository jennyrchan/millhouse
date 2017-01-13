'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import ProductContainer from './containers/ProductContainer'

const AuthContainer = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar />
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AuthContainer}>
        <IndexRedirect to="/products/:productId" />
        <Route path="/products/:productId" component={ProductContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
