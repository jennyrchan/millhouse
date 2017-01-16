import React from 'react'

/* -----------------    COMPONENT     ------------------ */

export const Login = ({ login }) => (
  <form onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.email.value, evt.target.password.value)
  } }>
    <button type="submit" className="btn btn-success pull-right"><span className="glyphicon glyphicon-log-in" ></span> Login</button>
    <input name="password" type="password" placeholder="Password" className="pull-right"/>
    <input name="email" placeholder="Email" className="pull-right"/>
  </form>
)

/* -----------------    CONTAINER     ------------------ */

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)
