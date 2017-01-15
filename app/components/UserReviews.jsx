import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';

const UserReviews = props => {
  let pencil = <button type="button" className="btn btn-default btn-xs pull-right"><span className="glyphicon glyphicon-pencil"></span> </button>

  const reviews = props.reviews;

  let arr = [];
  for (let i = 0; i < reviews.rating; i++) {
    arr.push(<img src = {`/cheerio.jpg`} key = {i} />);
  }

  return (
      <div>
        <div className = 'col-xs-9'>
          <div id = 'userTitle'> Reviews </div>
          </div>
            {reviews.length && reviews.map((review,id) => (
              <div key = {id}>
                <h1> {review.title} </h1>
                <h2> {review.body} </h2>
                <h2> User Rating:  </h2>
              </div>
            ))}
          <div>
          <UserSidebar />
        </div>
      </div>
  )
}

/*  --------------   Container ---------------- */

const mapState = state => {
  return {
    reviews: state.userReviews
  };
}

const mapDispatch = dispatch => {
  return {};
}

export default connect(mapState,mapDispatch)(UserReviews);