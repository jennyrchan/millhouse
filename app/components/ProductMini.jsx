import React, { Component } from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

const ProductMini = function (props) {

  const product = props.product;

  return (
    <div className="product">
      <img src={`/cereals/${product.id}.jpg`} className="img-thumbnail"/>
      <h3>{ product.title }</h3>
      <h4>{ product.price }</h4>
    </div>
  );
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ product }) => ({ product: product });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(ProductMini);
