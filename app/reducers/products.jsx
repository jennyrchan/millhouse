import axios from 'axios';

/* ------------   ACTION CREATOR     ------------------ */

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
const EDIT_PRODUCT = 'EDIT_PRODUCT';

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS, products
});

export const editProduct = product => ({
  type: EDIT_PRODUCT, product
})

/* ------------       REDUCER     ------------------ */

const reducer = (state = null, action) => {
  switch(action.type) {
    case RECEIVE_PRODUCTS:
      return action.products;
    case EDIT_PRODUCT:
      const {product} = action;
      return state.map(stateProduct => product.id === stateProduct.id
        ? product : stateProduct)
  }
  return state;
};

export default reducer

/* ------------       DISPATCHERS     ------------------ */


// export (productId, product) =>

