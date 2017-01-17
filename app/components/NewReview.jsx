import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from '../store';
import axios from 'axios';

import { dispatchNewReview } from '../reducers/productReviews';

class NewReview extends Component {

  constructor(props) {
    super(props);



    const {
      title,
      body,
      rating,
    } = props;



    const {productId} = props.routeParams;

    this.state = {
      title,
      body,
      rating,
      productId
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    const title = event.target.value;
    this.setState({ title });
  }

  handleBodyChange(event) {
    const body = event.target.value;
    this.setState({ body });
  }

  handleRatingChange(event) {
    const rating = +event.target.id;
    this.setState({ rating });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      title,
      body,
      rating,
      productId
    } = this.state;
    const review = {
      title,
      body,
      rating,
      productId
    }
    store.dispatch(dispatchNewReview(review));
  }

  render() {
    const {
      title,
      body,
      rating
    } = this.state;
    const {
      handleTitleChange,
      handleBodyChange,
      handleRatingChange,
      handleSubmit,
    } = this;
    return (
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group">
              <label htmlFor="title" className="col-xs-1">Title</label>
              <div className="input-group col-xs-11">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                  value={title || ""}
                  onChange={handleTitleChange}
                />
              </div>
            </div>
            <div className="row">
              <label className="col-xs-3">
                Review:
              </label>
              <textarea
                className="form-control col-xs-9"
                rows="5"
                name="body"
                value={body || ""}
                onChange={handleBodyChange}
              />
            </div>
            <div className="row">
              <label>
                Rating:
              </label>
            </div>
            <div className="row">
              <label className="custom-control custom-radio">
                <input id="1" name="1" type="radio" className="custom-control-input col-xs-1" onChange={handleRatingChange} />
                <span className="custom-control-description col-xs-10">One out of five... There's a hole in my heart the shape of a cheerio.</span>
              </label>
            </div>
            <div className="row">
              <label className="custom-control custom-radio">
                <input id="2" name="2" type="radio" className="custom-control-input col-xs-1" onChange={handleRatingChange} />
                <span className="custom-control-description col-xs-10">Two out of five... Could still use more cheery, less O.</span>
              </label>
            </div>
            <div className="row">
              <label className="custom-control custom-radio">
                <input id="3" name="3" type="radio" className="custom-control-input col-xs-1" onChange={handleRatingChange} />
                <span className="custom-control-description col-xs-10">Three out of five... Better than your average grains-coerced-into-a-ring-shape brand!</span>
              </label>
            </div>
            <div className="row">
              <label className="custom-control custom-radio">
                <input id="4" name="4" type="radio" className="custom-control-input col-xs-1" onChange={handleRatingChange} />
                <span className="custom-control-description col-xs-10">Four out of five... This cereal is awesOme!</span>
              </label>
            </div>
            <div className="row">
              <label className="custom-control custom-radio">
                <input id="5" onChange={handleRatingChange} name="5" type="radio" className="custom-control-input col-xs-1" />
                <span className="custom-control-description col-xs-10">Five out of five... Perfect in every way. The very ideal of a breakfast food. We cry together as one, angels descend, the end has arrived.</span>
              </label>
            </div>
            <div className="row input-group">
              <button type="submit" className="btn btn-primary col-xs-12">Submit Your Review!</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

/* --------------- Container -------------- */

const mapState = state => {
  const {
    productId,
    title,
    body,
    rating,
  } = state;

  return {
    productId,
    title,
    body,
    rating,
  }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(NewReview)
