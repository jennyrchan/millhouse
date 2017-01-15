'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Navbar from './components/Navbar'
import Products from './components/Products'
import ProductContainer from './containers/ProductContainer'

import {fetchCart} from './reducers/cart';
import {fetchProducts, fetchProduct} from './reducers/products';

const onAppEnter = () => {
  // store.dispatch(fetchCart());
  store.dispatch(fetchProducts());
  // store.dispatch(fetchProduct());
};

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
        <Route path="/products/:productId" component={ProductContainer} />
        <IndexRedirect to="/products" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
