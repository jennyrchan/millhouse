'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, Redirect} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux';
import axios from 'axios';

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import Product from './components/Product'
import UserOrders from './components/UserOrders';
import UserSettings from './components/UserSettings';
import UserReviews from './components/UserReviews';

import {fetchCart} from './reducers/cart';
import {receiveProduct} from './reducers/product';
import {receiveReviews} from './reducers/productReviews';
import {receiveUser} from './reducers/userSettings';


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
.catch(err => console.log('Product Error', err));

const AuthContainer = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar />
      {children}
    </div>
)

const onUserSettingsEnter = route =>
  axios.get(`/api/users/${+route.params.userId}`)
  .then(user => user.data)
  .then(user => store.dispatch(receiveUser(user)))
  .catch(err => console.log('UserSettings Error', err));

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AuthContainer} onEnter={onAppEnter}>
        <IndexRedirect to="/products/:productId" />
        <Route path="/products/:productId" onEnter = {onProductEnter} component={Product} />
        <Redirect from="/users/:userId" to='/users/:userId/orders' />
        <Route path="/users/:userId/orders" component= {UserOrders}/>
        <Route path="/users/:userId/reviews" component= {UserReviews}/>
        <Route path="/users/:userId/settings" component= {UserSettings} onEnter = {onUserSettingsEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
