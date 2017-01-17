import axios from 'axios';
import {browserHistory} from 'react-router';

/* ------------   ACTION CREATORS     ------------------ */

const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
const NEW_REVIEW = 'NEW_REVIEW';

export const receiveProductReviews = reviews => ({
  type: RECEIVE_REVIEWS, reviews
});

export const newReview = review => ({
  type: NEW_REVIEW, review
});

/* ------------       REDUCER     ------------------ */

const reducer = (state = [], action) => {

  let newState = [];

  switch (action.type) {

    case RECEIVE_REVIEWS:
        newState = [...action.reviews];
        break;
    case NEW_REVIEW:
        newState = [...state, action.review]
        break;
    default: return state;

  }

  return newState;

};

export default reducer;


/*  ---------- Dispatchers ---------- */

export const dispatchNewReview = (review) => dispatch => {
  console.log(review);
  dispatch(newReview(review))
  const {productId} = review;
  axios.post(`/api/products/${productId}/review`, review)
  .then(() => browserHistory.push(`/products/${productId}`))
  .catch(error => console.error(error));
}
