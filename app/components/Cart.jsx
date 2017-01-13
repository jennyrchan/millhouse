import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/* -----------------    COMPONENT     ------------------ */

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const products = this.props.products;

    return (
      <div>
        {
          products.map(product => {
            return (
              <div id={product.id} className="row">
                <div className="col-xs-1">
                  product.quantity
                </div>
                <div className="col-xs-6">
                  {product.name}
                </div>
                <div className="col-xs-3">
                  <img src={product.image} />
                </div>
                <div className="col-xs-2">
                  Price
                </div>
              </div>
            );
          })
        }

        <div className="row">
          <div className="col-xs-10">
            Total:
          </div>
          <div className="col-xs-2">
            Price
          </div>
        </div>
      </div>
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ orderProducts }) => ({ products: orderProducts });

const mapDispatch = ;

export default connect(mapState, mapDispatch)(Cart);
