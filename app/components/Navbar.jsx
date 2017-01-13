import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Login from './Login';
import WhoAmI from './WhoAmI';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render () {

    return (
      <div id="top-nav" className="col-xs-12">
        <div className="col-xs-2">
          <h1 id="title">MILLHOUSE</h1>
        </div>
        <div className="col-xs-10">
          {user ? <WhoAmI/> : <Login/>}
          <button type="button" className="btn btn-success btn-lg"><span className="glyphicon glyphicon-question-sign"></span> </button>
          <button type="button" className="btn btn-success btn-lg"><span className="glyphicon glyphicon-shopping-cart"></span> </button>
        </div>
      </div>
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Navbar);
