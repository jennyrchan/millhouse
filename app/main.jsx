'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux';
import axios from 'axios';

import store from './store'
import Navbar from './components/Navbar'
import Products from './components/Products'
import Product from './components/Product'

import {fetchCart} from './reducers/cart';
import {fetchProducts, fetchProduct} from './reducers/products';
import {receiveProduct} from './reducers/product';
import {receiveReviews} from './reducers/reviews';

const onAppEnter = () => {
  store.dispatch(fetchCart());
  store.dispatch(fetchProducts());
  // store.dispatch(fetchProduct());
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
)(
  ({ user, children }) =>
    <div>
      <Navbar />
      {children}
    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AuthContainer} onEnter={onAppEnter}>
        <Route path="/products" component={Products} />
        <Route path="/products/:productId" component={Product} onEnter={onProductEnter} />
        <IndexRedirect to="/products" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
