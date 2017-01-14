'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import Product from './components/Product'

import {fetchCart} from './reducers/cart';
import {fetchProduct, fetchReviews} from './reducers/product';

const onAppEnter = () => {
  fetchCart();
};

const onProductEnter = (route) => (store.dispatch(fetchProduct(+route.params.productId)));

const onReviewsEnter = (route) => (fetchReviews(+route.params.productId));

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
      <Route path="/" component={AuthContainer} onEnter={onAppEnter}>
        <IndexRedirect to="/products/:productId" />
        <Route path="/products/:productId" onEnter = {onProductEnter} component={Product} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
