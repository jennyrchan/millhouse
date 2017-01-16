import React from 'react';
import { connect } from 'react-redux';
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
              <div className="col-xs-4 link-container" key={ product.id }>
                <ProductMini product={product} />
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
