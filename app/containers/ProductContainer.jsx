import React, { Component } from 'react';
import axios from 'axios';
import Review from '../components/Review';

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
      })
    })
    axios.get(`/api/products/${this.state.id}/reviews`)
    .then(res => res.data)
    .then(reviews => {
      this.setState({
        reviews
      })
    })
  }

  render () {
    const {title, summary, price, inventory, calories, sugar, fiber, protein, category, reviews} = this.state;


    const avgRating = reviews.reduce((accumlator, currentElement) => {
        return accumlator + currentElement.rating
    },0)/reviews.length


    let arr = [];
    for (let i = 1; i < avgRating; i++) {
      arr.push(<img src = {`/cheerio.jpg`} key = {i} />);
    }
    if (avgRating % 1 > 0.5) {
      arr.push(<img src = {'/halfCheerio.jpg'} key = "half" />);
    }

    let pencil =           <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-pencil"></span> </button>


    return (
      <div className="col-xs-6">
        <ul className="product-list">
          <li>{title}    {pencil}</li>
          <li><img src = {`/cereals/${this.state.id}.jpg`} /></li>
          <li>{summary}  {pencil}</li>
          <li>Price: ${price}   {pencil}</li>
          <li>Inventory: {inventory < 100
            ? `Hurry Up And Buy!!!!! Only ${this.state.inventory} left in stock!`
            : 'In Stock'}   {pencil}</li>
          <div className="nutrition-heading">
          <div>
            <h3 className = "nutrition" >Nutritional Information {pencil}</h3>
            <h4 className = "nutrition">Calories: {calories}</h4>
            <h4 className = "nutrition">Sugar: {sugar}</h4>
            <h4 className = "nutrition">Fiber: {fiber}</h4>
            <h4>Protein: {protein}</h4>
          </div>
            <h4>Average User Rating: {arr}</h4>
          </div>
        </ul>
        <h1><a href = "">See other {category} cereals!</a></h1>
        <h1> Reviews </h1>
        {reviews.map(review =>
        (< Review key = {review.id} title = {review.title} body = {review.body} rating = {review.rating} />)
        )}
      </div>
    )
  }




}
