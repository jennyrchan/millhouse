/* ------------   ACTION CREATORS     ------------------ */

const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
const EDIT_REVIEW = 'EDIT_REVIEW';

export const receiveProductReviews = reviews => ({
  type: RECEIVE_REVIEWS, reviews
});

export const newReview = review => ({
  type: EDIT_REVIEW, review
});

/* ------------       REDUCER     ------------------ */

const reducer = (state = {}, action) => {

  let newState = Object.assign({}, state);

  switch (action.type) {

  case RECEIVE_REVIEWS:
      newState = action.reviews;
      break;
  case EDIT_REVIEW:
      //somehow replace the old review with the edited review

      break;


    default: return state;

  }

  return newState;

};

export default reducer;


/*  ---------- Dispatchers ---------- */

export const dispatchNewReview = (review) =>
  dispatch => {
     dispatch(newReview(review))
     axios.post(`api/reviews/`, review)
     .catch(error => console.error(error));
  }


