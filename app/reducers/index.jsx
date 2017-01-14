import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  cart: require('./cart').default,
  product: require('./product').default
});

export default rootReducer;
