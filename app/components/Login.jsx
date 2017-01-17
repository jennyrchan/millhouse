import React from 'react';
import { Link } from 'react-router';
import Signup from './Signup';

/* -----------------    COMPONENT     ------------------ */

export const Login = ({ login }) => (
  <div>
    <Link to={'/signup'} type="button" className="btn btn-success pull-right"><span className="glyphicon glyphicon-user"></span> Signup</Link>
    <form onSubmit={evt => {
      evt.preventDefault()
      login(evt.target.email.value, evt.target.password.value)
    } }>
      <button type="submit" className="btn btn-success pull-right"><span className="glyphicon glyphicon-log-in" ></span> Login</button>
      <input name="password" type="password" placeholder="Password" className="pull-right"/>
      <input name="email" placeholder="Email" className="pull-right"/>
    </form>
  </div>
)

/* -----------------    CONTAINER     ------------------ */

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)
