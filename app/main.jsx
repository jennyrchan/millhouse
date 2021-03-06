'use strict';

import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './store';

import Auth from './components/Auth';
import Signup from './components/Signup';
import Products from './components/Products'
import Product from './components/Product';
import UserOrders from './components/UserOrders';
import UserSettings from './components/UserSettings';
import UserReviews from './components/UserReviews';
import NewProduct from './components/NewProduct';
import EditProduct from './components/EditProduct';
import NewReview from './components/NewReview';

import { receiveProduct } from './reducers/product';
import { receiveProducts } from './reducers/products';
import { receiveProductReviews } from './reducers/productReviews';
import { receiveUser } from './reducers/userSettings';
// import { receiveReviews } from './reducers/reviews';
import { receiveUserReviews } from './reducers/userReviews';
import { receiveUserOrders } from './reducers/userOrders';

const onAppEnter = () => {
  axios.get('/api/products')
    .then(response => {
      const products = response.data;
      store.dispatch(receiveProducts(products));
    })
    .catch(err => console.error('Fetching products unsuccessful', err));
};

const onProductEnter = route => Promise.all([
  axios.get(`/api/products/${+route.params.productId}`),
  axios.get(`/api/products/${+route.params.productId}/reviews`)])
    .then(responses => responses.map(response => response.data))
    .then(([product, reviews]) => {
      store.dispatch(receiveProduct(product));
      store.dispatch(receiveProductReviews(reviews));
    })
    .catch(err => console.log('Fetching product and reviews unsuccessful', err));

const onUserSettingsEnter = route =>
  axios.get(`/api/users/${+route.params.userId}`)
  .then(user => user.data)
  .then(user => store.dispatch(receiveUser(user)))
  .catch(err => console.log('User Settings Error', err));

const onUserReviewsEnter = route =>
  axios.get(`/api/users/${+route.params.userId}/reviews`)
  .then(reviews => reviews.data)
  .then(reviews => store.dispatch(receiveUserReviews(reviews)))
  .catch(err => console.log('User Reviews Error', err));

const onUserOrdersEnter = route =>
  axios.get(`/api/users/${+route.params.userId}/orders`)
  .then(orders => orders.data)
  .then(orders => store.dispatch(receiveUserOrders(orders)))
  .catch(err => console.log('User Orders Error', err));

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Auth} onEnter={onAppEnter}>
        <IndexRedirect to="/products" />
        <Route path="/products" component={Products} />
        <Route path="/products/:productId" onEnter={onProductEnter} component={Product} />
        <Route path="/products/:productId/review" component={NewReview} />
        <Route path="/products/:productId/editproduct" component={EditProduct} />
        <Route path="/newproduct" component={NewProduct} />
        <Route path="/users/:userId/orders" component={UserOrders} onEnter={onUserOrdersEnter} />
        <Route path="/users/:userId/reviews" component={UserReviews} onEnter={onUserReviewsEnter} />
        <Route path="/users/:userId/settings" component={UserSettings} onEnter={onUserSettingsEnter} />
        <Route path="/signup" component={Signup} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
