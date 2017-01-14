import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/* -----------------    COMPONENT     ------------------ */

class Products extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const products = this.props.products;

    return (
      <div>
        <h3>Products</h3>
        <div className="row">
          {
            products && products.map(product => (
              <div className="col-xs-4" key={ product.id }>
                <Link className="thumbnail" to={`/api/products/${product.id}`}>
                  <img src={ `/cereals/${product.id}.jpg` }/>
                  <div className="caption">
                    <h5>
                      <span>{ product.title }</span>
                    </h5>
                    <small>${ product.price }</small>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ products }) => ({ products: products });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Products);
