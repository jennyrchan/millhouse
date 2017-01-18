/* ------------   ACTION CREATOR     ------------------ */

const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = user => ({
  type: RECEIVE_USER, user
});

/* ------------       REDUCER     ------------------ */

const reducer = (state = {}, action) => {
  const newState = Object.assign({},state);

  switch (action.type) {
    case RECEIVE_USER:
      newState.firstName = action.user.firstName;
      newState.lastName = action.user.lastName;
      newState.email = action.user.email;
      newState.phoneNumber = action.user.phoneNumber;
      newState.shippingAddress = action.user.shippingAddress;
      newState.billingAddress = action.user.billingAddress;
      break;

    default: return state;
  }
  return newState;
};

export default reducer;
