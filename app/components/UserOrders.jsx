import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';
import ProductMini from './ProductMini';

const UserOrders = props => {
  let pencil = <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-pencil"></span> </button>

  const {orders} = props;
  let id, newDate,total;
  if(orders.length)  id = orders[0][0].orders[0].user_id;


  return (
    <div className = 'col-xs-9'>
      <h1 id = 'userTitle'> Past Orders </h1>
        {
          orders.length && orders.map((order,id) => {
            let date = new Date(order[0].created_at).toString().split(' ');
            newDate = date[1] + " " + date[2] + ", " + date[3];
            total = 0;
            return (
              <div key={id} className= "row" >
                <h2> {newDate} </h2>
                {
                  order.map(product => {
                    total += product.orderProducts.priceAtPurchase * product.orderProducts.quantity;
                    return (
                      <div className="col-xs-4" key={product.id} >
                        <ProductMini product={product} price={product.orderProducts.priceAtPurchase} />
                        <h4>Quantity: {product.orderProducts.quantity} </h4>
                      </div>
                    )
                  })
                }
                <h3>{total/100}</h3>
              </div>
            )
          })
        }
      <UserSidebar userId={id}/>
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

export default connect(mapState, mapDispatch)(UserOrders);

                // <div id = 'userOrderProducts'>
                //   <h1> {newDate} </h1>
                //   <img src={`/cereals/${order.id}.jpg`} id='userOrderImage' />
                //   <h4> ${order.price} </h4>
                //   <h4> Order status: {order.status} {pencil} </h4>
                // </div>