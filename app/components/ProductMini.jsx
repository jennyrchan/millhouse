import React from 'react';
import { Link } from 'react-router';

function ProductMini (props) {

  const product = props.product;
  const price = props.price;

  return (
    <div className="row">
      <Link className="thumbnail" to={`/products/${product.id}`}>
        <div className="col-xs-6">
          <img src={`/cereals/${product.id}.png`} className="img-thumbnail"/>
        </div>
        <div className="col-xs-6">
          <h3>{ product.title }</h3>
          <h4>${ (price / 100).toFixed(2) }</h4>
        </div>
      </Link>
    </div>
  );
}

export default ProductMini;
