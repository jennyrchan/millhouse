import React, { Component } from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

class Cart extends Component {
  constructor (props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    alert('checking out!')
  }

  render () {
    const cart = this.props.cart || {products: null};
    const products = cart.products;
    const cartEmpty = 'Why not buy some Cheerios?';
    let totalPrice = 0;

    if (products) {
      totalPrice = products.reduce((subtotal, product) => {
        const productTotal = product.orderProducts.quantity * product.price;
        return subtotal + productTotal;
      }, 0);
    }

    return (
      <shoppingCart id="shopping-cart">
        <h1>Shopping Cart</h1>
        {
          !products ? (
            <section><h4>{cartEmpty}</h4></section>
          ) : (
            products.map(product => {
              return (
                <section key={product.id}>
                  <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-minus"></span></button>

                  <strong> {product.orderProducts.quantity} </strong>

                  <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-plus"></span> </button>

                  {` ${product.title} Cheerios — $${product.price / 100}`}
                </section>
              );
            })
          )
        }
        <section><h4>Tax — meh</h4></section>
        <section><h4>{`Total — $${totalPrice / 100}`}</h4></section>
        <section><a href="" className="btn btn-primary btn-sm"><span className="glyphicon glyphicon-shopping-cart" onClick={this.clickHandler}></span> Checkout</a></section>
        <div className="millhouse" />
      </shoppingCart>
    );
  }
  }

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ cart }) => ({ cart });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);

// <div className="col-xs-1">
//   { product.quantity >= 2
//     ? (<button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-minus"></span> </button>)
//
//     : (<button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-remove"></span> </button>)
//   }
//   <p>{product.quantity}</p>
//   <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-plus"></span> </button>
// </div>
// <div className="col-xs-6">
//   <span>{product.name}</span>
// </div>
// <div className="col-xs-3">
//   <img src={product.image} />
// </div>
// <div className="col-xs-2">
//   <span>{product.price}</span>
// </div>
// <section id="total">
//   <div className="row">
//     <div className="col-xs-10">
//       <h4>Total:</h4>
//     </div>
//     <div className="col-xs-2">
//       {
//         products.reduce((subtotal, product) => {
//           const productTotal = product.quantity * product.price;
//           return subtotal + productTotal;
//         }, 0)
//       }
//     </div>
//   </div>
// </section>
