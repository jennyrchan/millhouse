import React from 'react';
import {connect} from 'react-redux';
import UserSidebar from './UserSidebar';

const UserSettings = props => {
  return (
    <div>
      <div className = 'col-xs-11'>
        UserSettings
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

export default connect(mapState,mapDispatch)(UserSettings);