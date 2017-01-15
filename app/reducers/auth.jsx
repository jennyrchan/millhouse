import axios from 'axios'

/* ------------   ACTION CREATOR     ------------------ */
const AUTHENTICATED = 'AUTHENTICATED'

export const authenticated = user => ({
  type: AUTHENTICATED, user
})
/* ------------       REDUCER     ------------------ */

const reducer = (state = null, action) => {
  switch(action.type) {
    case AUTHENTICATED:
      return action.user
  }
  return state
}

export default reducer

/* ------------       DISPATCHERS     ------------------ */

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/local/login',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))
