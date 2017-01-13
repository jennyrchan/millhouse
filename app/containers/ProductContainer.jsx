import React, { Component } from 'react';
import axios from 'axios';

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
      <div className="col-xs-6">
        <ul className="product-list">
          <li>{this.state.title}<button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-pencil"></span> </button></li>

          <li><img src = {`/cereals/${this.state.id}.jpg`} /></li>
          <li>{this.state.summary}</li>
          <li>Price: ${this.state.price}</li>
          <li>Inventory: {this.state.inventory < 100
            ? `Hurry Up And Buy!!!!! Only ${this.state.inventory} left in stock!`
            : 'In Stock'}</li>
          <h3 className="list-heading">Nutritional Information:</h3>
          <ul className="product-list">
            <li>Calories: {this.state.calories}</li>
            <li>Sugar: {this.state.sugar}</li>
            <li>Fiber: {this.state.fiber}</li>
            <li>Protein: {this.state.protein}</li>
            <li>Average User Rating: {this.state.avgRating}</li>
          </ul>
        </ul>
        <a href = "">See other {this.state.category} cereals!</a>
      </div>
    )
  }




}
