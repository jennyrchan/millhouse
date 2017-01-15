import axios from 'axios';

/* ------------   ACTION CREATOR     ------------------ */

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS, products
});

/* ------------       REDUCER     ------------------ */

const reducer = (state = null, action) => {
  switch(action.type) {
    case RECEIVE_PRODUCTS:
      return action.products;
  }
  return state;
};

export default reducer

/* ------------       DISPATCHERS     ------------------ */

// export const fetchProducts = () =>
//   dispatch => {
//     axios.get('/api/products')
//       .then(response => {
//         const products = response.data;
//         dispatch(receiveProducts(products));
//       })
//       .catch(err => console.error('Fetching products unsuccessful', err));
// }
