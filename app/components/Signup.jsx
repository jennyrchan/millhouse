import React from 'react';

/* -----------------    COMPONENT     ------------------ */

export const Signup = ({ signup }) => (
  <div className="container-fluid">
    <form onSubmit={evt => {
      evt.preventDefault()
      signup({
        firstName: evt.target.firstName.value,
        lastName: evt.target.lastName.value,
        email: evt.target.email.value,
        password: evt.target.password.value
      })
    } }>
      <input name="firstName" placeholder="First Name" />
      <input name="lastName" placeholder="Last Name" />
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit" className="btn btn-primary"> Signup Now</button>
    </form>
  </div>
)

/* -----------------    CONTAINER     ------------------ */

import { signup } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

export default connect (
  state => ({}),
  {signup},
) (Signup)
