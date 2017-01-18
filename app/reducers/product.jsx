import axios from 'axios';
import {browserHistory} from 'react-router';

/* ------------   ACTION CREATOR     ------------------ */

const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';
const NEW_PRODUCT = 'NEW_PRODUCT';

export const receiveProduct = product => ({
  type: RECEIVE_PRODUCT, product
});

export const newProduct = product => {
  return {
    type: NEW_PRODUCT,
    product
  }
}

/* ------------       REDUCER     ------------------ */

const reducer = (state = {}, action) => {

  const newState = Object.assign({}, state);

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
    case NEW_PRODUCT:
      newState.product = action.product;
      break;
    default: return state;
  }
  return newState;
};

export default reducer;

export const dispatchNewProduct = (product) => dispatch => {
  dispatch(newProduct(product))
  axios.post(`/api/products`, product)
  .then(() => browserHistory.push(`/products/`))
  .catch(error => console.error(error));
}
