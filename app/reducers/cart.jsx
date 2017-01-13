import axios from 'axios'

const reducer = (state = null, action) => {
  switch(action.type) {
  case RECEIVE_CART:
    return action.cart;
  }
  return state;
};

const RECEIVE_CART = 'RECEIVE_CART';
export const receiveCart = cart => ({
  type: RECEIVE_CART, cart
});

export const fetchCart = () =>
  dispatch =>
    axios.get('/api/orders/cart')
      .then(response => {
        const cart = response.data;
        dispatch(receiveCart(cart));
      })
      .catch(err => console.error('Fetching shopping cart unsuccesful', err));

export default reducer;
