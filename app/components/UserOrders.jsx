import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';

const UserOrders = props => {
  let pencil = <button type="button" className="btn btn-default btn-xs pull-right"><span className="glyphicon glyphicon-pencil"></span> </button>

  return (
      <div>
        <div className = 'col-xs-9'>
          <div id = 'userTitle'> Past Orders </div>




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
    orders : state.orders
  };
}

const mapDispatch = dispatch => {
  return {};
}

export default connect(mapState,mapDispatch)(UserOrders);