import React, { Component } from 'react';
import axios from 'axios';
import Review from '../components/Review';
import Product from '../components/Product';

export default class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: +this.props.routeParams.productId,
      category: '',
      title: '',
      image: '',
      summary: '',
      price: 0,
      inventory: 0,
      calories: 0,
      sugar: 0,
      fiber: 0,
      protein: 0,
      reviews: []
      };
  }


  render () {
    const {id, title, image, summary, price, inventory, calories, sugar, fiber, protein, category, reviews} = this.state;

    return (
      <div className="col-xs-6">
        <Product id = {id} category = {category} title = {title} image = {image} summary = {summary} price = {price} inventory = {inventory} calories = {calories} sugar = {sugar} fiber = {fiber} protein = {protein} reviews = {reviews}/>
        <h1> Reviews </h1>
          <div>
          {reviews.map(review =>
            (< Review key = {review.id} title = {review.title} body = {review.body} rating = {review.rating} />)
          )}
          </div>
      </div>
    )
  }

}
