import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';

const UserSettings = props => {
  let pencil = <button type="button" className="btn btn-default btn-xs pull-right" id = 'userSettingsPencil'><span className="glyphicon glyphicon-pencil"></span> </button>

  const {firstName, lastName, email, phoneNumber, shippingAddress, billingAddress} = props.userSettings;

  let userId = +props.params.userId;

  return (
    <div>
      <div className = 'col-xs-9'>
        <div id = 'userTitle'> User Profile {pencil}</div>
        <div className = 'user' id = 'firstName'> First Name: {firstName && firstName} </div>
        <div className = 'user'> Last Name: {lastName && lastName} </div>
        <div className = 'user'> Email: {email && email} </div>
        <div className = 'user'> Phone Number: {phoneNumber && phoneNumber} </div>
        <div className = 'user'> Shipping Address: {shippingAddress && shippingAddress} </div>
        <div className = 'user'> Billing Address: {billingAddress && billingAddress} </div>
      </div>

      <div>
        <UserSidebar userId={userId}/>
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