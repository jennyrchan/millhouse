import axios from 'axios'

/* ------------       REDUCER     ------------------ */

const reducer = (state = null, action) => {
  switch(action.type) {
  case RECEIVE_CART:
    return action.cart;
  }
  return state;
};

export default reducer

/* -----------------    ACTION     ------------------ */

const RECEIVE_CART = 'RECEIVE_CART';

/* ------------   ACTION CREATOR     ------------------ */

export const receiveCart = cart => ({
  type: RECEIVE_CART, cart
});

/* ------------       DISPATCHER     ------------------ */

export const fetchCart = () =>
  dispatch =>
    axios.get('/api/orders/cart')
      .then(response => {
        const cart = response.data;
        dispatch(receiveCart(cart));
      })
      .catch(err => console.error('Fetching shopping cart unsuccessful', err));
