import React, {Component} from 'react';
import Review from './Review';
import Cart from './Cart';
import { connect } from 'react-redux';

import addToCart from '../reducers/cart';

/* -----------------    COMPONENT     ------------------ */

export class Product extends Component {
  constructor(props) {
    super(props);
    this.chooseProduct = this.chooseProduct.bind(this);
  }

  chooseProduct () {
    this.props.addToCart(this.props.product);
  }

  render () {
    const product = this.props.product;

    const reviews = this.props.reviews;

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
      <div className="row">
        <div className="col-xs-8">
          <div className="row">
            <div className="col-xs-6">
              <img className="img-responsive" src={`/cereals/${product.id}.jpg`} />
            </div>
            <div id="product" className="col-xs-6">
              <ul className="product-list">
                <li><strong>{product.title + ' Cheerios'}</strong>    {pencil}</li>
                <li>{product.summary} {pencil}</li>
                <li>${product.price / 100} {pencil} {product.inventory < 100
                  ? `Hurry Up And Buy!!!!! Only ${product.inventory} left in stock!`
                  : 'In Stock'}   {pencil} <button className="btn btn-success" onClick={this.chooseProduct}>Add to Cart <span className="glyphicon glyphicon-shopping-cart"></span></button></li>
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
              <h1>Reviews</h1>
              <div>
                {reviews.length && reviews.map(review =>
                  (<Review key={ review.id } title={ review.title } body={ review.body } rating={ review.rating } />)
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-4">
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
    reviews: state.reviews
  };
};

export default connect(mapState, {addToCart})(Product);
