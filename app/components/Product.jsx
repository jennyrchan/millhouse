import React, {Component} from 'react';
import Review from './Review';
import Cart from './Cart';
import { connect } from 'react-redux';
import { Link } from 'react-router';


import {addToCart} from '../reducers/cart';

/* -----------------    COMPONENT     ------------------ */

export class Product extends Component {
  constructor(props) {
    super(props);
    this.clickAddToCart = this.clickAddToCart.bind(this);
  }

  clickAddToCart(evt) {
    const product = Object.assign({}, this.props.product);
    product.orderProducts = {
      priceAtPurchase: product.price,
      quantity: 1
    };
    return this.props.chooseProduct(this.props.user.id, product);
  }

  render () {
    const { product, reviews, user } = this.props;

    let avgRating;

    if (reviews.length) {
      avgRating = reviews.reduce((accumulator, currentElement) => {
          return accumulator + currentElement.rating;
      }, 0) / reviews.length;
    }

    let arr = [];
    for (let i = 1; i < avgRating; i++) {
      arr.push(<img src={`/cheerio.jpg`} key={i} />);
    }
    if (avgRating % 1 > 0.5) {
      arr.push(<img src={'/halfCheerio.jpg'} key="half" />);
    }

    const pencil = <button type="button" className="btn btn-default btn-xs pull-right" id="productPencil"><span className="glyphicon glyphicon-pencil"></span></button>;

    return (
      <div>
        <div className="col-xs-9">
          <div className="row">
            <div className="col-xs-6">
              <img className="img-responsive" src={`/cereals/${product.id}.jpg`} />
            </div>
            <div className="col-xs-6 background-text-box">
              <ul className="product-list">
                <li><strong>{product.title + ' Cheerios'}</strong>     <Link to={`/products/${product.id}/editproduct`} />{pencil}</li>
                <li>{product.summary} {pencil}</li>
                <li>${(product.price / 100).toFixed(2)} {pencil}
                    {
                      product.inventory < 100
                      ? `Hurry Up And Buy!!!!! Only ${product.inventory} left in stock!`
                      : 'In Stock'
                    } {pencil}
                  <button className="btn btn-success" onClick={this.clickAddToCart}>Add to Cart <span className="glyphicon glyphicon-shopping-cart"></span></button>
                </li>
                <div className="nutrition-heading">
                  <div>
                    <h3 className="nutrition" >Nutritional Information {pencil}</h3>
                    <h4 className="nutrition">Calories: {product.calories}</h4>
                    <h4 className="nutrition">Sugar: {product.sugar}</h4>
                    <h4 className="nutrition">Fiber: {product.fiber}</h4>
                    <h4>Protein: {product.protein}</h4>
                  </div>
                  <h4>Average User Rating: {arr}</h4>
                  <h3><a href="">See more {product.category} cereals!</a></h3>
                </div>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <div>
                {user
                  ? (<Link to={`/products/${product.id}/review`}><h1>Add Your Own Review!</h1></Link>)
                  : null
                }
              </div>
              <h1>Reviews</h1>
              <div>
                {
                  reviews.length && reviews.map(review => (
                    <Review key={review.id} title={review.title} body={review.body} rating={review.rating} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-3">
          <Cart />
        </div>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = state => {
  return {
    product: state.product,
    reviews: state.reviews,
    user: state.auth
  };
};

const mapDispatch = dispatch => {
  return {
    chooseProduct: (id, productId) => {
      dispatch(addToCart(id, productId));
    }
  }
}


export default connect(mapState, mapDispatch)(Product);
