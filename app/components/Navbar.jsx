import React from 'react';
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
  const user = props.user;

    return (
      <div id="top-nav" className="col-xs-12">
        <div className="col-xs-2">
          <h2 id="title">MILLHOUSE</h2>
        </div>
        <div className="col-xs-10">
          <div className="row">
            <button id="help" type="button" className="btn btn-success pull-right col-xs-1"><span className="glyphicon glyphicon-question-sign"></span> </button>

            <button id="shopping-cart" type="button" className="btn btn-success pull-right col-xs-1" onClick={this.clickHandler} ><span className="glyphicon glyphicon-shopping-cart"></span> </button>

            {user ? <WhoAmI/> : <Login/>}
          </div>
        </div>
      </div>
  );
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ auth }) => ({ user: auth });

const mapDispatch = dispatch => ({
  fetchCart: (id) => dispatch(fetchCart(id))
});

export default connect(mapState, mapDispatch)(Navbar);
