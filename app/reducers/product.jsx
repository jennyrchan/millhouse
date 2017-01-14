// Action Creators ====================

const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';

export const receiveProduct = product => ({
  type: RECEIVE_PRODUCT, product
});

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
      break;

  default: return state;

  }

  return newState;

};

export default reducer;
