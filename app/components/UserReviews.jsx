import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';
import Review from './Review';

const UserReviews = props => {
  let pencil = <button type="button" className="btn btn-default btn-xs pull-right" id="userReviewsPencil" ><span className="glyphicon glyphicon-pencil"></span> </button>

  const reviews = props.reviews;

  let arr = [];
  reviews.length && reviews.map((review,id) => {
    arr[id] = [];
    for (let i = 0; i < review.rating; i++) {
      arr[id].push(<img src = {`/cheerio.jpg`} key = {i} />);
    }
  })

  return (
      <div>
        <div className = 'col-xs-9'>
          <h1 id = 'userTitle'> Reviews </h1>
          {reviews.length && reviews.map((review,id) => (
          <Review key = {id} title={review.title} body={review.body} rating={review.rating} pencil={pencil}/>
          ))}
        </div>

        <div>
          <UserSidebar userId={props.auth.id}/>
        </div>
      </div>
  )
}

/*  --------------   Container ---------------- */

const mapState = state => {
  return {
    reviews: state.userReviews,
    auth: state.auth
  };
}

const mapDispatch = dispatch => {
  return {};
}

export default connect(mapState,mapDispatch)(UserReviews);
