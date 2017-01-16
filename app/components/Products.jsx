import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ProductMini from './ProductMini';

/* -----------------    COMPONENT     ------------------ */

export const Products = props => {

  const products = props.products;

  return (
    <div>
      <h1>Products</h1>
        <div className="row">
          {
            products && products.map(product => (
              <div className="col-xs-4" key={ product.id }>
                <Link className="thumbnail" to={`/products/${product.id}`}>
                  <ProductMini product={product} />
                </Link>
              </div>
            ))
          }
        </div>
    </div>
  );
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ products }) => ({ products: products });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Products);
