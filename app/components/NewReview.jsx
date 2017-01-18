import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from '../store';
import { dispatchNewReview } from '../reducers/productReviews';
import Rating from 'react-rating-system'

/* -----------------    COMPONENT     ------------------ */

class NewReview extends Component {

  constructor(props) {
    super(props);

    const { title, body, rating } = props;
    const { productId } = props.routeParams;

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
    this.setState({ rating: event });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, body, rating, productId } = this.state;
    const review = { title, body, rating, productId }
    store.dispatch(dispatchNewReview(review));
  }

  render() {

    const { title, body, rating } = this.state;
    const { handleTitleChange, handleBodyChange, handleRatingChange, handleSubmit } = this;

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
                  placeholder="Add a snazzy title"
                  aria-describedby="title"
                  value={title || ''}
                  onChange={handleTitleChange}
                />
              </div>
            </div>
            <div className="row">
              <h4 className="col-xs-1"><b>Review:</b></h4>
              <div className="input-group col-xs-11">
                <textarea
                  className="form-control"
                  rows="5"
                  name="body"
                  placeholder="Yay? Nay? Express all your Cheerios-related feelings here!"
                  value={body || ''}
                  onChange={handleBodyChange}
                />
              </div>
            </div>
            <div className="row">
              <h4 className="col-xs-1"><b>Rating:</b></h4>
              <div className="col-xs-11">
                <Rating
                  image="/cheerio.png"
                  fillBG="#428bca"
                  editable={true}
                  lockRating={true}
                  callback={handleRatingChange}
                  containerStyle={{ maxWidth: '500px' }}
                />
              </div>
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

/* -----------------    CONTAINER     ------------------ */

const mapState = state => {
  const { productId, title, body, rating } = state;
  return { productId, title, body, rating }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(NewReview)
