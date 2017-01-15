import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: require('./auth').default,
  cart: require('./cart').default,
  product: require('./product').default,
  reviews: require('./productReviews').default,
  userSettings: require('./userSettings').default,
  userReviews: require('./userReviews').default
});

export default rootReducer;
