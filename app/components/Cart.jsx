import React from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

export const Cart = props => {

  const products = props.products;

  return (
    <div>
      {
        products.map(product => {
          return (
            <div id={product.id} className="row">
              <div className="col-xs-1">
                { product.quantity >= 2
                  ? (<button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-minus"></span> </button>)
                  : (<button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-remove"></span> </button>)
                }
                <span>product.quantity</span>
                <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-plus"></span> </button>
              </div>
              <div className="col-xs-6">
                <span>{product.name}</span>
              </div>
              <div className="col-xs-3">
                <img src={product.image} />
              </div>
              <div className="col-xs-2">
                <span>product.price</span>
              </div>
            </div>
          );
        })
      }

      <div className="row">
        <div className="col-xs-10">
          <h4>Total:</h4>
        </div>
        <div className="col-xs-2">
          {
            products.reduce((subtotal, product) => {
              const productTotal = product.quantity * product.price;
              return subtotal + productTotal
            }, 0)
          }
        </div>
      </div>
    </div>
  );
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ cart }) => ({ products: cart.products });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
