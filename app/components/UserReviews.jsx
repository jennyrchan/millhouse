import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';

const UserReviews = props => {
  let pencil = <button type="button" className="btn btn-default btn-xs"><span className="glyphicon glyphicon-pencil"></span> </button>

  return (
    <div>
      <div className = 'col-xs-9'>
        UserReviews
      </div>

      <div>
        <UserSidebar/>
      </div>
    </div>
  )
}

/*  --------------   Container ---------------- */

const mapState = state => {
  return {};
}

const mapDispatch = dispatch => {
  return {};
}

export default connect(mapState,mapDispatch)(UserReviews);