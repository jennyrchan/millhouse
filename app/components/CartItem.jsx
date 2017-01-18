import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteFromCart, increaseQuantity, decreaseQuantity } from '../reducers/cart';

class CartItem extends Component {
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
    const quantity = this.props.quantity;

    return (
      <section>
        <button
          type="button"
          onClick={this.clickRemoveFromCart}
          className="btn btn-default btn-xs">
            <span className="glyphicon glyphicon-remove" />
        </button>
        { quantity > 1 ?
          <button
            type="button"
            onClick={this.clickRmvQuantity}
            className="btn btn-default btn-xs">
              <span className="glyphicon glyphicon-minus" />
          </button> : null}

        <strong> {quantity} </strong>

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

const mapState = (state, {product, userId, quantity}) => ({ product, userId, quantity })

const mapDispatch = dispatch => {
  return {
    deleteFromCart: (userId, productId) => {
      dispatch(deleteFromCart(userId, productId));
    },
    increaseQuantity: (userId, productId) => {
      dispatch(increaseQuantity(userId, productId));
    },
    decreaseQuantity: (userId, productId) => {
      dispatch(decreaseQuantity(userId, productId));
    }
  };
};

export default connect(mapState, mapDispatch)(CartItem);
