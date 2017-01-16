import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';

const UserOrders = props => {
  let pencil = <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-pencil"></span> </button>

  const {orders} = props;
  let id, newDate;
  const obj = {};
  if(orders.length)  id = orders[0].orders[0].user_id;

  return (
      <div>
        <div className = 'col-xs-9'>
          <div id = 'userTitle'> Past Orders </div>







          {orders.length && orders.map((order,id) => {
            let date = new Date(order.created_at).toString().split(' ');
            newDate = date[1] + " " + date[2] + ", " + date[3];
            return (
            <div key = {id} id = 'userOrderProducts'>
            <h1> {newDate} </h1>
            <img src={`/cereals/${order.id}.jpg`} id='userOrderImage' />
            <h4> ${order.price} </h4>
          <h4> Order status: {order.status} {pencil} </h4>

            </div>
            )
          })}
        </div>

        <div>
        <UserSidebar userId={id}/>
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