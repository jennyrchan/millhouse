import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import {deleteFromCart, increaseQuantity, decreaseQuantity} from '../reducers/cart';
import CartItem from './CartItem';

/* -----------------    COMPONENT     ------------------ */

class Cart extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false,
      cardNumber: '',
      cardMonthYear: '',
      cardCVC: ''
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleCCNumChange = this.handleCCNumChange.bind(this);
    this.handleCCSecurityChange = this.handleCCSecurityChange.bind(this);
  }

  open() {
    this.setState({ show: true });
  }

  close() {
    this.setState({ show: false });
  }

  handleCCNumChange(evt) {
    if (evt.target.value.length <= 16 || typeof +evt.target.value === 'number') {
        this.setState({ cardNumber: evt.target.value });
    }
  }

  handleCCSecurityChange (evt) {
    if (evt.target.value.length <= 4) {
      this.setState({ cardCVC: evt.target.value });
    }
  }

  render () {
    const cart = this.props.cart || { products: null };
    const products = cart.products;
    const cartEmpty = 'Why not buy some Cheerios?';
    let totalPrice = 0;

    if (products) {
      totalPrice = products.reduce((subtotal, product) => {
        const productTotal = product.orderProducts.quantity * product.price;
        return subtotal + productTotal;
      }, 0).toFixed(2);
    }

    return (
      <shoppingCart id="shopping-cart">
        <h1>Shopping Cart</h1>
        {
          !products ? (
            <section><h4>{cartEmpty}</h4></section>
          ) : (
            products.map(product => (
              <CartItem
                key={product.id}
                product={product}
                userId={cart.user_id} quantity={product.orderProducts.quantity} />
            ))
          )
        }
        <section><h4>Tax — meh</h4></section>
        <section><h4>{`Total — $${totalPrice / 100}`}</h4></section>

          <Modal show={this.state.show} onHide={this.close}>
            <Modal.Header>
              <h1>Checkout</h1>
            </Modal.Header>
            <Modal.Body>
              <form>
                <label>Credit Card</label>
                <input placeholder="Credit Card"
                  autoComplete="cc-number"
                  type="text"
                  value={this.state.cardNumber}
                  onChange={this.handleCCNumChange} />
                <label>CVC</label>
                <input placeholder=""
                  autoComplete="cc-csc"
                  type="text"
                  value={this.state.cardCVC}
                  onChange={this.handleCCSecurityChange} />
                <input type="submit" value="submit" />
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
