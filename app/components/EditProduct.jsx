import React, {Component} from 'react';
import axios from 'axios';

class EditProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: props.routeParams.productId,
      title: "",
      summary: "",
      price: 0,
      inventory: 0,
      calories: 0,
      sugar: 0,
      fiber: 0,
      protein: 0,
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
    this.setState({title});
  }

  handleSummaryChange(event) {
    const summary = event.target.value;
    this.setState({summary});
  }

  handlePriceChange(event) {
    const price = +event.target.value;
    this.setState({price});
  }

   handleInventoryChange(event) {
    const inventory = +event.target.value;
    this.setState({inventory});
  }

   handleCaloriesChange(event) {
    const calories = +event.target.value;
    this.setState({calories});
  }

   handleSugarChange(event) {
    const sugar = +event.target.value;
    this.setState({sugar});
  }

   handleFiberChange(event) {
    const fiber = +event.target.value;
    this.setState({fiber});
  }

   handleProteinChange(event) {
    const protein = +event.target.value;
    this.setState({protein});
  }

// I need an action creator for handleSubmit to dispatch to.
// I need a reducer for the edit to pop off to.
// That action creator needs to be asynch.
// The reducer will tell it (somehow) where to go.

  handleSubmit(event) {
    event.preventDefault();
    const {
      title,
      summary,
      price,
      inventory,
      calories,
      sugar,
      fiber,
      protein
    } = this.state;
    axios.put(`/api/products/${this.state.productId}`, {
      title,
      summary,
      price,
      inventory,
      calories,
      sugar,
      fiber,
      protein
    })
    .then(response => response.data)
    .then(updatedProduct => console.log(updatedProduct))
    .catch(error => console.error(error));
  }

  componentDidMount() {
    axios.get(`/api/products/${this.state.productId}`)
      .then(response => response.data)
      .then(product => this.setState(product));
  }

  render() {
    const {
      title,
      summary,
      price,
      inventory,
      calories,
      sugar,
      fiber,
      protein
    } = this.state;

    return (
      <div className="row">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <label htmlFor="title" className="col-xs-1">Title</label>
            <div className="input-group col-xs-11">
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="title"
                value={title}
                onChange={this.handleTitleChange}
              />
            </div>
          </div>
          <div className="row">
            <label className="col-xs-3">
              Summary:
            </label>
            <textarea
              className="form-control col-xs-9"
              rows="5"
              name="summary"
              value={summary}
              onChange={this.handleSummaryChange}
            />
          </div>
          <div className="row input-group">
            <div className="col-xs-6">
              <label htmlFor="price">Price (in cents!)</label>
              <input
                type="text"
                className="form-control"
                id="price"
                aria-describedby="price"
                value={price}
                onChange={this.handlePriceChange}
               />
            </div>
            <div className="col-xs-6">
              <label htmlFor="inventory">Inventory</label>
              <input
                type="text"
                className="form-control"
                id="inventory"
                aria-describedby="inventory"
                value={inventory}
                onChange={this.handleInventoryChange}
               />
            </div>
          </div>
          <div className="row input-group">
            <div className="col-xs-6">
              <label htmlFor="calories">Calories</label>
              <input
                type="text"
                className="form-control"
                id="calories"
                aria-describedby="calories"
                value={calories}
                onChange={this.handleCaloriesChange}
               />
            </div>
            <div className="col-xs-6">
              <label htmlFor="sugar">Sugar</label>
              <input
                type="text"
                className="form-control"
                id="sugar"
                aria-describedby="sugar"
                value={sugar}
                onChange={this.handleSugarChange}
               />
            </div>
          </div>
          <div className="row input-group">
            <div className="col-xs-6">
              <label htmlFor="fiber">Fiber</label>
              <input
                type="text"
                className="form-control"
                id="fiber"
                aria-describedby="fiber"
                value={fiber}
                onChange={this.handleFiberChange}
               />
            </div>
            <div className="col-xs-6">
              <label htmlFor="protein">Protein</label>
              <input
                type="text"
                className="form-control"
                id="protein"
                aria-describedby="protein"
                value={protein}
                onChange={this.handleProteinChange}
               />
            </div>
          </div>
          <div className="row input-group">
            <button type="submit" className="btn btn-primary col-xs-12 col-xs-offset-1">Submit Your Edits</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditProduct;
