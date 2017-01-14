'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux';
import axios from 'axios';

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import Product from './components/Product'

import {fetchCart} from './reducers/cart';
import {receiveProduct} from './reducers/product';
import {receiveReviews} from './reducers/reviews';

const onAppEnter = () => {
  fetchCart();
};

const onProductEnter = (route) => Promise.all([
  axios.get(`/api/products/${+route.params.productId}`),
  axios.get(`/api/products/${+route.params.productId}/reviews`)
])
.then(responses=> responses.map(response=>response.data))
.then(([product, reviews]) => {
  store.dispatch(receiveProduct(product));
  store.dispatch(receiveReviews(reviews));
})
.catch(err => console.log(err));

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
