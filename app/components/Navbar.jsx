import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Login from './Login';
import WhoAmI from './WhoAmI';
import { fetchCart } from '../reducers/cart';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render () {
  const user = this.props.user;

    return (
      <div id="navbar" className="col-xs-12 navbar navbar-default container-fluid">
        <div className="col-xs-1">
          <img src={'/navbarMillhouse.jpg'} />
        </div>
        <div className="col-xs-5">
          <Link to={'/'}><h1 id="title">MILLHOUSE</h1></Link>
          <h4><b>Your source for all Cheerios cravings</b></h4>
          <a href="https://github.com/jennyrchan/millhouse"><button type="button" className="btn btn-primary btn-xs">View GitHub source code</button></a>
        </div>
        <div className="col-xs-6 border-dashed">
          <div className="row">
            {user ? <WhoAmI /> : <Login />}
          </div>
        </div>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ auth }) => ({ user: auth });

const mapDispatch = dispatch => ({
  fetchCart: (id) => dispatch(fetchCart(id))
});

export default connect(mapState, mapDispatch)(Navbar);
