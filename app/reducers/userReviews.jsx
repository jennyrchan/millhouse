const RECEIVE_USERREVIEWS = 'RECEIVE_USERREVIEWS';

export const receiveUserReviews = reviews => ({
  type: RECEIVE_USERREVIEWS,
  reviews
});

/* ------------  Reducer ---------------------- */

const reducer = (state = {}, action) => {

  let newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_USERREVIEWS:
      let arr = [];
      action.reviews.map(review => {
        arr.push(review);
      })
      newState = arr;
      break;

    default: return state;
  }

  return newState;
};

export default reducer;
