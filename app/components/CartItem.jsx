import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteFromCart, increaseQuantity, decreaseQuantity} from '../reducers/cart';

class CartItem extends Component() {
  constructor (props) {
    super(props);
    this.clickRemoveFromCart = this.clickRemoveFromCart.bind(this);
    this.clickRmvQuantity = this.clickRmvQuantity.bind(this);
    this.clickAddQuantity = this.clickAddQuantity.bind(this);
  }

  clickRemoveFromCart() {
    const userId = this.props.userId;
    const productId = this.props.product.id;
    return this.props.deleteFromCart(userId, productId);
  }

  clickRmvQuantity() {
    const userId = this.props.userId;
    const productId = this.props.product.id;
    return this.props.decreaseQuantity(userId, productId);
  }

  clickAddQuantity() {
    const userId = this.props.userId;
    const productId = this.props.product.id;
    return this.props.increaseQuantity(userId, productId);
  }

  render () {
    const product = this.props.product;

    return (
      <section key={product.id}>
        <button
          type="button"
          onClick={this.clickRemoveFromCart}
          className="btn btn-default btn-xs">
            <span className="glyphicon glyphicon-remove" />
        </button>

        <button
          type="button"
          onClick={this.clickRmvQuantity}
          className="btn btn-default btn-xs">
            <span className="glyphicon glyphicon-minus" />
        </button>

        <strong> {product.orderProducts.quantity} </strong>

        <button
          type="button"
          onClick={this.clickAddQuantity}
          className="btn btn-default btn-xs">
            <span className="glyphicon glyphicon-plus" />
        </button>

        {` ${product.title} Cheerios — $${product.price / 100}`}
      </section>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state, ownProps) => {
  console.log('OWN PROPS: ', ownProps);
};

const mapDispatch = dispatch => {
  return {
    deleteFromCart: (userId, productId) => {
      dispatch(deleteFromCart(userId, productId));
    },
    increaseQuantity: (productId) => {
      dispatch(increaseQuantity(productId));
    },
    decreaseQuantity: (productId) => {
      dispatch(decreaseQuantity(productId));
    }
  };
};

export default connect(mapState, mapDispatch)(CartItem);
