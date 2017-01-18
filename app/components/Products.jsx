import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ProductMini from './ProductMini';

/* -----------------    COMPONENT     ------------------ */

export const Products = props => {

  const { products, user } = props;

  return (
    <div className="container-fluid">
      <h1>Products</h1>
      <div className="pull-right">
        {
          user && user.userType === 'admin'
          ? (<Link to={'/newproduct'}><button type="button" className="btn btn-primary"><span className="glyphicon glyphicon-plus"></span> Add New Product</button></Link>)
          : null
        }
        </div>
        <div className="row">
          {
            products && products.map(product => (
              <div className="col-xs-4 link-container" key={ product.id }>
                <ProductMini product={product} price={product.price} />
              </div>
            ))
          }
        </div>
    </div>
  );
}

/* -----------------    CONTAINER     ------------------ */

const mapState = state => {
  return {
    products: state.products,
    user: state.auth
  }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Products);
