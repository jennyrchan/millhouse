import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const RECEIVE_CART = 'RECEIVE_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const CHECKOUT = 'CHECKOUT';


/* ------------   ACTION CREATORS     ------------------ */

export const receiveCart = cart => ({ type: RECEIVE_CART, cart });
export const addToCart = cart => ({ type: ADD_TO_CART, cart });
export const checkoutReq = cart => ({ type: CHECKOUT, cart });


/* ------------       REDUCER     ------------------ */

export default function reducer (state = {}, action) {
  console.log('ACTION OBJ: ', action);
  switch (action.type) {

    case RECEIVE_CART:
      return action.cart;

    default:
      return state;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchCart = () => dispatch => {
    console.log('FETCHING THE SHOPPING CART');
    axios.get('/api/orders/cart')
      .then(res => res.data)
      .then(cart => {
        console.log('SHOPPING CART FOUND!');
        return dispatch(receiveCart(cart))
    })
    .catch(err => console.error('Fetching shopping cart unsuccesful', err));
  }

export const saveCart = () =>
  dispatch =>
    axios.post('/api/orders/cart')
      .then(res => true)
      .catch(err => console.error('Saving shopping cart unsuccessful', err));
