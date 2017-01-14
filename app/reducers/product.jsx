import axios from 'axios';

// Action Creators ====================

const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';

export const receiveProduct = product => ({
  type: RECEIVE_PRODUCT, product
});

const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';

export const receiveReviews = product => ({
  type: RECEIVE_REVIEWS, reviews
});

export const fetchProduct = (id) => dispatch =>
    axios.get(`/api/products/${id}`)
    .then(response => response.data)
    .then(product => dispatch(receiveProduct(product)))
    .catch(err => console.log('Fetching product unsuccessful', err));


export const fetchReviews = (id) => dispatch =>
    axios.get(`/api/products/${id}/reviews`)
    .then(res => res.data)
    .then(reviews => dispatch(receiveReviews(reviews)))
    .catch(err => console.log('Fetching reviews unsuccessful', err));


// ===========   Reducer =========================

const reducer = (state = {}, action) => {

  let newState = Object.assign({}, state);

  switch (action.type) {

  case RECEIVE_PRODUCT:
      newState.id =  action.product.id;
      newState.category = action.product.category;
      newState.title = action.product.title;
      newState.image = action.product.image;
      newState.summary = action.product.summary;
      newState.price = action.product.price;
      newState.inventory = action.product.inventory;
      newState.calories = action.product.calories;
      newState.sugar = action.product.sugar;
      newState.fiber = action.product.fiber;
      newState.protein = action.product.protein;
      return newState;

  case RECEIVE_REVIEWS:
      newState.reviews= action.reviews;
      return newState;

  default: return state;

  }

};

export default reducer;
