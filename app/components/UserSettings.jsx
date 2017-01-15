import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';

const UserSettings = props => {
  let pencil = <button type="button" className="btn btn-default btn-xs pull-right"><span className="glyphicon glyphicon-pencil"></span> </button>

  const {firstName, lastName, email, phoneNumber, shippingAddress, billingAddress} = props.userSettings;

  return (
    <div>
      <div className = 'col-xs-9'>
        <div id = 'userTitle'> User Profile </div>
        <div className = 'user' id = 'firstName'> First Name: {firstName && firstName} {pencil}</div>
        <div className = 'user'> Last Name: {lastName && lastName} {pencil}</div>
        <div className = 'user'> Email: {email && email} {pencil}</div>
        <div className = 'user'> Phone Number: {phoneNumber && phoneNumber} {pencil}</div>
        <div className = 'user'> Shipping Address: {shippingAddress && shippingAddress} {pencil}</div>
        <div className = 'user'> Billing Address: {billingAddress && billingAddress} {pencil}</div>
      </div>

      <div>
        <UserSidebar />
      </div>
    </div>
  )
}

/*  --------------   Container ---------------- */

const mapState = state => {
  return {
    userSettings: state.userSettings
  };
}

const mapDispatch = dispatch => {
  return {};
}

export default connect(mapState,mapDispatch)(UserSettings);