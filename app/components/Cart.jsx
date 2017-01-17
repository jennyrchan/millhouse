import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

/* -----------------    COMPONENT     ------------------ */

class Cart extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({show: true});
  }

  close() {
    this.setState({show: false});
  }


  render () {
    // console.log(this.getState());
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

          <Modal  show={this.state.show} onHide={this.close}>
            <Modal.Header>
              <h1>Modal heading</h1>
            </Modal.Header>
            <Modal.Body>
              <form action="/your-server-side-code" method="POST">
                <script
                  src="https://checkout.stripe.com/checkout.js" className="stripe-button"
                  data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
                  data-amount="999"
                  data-name="Stripe.com"
                  data-description="Widget"
                  data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
                  data-locale="auto"
                  data-zip-code="true">
                </script>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>

        <section><button className="btn btn-primary btn-sm" onClick={this.open} ><span className="glyphicon glyphicon-shopping-cart "/> Checkout</button></section>



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
