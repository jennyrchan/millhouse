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

// Finds or creates the user's cart
export const fetchCart = (id) =>
  dispatch =>
    axios.get(`/api/orders/cart/${id}`)
      .then(res => res.data[0])
      .then(cart => dispatch(receiveCart(cart)))
      .catch(err => console.error('Fetching shopping cart unsuccesful', err));

// export const deleteFromCart

export const saveToCart = (id, orderItem) =>
  dispatch =>
    axios.create(`.a/orders/${id}/${orderItem.order_id}`, {
        order_id: orderItem.order_id,
        product_id: orderItem.product.id,
        priceAtPurchase: orderItem.product.price,
        quantity: orderItem.quantity
      })
      .catch(err => console.error('Saving shopping cart unsuccesful', err));
