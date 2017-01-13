import React from 'react'

export const Login = ({ login }) => (
  <form onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.email.value, evt.target.password.value)
  } }>
    <input name="email" placeholder="Email" />
    <input name="password" type="password" placeholder="Password" />
    <button type="submit" className="btn btn-success btn-lg"><span className="glyphicon glyphicon-log-in" ></span> Login</button>
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)

