import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const RECEIVE_CART = 'RECEIVE_CART';
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const BUY_MORE = 'BUY_MORE';
const BUY_LESS = 'BUY_LESS';
const CHECKOUT = 'CHECKOUT';


/* ------------   ACTION CREATORS     ------------------ */

export const receiveCart = cart => ({ type: RECEIVE_CART, cart });
export const addProduct = product => ({ type: ADD_PRODUCT, product });
export const rmvProduct = productId => ({ type: REMOVE_PRODUCT, productId });
export const buyMore = productId => ({ type: BUY_MORE, productId });
export const buyLess = productId => ({ type: BUY_LESS, productId });
export const checkout = cart => ({ type: CHECKOUT, cart });

/* ------------       REDUCER     ------------------ */

export default function reducer (state = {}, action) {
  const newCart = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_CART:
      return action.cart;

    case ADD_PRODUCT:
      newCart.products.push(action.product);
      break;

    case REMOVE_PRODUCT:
      newCart.products = state.products.filter(product => {
        return product.id !== action.productId;
      });
      break;

    case BUY_MORE:
      newCart.products = state.products.map(product => {
        if (product.id === action.productId) product.orderProducts.quantity++;
        return product;
      });
      break;

    case BUY_LESS:
      newCart.products = state.products.map(product => {
        if (product.id === action.productId) product.orderProducts.quantity--;
        return product;
      });
      break;

    case CHECKOUT:
      fetchCart(newCart.user_id);
      return null;

    default:
      return state;
  }

  return newCart;
}

/* ------------       DISPATCHERS     ------------------ */

// Finds or creates the user's cart
export const fetchCart = (userId) =>
  dispatch =>
    axios.get(`/api/orders/cart/${userId}`)
      .then(res => res.data[0])
      .then(cart => dispatch(receiveCart(cart)))
      .catch(err => console.error('Fetching shopping cart unsuccesful', err));

export const addToCart = (userId, product) => {
    return dispatch => {
    dispatch(addProduct(product));
    axios.put(`/api/orders/cart/${userId}/product/${product.id}`, {
      priceAtPurchase: product.orderProducts.priceAtPurchase,
      quantity: product.orderProducts.quantity
      })
      .catch(err => console.error('Add to cart unsuccesful', err));
  };
};

export const deleteFromCart = (userId, productId) => {
  return dispatch => {
    dispatch(rmvProduct(productId));
    axios.delete(`/api/orders/cart/${userId}/product/${productId}`)
    .catch(err => console.error('Delete from cart unsuccesful', err));
  };
};

export const increaseQuantity = (userId, productId) => {
  return dispatch => {
    dispatch(buyMore(productId));
    axios.put(`/api/orders/cart/${userId}/product/${productId}/plus`)
    .catch(err => console.error('Quantity not altered', err));
  };
};

export const decreaseQuantity = (userId, productId) => {
  return dispatch => {
    dispatch(buyLess(productId));
    axios.put(`/api/orders/cart/${userId}/product/${productId}/minus`)
    .catch(err => console.error('Quantity not altered', err));
  };
}
