import React from 'react';
import { Link } from 'react-router';

const UserSidebar = props => {
    return (
      <sidebar>
        <section>
          <Link to={`/users/${props.userId}/orders`}> Orders </Link>
        </section>

        <section>
          <Link to={`/users/${props.userId}/reviews`}> Reviews </Link>
        </section>

        <section>
          <Link to={`/users/${props.userId}/settings`}> Settings </Link>
        </section>

        <div className="scared-millhouse" />
      </sidebar>
    )
}

export default UserSidebar;
