import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';

const UserOrders = props => {
  return (
    <div>
      <div className = 'col-xs-9'>
        UserOrders
      </div>

      <div>
        <UserSidebar/>
      </div>
    </div>
  )
}

/*  --------------   Container ---------------- */

const mapState = state => {
  return {};
}

const mapDispatch = dispatch => {
  return {};
}

export default connect(mapState,mapDispatch)(UserOrders);