import React from 'react';
import { Link } from 'react-router';

function ProductMini (props) {

  const product = props.product;

  return (
    <div className="row">
      <Link className="thumbnail" to={`/products/${product.id}`}>
        <div className="col-xs-6">
          <img src={`/cereals/${product.id}.jpg`} className="img-thumbnail"/>
        </div>
        <div className="col-xs-6">
          <h3>{ product.title }</h3>
          <h4>${ product.price / 100 }</h4>
        </div>
      </Link>
    </div>
  );
}

export default ProductMini;
