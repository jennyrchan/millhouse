import React, { Component } from 'react';
import axios from 'axios';
import Review from './Review';
import { connect } from 'react-redux';

export const Product = props => {

    const {id, title, summary, price, inventory, calories, sugar, fiber, protein, category, reviews} = props.product;

    // const avgRating = reviews.reduce((accumlator, currentElement) => {
    //     return accumlator + currentElement.rating
    // },0)/reviews.length


    // let arr = [];
    // for (let i = 1; i < avgRating; i++) {
    //   arr.push(<img src = {`/cheerio.jpg`} key = {i} />);
    // }
    // if (avgRating % 1 > 0.5) {
    //   arr.push(<img src = {'/halfCheerio.jpg'} key = "half" />);
    // }

    let pencil = <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-pencil"></span> </button>


    return (
      <div className = "col-xs-6">
        <ul className="product-list">
          <li>{title}    {pencil}</li>
          <li><img src = {`/cereals/${id}.jpg`} /></li>
          <li>{summary}  {pencil}</li>
          <li>Price: ${price}   {pencil}</li>
          <li>Inventory: {inventory < 100
            ? `Hurry Up And Buy!!!!! Only ${inventory} left in stock!`
            : 'In Stock'}   {pencil}</li>
          <div className="nutrition-heading">
          <div>
            <h3 className = "nutrition" >Nutritional Information {pencil}</h3>
            <h4 className = "nutrition">Calories: {calories}</h4>
            <h4 className = "nutrition">Sugar: {sugar}</h4>
            <h4 className = "nutrition">Fiber: {fiber}</h4>
            <h4>Protein: {protein}</h4>
          </div>
            <h4>Average User Rating: </h4>
          </div>
        </ul>
        <h1><a href = "">See other {category} cereals!</a></h1>
      </div>
    )
}


/*  ----------------   Container  --------------------------*/


const mapState = state => ({
    product: state.product
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Product);
