import React, { Component } from 'react';
import axios from 'axios';

export default class Product extends Component {
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
      avgRating: 0
    };
  }

  componentDidMount() {
    axios.get(`/api/products/${this.state.id}`)
    .then (response => response.data)
    .then (product => {
      this.setState({
        id: product.id,
        category: product.category,
        title: product.title,
        image: product.image,
        summary: product.summary,
        price: product.price,
        inventory: product.inventory,
        calories: product.calories,
        sugar: product.sugar,
        fiber: product.fiber,
        protein: product.protein,
        avgRating: product.averageRating
      })
    })
  }

  render () {
    return (
      <div>
      <h1>Category: {this.state.category}</h1>
      <h1>{this.state.title}</h1>
      <img src = {this.state.image} />
      <h2>{this.state.summary}</h2>
      <h2>Price: ${this.state.price}</h2>
      <h2>Inventory: {this.state.inventory}</h2>
      <h2>Calories: {this.state.calories}</h2>
      <h2>Sugar: {this.state.sugar}</h2>
      <h2>Fiber: {this.state.fiber}</h2>
      <h2>Protein: {this.state.protein}</h2>
      <h2>Average User Rating: {this.state.avgRating}</h2>
      </div>
    )
  }




}
