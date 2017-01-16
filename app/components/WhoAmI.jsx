import React from 'react'

/* -----------------    COMPONENT     ------------------ */

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-name">{user && user.name}</span>
    <button type="button" className="btn btn-success pull-right logout" onClick={logout}><span className="glyphicon glyphicon-log-out"></span> Logout</button>
  </div>
)

/* -----------------    CONTAINER     ------------------ */

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  ({ auth }) => ({ user: auth }),
  {logout},
) (WhoAmI)
