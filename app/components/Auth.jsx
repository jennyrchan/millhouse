import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';

const Auth = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <Navbar />
      {children}
    </div>
)

export default Auth;
