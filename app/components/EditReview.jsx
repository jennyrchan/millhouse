import React, {Component} from 'react';
import axios from 'axios';

class EditReview extends Component {

  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      productId: props.routeParams.productId,
      title: "",
      body: "",
      rating: 5,
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    const title = event.target.value;
    this.setState({title});
  }

  handleBodyChange(event) {
    const body = event.target.value;
    this.setState({body});
  }

  handleRatingChange(event) {
    const rating = +event.target.id;
    this.setState({rating});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {title, body, rating} = this.state;
    axios.post(`review`, {
      title,
      body,
      rating
    })
    .then(postedReview => res.send(postedReview))
    .catch(error => console.error(error));
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
                  value={title}
                  onChange={this.handleTitleChange}
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
                value={body}
                onChange={this.handleBodyChange}
              />
            </div>
            <div className="row">
              <label>
                Rating:
              </label>
            </div>
            <div className="row">
              <label className="custom-control custom-radio">
                <input id="1" name="1" type="radio" className="custom-control-input col-xs-1" />
                <span className="custom-control-description col-xs-10">One out of five... There's a hole in my heart the shape of a cheerio.</span>
              </label>
            </div>
            <div className="row">
              <label className="custom-control custom-radio">
                <input id="2" name="2" type="radio" className="custom-control-input col-xs-1" />
                <span className="custom-control-description col-xs-10">Two out of five... Could still use more cheery, less O.</span>
              </label>
            </div>
            <div className="row">
              <label className="custom-control custom-radio">
                <input id="3" name="3" type="radio" className="custom-control-input col-xs-1" />
                <span className="custom-control-description col-xs-10">Three out of five... Better than your average grains-coerced-into-a-ring-shape brand!</span>
              </label>
            </div>
            <div className="row">
              <label className="custom-control custom-radio">
                <input id="4" name="4" type="radio" className="custom-control-input col-xs-1" />
                <span className="custom-control-description col-xs-10">Four out of five... This cereal is awesOme!</span>
              </label>
            </div>
            <div className="row">
              <label className="custom-control custom-radio">
                <input id="5" name="5" type="radio" className="custom-control-input col-xs-1" />
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

export default EditReview
