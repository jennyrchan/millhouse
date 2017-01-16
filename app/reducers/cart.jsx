import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const RECEIVE_CART = 'RECEIVE_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const CHECKOUT = 'CHECKOUT';


/* ------------   ACTION CREATORS     ------------------ */

export const receiveCart = cart => ({ type: RECEIVE_CART, cart });
export const addToCart = product => ({ type: ADD_TO_CART, product });
export const checkoutReq = cart => ({ type: CHECKOUT, cart });


/* ------------       REDUCER     ------------------ */

export default function reducer (state = null, action) {
  switch (action.type) {

    case RECEIVE_CART:
      return action.cart;

    case ADD_TO_CART:
      state.products.push(action.product);
      break;

    case CHECKOUT:
      return null;

    default:
      return state;
  }
}

/* ------------       DISPATCHERS     ------------------ */

// Will find or create the user's cart
export const fetchCart = (id) =>
  dispatch =>
    axios.get(`/api/orders/cart/${id}`)
      .then(res => res.data[0])
      .then(cart => dispatch(receiveCart(cart)))
      .catch(err => console.error('Fetching shopping cart unsuccesful', err));

// export const deleteFromCart

export const saveToCart = (id) =>
  dispatch =>
    axios.put(`.api/orders/${order}/${product}`, {
      quantity:
    })
      .then(res => res.data[0])
      .then(cart => dispatch(receiveCart(cart)))
      .catch(err => console.error('Saving shopping cart unsuccesful', err));
