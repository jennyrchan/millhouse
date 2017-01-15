import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';
import Review from './Review';

const UserReviews = props => {
  let pencil = <button type="button" className="btn btn-default btn-xs pull-right"><span className="glyphicon glyphicon-pencil"></span> </button>

  const reviews = props.reviews;

  let arr = [];
  reviews.length && reviews.map((review,id) => {
    arr[id] = [];
    for (let i = 0; i < review.rating; i++) {
      arr[id].push(<img src = {`/cheerio.jpg`} key = {i} />);
    }
  })


  let userId = reviews[0] && +reviews[0].user_id;

  return (
      <div>
        <div className = 'col-xs-9'>
          <div id = 'userTitle'> Reviews </div>
          {reviews.length && reviews.map((review,id) => (
          <Review key = {id} title={review.title} body={review.body} rating={review.rating}/>
          ))}
        </div>

        <div>
          <UserSidebar userId={userId}/>
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