const RECEIVE_USERORDERS = 'RECEIVE_USERORDERS';

export const receiveUserOrders = orders => ({
  type: RECEIVE_USERORDERS, orders
});

/* ------------  Reducer ----------------------- */

const reducer = (state = {}, action) => {
  let newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_USERORDERS:
      newState = action.orders;
      break;

    default: return state;
  }
  return newState;

};

export default reducer;
