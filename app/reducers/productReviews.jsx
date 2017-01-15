const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';

export const receiveProductReviews = reviews => ({
  type: RECEIVE_REVIEWS, reviews
});


// ===========   Reducer =========================

const reducer = (state = {}, action) => {

  let newState = Object.assign({}, state);

  switch (action.type) {

  case RECEIVE_REVIEWS:
      let arr = [];
      action.reviews.map(review => {
        arr.push(review);
      });
      newState = arr;
      break;

  default: return state;

  }

  return newState;

};

export default reducer;