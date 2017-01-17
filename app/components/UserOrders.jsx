import React from 'react';
import { connect } from 'react-redux';
import UserSidebar from './UserSidebar';
import ProductMini from './ProductMini';

const UserOrders = props => {
  let pencil = <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-pencil"></span></button>

  const { orders } = props;
  let newDate, total;

  return (
    <div className="col-xs-9">
      <h1 id="userTitle">Past Orders</h1>
        <div className="background-text-box">
          {
            orders.length && orders.map((order, id) => {
              let date = new Date(order[0].created_at).toString().split(' ');
              newDate = date[1] + ' ' + date[2] + ', ' + date[3];
              total = 0;
              return (
                <div key={id} className="row">
                  <h2 style={{textAlign: 'center'}}><b>{newDate}</b></h2>
                  {
                    order.map(product => {
                      total += product.orderProducts.priceAtPurchase * product.orderProducts.quantity;
                      return (
                        <div className="col-xs-4" key={product.id}>
                          <ProductMini product={product} price={product.orderProducts.priceAtPurchase} />
                          <h4>Quantity: {product.orderProducts.quantity}</h4>
                        </div>
                      )
                    })
                  }
                  <h3><b>Order Total: ${(total / 100).toFixed(2)}</b></h3>
                </div>
              )
            })
          }
        </div>
      <UserSidebar userId={props.auth.id} />
    </div>
  )
}

/*  --------------   Container ---------------- */

const mapState = state => {
  return {
    orders: state.userOrders,
    auth: state.auth
  };
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(UserOrders);
