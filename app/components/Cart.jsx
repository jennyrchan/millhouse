import React from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

export const Cart = props => {

  const products = props.products;
  const cartEmpty = 'Buy some Cheerios!'
  const totalPrice = products.reduce((subtotal, product) => {
    const productTotal = product.orderProducts.quantity * product.price;
    return subtotal + productTotal;
  }, 0)

  return (
    <shoppingCart id="shopping-cart">
      <h1>Shopping Cart</h1>
        {
          (!products) ? (
            <section><h4>{cartEmpty}</h4></section>
          ) : (
            products && products.map(product => {
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
      <section><a href="" className="btn btn-primary btn-sm"><span className="glyphicon glyphicon-shopping-cart" onClick={clickHandler}></span> Checkout</a></section>
    </shoppingCart>
  );
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ cart }) => ({ products: cart.products });

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
