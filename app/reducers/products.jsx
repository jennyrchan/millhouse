

// import axios from 'axios'

// /* ------------       REDUCER     ------------------ */

// const reducer = (state = null, action) => {
//   switch(action.type) {
//   case RECEIVE_PRODUCTS:
//     return action.products;
//   }
//   return state;
// };

// export default reducer

// /* -----------------    ACTION     ------------------ */

// const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

// /* ------------   ACTION CREATOR     ------------------ */

// export const receiveProducts = products => ({
//   type: RECEIVE_PRODUCTS, products
// });

// /* ------------       DISPATCHER     ------------------ */

// export const fetchProducts = () =>
//   dispatch =>
//     axios.get('/api/products')
//       .then(response => {
//         const products = response.data;
//         dispatch(receiveProducts(products));
//       })
//       .catch(err => console.error('Fetching products unsuccessful', err));

import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
const RECEIVE_SINGLE_PRODUCT = 'RECEIVE_SINGLE_PRODUCT';

/* ------------   ACTION CREATORS     ------------------ */

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS, products
});

export const receiveSingleProduct = product => ({
  type: RECEIVE_SINGLE_PRODUCT, product
});

/* ------------       REDUCER     ------------------ */

const initialProductsState = {
  products: [],
  product: {}
};

const reducer = (state = initialProductsState, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_PRODUCTS:
      newState.products = action.products;
      break;

    case RECEIVE_SINGLE_PRODUCT:
      newState.product = action.product;
      break;

    default:
      return state;

  }

  return newState;
};

export default reducer

/* ------------       DISPATCHERS     ------------------ */

export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(response => {
        const products = response.data;
        dispatch(receiveProducts(products));
      })
      .catch(err => console.error('Fetching products unsuccessful', err));

export const fetchProduct = productId =>
  dispatch =>
    axios.get(`/api/products/${productId}`)
      .then(response => {
        const product = response.data;
        dispatch(receiveSingleProduct(product));
      })
      .catch(err => console.error('Fetching single product unsuccessful', err));
