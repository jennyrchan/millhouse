import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Login from './Login';
import WhoAmI from './WhoAmI';
import {fetchCart} from '../reducers/cart';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.fetchCart(this.props.user.id);
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
        </div>
        <div className="col-xs-6 border-dashed">
          <div className="row">
            <button id="shopping-cart" type="button" className="btn btn-success pull-right" onClick={this.clickHandler} ><span className="glyphicon glyphicon-shopping-cart"></span> Broken</button>
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
