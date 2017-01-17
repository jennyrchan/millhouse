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
export const rmvProduct = product => ({ type: REMOVE_PRODUCT, product });
export const checkoutReq = cart => ({ type: CHECKOUT, cart });
export const buyMore = product => ({ type: BUY_MORE, product });
export const buyLess = product => ({ type: BUY_LESS, product });

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
      newCart.products.filter(product => {
        return product.id !== action.product.id;
      });
      break;

    case BUY_MORE:
      newCart.products = newCart.map(product => {
        if (product.id === action.product.id) {
          product.orderProducts.quantity++;
        }
      });
      break;

    case BUY_LESS:
      newCart.products = newCart.map(product => {
        if (product.id === action.product.id) {
          product.orderProducts.quantity--;
        }
      });
      break;

    // case CHECKOUT:
    //   return null;

    default:
      return state;
  }

  return newCart;
}

/* ------------       DISPATCHERS     ------------------ */

// Finds or creates the user's cart
export const fetchCart = (id) =>
  dispatch =>
    axios.get(`/api/orders/cart/${id}`)
      .then(res => res.data[0])
      .then(cart => dispatch(receiveCart(cart)))
      .catch(err => console.error('Fetching shopping cart unsuccesful', err));

export const addToCart = (id, product) => {
    return dispatch => {
    dispatch(addProduct(product));
    axios.put(`/api/orders/cart/${id}/product/${product.id}`, {
      priceAtPurchase: product.orderProducts.priceAtPurchase,
      quantity: product.orderProducts.quantity
      })
      .catch(err => console.error('Add to cart unsuccesful', err));

  };
};


export const deleteFromCart = (id, product) =>
  dispatch => {
    dispatch(rmvProduct(product));
    axios.delete(`/api/orders/cart/${id}/product/${product.id}`)
    .catch(err => console.error('Delete from cart unsuccesful', err));
  };

export const increaseQuantity = (id, product) =>
  dispatch => {
    dispatch(buyMore(product));
    axios.put(`/api/orders/cart${id}/product/${product.id}/plus`)
      .catch(err => console.error('Quantity not altered', err));
  };

export const decreaseQuantity = (id, product) =>
  dispatch => {
    dispatch(buyLess(product));
    axios.put(`/api/orders/cart${id}/product/${product.id}/minus`)
      .catch(err => console.error('Quantity not altered', err));
  };

// export const editQuantity = (id, orderItem, quantity) =>
//   dispatch =>
//     axios.put(`/api/orders/cart/${id}/products/${productId}`)

// export const saveToCart = (id, orderItem) =>
//   dispatch =>
//     axios.put(`/api/orders/${id}/${orderItem.order_id}`, {
//         order_id: orderItem.order_id,
//         product_id: orderItem.product.id,
//         priceAtPurchase: orderItem.product.price,
//         quantity: orderItem.quantity
//       })
//       .catch(err => console.error('Adding to shopping cart unsuccesful', err));
