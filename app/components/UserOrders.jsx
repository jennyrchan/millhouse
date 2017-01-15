import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';

const UserOrders = props => {
  let pencil = <button type="button" className="btn btn-default btn-xs pull-right"><span className="glyphicon glyphicon-pencil"></span> </button>

  let userId = props.orders.length && props.orders[0].user_id;

  return (
      <div>
        <div className = 'col-xs-9'>
          <div id = 'userTitle'> Past Orders </div>
          <div>
          {props.orders.length && props.orders.map(order => {
            <div>
              HIIIIII

            </div>
          })}
          </div>
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
    orders : state.userOrders
  };
}

const mapDispatch = dispatch => {
  return {};
}

export default connect(mapState,mapDispatch)(UserOrders);