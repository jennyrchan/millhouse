import React, { Component } from 'react';
import store from '../store';
import { dispatchNewProduct } from '../reducers/product';

class NewProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {
        title: '',
        summary: '',
        price: 0,
        inventory: 0,
        calories: 0,
        sugar: 0,
        fiber: 0,
        protein: 0,
      }
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleInventoryChange = this.handleInventoryChange.bind(this);
    this.handleCaloriesChange = this.handleCaloriesChange.bind(this);
    this.handleSugarChange = this.handleSugarChange.bind(this);
    this.handleFiberChange = this.handleFiberChange.bind(this);
    this.handleProteinChange = this.handleProteinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    const title = event.target.value;
    this.setState({ title });
  }

  handleSummaryChange(event) {
    const summary = event.target.value;
    this.setState({ summary });
  }

  handlePriceChange(event) {
    const price = +event.target.value;
    this.setState({ price });
  }

   handleInventoryChange(event) {
    const inventory = +event.target.value;
    this.setState({ inventory });
  }

   handleCaloriesChange(event) {
    const calories = +event.target.value;
    this.setState({ calories });
  }

   handleSugarChange(event) {
    const sugar = +event.target.value;
    this.setState({ sugar });
  }

   handleFiberChange(event) {
    const fiber = +event.target.value;
    this.setState({ fiber });
  }

   handleProteinChange(event) {
    const protein = +event.target.value;
    this.setState({ protein });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, summary, price, inventory, calories, sugar, fiber, protein } = this.state;
    const product = { title, summary, price, inventory, calories, sugar, fiber, protein }
    store.dispatch(dispatchNewProduct(product))
  }

  render() {
    const { title, summary, price, inventory, calories, sugar, fiber, protein } = this.state;
    const { handleTitleChange, handleSummaryChange, handlePriceChange, handleInventoryChange, handleCaloriesChange, handleSugarChange, handleFiberChange, handleProteinChange, handleSubmit } = this;

    return (
      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <div className="container-fluid">
            <div className="row">
              <h4 className="col-xs-1"><b>Title:</b></h4>
              <div className="input-group col-xs-11">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="What exciting new Cheerios are we selling now?"
                  aria-describedby="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
            </div>
            <div className="row">
              <h4 className="col-xs-1"><b>Summary:</b></h4>
              <div className="input-group col-xs-11">
                <textarea
                  className="form-control"
                  rows="5"
                  name="summary"
                  placeholder="Describe me!"
                  value={summary}
                  onChange={handleSummaryChange}
                />
              </div>
            </div>
            <div className="row input-group">
              <div className="col-xs-6">
                <h4><b>Price: (in cents)</b></h4>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="e.g., 499 = $4.99"
                  aria-describedby="price"
                  value={price}
                  onChange={handlePriceChange}
                 />
              </div>
              <div className="col-xs-6">
                <h4><b>Inventory:</b></h4>
                <input
                  type="text"
                  className="form-control"
                  id="inventory"
                  aria-describedby="inventory"
                  value={inventory}
                  onChange={handleInventoryChange}
                 />
              </div>
            </div>
            <div className="row input-group">
              <div className="col-xs-6">
                <h4><b>Calories:</b></h4>
                <input
                  type="text"
                  className="form-control"
                  id="calories"
                  aria-describedby="calories"
                  value={calories}
                  onChange={handleCaloriesChange}
                 />
              </div>
              <div className="col-xs-6">
                <h4><b>Sugar:</b></h4>
                <input
                  type="text"
                  className="form-control"
                  id="sugar"
                  aria-describedby="sugar"
                  value={sugar}
                  onChange={handleSugarChange}
                 />
              </div>
            </div>
            <div className="row input-group">
              <div className="col-xs-6">
                <h4><b>Fiber:</b></h4>
                <input
                  type="text"
                  className="form-control"
                  id="fiber"
                  aria-describedby="fiber"
                  value={fiber}
                  onChange={handleFiberChange}
                 />
              </div>
              <div className="col-xs-6">
                <h4><b>Protein:</b></h4>
                <input
                  type="text"
                  className="form-control"
                  id="protein"
                  aria-describedby="protein"
                  value={protein}
                  onChange={handleProteinChange}
                 />
              </div>
            </div>
            <div className="row input-group">
              <br />
              <button type="submit" className="btn btn-primary col-xs-12 col-xs-offset-1">Add New Product</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewProduct;
