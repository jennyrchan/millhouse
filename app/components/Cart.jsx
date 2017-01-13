import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/* -----------------    COMPONENT     ------------------ */

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render () {

    return (
      <div>
        {
          something.map(product => {
            return (
              <div className="row">
                <div className="col-xs-1">
                  Quantity
                </div>
                <div className="col-xs-6">
                  Product Name
                </div>
                <div className="col-xs-3">
                  Picture
                </div>
                <div className="col-xs-2">
                  Price
                </div>
              </div>
            )
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

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
