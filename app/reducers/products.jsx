import axios from 'axios'

/* ------------       REDUCER     ------------------ */

const reducer = (state = null, action) => {
  switch(action.type) {
  case RECEIVE_PRODUCTS:
    return action.products;
  }
  return state;
};

export default reducer

/* -----------------    ACTION     ------------------ */

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

/* ------------   ACTION CREATOR     ------------------ */

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS, products
});

/* ------------       DISPATCHER     ------------------ */

export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(response => {
        const products = response.data;
        dispatch(receiveProducts(products));
      })
      .catch(err => console.error('Fetching products unsuccessful', err));
