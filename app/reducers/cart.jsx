import axios from 'axios'

/* ------------   ACTION CREATOR     ------------------ */

const RECEIVE_CART = 'RECEIVE_CART';

export const receiveCart = cart => ({
  type: RECEIVE_CART, cart
});

/* ------------       REDUCER     ------------------ */

const reducer = (state = null, action) => {
  switch(action.type) {
    case RECEIVE_CART:
      return action.cart;
  }
  return state;
};

export default reducer

/* ------------       DISPATCHER     ------------------ */

export const fetchCart = () =>
  dispatch =>
    axios.get('/api/orders/cart')
      .then(response => {
        const cart = response.data;
        dispatch(receiveCart(cart));
      })
      .catch(err => console.error('Fetching shopping cart unsuccessful', err));
